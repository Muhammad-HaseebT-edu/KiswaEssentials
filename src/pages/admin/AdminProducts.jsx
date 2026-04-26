import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Pencil, Trash2, Eye } from 'lucide-react';
import { DEMO_PRODUCTS } from '../../utils/constants';
import { formatPrice } from '../../utils/formatPrice';
import AdminLayout from './AdminLayout';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';

export default function AdminProducts() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState(DEMO_PRODUCTS);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = () => {
    setProducts((ps) => ps.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <AdminLayout title="Products">
      {/* Actions bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-[#1a1a1a] border border-[#2e2e2e] rounded px-4 py-2.5 text-[#f5f0e8] placeholder:text-[#555] text-sm focus:border-[#c9b89a] outline-none pr-10 transition-colors"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
        </div>
        <Link to="/admin/products/add">
          <Button>
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#2e2e2e]">
              <tr>
                {['Product', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[#555] font-medium text-xs tracking-widest uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2e2e2e]">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-[#2e2e2e]/30 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover" />
                      <span className="text-[#f5f0e8] font-medium line-clamp-1">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge>{p.category}</Badge>
                  </td>
                  <td className="px-5 py-4 text-[#c9b89a] font-medium">{formatPrice(p.price)}</td>
                  <td className="px-5 py-4 text-[#f5f0e8]">{p.stock}</td>
                  <td className="px-5 py-4">
                    <Badge variant={p.isActive ? 'success' : 'muted'}>
                      {p.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/products/${p.id}`}
                        className="p-1.5 text-[#555] hover:text-[#c9b89a] transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/admin/products/${p.id}`}
                        className="p-1.5 text-[#555] hover:text-[#c9b89a] transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="p-1.5 text-[#555] hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-[#555]">No products found</div>
          )}
        </div>
      </div>

      {/* Delete confirm modal */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Product">
        <p className="text-[#888888] mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
        <div className="flex gap-3">
          <Button variant="danger" onClick={handleDelete} className="flex-1 justify-center">Delete</Button>
          <Button variant="secondary" onClick={() => setDeleteId(null)} className="flex-1 justify-center">Cancel</Button>
        </div>
      </Modal>
    </AdminLayout>
  );
}
