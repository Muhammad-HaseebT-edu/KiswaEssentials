export default function Spinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10' };
  return (
    <div
      className={`
        border-2 border-[#2e2e2e] border-t-[#c9b89a] rounded-full animate-spin
        ${sizes[size]} ${className}
      `}
    />
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-[#1a1a1a] rounded border border-[#2e2e2e] overflow-hidden animate-pulse">
      <div className="aspect-square bg-[#2e2e2e]" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-[#2e2e2e] rounded w-3/4" />
        <div className="h-4 bg-[#2e2e2e] rounded w-1/2" />
      </div>
    </div>
  );
}
