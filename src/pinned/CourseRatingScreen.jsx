import { useState } from 'react';
import { RATING_ATTRIBUTES } from '../data/pinnedData';

export default function CourseRatingScreen({ onNext, onBack }) {
  const [sentiment, setSentiment] = useState(null);
  const [selected, setSelected] = useState([]);
  const [step, setStep] = useState('sentiment'); // sentiment | attributes

  const toggleAttr = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSentiment = (val) => {
    setSentiment(val);
    if (val === 'liked') setStep('attributes');
    else onNext();
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <div className="flex items-center justify-between px-5 pt-12 pb-3">
        <button onClick={onBack} className="w-8 h-8 bg-[#1e1e1e] rounded-full flex items-center justify-center tap-feedback">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round"><polyline points="15,18 9,12 15,6"/></svg>
        </button>
        <div className="text-center">
          <div className="text-white font-semibold text-[13px]">Rate Your Round</div>
          <div className="text-[#555] text-[11px]">Torrey Pines South · Jul 22</div>
        </div>
        <button className="text-[#555] text-[11px] font-medium tap-feedback">Skip</button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {step === 'sentiment' ? (
          <div className="flex flex-col items-center justify-center h-full gap-8 stagger">
            {/* Score summary */}
            <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-5 w-full text-center">
              <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-1">Your Score</div>
              <div className="text-[52px] font-black text-white leading-none">84</div>
              <div className="text-[#f07428] font-semibold text-[14px]">+12 · Par 72</div>
              <div className="text-[#555] text-[11px] mt-1">Torrey Pines South · 18 holes</div>
            </div>

            {/* Who did you play with */}
            <div className="w-full">
              <div className="text-[11px] text-[#888] font-semibold uppercase tracking-widest mb-2">Who Did You Play With?</div>
              <div className="flex gap-2 flex-wrap">
                {['Jake M.', 'Solo Round', 'Add Partner'].map((name, i) => (
                  <button key={i} className={`px-3 py-2 rounded-xl text-[12px] font-medium tap-feedback border ${i === 0 ? 'bg-[#1a0a08] border-[#e8341c]/30 text-white' : 'bg-[#141414] border-[#1e1e1e] text-[#666]'}`}>
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sentiment question */}
            <div className="w-full">
              <div className="text-white font-bold text-[18px] text-center mb-5">How'd you like Torrey Pines South?</div>
              <div className="flex flex-col gap-3">
                {[
                  { id: 'liked', emoji: '😍', label: 'I liked it', sub: 'Worth a return visit' },
                  { id: 'okay', emoji: '😐', label: 'It was okay', sub: 'Decent but not a favourite' },
                  { id: 'disliked', emoji: '😕', label: "Didn't love it", sub: 'Probably won\'t return' },
                ].map(opt => (
                  <button key={opt.id} onClick={() => handleSentiment(opt.id)}
                    className={`flex items-center gap-4 p-4 rounded-2xl border tap-feedback text-left transition-all ${
                      sentiment === opt.id ? 'bg-[#1a0a08] border-[#e8341c]/40' : 'bg-[#141414] border-[#1e1e1e]'
                    }`}>
                    <span className="text-[28px]">{opt.emoji}</span>
                    <div>
                      <div className="text-white font-semibold text-[14px]">{opt.label}</div>
                      <div className="text-[#555] text-[11px]">{opt.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="stagger">
            <div className="mb-5 mt-2">
              <div className="text-white font-bold text-[18px] mb-1">What did you like?</div>
              <div className="text-[#555] text-[12px]">Select all that apply · You can skip this</div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-6">
              {RATING_ATTRIBUTES.map(attr => (
                <button key={attr.id} onClick={() => toggleAttr(attr.id)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-left tap-feedback transition-all ${
                    selected.includes(attr.id)
                      ? 'bg-[#1a0a08] border-[#e8341c]/40 text-white'
                      : 'bg-[#141414] border-[#1e1e1e] text-[#666]'
                  }`}>
                  <span className="text-[18px]">{attr.icon}</span>
                  <span className="text-[11px] font-medium leading-tight">{attr.label}</span>
                  {selected.includes(attr.id) && (
                    <div className="ml-auto w-4 h-4 rounded-full bg-gradient-to-br from-[#e8341c] to-[#f07428] flex items-center justify-center">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Optional notes */}
            <div className="mb-5">
              <div className="text-[11px] text-[#888] font-semibold uppercase tracking-widest mb-2">Notes (optional)</div>
              <div className="bg-[#141414] border border-[#1e1e1e] rounded-xl px-4 py-3">
                <span className="text-[#444] text-[13px]">Add a note about this round…</span>
              </div>
            </div>

            <button onClick={onNext}
              className="w-full py-4 bg-gradient-to-r from-[#e8341c] to-[#f07428] text-white font-bold text-[15px] rounded-2xl tap-feedback">
              Continue to Ranking
              <span className="ml-2">→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
