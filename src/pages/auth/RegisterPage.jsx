import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { setUser, setToken } from '../../store/slices/authSlice';
import { showNotification } from '../../store/slices/uiSlice';
import { register as registerApi } from '../../api/authApi';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, watch, formState: { errors }, setError } = useForm();
  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await registerApi(data.name, data.email, data.password);
      dispatch(setToken(res.data.token));
      dispatch(setUser(res.data.user));
      dispatch(showNotification({ type: 'success', message: 'Account created successfully!' }));
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      setError('root', { message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="text-[#c9b89a] font-medium tracking-[0.2em] text-2xl uppercase">
            Kiswa Essentials
          </Link>
          <p className="text-[#888888] text-sm mt-2">Create your account</p>
        </div>

        <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Full Name"
              placeholder="Your full name"
              error={errors.name?.message}
              {...register('name', { required: 'Full name is required', minLength: { value: 2, message: 'Name too short' } })}
            />

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
                  placeholder="At least 8 characters"
                  className={`w-full bg-[#0f0f0f] border rounded px-4 py-2.5 text-[#f5f0e8] placeholder:text-[#555] text-sm outline-none pr-11 transition-all ${
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

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-[#888888] tracking-wide">Confirm Password</label>
              <input
                type="password"
                placeholder="Repeat your password"
                className={`w-full bg-[#0f0f0f] border rounded px-4 py-2.5 text-[#f5f0e8] placeholder:text-[#555] text-sm outline-none transition-all ${
                  errors.confirmPassword ? 'border-[#ef4444]' : 'border-[#2e2e2e] focus:border-[#c9b89a]'
                }`}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (v) => v === password || 'Passwords do not match',
                })}
              />
              {errors.confirmPassword && <p className="text-xs text-[#ef4444]">{errors.confirmPassword.message}</p>}
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5 accent-[#c9b89a] cursor-pointer"
                {...register('terms', { required: 'You must agree to continue' })}
              />
              <span className="text-xs text-[#888888]">
                I agree to the{' '}
                <a href="#" className="text-[#c9b89a] hover:underline">Terms & Conditions</a>
                {' '}and{' '}
                <a href="#" className="text-[#c9b89a] hover:underline">Privacy Policy</a>
              </span>
            </label>
            {errors.terms && <p className="text-xs text-[#ef4444] -mt-3">{errors.terms.message}</p>}

            {errors.root && (
              <div className="bg-red-400/10 border border-red-400/20 rounded px-4 py-3">
                <p className="text-red-400 text-sm">{errors.root.message}</p>
              </div>
            )}

            <Button type="submit" loading={loading} className="w-full justify-center">
              <UserPlus className="w-4 h-4" />
              Create Account
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#2e2e2e] text-center">
            <p className="text-[#888888] text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-[#c9b89a] hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
