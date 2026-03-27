import StatusBar from '../components/ui/StatusBar';
import ScreenHeader from '../components/ui/ScreenHeader';
import PrimaryButton from '../components/ui/PrimaryButton';
import Badge from '../components/ui/Badge';
import { SCORECARD_DATA } from '../data/mockData';

function StatBar({ value, benchmark, label, inverse = false }) {
  if (!benchmark) return null;
  const pct = typeof value === 'number' ? Math.min(value, 100) : value;
  const isBetter = inverse ? pct < benchmark : pct > benchmark;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[#1e1e1e] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            backgroundColor: isBetter ? '#4ade80' : '#e8341c',
          }}
        />
      </div>
      <div className="flex items-center gap-1">
        <span className={`text-[11px] font-bold ${isBetter ? 'text-emerald-400' : 'text-[#e8341c]'}`}>{value}%</span>
        <span className="text-[10px] text-[#444]">/ {benchmark}% avg</span>
      </div>
    </div>
  );
}

function ScoringDot({ type, count }) {
  const config = {
    eagles: { bg: 'bg-yellow-400', label: 'Eagle' },
    birdies: { bg: 'bg-emerald-400', label: 'Birdie' },
    pars: { bg: 'bg-[#4a9fd5]', label: 'Par' },
    bogeys: { bg: 'bg-[#f07428]', label: 'Bogey' },
    doubles: { bg: 'bg-[#e8341c]', label: 'Double' },
    worse: { bg: 'bg-red-800', label: 'Triple+' },
  };
  const c = config[type];
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-7 h-7 rounded-full ${c.bg} flex items-center justify-center`}>
        <span className="text-white font-black text-[12px]">{count}</span>
      </div>
      <span className="text-[9px] text-[#555] font-medium">{c.label}</span>
    </div>
  );
}

export default function ScorecardScreen({ onNext, onBack }) {
  const sc = SCORECARD_DATA;

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <StatusBar />
      <ScreenHeader onBack={onBack} title="Round Data" step={4} totalSteps={6} />

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* Round header card */}
        <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mb-4 stagger">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-white font-bold text-[14px]">{sc.course}</div>
              <div className="text-[#555] text-[11px]">{sc.date} · {sc.conditions}</div>
            </div>
            <Badge variant="heat">Latest Round</Badge>
          </div>

          {/* Score trio */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#1a1a1a] rounded-xl p-3 text-center">
              <div className="text-[28px] font-black gradient-text leading-none">{sc.score}</div>
              <div className="text-[9px] text-[#555] font-medium uppercase tracking-widest mt-1">Gross</div>
            </div>
            <div className="bg-[#1a1a1a] rounded-xl p-3 text-center">
              <div className="text-[28px] font-black text-white leading-none">{sc.netScore}</div>
              <div className="text-[9px] text-[#555] font-medium uppercase tracking-widest mt-1">Net</div>
            </div>
            <div className="bg-[#1a1a1a] rounded-xl p-3 text-center">
              <div className="text-[28px] font-black text-[#f07428] leading-none">+{sc.score - 72}</div>
              <div className="text-[9px] text-[#555] font-medium uppercase tracking-widest mt-1">Over Par</div>
            </div>
          </div>
        </div>

        {/* Scoring distribution */}
        <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mb-4 stagger">
          <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-3">Scoring Distribution</div>
          <div className="flex justify-around">
            {Object.entries(sc.stats.scoring).map(([type, count]) => (
              <ScoringDot key={type} type={type} count={count} />
            ))}
          </div>
        </div>

        {/* Key stats */}
        <div className="mb-4 stagger">
          <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-2">Performance Stats</div>
          <div className="flex flex-col gap-2">
            {[
              { ...sc.stats.fairwaysHit },
              { ...sc.stats.girPct },
            ].map((stat, i) => (
              <div key={i} className="bg-[#141414] border border-[#1e1e1e] rounded-xl px-4 py-3">
                <div className="flex justify-between mb-2">
                  <span className="text-white text-[12px] font-semibold">{stat.label}</span>
                  <span className="text-[#888] text-[12px] font-bold">{stat.value}</span>
                </div>
                <StatBar value={stat.pct} benchmark={stat.benchmark} label={stat.label} />
              </div>
            ))}

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Total Putts', value: sc.stats.puttsTotal.value, note: 'Par 36', color: sc.stats.puttsTotal.value <= 34 ? '#4ade80' : '#f07428' },
                { label: 'Penalties', value: sc.stats.penalties.value, note: 'Strokes', color: '#e8341c' },
                { label: 'Up & Down', value: sc.stats.upAndDown.value, note: '33%', color: '#f07428' },
              ].map(item => (
                <div key={item.label} className="bg-[#141414] border border-[#1e1e1e] rounded-xl p-2.5 text-center">
                  <div className="text-[20px] font-black" style={{ color: item.color }}>{item.value}</div>
                  <div className="text-[9px] text-[#555] font-medium">{item.label}</div>
                  <div className="text-[9px] text-[#444]">{item.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Miss tendency */}
        <div className="bg-[#140808] border border-[#e8341c]/20 rounded-2xl p-4 mb-4 stagger">
          <div className="text-[10px] text-[#e8341c] font-semibold uppercase tracking-widest mb-2">Miss Tendency</div>
          <div className="text-white font-bold text-[15px] mb-1">{sc.missTendency.direction}</div>
          <p className="text-[11px] text-[#666] leading-relaxed">{sc.missTendency.pattern}</p>
        </div>

        {/* Distance issues */}
        <div className="mb-4 stagger">
          <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-2">Distance & Reliability Issues</div>
          <div className="flex flex-col gap-2">
            {sc.distanceIssues.map((d, i) => (
              <div key={i} className="bg-[#141414] border border-[#1e1e1e] rounded-xl px-4 py-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-semibold text-[13px]">{d.club}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#555] text-[11px]">{d.target}</span>
                    <span className="text-[#444] text-[10px]">→</span>
                    <span className={`text-[11px] font-semibold ${d.actual === 'Unreliable' ? 'text-[#e8341c]' : 'text-[#f07428]'}`}>{d.actual}</span>
                  </div>
                </div>
                <div className="text-[10px] text-[#555]">{d.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* System insight */}
        <div className="bg-[#0f0f10] border border-[#2a2a2a] rounded-2xl px-4 py-3 stagger">
          <div className="text-[10px] text-[#888] font-semibold uppercase tracking-widest mb-1.5">System Insight</div>
          <p className="text-[12px] text-[#666] leading-relaxed">{sc.roundInsight}</p>
        </div>
      </div>

      <div className="px-5 pt-3 pb-2">
        <PrimaryButton onClick={onNext}>
          Attach Round Data
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9,18 15,12 9,6"/>
          </svg>
        </PrimaryButton>
      </div>
    </div>
  );
}
