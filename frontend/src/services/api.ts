import axios from 'axios';
import {
  Book,
  CreateOrderRequest,
  OrderResponse,
  DashboardStats,
  PageResponse,
  AdminUser,
  OrderStatus,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('bookstore_admin_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercept 401s for admin calls
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
      localStorage.removeItem('bookstore_admin_token');
      localStorage.removeItem('bookstore_admin_user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Books API
export const bookApi = {
  getActiveBooks: async (): Promise<Book[]> => {
    const res = await apiClient.get<Book[]>('/books');
    return res.data;
  },
  getBookById: async (id: number): Promise<Book> => {
    const res = await apiClient.get<Book>(`/books/${id}`);
    return res.data;
  },
};

// Orders API
export const orderApi = {
  createOrder: async (data: CreateOrderRequest): Promise<OrderResponse> => {
    const res = await apiClient.post<OrderResponse>('/orders', data);
    return res.data;
  },
  trackOrder: async (reference: string): Promise<OrderResponse> => {
    const res = await apiClient.get<OrderResponse>(`/orders/track/${reference}`);
    return res.data;
  },
};

// Auth API
export const authApi = {
  login: async (username: string, password: string): Promise<AdminUser> => {
    const res = await apiClient.post<AdminUser>('/auth/login', { username, password });
    localStorage.setItem('bookstore_admin_token', res.data.token);
    localStorage.setItem('bookstore_admin_user', JSON.stringify(res.data));
    return res.data;
  },
  getMe: async (): Promise<AdminUser> => {
    const res = await apiClient.get<AdminUser>('/auth/me');
    return res.data;
  },
  logout: () => {
    localStorage.removeItem('bookstore_admin_token');
    localStorage.removeItem('bookstore_admin_user');
  },
  getCurrentUser: (): AdminUser | null => {
    const userStr = localStorage.getItem('bookstore_admin_user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },
};

// Admin API
export const adminApi = {
  getDashboard: async (): Promise<DashboardStats> => {
    const res = await apiClient.get<DashboardStats>('/admin/dashboard');
    return res.data;
  },
  getOrders: async (params?: {
    search?: string;
    status?: OrderStatus;
    fromDate?: string;
    toDate?: string;
    page?: number;
    size?: number;
  }): Promise<PageResponse<OrderResponse>> => {
    const res = await apiClient.get<PageResponse<OrderResponse>>('/admin/orders', { params });
    return res.data;
  },
  getOrder: async (id: number): Promise<OrderResponse> => {
    const res = await apiClient.get<OrderResponse>(`/admin/orders/${id}`);
    return res.data;
  },
  updateOrderStatus: async (id: number, status: OrderStatus, notes?: string): Promise<OrderResponse> => {
    const res = await apiClient.patch<OrderResponse>(`/admin/orders/${id}/status`, { status, notes });
    return res.data;
  },
  getAllBooks: async (): Promise<Book[]> => {
    const res = await apiClient.get<Book[]>('/admin/books');
    return res.data;
  },
  getBook: async (id: number): Promise<Book> => {
    const res = await apiClient.get<Book>(`/admin/books/${id}`);
    return res.data;
  },
  updateBook: async (id: number, data: Partial<Book>): Promise<Book> => {
    const res = await apiClient.put<Book>(`/admin/books/${id}`, data);
    return res.data;
  },
};
