import React from 'react';
import { Image } from '@/components/ui/image';

const LOGO_URL = 'https://media.base44.com/images/public/6ab798703b59b4a0b372ea66/2c0f691d5_generated_e237616f.png';

export default function LegalFooter() {
  return (
    <footer className="border-t border-border bg-background px-4 py-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Image src={LOGO_URL} alt="VaporSpace" className="w-5 h-5 rounded" fittingType="fill" />
          <span className="text-[10px] uppercase tracking-[.26em] text-muted-foreground font-bold font-mono">VAPORSPACE</span>
        </div>
        <nav className="flex items-center gap-4 text-xs text-muted-foreground">
          <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
          <a href="/cookies" className="hover:text-foreground transition-colors">Cookies</a>
        </nav>
        <p className="text-[10px] text-muted-foreground font-mono">© 2026 VaporSpace</p>
      </div>
    </footer>
  );
}