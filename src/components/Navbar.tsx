import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  FileText, 
  Settings2, 
  Menu, 
  X, 
  Volume2, 
  VolumeX, 
  ChevronRight
} from 'lucide-react';
import { ProfileInfo } from '../types/portfolio';
import { sounds } from '../utils/audio';

interface NavbarProps {
  profile: ProfileInfo;
  onOpenTerminal: () => void;
  onOpenResume: () => void;
  onOpenCustomizer: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenTerminal,
  onOpenResume,
  onOpenCustomizer,
  activeSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const active = sounds.toggleSound();
    setSoundActive(active);
  };

  const navLinks = [
    { name: 'About', href: '#about', index: '01' },
    { name: 'Skills', href: '#skills', index: '02' },
    { name: 'Projects', href: '#projects', index: '03' },
    { name: 'Architecture', href: '#architecture', index: '04' },
    { name: 'Experience', href: '#experience', index: '05' },
    { name: 'Notes', href: '#articles', index: '06' },
    { name: 'Contact', href: '#contact', index: '07' },
  ];

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[var(--theme-bg-canvas)]/90 backdrop-blur-md border-b border-[var(--theme-border)] shadow-xl py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a 
          href="#hero" 
          id="navbar-brand-logo"
          className="group flex items-center gap-2.5 text-white font-sans"
          onClick={() => sounds.playClick()}
        >
          {profile.avatarUrl ? (
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-[var(--theme-primary)]/40 bg-[var(--theme-bg-card)] shadow-md group-hover:border-[var(--theme-primary)] group-hover:scale-105 transition-all">
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center" 
              />
            </div>
          ) : (
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-black font-extrabold text-xs shadow-md group-hover:scale-105 transition-transform"
              style={{ backgroundColor: 'var(--theme-primary)' }}
            >
              {profile.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2) || 'CP'}
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white group-hover:text-[var(--theme-primary)] transition-colors uppercase font-sans">
              {profile.name}
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
              CoderPro • {profile.title.split(' ')[0]}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[var(--theme-bg-card)]/80 border border-[var(--theme-border)] rounded-xl px-2.5 py-1 backdrop-blur-sm shadow-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.name}
                href={link.href}
                id={`nav-link-${link.name.toLowerCase()}`}
                onClick={() => sounds.playClick()}
                className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-lg transition-all duration-150 flex items-center gap-1 ${
                  isActive
                    ? 'bg-[var(--theme-primary)]/15 text-[var(--theme-primary)] font-bold border border-[var(--theme-primary)]/30'
                    : 'text-slate-400 hover:text-white hover:bg-[var(--theme-bg-card-hover)]'
                }`}
              >
                <span className="text-[10px] opacity-60">{link.index}.</span>
                <span>{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/20 text-[var(--theme-primary)] text-[10px] font-mono font-bold tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--theme-primary)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--theme-primary)]"></span>
            </span>
            <span className="hidden xl:inline">Available for hire</span>
            <span className="xl:hidden">Available</span>
          </div>

          {/* Sound Toggle */}
          <button
            id="btn-toggle-sound"
            type="button"
            onClick={toggleSound}
            aria-label={soundActive ? "Mute sound effects" : "Enable sound effects"}
            title={soundActive ? "Audio feedback enabled" : "Enable developer audio sfx"}
            className={`p-2 rounded-lg border transition-all text-xs ${
              soundActive
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                : 'bg-[#0F0F0F] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Terminal Launcher */}
          <button
            id="btn-open-terminal"
            type="button"
            onClick={() => {
              sounds.playClick();
              onOpenTerminal();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F0F0F] hover:bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono transition-all hover:border-cyan-500/50 hover:text-cyan-300"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold">CLI</span>
            <kbd className="text-[10px] bg-black text-slate-500 px-1 py-0.5 rounded border border-slate-800">`</kbd>
          </button>

          {/* Resume Viewer */}
          <button
            id="btn-open-resume-nav"
            type="button"
            onClick={() => {
              sounds.playClick();
              onOpenResume();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F0F0F] hover:bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono transition-all hover:border-slate-700 hover:text-white"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Resume</span>
          </button>

          {/* Customizer / Edit Portfolio */}
          <button
            id="btn-open-customizer"
            type="button"
            onClick={() => {
              sounds.playClick();
              onOpenCustomizer();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-cyan-400 text-black text-xs font-bold font-mono tracking-wide shadow-sm transition-all hover:scale-105"
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            id="btn-open-terminal-mobile"
            type="button"
            onClick={() => {
              sounds.playClick();
              onOpenTerminal();
            }}
            aria-label="Open CLI terminal"
            className="p-2 rounded-lg bg-[#0F0F0F] border border-slate-800 text-cyan-400 text-xs font-mono"
          >
            <Terminal className="w-4 h-4" />
          </button>
          
          <button
            id="btn-mobile-menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg bg-[#0F0F0F] border border-slate-800 text-slate-200 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-drawer"
          className="lg:hidden fixed inset-x-0 top-[61px] bg-[#0A0A0A] border-b border-slate-800 p-5 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-200"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  sounds.playClick();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-mono uppercase text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 font-medium"
              >
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400">{link.index}.</span>
                  <span>{link.name}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </a>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                sounds.playClick();
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#0F0F0F] border border-slate-800 text-slate-200 text-xs font-mono font-medium"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              <span>View Formatted Resume</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setMobileMenuOpen(false);
                onOpenCustomizer();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white text-black text-xs font-mono font-bold hover:bg-cyan-400"
            >
              <Settings2 className="w-4 h-4" />
              <span>Customize Profile & Data</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
