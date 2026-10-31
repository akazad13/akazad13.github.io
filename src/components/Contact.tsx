import { useState } from 'react';
import { Check, Copy, Mail } from 'lucide-react';
import { Profile } from '../types/portfolio';
import { GitHubIcon, LinkedInIcon } from './Icons';

export function Contact({ profile }: { profile: Profile }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied; the mailto link still works.
    }
  };

  const secondary =
    'inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 text-[0.92rem] sm:text-[0.95rem] font-medium transition-colors hover:border-ink/30';

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-8 md:py-24">
        <h2 id="contact-title" className="max-w-[16ch] text-3xl font-extrabold sm:text-5xl md:text-6xl">
          Get in touch
        </h2>
        <p className="mt-4 max-w-[58ch] text-base text-muted sm:mt-6 sm:text-lg">
          I'm happy to talk about healthcare SaaS, payments, .NET modernization, and practical AI in software delivery.
          {profile.openToWork && <> {profile.openToWorkText}</>}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex max-w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-[0.92rem] font-medium text-accent-ink transition-opacity hover:opacity-90 sm:px-5 sm:py-3 sm:text-[0.95rem]"
          >
            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">Email {profile.email}</span>
          </a>
          <button type="button" onClick={copyEmail} className={secondary}>
            {copied ? <Check className="h-4 w-4 text-accent" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copied ? 'Copied' : 'Copy email'}
          </button>
          <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className={secondary}>
            <LinkedInIcon className="h-4 w-4 shrink-0" />
            LinkedIn
          </a>
          <a href={profile.githubUrl} target="_blank" rel="noreferrer" className={secondary}>
            <GitHubIcon className="h-4 w-4 shrink-0" />
            GitHub
          </a>
        </div>
        <p className="sr-only" role="status" aria-live="polite">
          {copied ? 'Email address copied' : ''}
        </p>

        <p className="mt-8 text-[0.95rem] text-muted">
          {profile.location}, {profile.timezone}. I work remotely with teams in the US.
        </p>
      </div>
    </section>
  );
}
