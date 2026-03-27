export default function PrimaryButton({ children, onClick, className = '', variant = 'heat', fullWidth = true, disabled = false }) {
  const base = `relative overflow-hidden tap-feedback font-semibold text-[15px] tracking-tight rounded-xl py-4 transition-opacity flex items-center justify-center gap-2 ${fullWidth ? 'w-full' : ''}`;

  const variants = {
    heat: 'bg-gradient-to-r from-[#e8341c] to-[#f07428] text-white shadow-lg shadow-[#e8341c]/20',
    outline: 'border border-[#2a2a2a] text-white bg-transparent',
    ghost: 'text-[#888] bg-[#1a1a1a]',
    surface: 'bg-[#1e1e1e] text-white border border-[#2a2a2a]',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${disabled ? 'opacity-40' : 'active:opacity-80'} ${className}`}
    >
      {children}
    </button>
  );
}
