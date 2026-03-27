import { useState, useEffect } from 'react';
import StatusBar from '../components/ui/StatusBar';

const PHASES = [
  { label: 'Loading player profile', detail: 'Marcus Webb · 12 HCP · Right-handed', duration: 600 },
  { label: 'Parsing SwingScan results', detail: 'Open clubface · 91% confidence · 4 tendencies', duration: 700 },
  { label: 'Analyzing scorecard data', detail: 'Mar 22 round · Northgate GC · 91 gross', duration: 650 },
  { label: 'Evaluating bag composition', detail: '6 clubs reviewed · 1 gap identified · 1 critical issue', duration: 700 },
  { label: 'Calibrating fitting model', detail: 'Matching swing pattern to equipment specs', duration: 750 },
  { label: 'Generating root cause analysis', detail: '62% swing · 38% equipment contribution', duration: 600 },
  { label: 'Producing recommendations', detail: 'Prioritizing driver · Hybrid addition flagged', duration: 500 },
  { label: 'Finalizing confidence scoring', detail: 'High confidence · 87% match threshold met', duration: 300 },
];

export default function AnalysisScreen({ onNext }) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let elapsed = 0;
    let currentPhase = 0;
    const totalDuration = PHASES.reduce((a, p) => a + p.duration, 0) + 500;

    const progressInterval = setInterval(() => {
      elapsed += 60;
      const pct = Math.min((elapsed / totalDuration) * 100, 97);
      setProgress(pct);
    }, 60);

    let phaseTimer = 0;
    const runPhases = async () => {
      for (let i = 0; i < PHASES.length; i++) {
        await new Promise(resolve => setTimeout(resolve, i === 0 ? 300 : PHASES[i - 1].duration));
        setPhase(i);
      }
      await new Promise(resolve => setTimeout(resolve, PHASES[PHASES.length - 1].duration));
      setProgress(100);
      setDone(true);
      clearInterval(progressInterval);
      setTimeout(onNext, 800);
    };
    runPhases();

    return () => clearInterval(progressInterval);
  }, [onNext]);

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <StatusBar />

      <div className="flex-1 flex flex-col items-center justify-between px-5 py-6">
        {/* Top brand */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-[#e8341c] to-[#f07428] rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-[11px] tracking-tighter">PG</span>
          </div>
          <span className="text-[#555] text-[11px] font-semibold tracking-widest uppercase">AI Analysis</span>
        </div>

        {/* Central orbit visual */}
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Outer orbit ring */}
            <div className="absolute w-48 h-48 rounded-full border border-[#1e1e1e] orbit-3" />
            <div className="absolute w-36 h-36 rounded-full border border-[#252525] orbit-2" />
            <div className="absolute w-24 h-24 rounded-full border border-[#2a2a2a] orbit-1" />

            {/* Orbit dots */}
            <div className="absolute w-48 h-48 orbit-1">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#e8341c] shadow-lg shadow-[#e8341c]/50" />
            </div>
            <div className="absolute w-36 h-36 orbit-2" style={{ animationDuration: '4s' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#f07428] shadow-lg shadow-[#f07428]/50" />
            </div>
            <div className="absolute w-24 h-24 orbit-3" style={{ animationDuration: '2.5s' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/60" />
            </div>

            {/* Center */}
            <div className={`relative z-10 w-16 h-16 bg-gradient-to-br from-[#e8341c] to-[#f07428] rounded-2xl flex items-center justify-center heat-glow transition-all duration-500 ${done ? 'scale-110' : 'scale-100'}`}>
              {done ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20,6 9,17 4,12"/>
                </svg>
              ) : (
                <span className="text-white font-black text-[18px] tracking-tighter">PG</span>
              )}
            </div>
          </div>
        </div>

        {/* Analysis phases */}
        <div className="w-full">
          <div className="mb-6">
            <div className="text-center mb-4">
              <div className="text-[11px] text-[#555] font-semibold uppercase tracking-widest mb-1">
                {done ? 'Analysis Complete' : 'Analyzing Performance Data'}
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className={`text-[20px] font-black ${done ? 'gradient-text' : 'text-white'}`}>
                  {Math.round(progress)}%
                </div>
                {!done && (
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#e8341c] dot-1" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f07428] dot-2" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#888] dot-3" />
                  </div>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-[#1e1e1e] rounded-full overflow-hidden mb-5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#e8341c] to-[#f07428] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Phase list */}
            <div className="flex flex-col gap-2">
              {PHASES.map((p, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 transition-all duration-300 ${
                    i < phase ? 'opacity-40' : i === phase ? 'opacity-100' : 'opacity-20'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                    i < phase ? 'bg-emerald-500/20' : i === phase ? 'bg-gradient-to-br from-[#e8341c] to-[#f07428]' : 'bg-[#1e1e1e]'
                  }`}>
                    {i < phase ? (
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
                    ) : i === phase ? (
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    ) : (
                      <div className="w-1 h-1 rounded-full bg-[#333]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-[12px] font-semibold ${i === phase ? 'text-white' : 'text-[#444]'}`}>{p.label}</div>
                    {i === phase && (
                      <div className="text-[10px] text-[#555] truncate">{p.detail}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-[#111] border border-[#1e1e1e] rounded-xl px-3 py-2.5">
            <p className="text-[10px] text-[#444] text-center leading-relaxed">
              Combining SwingScan · Scorecard · Bag data · Fitting inputs for personalized analysis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
