export default function Card({ children, className = '', glow = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-[#141414] border border-[#1e1e1e] rounded-2xl ${glow ? 'heat-glow' : ''} ${onClick ? 'tap-feedback cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
