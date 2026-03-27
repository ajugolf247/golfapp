import StatusBar from '../components/ui/StatusBar';
import PrimaryButton from '../components/ui/PrimaryButton';
import Badge from '../components/ui/Badge';
import BottomNav from '../components/ui/BottomNav';
import { SAVED_REPORTS, GOLFER } from '../data/mockData';

function ScoreTrend({ scores }) {
  const max = Math.max(...scores);
  const min = Math.min(...scores);
  const range = max - min || 1;
  const points = scores.map((s, i) => {
    const x = (i / (scores.length - 1)) * 80;
    const y = 24 - ((s - min) / range) * 20;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="80" height="28" viewBox="0 0 80 28">
      <polyline points={points} fill="none" stroke="url(#trendGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <defs>
        <linearGradient id="trendGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e8341c"/>
          <stop offset="100%" stopColor="#f07428"/>
        </linearGradient>
      </defs>
      {scores.map((s, i) => {
        const x = (i / (scores.length - 1)) * 80;
        const y = 24 - ((s - min) / range) * 20;
        return <circle key={i} cx={x} cy={y} r="2" fill={i === scores.length - 1 ? '#f07428' : '#e8341c'}/>;
      })}
    </svg>
  );
}

export default function SavedReportsScreen({ onRestart, onBack }) {
  const trendScores = SAVED_REPORTS.slice().reverse().map(r => r.bagHealthScore);

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
          <span className="text-white text-[13px] font-semibold">Fitting History</span>
        </div>
        <div className="w-8" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* Player summary strip */}
        <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mb-4 stagger">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#e8341c] to-[#f07428] rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-[13px]">{GOLFER.initials}</span>
            </div>
            <div className="flex-1">
              <div className="text-white font-bold text-[13px]">{GOLFER.name}</div>
              <div className="flex items-center gap-2">
                <span className="text-[#555] text-[11px]">{GOLFER.handicap} HCP</span>
                <span className="text-[#555] text-[11px]">·</span>
                <span className="text-[#e8341c] text-[11px] font-medium">{GOLFER.handicapTrend} trend</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-[#555] mb-0.5">Bag Health Trend</div>
              <ScoreTrend scores={trendScores} />
            </div>
          </div>
        </div>

        {/* Trend summary */}
        <div className="bg-[#0f0f10] border border-[#2a2a2a] rounded-2xl p-3 mb-4 stagger">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-1">Bag Health Progression</div>
              <div className="flex items-center gap-2">
                <span className="text-[#888] text-[12px]">44 → 48 → </span>
                <span className="text-[14px] font-black gradient-text">52</span>
                <span className="text-emerald-400 text-[11px] font-semibold">↑ +8 pts</span>
              </div>
            </div>
            <div className="bg-[#1a1a1a] rounded-xl px-3 py-2 text-center">
              <div className="text-[20px] font-black gradient-text leading-none">52</div>
              <div className="text-[9px] text-[#555]">Current</div>
            </div>
          </div>
        </div>

        {/* Reports list */}
        <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-2">All Reports</div>
        <div className="flex flex-col gap-3 stagger">
          {SAVED_REPORTS.map((report, i) => (
            <div
              key={report.id}
              className={`bg-[#141414] rounded-2xl overflow-hidden border ${
                i === 0 ? 'border-[#2a1a1a]' : 'border-[#1e1e1e]'
              }`}
            >
              {i === 0 && (
                <div className="bg-gradient-to-r from-[#e8341c]/10 to-transparent px-4 py-1.5 border-b border-[#e8341c]/10">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#e8341c]" />
                    <span className="text-[10px] text-[#e8341c] font-semibold">Latest Report</span>
                  </div>
                </div>
              )}

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-white font-bold text-[13px]">{report.date}</div>
                    <div className="text-[#555] text-[10px] font-mono">{report.id}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-[24px] font-black gradient-text leading-none">{report.bagHealthScore}</div>
                    <div className="text-center">
                      <div className="text-[13px] font-black text-[#888]">{report.grade}</div>
                      <div className="text-[9px] text-[#444]">/ 100</div>
                    </div>
                  </div>
                </div>

                <p className="text-[12px] text-[#888] mb-2 leading-relaxed">{report.primaryFinding}</p>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#555]">{report.recommendation}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    report.statusColor === 'green'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-[#f07428]/10 text-[#f07428]'
                  }`}>{report.status}</span>
                </div>
              </div>

              {i === 0 && (
                <div className="px-4 pb-4 border-t border-[#1e1e1e] pt-3">
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl text-[11px] text-[#888] font-medium tap-feedback">
                      View Full Report
                    </button>
                    <button className="flex-1 py-2 bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl text-[11px] text-[#888] font-medium tap-feedback">
                      Share
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Re-check reminder */}
        <div className="bg-[#0f0f14] border border-[#2a2a3a] rounded-2xl p-4 mt-4 stagger">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[#4a9fd5]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4a9fd5" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
              </svg>
            </div>
            <div>
              <div className="text-white font-semibold text-[12px] mb-1">Re-check Scheduled</div>
              <div className="text-[#555] text-[11px] leading-relaxed">
                Based on your action plan, a re-analysis reminder is set for <span className="text-[#888]">May 22, 2026</span> — 60 days after this report.
              </div>
            </div>
          </div>
        </div>

        {/* Seasonal prompt */}
        <div className="bg-[#0f0a08] border border-[#f07428]/10 rounded-2xl px-4 py-3 mt-3 stagger">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#f07428] text-[12px]">🌤</span>
            <span className="text-[#888] text-[11px] font-semibold">Season Start Tip</span>
          </div>
          <p className="text-[#555] text-[11px] leading-relaxed">
            Run a new fitting analysis each season start to account for swing development, new equipment, and new round data.
          </p>
        </div>
      </div>

      <div className="px-5 pt-3 pb-2">
        <PrimaryButton onClick={onRestart} variant="outline">
          Start New Analysis
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
        </PrimaryButton>
      </div>

      <BottomNav active="training" />
    </div>
  );
}
