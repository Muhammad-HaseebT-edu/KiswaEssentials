import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Save } from 'lucide-react';
import { ORDER_STATUSES, DEMO_PRODUCTS } from '../../utils/constants';
import { formatPrice } from '../../utils/formatPrice';
import { formatDate } from '../../utils/formatDate';
import AdminLayout from './AdminLayout';
import Button from '../../components/ui/Button';
import { showNotification } from '../../store/slices/uiSlice';
import { useDispatch } from 'react-redux';

const DEMO_ORDER = {
  id: 'ORD-2025009',
  date: '2025-03-09T10:15:00Z',
  status: 'PAID',
  total: 249.99,
  shipping: 0,
  customer: { name: 'Yusuf Khan', email: 'yusuf@example.com', phone: '+44 7700 111111' },
  address: { line1: '15 Park Avenue', city: 'Manchester', postcode: 'M1 4AA', country: 'United Kingdom' },
  items: [DEMO_PRODUCTS[5]].map((p) => ({ ...p, quantity: 1 })),
  courier: '',
  tracking: '',
};

export default function AdminOrderDetail({ staffOnly = false }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [order, setOrder] = useState(DEMO_ORDER);
  const [status, setStatus] = useState(order.status);
  const [courier, setCourier] = useState(order.courier);
  const [tracking, setTracking] = useState(order.tracking);
  const [saving, setSaving] = useState(false);

  const handleUpdate = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setOrder((o) => ({ ...o, status, courier, tracking }));
    dispatch(showNotification({ type: 'success', message: 'Order updated — customer will be notified' }));
    setSaving(false);
  };

  const statusInfo = ORDER_STATUSES[order.status];
  const backLink = staffOnly ? '/staff/orders' : '/admin/orders';

  return (
    <AdminLayout title={`Order ${order.id}`}>
      <Link to={backLink} className="inline-flex items-center gap-2 text-sm text-[#888] hover:text-[#c9b89a] transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Orders
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-5">
          {/* Customer */}
          <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-5">
            <h3 className="text-[#f5f0e8] font-medium mb-4">Customer Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex gap-3">
                <span className="text-[#888] w-24">Name</span>
                <span className="text-[#f5f0e8] font-medium">{order.customer.name}</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[#888] w-24">Email</span>
                <a href={`mailto:${order.customer.email}`} className="text-[#c9b89a] hover:underline">{order.customer.email}</a>
              </div>
              <div className="flex gap-3">
                <span className="text-[#888] w-24">Phone</span>
                <span className="text-[#f5f0e8]">{order.customer.phone}</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[#888] w-24">Address</span>
                <span className="text-[#f5f0e8]">{order.address.line1}, {order.address.city}, {order.address.postcode}</span>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-5">
            <h3 className="text-[#f5f0e8] font-medium mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-[#2e2e2e] last:border-0 last:pb-0">
                  <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" />
                  <div className="flex-1">
                    <p className="text-[#f5f0e8] font-medium">{item.name}</p>
                    <p className="text-[#888] text-xs mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-[#c9b89a] font-medium">{formatPrice(item.price)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-[#2e2e2e] pt-4 mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#888]">Subtotal</span>
                <span className="text-[#f5f0e8]">{formatPrice(order.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888]">Shipping</span>
                <span className="text-green-400 text-xs">Free</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-[#2e2e2e]">
                <span className="text-[#f5f0e8]">Total</span>
                <span className="text-[#c9b89a]">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Update panel */}
        <div className="space-y-5">
          <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[#f5f0e8] font-medium">Order Info</h3>
              <span className={`inline-flex px-2.5 py-0.5 rounded text-xs border ${statusInfo?.color}`}>
                {statusInfo?.label}
              </span>
            </div>
            <p className="text-[#888] text-xs">Placed: {formatDate(order.date)}</p>
          </div>

          <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-5 space-y-4">
            <h3 className="text-[#f5f0e8] font-medium">Update Order</h3>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#888]">Order Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-[#0f0f0f] border border-[#2e2e2e] rounded px-3 py-2.5 text-[#f5f0e8] text-sm focus:border-[#c9b89a] outline-none"
              >
                {Object.entries(ORDER_STATUSES).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#888]">Courier Name</label>
              <input
                value={courier}
                onChange={(e) => setCourier(e.target.value)}
                placeholder="e.g. DHL, Royal Mail"
                className="bg-[#0f0f0f] border border-[#2e2e2e] rounded px-3 py-2.5 text-[#f5f0e8] text-sm focus:border-[#c9b89a] outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#888]">Tracking Number</label>
              <input
                value={tracking}
                onChange={(e) => setTracking(e.target.value)}
                placeholder="e.g. TRK-00234"
                className="bg-[#0f0f0f] border border-[#2e2e2e] rounded px-3 py-2.5 text-[#f5f0e8] text-sm focus:border-[#c9b89a] outline-none transition-colors"
              />
            </div>

            <Button loading={saving} onClick={handleUpdate} className="w-full justify-center">
              <Save className="w-4 h-4" />
              Update Order
            </Button>

            <div className="flex items-center gap-2 text-xs text-[#555]">
              <Mail className="w-3 h-3" />
              Customer will be emailed on update
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
