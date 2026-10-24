import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Layers, 
  Cpu, 
  Activity, 
  Code2, 
  CheckCircle2, 
  ArrowRight,
  X,
  Copy,
  Check,
  Zap
} from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { sounds } from '../utils/audio';

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'overview' | 'architecture' | 'code'>('overview');
  const [copiedCode, setCopiedCode] = useState(false);

  const categories = ['All', 'Distributed Systems', 'Cloud & DevOps', 'AI & ML', 'Full-Stack'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const handleCopyCode = (code: string) => {
    sounds.playKey();
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="projects" className="py-24 relative border-t border-[var(--theme-border)] bg-[var(--theme-bg-canvas)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/20 text-[var(--theme-primary)] text-[10px] font-mono font-bold tracking-widest uppercase">
              <FolderGit2 className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
              <span>Production Systems & Open Source</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              Featured Engineering Work
            </h2>
            <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-sans">
              Real-world distributed systems, telemetry engines, vector stores, and developer platforms engineered for scale and reliability.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`project-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => {
                  sounds.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'text-black font-bold shadow-md'
                    : 'bg-[var(--theme-bg-card)] text-slate-400 hover:text-white border border-[var(--theme-border)]'
                }`}
                style={selectedCategory === cat ? { backgroundColor: 'var(--theme-primary)' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="group rounded-2xl bg-[var(--theme-bg-card)] border border-[var(--theme-border)] hover:border-[var(--theme-primary)]/50 transition-all duration-200 p-6 sm:p-7 flex flex-col justify-between shadow-xl relative overflow-hidden"
            >
              {/* Subtle top accent gradient */}
              <div 
                className="absolute top-0 inset-x-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity" 
                style={{ backgroundColor: 'var(--theme-primary)' }}
              />

              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[var(--theme-bg-canvas)] text-[var(--theme-primary)] border border-[var(--theme-border)]">
                    {project.category}
                  </span>
                  
                  {project.featured && (
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--theme-secondary)] flex items-center gap-1">
                      <Zap className="w-3 h-3 text-[var(--theme-secondary)]" />
                      <span>Featured System</span>
                    </span>
                  )}
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-bold text-white group-hover:text-[var(--theme-primary)] transition-colors mb-2 font-sans">
                  {project.title}
                </h3>
                <p className="text-slate-300 text-sm mb-4 leading-relaxed font-sans font-normal">
                  {project.tagline}
                </p>

                {/* Problem Solved Snippet */}
                <div className="p-3.5 rounded-xl bg-[var(--theme-bg-canvas)] border border-[var(--theme-border)] mb-5 text-xs text-slate-300 leading-relaxed font-sans">
                  <span className="text-[var(--theme-primary)] font-bold font-mono text-[11px] block mb-1 uppercase tracking-wider">Architecture Challenge:</span>
                  {project.problemSolved}
                </div>

                {/* Metrics Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="p-2 rounded-xl bg-[var(--theme-bg-canvas)] border border-[var(--theme-border)] text-center">
                      <div className="text-xs sm:text-sm font-bold text-[var(--theme-primary)] font-mono">{metric.value}</div>
                      <div className="text-[10px] text-slate-400 leading-tight mt-0.5 font-sans">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer: Tech Stack & Actions */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-[var(--theme-bg-canvas)] text-slate-300 border border-[var(--theme-border)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-[var(--theme-border)] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setActiveProjectModal(project);
                      setActiveModalTab('overview');
                    }}
                    className="flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--theme-primary)] hover:underline group-hover:translate-x-0.5 transition-all uppercase tracking-wider"
                  >
                    <span>Deep Architecture Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-[var(--theme-bg-canvas)] hover:bg-[var(--theme-bg-card-hover)] text-slate-300 hover:text-white transition-colors border border-[var(--theme-border)]"
                        title="View Source on GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-[var(--theme-bg-canvas)] hover:bg-[var(--theme-bg-card-hover)] text-slate-300 hover:text-white transition-colors border border-[var(--theme-border)]"
                        title="Live Deployment / Docs"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Detailed Project Modal */}
      {activeProjectModal && (
        <div 
          id="project-detail-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveProjectModal(null);
          }}
        >
          <div 
            id="project-detail-modal"
            className="w-full max-w-3xl bg-[var(--theme-bg-card)] rounded-2xl border border-[var(--theme-border)] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-6 bg-[var(--theme-bg-canvas)] border-b border-[var(--theme-border)] flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-lg bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/20 text-[var(--theme-primary)]">
                    {activeProjectModal.category}
                  </span>
                  <span className="text-slate-400 text-xs font-mono">Specification & Design Document</span>
                </div>
                <h3 className="text-2xl font-bold text-white font-sans">{activeProjectModal.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveProjectModal(null)}
                aria-label="Close project modal"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[var(--theme-bg-card)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-[var(--theme-border)] bg-[var(--theme-bg-canvas)] px-6">
              <button
                onClick={() => {
                  sounds.playClick();
                  setActiveModalTab('overview');
                }}
                className={`py-3 px-4 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-colors ${
                  activeModalTab === 'overview'
                    ? 'border-[var(--theme-primary)] text-[var(--theme-primary)]'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                System Overview
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setActiveModalTab('architecture');
                }}
                className={`py-3 px-4 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-colors ${
                  activeModalTab === 'architecture'
                    ? 'border-[var(--theme-primary)] text-[var(--theme-primary)]'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Architecture & Trade-offs
              </button>
              {activeProjectModal.codeSnippet && (
                <button
                  onClick={() => {
                    sounds.playClick();
                    setActiveModalTab('code');
                  }}
                  className={`py-3 px-4 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-colors ${
                    activeModalTab === 'code'
                      ? 'border-[var(--theme-primary)] text-[var(--theme-primary)]'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Code Implementation
                </button>
              )}
            </div>

            {/* Modal Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
              
              {activeModalTab === 'overview' && (
                <div className="space-y-5">
                  <div>
                    <h4 className="text-[11px] uppercase font-mono text-slate-400 font-bold mb-1.5 tracking-wider">Executive Summary</h4>
                    <p className="text-slate-300 leading-relaxed font-sans">{activeProjectModal.description}</p>
                  </div>

                  <div>
                    <h4 className="text-[11px] uppercase font-mono text-slate-400 font-bold mb-1.5 tracking-wider">The Technical Bottleneck</h4>
                    <div className="p-4 rounded-xl bg-[var(--theme-bg-canvas)] border border-[var(--theme-border)] text-slate-300 font-sans">
                      {activeProjectModal.problemSolved}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[11px] uppercase font-mono text-slate-400 font-bold mb-2 tracking-wider">Verified Production Benchmarks</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {activeProjectModal.metrics.map((m, i) => (
                        <div key={i} className="p-3 rounded-xl bg-[var(--theme-bg-canvas)] border border-[var(--theme-border)] text-center">
                          <p className="text-base font-bold text-[var(--theme-primary)] font-mono">{m.value}</p>
                          <p className="text-xs text-slate-400 mt-0.5 font-sans">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeModalTab === 'architecture' && (
                <div className="space-y-4">
                  <h4 className="text-[11px] uppercase font-mono text-slate-400 font-bold tracking-wider">Key Architectural Decisions:</h4>
                  <ul className="space-y-3">
                    {activeProjectModal.architectureDetails.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--theme-bg-canvas)] border border-[var(--theme-border)]">
                        <CheckCircle2 className="w-4 h-4 text-[var(--theme-primary)] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <h4 className="text-[11px] uppercase font-mono text-slate-400 font-bold mb-2 tracking-wider">Technology Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProjectModal.techStack.map(t => (
                        <span key={t} className="px-2.5 py-1 rounded-lg bg-[var(--theme-bg-canvas)] text-slate-200 text-xs font-mono border border-[var(--theme-border)]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeModalTab === 'code' && activeProjectModal.codeSnippet && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-[var(--theme-bg-canvas)] px-4 py-2 rounded-t-xl border border-[var(--theme-border)] font-mono text-xs text-slate-400">
                    <span>{activeProjectModal.codeSnippet.filename} ({activeProjectModal.codeSnippet.language})</span>
                    <button
                      onClick={() => handleCopyCode(activeProjectModal.codeSnippet!.code)}
                      className="flex items-center gap-1.5 text-xs text-[var(--theme-primary)] hover:underline"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                    </button>
                  </div>
                  <pre className="p-4 bg-black rounded-b-xl border border-t-0 border-[var(--theme-border)] font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
                    <code>{activeProjectModal.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[var(--theme-bg-canvas)] border-t border-[var(--theme-border)] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveProjectModal(null)}
                className="px-4 py-2 rounded-xl bg-[var(--theme-bg-card)] hover:bg-[var(--theme-bg-card-hover)] text-slate-200 text-xs font-mono font-medium border border-[var(--theme-border)]"
              >
                Close Spec
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
