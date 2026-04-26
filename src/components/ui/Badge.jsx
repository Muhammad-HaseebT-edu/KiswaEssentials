export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-[#c9b89a]/10 text-[#c9b89a] border-[#c9b89a]/20',
    success: 'bg-green-400/10 text-green-400 border-green-400/20',
    error: 'bg-red-400/10 text-red-400 border-red-400/20',
    warning: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
    info: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
    muted: 'bg-[#2e2e2e] text-[#888888] border-[#2e2e2e]',
  };

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium
        border tracking-wide
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
