import { Briefcase } from 'lucide-react';
import { Employer } from '../types/portfolio';
import { CareerPath } from './CareerPath';
import { Section } from './Section';
import { Tags } from './Tags';

export function Experience({ employers, years }: { employers: Employer[]; years: number }) {
  return (
    <Section
      id="experience"
      title="Experience"
      icon={Briefcase}
      intro={`${years}+ years at one company, promoted from engineer to technical lead.`}
    >
      {employers.map((employer) => (
        <div key={employer.company}>
          <div className="mb-10">
            <h3 className="text-2xl font-bold">
              {employer.url ? (
                <a href={employer.url} target="_blank" rel="noreferrer" className="underline decoration-line underline-offset-4 hover:decoration-accent">
                  {employer.company}
                </a>
              ) : (
                employer.company
              )}
            </h3>
            <p className="mt-2 max-w-[62ch] text-muted">{employer.about}</p>
          </div>

          <CareerPath roles={employer.roles} />

          {/* Roles are a real sequence, so they sit on a timeline, newest first. */}
          <ol className="relative space-y-10 sm:space-y-12 border-l border-line pl-6 sm:pl-9">
            {employer.roles.map((role) => (
              <li key={role.title} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute top-2 -left-[calc(1.5rem+5px)] h-[9px] w-[9px] rounded-full ring-4 ring-bg sm:-left-[calc(2.25rem+5px)] ${
                    role.current ? 'bg-signal' : 'bg-muted'
                  }`}
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h4 className="font-display text-xl font-bold tracking-tight">{role.title}</h4>
                  <p className="text-[0.92rem] text-muted">
                    <time>{role.period}</time>
                    <span className="mx-2" aria-hidden="true">/</span>
                    {role.setting}
                  </p>
                </div>

                <ul className="mt-4 max-w-[68ch] list-disc space-y-2 pl-5 marker:text-muted">
                  {role.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>

                {role.groups?.map((group) => (
                  <div key={group.title} className="mt-6">
                    <h5 className="text-[0.95rem] font-semibold">{group.title}</h5>
                    <ul className="mt-2 max-w-[68ch] list-disc space-y-2 pl-5 marker:text-muted">
                      {group.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="mt-5">
                  <Tags items={role.tech} label={`Technologies used as ${role.title}`} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </Section>
  );
}
