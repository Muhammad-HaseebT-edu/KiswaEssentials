import ProductCard from './ProductCard';
import { SkeletonCard } from '../ui/Spinner';

export default function ProductGrid({ products, loading, cols = 4 }) {
  const gridCols = {
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  if (loading) {
    return (
      <div className={`grid ${gridCols[cols] || gridCols[4]} gap-4 lg:gap-6`}>
        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#2e2e2e] flex items-center justify-center mb-4">
          <span className="text-2xl">🛍️</span>
        </div>
        <p className="text-[#888888] text-lg font-medium">No products found</p>
        <p className="text-[#555] text-sm mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols[cols] || gridCols[4]} gap-4 lg:gap-6`}>
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
