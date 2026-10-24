import { useEffect, useRef } from 'react';
import { Printer, X } from 'lucide-react';
import { Portfolio } from '../types/portfolio';

interface ResumeViewProps {
  portfolio: Portfolio;
  years: number;
  onClose: () => void;
}

/** A one-page resume generated from the same data as the site, so the two never drift apart. */
export function ResumeView({ portfolio, years, onClose }: ResumeViewProps) {
  const { profile, experience, skills, background, writing } = portfolio;
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.classList.add('resume-open');
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.classList.remove('resume-open');
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const h2 = 'mt-7 border-b border-line pb-1 font-display text-[1.05rem] font-bold';

  return (
    <div
      id="resume"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black/60 p-3 backdrop-blur-sm sm:p-8"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="resume-toolbar sticky top-0 z-10 mx-auto mb-3 flex max-w-[52rem] items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-ink shadow-lg"
        >
          <Printer className="h-4 w-4" aria-hidden="true" />
          Print or save as PDF
        </button>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-lg bg-surface px-4 py-2 text-sm font-medium text-ink shadow-lg"
        >
          <X className="h-4 w-4" aria-hidden="true" />
          Close
        </button>
      </div>

      <article className="resume-sheet mx-auto max-w-[52rem] break-words rounded-xl border border-line bg-surface px-6 py-8 text-[0.92rem] leading-normal text-ink shadow-2xl sm:px-12 sm:py-12">
        <header>
          <h1 id="resume-title" className="text-3xl font-extrabold">
            {profile.name}
          </h1>
          <p className="mt-1 font-medium">Technical Lead, Full-Stack Software Engineer, .NET and Azure</p>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-muted">
            <li>{profile.location}</li>
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <a href={profile.linkedinUrl}>{profile.linkedinUrl.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '')}</a>
            </li>
            <li>
              <a href={profile.githubUrl}>{profile.githubUrl.replace(/^https:\/\//, '')}</a>
            </li>
          </ul>
        </header>

        <h2 className={h2}>Summary</h2>
        <p className="mt-2">
          Hands-on technical lead with {years}+ years building healthcare SaaS and payment platforms. {profile.summary.split('. ').slice(1).join('. ')}
        </p>

        <h2 className={h2}>Experience</h2>
        {experience.map((employer) =>
          employer.roles.map((role) => (
            <section key={role.title} className="mt-4 break-inside-avoid">
              <div className="flex flex-wrap justify-between gap-x-4">
                <h3 className="font-sans text-[0.95rem] font-semibold tracking-normal">
                  {role.title}, {employer.company}
                </h3>
                <p className="text-muted">
                  {role.period}, {role.setting}
                </p>
              </div>
              <ul className="mt-1.5 list-disc space-y-1 pl-5">
                {[...role.highlights, ...(role.groups?.flatMap((g) => g.highlights) ?? [])].map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </section>
          )),
        )}

        <h2 className={h2}>Skills</h2>
        <dl className="mt-2 space-y-1">
          {skills.map((s) => (
            <div key={s.name} className="sm:flex sm:gap-2">
              <dt className="shrink-0 font-semibold">{s.name}:</dt>
              <dd>{s.items.join(', ')}</dd>
            </div>
          ))}
        </dl>

        <h2 className={h2}>Education</h2>
        <ul className="mt-2 space-y-1.5">
          {background.education.map((e) => (
            <li key={e.degree}>
              <span className="font-semibold">{e.degree}</span>, {e.school}, {e.period}
              {e.note && <>. {e.note}</>}
            </li>
          ))}
        </ul>

        <h2 className={h2}>Recognition and publication</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {background.honors.map((h) => (
            <li key={h}>{h}</li>
          ))}
          <li>
            {writing.publication.title}, {writing.publication.venue}
          </li>
        </ul>

        <h2 className={h2}>Training</h2>
        <p className="mt-2">{background.training.join('; ')}</p>
      </article>
    </div>
  );
}
