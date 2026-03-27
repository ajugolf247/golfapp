import StatusBar from '../components/ui/StatusBar';
import PrimaryButton from '../components/ui/PrimaryButton';
import BottomNav from '../components/ui/BottomNav';

export default function EntryScreen({ onNext }) {
  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <StatusBar />

      {/* Hero section */}
      <div className="flex-1 overflow-y-auto scrollbar-none">
        {/* Top brand bar */}
        <div className="flex items-center justify-between px-5 pt-2 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#e8341c] to-[#f07428] rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-[13px] tracking-tighter">PG</span>
            </div>
            <span className="text-[#555] text-[12px] font-medium tracking-widest uppercase">Performance Golf</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-2.5 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-[#888] font-medium">Premium</span>
          </div>
        </div>

        {/* Hero visual */}
        <div className="px-5 mb-6">
          <div className="relative rounded-2xl overflow-hidden h-52 bg-[#111]">
            {/* Ambient background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a08] via-[#0a0a0a] to-[#0a0f1a]" />

            {/* Concentric ring visual */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[140, 110, 80, 54].map((size, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border"
                  style={{
                    width: size,
                    height: size,
                    borderColor: i === 0 ? 'rgba(232,52,28,0.08)' : i === 1 ? 'rgba(240,116,40,0.12)' : i === 2 ? 'rgba(240,116,40,0.18)' : 'rgba(232,52,28,0.3)',
                  }}
                />
              ))}
              {/* Center emblem */}
              <div className="w-10 h-10 bg-gradient-to-br from-[#e8341c] to-[#f07428] rounded-xl flex items-center justify-center z-10 heat-glow">
                <span className="text-white font-black text-[15px] tracking-tighter">PG</span>
              </div>
            </div>

            {/* Floating data nodes */}
            {[
              { top: '18%', left: '12%', label: 'SwingScan', sublabel: '91% match' },
              { top: '18%', right: '12%', label: 'Scorecard', sublabel: 'Mar 22' },
              { bottom: '22%', left: '10%', label: 'Bag Health', sublabel: '52 / 100' },
              { bottom: '22%', right: '10%', label: 'Root Flaw', sublabel: 'Identified' },
            ].map((node, i) => (
              <div
                key={i}
                className="absolute bg-[#0a0a0a]/90 border border-[#2a2a2a] rounded-xl px-2.5 py-1.5 stagger"
                style={{ top: node.top, bottom: node.bottom, left: node.left, right: node.right }}
              >
                <div className="text-[9px] text-[#555] font-medium uppercase tracking-wider">{node.label}</div>
                <div className="text-[11px] text-white font-semibold">{node.sublabel}</div>
              </div>
            ))}

            {/* Connecting lines hint */}
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 390 208">
              <line x1="195" y1="104" x2="75" y2="45" stroke="#f07428" strokeWidth="0.5" strokeDasharray="3,3"/>
              <line x1="195" y1="104" x2="315" y2="45" stroke="#f07428" strokeWidth="0.5" strokeDasharray="3,3"/>
              <line x1="195" y1="104" x2="65" y2="162" stroke="#f07428" strokeWidth="0.5" strokeDasharray="3,3"/>
              <line x1="195" y1="104" x2="325" y2="162" stroke="#f07428" strokeWidth="0.5" strokeDasharray="3,3"/>
            </svg>
          </div>
        </div>

        {/* Main headline */}
        <div className="px-5 mb-5 stagger">
          <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#e8341c] mb-2">AI Club Fitting Tool</div>
          <h1 className="text-[28px] font-black text-white leading-[1.1] tracking-tight mb-3">
            Know exactly what<br />your game needs.
          </h1>
          <p className="text-[14px] text-[#666] leading-relaxed">
            Combines your SwingScan data, scorecard patterns, and bag setup to determine whether you need to train, adjust specs, or replace equipment.
          </p>
        </div>

        {/* Feature pillars */}
        <div className="px-5 mb-6">
          <div className="grid grid-cols-2 gap-2 stagger">
            {[
              { icon: '🧠', label: 'Swing Intelligence', desc: 'SwingScan root flaw analysis' },
              { icon: '📊', label: 'Round Insights', desc: 'Scorecard pattern analysis' },
              { icon: '🎒', label: 'Bag Evaluation', desc: 'Club-by-club health check' },
              { icon: '🎯', label: 'Right Next Step', desc: 'Train, tweak, or replace' },
            ].map((item, i) => (
              <div key={i} className="bg-[#141414] border border-[#1e1e1e] rounded-xl p-3">
                <div className="text-lg mb-1">{item.icon}</div>
                <div className="text-[12px] text-white font-semibold mb-0.5">{item.label}</div>
                <div className="text-[10px] text-[#555] leading-tight">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mx-5 mb-4 bg-[#141414] border border-[#1e1e1e] rounded-xl px-3.5 py-3">
          <div className="flex gap-2.5">
            <div className="text-[#555] mt-0.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <p className="text-[11px] text-[#555] leading-relaxed">
              This tool provides directional guidance based on your data. It is not a replacement for a professional club fitting session.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-5 pt-3 pb-2">
        <PrimaryButton onClick={onNext}>
          Start Fitting Analysis
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9,18 15,12 9,6"/>
          </svg>
        </PrimaryButton>
        <p className="text-center text-[11px] text-[#444] mt-2">Takes 3–4 minutes · Uses your existing PG data</p>
      </div>

      <BottomNav active="training" />
    </div>
  );
}
