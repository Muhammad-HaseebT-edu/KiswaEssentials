import { useState } from 'react';
import { Search } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import AdminLayout from './AdminLayout';

const CUSTOMERS = [
  { id: 1, name: 'Aisha Malik', email: 'aisha@example.com', phone: '+44 7700 100001', orders: 3, joined: '2024-06-15' },
  { id: 2, name: 'Yusuf Khan', email: 'yusuf@example.com', phone: '+44 7700 100002', orders: 7, joined: '2024-04-22' },
  { id: 3, name: 'Fatima Ahmed', email: 'fatima@example.com', phone: '+44 7700 100003', orders: 2, joined: '2024-09-01' },
  { id: 4, name: 'Omar Hassan', email: 'omar@example.com', phone: '+44 7700 100004', orders: 5, joined: '2024-01-10' },
  { id: 5, name: 'Zara Ali', email: 'zara@example.com', phone: '+44 7700 100005', orders: 1, joined: '2025-01-18' },
  { id: 6, name: 'Hasan Raza', email: 'hasan@example.com', phone: '+44 7700 100006', orders: 4, joined: '2024-07-30' },
];

export default function AdminCustomers() {
  const [search, setSearch] = useState('');

  const filtered = CUSTOMERS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Customers">
      <div className="relative mb-6 max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full bg-[#1a1a1a] border border-[#2e2e2e] rounded px-4 py-2.5 text-[#f5f0e8] placeholder:text-[#555] text-sm focus:border-[#c9b89a] outline-none pr-10 transition-colors"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
      </div>

      <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#2e2e2e]">
              <tr>
                {['Name', 'Email', 'Phone', 'Orders', 'Joined'].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[#555] font-medium text-xs tracking-widest uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2e2e2e]">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-[#2e2e2e]/30 transition-colors">
                  <td className="px-5 py-4 text-[#f5f0e8] font-medium">{c.name}</td>
                  <td className="px-5 py-4 text-[#888]">{c.email}</td>
                  <td className="px-5 py-4 text-[#888]">{c.phone}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs bg-[#c9b89a]/10 text-[#c9b89a] border border-[#c9b89a]/20">
                      {c.orders} orders
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[#888]">{formatDate(c.joined)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-[#555]">No customers found</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
