import { Briefcase, CheckCircle2 } from 'lucide-react';
import { LeadershipPillar } from '../types/portfolio';
import { IconTile } from './Icons';
import { Section } from './Section';

interface LeadershipProps {
  pillars: LeadershipPillar[];
}

export function Leadership({ pillars }: LeadershipProps) {
  if (!pillars || pillars.length === 0) return null;

  return (
    <Section
      id="leadership"
      title="Leadership"
      icon={Briefcase}
      intro="How I lead teams of engineers: pragmatic technical decisions, automated quality standards, frictionless tooling, and psychological safety."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {pillars.map((pillar) => (
          <article
            key={pillar.title}
            className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 transition-all duration-200 hover:border-accent/40 hover:shadow-xs"
          >
            <div>
              <div className="flex items-center gap-3">
                <IconTile name={pillar.icon} size="md" />
                <h3 className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
                  {pillar.title}
                </h3>
              </div>

              <p className="mt-4 text-[0.93rem] leading-relaxed text-muted">
                {pillar.summary}
              </p>
            </div>

            <div className="mt-6 border-t border-line/60 pt-4">
              <p className="text-[0.78rem] font-semibold uppercase tracking-wider text-muted mb-3">
                Key Initiatives & Impact
              </p>
              <ul className="space-y-2.5">
                {pillar.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-[0.88rem] text-ink/90">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent mt-0.5" aria-hidden="true" />
                    <span className="leading-snug">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
