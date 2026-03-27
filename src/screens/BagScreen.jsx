import { useState } from 'react';
import StatusBar from '../components/ui/StatusBar';
import ScreenHeader from '../components/ui/ScreenHeader';
import PrimaryButton from '../components/ui/PrimaryButton';
import Badge from '../components/ui/Badge';
import { CURRENT_BAG } from '../data/mockData';

const FLAG_CONFIG = {
  critical: { label: 'Critical', variant: 'critical' },
  moderate: { label: 'Moderate', variant: 'warning' },
  minor: { label: 'Minor', variant: 'default' },
  gap: { label: 'Gap', variant: 'purple' },
};

function HealthBar({ score, flag }) {
  const color = flag === 'critical' ? '#e8341c' : flag === 'gap' ? '#a855f7' : flag === 'moderate' ? '#f07428' : score >= 70 ? '#4ade80' : '#f07428';
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="flex-1 h-1 bg-[#1e1e1e] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-[11px] font-bold" style={{ color }}>
        {flag === 'gap' ? '—' : score}
      </span>
    </div>
  );
}

export default function BagScreen({ onNext, onBack }) {
  const [expandedIdx, setExpandedIdx] = useState(0);
  const [frustration, setFrustration] = useState('Driver slices badly under pressure');

  const overallHealth = Math.round(
    CURRENT_BAG.filter(c => c.flag !== 'gap').reduce((a, c) => a + c.healthScore, 0) /
    CURRENT_BAG.filter(c => c.flag !== 'gap').length
  );

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <StatusBar />
      <ScreenHeader onBack={onBack} title="Bag Assessment" step={2} totalSteps={6} />

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* Bag health summary */}
        <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mb-5 stagger">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-1">Preliminary Bag Score</div>
              <div className="text-white text-[13px]">Pre-analysis estimate</div>
            </div>
            <div className="text-center">
              <div className="text-[36px] font-black gradient-text leading-none">{overallHealth}</div>
              <div className="text-[10px] text-[#555] font-medium uppercase tracking-wider">/ 100</div>
            </div>
          </div>

          <div className="flex gap-2">
            {CURRENT_BAG.map((c, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-1 cursor-pointer tap-feedback"
                onClick={() => setExpandedIdx(i)}
              >
                <div
                  className={`text-[10px] ${expandedIdx === i ? 'text-[#f07428]' : 'text-[#555]'} font-medium`}
                >
                  {c.category.split(' ')[0].substring(0, 3)}
                </div>
                <div
                  className="w-full h-[3px] rounded-full"
                  style={{
                    backgroundColor: c.flag === 'critical' ? '#e8341c' : c.flag === 'gap' ? '#a855f7' : c.flag === 'moderate' ? '#f07428' : '#2a2a2a',
                    opacity: expandedIdx === i ? 1 : 0.5,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Club cards */}
        <div className="flex flex-col gap-2 mb-5 stagger">
          {CURRENT_BAG.map((club, i) => (
            <div
              key={i}
              className={`border rounded-2xl overflow-hidden transition-all tap-feedback cursor-pointer ${
                expandedIdx === i
                  ? 'bg-[#141414] border-[#2a2a2a]'
                  : 'bg-[#0f0f0f] border-[#1a1a1a]'
              }`}
              onClick={() => setExpandedIdx(expandedIdx === i ? -1 : i)}
            >
              {/* Club row */}
              <div className="flex items-center gap-3 px-4 py-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  club.flag === 'critical' ? 'bg-[#e8341c]/10' : club.flag === 'gap' ? 'bg-purple-500/10' : 'bg-[#1e1e1e]'
                }`}>
                  <span className="text-[18px]">{club.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-[13px]">{club.category}</span>
                    <Badge variant={FLAG_CONFIG[club.flag].variant} size="xs">
                      {FLAG_CONFIG[club.flag].label}
                    </Badge>
                  </div>
                  <div className="text-[11px] text-[#555] truncate">{club.model}</div>
                  {club.flag !== 'gap' && <HealthBar score={club.healthScore} flag={club.flag} />}
                </div>
                <div className={`w-4 h-4 flex items-center justify-center text-[#444] transition-transform ${expandedIdx === i ? 'rotate-180' : ''}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="6,9 12,15 18,9"/>
                  </svg>
                </div>
              </div>

              {/* Expanded detail */}
              {expandedIdx === i && (
                <div className="px-4 pb-4 border-t border-[#1e1e1e]">
                  {club.flag === 'gap' ? (
                    <div className="pt-3">
                      <div className="flex items-start gap-2.5 bg-purple-500/10 border border-purple-500/20 rounded-xl p-3">
                        <span className="text-purple-400 mt-0.5">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        </span>
                        <div>
                          <div className="text-purple-400 text-[11px] font-semibold mb-0.5">Equipment Gap Detected</div>
                          <div className="text-[#888] text-[11px] leading-relaxed">{club.frustration}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-3 grid grid-cols-2 gap-2">
                      {club.loft !== '—' && (
                        <div className="bg-[#1a1a1a] rounded-xl p-2.5">
                          <div className="text-[9px] text-[#555] font-medium uppercase tracking-widest mb-1">Loft</div>
                          <div className="text-white text-[12px] font-semibold">{club.loft}</div>
                        </div>
                      )}
                      {club.flex !== '—' && (
                        <div className="bg-[#1a1a1a] rounded-xl p-2.5">
                          <div className="text-[9px] text-[#555] font-medium uppercase tracking-widest mb-1">Flex</div>
                          <div className="text-white text-[12px] font-semibold">{club.flex}</div>
                        </div>
                      )}
                      <div className="bg-[#1a1a1a] rounded-xl p-2.5">
                        <div className="text-[9px] text-[#555] font-medium uppercase tracking-widest mb-1">Age</div>
                        <div className="text-white text-[12px] font-semibold">{club.age}</div>
                      </div>
                      <div className={`rounded-xl p-2.5 ${club.trusted ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-[#e8341c]/10 border border-[#e8341c]/20'}`}>
                        <div className="text-[9px] text-[#555] font-medium uppercase tracking-widest mb-1">Trust Level</div>
                        <div className={`text-[12px] font-semibold ${club.trusted ? 'text-emerald-400' : 'text-[#e8341c]'}`}>
                          {club.trusted ? '✓ Trusted' : '✗ Avoided'}
                        </div>
                      </div>
                      <div className="col-span-2 bg-[#1a0a08] border border-[#e8341c]/10 rounded-xl p-2.5">
                        <div className="text-[9px] text-[#e8341c] font-medium uppercase tracking-widest mb-1">Main Frustration</div>
                        <div className="text-[#ccc] text-[11px] leading-relaxed">{club.frustration}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Overall frustration */}
        <div className="mb-4 stagger">
          <label className="text-[11px] text-[#888] font-semibold uppercase tracking-widest mb-2 block">Biggest Bag Frustration (Overall)</label>
          <div className="bg-[#141414] border border-[#1e1e1e] rounded-xl px-4 py-3">
            <p className="text-[13px] text-white leading-relaxed">{frustration}</p>
            <p className="text-[10px] text-[#555] mt-1.5">Tap to edit</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-3 pb-2">
        <PrimaryButton onClick={onNext}>
          Attach Bag Data
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9,18 15,12 9,6"/>
          </svg>
        </PrimaryButton>
      </div>
    </div>
  );
}
