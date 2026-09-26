import React from 'react';
import { Link } from 'react-router-dom';
import ProductHuntBadge from '@/components/ProductHuntBadge';

export default function PublicFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-3">
          <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} VaporSpace</span>
          <ProductHuntBadge size="small" />
        </div>
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
          <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
          <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}