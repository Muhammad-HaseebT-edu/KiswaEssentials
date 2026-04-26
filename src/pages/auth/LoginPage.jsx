import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { setUser, setToken, setError } from '../../store/slices/authSlice';
import { showNotification } from '../../store/slices/uiSlice';
import { login } from '../../api/authApi';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const from = location.state?.from || '/';

  const { register, handleSubmit, formState: { errors }, setError: setFormError } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await login(data.email, data.password);
      dispatch(setToken(res.data.token));
      dispatch(setUser(res.data.user));
      dispatch(showNotification({ type: 'success', message: 'Welcome back!' }));
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid email or password';
      setFormError('root', { message: msg });
      dispatch(setError(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="text-[#c9b89a] font-medium tracking-[0.2em] text-2xl uppercase">
            Kiswa Essentials
          </Link>
          <p className="text-[#888888] text-sm mt-2">Sign in to your account</p>
        </div>

        <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
              })}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#888888] tracking-wide">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`w-full bg-[#0f0f0f] border rounded px-4 py-2.5 text-[#f5f0e8] placeholder:text-[#555] text-sm transition-all outline-none pr-11 ${
                    errors.password ? 'border-[#ef4444]' : 'border-[#2e2e2e] focus:border-[#c9b89a]'
                  }`}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Password must be at least 8 characters' },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#888] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-[#ef4444]">{errors.password.message}</p>}
            </div>

            {errors.root && (
              <div className="bg-red-400/10 border border-red-400/20 rounded px-4 py-3">
                <p className="text-red-400 text-sm">{errors.root.message}</p>
              </div>
            )}

            <div className="flex justify-end">
              <a href="#" className="text-xs text-[#888888] hover:text-[#c9b89a] transition-colors">
                Forgot password?
              </a>
            </div>

            <Button type="submit" loading={loading} className="w-full justify-center">
              <Lock className="w-4 h-4" />
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#2e2e2e] text-center">
            <p className="text-[#888888] text-sm">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-[#c9b89a] hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
