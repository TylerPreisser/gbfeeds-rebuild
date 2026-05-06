/**
 * GB Feeds Worker — smoke test script
 *
 * Run against a local wrangler dev instance:
 *   npx wrangler dev cloudflare-worker/index.ts --port 8787
 *
 * Then in a separate terminal:
 *   npx tsx cloudflare-worker/test.ts
 *
 * Expected results:
 *   Honeypot test     → { ok: true } (silent 200 — bot silently swallowed)
 *   Missing token     → { ok: false, code: "TURNSTILE_MISSING" } (400)
 *   Bad origin        → { ok: false, code: "CORS_REJECTED" } (403)
 *   Not found         → { ok: false, code: "NOT_FOUND" } (404)
 *
 * Note: Full Turnstile + Resend flows require real secrets. These are integration
 * tests only — run manually before deploying. No CI gate.
 */

const WORKER_URL = 'http://localhost:8787';
const ALLOWED_ORIGIN = 'https://gbfeeds.com';

interface TestResult {
  name: string;
  passed: boolean;
  details: string;
}

async function runTest(
  name: string,
  fn: () => Promise<boolean>,
): Promise<TestResult> {
  try {
    const passed = await fn();
    return { name, passed, details: passed ? 'OK' : 'FAILED' };
  } catch (err) {
    return { name, passed: false, details: String(err) };
  }
}

async function main() {
  const results: TestResult[] = [];

  // Test 1: Honeypot filled → silent 200
  results.push(
    await runTest('Honeypot filled → silent 200', async () => {
      const res = await fetch(`${WORKER_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: ALLOWED_ORIGIN,
        },
        body: JSON.stringify({
          name: 'Bot',
          email: 'bot@bot.com',
          message: 'Spam',
          tag: 'contact',
          turnstileToken: 'token',
          __hp_field: 'filled-by-bot',
        }),
      });
      const data = (await res.json()) as { ok: boolean };
      return res.status === 200 && data.ok === true;
    }),
  );

  // Test 2: Missing turnstile token → 400
  results.push(
    await runTest('Missing turnstile token → 400 TURNSTILE_MISSING', async () => {
      const res = await fetch(`${WORKER_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: ALLOWED_ORIGIN,
        },
        body: JSON.stringify({
          name: 'Test',
          email: 'test@test.com',
          message: 'Hello',
          tag: 'contact',
          turnstileToken: '',
          __hp_field: '',
        }),
      });
      const data = (await res.json()) as { ok: boolean; code: string };
      return res.status === 400 && data.code === 'TURNSTILE_MISSING';
    }),
  );

  // Test 3: Bad origin → 403 CORS_REJECTED
  results.push(
    await runTest('Bad origin → 403 CORS_REJECTED', async () => {
      const res = await fetch(`${WORKER_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: 'https://evil.example.com',
        },
        body: JSON.stringify({
          name: 'Test',
          email: 'test@test.com',
          message: 'Hello',
          tag: 'contact',
          turnstileToken: 'token',
          __hp_field: '',
        }),
      });
      const data = (await res.json()) as { ok: boolean; code: string };
      return res.status === 403 && data.code === 'CORS_REJECTED';
    }),
  );

  // Test 4: Unknown endpoint → 404
  results.push(
    await runTest('Unknown endpoint → 404 NOT_FOUND', async () => {
      const res = await fetch(`${WORKER_URL}/unknown-endpoint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: ALLOWED_ORIGIN,
        },
        body: JSON.stringify({}),
      });
      const data = (await res.json()) as { ok: boolean; code: string };
      return res.status === 404 && data.code === 'NOT_FOUND';
    }),
  );

  // Test 5: OPTIONS preflight → 204
  results.push(
    await runTest('OPTIONS preflight (valid origin) → 204', async () => {
      const res = await fetch(`${WORKER_URL}/contact`, {
        method: 'OPTIONS',
        headers: {
          Origin: ALLOWED_ORIGIN,
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type',
        },
      });
      return res.status === 204;
    }),
  );

  // Print results
  console.log('\nGB Feeds Worker Smoke Tests\n' + '─'.repeat(40));
  let passed = 0;
  let failed = 0;
  for (const r of results) {
    const icon = r.passed ? '✓' : '✗';
    console.log(`  ${icon} ${r.name}`);
    if (!r.passed) {
      console.log(`    → ${r.details}`);
      failed++;
    } else {
      passed++;
    }
  }
  console.log('─'.repeat(40));
  console.log(`  ${passed} passed, ${failed} failed\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Smoke test runner error:', err);
  process.exit(1);
});
