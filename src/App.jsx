import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './components/layout/Layout';

// Auth pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Customer pages
import HomePage from './pages/customer/HomePage';
import ProductsPage from './pages/customer/ProductsPage';
import ProductDetailPage from './pages/customer/ProductDetailPage';
import CartPage from './pages/customer/CartPage';
import CheckoutPage from './pages/customer/CheckoutPage';
import OrderConfirmPage from './pages/customer/OrderConfirmPage';
import OrdersPage from './pages/customer/OrdersPage';
import OrderDetailPage from './pages/customer/OrderDetailPage';
import ProfilePage from './pages/customer/ProfilePage';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminAddProduct from './pages/admin/AdminAddProduct';
import AdminEditProduct from './pages/admin/AdminEditProduct';
import AdminOrders from './pages/admin/AdminOrders';
import AdminOrderDetail from './pages/admin/AdminOrderDetail';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminCategories from './pages/admin/AdminCategories';
import StaffOrders from './pages/admin/StaffOrders';

function ProtectedRoute({ children }) {
  const { token } = useSelector((s) => s.auth);
  const location = useLocation();
  if (!token) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return children;
}

function AdminRoute({ children }) {
  const { user, token } = useSelector((s) => s.auth);
  if (!token) return <Navigate to="/login" replace />;
  if (user?.role !== 'ADMIN') return <Navigate to="/" replace />;
  return children;
}

function StaffRoute({ children }) {
  const { user, token } = useSelector((s) => s.auth);
  if (!token) return <Navigate to="/login" replace />;
  if (user?.role !== 'ADMIN' && user?.role !== 'STAFF') return <Navigate to="/" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes with Layout */}
      <Route element={<Layout><HomePage /></Layout>} path="/" />
      <Route element={<Layout><ProductsPage /></Layout>} path="/products" />
      <Route element={<Layout><ProductDetailPage /></Layout>} path="/products/:id" />
      <Route element={<Layout><CartPage /></Layout>} path="/cart" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<RegisterPage />} path="/register" />

      {/* Protected customer routes */}
      <Route path="/checkout" element={
        <ProtectedRoute><Layout><CheckoutPage /></Layout></ProtectedRoute>
      } />
      <Route path="/order-confirm" element={
        <ProtectedRoute><Layout><OrderConfirmPage /></Layout></ProtectedRoute>
      } />
      <Route path="/my-orders" element={
        <ProtectedRoute><Layout><OrdersPage /></Layout></ProtectedRoute>
      } />
      <Route path="/my-orders/:id" element={
        <ProtectedRoute><Layout><OrderDetailPage /></Layout></ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute><Layout><ProfilePage /></Layout></ProtectedRoute>
      } />

      {/* Admin routes (no Layout — uses AdminLayout internally) */}
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
      <Route path="/admin/products/add" element={<AdminRoute><AdminAddProduct /></AdminRoute>} />
      <Route path="/admin/products/:id" element={<AdminRoute><AdminEditProduct /></AdminRoute>} />
      <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
      <Route path="/admin/orders/:id" element={<AdminRoute><AdminOrderDetail /></AdminRoute>} />
      <Route path="/admin/customers" element={<AdminRoute><AdminCustomers /></AdminRoute>} />
      <Route path="/admin/categories" element={<AdminRoute><AdminCategories /></AdminRoute>} />

      {/* Staff routes */}
      <Route path="/staff/orders" element={<StaffRoute><StaffOrders /></StaffRoute>} />
      <Route path="/staff/orders/:id" element={<StaffRoute><AdminOrderDetail staffOnly /></StaffRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}
