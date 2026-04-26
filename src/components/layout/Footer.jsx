import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#2e2e2e] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-[#c9b89a] font-medium tracking-[0.2em] uppercase text-lg mb-4">
              Kiswa Essentials
            </h3>
            <p className="text-[#888888] text-sm leading-relaxed mb-6">
              Premium South Asian clothing and fragrances, crafted with heritage and delivered to the UK.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 border border-[#2e2e2e] rounded flex items-center justify-center text-[#888888] hover:text-[#c9b89a] hover:border-[#c9b89a] transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[#f5f0e8] text-sm font-medium tracking-widest uppercase mb-5">Shop</h4>
            <ul className="space-y-3">
              {['Kurtas', 'Shalwar Kameez', 'Shawls', 'Perfumes', 'New Arrivals'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/products?category=${encodeURIComponent(item)}`}
                    className="text-[#888888] hover:text-[#c9b89a] text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-[#f5f0e8] text-sm font-medium tracking-widest uppercase mb-5">Help</h4>
            <ul className="space-y-3">
              {[
                { label: 'My Orders', href: '/my-orders' },
                { label: 'Track Order', href: '/my-orders' },
                { label: 'Returns & Exchanges', href: '#' },
                { label: 'Size Guide', href: '#' },
                { label: 'FAQ', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-[#888888] hover:text-[#c9b89a] text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#f5f0e8] text-sm font-medium tracking-widest uppercase mb-5">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-[#888888] text-sm">
                <MapPin className="w-4 h-4 text-[#c9b89a] mt-0.5 shrink-0" />
                London, United Kingdom
              </li>
              <li className="flex items-center gap-3 text-[#888888] text-sm">
                <Phone className="w-4 h-4 text-[#c9b89a] shrink-0" />
                +44 7700 000000
              </li>
              <li className="flex items-center gap-3 text-[#888888] text-sm">
                <Mail className="w-4 h-4 text-[#c9b89a] shrink-0" />
                hello@kiswaessentials.co.uk
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#2e2e2e] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#888888] text-xs">
            © {new Date().getFullYear()} Kiswa Essentials. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms & Conditions', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="text-[#888888] hover:text-[#c9b89a] text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
