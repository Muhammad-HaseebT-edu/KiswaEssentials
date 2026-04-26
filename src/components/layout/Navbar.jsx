import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Search, ShoppingBag, User, Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { toggleCart } from '../../store/slices/cartSlice';
import { toggleMenu, closeMenu } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';
import { selectCartCount } from '../../store/slices/cartSlice';

const navLinks = [
  { label: 'Shop', href: '/products' },
  { label: 'Collections', href: '/products' },
  { label: 'About', href: '/#about' },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((s) => s.auth);
  const cartCount = useSelector(selectCartCount);
  const { isMenuOpen } = useSelector((s) => s.ui);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    dispatch(closeMenu());
    setProfileOpen(false);
  }, [location.pathname, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-[#0f0f0f]/95 backdrop-blur-md border-b border-[#2e2e2e]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="text-[#c9b89a] font-medium tracking-[0.2em] text-lg lg:text-xl uppercase"
            >
              Kiswa Essentials
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-[#f5f0e8] hover:text-[#c9b89a] text-sm tracking-widest uppercase transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-[#f5f0e8] hover:text-[#c9b89a] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart */}
              <button
                onClick={() => dispatch(toggleCart())}
                className="p-2 text-[#f5f0e8] hover:text-[#c9b89a] transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#c9b89a] text-[#0f0f0f] text-xs rounded-full flex items-center justify-center font-medium">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              {/* User */}
              {user ? (
                <div className="relative hidden lg:block">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-1.5 p-2 text-[#f5f0e8] hover:text-[#c9b89a] transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-[#1a1a1a] border border-[#2e2e2e] rounded shadow-xl">
                      <div className="px-4 py-3 border-b border-[#2e2e2e]">
                        <p className="text-xs text-[#888888]">Signed in as</p>
                        <p className="text-sm text-[#f5f0e8] truncate">{user.email}</p>
                      </div>
                      <Link to="/profile" className="block px-4 py-2.5 text-sm text-[#f5f0e8] hover:bg-[#2e2e2e] transition-colors">
                        My Profile
                      </Link>
                      <Link to="/my-orders" className="block px-4 py-2.5 text-sm text-[#f5f0e8] hover:bg-[#2e2e2e] transition-colors">
                        My Orders
                      </Link>
                      {(user.role === 'ADMIN' || user.role === 'STAFF') && (
                        <Link to={user.role === 'ADMIN' ? '/admin' : '/staff/orders'} className="block px-4 py-2.5 text-sm text-[#c9b89a] hover:bg-[#2e2e2e] transition-colors">
                          {user.role === 'ADMIN' ? 'Admin Panel' : 'Staff Panel'}
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-[#2e2e2e] transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden lg:flex items-center gap-1.5 px-4 py-2 border border-[#c9b89a] text-[#c9b89a] text-sm rounded hover:bg-[#c9b89a]/10 transition-all duration-300 tracking-wide"
                >
                  Login
                </Link>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => dispatch(toggleMenu())}
                className="lg:hidden p-2 text-[#f5f0e8] hover:text-[#c9b89a] transition-colors"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  autoFocus
                  className="w-full bg-[#1a1a1a] border border-[#2e2e2e] rounded px-4 py-3 text-[#f5f0e8] placeholder:text-[#555] text-sm focus:border-[#c9b89a] outline-none pr-12 transition-colors"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888]">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => dispatch(closeMenu())} />
          <div className="absolute top-0 left-0 right-0 bg-[#0f0f0f] border-b border-[#2e2e2e] pt-20 pb-6 px-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="block py-3 text-[#f5f0e8] hover:text-[#c9b89a] text-base tracking-widest uppercase border-b border-[#1a1a1a] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/profile" className="block py-3 text-[#f5f0e8] text-base tracking-widest uppercase border-b border-[#1a1a1a]">Profile</Link>
                <Link to="/my-orders" className="block py-3 text-[#f5f0e8] text-base tracking-widest uppercase border-b border-[#1a1a1a]">My Orders</Link>
                <button onClick={handleLogout} className="block py-3 text-red-400 text-base tracking-widest uppercase">Logout</button>
              </>
            ) : (
              <Link to="/login" className="block py-3 text-[#c9b89a] text-base tracking-widest uppercase">Login</Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
