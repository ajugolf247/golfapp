export default function Badge({ children, variant = 'default', size = 'sm' }) {
  const variants = {
    default: 'bg-[#1e1e1e] text-[#888] border border-[#2a2a2a]',
    heat: 'bg-gradient-to-r from-[#e8341c]/20 to-[#f07428]/20 text-[#f07428] border border-[#f07428]/20',
    critical: 'bg-[#e8341c]/10 text-[#e8341c] border border-[#e8341c]/20',
    warning: 'bg-[#f07428]/10 text-[#f07428] border border-[#f07428]/20',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  };
  const sizes = {
    xs: 'text-[9px] px-1.5 py-0.5',
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-[11px] px-2.5 py-1',
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold tracking-wide uppercase ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}
