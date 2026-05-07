'use client';
// src/components/composite/ContactForm.tsx
// 'use client' — form state.
// Name + email + message + Turnstile. Posts to FORM_ENDPOINT with tag "contact".
// Honeypot __hp_field. Submit disabled until Turnstile token is received.
// Boundary: imports only atomic/ + lib/validators.

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/atomic/Button';
import { contactFormSchema } from '@/lib/validators';

type FormState = 'idle' | 'loading' | 'success' | 'error';

// Extend Window to reference the Turnstile widget API
declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
    };
  }
}

/**
 * <ContactForm> — name + email + message form.
 * Posts { name, email, message, tag: "contact", turnstileToken, __hp_field: "" }.
 * Submit button is disabled until the Turnstile widget issues a token.
 * Falls back gracefully when NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset (dev).
 */
export function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const SITE_KEY = process.env['NEXT_PUBLIC_TURNSTILE_SITE_KEY'] ?? '';

  const FORM_ENDPOINT = process.env['NEXT_PUBLIC_FORM_ENDPOINT'] ?? '';

  // Mount the Turnstile widget imperatively so we can track the token in state.
  // This lets us disable the submit button until the challenge is solved.
  useEffect(() => {
    if (!SITE_KEY || !turnstileRef.current) return;

    // Wait for the Turnstile script to be available (loaded by layout.tsx)
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

  // Whether the submit button should be interactive:
  // - If SITE_KEY is set: must have a valid turnstile token
  // - If SITE_KEY is unset (dev/test): always allow submission
  const canSubmit = SITE_KEY ? turnstileToken.length > 0 : true;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'loading' || !canSubmit) return;

    const form = formRef.current;
    if (!form) return;

    const data = new FormData(form);
    const name = (data.get('name') as string ?? '').trim();
    const email = (data.get('email') as string ?? '').trim();
    const message = (data.get('message') as string ?? '').trim();
    const hp = data.get('__hp_field') as string ?? '';
    // Use the React-tracked token (from imperative render callback) with FormData fallback
    const resolvedToken = turnstileToken || ((data.get('cf-turnstile-response') as string) ?? '');

    const parsed = contactFormSchema.safeParse({
      name,
      email,
      message,
      turnstileToken: resolvedToken,
      __hp_field: hp,
    });

    if (!parsed.success) {
      setErrorMessage(parsed.error.errors[0]?.message ?? 'Invalid input');
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
          name: parsed.data.name,
          email: parsed.data.email,
          message: parsed.data.message,
          tag: 'contact',
          turnstileToken: parsed.data.turnstileToken,
          __hp_field: '',
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setState('success');
      form.reset();
      setTurnstileToken('');
      // Reset the Turnstile widget after successful submission
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    } catch {
      setState('error');
      setErrorMessage('Something went wrong. Please try again or call (620) 639-3337.');
    }
  }

  if (state === 'success') {
    return (
      <div
        className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-success)]
          border border-[var(--color-success)] px-4 py-3"
        role="status"
      >
        Message sent. Greg will get back to you.
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4"
      aria-label="Contact GB Feeds"
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

      {/* Name */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="contact-name"
          className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]"
        >
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          required
          autoComplete="name"
          placeholder="Your name"
          className="w-full bg-transparent border border-[var(--color-rule)]
            font-body text-body-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-quiet)]
            px-3 py-2 focus:outline-none focus:border-[var(--color-ink)]
            transition-colors duration-200"
          disabled={state === 'loading'}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="contact-email"
          className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]"
        >
          Email
        </label>
        <input
          id="contact-email"
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

      {/* Message */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="contact-message"
          className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          placeholder="Property size, feeder type, current feed, season, and what you want to improve."
          className="w-full bg-transparent border border-[var(--color-rule)]
            font-body text-body-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-quiet)]
            px-3 py-2 focus:outline-none focus:border-[var(--color-ink)]
            resize-vertical transition-colors duration-200"
          disabled={state === 'loading'}
        />
      </div>

      {/* Turnstile widget — rendered imperatively via useEffect so we track token in state */}
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
          ? 'Sending...'
          : !canSubmit
            ? 'Complete Verification'
            : 'Send Message'}
      </Button>
    </form>
  );
}
