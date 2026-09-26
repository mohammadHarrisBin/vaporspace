import React, { useState } from 'react';
import { X } from 'lucide-react';

const STORAGE_KEY = 'vaporspace_cookie_consent';

export default function CookieBanner() {
  const [accepted, setAccepted] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'true'; } catch { return false; }
  });

  const accept = () => {
    try { localStorage.setItem(STORAGE_KEY, 'true'); } catch {}
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-4 border-t border-border bg-card/95 backdrop-blur-xl px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,.2)]">
      <p className="text-xs text-muted-foreground flex-1 max-w-2xl">
        We use essential cookies and local storage to keep you logged in and save your canvas state. See our{' '}
        <a href="/cookies" className="text-primary underline">Cookie Policy</a>.
      </p>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={accept}
          className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-xs font-medium hover:bg-primary/90 transition-colors"
        >
          Accept
        </button>
        <button
          onClick={accept}
          className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}