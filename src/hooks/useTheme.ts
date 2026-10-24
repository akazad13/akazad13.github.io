import { useCallback, useState } from 'react';

export type Theme = 'light' | 'dark';

const readTheme = (): Theme =>
  document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

/** The initial theme is set by an inline script in index.html before React loads. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme);

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage can be blocked; the theme still applies for this visit.
    }
    setTheme(next);
  }, []);

  return { theme, toggle };
}
