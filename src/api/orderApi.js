import api from './axios';

export const create = (data) => api.post('/api/orders', data);

export const getMyOrders = () => api.get('/api/orders/my');

export const getOne = (id) => api.get(`/api/orders/${id}`);

export const getAll = (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') params.append(k, v);
  });
  return api.get(`/api/orders?${params.toString()}`);
};

export const updateStatus = (id, data) => api.put(`/api/orders/${id}/status`, data);
