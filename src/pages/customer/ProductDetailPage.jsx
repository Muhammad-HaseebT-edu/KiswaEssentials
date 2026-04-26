import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Zap, MessageCircle, ChevronDown, ArrowLeft } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItem, openCart } from '../../store/slices/cartSlice';
import { showNotification } from '../../store/slices/uiSlice';
import { DEMO_PRODUCTS, WHATSAPP_NUMBER } from '../../utils/constants';
import { formatPrice } from '../../utils/formatPrice';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import ProductGrid from '../../components/product/ProductGrid';

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [accordion, setAccordion] = useState(null);

  const product = DEMO_PRODUCTS.find((p) => String(p.id) === id) || DEMO_PRODUCTS[0];
  const related = DEMO_PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const images = [product.image, product.image, product.image, product.image];

  const stockStatus = product.stock === 0
    ? { label: 'Out of Stock', variant: 'error' }
    : product.stock <= 3
    ? { label: `Low Stock — only ${product.stock} left`, variant: 'warning' }
    : { label: 'In Stock', variant: 'success' };

  const handleAddToCart = () => {
    dispatch(addItem({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: qty }));
    dispatch(openCart());
    dispatch(showNotification({ type: 'success', message: `${product.name} added to cart` }));
  };

  const handleBuyNow = () => {
    dispatch(addItem({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: qty }));
    window.location.href = '/checkout';
  };

  const toggleAccordion = (key) => setAccordion((a) => (a === key ? null : key));

  return (
    <div className="min-h-screen bg-[#0f0f0f] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-[#888888] hover:text-[#c9b89a] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div className="space-y-3">
            <div className="aspect-square rounded-lg overflow-hidden bg-[#1a1a1a] border border-[#2e2e2e]">
              <img
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square rounded overflow-hidden border-2 transition-all ${
                    activeImage === i ? 'border-[#c9b89a]' : 'border-[#2e2e2e] hover:border-[#555]'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <Badge>{product.category}</Badge>
              <h1 className="text-3xl font-medium text-[#f5f0e8] mt-3 tracking-tight leading-tight">
                {product.name}
              </h1>
              <p className="text-3xl text-[#c9b89a] font-medium mt-3">{formatPrice(product.price)}</p>
            </div>

            <p className="text-[#888888] leading-relaxed">
              This exquisite piece is crafted from premium quality fabric, carefully selected for its texture, durability, and authentic feel. Perfect for special occasions or everyday elegance.
            </p>

            <div className="flex items-center gap-2">
              <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#888888]">Quantity</span>
              <div className="flex items-center border border-[#2e2e2e] rounded overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#888] hover:text-[#f5f0e8] hover:bg-[#1a1a1a] transition-all"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-[#f5f0e8] text-sm font-medium">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#888] hover:text-[#f5f0e8] hover:bg-[#1a1a1a] transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                size="lg"
                className="w-full justify-center"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </Button>
              <Button
                onClick={handleBuyNow}
                variant="outline"
                disabled={product.stock === 0}
                size="lg"
                className="w-full justify-center"
              >
                <Zap className="w-5 h-5" />
                Buy Now
              </Button>
            </div>

            <div className="border-t border-[#2e2e2e] pt-5">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I'm interested in ${product.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#888888] hover:text-[#c9b89a] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                Enquire via WhatsApp
              </a>
            </div>

            {/* Accordions */}
            {[
              { key: 'shipping', title: 'Shipping Information', content: 'Free standard shipping on all UK orders over £75. Standard delivery 3-5 business days. Express delivery 1-2 business days (additional charge). International shipping available.' },
              { key: 'returns', title: 'Returns & Exchanges', content: 'We offer a 30-day return policy on all unworn, unwashed items with original tags attached. To initiate a return, contact our team via WhatsApp or email. Exchange processing takes 3-5 business days.' },
              { key: 'care', title: 'Care Instructions', content: 'Hand wash or dry clean recommended. Do not tumble dry. Iron on low heat from reverse side. Store in a cool, dry place. Avoid direct sunlight for prolonged periods.' },
            ].map(({ key, title, content }) => (
              <div key={key} className="border-t border-[#2e2e2e]">
                <button
                  onClick={() => toggleAccordion(key)}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span className="text-sm text-[#f5f0e8] font-medium">{title}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#888] transition-transform ${accordion === key ? 'rotate-180' : ''}`}
                  />
                </button>
                {accordion === key && (
                  <p className="text-[#888888] text-sm leading-relaxed pb-4">{content}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#2e2e2e]">
            <h2 className="text-2xl font-medium text-[#f5f0e8] tracking-tight mb-8">You May Also Like</h2>
            <ProductGrid products={related} cols={4} />
          </div>
        )}
      </div>
    </div>
  );
}
