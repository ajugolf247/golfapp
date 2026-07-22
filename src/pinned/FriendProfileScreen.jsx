import { FRIEND_PROFILE } from '../data/pinnedData';

function StatBox({ value, label }) {
  return (
    <div className="bg-[#1a1a1a] rounded-xl p-3 text-center flex-1">
      <div className="text-[22px] font-black text-white leading-none">{value}</div>
      <div className="text-[9px] text-[#555] font-medium mt-1 uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function FriendProfileScreen({ onBack }) {
  const f = FRIEND_PROFILE;

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      {/* Header */}
      <div className="relative h-40 bg-gradient-to-b from-[#1a0808] to-[#0a0a0a] flex-shrink-0">
        <div className="absolute inset-0 opacity-20">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute w-32 h-32 rounded-full border border-[#e8341c]/30"
              style={{ top: `${Math.random() * 80}%`, left: `${Math.random() * 80}%` }} />
          ))}
        </div>
        <button onClick={onBack} className="absolute top-12 left-5 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center tap-feedback">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"><polyline points="15,18 9,12 15,6"/></svg>
        </button>
        <button className="absolute top-12 right-5 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center tap-feedback">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Profile hero */}
        <div className="px-5 -mt-8 mb-4">
          <div className="flex items-end gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-white text-[20px] border-2 border-[#0a0a0a] flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${f.avatar}, ${f.avatar}99)` }}>
              {f.initials}
            </div>
            <div className="pb-1 flex-1">
              <div className="text-white font-black text-[18px] leading-tight">{f.name}</div>
              <div className="text-[#555] text-[11px]">{f.username} · {f.mutualFriends} mutual friends</div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="text-[28px] font-black text-white">{f.handicap}</div>
              <div>
                <div className="text-[9px] text-[#555] font-medium uppercase tracking-wider">Handicap</div>
                <div className="text-emerald-400 text-[12px] font-bold">{f.handicapTrend} trend</div>
              </div>
            </div>
            <button className="px-4 py-2 bg-[#1e1e1e] border border-[#2a2a2a] text-[#888] text-[12px] font-semibold rounded-xl tap-feedback">Following ✓</button>
          </div>

          {/* Stats row */}
          <div className="flex gap-2 mb-4">
            <StatBox value={f.roundsThisYear} label="Rounds '26" />
            <StatBox value={f.coursesPlayed} label="Courses" />
            <StatBox value={f.avgScore} label="Avg Score" />
          </div>
        </div>

        <div className="px-5 flex flex-col gap-4 pb-8">
          {/* Recent rounds */}
          <div>
            <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-2">Last 5 Rounds</div>
            <div className="flex flex-col gap-1.5">
              {f.recentRounds.map((r, i) => {
                const diff = r.score - r.par;
                return (
                  <div key={i} className="flex items-center gap-3 bg-[#141414] border border-[#1e1e1e] rounded-xl px-4 py-2.5">
                    <div className="flex-1">
                      <div className="text-white text-[12px] font-semibold">{r.course}</div>
                      <div className="text-[#555] text-[10px]">{r.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-black text-[16px] leading-none">{r.score}</div>
                      <div className={`text-[10px] font-semibold ${diff <= 0 ? 'text-emerald-400' : diff <= 5 ? 'text-[#f07428]' : 'text-[#e8341c]'}`}>
                        {diff > 0 ? '+' : ''}{diff}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top courses */}
          <div>
            <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-2">Top Rated Courses</div>
            <div className="flex flex-col gap-1.5">
              {f.topCourses.map((c, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#141414] border border-[#1e1e1e] rounded-xl px-4 py-2.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#e8341c] to-[#f07428] flex items-center justify-center text-white font-black text-[10px]">{i + 1}</div>
                  <span className="text-white text-[13px] font-medium flex-1">{c}</span>
                  <span className="text-[#555] text-[10px]">⭐ Ranked</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bucket list */}
          <div>
            <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-2">Bucket List</div>
            <div className="flex gap-2 flex-wrap">
              {f.bucketList.map((c, i) => (
                <span key={i} className="bg-[#141414] border border-[#1e1e1e] text-[#888] text-[11px] px-3 py-1.5 rounded-full font-medium">
                  🎯 {c}
                </span>
              ))}
            </div>
          </div>

          {/* Personal bests */}
          <div className="bg-[#140808] border border-[#e8341c]/20 rounded-2xl p-4">
            <div className="text-[10px] text-[#e8341c] font-semibold uppercase tracking-widest mb-3">Personal Bests</div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Best Score', value: f.personalBests.bestScore },
                { label: 'Most Birdies', value: f.personalBests.mostBirdies },
                { label: 'Best Streak', value: '4 Pars' },
              ].map(item => (
                <div key={item.label} className="bg-[#1a0a08] rounded-xl p-2.5 text-center">
                  <div className="text-[18px] font-black gradient-text leading-none">{item.value}</div>
                  <div className="text-[9px] text-[#555] mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
