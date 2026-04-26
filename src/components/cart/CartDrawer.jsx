import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { closeCart, removeItem, updateQuantity, selectCartTotal, selectCartCount } from '../../store/slices/cartSlice';
import { formatPrice } from '../../utils/formatPrice';

const FALLBACK = 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200';

export default function CartDrawer() {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((s) => s.cart);
  const total = useSelector(selectCartTotal);
  const count = useSelector(selectCartCount);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => dispatch(closeCart())}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full max-w-md bg-[#0f0f0f] border-l border-[#2e2e2e]
          z-50 flex flex-col transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2e2e2e]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#c9b89a]" />
            <h2 className="text-[#f5f0e8] font-medium tracking-wide">Your Cart ({count})</h2>
          </div>
          <button
            onClick={() => dispatch(closeCart())}
            className="text-[#888888] hover:text-[#f5f0e8] transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#2e2e2e] flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 text-[#555]" />
              </div>
              <div>
                <p className="text-[#f5f0e8] font-medium">Your cart is empty</p>
                <p className="text-[#888888] text-sm mt-1">Add some beautiful pieces</p>
              </div>
              <Link
                to="/products"
                onClick={() => dispatch(closeCart())}
                className="px-6 py-2 bg-[#c9b89a] text-[#0f0f0f] text-sm font-medium rounded hover:bg-[#b8a489] transition-colors"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-[#1a1a1a] border border-[#2e2e2e] rounded group"
                >
                  <img
                    src={item.image || FALLBACK}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => { e.target.src = FALLBACK; }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[#f5f0e8] text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-[#c9b89a] text-sm mt-0.5">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                        className="w-6 h-6 border border-[#2e2e2e] rounded flex items-center justify-center text-[#888888] hover:border-[#c9b89a] hover:text-[#c9b89a] transition-all"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-[#f5f0e8] text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        className="w-6 h-6 border border-[#2e2e2e] rounded flex items-center justify-center text-[#888888] hover:border-[#c9b89a] hover:text-[#c9b89a] transition-all"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => dispatch(removeItem(item.id))}
                      className="text-[#555] hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <p className="text-[#f5f0e8] text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#2e2e2e] px-6 py-5 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-[#888888]">Subtotal</span>
              <span className="text-[#f5f0e8] font-medium">{formatPrice(total)}</span>
            </div>
            {total < 75 && (
              <p className="text-xs text-[#888888]">
                Add {formatPrice(75 - total)} more for free shipping
              </p>
            )}
            <Link
              to="/checkout"
              onClick={() => dispatch(closeCart())}
              className="block w-full text-center bg-[#c9b89a] text-[#0f0f0f] py-3 rounded font-medium text-sm hover:bg-[#b8a489] transition-colors tracking-wide"
            >
              Checkout — {formatPrice(total)}
            </Link>
            <Link
              to="/cart"
              onClick={() => dispatch(closeCart())}
              className="block w-full text-center border border-[#2e2e2e] text-[#888888] py-2.5 rounded text-sm hover:border-[#c9b89a] hover:text-[#c9b89a] transition-all"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
