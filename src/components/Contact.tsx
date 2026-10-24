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
    'inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 text-[0.95rem] font-medium transition-colors hover:border-ink/30';

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <h2 id="contact-title" className="max-w-[16ch] text-4xl font-extrabold sm:text-6xl">
          Get in touch
        </h2>
        <p className="mt-6 max-w-[58ch] text-lg text-muted">
          I'm happy to talk about healthcare SaaS, payments, .NET modernization, and practical AI in software delivery.
          {profile.openToWork && <> {profile.openToWorkText}</>}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-[0.95rem] font-medium text-accent-ink transition-opacity hover:opacity-90"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Email {profile.email}
          </a>
          <button type="button" onClick={copyEmail} className={secondary}>
            {copied ? <Check className="h-4 w-4 text-accent" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copied ? 'Copied' : 'Copy email'}
          </button>
          <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className={secondary}>
            <LinkedInIcon className="h-4 w-4" />
            LinkedIn
          </a>
          <a href={profile.githubUrl} target="_blank" rel="noreferrer" className={secondary}>
            <GitHubIcon className="h-4 w-4" />
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
