/**
 * GB Feeds — Cloudflare Worker: forms proxy
 *
 * Handles POST /contact, POST /newsletter, POST /field-club-waitlist.
 *
 * Per-endpoint pipeline (in order):
 *   1. CORS — verify Origin against ALLOWED_ORIGINS (comma-separated env var)
 *   2. JSON parse — 400 on malformed body
 *   3. Honeypot — reject non-empty __hp_field (silent 200 to confuse bots)
 *   4. Turnstile siteverify — POST to Cloudflare's API; reject on failure
 *   5. KV rate limit — 1 request per 60s per IP per endpoint
 *   6. Resend forward — POST to https://api.resend.com/emails
 *
 * Secrets (set via `wrangler secret put` — NEVER committed to wrangler.toml):
 *   RESEND_API_KEY       — Resend API key
 *   TURNSTILE_SECRET_KEY — Cloudflare Turnstile secret key
 *
 * Non-secret vars (safe in wrangler.toml):
 *   ALLOWED_ORIGINS      — comma-separated origins, e.g. "https://gbfeeds.com,https://*.pages.dev"
 *
 * KV binding:
 *   RATE_LIMIT_KV        — namespace for per-IP rate limit keys (TTL 60s)
 *
 * Email routing:
 *   FROM: notifications@gbfeeds.com  (a Cloudflare Email Routing verified address)
 *   TO:   greg@gbfeeds.com           (placeholder — Greg supplies the real address pre-launch)
 *         NOTE: Replace TO_EMAIL below with Greg's real address before going live.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Env {
  RATE_LIMIT_KV: KVNamespace;
  ALLOWED_ORIGINS: string;
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
}

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  tag: 'contact';
  turnstileToken: string;
  __hp_field: string;
}

interface NewsletterPayload {
  email: string;
  tag: 'newsletter';
  turnstileToken: string;
  __hp_field: string;
}

interface FieldClubPayload {
  email: string;
  tag: 'field-club-waitlist';
  turnstileToken: string;
  __hp_field: string;
}

type FormPayload = ContactPayload | NewsletterPayload | FieldClubPayload;

interface WorkerResponse {
  ok: boolean;
  code?: string;
  message?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const RESEND_EMAILS_URL = 'https://api.resend.com/emails';

/**
 * TO_EMAIL: The recipient address for all form submissions.
 * TODO Phase 8: Replace with Greg's real address before launch.
 * Configure in wrangler.toml [vars] or as a secret if preferred.
 */
const TO_EMAIL = 'greg@gbfeeds.com';
const FROM_EMAIL = 'GB Feeds <notifications@gbfeeds.com>';

const RATE_LIMIT_SECONDS = 60;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function jsonResponse(body: WorkerResponse, status: number, corsOrigin: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': corsOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

/**
 * Checks if the request Origin is in the ALLOWED_ORIGINS list.
 * Supports exact matches and wildcard subdomains (e.g., "https://*.pages.dev").
 */
function isAllowedOrigin(origin: string, allowedOriginsEnv: string): boolean {
  if (!origin) return false;
  const allowed = allowedOriginsEnv.split(',').map((s) => s.trim()).filter(Boolean);
  for (const pattern of allowed) {
    if (pattern === origin) return true;
    // Wildcard subdomain: "https://*.pages.dev" → matches any subdomain
    if (pattern.includes('*')) {
      const escaped = pattern.replace(/\./g, '\\.').replace(/\*/g, '[^.]+');
      const regex = new RegExp(`^${escaped}$`);
      if (regex.test(origin)) return true;
    }
  }
  return false;
}

/**
 * Verifies a Cloudflare Turnstile token server-side.
 * Returns true only if the siteverify API responds with success === true.
 */
async function verifyTurnstile(token: string, secretKey: string): Promise<boolean> {
  if (!token || !secretKey) return false;
  try {
    const resp = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: secretKey, response: token }),
    });
    if (!resp.ok) return false;
    const data = (await resp.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

/**
 * KV-backed rate limiter. Key pattern: `ratelimit:{ip}:{endpoint}`.
 * Returns true if the request should be allowed; false if rate-limited.
 * On allowed request, writes the key with TTL = RATE_LIMIT_SECONDS.
 */
async function checkRateLimit(
  kv: KVNamespace,
  ip: string,
  endpoint: string,
): Promise<boolean> {
  const key = `ratelimit:${ip}:${endpoint}`;
  const existing = await kv.get(key);
  if (existing !== null) {
    // Key exists → still within the rate limit window
    return false;
  }
  // Set the key with TTL — value is arbitrary; presence is the signal
  await kv.put(key, '1', { expirationTtl: RATE_LIMIT_SECONDS });
  return true;
}

/**
 * Sends an email via the Resend API.
 * Returns true on 200/201, false on any error.
 */
async function sendViaResend(
  apiKey: string,
  subject: string,
  html: string,
): Promise<boolean> {
  if (!apiKey) return false;
  try {
    const resp = await fetch(RESEND_EMAILS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        subject,
        html,
      }),
    });
    return resp.status === 200 || resp.status === 201;
  } catch {
    return false;
  }
}

/**
 * Extracts the client IP from Cloudflare's CF-Connecting-IP header,
 * falling back to X-Forwarded-For, then a sentinel for local dev.
 */
function getClientIp(request: Request): string {
  return (
    request.headers.get('CF-Connecting-IP') ??
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ??
    'unknown'
  );
}

// ─── HTML email builders ──────────────────────────────────────────────────────

function buildContactEmailHtml(name: string, email: string, message: string): string {
  return `
    <h2 style="font-family:monospace;color:#0F0E0B;">New contact from ${escapeHtml(name)}</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr>
        <td style="padding:8px;border:1px solid #BDB29C;font-family:monospace;font-weight:bold;">Name</td>
        <td style="padding:8px;border:1px solid #BDB29C;font-family:monospace;">${escapeHtml(name)}</td>
      </tr>
      <tr>
        <td style="padding:8px;border:1px solid #BDB29C;font-family:monospace;font-weight:bold;">Email</td>
        <td style="padding:8px;border:1px solid #BDB29C;font-family:monospace;">
          <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:8px;border:1px solid #BDB29C;font-family:monospace;font-weight:bold;vertical-align:top;">Message</td>
        <td style="padding:8px;border:1px solid #BDB29C;font-family:monospace;white-space:pre-wrap;">${escapeHtml(message)}</td>
      </tr>
    </table>
    <p style="font-family:monospace;color:#6B6560;font-size:12px;margin-top:16px;">
      Sent via gbfeeds.com contact form
    </p>
  `.trim();
}

function buildNewsletterEmailHtml(email: string): string {
  return `
    <h2 style="font-family:monospace;color:#0F0E0B;">Newsletter signup</h2>
    <p style="font-family:monospace;">
      <strong>Email:</strong>
      <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
    </p>
    <p style="font-family:monospace;color:#6B6560;font-size:12px;margin-top:16px;">
      Sent via gbfeeds.com newsletter form
    </p>
  `.trim();
}

function buildFieldClubEmailHtml(email: string): string {
  return `
    <h2 style="font-family:monospace;color:#0F0E0B;">Field Club waitlist signup</h2>
    <p style="font-family:monospace;">
      <strong>Email:</strong>
      <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
    </p>
    <p style="font-family:monospace;color:#6B6560;font-size:12px;margin-top:16px;">
      Sent via gbfeeds.com Field Club waitlist form
    </p>
  `.trim();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ─── Validation helpers ───────────────────────────────────────────────────────

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isNonEmptyString(val: unknown): val is string {
  return typeof val === 'string' && val.trim().length > 0;
}

// ─── Request handler ──────────────────────────────────────────────────────────

async function handleRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const origin = request.headers.get('Origin') ?? '';

  // ── OPTIONS preflight ───────────────────────────────────────────────────
  if (request.method === 'OPTIONS') {
    if (!isAllowedOrigin(origin, env.ALLOWED_ORIGINS)) {
      return new Response(null, { status: 403 });
    }
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  // ── Method guard ────────────────────────────────────────────────────────
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // ── CORS check ──────────────────────────────────────────────────────────
  if (!isAllowedOrigin(origin, env.ALLOWED_ORIGINS)) {
    return jsonResponse(
      { ok: false, code: 'CORS_REJECTED', message: 'Origin not allowed' },
      403,
      origin,
    );
  }

  const corsOrigin = origin;

  // ── Parse endpoint ──────────────────────────────────────────────────────
  const endpoint = url.pathname.replace(/^\/+|\/+$/g, ''); // strip leading/trailing slashes
  const validEndpoints = ['contact', 'newsletter', 'field-club-waitlist'];
  if (!validEndpoints.includes(endpoint)) {
    return jsonResponse({ ok: false, code: 'NOT_FOUND' }, 404, corsOrigin);
  }

  // ── Parse body ──────────────────────────────────────────────────────────
  let body: FormPayload;
  try {
    body = (await request.json()) as FormPayload;
  } catch {
    return jsonResponse({ ok: false, code: 'INVALID_JSON' }, 400, corsOrigin);
  }

  // ── Honeypot guard ──────────────────────────────────────────────────────
  // If __hp_field is non-empty, it's almost certainly a bot.
  // Return a silent 200 to waste the bot's time without revealing the guard.
  if (typeof body.__hp_field === 'string' && body.__hp_field.length > 0) {
    return jsonResponse({ ok: true }, 200, corsOrigin);
  }

  // ── Turnstile verification ──────────────────────────────────────────────
  const turnstileToken = body.turnstileToken;
  if (!turnstileToken || typeof turnstileToken !== 'string') {
    return jsonResponse(
      { ok: false, code: 'TURNSTILE_MISSING', message: 'Human verification required' },
      400,
      corsOrigin,
    );
  }
  const turnstileOk = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY);
  if (!turnstileOk) {
    return jsonResponse(
      { ok: false, code: 'TURNSTILE_FAILED', message: 'Human verification failed. Please try again.' },
      403,
      corsOrigin,
    );
  }

  // ── Rate limit ──────────────────────────────────────────────────────────
  const ip = getClientIp(request);
  const allowed = await checkRateLimit(env.RATE_LIMIT_KV, ip, endpoint);
  if (!allowed) {
    return jsonResponse(
      { ok: false, code: 'RATE_LIMITED', message: 'Please wait 60 seconds before submitting again.' },
      429,
      corsOrigin,
    );
  }

  // ── Endpoint-specific handling ──────────────────────────────────────────
  try {
    if (endpoint === 'contact') {
      const payload = body as ContactPayload;
      if (
        !isNonEmptyString(payload.name) ||
        !isNonEmptyString(payload.email) ||
        !isNonEmptyString(payload.message)
      ) {
        return jsonResponse({ ok: false, code: 'VALIDATION_FAILED' }, 400, corsOrigin);
      }
      if (!isValidEmail(payload.email)) {
        return jsonResponse({ ok: false, code: 'INVALID_EMAIL' }, 400, corsOrigin);
      }

      const sent = await sendViaResend(
        env.RESEND_API_KEY,
        `New contact from ${payload.name.trim()}`,
        buildContactEmailHtml(payload.name.trim(), payload.email.trim(), payload.message.trim()),
      );
      if (!sent) {
        return jsonResponse({ ok: false, code: 'SEND_FAILED' }, 500, corsOrigin);
      }
    } else if (endpoint === 'newsletter') {
      const payload = body as NewsletterPayload;
      if (!isNonEmptyString(payload.email) || !isValidEmail(payload.email)) {
        return jsonResponse({ ok: false, code: 'INVALID_EMAIL' }, 400, corsOrigin);
      }

      const sent = await sendViaResend(
        env.RESEND_API_KEY,
        `Newsletter signup: ${payload.email.trim()}`,
        buildNewsletterEmailHtml(payload.email.trim()),
      );
      if (!sent) {
        return jsonResponse({ ok: false, code: 'SEND_FAILED' }, 500, corsOrigin);
      }
    } else if (endpoint === 'field-club-waitlist') {
      const payload = body as FieldClubPayload;
      if (!isNonEmptyString(payload.email) || !isValidEmail(payload.email)) {
        return jsonResponse({ ok: false, code: 'INVALID_EMAIL' }, 400, corsOrigin);
      }

      const sent = await sendViaResend(
        env.RESEND_API_KEY,
        `Field Club waitlist: ${payload.email.trim()}`,
        buildFieldClubEmailHtml(payload.email.trim()),
      );
      if (!sent) {
        return jsonResponse({ ok: false, code: 'SEND_FAILED' }, 500, corsOrigin);
      }
    }
  } catch {
    return jsonResponse({ ok: false, code: 'INTERNAL_ERROR' }, 500, corsOrigin);
  }

  return jsonResponse({ ok: true }, 200, corsOrigin);
}

// ─── Worker entrypoint ────────────────────────────────────────────────────────

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return handleRequest(request, env);
  },
} satisfies ExportedHandler<Env>;
