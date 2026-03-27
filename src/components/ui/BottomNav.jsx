export default function BottomNav({ active = 'training' }) {
  const items = [
    { id: 'home', label: 'Home', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="9,22 9,12 15,12 15,22" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
    { id: 'training', label: 'Train', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12,6 12,12 16,14" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
    { id: 'swing', label: 'SwingScan', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor">
        <path d="M23 7l-7 5 7 5V7z" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
    { id: 'rounds', label: 'Rounds', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="14,2 14,8 20,8" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round"/>
        <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round"/>
      </svg>
    )},
    { id: 'profile', label: 'Profile', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
  ];

  return (
    <div className="flex items-center justify-around px-2 pt-2 pb-5 bg-[#111111] border-t border-[#1e1e1e]">
      {items.map(item => (
        <button key={item.id} className={`flex flex-col items-center gap-0.5 min-w-[48px] transition-colors ${
          active === item.id ? 'text-[#f07428]' : 'text-[#555]'
        }`}>
          {item.icon}
          <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
