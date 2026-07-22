import { useState } from 'react';
import { BADGE_CATEGORIES, CLOSE_TO_ACHIEVING } from '../data/pinnedData';

const TIER_COLORS = {
  bronze: '#cd7f32', silver: '#a8a9ad', gold: '#f07428', platinum: '#4a9fd5', legendary: '#a855f7',
};

function BadgeCard({ badge }) {
  const tierColor = TIER_COLORS[badge.tier];
  return (
    <div className={`relative rounded-2xl border p-3.5 flex flex-col items-center text-center gap-1.5 tap-feedback cursor-pointer ${
      badge.earned ? 'bg-[#141414] border-[#2a2a2a]' : 'bg-[#0f0f0f] border-[#1a1a1a]'
    }`}>
      {/* Tier dot */}
      <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: tierColor, opacity: badge.earned ? 1 : 0.3 }} />

      <div className={`text-[28px] ${!badge.earned ? 'grayscale opacity-30' : ''}`}>{badge.icon}</div>
      <div className={`text-[11px] font-bold leading-tight ${badge.earned ? 'text-white' : 'text-[#444]'}`}>{badge.name}</div>
      <div className="text-[9px] text-[#444] leading-tight">{badge.desc}</div>

      {badge.earned ? (
        <div className="text-[8px] font-semibold uppercase tracking-wider mt-0.5" style={{ color: tierColor }}>{badge.earnedDate}</div>
      ) : badge.progress !== undefined ? (
        <div className="w-full mt-1">
          <div className="h-1 bg-[#1e1e1e] rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${(badge.progress / badge.total) * 100}%`, backgroundColor: tierColor }} />
          </div>
          <div className="text-[9px] text-[#444] mt-0.5">{badge.progress}/{badge.total}</div>
        </div>
      ) : (
        <div className="text-[9px] text-[#333] mt-0.5">Locked</div>
      )}
    </div>
  );
}

export default function BadgeLibraryScreen({ onUnlock, onBack }) {
  const [tab, setTab] = useState('library');
  const totalEarned = BADGE_CATEGORIES.flatMap(c => c.badges).filter(b => b.earned).length;
  const totalBadges = BADGE_CATEGORIES.flatMap(c => c.badges).length;

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <div className="px-5 pt-12 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[10px] text-[#e8341c] font-semibold uppercase tracking-widest mb-1">Achievements</div>
            <h1 className="text-[24px] font-black text-white leading-tight">Your Badges</h1>
          </div>
          <button onClick={onBack} className="w-8 h-8 bg-[#1e1e1e] rounded-full flex items-center justify-center tap-feedback">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round"><polyline points="15,18 9,12 15,6"/></svg>
          </button>
        </div>

        {/* Progress summary */}
        <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between mb-1.5">
                <span className="text-[11px] text-[#555]">Collection Progress</span>
                <span className="text-[11px] font-bold gradient-text">{totalEarned}/{totalBadges}</span>
              </div>
              <div className="h-2 bg-[#1e1e1e] rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#e8341c] to-[#f07428]" style={{ width: `${(totalEarned / totalBadges) * 100}%` }} />
              </div>
            </div>
            <button onClick={onUnlock} className="px-3 py-2 bg-gradient-to-r from-[#e8341c] to-[#f07428] text-white text-[11px] font-bold rounded-xl tap-feedback">
              New! 🐺
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#111] border border-[#1e1e1e] rounded-xl p-1 mb-1">
          {[['library', 'All Badges'], ['close', 'Close to Earning']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex-1 py-2 rounded-lg text-[11px] font-semibold transition-all ${tab === id ? 'bg-gradient-to-r from-[#e8341c] to-[#f07428] text-white' : 'text-[#555]'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {tab === 'library' ? (
          <div className="flex flex-col gap-5 stagger">
            {BADGE_CATEGORIES.map((cat, ci) => (
              <div key={ci}>
                <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-2.5">{cat.name}</div>
                <div className="grid grid-cols-3 gap-2">
                  {cat.badges.map((badge, bi) => (
                    <BadgeCard key={bi} badge={badge} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3 stagger mt-1">
            <div className="text-[12px] text-[#555] leading-relaxed mb-1">
              These badges are within reach. Keep playing.
            </div>
            {CLOSE_TO_ACHIEVING.map((badge, i) => {
              const tierColor = TIER_COLORS[badge.tier];
              return (
                <div key={i} className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-[#1e1e1e] rounded-xl flex items-center justify-center text-[24px]">{badge.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-[14px]">{badge.name}</span>
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full" style={{ color: tierColor, backgroundColor: `${tierColor}15` }}>{badge.tier}</span>
                      </div>
                      <div className="text-[#555] text-[11px]">{badge.desc}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] font-bold" style={{ color: tierColor }}>{badge.remaining} away</div>
                      <div className="text-[10px] text-[#444]">{badge.progress}/{badge.total}</div>
                    </div>
                  </div>
                  <div className="h-2 bg-[#1e1e1e] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${badge.pct}%`, backgroundColor: tierColor }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
