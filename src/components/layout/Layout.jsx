import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from '../cart/CartDrawer';
import WhatsAppButton from '../ui/WhatsAppButton';
import Notification from '../ui/Notification';

export default function Layout({ children }) {
  const { notification } = useSelector((s) => s.ui);

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
      {notification && <Notification />}
    </div>
  );
}
