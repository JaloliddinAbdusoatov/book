export interface Book {
  id: number;
  title: string;
  subtitle?: string;
  authorName: string;
  description?: string;
  shortDescription?: string;
  price: number;
  stockQuantity: number;
  pages?: number;
  language?: string;
  publicationYear?: number;
  isbn?: string;
  publisher?: string;
  coverImageUrl?: string;
  authorBio?: string;
  authorImageUrl?: string;
  authorAchievements?: string;
  tableOfContents?: string;
  isActive: boolean;
  imageUrls: string[];
}

export interface OrderItemRequest {
  bookId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  customerName: string;
  phoneNumber: string;
  deliveryAddress: string;
  notes?: string;
  items: OrderItemRequest[];
}

export interface OrderItemResponse {
  id: number;
  bookId: number;
  bookTitle: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderStatusHistoryItem {
  id: number;
  oldStatus?: string;
  newStatus: string;
  changedBy?: string;
  notes?: string;
  createdAt: string;
}

export type OrderStatus = 'NEW' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface OrderResponse {
  id: number;
  orderReference: string;
  customerName: string;
  phoneNumber: string;
  deliveryAddress: string;
  notes?: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
  items: OrderItemResponse[];
  statusHistory: OrderStatusHistoryItem[];
}

export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  totalRevenue: number;
  totalBooks: number;
  totalStock: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface AdminUser {
  token: string;
  username: string;
  fullName: string;
}
