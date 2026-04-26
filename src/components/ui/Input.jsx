import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  { label, error, className = '', type = 'text', ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm text-[#888888] tracking-wide">{label}</label>
      )}
      <input
        ref={ref}
        type={type}
        className={`
          w-full bg-[#1a1a1a] border rounded px-4 py-2.5 text-[#f5f0e8]
          placeholder:text-[#555555] text-sm
          transition-all duration-300 outline-none
          ${error
            ? 'border-[#ef4444] focus:border-[#ef4444]'
            : 'border-[#2e2e2e] focus:border-[#c9b89a]'
          }
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-[#ef4444] mt-0.5">{error}</p>}
    </div>
  );
});

export default Input;
