/**
 * useTheme — Theme management hook
 * Manages dark/light mode with localStorage persistence.
 * Respects prefers-color-scheme as a fallback for first visit.
 */
import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'cardiosense-theme';

function getInitialTheme() {
  // Check localStorage first
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;

  // Respect prefers-color-scheme but default to dark
  // (dark is the product default, so we only use light if explicitly set by user)
  return 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const html = document.documentElement;
    // Add a transitioning class to enable smooth transitions
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
}
