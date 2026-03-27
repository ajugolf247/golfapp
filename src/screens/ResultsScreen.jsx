import { useEffect, useState } from 'react';
import StatusBar from '../components/ui/StatusBar';
import PrimaryButton from '../components/ui/PrimaryButton';
import Badge from '../components/ui/Badge';
import { ANALYSIS_RESULTS, GOLFER } from '../data/mockData';

function BagHealthRing({ score }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg width="144" height="144" viewBox="0 0 144 144" className="-rotate-90">
        <circle cx="72" cy="72" r={radius} fill="none" stroke="#1e1e1e" strokeWidth="8" />
        <circle
          cx="72" cy="72" r={radius}
          fill="none"
          stroke="url(#heatGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? offset : circumference}
          style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1)' }}
        />
        <defs>
          <linearGradient id="heatGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e8341c"/>
            <stop offset="100%" stopColor="#f07428"/>
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[34px] font-black gradient-text leading-none count-reveal">{score}</div>
        <div className="text-[9px] text-[#555] font-semibold uppercase tracking-widest mt-0.5">/ 100</div>
        <div className="text-[10px] text-[#888] font-medium mt-0.5">{ANALYSIS_RESULTS.bagHealthGrade}</div>
      </div>
    </div>
  );
}

export default function ResultsScreen({ onNext, onBack }) {
  const r = ANALYSIS_RESULTS;

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <StatusBar />

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1e1e1e] text-[#888] tap-feedback">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15,18 9,12 15,6"/></svg>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-[#e8341c] to-[#f07428] rounded-md flex items-center justify-center">
            <span className="text-white font-black text-[9px]">PG</span>
          </div>
          <span className="text-white text-[13px] font-semibold">Fitting Results</span>
        </div>
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1e1e1e] text-[#888] tap-feedback">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* Hero — Bag Health Score */}
        <div className="bg-gradient-to-b from-[#120808] to-[#0f0f0f] border border-[#2a1a1a] rounded-2xl p-5 mb-4 stagger">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] text-[#e8341c] font-semibold uppercase tracking-widest mb-1">Bag Health Score</div>
              <div className="text-white text-[13px] font-medium">Mar 22, 2026</div>
              <div className="text-[#555] text-[11px]">{GOLFER.name}</div>
            </div>
            <BagHealthRing score={r.bagHealthScore} />
          </div>

          {/* Confidence */}
          <div className="flex items-center justify-between bg-[#1a1a1a] rounded-xl px-3 py-2.5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 badge-pulse" />
              <span className="text-[12px] text-[#888]">Confidence Level</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold text-[13px]">{r.confidenceLevel}</span>
              <span className="text-[#555] text-[11px]">{r.confidencePct}%</span>
            </div>
          </div>
        </div>

        {/* Primary Finding */}
        <div className="bg-[#140808] border border-[#e8341c]/20 rounded-2xl p-4 mb-4 stagger heat-glow">
          <div className="text-[10px] text-[#e8341c] font-semibold uppercase tracking-widest mb-2">Primary Finding</div>
          <p className="text-white font-bold text-[15px] leading-snug">{r.primaryFinding}</p>
        </div>

        {/* Root Cause Split */}
        <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mb-4 stagger">
          <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-3">Root Cause Split</div>
          <div className="flex gap-2 mb-3">
            <div className="flex-1 bg-[#1a1a1a] rounded-xl p-3 text-center">
              <div className="text-[28px] font-black text-[#4a9fd5] leading-none">{r.rootCauseSplit.swing}%</div>
              <div className="text-[10px] text-[#555] font-medium mt-1">Swing-Related</div>
            </div>
            <div className="flex-1 bg-[#1a0a08] border border-[#e8341c]/20 rounded-xl p-3 text-center">
              <div className="text-[28px] font-black gradient-text leading-none">{r.rootCauseSplit.equipment}%</div>
              <div className="text-[10px] text-[#555] font-medium mt-1">Equipment-Related</div>
            </div>
          </div>
          {/* Split bar */}
          <div className="h-2 rounded-full overflow-hidden flex">
            <div className="bg-[#4a9fd5] rounded-l-full transition-all duration-1000" style={{ width: `${r.rootCauseSplit.swing}%` }} />
            <div className="bg-gradient-to-r from-[#e8341c] to-[#f07428] rounded-r-full transition-all duration-1000" style={{ width: `${r.rootCauseSplit.equipment}%` }} />
          </div>
          <p className="text-[11px] text-[#555] mt-2">Most of your scoring leakage originates in the swing, but your equipment is amplifying it.</p>
        </div>

        {/* Top Recommendation */}
        <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mb-4 stagger">
          <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-2">Top Recommendation</div>
          <p className="text-white font-semibold text-[14px] leading-snug mb-3">{r.topRecommendation}</p>

          {/* Category priority */}
          <div className="flex flex-col gap-2">
            {r.categoryPriority.map((cat, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#1a1a1a] rounded-xl px-3 py-2.5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black ${
                  i === 0 ? 'bg-gradient-to-br from-[#e8341c] to-[#f07428] text-white' : 'bg-[#222] text-[#555]'
                }`}>{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-[12px] font-semibold">{cat.category}</span>
                    <Badge variant={cat.impact === 'High' ? 'critical' : cat.impact === 'Moderate' ? 'warning' : 'default'} size="xs">
                      {cat.impact}
                    </Badge>
                  </div>
                  <div className="text-[10px] text-[#555]">{cat.action} · {cat.reason.substring(0, 40)}…</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Best Action */}
        <div className="bg-gradient-to-r from-[#120808] to-[#0f0f0f] border border-[#2a1a1a] rounded-2xl p-4 mb-2 stagger">
          <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-2">Next Best Action</div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#e8341c] to-[#f07428] rounded-xl flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9,18 15,12 9,6"/></svg>
            </div>
            <div>
              <div className="text-white font-bold text-[14px]">{r.nextBestActionLabel}</div>
              <div className="text-[#555] text-[11px]">Begin with driver replacement or professional evaluation</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pt-3 pb-2 flex flex-col gap-2">
        <PrimaryButton onClick={onNext}>
          View Full Analysis
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9,18 15,12 9,6"/></svg>
        </PrimaryButton>
      </div>
    </div>
  );
}
