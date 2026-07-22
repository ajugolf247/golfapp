import { useState, useEffect } from 'react';
import FriendsScreen from './FriendsScreen';
import FriendProfileScreen from './FriendProfileScreen';
import QRScreen from './QRScreen';
import CourseRatingScreen from './CourseRatingScreen';
import HeadToHeadScreen from './HeadToHeadScreen';
import MyCoursesScreen from './MyCoursesScreen';
import BadgeLibraryScreen from './BadgeLibraryScreen';
import BadgeUnlockScreen from './BadgeUnlockScreen';
import AnalyticsScreen from './AnalyticsScreen';

const FEATURES = [
  {
    id: 'friends',
    label: 'Follow Friends',
    icon: '👥',
    tag: 'Social Layer',
    desc: 'Search, follow, and track your playing partners. QR pairing on the first tee.',
    color: '#e8341c',
    screens: ['friends-list','friend-profile','qr-pairing'],
  },
  {
    id: 'rankings',
    label: 'Course Rankings',
    icon: '⭐',
    tag: 'Beli-Style',
    desc: 'Rate courses after every round. Head-to-head comparisons build your personal ranked list.',
    color: '#f07428',
    screens: ['course-rating','head-to-head','my-courses'],
  },
  {
    id: 'badges',
    label: 'Achievements',
    icon: '🏆',
    tag: 'Engagement',
    desc: 'Milestone badges, scoring achievements, explorer rewards. Offline-first on Caddie.',
    color: '#a855f7',
    screens: ['badge-library','badge-unlock'],
  },
  {
    id: 'analytics',
    label: 'Analytics Dashboard',
    icon: '📊',
    tag: 'Internal',
    desc: 'North star metrics, cohort retention, Klaviyo segment exports, Caddie sync health.',
    color: '#4a9fd5',
    screens: ['analytics'],
  },
];

function TransitionWrapper({ children, k }) {
  const [v, setV] = useState(false);
  useState(() => { const t = setTimeout(() => setV(true), 20); return () => clearTimeout(t); });
  return (
    <div style={{ opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(10px)', transition: 'all 0.28s ease', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
  );
}

export default function PinnedHub() {
  const [screen, setScreen] = useState('hub');

  const go = (s) => setScreen(s);
  const hub = () => setScreen('hub');

  // Expose navigation for screenshot tooling
  useEffect(() => {
    window.__pinnedGoto = (s) => setScreen(s);
    return () => { delete window.__pinnedGoto; };
  }, [setScreen]);

  const renderScreen = () => {
    switch (screen) {
      case 'hub': return <HubHome onSelect={go} />;
      // Friends
      case 'friends-list':   return <FriendsScreen onFriendTap={() => go('friend-profile')} onQR={() => go('qr-pairing')} onSearch={() => go('friends-list')} />;
      case 'friend-profile': return <FriendProfileScreen onBack={() => go('friends-list')} />;
      case 'qr-pairing':     return <QRScreen onBack={() => go('friends-list')} />;
      // Rankings
      case 'course-rating':  return <CourseRatingScreen onNext={() => go('head-to-head')} onBack={hub} />;
      case 'head-to-head':   return <HeadToHeadScreen onNext={() => go('my-courses')} onBack={() => go('course-rating')} />;
      case 'my-courses':     return <MyCoursesScreen onBack={hub} />;
      // Badges
      case 'badge-library':  return <BadgeLibraryScreen onUnlock={() => go('badge-unlock')} onBack={hub} />;
      case 'badge-unlock':   return <BadgeUnlockScreen onDone={() => go('badge-library')} />;
      // Analytics
      case 'analytics':      return <AnalyticsScreen onBack={hub} />;
      default:               return <HubHome onSelect={go} />;
    }
  };

  return (
    <div data-pinned-screen={screen} style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TransitionWrapper k={screen}>
        {renderScreen()}
      </TransitionWrapper>
    </div>
  );
}

function HubHome({ onSelect }) {
  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-12 pb-6 bg-gradient-to-b from-[#0f0808] to-[#0a0a0a]">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-9 h-9 bg-gradient-to-br from-[#e8341c] to-[#f07428] rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-[13px] tracking-tighter">PIN</span>
          </div>
          <div>
            <div className="text-white font-black text-[18px] leading-tight">Pinned Golf</div>
            <div className="text-[#555] text-[10px] font-medium tracking-widest uppercase">Feature Prototypes</div>
          </div>
        </div>
        <p className="text-[13px] text-[#555] leading-relaxed">
          Four upcoming features built on the Pinned design system. Tap any feature to explore its full user flow.
        </p>
      </div>

      {/* Feature cards */}
      <div className="px-5 pb-8 flex flex-col gap-4 stagger">
        {FEATURES.map((feat) => (
          <div key={feat.id} className="bg-[#141414] border border-[#1e1e1e] rounded-2xl overflow-hidden">
            {/* Color bar */}
            <div className="h-1" style={{ background: `linear-gradient(90deg, ${feat.color}, ${feat.color}66)` }} />

            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 bg-[#1e1e1e] rounded-xl flex items-center justify-center text-[22px] flex-shrink-0">{feat.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-white font-bold text-[15px]">{feat.label}</span>
                    <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full" style={{ color: feat.color, backgroundColor: `${feat.color}18` }}>{feat.tag}</span>
                  </div>
                  <p className="text-[#555] text-[11px] leading-relaxed">{feat.desc}</p>
                </div>
              </div>

              {/* Screen links */}
              <div className="flex flex-wrap gap-1.5">
                {feat.id === 'friends' && [
                  ['friends-list', 'Friends List'],
                  ['friend-profile', 'Friend Profile'],
                  ['qr-pairing', 'QR Pairing'],
                ].map(([s, label]) => (
                  <button key={s} onClick={() => onSelect(s)}
                    className="px-3 py-1.5 bg-[#1e1e1e] border border-[#2a2a2a] text-[#888] text-[11px] font-medium rounded-xl tap-feedback hover:text-white transition-colors">
                    {label} →
                  </button>
                ))}
                {feat.id === 'rankings' && [
                  ['course-rating', 'Post-Round Rating'],
                  ['head-to-head', 'Head to Head'],
                  ['my-courses', 'My Courses'],
                ].map(([s, label]) => (
                  <button key={s} onClick={() => onSelect(s)}
                    className="px-3 py-1.5 bg-[#1e1e1e] border border-[#2a2a2a] text-[#888] text-[11px] font-medium rounded-xl tap-feedback hover:text-white transition-colors">
                    {label} →
                  </button>
                ))}
                {feat.id === 'badges' && [
                  ['badge-library', 'Badge Library'],
                  ['badge-unlock', 'Unlock Moment'],
                ].map(([s, label]) => (
                  <button key={s} onClick={() => onSelect(s)}
                    className="px-3 py-1.5 bg-[#1e1e1e] border border-[#2a2a2a] text-[#888] text-[11px] font-medium rounded-xl tap-feedback hover:text-white transition-colors">
                    {label} →
                  </button>
                ))}
                {feat.id === 'analytics' && (
                  <button onClick={() => onSelect('analytics')}
                    className="px-3 py-1.5 bg-[#1e1e1e] border border-[#2a2a2a] text-[#888] text-[11px] font-medium rounded-xl tap-feedback hover:text-white transition-colors">
                    View Dashboard →
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Footer note */}
        <div className="bg-[#0f0f10] border border-[#1e1e1e] rounded-2xl px-4 py-3">
          <p className="text-[11px] text-[#444] leading-relaxed text-center">
            All screens use the Pinned design system · Black · White · Red-Orange · Built in React + Tailwind
          </p>
        </div>
      </div>
    </div>
  );
}
