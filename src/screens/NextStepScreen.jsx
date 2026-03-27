import StatusBar from '../components/ui/StatusBar';
import ScreenHeader from '../components/ui/ScreenHeader';
import PrimaryButton from '../components/ui/PrimaryButton';
import Badge from '../components/ui/Badge';

const ACTIONS = [
  {
    id: 'save',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/>
      </svg>
    ),
    label: 'Save Fitting Report',
    desc: 'Store results to your PG profile and track changes over time.',
    cta: 'Save Report',
    variant: 'heat',
    badge: null,
  },
  {
    id: 'coach',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    label: 'Share With Your Coach',
    desc: 'Send this report to your PG coach for integrated lesson planning.',
    cta: 'Share Report',
    variant: 'surface',
    badge: 'Recommended',
  },
  {
    id: 'train',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
      </svg>
    ),
    label: 'Start Training Plan',
    desc: 'Open face and OTI path — a targeted drill plan is ready for you.',
    cta: 'View Drills',
    variant: 'surface',
    badge: null,
  },
  {
    id: 'recheck',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
      </svg>
    ),
    label: 'Re-Check After Improvement',
    desc: 'Schedule a re-analysis in 60 days after training and new equipment.',
    cta: 'Set Reminder',
    variant: 'surface',
    badge: null,
  },
  {
    id: 'fitting',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Find a Pro Fitter Near You',
    desc: 'Use your PG report as context for a launch monitor fitting session.',
    cta: 'Find Fitters',
    variant: 'surface',
    badge: 'Optional',
  },
];

export default function NextStepScreen({ onNext, onBack }) {
  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <StatusBar />
      <ScreenHeader onBack={onBack} title="Your Next Steps" />

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* Summary recap */}
        <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mb-5 stagger">
          <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-3">Report Summary</div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-[#1a1a1a] rounded-xl p-2.5 text-center">
              <div className="text-[22px] font-black gradient-text leading-none">52</div>
              <div className="text-[9px] text-[#555] mt-1">Bag Health</div>
            </div>
            <div className="bg-[#1a1a1a] rounded-xl p-2.5 text-center">
              <div className="text-[22px] font-black text-white leading-none">87%</div>
              <div className="text-[9px] text-[#555] mt-1">Confidence</div>
            </div>
            <div className="bg-[#1a1a1a] rounded-xl p-2.5 text-center">
              <div className="text-[22px] font-black text-[#e8341c] leading-none">C+</div>
              <div className="text-[9px] text-[#555] mt-1">Grade</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['Replace Driver', 'Add 4-Hybrid', 'Address Open Face', 'Train Concurrently'].map(tag => (
              <span key={tag} className="text-[10px] bg-[#1e1e1e] text-[#888] px-2.5 py-1 rounded-full font-medium">{tag}</span>
            ))}
          </div>
        </div>

        {/* Action cards */}
        <div className="flex flex-col gap-3 stagger">
          {ACTIONS.map((action, i) => (
            <div key={action.id} className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#1e1e1e] rounded-xl flex items-center justify-center text-[#888] flex-shrink-0 mt-0.5">
                  {action.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold text-[13px]">{action.label}</span>
                    {action.badge && (
                      <Badge variant={action.badge === 'Recommended' ? 'heat' : 'default'} size="xs">{action.badge}</Badge>
                    )}
                  </div>
                  <p className="text-[11px] text-[#555] leading-relaxed mb-3">{action.desc}</p>
                  <button className={`px-4 py-2 rounded-xl text-[12px] font-semibold tap-feedback ${
                    action.variant === 'heat'
                      ? 'bg-gradient-to-r from-[#e8341c] to-[#f07428] text-white'
                      : 'bg-[#1e1e1e] border border-[#2a2a2a] text-[#888]'
                  }`}>
                    {action.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="bg-[#0f0f10] border border-[#1e1e1e] rounded-2xl px-4 py-3 mt-4 stagger">
          <p className="text-[11px] text-[#555] leading-relaxed text-center">
            Your report is saved automatically. You can access it anytime under <span className="text-[#888] font-medium">Profile → Fitting Reports</span>
          </p>
        </div>
      </div>

      <div className="px-5 pt-3 pb-2">
        <PrimaryButton onClick={onNext}>
          View Saved Reports
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9,18 15,12 9,6"/></svg>
        </PrimaryButton>
      </div>
    </div>
  );
}
