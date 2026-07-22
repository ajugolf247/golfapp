import { useState } from 'react';
import { MY_COURSES, COMMUNITY_RANKINGS } from '../data/pinnedData';

function RankBadge({ rank }) {
  const colors = { 1: 'from-yellow-400 to-yellow-600', 2: 'from-gray-300 to-gray-500', 3: 'from-orange-400 to-orange-600' };
  return (
    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-[12px] text-white flex-shrink-0 ${rank <= 3 ? `bg-gradient-to-br ${colors[rank]}` : 'bg-[#1e1e1e] text-[#555]'}`}>
      {rank}
    </div>
  );
}

export default function MyCoursesScreen({ onBack }) {
  const [tab, setTab] = useState('mine');
  const [filter, setFilter] = useState('all');

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <div className="px-5 pt-12 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[10px] text-[#e8341c] font-semibold uppercase tracking-widest mb-1">Course Rankings</div>
            <h1 className="text-[24px] font-black text-white leading-tight">Your Courses</h1>
          </div>
          <button onClick={onBack} className="w-8 h-8 bg-[#1e1e1e] rounded-full flex items-center justify-center tap-feedback">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round"><polyline points="15,18 9,12 15,6"/></svg>
          </button>
        </div>

        {/* Summary strip */}
        <div className="flex gap-2 mb-4">
          {[{v: MY_COURSES.length, l:'Ranked'}, {v:'97', l:'Top Score'}, {v:'18', l:'States'}, {v:'6', l:'This Year'}].map(item => (
            <div key={item.l} className="flex-1 bg-[#141414] border border-[#1e1e1e] rounded-xl p-2 text-center">
              <div className="text-white font-black text-[16px] leading-none">{item.v}</div>
              <div className="text-[9px] text-[#555] mt-0.5">{item.l}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#111] border border-[#1e1e1e] rounded-xl p-1">
          {[['mine', 'My Rankings'], ['community', 'Community'], ['friends', "Friends' Top"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex-1 py-2 rounded-lg text-[10px] font-semibold transition-all ${tab === id ? 'bg-gradient-to-r from-[#e8341c] to-[#f07428] text-white' : 'text-[#555]'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {tab === 'mine' && (
          <div className="flex flex-col gap-2 stagger">
            {MY_COURSES.map((course, i) => (
              <div key={i} className="bg-[#141414] border border-[#1e1e1e] rounded-2xl overflow-hidden tap-feedback cursor-pointer">
                {/* Color accent strip */}
                <div className="h-1 bg-gradient-to-r from-[#e8341c] to-[#f07428]" style={{ opacity: (7 - course.rank) / 6 }} />
                <div className="flex items-center gap-3 p-3.5">
                  <RankBadge rank={course.rank} />
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-bold text-[13px] truncate">{course.name}</div>
                    <div className="text-[#555] text-[10px]">{course.location} · Last: {course.lastPlayed}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[22px] font-black gradient-text leading-none">{course.score}</div>
                    <div className="text-[9px] text-[#555]">{course.timesPlayed}× played</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Re-rank CTA */}
            <div className="bg-[#0f0f14] border border-[#2a2a3a] rounded-2xl p-4 mt-2">
              <div className="flex items-center gap-3">
                <div className="text-[24px]">🔄</div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-[13px]">Refine Your Rankings</div>
                  <div className="text-[#555] text-[11px]">2 courses have provisional scores — tap to refine</div>
                </div>
                <button className="px-3 py-1.5 bg-[#4a9fd5]/10 border border-[#4a9fd5]/20 text-[#4a9fd5] text-[11px] font-semibold rounded-xl">Fix</button>
              </div>
            </div>
          </div>
        )}

        {tab === 'community' && (
          <div className="flex flex-col gap-2 stagger">
            <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest my-2">Global Rankings · 1,243+ Ratings</div>
            {COMMUNITY_RANKINGS.map((course, i) => (
              <div key={i} className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-3.5 flex items-center gap-3">
                <RankBadge rank={course.rank} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-[13px] truncate">{course.name}</span>
                    {course.friendsRank && (
                      <span className="text-[9px] bg-[#e8341c]/10 text-[#e8341c] px-1.5 py-0.5 rounded-full font-semibold">Your #{course.friendsRank}</span>
                    )}
                  </div>
                  <div className="text-[#555] text-[10px]">{course.location} · {course.ratings.toLocaleString()} ratings</div>
                </div>
                <div className="text-right">
                  <div className="text-[20px] font-black gradient-text leading-none">{course.communityScore}</div>
                  <div className="text-[9px] text-[#555]">score</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'friends' && (
          <div className="flex flex-col gap-4 stagger">
            {[
              { friend: 'Jake M.', topCourse: 'Torrey Pines South', score: 94, note: 'Plays here 2× / month' },
              { friend: 'Sarah O.', topCourse: 'Pelican Hill', score: 91, note: 'Rates it a must-play' },
              { friend: 'Dana W.', topCourse: 'Riviera CC', score: 97, note: 'Her all-time favourite' },
            ].map((item, i) => (
              <div key={i} className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4">
                <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-2">{item.friend}'s #1</div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold text-[15px]">{item.topCourse}</div>
                    <div className="text-[#555] text-[11px] mt-0.5">{item.note}</div>
                  </div>
                  <div className="text-[28px] font-black gradient-text">{item.score}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
