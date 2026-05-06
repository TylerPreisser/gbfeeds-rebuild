'use client';
// src/components/composite/FieldClubWaitlistForm.tsx
// 'use client' — form state.
// Email-only signup. Posts with tag "field-club-waitlist".
// Submit disabled until Turnstile token is received.
// Boundary: imports only atomic/ + lib/validators.

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/atomic/Button';

// Hand-rolled email validation — replaces zod to eliminate the ~13 KB gz
// zod chunk from routes that load this component. Worker-side validation
// still uses zod (separate edge bundle, no client bundle impact).
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateWaitlistForm(
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

// Turnstile API declaration shared with other form components
declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
    };
  }
}

/**
 * <FieldClubWaitlistForm> — Field Club email waitlist signup.
 * Posts { email, tag: "field-club-waitlist", turnstileToken, __hp_field: "" }.
 * Submit button disabled until Turnstile widget issues a valid token.
 */
export function FieldClubWaitlistForm() {
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const FORM_ENDPOINT = process.env['NEXT_PUBLIC_FORM_ENDPOINT'] ?? '';
  const SITE_KEY = process.env['NEXT_PUBLIC_TURNSTILE_SITE_KEY'] ?? '';

  // Mount Turnstile widget imperatively
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
    const validationError = validateWaitlistForm(email, resolvedToken, hp, !!SITE_KEY);
    if (validationError) {
      setErrorMessage(validationError);
      setState('error');
      return;
    }

    if (!FORM_ENDPOINT) {
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
          tag: 'field-club-waitlist',
          turnstileToken: resolvedToken,
          __hp_field: '',
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
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
          border border-[var(--color-success)] px-4 py-3"
        role="status"
      >
        Your spot is saved. Greg will reach out when the Field Club opens.
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 max-w-md"
      aria-label="Field Club waitlist signup"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="__hp_field"
        defaultValue=""
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
        autoComplete="off"
      />

      <p className="font-body text-body-sm text-[var(--color-ink-muted)] leading-[1.4]">
        Drop your email and we&apos;ll save your spot. Field Club opens when Greg&apos;s ready.
      </p>

      {/* Email */}
      <div className="flex gap-2">
        <div className="flex-1 flex flex-col gap-1">
          <label
            htmlFor="fc-email"
            className="sr-only"
          >
            Email Address
          </label>
          <input
            id="fc-email"
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
        <Button
          type="submit"
          variant={state === 'loading' || !canSubmit ? 'disabled' : 'primary'}
          disabled={state === 'loading' || !canSubmit}
          className="shrink-0"
          aria-disabled={state === 'loading' || !canSubmit}
        >
          {state === 'loading' ? '...' : 'Save My Spot'}
        </Button>
      </div>

      {/* Turnstile widget — rendered imperatively via useEffect */}
      {SITE_KEY && (
        <div
          ref={turnstileRef}
          aria-label="Human verification"
        />
      )}

      {/* Error */}
      {state === 'error' && errorMessage && (
        <p
          className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-danger)]"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </form>
  );
}
