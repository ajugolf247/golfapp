import { useState } from 'react';
import { FRIENDS, SUGGESTED_FRIENDS, FOLLOW_REQUESTS } from '../data/pinnedData';

function Avatar({ initials, color, size = 10 }) {
  return (
    <div className={`w-${size} h-${size} rounded-full flex items-center justify-center flex-shrink-0 font-black text-white`}
      style={{ background: `linear-gradient(135deg, ${color}, ${color}99)`, fontSize: size >= 12 ? 16 : 12 }}>
      {initials}
    </div>
  );
}

function FriendRow({ friend, onTap }) {
  return (
    <div onClick={onTap} className="flex items-center gap-3 px-4 py-3 bg-[#141414] border border-[#1e1e1e] rounded-2xl tap-feedback cursor-pointer">
      <Avatar initials={friend.initials} color={friend.avatar} size={10} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold text-[13px]">{friend.name}</span>
          <span className={`text-[10px] font-semibold ${friend.handicapTrend?.startsWith('-') ? 'text-emerald-400' : 'text-[#f07428]'}`}>
            {friend.handicapTrend}
          </span>
        </div>
        <div className="text-[11px] text-[#555]">{friend.username} · {friend.handicap} HCP</div>
        {friend.lastRound && (
          <div className="text-[10px] text-[#444] mt-0.5">{friend.lastRound.course} · {friend.lastRound.score} · {friend.lastRound.date}</div>
        )}
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round"><polyline points="9,18 15,12 9,6"/></svg>
    </div>
  );
}

export default function FriendsScreen({ onFriendTap, onQR, onSearch }) {
  const [tab, setTab] = useState('friends');

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      {/* Header */}
      <div className="px-5 pt-12 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[10px] text-[#e8341c] font-semibold uppercase tracking-widest mb-1">Social</div>
            <h1 className="text-[24px] font-black text-white leading-tight">Your Circle</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={onQR} className="w-9 h-9 bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl flex items-center justify-center tap-feedback">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" strokeLinecap="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                <rect x="14" y="14" width="3" height="3"/><rect x="18" y="18" width="3" height="3"/>
              </svg>
            </button>
            <button onClick={onSearch} className="w-9 h-9 bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl flex items-center justify-center tap-feedback">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-2 bg-[#141414] border border-[#1e1e1e] rounded-xl px-3 py-2.5 mb-4">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span className="text-[#444] text-[13px]">Search by name or username…</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#111] border border-[#1e1e1e] rounded-xl p-1">
          {[['friends', `Friends (${FRIENDS.length})`], ['requests', `Requests (${FOLLOW_REQUESTS.length})`], ['discover', 'Discover']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex-1 py-2 rounded-lg text-[11px] font-semibold transition-all ${tab === id ? 'bg-gradient-to-r from-[#e8341c] to-[#f07428] text-white' : 'text-[#555]'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {tab === 'friends' && (
          <div className="flex flex-col gap-2 stagger">
            {FRIENDS.map(f => (
              <FriendRow key={f.id} friend={f} onTap={() => onFriendTap(f)} />
            ))}
          </div>
        )}

        {tab === 'requests' && (
          <div className="flex flex-col gap-3 stagger">
            {FOLLOW_REQUESTS.map(r => (
              <div key={r.id} className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar initials={r.initials} color={r.avatar} size={10} />
                  <div className="flex-1">
                    <div className="text-white font-semibold text-[13px]">{r.name}</div>
                    <div className="text-[#555] text-[11px]">{r.username} · {r.mutualFriends} mutual friends</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 bg-gradient-to-r from-[#e8341c] to-[#f07428] text-white text-[12px] font-bold rounded-xl tap-feedback">Accept</button>
                  <button className="flex-1 py-2.5 bg-[#1e1e1e] border border-[#2a2a2a] text-[#666] text-[12px] font-medium rounded-xl tap-feedback">Decline</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'discover' && (
          <div className="flex flex-col gap-3 stagger">
            <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-1 mt-1">Suggested — Mutual Friends</div>
            {SUGGESTED_FRIENDS.map(f => (
              <div key={f.id} className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar initials={f.initials} color={f.avatar} size={10} />
                  <div className="flex-1">
                    <div className="text-white font-semibold text-[13px]">{f.name}</div>
                    <div className="text-[#555] text-[11px]">{f.username} · {f.handicap} HCP · {f.mutualFriends} mutual</div>
                  </div>
                </div>
                <button className="w-full py-2.5 bg-[#1a0a08] border border-[#e8341c]/30 text-[#e8341c] text-[12px] font-bold rounded-xl tap-feedback">
                  Follow
                </button>
              </div>
            ))}

            {/* Import contacts */}
            <div className="bg-[#0f0f14] border border-[#2a2a3a] rounded-2xl p-4 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1e1e2e] rounded-xl flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a9fd5" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-[13px]">Find from Contacts</div>
                  <div className="text-[#555] text-[11px]">See which contacts are on Pinned</div>
                </div>
                <button className="px-3 py-1.5 bg-[#4a9fd5]/10 border border-[#4a9fd5]/20 text-[#4a9fd5] text-[11px] font-semibold rounded-xl">Connect</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
