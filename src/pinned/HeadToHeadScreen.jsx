import { useState } from 'react';
import { HEAD_TO_HEAD } from '../data/pinnedData';

export default function HeadToHeadScreen({ onNext, onBack }) {
  const { courseA, courseB, comparison, totalComparisons } = HEAD_TO_HEAD;
  const [picked, setPicked] = useState(null);
  const [animOut, setAnimOut] = useState(null);

  const handlePick = (side) => {
    setPicked(side);
    setTimeout(() => {
      setAnimOut(side);
      setTimeout(onNext, 400);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <button onClick={onBack} className="w-8 h-8 bg-[#1e1e1e] rounded-full flex items-center justify-center tap-feedback">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round"><polyline points="15,18 9,12 15,6"/></svg>
        </button>
        <div className="text-center">
          <div className="text-white font-semibold text-[13px]">Head to Head</div>
          <div className="text-[#555] text-[11px]">{comparison} of {totalComparisons} comparisons</div>
        </div>
        <button className="text-[#555] text-[11px] font-medium tap-feedback">Skip</button>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 px-5 mb-6 justify-center">
        {[...Array(totalComparisons)].map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${i < comparison ? 'bg-gradient-to-r from-[#e8341c] to-[#f07428] w-6' : i === comparison - 1 ? 'bg-[#f07428] w-8' : 'bg-[#1e1e1e] w-4'}`} />
        ))}
      </div>

      <div className="flex-1 flex flex-col px-5 pb-6">
        {/* Question */}
        <div className="text-center mb-6">
          <div className="text-[#555] text-[12px] mb-2 uppercase tracking-widest font-semibold">Which did you enjoy more?</div>
          <div className="text-white font-black text-[20px] leading-tight">Pick your favourite</div>
        </div>

        {/* VS cards */}
        <div className="flex flex-col gap-4 flex-1 justify-center">
          {[
            { key: 'A', course: courseA },
            { key: 'B', course: courseB },
          ].map(({ key, course }) => (
            <button key={key} onClick={() => handlePick(key)}
              className={`relative flex-1 max-h-44 rounded-2xl border tap-feedback overflow-hidden transition-all duration-300 ${
                picked === key
                  ? 'border-[#e8341c] bg-[#1a0808]'
                  : picked && picked !== key
                  ? 'opacity-40 border-[#1e1e1e] bg-[#0f0f0f]'
                  : 'border-[#1e1e1e] bg-[#141414]'
              }`}>
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br opacity-20 transition-opacity ${picked === key ? 'from-[#e8341c] to-[#f07428] opacity-30' : 'from-[#1a1a1a] to-transparent'}`} />

              <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-1">Course {key}</div>
                    <div className="text-white font-black text-[18px] leading-tight">{course.name}</div>
                    <div className="text-[#555] text-[11px] mt-0.5">{course.location}</div>
                  </div>
                  {picked === key && (
                    <div className="w-8 h-8 bg-gradient-to-br from-[#e8341c] to-[#f07428] rounded-full flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-[9px] text-[#555] uppercase tracking-wider mb-0.5">Your Score</div>
                    <div className="text-[22px] font-black text-white leading-none">{course.yourScore}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-[#555] uppercase tracking-wider mb-0.5">Played</div>
                    <div className="text-[14px] font-semibold text-[#888]">{course.played}</div>
                  </div>
                  <div className="ml-auto">
                    <div className="text-[9px] text-[#555] uppercase tracking-wider mb-0.5">Current Rank</div>
                    <div className="text-[14px] font-semibold text-[#888]">#{course.currentRank}</div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-5">
          <button className="flex-1 py-3 bg-[#141414] border border-[#1e1e1e] text-[#555] text-[12px] font-medium rounded-xl tap-feedback">
            Too Close to Call
          </button>
          <button onClick={onBack} className="flex-1 py-3 bg-[#141414] border border-[#1e1e1e] text-[#555] text-[12px] font-medium rounded-xl tap-feedback">
            Undo Last
          </button>
        </div>
      </div>
    </div>
  );
}
