import api from './axios';

export const getAll = (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') params.append(k, v);
  });
  return api.get(`/api/products?${params.toString()}`);
};

export const getOne = (id) => api.get(`/api/products/${id}`);

export const create = (data) => api.post('/api/products', data);

export const update = (id, data) => api.put(`/api/products/${id}`, data);

export const remove = (id) => api.delete(`/api/products/${id}`);
