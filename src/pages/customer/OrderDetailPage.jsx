import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Package, Truck, ExternalLink } from 'lucide-react';
import OrderStatusTracker from '../../components/order/OrderStatusTracker';
import { ORDER_STATUSES } from '../../utils/constants';
import { formatPrice } from '../../utils/formatPrice';
import { formatDate } from '../../utils/formatDate';
import { DEMO_PRODUCTS } from '../../utils/constants';

const DEMO_ORDER = {
  id: 'ORD-2025002',
  date: '2025-02-03T14:22:00Z',
  status: 'SHIPPED',
  total: 74.99,
  shipping: 0,
  courier: 'DHL',
  tracking: 'TRK-00234',
  items: [DEMO_PRODUCTS[2]].map((p) => ({ ...p, quantity: 1 })),
  address: {
    name: 'Sarah Ahmed',
    line1: '42 Brick Lane',
    city: 'London',
    postcode: 'E1 6RF',
    country: 'United Kingdom',
  },
};

export default function OrderDetailPage() {
  const { id } = useParams();
  const order = DEMO_ORDER;
  const status = ORDER_STATUSES[order.status] || ORDER_STATUSES.PENDING;

  return (
    <div className="min-h-screen bg-[#0f0f0f] pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/my-orders"
          className="inline-flex items-center gap-2 text-sm text-[#888888] hover:text-[#c9b89a] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Orders
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-medium text-[#f5f0e8] font-mono tracking-tight">{order.id}</h1>
            <p className="text-[#888888] text-sm mt-1">Placed on {formatDate(order.date)}</p>
          </div>
          <span className={`inline-flex px-3 py-1 rounded text-sm font-medium border ${status.color}`}>
            {status.label}
          </span>
        </div>

        {/* Status tracker */}
        <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-6 mb-6">
          <h2 className="text-[#f5f0e8] font-medium mb-4">Order Status</h2>
          <OrderStatusTracker currentStatus={order.status} />

          {order.courier && (
            <div className="mt-4 pt-4 border-t border-[#2e2e2e] flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-4 h-4 text-[#c9b89a]" />
                <span className="text-[#888888]">Courier:</span>
                <span className="text-[#f5f0e8] font-medium">{order.courier}</span>
                <span className="text-[#888888]">|</span>
                <span className="text-[#888888]">Tracking:</span>
                <span className="text-[#c9b89a] font-mono">{order.tracking}</span>
              </div>
              <a
                href={`https://www.dhl.com/gb-en/home/tracking/tracking-parcel.html?submit=1&tracking-id=${order.tracking}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#c9b89a] hover:underline"
              >
                Track on DHL <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Items */}
          <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-5">
            <h2 className="text-[#f5f0e8] font-medium mb-4">Items Ordered</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[#f5f0e8] text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-[#888888] text-xs mt-0.5">Qty: {item.quantity}</p>
                    <p className="text-[#c9b89a] text-sm mt-1">{formatPrice(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Address + Totals */}
          <div className="space-y-4">
            {/* Delivery address */}
            <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-5">
              <h2 className="text-[#f5f0e8] font-medium mb-3">Delivery Address</h2>
              <p className="text-[#f5f0e8] text-sm font-medium">{order.address.name}</p>
              <p className="text-[#888888] text-sm">{order.address.line1}</p>
              <p className="text-[#888888] text-sm">{order.address.city}, {order.address.postcode}</p>
              <p className="text-[#888888] text-sm">{order.address.country}</p>
            </div>

            {/* Price breakdown */}
            <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-5">
              <h2 className="text-[#f5f0e8] font-medium mb-3">Price Breakdown</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#888888]">Subtotal</span>
                  <span className="text-[#f5f0e8]">{formatPrice(order.total - order.shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888888]">Shipping</span>
                  <span className={order.shipping === 0 ? 'text-green-400' : 'text-[#f5f0e8]'}>
                    {order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}
                  </span>
                </div>
                <div className="flex justify-between font-medium border-t border-[#2e2e2e] pt-2">
                  <span className="text-[#f5f0e8]">Total</span>
                  <span className="text-[#c9b89a]">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
