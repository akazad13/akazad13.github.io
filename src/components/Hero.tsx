import { ArrowDown, Briefcase, FileText, Globe, Mail, MapPin } from 'lucide-react';
import { Profile } from '../types/portfolio';
import { GitHubIcon, IconTile, LinkedInIcon } from './Icons';

interface HeroProps {
  profile: Profile;
  years: number;
  onOpenResume: () => void;
}

export function Hero({ profile, years, onOpenResume }: HeroProps) {

  return (
    <section id="top" aria-labelledby="hero-title" className="relative">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-28 sm:px-8 md:pb-24 md:pt-32 lg:grid-cols-[1fr_19rem] lg:gap-16">
        <div>
          <div className="rise flex items-center gap-4 sm:gap-5">
            <img
              src={profile.photo}
              alt={profile.name}
              width={96}
              height={96}
              className="h-20 w-20 shrink-0 rounded-full border-2 border-line bg-surface object-cover object-top shadow-sm sm:h-24 sm:w-24"
            />
            <div className="leading-snug">
              <p className="font-display text-xl font-bold tracking-tight sm:text-2xl">{profile.name}</p>
              <p className="text-[0.95rem] text-muted sm:text-base">
                {profile.role}, {profile.company}
              </p>
            </div>
          </div>

          <h1
            id="hero-title"
            className="rise mt-8 max-w-[30ch] font-sans text-[1.85rem] font-medium leading-[1.3] tracking-normal sm:text-[2.25rem] lg:text-[2.6rem]"
            style={{ animationDelay: '80ms' }}
          >
            {profile.headline}
          </h1>

          <p className="rise mt-8 max-w-[60ch] text-lg leading-relaxed text-muted" style={{ animationDelay: '160ms' }}>
            {profile.summary}
          </p>

          {profile.openToWork && (
            <p className="rise mt-4 inline-flex items-center gap-2 text-[0.95rem] font-medium" style={{ animationDelay: '200ms' }}>
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-signal" />
              {profile.openToWorkText}
            </p>
          )}

          <div className="rise mt-10 flex flex-wrap items-center gap-3" style={{ animationDelay: '220ms' }}>
            <a
              href="#experience"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-[0.95rem] font-medium text-accent-ink transition-opacity hover:opacity-90"
            >
              See my experience
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-5 py-3 text-[0.95rem] font-medium transition-colors hover:border-ink/30"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              View resume
            </button>
            <div className="flex items-center gap-1 sm:ml-2">
              <a href={`mailto:${profile.email}`} className="rounded-lg p-2.5 text-muted transition-colors hover:text-ink" aria-label={`Email ${profile.email}`}>
                <Mail className="h-5 w-5" />
              </a>
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="rounded-lg p-2.5 text-muted transition-colors hover:text-ink" aria-label="LinkedIn profile">
                <LinkedInIcon className="h-5 w-5" />
              </a>
              <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="rounded-lg p-2.5 text-muted transition-colors hover:text-ink" aria-label="GitHub profile">
                <GitHubIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <aside className="rise self-end lg:pb-2" style={{ animationDelay: '280ms' }} aria-label="At a glance">
          <h2 className="text-base font-semibold tracking-normal">Right now</h2>
          <ul className="mt-4 space-y-3.5 text-[0.95rem] leading-snug text-muted">
            {profile.now.map((item) => (
              <li key={item.text} className="flex items-start gap-3">
                <IconTile name={item.icon} size="sm" />
                <span className="pt-1.5">{item.text}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-8 space-y-2.5 border-t border-line pt-6 text-[0.95rem]">
            <div className="flex items-center gap-3">
              <Briefcase className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
              <dt className="sr-only">Experience</dt>
              <dd>
                <span className="font-semibold">{years}+ years</span> in software
              </dd>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
              <dt className="sr-only">Based in</dt>
              <dd>
                {profile.location} ({profile.timezone})
              </dd>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
              <dt className="sr-only">Works</dt>
              <dd>Remote, with US teams</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}

