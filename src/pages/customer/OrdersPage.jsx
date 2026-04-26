import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight } from 'lucide-react';
import { ORDER_STATUSES } from '../../utils/constants';
import { formatPrice } from '../../utils/formatPrice';
import { formatDate } from '../../utils/formatDate';

const DEMO_ORDERS = [
  { id: 'ORD-2025001', date: '2025-01-15', items: 3, total: 289.97, status: 'DELIVERED' },
  { id: 'ORD-2025002', date: '2025-02-03', items: 1, total: 74.99, status: 'SHIPPED' },
  { id: 'ORD-2025003', date: '2025-02-20', items: 2, total: 154.98, status: 'PAID' },
  { id: 'ORD-2025004', date: '2025-03-05', items: 1, total: 59.99, status: 'PENDING' },
];

export default function OrdersPage() {
  const [orders] = useState(DEMO_ORDERS);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-[#1a1a1a] border border-[#2e2e2e] flex items-center justify-center mx-auto mb-5">
            <Package className="w-9 h-9 text-[#555]" />
          </div>
          <h1 className="text-xl font-medium text-[#f5f0e8] mb-2">No orders yet</h1>
          <p className="text-[#888888] text-sm mb-6">Start shopping to see your orders here</p>
          <Link to="/products" className="text-[#c9b89a] text-sm hover:underline">Browse Products →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-medium text-[#f5f0e8] tracking-tight mb-10">My Orders</h1>

        <div className="space-y-3">
          {orders.map((order) => {
            const status = ORDER_STATUSES[order.status] || ORDER_STATUSES.PENDING;
            return (
              <Link
                key={order.id}
                to={`/my-orders/${order.id}`}
                className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-5 flex items-center gap-4 hover:border-[#c9b89a]/30 transition-all duration-300 group block"
              >
                <div className="w-12 h-12 rounded-full bg-[#c9b89a]/10 border border-[#c9b89a]/20 flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-[#c9b89a]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <p className="text-[#f5f0e8] font-medium font-mono">{order.id}</p>
                      <p className="text-[#888888] text-sm mt-0.5">{formatDate(order.date)} · {order.items} item{order.items !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <span className={`inline-flex px-2.5 py-0.5 rounded text-xs font-medium border ${status.color}`}>
                        {status.label}
                      </span>
                      <p className="text-[#c9b89a] font-medium">{formatPrice(order.total)}</p>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#555] group-hover:text-[#c9b89a] transition-colors shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
