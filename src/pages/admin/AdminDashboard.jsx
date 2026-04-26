import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, ShoppingBag, Package, Users, Plus, TrendingUp, ArrowUpRight } from 'lucide-react';
import { ORDER_STATUSES } from '../../utils/constants';
import { formatPrice } from '../../utils/formatPrice';
import { formatDate } from '../../utils/formatDate';
import AdminLayout from './AdminLayout';

const STATS = [
  { label: 'Total Revenue', value: '£12,450.00', icon: DollarSign, change: '+12%', positive: true },
  { label: 'Total Orders', value: '156', icon: ShoppingBag, change: '+8%', positive: true },
  { label: 'Total Products', value: '42', icon: Package, change: '+3', positive: true },
  { label: 'Total Customers', value: '89', icon: Users, change: '+5%', positive: true },
];

const RECENT_ORDERS = [
  { id: 'ORD-2025010', customer: 'Aisha Malik', date: '2025-03-10', total: 129.99, status: 'PENDING' },
  { id: 'ORD-2025009', customer: 'Yusuf Khan', date: '2025-03-09', total: 249.99, status: 'PAID' },
  { id: 'ORD-2025008', customer: 'Fatima Ahmed', date: '2025-03-08', total: 74.99, status: 'SHIPPED' },
  { id: 'ORD-2025007', customer: 'Omar Hassan', date: '2025-03-07', total: 189.98, status: 'DELIVERED' },
  { id: 'ORD-2025006', customer: 'Zara Ali', date: '2025-03-06', total: 59.99, status: 'CANCELLED' },
];

const BAR_DATA = [
  { day: 'Mon', value: 1200 },
  { day: 'Tue', value: 1800 },
  { day: 'Wed', value: 900 },
  { day: 'Thu', value: 2200 },
  { day: 'Fri', value: 1600 },
  { day: 'Sat', value: 2800 },
  { day: 'Sun', value: 2100 },
];

const maxBar = Math.max(...BAR_DATA.map((d) => d.value));

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map(({ label, value, icon: Icon, change, positive }) => (
          <div key={label} className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#c9b89a]/10 border border-[#c9b89a]/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#c9b89a]" />
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${positive ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                {change}
              </span>
            </div>
            <p className="text-2xl font-medium text-[#f5f0e8]">{value}</p>
            <p className="text-[#888888] text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="lg:col-span-1 bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-[#f5f0e8] font-medium">Revenue</h3>
              <p className="text-[#888888] text-xs mt-0.5">Last 7 days</p>
            </div>
            <TrendingUp className="w-5 h-5 text-[#c9b89a]" />
          </div>
          <div className="flex items-end gap-2 h-32">
            {BAR_DATA.map(({ day, value }) => (
              <div key={day} className="flex flex-col items-center gap-1 flex-1">
                <div
                  className="w-full bg-[#c9b89a]/20 rounded-sm hover:bg-[#c9b89a]/40 transition-colors cursor-pointer group relative"
                  style={{ height: `${(value / maxBar) * 100}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#0f0f0f] border border-[#2e2e2e] rounded px-1.5 py-0.5 text-xs text-[#f5f0e8] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    £{value}
                  </div>
                </div>
                <span className="text-[#555] text-xs">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent orders */}
        <div className="lg:col-span-2 bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[#f5f0e8] font-medium">Recent Orders</h3>
            <Link to="/admin/orders" className="text-xs text-[#c9b89a] hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2e2e2e]">
                  {['Order', 'Customer', 'Date', 'Total', 'Status'].map((h) => (
                    <th key={h} className="text-left pb-3 text-[#555] font-medium text-xs tracking-wide uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2e2e2e]">
                {RECENT_ORDERS.map((order) => {
                  const status = ORDER_STATUSES[order.status];
                  return (
                    <tr key={order.id} className="group hover:bg-[#2e2e2e]/30 transition-colors">
                      <td className="py-3 font-mono text-[#c9b89a] text-xs">{order.id}</td>
                      <td className="py-3 text-[#f5f0e8]">{order.customer}</td>
                      <td className="py-3 text-[#888888]">{formatDate(order.date)}</td>
                      <td className="py-3 text-[#f5f0e8]">{formatPrice(order.total)}</td>
                      <td className="py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs border ${status?.color}`}>
                          {status?.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <Link
          to="/admin/products/add"
          className="flex items-center gap-3 p-4 bg-[#c9b89a]/10 border border-[#c9b89a]/20 rounded-lg hover:bg-[#c9b89a]/15 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-[#c9b89a] flex items-center justify-center shrink-0">
            <Plus className="w-5 h-5 text-[#0f0f0f]" />
          </div>
          <div>
            <p className="text-[#f5f0e8] font-medium text-sm">Add New Product</p>
            <p className="text-[#888888] text-xs">Create a new listing</p>
          </div>
        </Link>
        <Link
          to="/admin/orders"
          className="flex items-center gap-3 p-4 bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg hover:border-[#c9b89a]/30 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-[#2e2e2e] flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5 text-[#888]" />
          </div>
          <div>
            <p className="text-[#f5f0e8] font-medium text-sm">View Orders</p>
            <p className="text-[#888888] text-xs">Manage & fulfil orders</p>
          </div>
        </Link>
      </div>
    </AdminLayout>
  );
}
