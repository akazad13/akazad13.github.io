import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionProps {
  id: string;
  title: string;
  icon?: LucideIcon;
  intro?: ReactNode;
  children: ReactNode;
}

/** Two-column section: the heading stays pinned on the left on desktop while the content scrolls. On mobile and tablets, it flows naturally full-width. */
export function Section({ id, title, icon: Icon, intro, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:px-8 md:py-20 lg:grid-cols-[15rem_1fr] lg:gap-12 lg:py-24">
        <header className="lg:sticky lg:top-24 lg:self-start">
          {Icon && (
            <span aria-hidden="true" className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-ink">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
          )}
          <h2 id={`${id}-title`} className="text-3xl font-bold sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-3 max-w-prose text-[0.95rem] leading-relaxed text-muted">{intro}</p>}
        </header>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
