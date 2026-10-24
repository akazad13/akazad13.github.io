import { BookOpen, LucideIcon, PenLine, ScrollText } from 'lucide-react';
import { Portfolio } from '../types/portfolio';
import { Section } from './Section';

function SubHeading({ icon: Icon, children }: { icon: LucideIcon; children: string }) {
  return (
    <h3 className="flex items-center gap-2.5 text-xl font-bold">
      <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} aria-hidden="true" />
      {children}
    </h3>
  );
}

const linkClass = 'text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent';

export function Writing({ writing, blogUrl }: { writing: Portfolio['writing']; blogUrl: string }) {
  const { publication, guides, posts, series } = writing;

  return (
    <Section
      id="writing"
      title="Writing"
      icon={PenLine}
      intro={
        <>
          Research, guides, and posts from{' '}
          <a href={blogUrl} target="_blank" rel="noreferrer" className={linkClass}>
            my blog
          </a>
          .
        </>
      }
    >
      <div className="space-y-14">
        <div>
          <SubHeading icon={ScrollText}>Published research</SubHeading>
          <article className="mt-5 rounded-2xl border border-line bg-surface p-6">
            <h4 className="font-display text-lg font-bold leading-snug tracking-tight">
              <a href={publication.url} target="_blank" rel="noreferrer" className={linkClass}>
                {publication.title}
              </a>
            </h4>
            <p className="mt-1 text-[0.92rem] text-muted">{publication.venue}</p>
            <p className="mt-4 max-w-[68ch]">{publication.summary}</p>
            <p className="mt-4 text-[0.9rem] text-muted">{publication.authors}</p>
          </article>
        </div>

        <div>
          <SubHeading icon={BookOpen}>Guides</SubHeading>
          <ul className="mt-5 grid gap-5 sm:grid-cols-3">
            {guides.map((g) => (
              <li key={g.title} className="flex flex-col border-t-2 border-ink pt-4">
                <a href={g.url} target="_blank" rel="noreferrer" className="font-display text-lg font-bold tracking-tight hover:text-accent">
                  {g.title}
                </a>
                <p className="mt-2 text-[0.95rem] text-muted">{g.summary}</p>
                {g.repoUrl !== g.url && (
                  <a href={g.repoUrl} target="_blank" rel="noreferrer" className="mt-3 text-[0.9rem] text-muted underline underline-offset-4 hover:text-ink">
                    Source<span className="sr-only"> for {g.title}</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SubHeading icon={PenLine}>Blog posts</SubHeading>
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {posts.map((p) => (
              <li key={p.title} className="grid gap-1 py-4 sm:grid-cols-[6rem_1fr] sm:gap-6">
                <span className="text-[0.92rem] text-muted">{p.date}</span>
                <div>
                  <a href={p.url} target="_blank" rel="noreferrer" className="font-medium hover:text-accent">
                    {p.title}
                  </a>
                  <p className="text-[0.95rem] text-muted">{p.summary}</p>
                </div>
              </li>
            ))}
            {series.map((s) => (
              <li key={s.title} className="grid gap-1 py-4 sm:grid-cols-[6rem_1fr] sm:gap-6">
                <span className="text-[0.92rem] text-muted">{s.date}</span>
                <div>
                  <p className="font-medium">{s.title} series</p>
                  <p className="text-[0.95rem] text-muted">{s.summary}</p>
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.95rem]">
                    {s.posts.map((post) => (
                      <li key={post.title}>
                        <a href={post.url} target="_blank" rel="noreferrer" className={linkClass}>
                          {post.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
