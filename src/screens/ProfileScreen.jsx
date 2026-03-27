import { useState } from 'react';
import StatusBar from '../components/ui/StatusBar';
import ScreenHeader from '../components/ui/ScreenHeader';
import PrimaryButton from '../components/ui/PrimaryButton';
import { GOLFER } from '../data/mockData';

const GOALS = ['Break 85 consistently', 'Improve handicap', 'More fairways / accuracy', 'Better short game', 'Increase distance'];
const MISSES = ['Slice / Right fade', 'Pull / Left', 'Low topped shots', 'Fat / Heavy contact', 'Thin shots'];
const BUDGETS = ['Under $300', '$300–$600', '$600–$1,000', '$1,000–$1,500', '$1,500+'];
const TIMINGS = ['Just exploring', 'Next 1–2 months', 'Next 3–6 months', 'Next 6–12 months'];
const HANDICAPS = ['0–5', '6–10', '11–15', '16–20', '21–25', '25+'];

export default function ProfileScreen({ onNext, onBack }) {
  const [goal, setGoal] = useState(GOLFER.goal);
  const [miss, setMiss] = useState(GOLFER.primaryMiss);
  const [budget, setBudget] = useState(GOLFER.budgetBand);
  const [timing, setTiming] = useState(GOLFER.purchaseTiming);
  const [handicap, setHandicap] = useState('11–15');

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <StatusBar />
      <ScreenHeader onBack={onBack} title="Player Profile" step={1} totalSteps={6} />

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* Profile card */}
        <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mb-5 stagger">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#e8341c] to-[#f07428] rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-[16px]">{GOLFER.initials}</span>
            </div>
            <div>
              <div className="text-white font-bold text-[16px]">{GOLFER.name}</div>
              <div className="text-[#555] text-[11px]">Member since {GOLFER.memberSince}</div>
            </div>
            <div className="ml-auto bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-center">
              <div className="text-white font-black text-[18px] leading-none">{GOLFER.handicap}</div>
              <div className="text-[#555] text-[9px] font-medium uppercase tracking-wider mt-0.5">HCP</div>
            </div>
          </div>

          {/* Static details */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Handedness', value: GOLFER.handedness },
              { label: 'Age', value: GOLFER.age },
              { label: 'Height', value: GOLFER.height },
            ].map(item => (
              <div key={item.label} className="bg-[#1a1a1a] rounded-xl p-2.5 text-center">
                <div className="text-white font-semibold text-[13px]">{item.value}</div>
                <div className="text-[#555] text-[9px] font-medium uppercase tracking-wider mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Handicap band */}
        <div className="mb-5 stagger">
          <label className="text-[11px] text-[#888] font-semibold uppercase tracking-widest mb-2 block">Scoring Range (Handicap Band)</label>
          <div className="grid grid-cols-3 gap-1.5">
            {HANDICAPS.map(h => (
              <button
                key={h}
                onClick={() => setHandicap(h)}
                className={`py-2.5 rounded-xl text-[12px] font-semibold tap-feedback transition-all ${
                  handicap === h
                    ? 'bg-gradient-to-r from-[#e8341c] to-[#f07428] text-white'
                    : 'bg-[#141414] border border-[#1e1e1e] text-[#666]'
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        {/* Primary goal */}
        <div className="mb-5 stagger">
          <label className="text-[11px] text-[#888] font-semibold uppercase tracking-widest mb-2 block">Primary Golf Goal</label>
          <div className="flex flex-col gap-1.5">
            {GOALS.map(g => (
              <button
                key={g}
                onClick={() => setGoal(g)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left tap-feedback transition-all ${
                  goal === g
                    ? 'bg-[#1a0a08] border border-[#e8341c]/30 text-white'
                    : 'bg-[#141414] border border-[#1e1e1e] text-[#666]'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  goal === g ? 'border-[#e8341c]' : 'border-[#333]'
                }`}>
                  {goal === g && <div className="w-2 h-2 rounded-full bg-[#e8341c]" />}
                </div>
                <span className="text-[13px] font-medium">{g}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Primary miss */}
        <div className="mb-5 stagger">
          <label className="text-[11px] text-[#888] font-semibold uppercase tracking-widest mb-2 block">Most Common Miss</label>
          <div className="grid grid-cols-2 gap-1.5">
            {MISSES.map(m => (
              <button
                key={m}
                onClick={() => setMiss(m)}
                className={`py-3 px-3 rounded-xl text-[12px] font-medium tap-feedback transition-all text-left ${
                  miss === m
                    ? 'bg-[#1a0a08] border border-[#e8341c]/30 text-white'
                    : 'bg-[#141414] border border-[#1e1e1e] text-[#666]'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Physical note */}
        <div className="mb-5 stagger">
          <label className="text-[11px] text-[#888] font-semibold uppercase tracking-widest mb-2 block">Physical Considerations</label>
          <div className="bg-[#141414] border border-[#1e1e1e] rounded-xl px-4 py-3">
            <p className="text-[13px] text-white">{GOLFER.flexibility}</p>
            <p className="text-[10px] text-[#555] mt-1">Tap to edit</p>
          </div>
        </div>

        {/* Budget */}
        <div className="mb-5 stagger">
          <label className="text-[11px] text-[#888] font-semibold uppercase tracking-widest mb-2 block">Budget Comfort</label>
          <div className="grid grid-cols-2 gap-1.5">
            {BUDGETS.map(b => (
              <button
                key={b}
                onClick={() => setBudget(b)}
                className={`py-2.5 px-3 rounded-xl text-[11px] font-semibold tap-feedback transition-all ${
                  budget === b
                    ? 'bg-gradient-to-r from-[#e8341c] to-[#f07428] text-white'
                    : 'bg-[#141414] border border-[#1e1e1e] text-[#666]'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Timing */}
        <div className="mb-5 stagger">
          <label className="text-[11px] text-[#888] font-semibold uppercase tracking-widest mb-2 block">Purchase Timing</label>
          <div className="flex flex-col gap-1.5">
            {TIMINGS.map(t => (
              <button
                key={t}
                onClick={() => setTiming(t)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left tap-feedback transition-all ${
                  timing === t
                    ? 'bg-[#1a0a08] border border-[#e8341c]/30 text-white'
                    : 'bg-[#141414] border border-[#1e1e1e] text-[#666]'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  timing === t ? 'border-[#e8341c]' : 'border-[#333]'
                }`}>
                  {timing === t && <div className="w-2 h-2 rounded-full bg-[#e8341c]" />}
                </div>
                <span className="text-[13px] font-medium">{t}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pt-3 pb-2">
        <PrimaryButton onClick={onNext}>
          Confirm Profile
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9,18 15,12 9,6"/>
          </svg>
        </PrimaryButton>
      </div>
    </div>
  );
}
