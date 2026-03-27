import StatusBar from '../components/ui/StatusBar';
import ScreenHeader from '../components/ui/ScreenHeader';
import PrimaryButton from '../components/ui/PrimaryButton';

const PATHS = [
  {
    id: 'train',
    icon: '🎯',
    label: 'Train First',
    sublabel: 'Not recommended yet',
    recommended: false,
    description: 'Keep current clubs. Focus on swing mechanics for 60–90 days before re-evaluating equipment.',
    when: 'Best when: swing issues are 100% technique-based with no equipment amplification.',
    why: 'In your case, equipment is amplifying the miss — so training alone leaves unnecessary strokes on the table.',
    borderColor: '#2a2a2a',
    textColor: '#555',
  },
  {
    id: 'replace-driver',
    icon: '🏌️',
    label: 'Replace Driver',
    sublabel: 'Primary recommendation',
    recommended: true,
    description: 'Replace the driver with a draw-biased, high-MOI head at 10.5–12° with a regular+ flex shaft.',
    when: 'Best when: one club category is clearly amplifying the miss pattern.',
    why: 'Your data clearly shows driver is the highest-leverage fix. 4 penalties in one round are driver-linked.',
    borderColor: '#e8341c',
    textColor: '#e8341c',
  },
  {
    id: 'add-hybrid',
    icon: '⛳',
    label: 'Add Hybrid + Replace Driver',
    sublabel: 'Recommended combo',
    recommended: true,
    description: 'Replace driver and add a 4-hybrid to close the 190–215 yard gap. Total budget: ~$800.',
    when: 'Best when: gap and driver issues both confirmed in scorecard data.',
    why: 'Two-club change addresses the two highest-scoring-impact items identified in your round data.',
    borderColor: '#f07428',
    textColor: '#f07428',
  },
  {
    id: 'pro-fit',
    icon: '📐',
    label: 'Book a Pro Fitting',
    sublabel: 'Highest precision option',
    recommended: false,
    description: 'Visit a certified fitting studio with a launch monitor. Use these findings as your brief.',
    when: 'Best when: you want verified launch data before spending on premium equipment.',
    why: 'A fitting session with this report as context will give you launch monitor confirmation of these findings.',
    borderColor: '#2a3a4a',
    textColor: '#4a9fd5',
  },
  {
    id: 'coach',
    icon: '👨‍🏫',
    label: 'Work With a Coach First',
    sublabel: 'Improvement-first path',
    recommended: false,
    description: 'Book lessons targeting the open clubface and path issues before changing any gear.',
    when: 'Best when: budget is limited or you prefer to verify improvement before equipment investment.',
    why: 'A few sessions on path and face control may reduce equipment sensitivity before you spend.',
    borderColor: '#2a2a2a',
    textColor: '#888',
  },
];

export default function TrainVsChangeScreen({ onNext, onBack }) {
  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <StatusBar />
      <ScreenHeader onBack={onBack} title="Train vs. Change" />

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* Header */}
        <div className="mb-4 stagger">
          <div className="text-[10px] text-[#e8341c] font-semibold uppercase tracking-widest mb-2">Decision Framework</div>
          <p className="text-[13px] text-[#666] leading-relaxed">
            This tool never blindly recommends buying equipment. Here is a clear breakdown of all available paths — and which one fits your specific situation.
          </p>
        </div>

        {/* Summary box */}
        <div className="bg-[#140808] border border-[#e8341c]/20 rounded-2xl p-4 mb-5 stagger">
          <div className="text-[10px] text-[#e8341c] font-semibold uppercase tracking-widest mb-2">System Verdict</div>
          <p className="text-white font-bold text-[14px] leading-snug mb-2">
            Replace driver + add hybrid. Train concurrently.
          </p>
          <p className="text-[12px] text-[#666] leading-relaxed">
            Your swing needs work — but your driver is adding 3–4 bogeys per round that better equipment would prevent even before your swing fully improves.
          </p>
        </div>

        {/* Path cards */}
        <div className="flex flex-col gap-3 mb-2 stagger">
          {PATHS.map((path, i) => (
            <div
              key={path.id}
              className="rounded-2xl overflow-hidden border"
              style={{ borderColor: path.recommended ? path.borderColor : '#1e1e1e', backgroundColor: path.recommended ? '#141414' : '#0f0f0f' }}
            >
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[20px] bg-[#1a1a1a] flex-shrink-0">
                  {path.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-[13px]">{path.label}</span>
                    {path.recommended && (
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${path.borderColor}20`, color: path.borderColor }}>
                        ✓ Rec'd
                      </span>
                    )}
                  </div>
                  <div className="text-[11px]" style={{ color: path.textColor }}>{path.sublabel}</div>
                </div>
              </div>

              <div className="px-4 pb-4 border-t border-[#1e1e1e]">
                <p className="text-[12px] text-[#888] leading-relaxed pt-3 mb-2">{path.description}</p>
                <div className="flex flex-col gap-1.5">
                  <div className="flex gap-2">
                    <span className="text-[10px] text-[#555] font-semibold flex-shrink-0">When:</span>
                    <span className="text-[10px] text-[#555] leading-relaxed">{path.when}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-semibold flex-shrink-0" style={{ color: path.textColor }}>Your case:</span>
                    <span className="text-[10px] text-[#666] leading-relaxed">{path.why}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 pt-3 pb-2">
        <PrimaryButton onClick={onNext}>
          See Next Steps
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9,18 15,12 9,6"/></svg>
        </PrimaryButton>
      </div>
    </div>
  );
}
