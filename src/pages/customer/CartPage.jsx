import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { removeItem, updateQuantity, selectCartTotal, selectCartCount } from '../../store/slices/cartSlice';
import { formatPrice } from '../../utils/formatPrice';
import { FREE_SHIPPING_THRESHOLD } from '../../utils/constants';
import Button from '../../components/ui/Button';

const FALLBACK = 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=200';

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart.items);
  const total = useSelector(selectCartTotal);
  const count = useSelector(selectCartCount);
  const shipping = total >= FREE_SHIPPING_THRESHOLD ? 0 : 4.99;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-[#1a1a1a] border border-[#2e2e2e] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-[#555]" />
          </div>
          <h1 className="text-2xl font-medium text-[#f5f0e8] mb-2">Your cart is empty</h1>
          <p className="text-[#888888] mb-8">Add some beautiful pieces to get started</p>
          <Link to="/products">
            <Button size="lg">
              <ShoppingBag className="w-5 h-5" />
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-medium text-[#f5f0e8] tracking-tight mb-10">
          Shopping Cart ({count} {count === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-5 flex gap-5 group hover:border-[#c9b89a]/20 transition-colors">
                <Link to={`/products/${item.id}`}>
                  <img
                    src={item.image || FALLBACK}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                    onError={(e) => { e.target.src = FALLBACK; }}
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/products/${item.id}`} className="text-[#f5f0e8] font-medium hover:text-[#c9b89a] transition-colors line-clamp-1">
                    {item.name}
                  </Link>
                  <p className="text-[#c9b89a] mt-1">{formatPrice(item.price)}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-[#2e2e2e] rounded overflow-hidden">
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                        className="w-8 h-8 flex items-center justify-center text-[#888] hover:text-[#f5f0e8] hover:bg-[#2e2e2e] transition-all"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center text-[#f5f0e8] text-sm">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        className="w-8 h-8 flex items-center justify-center text-[#888] hover:text-[#f5f0e8] hover:bg-[#2e2e2e] transition-all"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[#f5f0e8] font-medium">{formatPrice(item.price * item.quantity)}</span>
                      <button
                        onClick={() => dispatch(removeItem(item.id))}
                        className="text-[#555] hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm text-[#888888] hover:text-[#c9b89a] transition-colors mt-4"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-6 space-y-4 sticky top-24">
              <h2 className="text-[#f5f0e8] font-medium text-lg tracking-wide">Order Summary</h2>
              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#888888]">Subtotal ({count} items)</span>
                  <span className="text-[#f5f0e8]">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#888888]">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-400' : 'text-[#f5f0e8]'}>
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-[#888888] bg-[#c9b89a]/5 border border-[#c9b89a]/10 rounded p-2.5">
                    Add {formatPrice(FREE_SHIPPING_THRESHOLD - total)} more for free shipping
                  </p>
                )}
                <div className="border-t border-[#2e2e2e] pt-3 flex justify-between">
                  <span className="text-[#f5f0e8] font-medium">Total</span>
                  <span className="text-[#c9b89a] font-medium text-lg">{formatPrice(total + shipping)}</span>
                </div>
              </div>
              <Link to="/checkout" className="block">
                <Button size="lg" className="w-full justify-center">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <p className="text-xs text-[#888888] text-center">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
