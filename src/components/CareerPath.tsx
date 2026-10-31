import { useState } from 'react';
import { Role } from '../types/portfolio';

const MONTH = 1000 * 60 * 60 * 24 * 30.44;

const yearsLabel = (months: number) => {
  const years = months / 12;
  const rounded = Math.round(years * 2) / 2;
  return `${rounded} ${rounded === 1 ? 'year' : 'years'}`;
};

/**
 * Career path as one proportional bar: each segment's width is the time spent in that role.
 * Seniority reads as a single hue getting stronger from left to right.
 */
export function CareerPath({ roles }: { roles: Role[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  const now = Date.now();
  const steps = [...roles].reverse().map((role) => {
    const start = new Date(role.start).getTime();
    const end = role.end ? new Date(role.end).getTime() : now;
    return { role, months: Math.max(1, (end - start) / MONTH), startYear: new Date(role.start).getFullYear() };
  });
  const shades = steps.map((_, i) => 50 + (50 * i) / Math.max(1, steps.length - 1));
  const columns = steps.map((s) => `${s.months}fr`).join(' ');

  const dim = (i: number) => (hovered !== null && hovered !== i ? 'opacity-45' : 'opacity-100');

  return (
    <figure className="mb-14 rounded-2xl border border-line bg-surface p-4 sm:p-6">
      <figcaption className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-semibold">Career path</span>
        <span className="text-[0.9rem] text-muted">Bar width shows time in each role</span>
      </figcaption>

      <div
        className="grid gap-[2px]"
        style={{ gridTemplateColumns: columns }}
        onMouseLeave={() => setHovered(null)}
      >
        {steps.map((s, i) => (
          <div
            key={s.role.title}
            onMouseEnter={() => setHovered(i)}
            title={`${s.role.title}: ${yearsLabel(s.months)}`}
            className={`h-4 transition-opacity first:rounded-l-full last:rounded-r-full ${dim(i)}`}
            style={{ backgroundColor: `color-mix(in oklab, var(--accent) ${shades[i]}%, var(--surface))` }}
          />
        ))}
      </div>

      {/* Labels sit under their segment on wider screens and stack on phones and small tablets. */}
      <ol
        className="mt-4 grid gap-4 md:grid-cols-[var(--cols)] md:gap-[2px]"
        style={{ ['--cols' as string]: columns }}
        onMouseLeave={() => setHovered(null)}
      >
        {steps.map((s, i) => (
          <li
            key={s.role.title}
            onMouseEnter={() => setHovered(i)}
            className={`flex gap-3 transition-opacity md:block md:pr-3 ${dim(i)}`}
          >
            <span
              aria-hidden="true"
              className="mt-1.5 h-3 w-3 shrink-0 rounded-full md:hidden"
              style={{ backgroundColor: `color-mix(in oklab, var(--accent) ${shades[i]}%, var(--surface))` }}
            />
            <div className="min-w-0">
              <p className="text-[0.85rem] tabular-nums text-muted">
                {s.startYear}
                {s.role.current ? ' to now' : ''}, {yearsLabel(s.months)}
              </p>
              <p className="font-display text-[1.02rem] font-bold leading-snug tracking-tight">{s.role.title}</p>
              <p className="text-[0.9rem] text-muted">{s.role.scope}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
