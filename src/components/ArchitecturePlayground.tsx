import React, { useState, useEffect } from 'react';
import { 
  Network, 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowRight, 
  Cpu, 
  Database, 
  Server, 
  Layers, 
  Zap,
  Activity,
  Info
} from 'lucide-react';
import { ArchitectureDiagram } from '../types/portfolio';
import { sounds } from '../utils/audio';

interface ArchitecturePlaygroundProps {
  architectures: ArchitectureDiagram[];
}

export const ArchitecturePlayground: React.FC<ArchitecturePlaygroundProps> = ({ architectures }) => {
  const [selectedArchId, setSelectedArchId] = useState(architectures[0]?.id || '');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const currentArch = architectures.find(a => a.id === selectedArchId) || architectures[0];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentArch) {
      timer = setInterval(() => {
        setActiveStepIndex(prev => {
          if (prev >= currentArch.flowSteps.length - 1) {
            return 0;
          }
          return prev + 1;
        });
      }, 2200);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentArch]);

  if (!currentArch) return null;

  const currentStep = currentArch.flowSteps[activeStepIndex];
  const activeNode = currentArch.nodes.find((n: { id: string }) => n.id === selectedNodeId) || currentArch.nodes[0];

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'client': return Activity;
      case 'gateway': return Zap;
      case 'queue': return Layers;
      case 'service': return Cpu;
      case 'cache': return Server;
      case 'database': return Database;
      default: return Server;
    }
  };

  return (
    <section id="architecture" className="py-24 relative border-t border-slate-800/80 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono font-bold tracking-widest uppercase">
              <Network className="w-3.5 h-3.5 text-cyan-400" />
              <span>Interactive System Blueprints</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Distributed System Architecture
            </h2>
            <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
              Step through live data propagation, consensus replication, and high-throughput pipelines with realistic telemetry.
            </p>
          </div>

          {/* Architecture Switcher */}
          <div className="flex items-center gap-2">
            {architectures.map(arch => (
              <button
                key={arch.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedArchId(arch.id);
                  setActiveStepIndex(0);
                  setIsPlaying(false);
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono tracking-wider uppercase font-semibold transition-all ${
                  selectedArchId === arch.id
                    ? 'bg-white text-black shadow-md'
                    : 'bg-[#0F0F0F] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {arch.title.split(':')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Stage */}
        <div className="rounded-xl bg-[#0F0F0F] border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Top Bar with Playback controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">{currentArch.title}</h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{currentArch.subtitle}</p>
            </div>

            {/* Playback action bar */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setIsPlaying(!isPlaying);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono text-slate-200 border border-slate-800 transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{isPlaying ? 'Pause Simulation' : 'Auto Simulate'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sounds.playKey();
                  setActiveStepIndex(prev => (prev + 1) % currentArch.flowSteps.length);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold"
              >
                <span>Step Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  sounds.playKey();
                  setActiveStepIndex(0);
                  setIsPlaying(false);
                }}
                aria-label="Reset simulation"
                title="Reset simulation step"
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Nodes Visual Flow Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            {currentArch.nodes.map((node) => {
              const Icon = getNodeIcon(node.type);
              const isSource = currentStep?.from === node.id;
              const isTarget = currentStep?.to === node.id;
              const isSelected = selectedNodeId === node.id;

              return (
                <div
                  key={node.id}
                  id={`arch-node-${node.id}`}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedNodeId(node.id);
                  }}
                  className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSource
                      ? 'bg-cyan-950/40 border-cyan-400/80 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : isTarget
                      ? 'bg-purple-950/40 border-purple-400/80 shadow-lg shadow-purple-500/20 scale-[1.02]'
                      : isSelected
                      ? 'bg-slate-800 border-slate-600'
                      : 'bg-[#0A0A0A] border-slate-800/90 hover:border-slate-700'
                  }`}
                >
                  {/* Status Indicator */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${isSource ? 'bg-cyan-500/20 text-cyan-400' : isTarget ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-900 text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {node.latency}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-200 mb-1">{node.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{node.description}</p>
                  </div>

                  {/* Active Pulse Tag */}
                  {(isSource || isTarget) && (
                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[10px] font-mono font-bold">
                      <span className={`w-1.5 h-1.5 rounded-full ${isSource ? 'bg-cyan-400' : 'bg-purple-400'} animate-ping`}></span>
                      <span className={isSource ? 'text-cyan-400' : 'text-purple-400'}>
                        {isSource ? 'DISPATCHING' : 'RECEIVING'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Step Real-time Banner */}
          <div className="p-4 rounded-xl bg-[#0A0A0A] border border-slate-800/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                {currentStep ? currentStep.step : 1}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wide">
                    Active Flow Step:
                  </span>
                  <span className="text-xs font-mono text-cyan-300 font-bold">
                    {currentStep?.protocol}
                  </span>
                </div>
                <p className="text-sm font-semibold text-white mt-0.5">
                  {currentStep?.label} (<span className="text-cyan-400 font-mono">{currentStep?.from}</span> → <span className="text-purple-400 font-mono">{currentStep?.to}</span>)
                </p>
              </div>
            </div>

            {/* Metrics Chips */}
            <div className="flex flex-wrap items-center gap-3">
              {currentArch.stats.map((stat: { label: string; value: string }, i: number) => (
                <div key={i} className="px-3 py-1.5 rounded-lg bg-[#0F0F0F] border border-slate-800 text-xs font-mono">
                  <span className="text-slate-500">{stat.label}: </span>
                  <span className="text-cyan-400 font-bold">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Node Inspector Drawer */}
          {activeNode && (
            <div className="mt-4 p-4 rounded-xl bg-[#0A0A0A] border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-300">
                  <strong className="text-white">{activeNode.title}</strong>: {activeNode.description}
                </span>
              </div>
              <div className="shrink-0 text-slate-400 font-mono text-[11px]">
                Target Hop Latency: <span className="text-cyan-400 font-bold">{activeNode.latency}</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
