import { useEffect } from 'react';

export function useInitTheme() {
  useEffect(() => {
    const stored = localStorage.getItem('vaporspace-theme') || 'dark';
    document.documentElement.classList.toggle('dark', stored === 'dark');
  }, []);
}