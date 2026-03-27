import StatusBar from '../components/ui/StatusBar';
import ScreenHeader from '../components/ui/ScreenHeader';
import PrimaryButton from '../components/ui/PrimaryButton';
import { SWINGSCAN_RESULT, SCORECARD_DATA, ANALYSIS_RESULTS } from '../data/mockData';

function ContributionBlock({ icon, label, color, items, summary }) {
  return (
    <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mb-3">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
          <span className="text-[16px]">{icon}</span>
        </div>
        <span className="text-white font-bold text-[13px]">{label}</span>
      </div>
      <div className="flex flex-col gap-2 mb-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: color }} />
            <p className="text-[12px] text-[#888] leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
      <div className="bg-[#1a1a1a] rounded-xl px-3 py-2.5">
        <p className="text-[11px] text-[#666] leading-relaxed italic">"{summary}"</p>
      </div>
    </div>
  );
}

export default function WhyScreen({ onNext, onBack }) {
  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <StatusBar />
      <ScreenHeader onBack={onBack} title="Why This Recommendation" />

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* Intro */}
        <div className="mb-4 stagger">
          <div className="text-[10px] text-[#e8341c] font-semibold uppercase tracking-widest mb-2">Full Reasoning</div>
          <p className="text-[13px] text-[#666] leading-relaxed">
            Here is exactly how the system combined three data sources to reach its recommendation. Transparency is core to how PG builds trust.
          </p>
        </div>

        {/* Swing Contribution */}
        <ContributionBlock
          icon="🔬"
          label="Swing Contribution (62%)"
          color="#4a9fd5"
          items={[
            `Root flaw: ${SWINGSCAN_RESULT.rootFlaw} — identified at ${SWINGSCAN_RESULT.rootFlawConfidence}% confidence.`,
            'Out-to-in path averaging 4.2° creates a structural slice pattern regardless of equipment.',
            'Early extension causes inconsistent low point — this cannot be fixed with gear alone.',
            'Grip tension at P6–P7 reduces face rotation, contributing to the open face at impact.',
          ]}
          summary="Majority of your ball flight issues trace to swing mechanics. Training should accompany any equipment change."
        />

        {/* Performance Contribution */}
        <ContributionBlock
          icon="📊"
          label="Performance Contribution"
          color="#4ade80"
          items={[
            `${SCORECARD_DATA.stats.fairwaysHit.value} fairways hit — ${SCORECARD_DATA.stats.fairwaysHit.pct}% vs ${SCORECARD_DATA.stats.fairwaysHit.benchmark}% benchmark.`,
            `${SCORECARD_DATA.stats.penalties.value} penalty strokes in one round — heavily driver-correlated (3 of 4 penalties).`,
            'Miss tendency: 76% right confirms slice pattern active under on-course pressure.',
            'Driver distance loss (228 vs 250 target) consistent with high-spin open-face contact.',
          ]}
          summary="Scorecard data confirms the swing findings are translating to real scoring damage — not just range misses."
        />

        {/* Bag Contribution */}
        <ContributionBlock
          icon="🎒"
          label="Bag Contribution (38%)"
          color="#e8341c"
          items={[
            'Driver: Regular flex shaft may be contributing to late delivery timing and open face at impact.',
            'Driver: 10.5° loft at regular flex for a slicer pattern produces high-spin, low-launch shots that miss right.',
            'Irons: Stiff Dynamic Gold S300 in AP2 blades is demanding for a 12-HCP with OTI path.',
            'Hybrid gap (190–215 yards) forces uncomfortable 3-wood or unreliable long iron — avoidable scoring issue.',
          ]}
          summary="Your current equipment is not the primary cause, but it is amplifying your miss and removing margin for error."
        />

        {/* Why it matters */}
        <div className="bg-[#0f0f14] border border-[#2a2a3a] rounded-2xl p-4 mb-3 stagger">
          <div className="text-[10px] text-[#888] font-semibold uppercase tracking-widest mb-2">Why This Matters</div>
          <p className="text-[12px] text-[#666] leading-relaxed mb-3">
            Players at your level often assume the issue is "just the swing." In Marcus's case, the swing is the primary issue — but the driver equipment is a force multiplier. A draw-biased head with appropriate loft could reduce driver dispersion even before the swing fully improves.
          </p>
          <p className="text-[12px] text-[#666] leading-relaxed">
            This doesn't mean buying clubs will fix the slice. It means the right equipment can provide a more forgiving launch window while the swing is being improved.
          </p>
        </div>

        {/* Confidence notes */}
        <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mb-3 stagger">
          <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-2">Confidence Notes</div>
          <div className="flex flex-col gap-2">
            {[
              { label: 'SwingScan data quality', value: 'High', pct: 91 },
              { label: 'Round data completeness', value: 'Good', pct: 85 },
              { label: 'Bag data accuracy', value: 'Verified', pct: 100 },
              { label: 'Overall recommendation confidence', value: 'High — 87%', pct: 87 },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="text-[11px] text-[#888] mb-1">{item.label}</div>
                  <div className="h-1 bg-[#1e1e1e] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#e8341c] to-[#f07428]" style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
                <span className="text-[11px] text-[#888] font-medium w-20 text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Limitation note */}
        <div className="bg-[#111] border border-[#1e1e1e] rounded-xl px-3.5 py-3 stagger">
          <div className="flex gap-2.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p className="text-[11px] text-[#555] leading-relaxed">
              This analysis provides directional intelligence, not a tour-level fitting. On-course variables, fitting studio data, and launch monitor sessions will give greater precision.
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-3 pb-2">
        <PrimaryButton onClick={onNext}>
          View Equipment Guidance
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9,18 15,12 9,6"/></svg>
        </PrimaryButton>
      </div>
    </div>
  );
}
