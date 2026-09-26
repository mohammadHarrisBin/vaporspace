import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import Logo from '@/components/Logo';

export default function PublicNav() {
  const [authed, setAuthed] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    base44.auth.isAuthenticated().then(setAuthed).catch(() => {});
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-colors ${scrolled ? 'bg-background/90 backdrop-blur-xl border-b border-border' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="w-8 h-8" />
          <span className="font-bold text-foreground">VaporSpace</span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/templates" className="text-sm text-muted-foreground hover:text-foreground hidden sm:block transition-colors">Templates</Link>
          <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground hidden sm:block transition-colors">Pricing</Link>
          <Link to="/hackathon" className="text-sm text-primary font-medium hidden sm:block transition-colors">Hackathon</Link>
          {authed ? (
            <Link to="/app" className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors">Go to App</Link>
          ) : (
            <>
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Login</Link>
              <Link to="/register" className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}