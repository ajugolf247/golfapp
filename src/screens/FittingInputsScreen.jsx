import { useState } from 'react';
import StatusBar from '../components/ui/StatusBar';
import ScreenHeader from '../components/ui/ScreenHeader';
import PrimaryButton from '../components/ui/PrimaryButton';

const FLIGHTS = ['Low', 'Mid-Low', 'Mid', 'Mid-High', 'High'];
const TEMPOS = ['Slow (4:1)', 'Moderate (3:1)', 'Fast (2:1)', 'Very Fast (2:1)'];

function SliderInput({ label, min, max, value, onChange, left, right, color = '#f07428' }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-white text-[12px] font-semibold">{label}</span>
        <span className="text-[11px] font-bold" style={{ color }}>{value}/10</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${color} 0%, ${color} ${(value / max) * 100}%, #1e1e1e ${(value / max) * 100}%, #1e1e1e 100%)`,
        }}
      />
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-[#444]">{left}</span>
        <span className="text-[10px] text-[#444]">{right}</span>
      </div>
    </div>
  );
}

export default function FittingInputsScreen({ onNext, onBack }) {
  const [sevenIron, setSevenIron] = useState('155');
  const [tempo, setTempo] = useState('Moderate (3:1)');
  const [wristFloor, setWristFloor] = useState('33');
  const [flight, setFlight] = useState('Mid');
  const [forgiveness, setForgiveness] = useState(8);
  const [workability, setWorkability] = useState(4);
  const [brandOpen, setBrandOpen] = useState(true);

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <StatusBar />
      <ScreenHeader onBack={onBack} title="Fitting Inputs" step={5} totalSteps={6} />

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* Intro */}
        <div className="mb-5 stagger">
          <p className="text-[13px] text-[#666] leading-relaxed">
            A few quick inputs to refine the fitting model. These help calibrate shaft, loft, and profile recommendations.
          </p>
        </div>

        {/* Distance card */}
        <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mb-4 stagger">
          <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-3">Ball Striking Baseline</div>

          <div className="mb-4">
            <label className="text-[11px] text-[#888] font-medium mb-1.5 block">7-Iron Carry Distance (yards)</label>
            <div className="relative">
              <input
                type="number"
                value={sevenIron}
                onChange={e => setSevenIron(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-[15px] font-bold outline-none focus:border-[#f07428]/40"
                placeholder="155"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555] text-[12px]">yds</span>
            </div>
          </div>

          <div>
            <label className="text-[11px] text-[#888] font-medium mb-1.5 block">Wrist-to-Floor Measurement (inches)</label>
            <div className="relative">
              <input
                type="number"
                value={wristFloor}
                onChange={e => setWristFloor(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-[15px] font-bold outline-none focus:border-[#f07428]/40"
                placeholder="33"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555] text-[12px]">in</span>
            </div>
          </div>
        </div>

        {/* Swing tempo */}
        <div className="mb-4 stagger">
          <label className="text-[11px] text-[#888] font-semibold uppercase tracking-widest mb-2 block">Swing Tempo</label>
          <div className="grid grid-cols-2 gap-1.5">
            {TEMPOS.map(t => (
              <button
                key={t}
                onClick={() => setTempo(t)}
                className={`py-3 px-3 rounded-xl text-[11px] font-semibold tap-feedback transition-all ${
                  tempo === t
                    ? 'bg-gradient-to-r from-[#e8341c] to-[#f07428] text-white'
                    : 'bg-[#141414] border border-[#1e1e1e] text-[#666]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Ball flight preference */}
        <div className="mb-4 stagger">
          <label className="text-[11px] text-[#888] font-semibold uppercase tracking-widest mb-2 block">Preferred Ball Flight</label>
          <div className="flex gap-1.5">
            {FLIGHTS.map(f => (
              <button
                key={f}
                onClick={() => setFlight(f)}
                className={`flex-1 py-2.5 rounded-xl text-[10px] font-semibold tap-feedback transition-all ${
                  flight === f
                    ? 'bg-gradient-to-r from-[#e8341c] to-[#f07428] text-white'
                    : 'bg-[#141414] border border-[#1e1e1e] text-[#666]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Forgiveness vs workability */}
        <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl p-4 mb-4 stagger">
          <div className="text-[10px] text-[#555] font-semibold uppercase tracking-widest mb-3">Club Profile Preference</div>
          <SliderInput
            label="Forgiveness Priority"
            min={1} max={10} value={forgiveness}
            onChange={setForgiveness}
            left="Don't care" right="Maximum"
            color="#e8341c"
          />
          <SliderInput
            label="Workability Priority"
            min={1} max={10} value={workability}
            onChange={setWorkability}
            left="Don't care" right="Maximum"
            color="#f07428"
          />
          <div className="bg-[#1a1a1a] rounded-xl px-3 py-2.5 mt-1">
            <div className="text-[10px] text-[#555] mb-1">Profile Lean</div>
            <div className="text-[13px] text-white font-semibold">
              {forgiveness >= 7 ? '→ High-Forgiveness / Game Improvement' :
               forgiveness >= 5 ? '→ Mid-Players / Distance Game Improvement' :
               '→ Players / Blade Style'}
            </div>
          </div>
        </div>

        {/* Brand openness */}
        <div className="mb-4 stagger">
          <div className="text-[11px] text-[#888] font-semibold uppercase tracking-widest mb-2">Brand Preference</div>
          <div className="flex gap-2">
            <button
              onClick={() => setBrandOpen(true)}
              className={`flex-1 py-3 rounded-xl text-[12px] font-semibold tap-feedback ${brandOpen ? 'bg-gradient-to-r from-[#e8341c] to-[#f07428] text-white' : 'bg-[#141414] border border-[#1e1e1e] text-[#666]'}`}
            >
              Open to Any Brand
            </button>
            <button
              onClick={() => setBrandOpen(false)}
              className={`flex-1 py-3 rounded-xl text-[12px] font-semibold tap-feedback ${!brandOpen ? 'bg-gradient-to-r from-[#e8341c] to-[#f07428] text-white' : 'bg-[#141414] border border-[#1e1e1e] text-[#666]'}`}
            >
              Have Preferences
            </button>
          </div>
        </div>

        {/* Completion indicator */}
        <div className="bg-[#0f1408] border border-emerald-500/20 rounded-2xl px-4 py-3 stagger">
          <div className="flex items-center gap-2.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
            <p className="text-[12px] text-[#888]">
              <span className="text-emerald-400 font-semibold">All data attached.</span> Ready to run the AI analysis — this takes about 15 seconds.
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-3 pb-2">
        <PrimaryButton onClick={onNext}>
          Run AI Analysis
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9,18 15,12 9,6"/>
          </svg>
        </PrimaryButton>
      </div>
    </div>
  );
}
