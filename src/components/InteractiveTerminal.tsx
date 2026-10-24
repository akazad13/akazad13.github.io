import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  X, 
  Maximize2, 
  Minimize2, 
  Trash2, 
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PortfolioData } from '../types/portfolio';
import { sounds } from '../utils/audio';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioData;
  onOpenResume: () => void;
  onOpenCustomizer: () => void;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isOpen,
  onClose,
  portfolio,
  onOpenResume,
  onOpenCustomizer: _onOpenCustomizer,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [commandList, setCommandList] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const availableCommands = [
    'help',
    'skills',
    'projects',
    'experience',
    'cat resume.txt',
    'system-status',
    'sudo hire',
    'contact',
    'architecture',
    'matrix',
    'whoami',
    'clear',
    'exit'
  ];

  // Initial welcome message
  useEffect(() => {
    if (history.length === 0) {
      const welcome: CommandHistoryItem = {
        id: 'welcome',
        command: 'motd',
        timestamp: new Date().toLocaleTimeString(),
        output: (
          <div className="space-y-2 text-zinc-300">
            <p className="text-emerald-400 font-bold">
              ⚡ Welcome to {portfolio.profile.name}'s Interactive CLI v2.4 (x86_64-platform)
            </p>
            <p className="text-zinc-400 text-xs">
              Type <span className="text-emerald-400 font-mono font-semibold">help</span> to view available commands, or click any suggestion pill below. Tab completion and arrow history are enabled.
            </p>
          </div>
        )
      };
      setHistory([welcome]);
    }
  }, [portfolio.profile.name]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    sounds.playKey();

    if (!trimmed) return;

    // Record command in history list
    setCommandList(prev => [...prev, trimmed]);
    setHistoryIndex(null);

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let outputContent: React.ReactNode = null;

    switch (mainCmd) {
      case 'help':
        outputContent = (
          <div className="space-y-2 py-1">
            <p className="text-emerald-400 font-semibold text-xs uppercase tracking-wider">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
              <div><span className="text-emerald-300 font-bold">skills</span> <span className="text-zinc-400">- List categorized engineering stack</span></div>
              <div><span className="text-emerald-300 font-bold">projects</span> <span className="text-zinc-400">- Display production systems & metrics</span></div>
              <div><span className="text-emerald-300 font-bold">experience</span> <span className="text-zinc-400">- Show career timeline & achievements</span></div>
              <div><span className="text-emerald-300 font-bold">cat resume.txt</span> <span className="text-zinc-400">- Print plain text resume in terminal</span></div>
              <div><span className="text-emerald-300 font-bold">system-status</span> <span className="text-zinc-400">- Inspect platform telemetry & SLA</span></div>
              <div><span className="text-emerald-300 font-bold">architecture</span> <span className="text-zinc-400">- High-throughput pipeline overview</span></div>
              <div><span className="text-emerald-300 font-bold">contact</span> <span className="text-zinc-400">- Email, socials & meeting booking</span></div>
              <div><span className="text-emerald-300 font-bold">sudo hire</span> <span className="text-zinc-400">- Direct interview / offer pipeline</span></div>
              <div><span className="text-emerald-300 font-bold">matrix</span> <span className="text-zinc-400">- Toggle cyberpunk matrix overlay</span></div>
              <div><span className="text-emerald-300 font-bold">whoami</span> <span className="text-zinc-400">- Display engineer identity & bio</span></div>
              <div><span className="text-emerald-300 font-bold">clear</span> <span className="text-zinc-400">- Clear terminal screen</span></div>
              <div><span className="text-emerald-300 font-bold">exit</span> <span className="text-zinc-400">- Close the terminal modal</span></div>
            </div>
          </div>
        );
        break;

      case 'skills':
        outputContent = (
          <div className="space-y-2 py-1 text-xs">
            <p className="text-emerald-400 font-semibold">⚡ Technical Skills Matrix:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {['languages', 'backend', 'cloud', 'databases', 'frontend', 'architecture'].map((cat) => {
                const catSkills = portfolio.skills.filter((s) => s.category === cat);
                if (catSkills.length === 0) return null;
                return (
                  <div key={cat} className="p-2.5 rounded bg-zinc-900 border border-zinc-800">
                    <p className="text-teal-400 font-bold uppercase text-[11px] mb-1">{cat}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {catSkills.map((s) => (
                        <span key={s.id} className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200 text-[11px]">
                          {s.name} ({s.level}%)
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
        break;

      case 'projects':
        outputContent = (
          <div className="space-y-3 py-1 text-xs">
            <p className="text-emerald-400 font-semibold">🚀 Production Systems ({portfolio.projects.length}):</p>
            <div className="space-y-2">
              {portfolio.projects.map((p) => (
                <div key={p.id} className="p-2.5 rounded bg-zinc-900 border border-zinc-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-300 font-bold">{p.title}</span>
                    <span className="text-[10px] text-teal-400 bg-teal-950/60 px-1.5 py-0.5 rounded border border-teal-800/40">
                      {p.category}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-[11px]">{p.tagline}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {p.techStack.map((t: string) => (
                      <span key={t} className="text-[10px] text-zinc-400 bg-zinc-800 px-1 rounded">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'experience':
        outputContent = (
          <div className="space-y-3 py-1 text-xs">
            <p className="text-emerald-400 font-semibold">🏢 Career History:</p>
            {portfolio.experiences.map((exp) => (
              <div key={exp.id} className="border-l-2 border-emerald-500/60 pl-3 py-0.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-200">{exp.role} @ {exp.company}</span>
                  <span className="text-zinc-500 text-[11px]">{exp.period}</span>
                </div>
                <p className="text-zinc-400 text-[11px]">{exp.description}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'cat':
        if (args[0] === 'resume.txt' || args[0] === 'resume') {
          outputContent = (
            <div className="p-3 bg-zinc-950 rounded border border-zinc-800 text-[11px] font-mono space-y-2 text-zinc-300">
              <div className="border-b border-zinc-800 pb-2">
                <p className="text-emerald-400 font-bold text-sm">{portfolio.profile.name.toUpperCase()}</p>
                <p className="text-zinc-400">{portfolio.profile.title} | {portfolio.profile.location}</p>
                <p className="text-zinc-500">Email: {portfolio.profile.email} | Web: {portfolio.profile.websiteUrl}</p>
              </div>
              <div>
                <p className="text-teal-400 font-semibold">SUMMARY:</p>
                <p className="text-zinc-400">{portfolio.profile.bio}</p>
              </div>
              <div>
                <p className="text-teal-400 font-semibold">RECENT ROLES:</p>
                {portfolio.experiences.slice(0, 2).map((e) => (
                  <p key={e.id} className="text-zinc-300">
                    • <span className="font-bold">{e.role}</span> @ {e.company} ({e.period})
                  </p>
                ))}
              </div>
              <div className="pt-1">
                <button
                  onClick={() => {
                    sounds.playClick();
                    onOpenResume();
                  }}
                  className="px-2 py-1 bg-emerald-500 text-zinc-950 rounded font-semibold text-[11px] hover:bg-emerald-400"
                >
                  Open Full Printable Resume Modal
                </button>
              </div>
            </div>
          );
        } else {
          outputContent = <p className="text-rose-400 text-xs">cat: {args[0] || 'missing file'}: No such file or directory. Try 'cat resume.txt'</p>;
        }
        break;

      case 'system-status':
        outputContent = (
          <div className="p-3 bg-zinc-900/80 rounded border border-zinc-800 text-xs space-y-2 font-mono">
            <p className="text-emerald-400 font-bold">⚡ CLOUD INFRASTRUCTURE TELEMETRY:</p>
            <div className="grid grid-cols-2 gap-2 text-zinc-300 text-[11px]">
              <div><span className="text-zinc-500">Host:</span> prod-edge-sf-04.k8s</div>
              <div><span className="text-zinc-500">SLA Uptime:</span> {portfolio.profile.uptimeScore}</div>
              <div><span className="text-zinc-500">Memory:</span> 42.1MB / 512MB (Active)</div>
              <div><span className="text-zinc-500">Goroutines:</span> 1,420 healthy</div>
              <div><span className="text-zinc-500">p99 Latency:</span> 0.74ms</div>
              <div><span className="text-zinc-500">Status:</span> <span className="text-emerald-400">READY_FOR_HIRE</span></div>
            </div>
          </div>
        );
        break;

      case 'sudo':
        if (args[0] === 'hire') {
          triggerConfetti();
          sounds.playSuccess();
          outputContent = (
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/60 to-teal-950/60 border border-emerald-500/50 space-y-2 text-xs">
              <p className="text-emerald-300 font-bold text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>ACCESS GRANTED: Candidate Ingestion Pipeline Initialized!</span>
              </p>
              <p className="text-zinc-300">
                Thank you for considering {portfolio.profile.name}! Let's discuss high-impact technical problems and system architecture.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={`mailto:${portfolio.profile.email}?subject=Interview%20Invitation%20for%20${encodeURIComponent(portfolio.profile.name)}`}
                  className="px-3 py-1.5 bg-emerald-500 text-zinc-950 rounded-lg font-bold text-xs hover:bg-emerald-400"
                >
                  Send Interview Invite via Email
                </a>
                <button
                  onClick={() => {
                    sounds.playClick();
                    onOpenResume();
                  }}
                  className="px-3 py-1.5 bg-zinc-800 text-zinc-200 rounded-lg text-xs hover:bg-zinc-700"
                >
                  Download Complete Resume
                </button>
              </div>
            </div>
          );
        } else {
          outputContent = <p className="text-amber-400 text-xs">sudo: permission granted, but try 'sudo hire' for immediate priority access.</p>;
        }
        break;

      case 'contact':
        outputContent = (
          <div className="p-3 bg-zinc-900 rounded border border-zinc-800 text-xs space-y-1.5">
            <p className="text-emerald-400 font-semibold">📬 Contact Coordinates:</p>
            <p className="text-zinc-300"><span className="text-zinc-500">Email:</span> <a href={`mailto:${portfolio.profile.email}`} className="text-emerald-300 underline">{portfolio.profile.email}</a></p>
            <p className="text-zinc-300"><span className="text-zinc-500">GitHub:</span> <a href={portfolio.profile.githubUrl} target="_blank" rel="noreferrer" className="text-emerald-300 underline">{portfolio.profile.githubUrl}</a></p>
            <p className="text-zinc-300"><span className="text-zinc-500">LinkedIn:</span> <a href={portfolio.profile.linkedinUrl} target="_blank" rel="noreferrer" className="text-emerald-300 underline">{portfolio.profile.linkedinUrl}</a></p>
          </div>
        );
        break;

      case 'whoami':
        outputContent = (
          <div className="flex items-start gap-3 p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-xs">
            {portfolio.profile.avatarUrl && (
              <div className="w-12 h-12 rounded-lg overflow-hidden border border-cyan-500/40 shrink-0">
                <img 
                  src={portfolio.profile.avatarUrl} 
                  alt={portfolio.profile.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center" 
                />
              </div>
            )}
            <div className="space-y-1">
              <p className="text-cyan-400 font-bold">{portfolio.profile.name} <span className="text-slate-500 font-normal font-mono">({portfolio.profile.location})</span></p>
              <p className="text-slate-300 font-mono">{portfolio.profile.title}</p>
              <p className="text-slate-400 text-[11px] leading-relaxed">{portfolio.profile.shortBio}</p>
            </div>
          </div>
        );
        break;

      case 'matrix':
        setMatrixMode(prev => !prev);
        outputContent = <p className="text-emerald-400 text-xs font-mono">{!matrixMode ? '>> MATRIX MODE ENGAGED. Terminal phosphors initialized.' : '>> Matrix mode standard theme restored.'}</p>;
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        outputContent = (
          <p className="text-rose-400 text-xs font-mono">
            zsh: command not found: {trimmed}. Type <span className="text-emerald-400 underline cursor-pointer" onClick={() => handleCommand('help')}>help</span> for available commands.
          </p>
        );
    }

    const newHistoryItem: CommandHistoryItem = {
      id: Math.random().toString(36).substring(7),
      command: trimmed,
      output: outputContent,
      timestamp: new Date().toLocaleTimeString()
    };

    setHistory(prev => [...prev, newHistoryItem]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length === 0) return;
      const nextIndex = historyIndex === null ? commandList.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandList[nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandList.length) {
        setHistoryIndex(null);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandList[nextIndex] || '');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (!inputVal.trim()) return;
      const match = availableCommands.find(c => c.startsWith(inputVal.toLowerCase().trim()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <div 
      id="terminal-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        id="terminal-window"
        className={`w-full bg-zinc-950 rounded-2xl border ${
          matrixMode ? 'border-emerald-500/80 shadow-emerald-500/20 shadow-2xl text-emerald-400' : 'border-zinc-800 shadow-2xl text-zinc-200'
        } flex flex-col transition-all duration-300 overflow-hidden ${
          isFullscreen ? 'h-[96vh] max-w-[98vw]' : 'h-[620px] max-w-4xl'
        }`}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0F0F0F] border-b border-slate-800 select-none">
          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={onClose} 
              aria-label="Close terminal" 
              className="w-3.5 h-3.5 rounded-full bg-rose-500/80 hover:bg-rose-500 flex items-center justify-center transition-colors"
            >
              <X className="w-2.5 h-2.5 text-black opacity-0 hover:opacity-100" />
            </button>
            <button 
              type="button"
              onClick={() => setHistory([])} 
              aria-label="Clear terminal" 
              className="w-3.5 h-3.5 rounded-full bg-amber-500/80 hover:bg-amber-500 flex items-center justify-center transition-colors"
            >
              <Trash2 className="w-2 h-2 text-black opacity-0 hover:opacity-100" />
            </button>
            <button 
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)} 
              aria-label="Toggle full screen" 
              className="w-3.5 h-3.5 rounded-full bg-cyan-500/80 hover:bg-cyan-500 flex items-center justify-center transition-colors"
            >
              {isFullscreen ? (
                <Minimize2 className="w-2 h-2 text-black opacity-0 hover:opacity-100" />
              ) : (
                <Maximize2 className="w-2 h-2 text-black opacity-0 hover:opacity-100" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <TerminalIcon className="w-4 h-4 text-emerald-400" />
            <span>developer-terminal ~ {portfolio.profile.name.toLowerCase().replace(' ', '')}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMatrixMode(!matrixMode)}
              className={`text-[11px] px-2 py-0.5 rounded border font-mono ${
                matrixMode ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
              title="Toggle Matrix Glow Mode"
            >
              matrix
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Command Area */}
        <div 
          className={`flex-1 p-4 sm:p-6 overflow-y-auto font-mono text-xs space-y-4 ${
            matrixMode ? 'bg-black text-emerald-400 font-bold' : 'bg-[#0A0A0A] text-slate-200'
          }`}
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-emerald-400 font-semibold">visitor@portfolio</span>
                <span className="text-slate-600">:</span>
                <span className="text-teal-400">~</span>
                <span className="text-slate-300">$</span>
                <span className="text-white font-bold">{item.command}</span>
                <span className="text-[10px] text-slate-600 ml-auto">{item.timestamp}</span>
              </div>
              <div className="pl-4 sm:pl-6">{item.output}</div>
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-emerald-400 font-semibold shrink-0">visitor@portfolio</span>
            <span className="text-slate-600 shrink-0">:</span>
            <span className="text-teal-400 shrink-0">~</span>
            <span className="text-slate-300 shrink-0">$</span>
            <input
              ref={inputRef}
              id="terminal-command-input"
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder-slate-600"
              placeholder="Type 'help' or any command..."
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <div ref={terminalEndRef} />
        </div>

        {/* Quick Suggestion Pills Footer */}
        <div className="p-3 bg-[#0F0F0F] border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-500 text-[11px]">Quick Run:</span>
            {['help', 'skills', 'projects', 'cat resume.txt', 'sudo hire', 'contact'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] border border-slate-800 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>

          <div className="text-[10px] text-slate-500 hidden sm:inline">
            Press <kbd className="bg-slate-800 px-1 rounded text-slate-400">Tab</kbd> to complete, <kbd className="bg-slate-800 px-1 rounded text-slate-400">↑/↓</kbd> for history
          </div>
        </div>
      </div>
    </div>
  );
};
