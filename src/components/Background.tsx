import { useState } from 'react';
import { BadgeCheck, CodeXml, GraduationCap, HeartHandshake, LucideIcon, Trophy } from 'lucide-react';
import { JudgeProfile, Portfolio } from '../types/portfolio';
import { Section } from './Section';

function SubHeading({ icon: Icon, children }: { icon: LucideIcon; children: string }) {
  return (
    <h3 className="flex items-center gap-2.5 text-xl font-bold">
      <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} aria-hidden="true" />
      {children}
    </h3>
  );
}

/** Horizontal bars, one hue, sorted by count. Values are labeled directly, so no axis is needed. */
function SolvedChart({ judges }: { judges: JudgeProfile[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const sorted = [...judges].sort((a, b) => b.solved - a.solved);
  const max = sorted[0]?.solved ?? 1;

  return (
    <figure className="mt-5">
      <ul className="space-y-2.5" aria-hidden="true" onMouseLeave={() => setHovered(null)}>
        {sorted.map((j) => (
          <li
            key={j.name}
            onMouseEnter={() => setHovered(j.name)}
            className={`grid grid-cols-[5.5rem_1fr] sm:grid-cols-[6.5rem_1fr] items-center gap-3 transition-opacity ${
              hovered && hovered !== j.name ? 'opacity-45' : 'opacity-100'
            }`}
            title={`${j.name}: ${j.solved} problems solved`}
          >
            <span className="truncate text-[0.92rem]">{j.name}</span>
            <span className="flex min-w-0 items-center gap-2">
              <span
                className="h-3 rounded-r-[4px] bg-accent transition-all duration-300"
                style={{ width: `${Math.max(4, (j.solved / max) * 78)}%` }}
              />
              <span className="shrink-0 text-[0.88rem] tabular-nums text-muted">{j.solved}</span>
            </span>
          </li>
        ))}
      </ul>
      <table className="sr-only">
        <caption>Problems solved per online judge</caption>
        <thead>
          <tr>
            <th scope="col">Judge</th>
            <th scope="col">Solved</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((j) => (
            <tr key={j.name}>
              <th scope="row">{j.name}</th>
              <td>{j.solved}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[0.88rem] text-muted">
        Profiles:
        {sorted.map((j) => (
          <a key={j.name} href={j.url} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-accent">
            {j.name}
          </a>
        ))}
      </figcaption>
    </figure>
  );
}

export function Background({ background }: { background: Portfolio['background'] }) {
  const { education, honors, training, volunteering, judges } = background;
  const totalSolved = judges.reduce((sum, j) => sum + j.solved, 0);

  return (
    <Section id="background" title="Background" icon={GraduationCap} intro="Education, competitive programming, and training.">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-x-12">
        <div>
          <SubHeading icon={GraduationCap}>Education</SubHeading>
          <ol className="relative mt-5 space-y-6 border-l border-line pl-6">
            {education.map((e) => (
              <li key={e.degree} className="relative">
                <span aria-hidden="true" className="absolute top-2 -left-[calc(1.5rem+5px)] h-[9px] w-[9px] rounded-full bg-accent ring-4 ring-bg" />
                <p className="text-[0.88rem] text-muted">{e.period}</p>
                <p className="font-medium">{e.degree}</p>
                <p className="text-muted">{e.school}</p>
                {e.note && <p className="mt-1 text-[0.92rem] text-muted">{e.note}</p>}
              </li>
            ))}
          </ol>
        </div>

        <div>
          <SubHeading icon={Trophy}>Honors</SubHeading>
          <ul className="mt-5 space-y-3">
            {honors.map((h) => (
              <li key={h} className="flex gap-3">
                <Trophy className="mt-1 h-4 w-4 shrink-0 text-signal" strokeWidth={1.75} aria-hidden="true" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SubHeading icon={CodeXml}>Competitive programming</SubHeading>
          <p className="mt-4">
            <span className="font-display text-4xl font-bold tracking-tight">{totalSolved.toLocaleString('en-US')}</span>
            <span className="ml-2 text-muted">problems solved across {judges.length} online judges</span>
          </p>
          <SolvedChart judges={judges} />
        </div>

        <div className="space-y-10">
          <div>
            <SubHeading icon={BadgeCheck}>Training</SubHeading>
            <ul className="mt-5 space-y-3">
              {training.map((t) => (
                <li key={t} className="flex gap-3">
                  <BadgeCheck className="mt-1 h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SubHeading icon={HeartHandshake}>Volunteering</SubHeading>
            <ul className="mt-5 space-y-3">
              {volunteering.map((v) => (
                <li key={v} className="flex gap-3">
                  <HeartHandshake className="mt-1 h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
