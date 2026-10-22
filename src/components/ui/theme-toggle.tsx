'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

/** Toggles light/dark. Both icons render on the server; CSS shows the right one, so there is no flash. */
export function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      className="icon-btn theme-btn"
      aria-label={label}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="i-sun" aria-hidden="true" strokeWidth={1.75} />
      <Moon className="i-moon" aria-hidden="true" strokeWidth={1.75} />
    </button>
  );
}
