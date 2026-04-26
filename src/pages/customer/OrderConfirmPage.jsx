import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Mail } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function OrderConfirmPage() {
  const { state } = useLocation();
  const orderId = state?.orderId || `ORD-${Date.now()}`;
  const total = state?.total;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] pt-20 flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        {/* Animated checkmark */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-green-400/10 animate-ping" />
          <div className="relative w-24 h-24 rounded-full bg-green-400/10 border-2 border-green-400 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
        </div>

        <h1 className="text-3xl font-medium text-[#f5f0e8] tracking-tight mb-3">Order Confirmed!</h1>
        <p className="text-[#888888] mb-6">
          Thank you for your purchase. We&apos;re preparing your order with care.
        </p>

        <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-5 mb-8 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-[#888888]">Order ID</span>
            <span className="text-[#c9b89a] font-mono font-medium">{orderId}</span>
          </div>
          {total && (
            <div className="flex justify-between text-sm">
              <span className="text-[#888888]">Total Paid</span>
              <span className="text-[#f5f0e8]">
                {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(total)}
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-[#888888]">Estimated Delivery</span>
            <span className="text-[#f5f0e8]">5–7 business days</span>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-center text-sm text-[#888888] mb-8 bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-4">
          <Mail className="w-4 h-4 text-[#c9b89a]" />
          A confirmation email has been sent to your inbox
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/my-orders">
            <Button size="lg">
              <Package className="w-4 h-4" />
              Track Order
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="outline" size="lg">
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
