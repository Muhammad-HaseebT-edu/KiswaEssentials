export const WHATSAPP_NUMBER = '447700000000';

export const ORDER_STATUSES = {
  PENDING: { label: 'Pending', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
  PAID: { label: 'Paid', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
  SHIPPED: { label: 'Shipped', color: 'text-[#c9b89a] bg-[#c9b89a]/10 border-[#c9b89a]/20' },
  DELIVERED: { label: 'Delivered', color: 'text-green-400 bg-green-400/10 border-green-400/20' },
  CANCELLED: { label: 'Cancelled', color: 'text-red-400 bg-red-400/10 border-red-400/20' },
};

export const CATEGORIES = [
  'Kurtas',
  'Shalwar Kameez',
  'Shawls',
  'Perfumes',
  'Accessories',
];

export const FREE_SHIPPING_THRESHOLD = 75;

export const DEMO_PRODUCTS = [
  {
    id: 1,
    name: 'Royal Embroidered Kurta',
    price: 89.99,
    category: 'Kurtas',
    image: 'https://images.pexels.com/photos/8839888/pexels-photo-8839888.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 12,
    isActive: true,
  },
  {
    id: 2,
    name: 'Classic Shalwar Kameez Set',
    price: 129.99,
    category: 'Shalwar Kameez',
    image: 'https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 8,
    isActive: true,
  },
  {
    id: 3,
    name: 'Kashmiri Pashmina Shawl',
    price: 74.99,
    category: 'Shawls',
    image: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 5,
    isActive: true,
  },
  {
    id: 4,
    name: 'Oud Al Malaki Perfume',
    price: 59.99,
    category: 'Perfumes',
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 20,
    isActive: true,
  },
  {
    id: 5,
    name: 'Silk Embroidered Kurta',
    price: 109.99,
    category: 'Kurtas',
    image: 'https://images.pexels.com/photos/8839885/pexels-photo-8839885.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 6,
    isActive: true,
  },
  {
    id: 6,
    name: 'Formal Sherwani Set',
    price: 249.99,
    category: 'Shalwar Kameez',
    image: 'https://images.pexels.com/photos/5698852/pexels-photo-5698852.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 3,
    isActive: true,
  },
  {
    id: 7,
    name: 'Rose Oud Attar',
    price: 44.99,
    category: 'Perfumes',
    image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 15,
    isActive: true,
  },
  {
    id: 8,
    name: 'Heritage Block Print Shawl',
    price: 64.99,
    category: 'Shawls',
    image: 'https://images.pexels.com/photos/6311391/pexels-photo-6311391.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 9,
    isActive: true,
  },
];
