import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Building2
} from 'lucide-react';
import { ExperienceItem } from '../types/portfolio';
import { sounds } from '../utils/audio';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id || null);

  const toggleExpand = (id: string) => {
    sounds.playClick();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-24 relative border-t border-slate-800/80 bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono font-bold tracking-widest uppercase">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Career Progression & Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work Experience & Leadership
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Track record of shipping mission-critical infrastructure, reducing cloud overhead, and scaling engineering teams.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-6 space-y-8">
          {experiences.map((exp) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div 
                key={exp.id} 
                className="relative pl-6 sm:pl-8 group"
              >
                {/* Timeline node icon */}
                <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                  exp.isCurrent
                    ? 'bg-cyan-400 border-cyan-200 shadow-md shadow-cyan-500/50'
                    : 'bg-slate-900 border-slate-700 group-hover:border-cyan-400'
                }`} />

                {/* Experience Card */}
                <div 
                  id={`experience-card-${exp.id}`}
                  className={`p-6 rounded-xl border transition-all duration-200 ${
                    isExpanded 
                      ? 'bg-[#0F0F0F] border-slate-700 shadow-xl' 
                      : 'bg-[#0F0F0F]/80 border-slate-800 hover:border-slate-700 hover:bg-[#0F0F0F]'
                  }`}
                >
                  {/* Card Header */}
                  <div 
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer select-none"
                    onClick={() => toggleExpand(exp.id)}
                  >
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {exp.role}
                        </h3>
                        {exp.isCurrent && (
                          <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono font-bold tracking-wider uppercase">
                            CURRENT ROLE
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mt-1">
                        <span className="text-cyan-300 font-semibold flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                          {exp.company}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-400 px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
                        {exp.period}
                      </span>
                      <button
                        type="button"
                        aria-label={isExpanded ? "Collapse role details" : "Expand role details"}
                        className="p-1 rounded-md text-slate-400 hover:text-white"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Expandable Achievements */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-800 space-y-4 animate-in fade-in duration-200">
                      <div>
                        <h4 className="text-[11px] font-mono uppercase font-bold text-slate-400 mb-2 tracking-wider">Key Technical Deliverables & Metrics:</h4>
                        <ul className="space-y-2.5">
                          {exp.achievements.map((ach: string, i: number) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech stack */}
                      <div>
                        <h4 className="text-[11px] font-mono uppercase font-bold text-slate-400 mb-2 tracking-wider">Applied Technologies:</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.technologies.map((tech: string) => (
                            <span key={tech} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] font-mono border border-slate-800">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
