import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import { hideNotification } from '../../store/slices/uiSlice';

const icons = {
  success: <CheckCircle className="w-5 h-5 text-green-400" />,
  error: <XCircle className="w-5 h-5 text-red-400" />,
  warning: <AlertCircle className="w-5 h-5 text-yellow-400" />,
  info: <AlertCircle className="w-5 h-5 text-blue-400" />,
};

export default function Notification() {
  const dispatch = useDispatch();
  const { notification } = useSelector((s) => s.ui);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => dispatch(hideNotification()), 4000);
    return () => clearTimeout(timer);
  }, [notification, dispatch]);

  if (!notification) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm w-full">
      <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded shadow-2xl flex items-start gap-3 p-4">
        {icons[notification.type] || icons.info}
        <p className="text-[#f5f0e8] text-sm flex-1">{notification.message}</p>
        <button
          onClick={() => dispatch(hideNotification())}
          className="text-[#888888] hover:text-[#f5f0e8] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
