import React, { useState, useMemo } from 'react';
import { 
  Code2, 
  Server, 
  Cloud, 
  Database, 
  Layout, 
  Cpu, 
  Search, 
  Sparkles,
  Zap
} from 'lucide-react';
import { SkillItem } from '../types/portfolio';
import { sounds } from '../utils/audio';

interface SkillsSectionProps {
  skills: SkillItem[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Technologies', icon: Sparkles },
    { id: 'languages', label: 'Languages', icon: Code2 },
    { id: 'backend', label: 'Backend & Systems', icon: Server },
    { id: 'cloud', label: 'Cloud & Kubernetes', icon: Cloud },
    { id: 'databases', label: 'Databases & Storage', icon: Database },
    { id: 'frontend', label: 'Frontend & UI', icon: Layout },
    { id: 'architecture', label: 'Architecture & Security', icon: Cpu },
  ];

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
      const matchesSearch = 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.keywords.some((k: string) => k.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [skills, selectedCategory, searchQuery]);

  return (
    <section id="skills" className="py-24 relative border-t border-slate-800/80 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono font-bold tracking-widest uppercase">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Technical Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Engineering Stack & Depth
            </h2>
            <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
              Specialized in high-concurrency systems, low-latency microservices, cloud-native deployments, and modern full-stack platforms.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword (e.g. Raft, eBPF)..."
              className="w-full pl-9 pr-4 py-2 bg-[#0F0F0F] border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 transition-colors font-mono"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`skills-tab-${cat.id}`}
                onClick={() => {
                  sounds.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all duration-150 ${
                  isSelected
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'bg-[#0F0F0F] text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => {
            const isExpanded = activeSkillId === skill.id;
            return (
              <div
                key={skill.id}
                id={`skill-card-${skill.id}`}
                onClick={() => {
                  sounds.playClick();
                  setActiveSkillId(isExpanded ? null : skill.id);
                }}
                className={`group p-5 rounded-xl bg-[#0F0F0F] border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  skill.highlight
                    ? 'border-slate-700 hover:border-cyan-500/60 hover:bg-slate-900/60'
                    : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                }`}
              >
                <div>
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {skill.name}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      {skill.years} yrs exp
                    </span>
                  </div>

                  {/* Level progress bar */}
                  <div className="space-y-1 my-3">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span className="uppercase tracking-wider">Proficiency</span>
                      <span className="text-cyan-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                    {skill.description}
                  </p>
                </div>

                {/* Keywords Chips */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {skill.keywords.map((kw: string) => (
                    <span
                      key={kw}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="p-12 text-center rounded-xl bg-[#0F0F0F] border border-slate-800 text-slate-400 font-mono text-sm">
            No technologies found matching "{searchQuery}".
          </div>
        )}

      </div>
    </section>
  );
};
