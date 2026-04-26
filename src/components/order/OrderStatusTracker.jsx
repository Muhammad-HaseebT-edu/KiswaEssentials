import { CheckCircle, Circle, Package, Truck, MapPin, ShoppingBag } from 'lucide-react';

const STEPS = [
  { key: 'PENDING', label: 'Confirmed', icon: ShoppingBag },
  { key: 'SHIPPED', label: 'Shipped', icon: Package },
  { key: 'ON_THE_WAY', label: 'On The Way', icon: Truck },
  { key: 'DELIVERED', label: 'Delivered', icon: MapPin },
];

const STATUS_INDEX = {
  PENDING: 0,
  PAID: 0,
  SHIPPED: 1,
  ON_THE_WAY: 2,
  DELIVERED: 3,
};

export default function OrderStatusTracker({ currentStatus }) {
  const currentIndex = STATUS_INDEX[currentStatus] ?? 0;

  return (
    <div className="w-full py-6">
      <div className="relative flex items-start justify-between">
        {/* Connecting lines */}
        <div className="absolute top-5 left-0 right-0 h-px bg-[#2e2e2e] z-0" />
        <div
          className="absolute top-5 left-0 h-px bg-[#c9b89a] z-0 transition-all duration-700"
          style={{ width: `${(currentIndex / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const done = i < currentIndex;
          const active = i === currentIndex;

          return (
            <div key={step.key} className="flex flex-col items-center gap-2 z-10 flex-1">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500
                  ${done
                    ? 'bg-[#c9b89a] border-[#c9b89a]'
                    : active
                    ? 'bg-[#1a1a1a] border-[#c9b89a] shadow-lg shadow-[#c9b89a]/20'
                    : 'bg-[#1a1a1a] border-[#2e2e2e]'
                  }
                  ${active ? 'animate-pulse' : ''}
                `}
              >
                {done ? (
                  <CheckCircle className="w-5 h-5 text-[#0f0f0f]" />
                ) : (
                  <Icon className={`w-4 h-4 ${active ? 'text-[#c9b89a]' : 'text-[#555]'}`} />
                )}
              </div>
              <span
                className={`text-xs text-center leading-tight max-w-16 ${
                  done || active ? 'text-[#c9b89a]' : 'text-[#555]'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
