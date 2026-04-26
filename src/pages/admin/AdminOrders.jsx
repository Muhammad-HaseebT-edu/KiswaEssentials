import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import { ORDER_STATUSES } from '../../utils/constants';
import { formatPrice } from '../../utils/formatPrice';
import { formatDate } from '../../utils/formatDate';
import AdminLayout from './AdminLayout';

const TABS = ['All', 'Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'];

const ALL_ORDERS = [
  { id: 'ORD-2025010', customer: 'Aisha Malik', email: 'aisha@example.com', date: '2025-03-10', total: 129.99, status: 'PENDING' },
  { id: 'ORD-2025009', customer: 'Yusuf Khan', email: 'yusuf@example.com', date: '2025-03-09', total: 249.99, status: 'PAID' },
  { id: 'ORD-2025008', customer: 'Fatima Ahmed', email: 'fatima@example.com', date: '2025-03-08', total: 74.99, status: 'SHIPPED' },
  { id: 'ORD-2025007', customer: 'Omar Hassan', email: 'omar@example.com', date: '2025-03-07', total: 189.98, status: 'DELIVERED' },
  { id: 'ORD-2025006', customer: 'Zara Ali', email: 'zara@example.com', date: '2025-03-06', total: 59.99, status: 'CANCELLED' },
  { id: 'ORD-2025005', customer: 'Hasan Raza', email: 'hasan@example.com', date: '2025-03-05', total: 94.99, status: 'DELIVERED' },
];

export default function AdminOrders() {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = ALL_ORDERS.filter((o) => {
    if (activeTab !== 'All' && o.status.toLowerCase() !== activeTab.toLowerCase()) return false;
    if (search && !o.customer.toLowerCase().includes(search.toLowerCase()) && !o.id.includes(search)) return false;
    return true;
  });

  return (
    <AdminLayout title="Orders">
      {/* Filter tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded text-sm whitespace-nowrap transition-all ${
              activeTab === tab
                ? 'bg-[#c9b89a] text-[#0f0f0f] font-medium'
                : 'bg-[#1a1a1a] border border-[#2e2e2e] text-[#888] hover:text-[#f5f0e8]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by order ID or customer..."
          className="w-full bg-[#1a1a1a] border border-[#2e2e2e] rounded px-4 py-2.5 text-[#f5f0e8] placeholder:text-[#555] text-sm focus:border-[#c9b89a] outline-none pr-10 transition-colors"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
      </div>

      {/* Table */}
      <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#2e2e2e]">
              <tr>
                {['Order ID', 'Customer', 'Date', 'Total', 'Status', ''].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[#555] font-medium text-xs tracking-widest uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2e2e2e]">
              {filtered.map((order) => {
                const status = ORDER_STATUSES[order.status];
                return (
                  <tr key={order.id} className="hover:bg-[#2e2e2e]/30 transition-colors">
                    <td className="px-5 py-4 font-mono text-[#c9b89a] text-xs">{order.id}</td>
                    <td className="px-5 py-4">
                      <p className="text-[#f5f0e8]">{order.customer}</p>
                      <p className="text-[#555] text-xs">{order.email}</p>
                    </td>
                    <td className="px-5 py-4 text-[#888]">{formatDate(order.date)}</td>
                    <td className="px-5 py-4 text-[#f5f0e8] font-medium">{formatPrice(order.total)}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded text-xs border ${status?.color}`}>
                        {status?.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="flex items-center gap-1 text-xs text-[#888] hover:text-[#c9b89a] transition-colors"
                      >
                        View <ChevronRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-[#555]">No orders found</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
