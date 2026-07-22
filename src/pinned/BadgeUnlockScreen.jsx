import { useEffect, useState } from 'react';
import { UNLOCK_BADGE } from '../data/pinnedData';

export default function BadgeUnlockScreen({ onDone }) {
  const [phase, setPhase] = useState(0);
  const badge = UNLOCK_BADGE;

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] items-center justify-center relative overflow-hidden">
      {/* Background burst */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {phase >= 2 && [...Array(12)].map((_, i) => (
          <div key={i} className="absolute w-1 bg-gradient-to-t from-[#e8341c] to-transparent rounded-full opacity-60"
            style={{
              height: `${60 + Math.random() * 80}px`,
              transform: `rotate(${i * 30}deg) translateY(-${80 + Math.random() * 40}px)`,
              transition: 'all 0.6s ease',
            }} />
        ))}
        <div className="absolute w-64 h-64 rounded-full border border-[#e8341c]/10 animate-ping" style={{ animationDuration: '2s' }} />
        <div className="absolute w-48 h-48 rounded-full border border-[#f07428]/15 animate-ping" style={{ animationDuration: '2.4s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-8 text-center">
        {/* Badge icon */}
        <div className={`transition-all duration-700 ${phase >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <div className="w-32 h-32 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#2a2a2a] rounded-3xl flex items-center justify-center mb-2 mx-auto shadow-2xl"
            style={{ boxShadow: phase >= 2 ? '0 0 60px rgba(232,52,28,0.3), 0 0 120px rgba(240,116,40,0.15)' : 'none', transition: 'box-shadow 0.8s ease' }}>
            <span className="text-[64px]">{badge.icon}</span>
          </div>
        </div>

        {/* Tier label */}
        <div className={`transition-all duration-500 delay-300 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex items-center gap-1.5 bg-[#a8a9ad]/10 border border-[#a8a9ad]/20 rounded-full px-3 py-1 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#a8a9ad]" />
            <span className="text-[#a8a9ad] text-[10px] font-bold uppercase tracking-widest">Silver Badge Unlocked</span>
          </div>
        </div>

        {/* Badge name */}
        <div className={`transition-all duration-500 delay-500 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-[36px] font-black text-white leading-tight mb-2">{badge.name}</h1>
          <p className="text-[14px] text-[#888] mb-1">{badge.desc}</p>
          <p className="text-[13px] text-[#555] italic leading-relaxed mb-8">"{badge.message}"</p>
        </div>

        {/* Share / continue */}
        <div className={`w-full flex flex-col gap-3 transition-all duration-500 delay-700 ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button className="w-full py-4 bg-gradient-to-r from-[#e8341c] to-[#f07428] text-white font-bold text-[15px] rounded-2xl tap-feedback">
            Share Achievement
          </button>
          <button onClick={onDone} className="w-full py-3.5 bg-[#141414] border border-[#1e1e1e] text-[#888] font-medium text-[14px] rounded-2xl tap-feedback">
            Back to Badge Library
          </button>
        </div>
      </div>
    </div>
  );
}
