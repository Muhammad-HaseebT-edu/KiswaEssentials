import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Upload, X, ImagePlus } from 'lucide-react';
import { CATEGORIES } from '../../utils/constants';
import AdminLayout from './AdminLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function AdminAddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [isActive, setIsActive] = useState(true);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { category: CATEGORIES[0] },
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

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    navigate('/admin/products');
  };

  return (
    <AdminLayout title="Add Product">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
        <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-6 space-y-5">
          <h3 className="text-[#f5f0e8] font-medium">Basic Information</h3>

          <Input
            label="Product Name"
            placeholder="e.g. Royal Embroidered Kurta"
            error={errors.name?.message}
            {...register('name', { required: 'Product name is required' })}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#888888]">Description</label>
            <textarea
              rows={4}
              placeholder="Describe the product..."
              className={`w-full bg-[#0f0f0f] border rounded px-4 py-2.5 text-[#f5f0e8] placeholder:text-[#555] text-sm transition-all outline-none resize-none ${
                errors.description ? 'border-[#ef4444]' : 'border-[#2e2e2e] focus:border-[#c9b89a]'
              }`}
              {...register('description', { required: 'Description is required' })}
            />
            {errors.description && <p className="text-xs text-[#ef4444]">{errors.description.message}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Price (£)"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              error={errors.price?.message}
              {...register('price', { required: 'Price is required', min: { value: 0, message: 'Price must be positive' } })}
            />
            <Input
              label="Stock Quantity"
              type="number"
              min="0"
              placeholder="0"
              error={errors.stock?.message}
              {...register('stock', { required: 'Stock is required', min: { value: 0, message: 'Stock must be positive' } })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#888888]">Category</label>
            <select
              className="bg-[#0f0f0f] border border-[#2e2e2e] rounded px-4 py-2.5 text-[#f5f0e8] text-sm focus:border-[#c9b89a] outline-none"
              {...register('category', { required: true })}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-[#f5f0e8] font-medium">Active Listing</p>
              <p className="text-xs text-[#888888] mt-0.5">Product will be visible in the store</p>
            </div>
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${isActive ? 'bg-[#c9b89a]' : 'bg-[#2e2e2e]'}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${isActive ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>

        {/* Images */}
        <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-6 space-y-4">
          <h3 className="text-[#f5f0e8] font-medium">Product Images</h3>

          <label className="flex flex-col items-center gap-3 border-2 border-dashed border-[#2e2e2e] rounded-lg p-8 cursor-pointer hover:border-[#c9b89a]/50 transition-colors">
            <ImagePlus className="w-8 h-8 text-[#555]" />
            <div className="text-center">
              <p className="text-sm text-[#888888]">Click to upload images</p>
              <p className="text-xs text-[#555] mt-1">PNG, JPG, WEBP up to 5MB each</p>
            </div>
            <input type="file" multiple accept="image/*" className="sr-only" onChange={handleImageChange} />
          </label>

          {images.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded overflow-hidden border border-[#2e2e2e] group">
                  <img src={img.src} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-[#0f0f0f]/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button type="submit" loading={loading} size="lg" className="gap-2">
            <Upload className="w-4 h-4" />
            Save Product
          </Button>
          <Button type="button" variant="secondary" size="lg" onClick={() => navigate('/admin/products')}>
            Cancel
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}
