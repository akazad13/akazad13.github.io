import React from 'react';
import { 
  User, 
  Sparkles, 
  Cpu, 
  Heart, 
  Layers, 
  Users,
  Code2,
  CheckCircle2
} from 'lucide-react';
import { ProfileInfo } from '../types/portfolio';

interface AboutSectionProps {
  profile: ProfileInfo;
  onOpenTerminal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const principles = [
    {
      icon: Code2,
      title: "Pragmatic Simplicity",
      desc: "Writing clean, maintainable code instead of over-engineered complexity. Keeping things easy for future developers and teammates to understand."
    },
    {
      icon: Layers,
      title: "Thoughtful Architecture",
      desc: "Designing resilient systems that gracefully handle edge cases, scale smoothly, and remain dependable under high traffic."
    },
    {
      icon: Cpu,
      title: "Performance with Purpose",
      desc: "Optimizing bottlenecks where they matter most—ensuring sub-second response times, fast page loads, and efficient resource usage."
    },
    {
      icon: Users,
      title: "Empathy & Collaboration",
      desc: "Believing great engineering happens through clear communication, comprehensive documentation, constructive reviews, and mentoring others."
    }
  ];

  return (
    <section id="about" className="py-24 relative border-t border-[var(--theme-border)] bg-[var(--theme-bg-canvas)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Personal Profile & Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/30 text-[var(--theme-primary)] text-xs font-medium font-sans">
                <User className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
                <span>About Me & How I Work</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
                Building thoughtful software that is fast, reliable, and a joy to use
              </h2>
            </div>

            {/* Engineer Profile Card */}
            {profile.avatarUrl && (
              <div className="p-5 rounded-2xl bg-[var(--theme-bg-card)] border border-[var(--theme-border)] flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-lg">
                <div className="relative shrink-0 group">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[var(--theme-primary)]/40 bg-[var(--theme-bg-canvas)] shadow-md group-hover:border-[var(--theme-primary)] transition-colors">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h3 className="text-base font-bold text-white truncate font-sans">{profile.name}</h3>
                    <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                      Active Engineer
                    </span>
                  </div>
                  <p className="text-xs font-sans text-[var(--theme-primary)] font-medium">{profile.title}</p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {profile.shortBio}
                  </p>
                  <div className="pt-1 flex items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 font-sans">
                    <span>📍 {profile.location}</span>
                    <span>⚡ {profile.yearsOfExperience}+ Years Exp</span>
                  </div>
                </div>
              </div>
            )}

            <p className="text-slate-300 text-sm leading-relaxed font-sans">
              I'm a software engineer who enjoys bridging deep backend systems with intuitive web interfaces. Over the past {profile.yearsOfExperience}+ years, I've designed and scaled web platforms, distributed streaming pipelines, and developer tooling used by thousands of engineers every day.
            </p>

            <p className="text-slate-300 text-sm leading-relaxed font-sans">
              I believe the best software is not just technically impressive, but also approachable, maintainable, and well-documented. Whether building high-concurrency microservices in Go and Rust or fluid user interfaces in React and TypeScript, I prioritize clarity and real-world user value.
            </p>

            {/* Core Specialization Overview */}
            <div className="p-5 rounded-2xl bg-[var(--theme-bg-card)] border border-[var(--theme-border)] space-y-3">
              <div className="text-xs font-sans text-[var(--theme-primary)] font-semibold uppercase tracking-wider flex items-center justify-between">
                <span>Core Engineering Focus</span>
                <span className="text-slate-400 font-normal normal-case">Full Stack & Platforms</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300 font-sans">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--theme-primary)] shrink-0" />
                  <span>Full-Stack Web (React & TypeScript)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--theme-primary)] shrink-0" />
                  <span>Scalable Backend Services (Go & Rust)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--theme-secondary)] shrink-0" />
                  <span>Cloud Infrastructure & Kubernetes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--theme-secondary)] shrink-0" />
                  <span>Distributed Databases & Caching</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Values & Principles 2x2 Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map((pr, index) => {
              const Icon = pr.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-[var(--theme-bg-card)] border border-[var(--theme-border)] hover:border-[var(--theme-primary)]/40 hover:bg-[var(--theme-bg-card-hover)] transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/20 text-[var(--theme-primary)] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white font-sans">{pr.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">{pr.desc}</p>
                  </div>

                  <div className="pt-2 border-t border-[var(--theme-border)] text-xs text-slate-400 font-sans">
                    Core Principle 0{index + 1}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
