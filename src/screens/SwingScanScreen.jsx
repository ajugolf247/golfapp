import StatusBar from '../components/ui/StatusBar';
import ScreenHeader from '../components/ui/ScreenHeader';
import PrimaryButton from '../components/ui/PrimaryButton';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import { SWINGSCAN_RESULT } from '../data/mockData';

const SEVERITY_COLOR = {
  High: '#e8341c',
  Moderate: '#f07428',
  Low: '#888888',
};

export default function SwingScanScreen({ onNext, onBack }) {
  const ss = SWINGSCAN_RESULT;

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <StatusBar />
      <ScreenHeader onBack={onBack} title="SwingScan Data" step={3} totalSteps={6} />

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* SwingScan brand header */}
        <div className="bg-gradient-to-r from-[#0f0808] to-[#0a0a0a] border border-[#2a1a1a] rounded-2xl p-4 mb-4 stagger">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#e8341c] to-[#f07428] rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-[13px] tracking-tighter">PG</span>
            </div>
            <div>
              <div className="text-white font-bold text-[14px]">SwingScan AI</div>
              <div className="text-[#555] text-[11px]">{ss.date} · Session {ss.sessionId}</div>
            </div>
            <div className="ml-auto">
              <Badge variant="heat">Latest</Badge>
            </div>
          </div>

          {/* Score bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex justify-between mb-1.5">
                <span className="text-[10px] text-[#555] font-medium uppercase tracking-widest">Swing Score</span>
                <span className="text-[10px] text-[#888]">vs 72 avg</span>
              </div>
              <div className="h-2 bg-[#1e1e1e] rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#e8341c] to-[#f07428]" style={{ width: `${ss.overallScore}%` }} />
              </div>
            </div>
            <div className="text-[28px] font-black gradient-text leading-none">{ss.overallScore}</div>
          </div>
        </div>

        {/* Root flaw */}
        <div className="bg-[#140808] border border-[#e8341c]/20 rounded-2xl p-4 mb-4 stagger">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-[#e8341c]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8341c" strokeWidth="2" strokeLinecap="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-[10px] text-[#e8341c] font-semibold uppercase tracking-widest mb-1">Root Flaw Identified</div>
              <div className="text-white font-bold text-[16px] leading-tight mb-2">{ss.rootFlaw}</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-[#1e1e1e] rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#e8341c] to-[#f07428]" style={{ width: `${ss.rootFlawConfidence}%` }} />
                </div>
                <span className="text-[#e8341c] text-[12px] font-bold">{ss.rootFlawConfidence}%</span>
                <span className="text-[#555] text-[11px]">confidence</span>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting tendencies */}
        <div className="mb-4 stagger">
          <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-2">Supporting Tendencies</div>
          <div className="flex flex-col gap-2">
            {ss.supportingTendencies.map((t, i) => (
              <div key={i} className="bg-[#141414] border border-[#1e1e1e] rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: SEVERITY_COLOR[t.severity] }} />
                  <span className="text-white text-[13px] font-semibold">{t.label}</span>
                  <span className="text-[10px] font-medium ml-auto" style={{ color: SEVERITY_COLOR[t.severity] }}>{t.severity}</span>
                </div>
                <div className="text-[11px] text-[#555] leading-relaxed pl-3.5">{t.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment impact section */}
        <div className="mb-4 stagger">
          <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-2">Swing → Equipment Impact</div>
          <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4">
            <p className="text-[12px] text-[#aaa] leading-relaxed mb-4">{ss.equipmentImpact.summary}</p>

            {[
              { label: 'Driver Impact', value: ss.equipmentImpact.driverImpact, level: 'High' },
              { label: 'Iron Impact', value: ss.equipmentImpact.ironImpact, level: 'Moderate' },
              { label: 'Hybrid Opportunity', value: ss.equipmentImpact.hybridImpact, level: 'Opportunity' },
            ].map((item, i) => (
              <div key={i} className={`${i < 2 ? 'border-b border-[#1e1e1e] mb-3 pb-3' : ''}`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] text-white font-semibold">{item.label}</span>
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                    item.level === 'High' ? 'bg-[#e8341c]/10 text-[#e8341c]' :
                    item.level === 'Moderate' ? 'bg-[#f07428]/10 text-[#f07428]' :
                    'bg-purple-500/10 text-purple-400'
                  }`}>{item.level}</span>
                </div>
                <p className="text-[11px] text-[#666] leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent clips */}
        <div className="mb-4 stagger">
          <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-2">Recent SwingScan Clips</div>
          <div className="flex gap-2">
            {ss.clips.map((clip, i) => (
              <div key={i} className="flex-1 bg-[#141414] border border-[#1e1e1e] rounded-xl p-3 text-center">
                {/* Fake thumbnail */}
                <div className="w-full h-12 bg-[#1e1e1e] rounded-lg mb-2 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a1210] to-[#0a0a0a]" />
                  <div className="relative w-7 h-7 bg-[#e8341c]/20 rounded-full flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#e8341c">
                      <polygon points="5,3 19,12 5,21"/>
                    </svg>
                  </div>
                </div>
                <div className="text-[10px] text-[#888] mb-1">{clip.label}</div>
                <div className={`text-[14px] font-black ${clip.score >= 70 ? 'text-emerald-400' : 'gradient-text'}`}>{clip.score}</div>
                <div className="text-[9px] text-[#555]">{clip.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Differentiator note */}
        <div className="bg-[#0f0f14] border border-[#2a2a3a] rounded-2xl px-4 py-3 stagger">
          <div className="flex gap-2.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0 mt-0.5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
            </svg>
            <p className="text-[11px] text-[#555] leading-relaxed">
              <span className="text-[#888] font-medium">PG Advantage:</span> Unlike generic fitting tools, this analysis uses your actual swing data — not just a questionnaire — to determine equipment fit.
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-3 pb-2">
        <PrimaryButton onClick={onNext}>
          Attach SwingScan Results
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9,18 15,12 9,6"/>
          </svg>
        </PrimaryButton>
      </div>
    </div>
  );
}
