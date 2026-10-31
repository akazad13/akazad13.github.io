import { useState } from 'react';
import { ExternalLink, LayoutGrid } from 'lucide-react';
import { Project, ProjectKind } from '../types/portfolio';
import { GitHubIcon, IconTile, iconRegistry } from './Icons';
import { Section } from './Section';
import { Tags } from './Tags';

const filters: { id: ProjectKind | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'architecture', label: 'Architecture and APIs' },
  { id: 'product', label: 'Full-stack apps' },
  { id: 'toolkit', label: 'Templates and tools' },
];

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.92rem] font-medium">
      <a href={project.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:underline">
        <GitHubIcon className="h-4 w-4" />
        Source code
        <span className="sr-only">for {project.name}</span>
      </a>
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:underline">
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          {project.liveLabel ?? 'Live demo'}
          <span className="sr-only">for {project.name}</span>
        </a>
      )}
    </div>
  );
}

export function Projects({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectKind | 'all'>('all');

  const visible = projects.filter((p) => filter === 'all' || p.kind === filter);
  const featured = visible.filter((p) => p.featured);
  const rest = visible.filter((p) => !p.featured);

  return (
    <Section
      id="projects"
      title="Projects"
      icon={LayoutGrid}
      intro="Side projects where I try architecture ideas end to end. All open source."
    >
      <div role="group" aria-label="Filter projects" className="-mx-1 mb-8 sm:mb-10 flex flex-wrap gap-2">
        {filters.map((f) => {
          const count = f.id === 'all' ? projects.length : projects.filter((p) => p.kind === f.id).length;
          const selected = filter === f.id;
          const Icon = f.id === 'all' ? LayoutGrid : iconRegistry[f.id];
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(f.id)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 sm:px-3.5 text-[0.88rem] sm:text-[0.9rem] transition-colors ${
                selected ? 'border-ink bg-ink text-bg' : 'border-line text-muted hover:border-ink/30 hover:text-ink'
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              {f.label}
              <span className={`ml-1.5 ${selected ? 'opacity-70' : 'opacity-60'}`}>{count}</span>
            </button>
          );
        })}
      </div>

      {featured.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2">
          {featured.map((p) => (
            <article key={p.name} className="flex flex-col rounded-2xl border border-line bg-surface p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <IconTile name={p.kind} />
                <h3 className="text-xl font-bold">{p.name}</h3>
              </div>
              <p className="mt-3 text-[0.98rem] leading-relaxed">{p.summary}</p>
              {p.why && <p className="mt-3 border-l-2 border-accent pl-3 text-[0.92rem] text-muted">{p.why}</p>}
              <div className="mt-5">
                <Tags items={p.tech} label={`Built with`} />
              </div>
              <div className="mt-auto pt-6">
                <ProjectLinks project={p} />
              </div>
            </article>
          ))}
        </div>
      )}

      {rest.length > 0 && (
        <ul className={`divide-y divide-line border-y border-line ${featured.length > 0 ? 'mt-12' : ''}`}>
          {rest.map((p) => (
            <li key={p.name} className="grid gap-3 py-5 sm:grid-cols-[1fr_auto] sm:gap-8">
              <div className="flex min-w-0 gap-3">
                <IconTile name={p.kind} size="sm" />
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-bold tracking-tight">{p.name}</h3>
                  <p className="mt-1 max-w-[62ch] text-[0.98rem] text-muted">{p.summary}</p>
                  <p className="mt-2 text-[0.88rem] text-muted">
                    <span className="sr-only">Built with </span>
                    {p.tech.join(', ')}
                  </p>
                </div>
              </div>
              <div className="pl-11 sm:pl-0 sm:pt-1">
                <ProjectLinks project={p} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
