import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, RefreshCw, Shield, Star, MessageCircle } from 'lucide-react';
import ProductGrid from '../../components/product/ProductGrid';
import { DEMO_PRODUCTS, WHATSAPP_NUMBER } from '../../utils/constants';

const CATEGORY_CARDS = [
  {
    name: 'Kurtas',
    image: 'https://images.pexels.com/photos/8839888/pexels-photo-8839888.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: '24 styles',
  },
  {
    name: 'Shalwar Kameez',
    image: 'https://images.pexels.com/photos/5698852/pexels-photo-5698852.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: '18 styles',
  },
  {
    name: 'Shawls',
    image: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: '12 styles',
  },
  {
    name: 'Perfumes',
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: '16 scents',
  },
];

const INSTA_IMAGES = [
  'https://images.pexels.com/photos/8839888/pexels-photo-8839888.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/5698852/pexels-photo-5698852.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/8839885/pexels-photo-8839885.jpeg?auto=compress&cs=tinysrgb&w=400',
];

export default function HomePage() {
  const [productsLoading] = useState(false);

  return (
    <div className="bg-[#0f0f0f]">
      {/* Announcement bar */}
      <div className="bg-[#c9b89a] text-[#0f0f0f] text-center py-2.5 text-xs font-medium tracking-widest uppercase">
        Free shipping on orders over £75 &nbsp;|&nbsp; Worldwide delivery
      </div>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f]/70 via-[#0f0f0f]/50 to-[#0f0f0f]" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <p className="text-[#c9b89a] text-xs tracking-[0.4em] uppercase mb-6">
            New Collection 2025
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-[#f5f0e8] leading-tight mb-6">
            Elegance Meets
            <span className="block text-[#c9b89a]">Heritage</span>
          </h1>
          <p className="text-[#888888] text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Premium South Asian fashion crafted with heritage and delivered to your door across the UK.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="px-8 py-4 bg-[#c9b89a] text-[#0f0f0f] font-medium rounded tracking-widest uppercase text-sm hover:bg-[#b8a489] transition-all duration-300 hover:-translate-y-0.5"
            >
              Shop Now
            </Link>
            <Link
              to="/products"
              className="px-8 py-4 border border-[#f5f0e8] text-[#f5f0e8] font-medium rounded tracking-widest uppercase text-sm hover:bg-white/5 transition-all duration-300 hover:-translate-y-0.5"
            >
              View Collections
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-[#c9b89a] to-transparent" />
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-12 border-y border-[#2e2e2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck, label: 'Free UK Shipping', sub: 'On orders over £75' },
              { icon: RefreshCw, label: 'Easy Returns', sub: '30-day return policy' },
              { icon: Shield, label: 'Secure Payment', sub: 'SSL encrypted checkout' },
              { icon: Star, label: 'Premium Quality', sub: 'Handpicked fabrics' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c9b89a]/10 border border-[#c9b89a]/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#c9b89a]" />
                </div>
                <div>
                  <p className="text-[#f5f0e8] text-sm font-medium">{label}</p>
                  <p className="text-[#888888] text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#c9b89a] text-xs tracking-[0.4em] uppercase mb-3">Explore</p>
            <h2 className="text-3xl lg:text-4xl font-medium text-[#f5f0e8] tracking-tight">Our Collections</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORY_CARDS.map((cat) => (
              <Link
                key={cat.name}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="group relative overflow-hidden rounded aspect-[3/4] block"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-[#f5f0e8] font-medium text-lg leading-tight">{cat.name}</h3>
                  <p className="text-[#c9b89a] text-xs mt-1">{cat.count}</p>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#c9b89a] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-4 h-4 text-[#0f0f0f]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-[#c9b89a] text-xs tracking-[0.4em] uppercase mb-2">Latest</p>
              <h2 className="text-3xl lg:text-4xl font-medium text-[#f5f0e8] tracking-tight">New Arrivals</h2>
            </div>
            <Link
              to="/products"
              className="hidden sm:flex items-center gap-2 text-sm text-[#c9b89a] hover:gap-3 transition-all duration-300"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <ProductGrid products={DEMO_PRODUCTS} loading={productsLoading} />
          <div className="text-center mt-10 sm:hidden">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#c9b89a] text-[#c9b89a] text-sm rounded hover:bg-[#c9b89a]/10 transition-all"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-[#c9b89a] text-xs tracking-[0.4em] uppercase mb-4">Our Story</p>
              <h2 className="text-3xl lg:text-4xl font-medium text-[#f5f0e8] tracking-tight leading-tight mb-6">
                Crafted with Heritage,<br />
                <span className="text-[#c9b89a]">Worn with Pride</span>
              </h2>
              <p className="text-[#888888] leading-relaxed mb-5">
                Kiswa Essentials was born from a deep love for the rich textiles and fragrances of South Asia. We bring the finest handcrafted clothing and authentic perfumes to the South Asian diaspora across the UK.
              </p>
              <p className="text-[#888888] leading-relaxed mb-8">
                Each piece in our collection is carefully selected for its quality, authenticity, and the story it tells. We believe clothing is more than fabric — it's a connection to culture, heritage, and identity.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9b89a] text-[#0f0f0f] text-sm font-medium rounded hover:bg-[#b8a489] transition-all duration-300"
              >
                Discover Our Story <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/6311391/pexels-photo-6311391.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Heritage fabric"
                className="w-full rounded-lg object-cover h-96 lg:h-[500px]"
              />
              <div className="absolute -bottom-5 -left-5 bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-5 max-w-xs">
                <p className="text-[#c9b89a] text-2xl font-medium">2,400+</p>
                <p className="text-[#888888] text-sm mt-1">Happy customers across the UK</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram strip */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#888888] text-sm tracking-widest uppercase mb-2">Follow us</p>
            <a
              href="#"
              className="text-2xl font-medium text-[#f5f0e8] hover:text-[#c9b89a] transition-colors"
            >
              @kiswaessentials
            </a>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {INSTA_IMAGES.map((img, i) => (
              <a
                key={i}
                href="#"
                className="relative aspect-square overflow-hidden rounded group block"
              >
                <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-[#c9b89a]/0 group-hover:bg-[#c9b89a]/20 transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-20 border-t border-[#2e2e2e]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#25D366' }}>
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-medium text-[#f5f0e8] mb-3 tracking-tight">
            Need help finding the perfect piece?
          </h2>
          <p className="text-[#888888] mb-8">
            Chat with us on WhatsApp for personalised styling advice and custom orders.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-medium rounded tracking-wide text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#25D366' }}
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
