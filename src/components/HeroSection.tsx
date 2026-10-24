import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  ArrowRight, 
  FileText, 
  Github, 
  Linkedin, 
  Mail, 
  Zap, 
  Code2, 
  HeartHandshake, 
  Copy, 
  Check,
  Sparkles,
  MapPin
} from 'lucide-react';
import { ProfileInfo } from '../types/portfolio';
import { sounds } from '../utils/audio';

interface HeroSectionProps {
  profile: ProfileInfo;
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onOpenTerminal,
  onOpenResume,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [typedCommand, setTypedCommand] = useState('');

  const terminalCommands = [
    'npx introduce-alex-chen',
    'curl https://alexchen.dev/skills',
    'git log --oneline -n 5',
    'cat ~/.config/interests.json'
  ];

  useEffect(() => {
    let currentIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    const typeLoop = () => {
      const currentFullText = terminalCommands[currentIdx];

      if (!isDeleting) {
        setTypedCommand(currentFullText.substring(0, charIdx + 1));
        charIdx++;
        if (charIdx === currentFullText.length) {
          isDeleting = true;
          timeout = setTimeout(typeLoop, 2400);
          return;
        }
      } else {
        setTypedCommand(currentFullText.substring(0, charIdx - 1));
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          currentIdx = (currentIdx + 1) % terminalCommands.length;
          timeout = setTimeout(typeLoop, 400);
          return;
        }
      }

      const speed = isDeleting ? 30 : 60;
      timeout = setTimeout(typeLoop, speed);
    };

    timeout = setTimeout(typeLoop, 600);
    return () => clearTimeout(timeout);
  }, []);

  const handleCopyEmail = () => {
    sounds.playKey();
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] pt-28 pb-16 flex flex-col justify-center overflow-hidden"
    >
      {/* Background Decorative Subtle Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Subtle Warm Glow Spheres */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl -z-10 pointer-events-none opacity-20"
        style={{ backgroundColor: 'var(--theme-primary)' }}
      />
      <div 
        className="absolute top-1/3 right-10 w-72 h-72 rounded-full blur-3xl -z-10 pointer-events-none opacity-15"
        style={{ backgroundColor: 'var(--theme-secondary)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Engineer Profile Avatar & Status Pill */}
            <div className="flex items-center gap-4 flex-wrap">
              {profile.avatarUrl && (
                <div className="relative group shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[var(--theme-primary)]/40 bg-[var(--theme-bg-card)] shadow-lg group-hover:border-[var(--theme-primary)] transition-all">
                    <img 
                      src={profile.avatarUrl} 
                      alt={profile.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span 
                    className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[var(--theme-bg-canvas)] flex items-center justify-center shadow" 
                    style={{ backgroundColor: 'var(--theme-primary)' }}
                    title="Available for opportunities"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                  </span>
                </div>
              )}

              <div className="space-y-1.5">
                {/* Friendly Status Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/30 text-xs font-sans font-medium text-[var(--theme-primary)] shadow-sm">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--theme-primary)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--theme-primary)]"></span>
                  </span>
                  <span>{profile.statusText || "Available for Full-Time Roles & Consulting"}</span>
                </div>

                <div className="text-xs text-slate-400 flex items-center gap-1.5 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Engineer Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans leading-[1.15]">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--theme-primary)] via-emerald-300 to-[var(--theme-secondary)]">{profile.name}</span> <span className="inline-block animate-wiggle origin-bottom-right">👋</span>
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-300 tracking-tight font-sans">
                {profile.title}
              </h2>
            </div>

            {/* Core Bio Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-sans font-normal">
              {profile.bio}
            </p>

            {/* Friendly Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--theme-bg-card)] border border-[var(--theme-border)] hover:border-[var(--theme-primary)]/40 transition-colors">
                <Zap className="w-4 h-4 text-[var(--theme-primary)] shrink-0" />
                <span className="text-xs font-medium text-slate-200 font-sans">Fast & Scalable Systems</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--theme-bg-card)] border border-[var(--theme-border)] hover:border-[var(--theme-primary)]/40 transition-colors">
                <Code2 className="w-4 h-4 text-[var(--theme-secondary)] shrink-0" />
                <span className="text-xs font-medium text-slate-200 font-sans">Developer Tooling & APIs</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--theme-bg-card)] border border-[var(--theme-border)] hover:border-[var(--theme-primary)]/40 transition-colors">
                <HeartHandshake className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200 font-sans">Mentorship & Clean Code</span>
              </div>
            </div>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
              <a
                href="#projects"
                id="hero-cta-projects"
                onClick={() => sounds.playClick()}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-black text-sm font-sans font-bold shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: 'var(--theme-primary)' }}
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                id="hero-cta-terminal"
                type="button"
                onClick={() => {
                  sounds.playClick();
                  onOpenTerminal();
                }}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[var(--theme-bg-card)] hover:bg-[var(--theme-bg-card-hover)] border border-[var(--theme-border)] text-slate-200 text-sm font-medium transition-all hover:border-[var(--theme-primary)]/50 hover:text-[var(--theme-primary)]"
              >
                <Terminal className="w-4 h-4 text-[var(--theme-primary)]" />
                <span>Interactive CLI</span>
              </button>

              <button
                id="hero-cta-resume"
                type="button"
                onClick={() => {
                  sounds.playClick();
                  onOpenResume();
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[var(--theme-bg-card)]/80 hover:bg-[var(--theme-bg-card-hover)] border border-[var(--theme-border)] text-slate-300 text-sm font-medium transition-all hover:border-slate-600 hover:text-white"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Resume</span>
              </button>
            </div>

            {/* Quick Social & Contact row */}
            <div className="flex items-center gap-3 pt-2 flex-wrap">
              <span className="text-xs text-slate-400 font-medium font-sans">Connect:</span>
              
              <button
                id="btn-copy-hero-email"
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--theme-bg-card)] hover:bg-[var(--theme-bg-card-hover)] border border-[var(--theme-border)] text-xs font-mono text-slate-300 transition-all hover:border-[var(--theme-primary)]/40"
                title="Click to copy email address"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{profile.email}</span>
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-[var(--theme-primary)] animate-in zoom-in" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                )}
              </button>

              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                id="hero-social-github"
                aria-label="GitHub Profile"
                className="p-2 rounded-xl bg-[var(--theme-bg-card)] hover:bg-[var(--theme-bg-card-hover)] border border-[var(--theme-border)] text-slate-400 hover:text-white transition-all"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                id="hero-social-linkedin"
                aria-label="LinkedIn Profile"
                className="p-2 rounded-xl bg-[var(--theme-bg-card)] hover:bg-[var(--theme-bg-card-hover)] border border-[var(--theme-border)] text-slate-400 hover:text-white transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Friendly Terminal Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[var(--theme-bg-card)] border border-[var(--theme-border)] shadow-2xl overflow-hidden backdrop-blur-xl">
              
              {/* Window Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[var(--theme-bg-canvas)] border-b border-[var(--theme-border)]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300 text-xs font-mono">
                  <Terminal className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
                  <span>alex@macbook:~</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">zsh</span>
              </div>

              {/* Terminal Body */}
              <div className="p-5 font-mono text-xs space-y-4 text-slate-300 select-text">
                
                {/* Friendly Welcome Greeting */}
                <div className="text-slate-400 leading-relaxed">
                  <span className="text-[var(--theme-primary)] font-semibold">✨ Welcome to my interactive portfolio!</span>
                  <br />
                  <span>Feel free to explore my projects or open the full CLI.</span>
                </div>

                {/* Animated Typing Prompt */}
                <div>
                  <span className="text-[var(--theme-primary)] font-semibold">alex@developer</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-[var(--theme-secondary)]">~</span>
                  <span className="text-slate-400">$ </span>
                  <span className="text-white font-semibold">{typedCommand}</span>
                  <span 
                    className="inline-block w-2 h-4 animate-pulse ml-0.5 align-middle"
                    style={{ backgroundColor: 'var(--theme-primary)' }}
                  ></span>
                </div>

                {/* Simulated Output Blocks */}
                <div className="p-3.5 rounded-xl bg-[var(--theme-bg-canvas)] border border-[var(--theme-border)] space-y-2.5">
                  <div className="flex items-center justify-between text-slate-400 text-[11px] pb-1 border-b border-[var(--theme-border)]">
                    <span className="font-mono text-slate-300 font-semibold text-[11px]">Quick Highlights</span>
                    <span className="text-[var(--theme-primary)] font-semibold text-[10px] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Ready to Collaborate
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-400">Experience: </span>
                      <span className="text-slate-200 font-medium">{profile.yearsOfExperience}+ Years</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Availability: </span>
                      <span className="text-emerald-400 font-medium">Open to roles</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Projects: </span>
                      <span className="text-slate-200 font-medium">{profile.completedProjects}+ Built</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Primary Stack: </span>
                      <span className="text-[var(--theme-primary)] font-medium">Go, TS, Rust, React</span>
                    </div>
                  </div>
                </div>

                {/* Quick Interactive Command Suggestion */}
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Try interactive commands:</span>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onOpenTerminal();
                    }}
                    className="text-xs text-[var(--theme-primary)] hover:underline underline-offset-2 flex items-center gap-1 font-mono font-medium"
                  >
                    <span>Launch CLI Shell</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

              </div>

              {/* Status footer bar */}
              <div className="px-4 py-2.5 bg-[var(--theme-bg-canvas)] border-t border-[var(--theme-border)] flex items-center justify-between text-[10px] font-mono text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--theme-primary)' }}></span>
                    <span>Clean & tested code</span>
                  </span>
                  <span>|</span>
                  <span>Modern developer UX</span>
                </div>
                <span>v2.4.0</span>
              </div>

            </div>
          </div>

        </div>

        {/* Highlight Stats Banner */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-[var(--theme-bg-card)] border border-[var(--theme-border)] backdrop-blur-sm shadow-xl">
          <div className="flex flex-col space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {profile.yearsOfExperience}+
            </span>
            <span className="text-xs text-slate-400 font-medium font-sans">Years of Experience</span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-[var(--theme-primary)] font-mono">
              {profile.uptimeScore}
            </span>
            <span className="text-xs text-slate-400 font-medium font-sans">System Reliability Target</span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {profile.completedProjects}+
            </span>
            <span className="text-xs text-slate-400 font-medium font-sans">Projects Completed</span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-[var(--theme-secondary)] font-mono">
              {profile.githubContributions}+
            </span>
            <span className="text-xs text-slate-400 font-medium font-sans">GitHub Contributions</span>
          </div>
        </div>

      </div>
    </section>
  );
};
