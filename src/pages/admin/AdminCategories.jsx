import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Pencil, Trash2, Tag } from 'lucide-react';
import AdminLayout from './AdminLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';

const INITIAL_CATS = [
  { id: 1, name: 'Kurtas', productCount: 24 },
  { id: 2, name: 'Shalwar Kameez', productCount: 18 },
  { id: 3, name: 'Shawls', productCount: 12 },
  { id: 4, name: 'Perfumes', productCount: 16 },
  { id: 5, name: 'Accessories', productCount: 8 },
];

export default function AdminCategories() {
  const [categories, setCategories] = useState(INITIAL_CATS);
  const [deleteId, setDeleteId] = useState(null);
  const [editCat, setEditCat] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onAdd = (data) => {
    setCategories((prev) => [...prev, { id: Date.now(), name: data.name, productCount: 0 }]);
    reset();
  };

  const handleDelete = () => {
    setCategories((c) => c.filter((cat) => cat.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <AdminLayout title="Categories">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* List */}
        <div>
          <h3 className="text-[#f5f0e8] font-medium mb-4">All Categories</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg px-4 py-3.5 flex items-center gap-3 hover:border-[#c9b89a]/20 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-[#c9b89a]/10 flex items-center justify-center shrink-0">
                  <Tag className="w-4 h-4 text-[#c9b89a]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#f5f0e8] font-medium text-sm">{cat.name}</p>
                  <p className="text-[#555] text-xs mt-0.5">{cat.productCount} products</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditCat(cat)}
                    className="p-1.5 text-[#555] hover:text-[#c9b89a] transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(cat.id)}
                    className="p-1.5 text-[#555] hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add form */}
        <div>
          <h3 className="text-[#f5f0e8] font-medium mb-4">Add New Category</h3>
          <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-5 space-y-4">
            <form onSubmit={handleSubmit(onAdd)} className="space-y-4">
              <Input
                label="Category Name"
                placeholder="e.g. Dupattas"
                error={errors.name?.message}
                {...register('name', { required: 'Category name is required' })}
              />
              <Button type="submit" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Category
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Delete modal */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Category">
        <p className="text-[#888] mb-6">This will permanently delete the category. Products in this category will not be deleted.</p>
        <div className="flex gap-3">
          <Button variant="danger" onClick={handleDelete} className="flex-1 justify-center">Delete</Button>
          <Button variant="secondary" onClick={() => setDeleteId(null)} className="flex-1 justify-center">Cancel</Button>
        </div>
      </Modal>

      {/* Edit modal */}
      <Modal isOpen={!!editCat} onClose={() => setEditCat(null)} title="Edit Category">
        <div className="space-y-4">
          <input
            value={editCat?.name || ''}
            onChange={(e) => setEditCat((c) => ({ ...c, name: e.target.value }))}
            className="w-full bg-[#0f0f0f] border border-[#2e2e2e] rounded px-4 py-2.5 text-[#f5f0e8] text-sm focus:border-[#c9b89a] outline-none"
          />
          <div className="flex gap-3">
            <Button
              onClick={() => {
                setCategories((cs) => cs.map((c) => c.id === editCat.id ? editCat : c));
                setEditCat(null);
              }}
              className="flex-1 justify-center"
            >
              Save
            </Button>
            <Button variant="secondary" onClick={() => setEditCat(null)} className="flex-1 justify-center">Cancel</Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
