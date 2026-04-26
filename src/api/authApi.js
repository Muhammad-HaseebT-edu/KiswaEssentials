import api from './axios';

export const login = (email, password) =>
  api.post('/api/auth/login', { email, password });

export const register = (name, email, password) =>
  api.post('/api/auth/register', { name, email, password });

export const getProfile = () =>
  api.get('/api/auth/profile');

export const updateProfile = (data) =>
  api.put('/api/auth/profile', data);
