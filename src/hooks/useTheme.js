import { useState, useCallback } from 'react';
import { base44 } from '@/api/base44Client';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = localStorage.getItem('vaporspace-theme') || 'dark';
    document.documentElement.classList.toggle('dark', stored === 'dark');
    return stored;
  });

  const toggle = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('vaporspace-theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      try { base44.auth.updateMe({ theme_preference: next }); } catch {}
      return next;
    });
  }, []);

  return { theme, toggle };
}