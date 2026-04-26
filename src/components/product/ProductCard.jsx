import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/slices/cartSlice';
import { showNotification } from '../../store/slices/uiSlice';
import { formatPrice } from '../../utils/formatPrice';
import Badge from '../ui/Badge';

const FALLBACK_IMAGE = 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem({ id: product.id, name: product.name, price: product.price, image: product.image }));
    dispatch(showNotification({ type: 'success', message: `${product.name} added to cart` }));
  };

  const stockBadge = product.stock === 0
    ? { label: 'Out of Stock', variant: 'error' }
    : product.stock <= 3
    ? { label: 'Low Stock', variant: 'warning' }
    : null;

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="bg-[#1a1a1a] border border-[#2e2e2e] rounded overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#c9b89a]/30 hover:shadow-xl hover:shadow-[#c9b89a]/5"
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image || FALLBACK_IMAGE}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
          />
          {/* Category badge overlay */}
          {product.category && (
            <div className="absolute top-2 left-2">
              <Badge>{product.category}</Badge>
            </div>
          )}
          {stockBadge && (
            <div className="absolute top-2 right-2">
              <Badge variant={stockBadge.variant}>{stockBadge.label}</Badge>
            </div>
          )}
          {/* Hover actions */}
          <div
            className={`absolute bottom-0 left-0 right-0 flex gap-2 p-3 transition-all duration-300 ${
              hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#c9b89a] text-[#0f0f0f] text-xs font-medium py-2 rounded hover:bg-[#b8a489] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add to Cart
            </button>
            <Link
              to={`/products/${product.id}`}
              onClick={(e) => e.stopPropagation()}
              className="w-9 flex items-center justify-center bg-[#0f0f0f]/80 text-[#f5f0e8] rounded hover:bg-[#0f0f0f] transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-[#f5f0e8] text-sm font-medium leading-snug mb-1.5 line-clamp-2 group-hover:text-[#c9b89a] transition-colors">
            {product.name}
          </h3>
          <p className="text-[#c9b89a] font-medium text-sm">{formatPrice(product.price)}</p>
        </div>
      </div>
    </Link>
  );
}
