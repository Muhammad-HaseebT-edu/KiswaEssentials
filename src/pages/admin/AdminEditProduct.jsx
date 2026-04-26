import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Save, ImagePlus, X } from 'lucide-react';
import { CATEGORIES, DEMO_PRODUCTS } from '../../utils/constants';
import AdminLayout from './AdminLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = DEMO_PRODUCTS.find((p) => String(p.id) === id) || DEMO_PRODUCTS[0];
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(product.isActive);
  const [images, setImages] = useState([{ src: product.image, name: 'current' }]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      description: 'Premium quality fabric with handcrafted embroidery.',
    },
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages((prev) => [...prev, { src: ev.target.result, name: file.name }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    navigate('/admin/products');
  };

  return (
    <AdminLayout title="Edit Product">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
        <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-6 space-y-5">
          <h3 className="text-[#f5f0e8] font-medium">Basic Information</h3>

          <Input label="Product Name" error={errors.name?.message}
            {...register('name', { required: 'Required' })} />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#888888]">Description</label>
            <textarea
              rows={4}
              className="w-full bg-[#0f0f0f] border border-[#2e2e2e] rounded px-4 py-2.5 text-[#f5f0e8] text-sm outline-none resize-none focus:border-[#c9b89a] transition-colors"
              {...register('description')}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Price (£)" type="number" step="0.01" error={errors.price?.message}
              {...register('price', { required: 'Required', min: 0 })} />
            <Input label="Stock Quantity" type="number" error={errors.stock?.message}
              {...register('stock', { required: 'Required', min: 0 })} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#888888]">Category</label>
            <select
              className="bg-[#0f0f0f] border border-[#2e2e2e] rounded px-4 py-2.5 text-[#f5f0e8] text-sm focus:border-[#c9b89a] outline-none"
              {...register('category')}
            >
              {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-[#f5f0e8] font-medium">Active Listing</p>
              <p className="text-xs text-[#888888] mt-0.5">Product visible in store</p>
            </div>
            <button type="button" onClick={() => setIsActive(!isActive)}
              className={`relative w-10 h-5 rounded-full transition-colors ${isActive ? 'bg-[#c9b89a]' : 'bg-[#2e2e2e]'}`}>
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${isActive ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-6 space-y-4">
          <h3 className="text-[#f5f0e8] font-medium">Product Images</h3>
          <div className="grid grid-cols-4 gap-3">
            {images.map((img, i) => (
              <div key={i} className="relative aspect-square rounded overflow-hidden border border-[#2e2e2e] group">
                <img src={img.src} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => setImages((p) => p.filter((_, j) => j !== i))}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
            <label className="aspect-square border-2 border-dashed border-[#2e2e2e] rounded flex flex-col items-center justify-center cursor-pointer hover:border-[#c9b89a]/50 transition-colors">
              <ImagePlus className="w-5 h-5 text-[#555]" />
              <input type="file" multiple accept="image/*" className="sr-only" onChange={handleImageChange} />
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" loading={loading} size="lg">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
          <Button type="button" variant="secondary" size="lg" onClick={() => navigate('/admin/products')}>
            Cancel
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}
