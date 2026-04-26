import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ProductGrid from '../../components/product/ProductGrid';
import ProductFilters from '../../components/product/ProductFilters';
import { DEMO_PRODUCTS, CATEGORIES } from '../../utils/constants';

const PAGE_SIZE = 10;

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [filters, setFilters] = useState({
    sort: 'newest',
    categories: searchParams.get('category') ? [searchParams.get('category')] : [],
    minPrice: 0,
    maxPrice: 500,
    inStock: false,
  });

  useEffect(() => {
    setPage(1);
  }, [filters, search]);

  const filtered = DEMO_PRODUCTS.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filters.categories.length && !filters.categories.includes(p.category)) return false;
    if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
    if (filters.inStock && p.stock === 0) return false;
    return true;
  }).sort((a, b) => {
    if (filters.sort === 'price_asc') return a.price - b.price;
    if (filters.sort === 'price_desc') return b.price - a.price;
    return b.id - a.id;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(search ? { search } : {});
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] pt-20">
      {/* Header */}
      <div className="border-b border-[#2e2e2e] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-medium text-[#f5f0e8] tracking-tight mb-2">All Products</h1>
          <p className="text-[#888888]">{filtered.length} products found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + mobile filter toggle */}
        <div className="flex gap-3 mb-8">
          <form onSubmit={handleSearch} className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-[#1a1a1a] border border-[#2e2e2e] rounded px-4 py-3 text-[#f5f0e8] placeholder:text-[#555] text-sm focus:border-[#c9b89a] outline-none pr-12 transition-colors"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888]">
              <Search className="w-4 h-4" />
            </button>
          </form>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-3 border border-[#2e2e2e] rounded text-[#f5f0e8] text-sm hover:border-[#c9b89a] transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Active filters */}
        {(filters.categories.length > 0 || filters.inStock || filters.maxPrice < 500) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilters((f) => ({ ...f, categories: f.categories.filter((c) => c !== cat) }))}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#c9b89a]/10 border border-[#c9b89a]/20 text-[#c9b89a] text-xs rounded-full hover:bg-[#c9b89a]/20 transition-colors"
              >
                {cat} <X className="w-3 h-3" />
              </button>
            ))}
            {filters.inStock && (
              <button
                onClick={() => setFilters((f) => ({ ...f, inStock: false }))}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#c9b89a]/10 border border-[#c9b89a]/20 text-[#c9b89a] text-xs rounded-full hover:bg-[#c9b89a]/20 transition-colors"
              >
                In Stock Only <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop filters sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <ProductFilters filters={filters} onChange={setFilters} />
          </div>

          {/* Mobile filters drawer */}
          {filtersOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <div className="absolute inset-0 bg-black/60" onClick={() => setFiltersOpen(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-[#0f0f0f] overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[#f5f0e8] font-medium">Filters</h3>
                  <button onClick={() => setFiltersOpen(false)} className="text-[#888]">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <ProductFilters filters={filters} onChange={(f) => { setFilters(f); setFiltersOpen(false); }} />
              </div>
            </div>
          )}

          {/* Products */}
          <div className="flex-1 min-w-0">
            <ProductGrid products={paginated} loading={loading} cols={3} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-[#2e2e2e] text-sm text-[#888] rounded disabled:opacity-30 hover:border-[#c9b89a] hover:text-[#c9b89a] transition-all"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 text-sm rounded transition-all ${
                      page === i + 1
                        ? 'bg-[#c9b89a] text-[#0f0f0f] font-medium'
                        : 'border border-[#2e2e2e] text-[#888] hover:border-[#c9b89a] hover:text-[#c9b89a]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-[#2e2e2e] text-sm text-[#888] rounded disabled:opacity-30 hover:border-[#c9b89a] hover:text-[#c9b89a] transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
