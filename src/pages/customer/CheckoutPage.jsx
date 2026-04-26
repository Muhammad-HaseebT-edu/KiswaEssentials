import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Lock, CreditCard, ChevronRight } from 'lucide-react';
import { selectCartTotal } from '../../store/slices/cartSlice';
import { clearCart } from '../../store/slices/cartSlice';
import { showNotification } from '../../store/slices/uiSlice';
import { formatPrice } from '../../utils/formatPrice';
import { FREE_SHIPPING_THRESHOLD } from '../../utils/constants';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const STEPS = ['Details', 'Payment', 'Confirm'];

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deliveryData, setDeliveryData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((s) => s.cart.items);
  const total = useSelector(selectCartTotal);
  const shipping = total >= FREE_SHIPPING_THRESHOLD ? 0 : 4.99;
  const grandTotal = total + shipping;

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { country: 'United Kingdom' },
  });

  const onDeliverySubmit = (data) => {
    setDeliveryData(data);
    setStep(1);
  };

  const onPaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    dispatch(clearCart());
    dispatch(showNotification({ type: 'success', message: 'Order placed successfully!' }));
    navigate('/order-confirm', { state: { orderId: `ORD-${Date.now()}`, total: grandTotal } });
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Link_Logo />
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    i < step ? 'bg-[#c9b89a] text-[#0f0f0f]' :
                    i === step ? 'bg-[#c9b89a]/20 border-2 border-[#c9b89a] text-[#c9b89a]' :
                    'bg-[#1a1a1a] border border-[#2e2e2e] text-[#555]'
                  }`}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span className={`text-xs tracking-wide ${i === step ? 'text-[#c9b89a]' : 'text-[#555]'}`}>{s}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-16 h-px mt-[-1rem] ${i < step ? 'bg-[#c9b89a]' : 'bg-[#2e2e2e]'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 0 && (
              <form onSubmit={handleSubmit(onDeliverySubmit)} className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-6 space-y-5">
                <h2 className="text-[#f5f0e8] font-medium text-lg">Delivery Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Full Name" placeholder="John Smith" error={errors.fullName?.message}
                    {...register('fullName', { required: 'Full name is required' })} />
                  <Input label="Email Address" type="email" placeholder="john@example.com" error={errors.email?.message}
                    {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })} />
                </div>
                <Input label="Phone Number" type="tel" placeholder="+44 7700 000000" error={errors.phone?.message}
                  {...register('phone', { required: 'Phone number is required' })} />
                <Input label="Address Line 1" placeholder="123 High Street" error={errors.address1?.message}
                  {...register('address1', { required: 'Address is required' })} />
                <Input label="Address Line 2 (Optional)" placeholder="Flat 2B" />
                <div className="grid sm:grid-cols-3 gap-4">
                  <Input label="City" placeholder="London" error={errors.city?.message}
                    {...register('city', { required: 'City is required' })} />
                  <Input label="Postcode" placeholder="SW1A 1AA" error={errors.postcode?.message}
                    {...register('postcode', { required: 'Postcode is required' })} />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-[#888888]">Country</label>
                    <select
                      className="bg-[#0f0f0f] border border-[#2e2e2e] rounded px-4 py-2.5 text-[#f5f0e8] text-sm focus:border-[#c9b89a] outline-none"
                      {...register('country')}
                    >
                      <option>United Kingdom</option>
                      <option>United States</option>
                      <option>Pakistan</option>
                      <option>India</option>
                      <option>Bangladesh</option>
                    </select>
                  </div>
                </div>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" className="accent-[#c9b89a]" {...register('saveAddress')} />
                  <span className="text-sm text-[#888888]">Save this address for future orders</span>
                </label>
                <Button type="submit" size="lg" className="w-full justify-center">
                  Continue to Payment <ChevronRight className="w-4 h-4" />
                </Button>
              </form>
            )}

            {step === 1 && (
              <form onSubmit={onPaymentSubmit} className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-6 space-y-5">
                <h2 className="text-[#f5f0e8] font-medium text-lg">Payment Details</h2>
                {/* Stripe card placeholder */}
                <div className="border border-[#2e2e2e] rounded p-4 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-[#888888] mb-3">
                    <CreditCard className="w-4 h-4 text-[#c9b89a]" />
                    Card Information
                  </div>
                  <div className="bg-[#0f0f0f] border border-[#2e2e2e] rounded px-4 py-3 text-[#555] text-sm">
                    Card number •••• •••• •••• ••••
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#0f0f0f] border border-[#2e2e2e] rounded px-4 py-3 text-[#555] text-sm">
                      MM / YY
                    </div>
                    <div className="bg-[#0f0f0f] border border-[#2e2e2e] rounded px-4 py-3 text-[#555] text-sm">
                      CVV
                    </div>
                  </div>
                  <p className="text-xs text-[#555] italic">Stripe payment integration placeholder</p>
                </div>

                <Button type="submit" loading={loading} size="lg" className="w-full justify-center">
                  <Lock className="w-4 h-4" />
                  Pay {formatPrice(grandTotal)}
                </Button>
                <div className="flex items-center justify-center gap-2 text-xs text-[#555]">
                  <Lock className="w-3 h-3" />
                  Secured by Stripe — 256-bit SSL encryption
                </div>
                <button type="button" onClick={() => setStep(0)} className="text-sm text-[#888] hover:text-[#c9b89a] transition-colors">
                  ← Back to delivery details
                </button>
              </form>
            )}
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-5 space-y-4 sticky top-24">
              <h3 className="text-[#f5f0e8] font-medium">Order Summary</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[#f5f0e8] text-xs font-medium line-clamp-1">{item.name}</p>
                      <p className="text-[#888888] text-xs">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-[#f5f0e8] text-xs shrink-0">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#2e2e2e] pt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#888888]">Subtotal</span>
                  <span className="text-[#f5f0e8]">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888888]">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-400 text-xs' : 'text-[#f5f0e8]'}>
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between font-medium border-t border-[#2e2e2e] pt-2">
                  <span className="text-[#f5f0e8]">Total</span>
                  <span className="text-[#c9b89a]">{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Link_Logo() {
  return (
    <h1 className="text-[#c9b89a] font-medium tracking-[0.2em] text-xl uppercase">
      Kiswa Essentials
    </h1>
  );
}
