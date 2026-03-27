import StatusBar from '../components/ui/StatusBar';
import ScreenHeader from '../components/ui/ScreenHeader';
import PrimaryButton from '../components/ui/PrimaryButton';
import Badge from '../components/ui/Badge';
import { EQUIPMENT_RECOMMENDATIONS } from '../data/mockData';

function SpecRow({ label, value, highlight = false }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#1e1e1e] last:border-0">
      <span className="text-[11px] text-[#555]">{label}</span>
      <span className={`text-[12px] font-semibold ${highlight ? 'gradient-text' : 'text-white'}`}>{value}</span>
    </div>
  );
}

function FitScore({ score }) {
  const color = score >= 95 ? '#4ade80' : score >= 90 ? '#f07428' : '#888';
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center" style={{ borderColor: color }}>
        <span className="text-[11px] font-black" style={{ color }}>{score}</span>
      </div>
      <span className="text-[9px] text-[#555] font-medium">fit</span>
    </div>
  );
}

export default function EquipmentScreen({ onNext, onBack }) {
  const { driverProfile, hybridProfile, ironProfile } = EQUIPMENT_RECOMMENDATIONS;

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <StatusBar />
      <ScreenHeader onBack={onBack} title="Equipment Guidance" />

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* Recommendation logic header */}
        <div className="mb-4 stagger">
          <div className="text-[10px] text-[#e8341c] font-semibold uppercase tracking-widest mb-2">Recommendation Logic First</div>
          <p className="text-[12px] text-[#666] leading-relaxed">
            These specs are derived from your swing pattern, scorecard data, and bag analysis — not a generic selector. Club examples appear below the specs.
          </p>
        </div>

        {/* Driver Spec Card */}
        <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl overflow-hidden mb-4 stagger">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1e1e1e]">
            <div className="w-9 h-9 bg-gradient-to-br from-[#e8341c]/20 to-[#f07428]/20 rounded-xl flex items-center justify-center">
              <span className="text-[18px]">🏌️</span>
            </div>
            <div className="flex-1">
              <div className="text-white font-bold text-[14px]">Driver</div>
              <div className="text-[#555] text-[10px]">Priority 1 · Replace</div>
            </div>
            <Badge variant="critical">Critical</Badge>
          </div>

          <div className="px-4 py-3">
            <SpecRow label="Head Profile" value={driverProfile.headType} highlight />
            <SpecRow label="Recommended Loft" value={driverProfile.loftRange} highlight />
            <SpecRow label="Shaft Flex" value={driverProfile.shaftFlex} highlight />
            <SpecRow label="Shaft Length" value={driverProfile.shaftLength} />
            <SpecRow label="Offset / Face Angle" value={driverProfile.offsetPreference} />
          </div>

          <div className="px-4 pb-3">
            <div className="bg-[#1a0a08] border border-[#e8341c]/10 rounded-xl px-3 py-2.5">
              <p className="text-[11px] text-[#888] leading-relaxed">{driverProfile.rationale}</p>
            </div>
          </div>

          {/* Example clubs */}
          <div className="px-4 pb-4">
            <div className="text-[9px] text-[#444] font-semibold uppercase tracking-widest mb-2">Good-Fit Examples</div>
            <div className="flex flex-col gap-2">
              {driverProfile.examples.map((ex, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#1a1a1a] rounded-xl px-3 py-2.5">
                  <div className="flex-1">
                    <div className="text-[#888] text-[10px] font-medium">{ex.brand}</div>
                    <div className="text-white text-[12px] font-semibold">{ex.model}</div>
                    <div className="text-[#555] text-[10px]">{ex.loft} · {ex.flex}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#888] text-[12px] font-semibold">{ex.price}</span>
                    <FitScore score={ex.fit} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hybrid Add Card */}
        <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl overflow-hidden mb-4 stagger">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1e1e1e]">
            <div className="w-9 h-9 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <span className="text-[18px]">⛳</span>
            </div>
            <div className="flex-1">
              <div className="text-white font-bold text-[14px]">Hybrid — Add to Bag</div>
              <div className="text-[#555] text-[10px]">Priority 2 · Fill critical gap</div>
            </div>
            <Badge variant="purple">Gap Fill</Badge>
          </div>

          <div className="px-4 py-3">
            <SpecRow label="Category" value={hybridProfile.category} highlight />
            <SpecRow label="Loft Range" value={hybridProfile.loftRange} />
            <SpecRow label="Shaft Flex" value={hybridProfile.shaftFlex} />
            <SpecRow label="Profile" value={hybridProfile.profile} />
          </div>

          <div className="px-4 pb-3">
            <div className="bg-[#12081a] border border-purple-500/10 rounded-xl px-3 py-2.5">
              <p className="text-[11px] text-[#888] leading-relaxed">{hybridProfile.rationale}</p>
            </div>
          </div>

          <div className="px-4 pb-4">
            <div className="text-[9px] text-[#444] font-semibold uppercase tracking-widest mb-2">Good-Fit Examples</div>
            <div className="flex flex-col gap-2">
              {hybridProfile.examples.map((ex, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#1a1a1a] rounded-xl px-3 py-2.5">
                  <div className="flex-1">
                    <div className="text-[#888] text-[10px] font-medium">{ex.brand}</div>
                    <div className="text-white text-[12px] font-semibold">{ex.model}</div>
                    <div className="text-[#555] text-[10px]">{ex.loft} · {ex.flex}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#888] text-[12px] font-semibold">{ex.price}</span>
                    <FitScore score={ex.fit} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Iron note */}
        <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mb-4 stagger">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-[#1e1e1e] rounded-xl flex items-center justify-center">
              <span className="text-[18px]">🔧</span>
            </div>
            <div>
              <div className="text-white font-bold text-[13px]">Irons — Monitor</div>
              <div className="text-[#555] text-[10px]">Priority 3 · No action yet</div>
            </div>
          </div>
          <p className="text-[12px] text-[#666] leading-relaxed mb-2">{ironProfile.recommendation}</p>
          <div className="bg-[#1a1a1a] rounded-xl px-3 py-2 mt-1">
            <p className="text-[11px] text-[#555]">{ironProfile.note}</p>
          </div>
        </div>

        {/* Wedge gapping note */}
        <div className="bg-[#0f0f10] border border-[#2a2a2a] rounded-2xl p-4 mb-3 stagger">
          <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-2">Wedge Gapping Opportunity</div>
          <p className="text-[12px] text-[#666] leading-relaxed">
            A 56° wedge may close the 60–80 yard distance control gap identified in your scorecard data. Current 52°–58° split leaves a partial yardage window unaddressed.
          </p>
        </div>
      </div>

      <div className="px-5 pt-3 pb-2">
        <PrimaryButton onClick={onNext}>
          Train vs. Change Decision
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9,18 15,12 9,6"/></svg>
        </PrimaryButton>
      </div>
    </div>
  );
}
