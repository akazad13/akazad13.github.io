import React from 'react';
import { 
  X,
  Printer,
  Mail,
  MapPin,
  FileCheck
} from 'lucide-react';
import { PortfolioData } from '../types/portfolio';
import { sounds } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioData;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  portfolio
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  return (
    <div 
      id="resume-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        id="resume-modal-window"
        className="w-full max-w-4xl bg-zinc-900 rounded-2xl border border-zinc-700 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
      >
        {/* Action Header */}
        <div className="p-4 bg-[#0F0F0F] border-b border-slate-800 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Executive Resume Preview (ATS-Formatted)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-200 text-black text-xs font-mono font-bold uppercase tracking-wider transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close resume preview"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Paper */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto bg-white text-zinc-900 font-sans text-xs leading-relaxed selection:bg-zinc-200 selection:text-black">
          
          {/* Header */}
          <div className="border-b-2 border-zinc-900 pb-4 mb-6 flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 uppercase font-sans">
                  {portfolio.profile.name}
                </h1>
                <span className="text-sm font-bold text-zinc-700">
                  {portfolio.profile.title}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-600 mt-2 font-mono">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  {portfolio.profile.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-zinc-500" />
                  {portfolio.profile.email}
                </span>
                <span>•</span>
                <span>{portfolio.profile.websiteUrl}</span>
              </div>
            </div>

            {portfolio.profile.avatarUrl && (
              <div className="w-14 h-14 rounded-lg overflow-hidden border border-zinc-300 shrink-0 hidden sm:block">
                <img 
                  src={portfolio.profile.avatarUrl} 
                  alt={portfolio.profile.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center grayscale contrast-125"
                />
              </div>
            )}
          </div>

          {/* Professional Summary */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-1 mb-2 font-mono">
              Professional Summary
            </h2>
            <p className="text-zinc-800 text-xs leading-relaxed">
              {portfolio.profile.bio}
            </p>
          </div>

          {/* Core Technical Competencies */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-1 mb-2 font-mono">
              Core Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-zinc-800">
              <p><strong className="font-semibold text-zinc-950">Languages:</strong> Go, Rust, TypeScript, Python, SQL, C/C++</p>
              <p><strong className="font-semibold text-zinc-950">Distributed Systems:</strong> Raft, gRPC, Protobuf, Kafka, Zero-copy I/O</p>
              <p><strong className="font-semibold text-zinc-950">Cloud & DevOps:</strong> Kubernetes, Docker, Terraform, AWS, GCP, eBPF</p>
              <p><strong className="font-semibold text-zinc-950">Databases & Storage:</strong> PostgreSQL, Citus, Redis, ClickHouse, Qdrant, RocksDB</p>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-1 mb-3 font-mono">
              Professional Experience
            </h2>
            
            <div className="space-y-5">
              {portfolio.experiences.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-zinc-900">
                    <span className="text-sm">{exp.role} — <span className="font-semibold text-zinc-700">{exp.company}</span></span>
                    <span className="text-xs text-zinc-500 font-mono">{exp.period} | {exp.location}</span>
                  </div>

                  <p className="text-zinc-700 text-xs italic">{exp.description}</p>

                  <ul className="list-disc list-outside ml-4 space-y-1 text-zinc-800 text-xs">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="leading-relaxed">{ach}</li>
                    ))}
                  </ul>

                  <p className="text-[11px] text-zinc-600 font-mono">
                    <strong className="text-zinc-800">Technologies:</strong> {exp.technologies.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Engineering Projects */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-1 mb-3 font-mono">
              Selected Systems & Open Source
            </h2>
            <div className="space-y-3">
              {portfolio.projects.slice(0, 3).map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex items-center justify-between font-bold text-zinc-900">
                    <span className="text-xs">{proj.title} ({proj.category})</span>
                    <span className="text-[11px] font-mono text-zinc-500">
                      {proj.metrics.map((m: { label: string; value: string }) => `${m.label}: ${m.value}`).join(' | ')}
                    </span>
                  </div>
                  <p className="text-zinc-700 text-xs">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-1 mb-2 font-mono">
              Education & Credentials
            </h2>
            <div className="flex flex-col sm:flex-row justify-between text-xs text-zinc-800">
              <div>
                <span className="font-bold text-zinc-950">Bachelor of Science in Computer Science & Engineering</span>
                <p className="text-zinc-600">Focus on Distributed Computing, Systems Architecture & Algorithms</p>
              </div>
              <span className="font-mono text-zinc-500">Graduated Magna Cum Laude</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
