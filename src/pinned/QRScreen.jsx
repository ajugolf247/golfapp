import { useState, useEffect } from 'react';

function QRPattern() {
  return (
    <div className="relative w-48 h-48 bg-white rounded-2xl p-3 flex-shrink-0">
      {/* Finder patterns */}
      {[{t:0,l:0},{t:0,r:0},{b:0,l:0}].map((pos, i) => (
        <div key={i} className="absolute w-12 h-12"
          style={{ top: pos.t !== undefined ? 12 : 'auto', bottom: pos.b !== undefined ? 12 : 'auto', left: pos.l !== undefined ? 12 : 'auto', right: pos.r !== undefined ? 12 : 'auto' }}>
          <div className="w-full h-full border-[3px] border-black rounded-sm flex items-center justify-center">
            <div className="w-5 h-5 bg-black rounded-sm" />
          </div>
        </div>
      ))}
      {/* Data modules */}
      <div className="absolute inset-0 p-16 grid grid-cols-8 gap-px opacity-80">
        {[...Array(64)].map((_, i) => (
          <div key={i} className={`rounded-px ${Math.random() > 0.5 ? 'bg-black' : ''}`} />
        ))}
      </div>
      {/* Center brand */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 bg-gradient-to-br from-[#e8341c] to-[#f07428] rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-black text-[12px] tracking-tighter">PIN</span>
        </div>
      </div>
    </div>
  );
}

export default function QRScreen({ onBack }) {
  const [mode, setMode] = useState('show');
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2500);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <button onClick={onBack} className="w-8 h-8 bg-[#1e1e1e] rounded-full flex items-center justify-center tap-feedback">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round"><polyline points="15,18 9,12 15,6"/></svg>
        </button>
        <span className="text-white font-semibold text-[14px]">Add on Course</span>
        <div className="w-8" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-between px-5 pb-8">
        {/* Mode toggle */}
        <div className="w-full flex gap-1 bg-[#111] border border-[#1e1e1e] rounded-xl p-1 mb-8">
          {[['show', 'My Code'], ['scan', 'Scan Friend']].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              className={`flex-1 py-2.5 rounded-lg text-[12px] font-semibold transition-all ${mode === id ? 'bg-gradient-to-r from-[#e8341c] to-[#f07428] text-white' : 'text-[#555]'}`}>
              {label}
            </button>
          ))}
        </div>

        {mode === 'show' ? (
          <div className="flex flex-col items-center gap-6 flex-1 justify-center">
            <div className="text-center mb-2">
              <div className="text-white font-bold text-[18px]">@marcuswebb</div>
              <div className="text-[#555] text-[12px]">Show this to a playing partner</div>
            </div>

            <div className="p-4 bg-[#141414] border border-[#1e1e1e] rounded-3xl">
              <QRPattern />
            </div>

            <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl px-6 py-4 text-center">
              <div className="text-[#555] text-[11px] mb-1">On the first tee? Scan each other's code</div>
              <div className="text-white font-semibold text-[13px]">Connected instantly. No searching needed.</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 flex-1 justify-center w-full">
            {/* Camera viewfinder */}
            <div className="relative w-64 h-64 rounded-3xl overflow-hidden bg-[#111] border border-[#1e1e1e] flex items-center justify-center">
              {/* Scan lines */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#e8341c]/10 to-transparent" />
              {/* Corner brackets */}
              {[{t:12,l:12},{t:12,r:12},{b:12,l:12},{b:12,r:12}].map((pos, i) => (
                <div key={i} className="absolute w-8 h-8 border-[#e8341c]"
                  style={{
                    top: pos.t, bottom: pos.b, left: pos.l, right: pos.r,
                    borderTopWidth: pos.t !== undefined ? 3 : 0,
                    borderBottomWidth: pos.b !== undefined ? 3 : 0,
                    borderLeftWidth: pos.l !== undefined ? 3 : 0,
                    borderRightWidth: pos.r !== undefined ? 3 : 0,
                  }} />
              ))}
              {scanning ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-2 border-[#e8341c] border-t-transparent rounded-full animate-spin" />
                  <div className="text-[#888] text-[12px]">Scanning…</div>
                </div>
              ) : (
                <div className="text-center px-6">
                  <div className="text-[32px] mb-2">📷</div>
                  <div className="text-[#555] text-[12px]">Point camera at friend's Pinned QR code</div>
                </div>
              )}
            </div>

            <button onClick={handleScan} className="w-full py-4 bg-gradient-to-r from-[#e8341c] to-[#f07428] text-white font-bold text-[15px] rounded-2xl tap-feedback">
              {scanning ? 'Scanning…' : 'Open Camera to Scan'}
            </button>

            <div className="text-[#444] text-[11px] text-center">
              Or share your username: <span className="text-[#888] font-medium">@marcuswebb</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
