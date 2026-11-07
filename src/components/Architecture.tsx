import { useState } from 'react';
import { Boxes, CheckCircle2, ChevronRight, Layers, Cpu } from 'lucide-react';
import { ArchitectureCaseStudy } from '../types/portfolio';
import { Section } from './Section';
import { Tags } from './Tags';

interface ArchitectureProps {
  studies: ArchitectureCaseStudy[];
}

export function Architecture({ studies }: ArchitectureProps) {
  const [selectedId, setSelectedId] = useState<string>(studies[0]?.id || '');
  const activeStudy = studies.find((s) => s.id === selectedId) || studies[0];

  if (!studies || studies.length === 0 || !activeStudy) return null;

  return (
    <Section
      id="architecture"
      title="Architecture"
      icon={Boxes}
      intro="System design blueprints, distributed event flows, and trade-offs from enterprise healthcare SaaS and embedded payments."
    >
      <div className="space-y-8">
        {/* Case Study Tab Selectors */}
        <div
          role="tablist"
          aria-label="System Architecture Case Studies"
          className="grid grid-cols-1 gap-2 rounded-2xl border border-line bg-surface/80 p-1.5 sm:grid-cols-3"
        >
          {studies.map((study) => {
            const isSelected = study.id === activeStudy.id;
            return (
              <button
                key={study.id}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`study-panel-${study.id}`}
                id={`study-tab-${study.id}`}
                onClick={() => setSelectedId(study.id)}
                className={`rounded-xl px-4 py-3 text-left text-[0.92rem] font-medium transition-all ${
                  isSelected
                    ? 'bg-accent text-accent-ink shadow-sm'
                    : 'text-muted hover:bg-bg hover:text-ink'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">{study.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Architecture Deep-Dive Panel */}
        <article
          role="tabpanel"
          id={`study-panel-${activeStudy.id}`}
          aria-labelledby={`study-tab-${activeStudy.id}`}
          className="rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-8 transition-opacity duration-200"
        >
          {/* Header & Problem Context */}
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                {activeStudy.domain}
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {activeStudy.title}
            </h3>
            <p className="mt-1 text-base text-muted font-medium">
              {activeStudy.subtitle}
            </p>
          </div>

          {/* Challenge & Solution Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-line/80 bg-bg/50 p-4 sm:p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted">
                The Engineering Challenge
              </h4>
              <p className="mt-2 text-[0.93rem] leading-relaxed text-ink/90">
                {activeStudy.challenge}
              </p>
            </div>
            <div className="rounded-xl border border-line/80 bg-bg/50 p-4 sm:p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent">
                Architectural Solution
              </h4>
              <p className="mt-2 text-[0.93rem] leading-relaxed text-ink/90">
                {activeStudy.solution}
              </p>
            </div>
          </div>

          {/* Sequential Event / Message Flow Pipeline (Connected Vertical Pipeline) */}
          <div>
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-accent" aria-hidden="true" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-ink">
                  System Flow & Message Pipeline
                </h4>
              </div>
              <span className="text-xs text-muted font-medium hidden sm:inline">
                Sequential execution flow
              </span>
            </div>

            <ol className="relative mt-6 space-y-4 before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-line sm:before:left-6">
              {activeStudy.flowSteps.map((step) => (
                <li
                  key={step.step}
                  className="relative flex items-start gap-4 sm:gap-5"
                >
                  {/* Step Node */}
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface font-display text-sm font-bold text-accent shadow-xs sm:h-12 sm:w-12">
                    {step.step}
                  </div>

                  {/* Step Content Card */}
                  <div className="flex-1 rounded-xl border border-line bg-bg/40 p-4 transition-colors hover:border-accent/40 sm:p-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h5 className="font-display text-[0.98rem] font-bold text-ink sm:text-base">
                        {step.title}
                      </h5>
                      <span className="inline-flex self-start sm:self-auto items-center rounded-md bg-accent-soft px-2.5 py-1 text-xs font-mono font-medium text-accent">
                        {step.tech}
                      </span>
                    </div>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Architectural Decisions & Trade-Offs */}
          <div>
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <CheckCircle2 className="h-4 w-4 text-accent" aria-hidden="true" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-ink">
                Key Decisions & Trade-Offs
              </h4>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {activeStudy.tradeoffs.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-line bg-bg/40 p-4 sm:p-5">
                  <p className="font-semibold text-sm text-ink flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item.decision}</span>
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted pl-6">
                    {item.rationale}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack Footer */}
          <div className="border-t border-line pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
              Technologies & Standards
            </p>
            <Tags items={activeStudy.tech} />
          </div>
        </article>
      </div>
    </Section>
  );
}
