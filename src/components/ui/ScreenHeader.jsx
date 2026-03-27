export default function ScreenHeader({ onBack, title, step, totalSteps, rightAction }) {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <button
        onClick={onBack}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1e1e1e] text-[#888] tap-feedback"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15,18 9,12 15,6"/>
        </svg>
      </button>

      <div className="flex flex-col items-center gap-0.5">
        {title && <span className="text-white text-[13px] font-semibold tracking-tight">{title}</span>}
        {step && totalSteps && (
          <div className="flex items-center gap-1">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className={`h-[3px] rounded-full transition-all duration-300 ${
                i < step ? 'bg-[#e8341c] w-4' : i === step - 1 ? 'bg-[#f07428] w-5' : 'bg-[#2a2a2a] w-3'
              }`} />
            ))}
          </div>
        )}
      </div>

      <div className="w-8 h-8 flex items-center justify-center">
        {rightAction || null}
      </div>
    </div>
  );
}
