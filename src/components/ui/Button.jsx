import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-[#c9b89a] text-[#0f0f0f] hover:bg-[#b8a489] font-medium',
  outline: 'border border-[#c9b89a] text-[#c9b89a] hover:bg-[#c9b89a]/10 bg-transparent',
  danger: 'bg-[#ef4444] text-white hover:bg-red-600 font-medium',
  ghost: 'text-[#f5f0e8] hover:bg-white/5 bg-transparent',
  secondary: 'bg-[#2e2e2e] text-[#f5f0e8] hover:bg-[#3a3a3a]',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 rounded
        transition-all duration-300 tracking-wide
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
