import { useEffect, useState } from 'react';
import { FileText, Menu, Moon, Sun, X } from 'lucide-react';
import { Theme } from '../hooks/useTheme';

export interface NavItem {
  id: string;
  label: string;
}

interface HeaderProps {
  name: string;
  nav: NavItem[];
  active: string;
  theme: Theme;
  onToggleTheme: () => void;
  onOpenResume: () => void;
}

export function Header({ name, nav, active, theme, onToggleTheme, onOpenResume }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 8);
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const initials = name
    .split(' ')
    .filter((part) => part.length > 2)
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

  const iconButton =
    'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-ink/30 hover:text-ink';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors ${
        scrolled || menuOpen ? 'border-b border-line bg-bg/90 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 font-display text-[1.05rem] font-bold tracking-tight">
          <span aria-hidden="true" className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-sm text-bg">
            {initials}
          </span>
          <span className="hidden sm:inline">{name}</span>
        </a>

        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative rounded-md px-3 py-2 text-[0.92rem] transition-colors ${
                      isActive ? 'font-medium text-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent transition-opacity ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className={iconButton}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={onOpenResume}
            className="hidden items-center gap-2 rounded-lg bg-ink px-3.5 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85 sm:inline-flex"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            Resume
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className={`${iconButton} lg:hidden`}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Sections" className="border-t border-line bg-bg px-5 pb-5 pt-2 sm:px-8 lg:hidden">
          <ul className="divide-y divide-line">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`flex py-3 text-base ${active === item.id ? 'font-medium text-accent' : 'text-ink'}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onOpenResume();
            }}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-bg"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            View resume
          </button>
        </nav>
      )}

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-0.5 origin-left bg-accent"
        style={{ width: '100%', transform: `scaleX(${progress})` }}
      />
    </header>
  );
}
