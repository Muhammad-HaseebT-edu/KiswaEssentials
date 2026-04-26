import { useState } from 'react';
import { ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '../../utils/constants';
import { formatPrice } from '../../utils/formatPrice';

export default function ProductFilters({ filters, onChange }) {
  const [openSections, setOpenSections] = useState({ category: true, price: true, sort: true });

  const toggle = (section) =>
    setOpenSections((s) => ({ ...s, [section]: !s[section] }));

  const handleCategory = (cat) => {
    const current = filters.categories || [];
    const updated = current.includes(cat)
      ? current.filter((c) => c !== cat)
      : [...current, cat];
    onChange({ ...filters, categories: updated });
  };

  return (
    <aside className="bg-[#1a1a1a] border border-[#2e2e2e] rounded p-5 space-y-6 sticky top-24">
      <div className="flex items-center gap-2 pb-4 border-b border-[#2e2e2e]">
        <SlidersHorizontal className="w-4 h-4 text-[#c9b89a]" />
        <h3 className="text-[#f5f0e8] font-medium tracking-wide text-sm uppercase">Filters</h3>
      </div>

      {/* Sort */}
      <div>
        <button
          onClick={() => toggle('sort')}
          className="flex items-center justify-between w-full text-[#f5f0e8] text-sm font-medium mb-3"
        >
          Sort By
          {openSections.sort ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.sort && (
          <div className="space-y-2">
            {[
              { value: 'newest', label: 'Newest First' },
              { value: 'price_asc', label: 'Price: Low to High' },
              { value: 'price_desc', label: 'Price: High to Low' },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2.5 cursor-pointer group">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                    filters.sort === option.value
                      ? 'border-[#c9b89a] bg-[#c9b89a]'
                      : 'border-[#2e2e2e] group-hover:border-[#c9b89a]/50'
                  }`}
                >
                  {filters.sort === option.value && <div className="w-1.5 h-1.5 rounded-full bg-[#0f0f0f]" />}
                </div>
                <span
                  className={`text-sm cursor-pointer ${
                    filters.sort === option.value ? 'text-[#c9b89a]' : 'text-[#888888] group-hover:text-[#f5f0e8]'
                  }`}
                  onClick={() => onChange({ ...filters, sort: option.value })}
                >
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Category */}
      <div>
        <button
          onClick={() => toggle('category')}
          className="flex items-center justify-between w-full text-[#f5f0e8] text-sm font-medium mb-3"
        >
          Category
          {openSections.category ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.category && (
          <div className="space-y-2">
            {CATEGORIES.map((cat) => {
              const checked = (filters.categories || []).includes(cat);
              return (
                <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                  <div
                    onClick={() => handleCategory(cat)}
                    className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-all ${
                      checked ? 'bg-[#c9b89a] border-[#c9b89a]' : 'border-[#2e2e2e] group-hover:border-[#c9b89a]/50'
                    }`}
                  >
                    {checked && <svg className="w-2.5 h-2.5 text-[#0f0f0f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <span
                    className={`text-sm cursor-pointer ${checked ? 'text-[#c9b89a]' : 'text-[#888888] group-hover:text-[#f5f0e8]'}`}
                    onClick={() => handleCategory(cat)}
                  >
                    {cat}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Price range */}
      <div>
        <button
          onClick={() => toggle('price')}
          className="flex items-center justify-between w-full text-[#f5f0e8] text-sm font-medium mb-3"
        >
          Price Range
          {openSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.price && (
          <div className="space-y-3">
            <div className="flex justify-between text-xs text-[#888888]">
              <span>{formatPrice(filters.minPrice || 0)}</span>
              <span>{formatPrice(filters.maxPrice || 500)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="500"
              step="5"
              value={filters.maxPrice || 500}
              onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
              className="w-full accent-[#c9b89a] cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* In stock */}
      <div className="flex items-center justify-between pt-2 border-t border-[#2e2e2e]">
        <span className="text-sm text-[#888888]">In Stock Only</span>
        <button
          onClick={() => onChange({ ...filters, inStock: !filters.inStock })}
          className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${
            filters.inStock ? 'bg-[#c9b89a]' : 'bg-[#2e2e2e]'
          }`}
        >
          <span
            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
              filters.inStock ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      {/* Clear */}
      <button
        onClick={() => onChange({ sort: 'newest', categories: [], minPrice: 0, maxPrice: 500, inStock: false })}
        className="w-full text-center text-xs text-[#888888] hover:text-[#c9b89a] transition-colors pt-2 border-t border-[#2e2e2e]"
      >
        Clear all filters
      </button>
    </aside>
  );
}
