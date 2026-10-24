import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionProps {
  id: string;
  title: string;
  icon?: LucideIcon;
  intro?: ReactNode;
  children: ReactNode;
}

/** Two-column section: the heading stays pinned on the left while the content scrolls on wide screens. */
export function Section({ id, title, icon: Icon, intro, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 md:grid-cols-[14rem_1fr] md:gap-12 md:py-24">
        <header className="md:sticky md:top-24 md:self-start">
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
