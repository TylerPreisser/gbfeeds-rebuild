'use client';
// src/components/composite/NewsletterForm.tsx
// 'use client' — form state, submit handler.
// Single email input + submit. Posts to NEXT_PUBLIC_FORM_ENDPOINT with tag "newsletter".
// Honeypot __hp_field. Submit disabled until Turnstile token is received.
// Boundary: imports only atomic/ + lib/validators.

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/atomic/Button';

// Hand-rolled email validation — replaces zod to eliminate the ~13 KB gz
// zod chunk from every route that loads this component via Footer.
// Worker-side validation still uses zod (separate edge bundle).
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateNewsletterForm(
  email: string,
  turnstileToken: string,
  hp: string,
  requireToken: boolean,
): string | null {
  if (hp !== '') return 'Bot detected';
  if (!email || !EMAIL_REGEX.test(email) || email.length > 254) return 'Valid email address required';
  if (requireToken && !turnstileToken) return 'Turnstile verification required';
  return null;
}

type FormState = 'idle' | 'loading' | 'success' | 'error';

// Extend Window to reference the Turnstile widget API (shared with ContactForm)
declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
    };
  }
}

/**
 * <NewsletterForm> — email signup for Field Notes.
 * Posts { email, tag: "newsletter", turnstileToken, __hp_field: "" } to FORM_ENDPOINT.
 * Submit button disabled until Turnstile widget issues a valid token.
 * Falls back gracefully when NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset (dev).
 */
export function NewsletterForm() {
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const FORM_ENDPOINT = process.env['NEXT_PUBLIC_FORM_ENDPOINT'] ?? '';
  const SITE_KEY = process.env['NEXT_PUBLIC_TURNSTILE_SITE_KEY'] ?? '';

  // Mount the Turnstile widget imperatively to track the token in React state
  useEffect(() => {
    if (!SITE_KEY || !turnstileRef.current) return;

    const interval = setInterval(() => {
      if (typeof window.turnstile === 'undefined') return;
      clearInterval(interval);

      if (!turnstileRef.current || widgetIdRef.current) return;
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: SITE_KEY,
        theme: 'light',
        callback: (token: string) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
      });
    }, 100);

    return () => clearInterval(interval);
  }, [SITE_KEY]);

  // Submit allowed only when Turnstile token is present (or when running without a key)
  const canSubmit = SITE_KEY ? turnstileToken.length > 0 : true;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'loading' || !canSubmit) return;

    const form = formRef.current;
    if (!form) return;

    const data = new FormData(form);
    const email = (data.get('email') as string ?? '').trim();
    const hp = data.get('__hp_field') as string ?? '';
    const resolvedToken = turnstileToken || ((data.get('cf-turnstile-response') as string) ?? '');

    // Client-side validation (hand-rolled — no zod dependency)
    const validationError = validateNewsletterForm(email, resolvedToken, hp, !!SITE_KEY);
    if (validationError) {
      setErrorMessage(validationError);
      setState('error');
      return;
    }

    if (!FORM_ENDPOINT) {
      // Dev: FORM_ENDPOINT not set — show success without posting
      setState('success');
      return;
    }

    setState('loading');
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          tag: 'newsletter',
          turnstileToken: resolvedToken,
          __hp_field: '',
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      setState('success');
      form.reset();
      setTurnstileToken('');
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    } catch {
      setState('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  }

  if (state === 'success') {
    return (
      <div
        className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-success)]
          border border-[var(--color-success)] px-3 py-2"
        role="status"
      >
        You&apos;re on the list. Greg will be in touch.
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-3"
      aria-label="Newsletter signup"
    >
      {/* Honeypot — hidden from humans, visible to bots */}
      <input
        type="text"
        name="__hp_field"
        defaultValue=""
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
        autoComplete="off"
      />

      {/* Email field */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="newsletter-email"
          className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]"
        >
          Email Address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="yourname@example.com"
          className="w-full bg-transparent border border-[var(--color-rule)]
            font-body text-body-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-quiet)]
            px-3 py-2 focus:outline-none focus:border-[var(--color-ink)]
            transition-colors duration-200"
          disabled={state === 'loading'}
        />
      </div>

      {/* Turnstile widget — rendered imperatively via useEffect so token tracked in state */}
      {SITE_KEY && (
        <div
          ref={turnstileRef}
          aria-label="Human verification"
        />
      )}

      {/* Error message */}
      {state === 'error' && errorMessage && (
        <p
          className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-danger)]"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      <Button
        type="submit"
        variant={state === 'loading' || !canSubmit ? 'disabled' : 'primary'}
        disabled={state === 'loading' || !canSubmit}
        className="w-full justify-center"
        aria-disabled={state === 'loading' || !canSubmit}
      >
        {state === 'loading'
          ? 'Joining...'
          : !canSubmit
            ? 'Complete Verification'
            : 'Join Field Notes'}
      </Button>
    </form>
  );
}
