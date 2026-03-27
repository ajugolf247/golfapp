export default function StatusBar({ time = '9:41' }) {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 select-none">
      <span className="text-white text-[13px] font-semibold tracking-tight">{time}</span>
      <div className="flex items-center gap-1.5">
        {/* Signal bars */}
        <div className="flex items-end gap-[2px]">
          {[3, 5, 7, 9].map((h, i) => (
            <div key={i} className={`w-[3px] rounded-sm ${i < 3 ? 'bg-white' : 'bg-white/30'}`} style={{ height: `${h}px` }} />
          ))}
        </div>
        {/* WiFi */}
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M7 8.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="white"/>
          <path d="M3.5 6.5C4.5 5.5 5.7 5 7 5s2.5.5 3.5 1.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
          <path d="M1 4C2.7 2.3 4.7 1.5 7 1.5s4.3.8 6 2.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
        </svg>
        {/* Battery */}
        <div className="flex items-center gap-[1px]">
          <div className="w-[22px] h-[11px] rounded-[3px] border border-white/60 p-[1.5px] relative">
            <div className="h-full w-[80%] rounded-[1px] bg-white" />
          </div>
          <div className="w-[2px] h-[5px] rounded-r-sm bg-white/50" />
        </div>
      </div>
    </div>
  );
}
