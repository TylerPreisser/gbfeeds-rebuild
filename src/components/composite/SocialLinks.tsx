// src/components/composite/SocialLinks.tsx
// RSC-safe social link row shared by home/footer.

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={className ?? 'flex justify-center items-center gap-5 flex-wrap'}>
      <a
        href="https://www.facebook.com/107773225146812"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GB Feeds on Facebook"
        className="flex h-10 w-10 items-center justify-center transition-opacity duration-200 hover:opacity-75"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>

      <a
        href="https://www.instagram.com/gb_feeds"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GB Feeds on Instagram"
        className="flex h-10 w-10 items-center justify-center transition-opacity duration-200 hover:opacity-75"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <radialGradient id="ig-grad-footer" cx="30%" cy="107%" r="150%">
              <stop offset="0%" stopColor="#fdf497" />
              <stop offset="5%" stopColor="#fdf497" />
              <stop offset="45%" stopColor="#fd5949" />
              <stop offset="60%" stopColor="#d6249f" />
              <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#ig-grad-footer)" />
          <circle cx="12" cy="12" r="4.5" fill="none" stroke="white" strokeWidth="1.5" />
          <circle cx="17.5" cy="6.5" r="1" fill="white" />
        </svg>
      </a>

      <a
        href="https://www.tiktok.com/@gb_feeds"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GB Feeds on TikTok"
        className="flex h-10 w-10 items-center justify-center transition-opacity duration-200 hover:opacity-75"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#000000" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.54a8.16 8.16 0 004.77 1.52V7.62a4.85 4.85 0 01-1-.93z" />
        </svg>
      </a>

      <a
        href="https://www.youtube.com/@gbfeeds7593"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GB Feeds on YouTube"
        className="flex h-10 w-10 items-center justify-center transition-opacity duration-200 hover:opacity-75"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#FF0000" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      </a>
    </div>
  );
}
