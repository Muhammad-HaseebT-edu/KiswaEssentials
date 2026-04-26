import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  LayoutDashboard, Package, ShoppingBag, Users, Tag, Menu, X, LogOut, ChevronRight,
} from 'lucide-react';
import { logout } from '../../store/slices/authSlice';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/categories', label: 'Categories', icon: Tag },
];

export default function AdminLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const isActive = (to, exact) => {
    if (exact) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5 border-b border-[#2e2e2e]">
        <Link to="/" className="text-[#c9b89a] font-medium tracking-[0.15em] uppercase text-sm">
          Kiswa Essentials
        </Link>
        <p className="text-[#555] text-xs mt-1">Admin Panel</p>
      </div>
      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV.map(({ to, label, icon: Icon, exact }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-5 py-3 text-sm transition-all ${
              isActive(to, exact)
                ? 'bg-[#c9b89a]/10 text-[#c9b89a] border-r-2 border-[#c9b89a]'
                : 'text-[#888888] hover:text-[#f5f0e8] hover:bg-[#2e2e2e]'
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-[#2e2e2e] p-4">
        <div className="flex items-center gap-3 mb-3 px-1">
          <div className="w-8 h-8 rounded-full bg-[#c9b89a]/20 border border-[#c9b89a]/30 flex items-center justify-center text-xs text-[#c9b89a] font-medium uppercase">
            {user?.name?.[0] || 'A'}
          </div>
          <div className="min-w-0">
            <p className="text-[#f5f0e8] text-xs font-medium truncate">{user?.name || 'Admin'}</p>
            <p className="text-[#555] text-xs truncate">{user?.role || 'ADMIN'}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-[#2e2e2e] rounded transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-56 bg-[#0a0a0a] border-r border-[#2e2e2e] flex-col shrink-0 fixed h-screen z-20">
        <Sidebar />
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-56 bg-[#0a0a0a] border-r border-[#2e2e2e] flex flex-col">
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-[#0a0a0a] border-b border-[#2e2e2e] h-14 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#888] hover:text-[#f5f0e8] transition-colors p-1"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs text-[#555]">
              <Link to="/admin" className="hover:text-[#888] transition-colors">Admin</Link>
              {title !== 'Dashboard' && (
                <>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-[#888]">{title}</span>
                </>
              )}
            </div>
          </div>
          <Link to="/" className="text-xs text-[#888] hover:text-[#c9b89a] transition-colors">
            View Store
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-8">
          <h1 className="text-xl font-medium text-[#f5f0e8] tracking-tight mb-6">{title}</h1>
          {children}
        </main>
      </div>
    </div>
  );
}
