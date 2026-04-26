import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { User, Package, Settings, LogOut, Save } from 'lucide-react';
import { logout } from '../../store/slices/authSlice';
import { showNotification } from '../../store/slices/uiSlice';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const TABS = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'orders', label: 'Orders', icon: Package },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export default function ProfilePage() {
  const [tab, setTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { name: user?.name || '', email: user?.email || '', phone: user?.phone || '' },
  });

  const onSave = async (data) => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    dispatch(showNotification({ type: 'success', message: 'Profile updated successfully' }));
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-full bg-[#c9b89a]/10 border-2 border-[#c9b89a]/30 flex items-center justify-center">
            <User className="w-8 h-8 text-[#c9b89a]" />
          </div>
          <div>
            <h1 className="text-2xl font-medium text-[#f5f0e8] tracking-tight">{user?.name || 'My Account'}</h1>
            <p className="text-[#888888] text-sm">{user?.email}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <nav className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg overflow-hidden">
              {TABS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm text-left transition-all border-b border-[#2e2e2e] last:border-0 ${
                    tab === key ? 'bg-[#c9b89a]/10 text-[#c9b89a]' : 'text-[#888888] hover:text-[#f5f0e8] hover:bg-[#2e2e2e]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                </button>
              ))}
              <button
                onClick={() => dispatch(logout())}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-left text-red-400 hover:bg-[#2e2e2e] transition-all"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {tab === 'profile' && (
              <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-6">
                <h2 className="text-[#f5f0e8] font-medium text-lg mb-6">Personal Information</h2>
                <form onSubmit={handleSubmit(onSave)} className="space-y-5">
                  <Input label="Full Name" error={errors.name?.message}
                    {...register('name', { required: 'Name is required' })} />
                  <Input label="Email Address" type="email" error={errors.email?.message}
                    {...register('email', { required: 'Email is required' })} />
                  <Input label="Phone Number" type="tel"
                    {...register('phone')} />
                  <Button type="submit" loading={saving} className="gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </form>
              </div>
            )}

            {tab === 'orders' && (
              <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-6">
                <h2 className="text-[#f5f0e8] font-medium text-lg mb-4">Recent Orders</h2>
                <p className="text-[#888888] text-sm">
                  View your full order history on the{' '}
                  <a href="/my-orders" className="text-[#c9b89a] hover:underline">Orders page</a>.
                </p>
              </div>
            )}

            {tab === 'settings' && (
              <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-6 space-y-5">
                <h2 className="text-[#f5f0e8] font-medium text-lg mb-4">Account Settings</h2>
                <Input label="Current Password" type="password" placeholder="••••••••" />
                <Input label="New Password" type="password" placeholder="••••••••" />
                <Input label="Confirm New Password" type="password" placeholder="••••••••" />
                <Button>Update Password</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
