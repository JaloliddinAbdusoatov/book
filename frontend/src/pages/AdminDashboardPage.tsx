import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShoppingBag,
  TrendingUp,
  Package,
  CheckCircle,
  Clock,
  LogOut,
  Search,
  Filter,
  Save,
  Eye,
  ExternalLink,
  BookOpen,
  Edit,
  X,
  Truck,
  AlertCircle,
  Phone,
  Calendar,
  Sparkles,
} from 'lucide-react';
import {
  DashboardStats,
  OrderResponse,
  OrderStatus,
  Book,
} from '../types';
import { adminApi, authApi } from '../services/api';

const STATUS_CONFIG: Record<OrderStatus, { label: string; badge: string }> = {
  NEW: { label: 'Yangi', badge: 'bg-blue-100 text-blue-800 border-blue-200' },
  CONFIRMED: { label: 'Tasdiqlangan', badge: 'bg-amber-100 text-amber-800 border-amber-200' },
  SHIPPED: { label: 'Yo\'lda', badge: 'bg-purple-100 text-purple-800 border-purple-200' },
  DELIVERED: { label: 'Yetkazilgan', badge: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  CANCELLED: { label: 'Bekor qilingan', badge: 'bg-rose-100 text-rose-800 border-rose-200' },
};

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(authApi.getCurrentUser());

  // Dashboard Stats
  const [stats, setStats] = useState<DashboardStats | null>(null);

  // Active Tab: 'orders' | 'book'
  const [activeTab, setActiveTab] = useState<'orders' | 'book'>('orders');

  // Orders State
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'ALL'>('ALL');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Selected Order Modal
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);
  const [statusUpdateNote, setStatusUpdateNote] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Book Editor State
  const [book, setBook] = useState<Book | null>(null);
  const [bookForm, setBookForm] = useState<Partial<Book>>({});
  const [bookSaving, setBookSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Verify auth on mount
  useEffect(() => {
    const user = authApi.getCurrentUser();
    if (!user) {
      navigate('/admin/login');
      return;
    }
    setCurrentUser(user);
    loadStats();
    loadOrders();
    loadBook();
  }, [navigate]);

  const loadStats = async () => {
    try {
      const data = await adminApi.getDashboard();
      setStats(data);
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  const loadOrders = async (targetPage = 0, statusFilter = selectedStatus, search = searchQuery) => {
    try {
      setOrdersLoading(true);
      const res = await adminApi.getOrders({
        page: targetPage,
        size: 20,
        status: statusFilter === 'ALL' ? undefined : statusFilter,
        search: search.trim() || undefined,
      });
      setOrders(res.content);
      setTotalPages(res.totalPages || 1);
      setPage(res.number || 0);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setOrdersLoading(false);
    }
  };

  const loadBook = async () => {
    try {
      const books = await adminApi.getAllBooks();
      if (books && books.length > 0) {
        setBook(books[0]);
        setBookForm(books[0]);
      }
    } catch (err) {
      console.error('Failed to load book data:', err);
    }
  };

  const handleLogout = () => {
    authApi.logout();
    navigate('/admin/login');
  };

  const handleStatusChange = async (orderId: number, newStatus: OrderStatus) => {
    try {
      setUpdatingStatus(true);
      const updated = await adminApi.updateOrderStatus(orderId, newStatus, statusUpdateNote);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(updated);
      }
      setStatusUpdateNote('');
      loadStats(); // refresh counts
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleSaveBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) return;

    try {
      setBookSaving(true);
      const updated = await adminApi.updateBook(book.id, bookForm);
      setBook(updated);
      setBookForm(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      loadStats();
    } catch (err) {
      console.error('Failed to update book:', err);
    } finally {
      setBookSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center text-white font-bold shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif font-bold text-slate-900 block text-sm">
                  Ustoz Rahimova
                </span>
                <span className="text-[10px] text-amber-700 font-semibold tracking-wider uppercase block">
                  Boshqaruv Paneli
                </span>
              </div>
            </Link>

            <span className="hidden sm:inline-block h-5 w-[1px] bg-slate-200" />

            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-amber-600 transition"
            >
              <span>Saytni ko'rish</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-slate-800">
                {currentUser?.fullName || 'Administrator'}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                @{currentUser?.username || 'admin'}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Chiqish</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase">Jami Buyurtmalar</span>
              <ShoppingBag className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900">
              {stats?.totalOrders ?? '—'}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase">Kutilayotgan</span>
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold font-mono text-blue-600">
              {stats?.pendingOrders ?? '—'}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase">Yetkazilgan</span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-600">
              {stats?.deliveredOrders ?? '—'}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase">Jami Tushum</span>
              <TrendingUp className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-xl font-bold font-mono text-slate-900 truncate">
              {stats ? `${(stats.totalRevenue / 1000).toFixed(0)}k so'm` : '—'}
            </div>
          </div>

          <div className="col-span-2 lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase">Qoldiq Nusxalar</span>
              <Package className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-bold font-mono text-purple-600">
              {stats?.totalStock ?? '—'}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 gap-4">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-2 text-sm font-semibold border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'orders'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buyurtmalar Ro'yxati</span>
          </button>

          <button
            onClick={() => setActiveTab('book')}
            className={`pb-3 px-2 text-sm font-semibold border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'book'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Edit className="w-4 h-4" />
            <span>Kitob va Qoldiqni Tahrirlash</span>
          </button>
        </div>


        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            
            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center">
              
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Mijoz ismi, telefon yoki kod..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && loadOrders(0, selectedStatus, searchQuery)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              {/* Status Filters */}
              <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
                {(['ALL', 'NEW', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'] as const).map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => {
                        setSelectedStatus(st);
                        loadOrders(0, st, searchQuery);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                        selectedStatus === st
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st === 'ALL' ? 'Barchasi' : STATUS_CONFIG[st].label}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold uppercase text-slate-500">
                    <tr>
                      <th className="px-5 py-3.5">Buyurtma Kodi</th>
                      <th className="px-5 py-3.5">Sana</th>
                      <th className="px-5 py-3.5">Mijoz / Tel</th>
                      <th className="px-5 py-3.5">Manzil</th>
                      <th className="px-5 py-3.5">Soni</th>
                      <th className="px-5 py-3.5">Summa</th>
                      <th className="px-5 py-3.5">Holati</th>
                      <th className="px-5 py-3.5 text-right">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {ordersLoading ? (
                      <tr>
                        <td colSpan={8} className="text-center py-12 text-slate-400">
                          <div className="w-6 h-6 border-2 border-amber-600/30 border-t-amber-600 rounded-full animate-spin mx-auto mb-2" />
                          Yuklanmoqda...
                        </td>
                      </tr>
                    ) : orders.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center py-12 text-slate-400">
                          Buyurtmalar topilmadi
                        </td>
                      </tr>
                    ) : (
                      orders.map((ord) => {
                        const totalQty = ord.items.reduce((acc, i) => acc + i.quantity, 0);
                        return (
                          <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-5 py-4 font-mono font-bold text-slate-800 text-xs">
                              {ord.orderReference}
                            </td>
                            <td className="px-5 py-4 text-xs text-slate-500 whitespace-nowrap">
                              {new Date(ord.createdAt).toLocaleDateString('uz-UZ', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </td>
                            <td className="px-5 py-4">
                              <div className="font-semibold text-slate-900">{ord.customerName}</div>
                              <a
                                href={`tel:${ord.phoneNumber}`}
                                className="text-xs text-amber-700 hover:underline font-mono inline-flex items-center gap-1"
                              >
                                <Phone className="w-3 h-3" />
                                {ord.phoneNumber}
                              </a>
                            </td>
                            <td className="px-5 py-4 max-w-xs truncate text-xs text-slate-600">
                              {ord.deliveryAddress}
                            </td>
                            <td className="px-5 py-4 text-xs font-semibold text-slate-800">
                              {totalQty} dona
                            </td>
                            <td className="px-5 py-4 font-mono font-bold text-slate-900 text-xs whitespace-nowrap">
                              {ord.totalAmount.toLocaleString()} so'm
                            </td>
                            <td className="px-5 py-4 whitespace-nowrap">
                              <span
                                className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${
                                  STATUS_CONFIG[ord.status].badge
                                }`}
                              >
                                {STATUS_CONFIG[ord.status].label}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-right whitespace-nowrap">
                              <button
                                onClick={() => setSelectedOrder(ord)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-amber-100 hover:text-amber-800 rounded-lg transition cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Ko'rish</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}


        {/* TAB 2: BOOK SETTINGS & INVENTORY */}
        {activeTab === 'book' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
            <div className="border-b border-slate-100 pb-5 mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Kitob va Ombor Ma'lumotlari
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Ushbu ma'lumotlar sayt bosh sahifasida va buyurtma tizimida aks etadi
                </p>
              </div>

              {saveSuccess && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  Muvaffaqiyatli saqlandi!
                </div>
              )}
            </div>

            <form onSubmit={handleSaveBook} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Kitob Nomi *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookForm.title || ''}
                    onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Quyi Sarlavha (Subtitr)
                  </label>
                  <input
                    type="text"
                    value={bookForm.subtitle || ''}
                    onChange={(e) => setBookForm({ ...bookForm, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Muallif Ismi *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookForm.authorName || ''}
                    onChange={(e) => setBookForm({ ...bookForm, authorName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Narxi (so'mda) *
                  </label>
                  <input
                    type="number"
                    required
                    value={bookForm.price || ''}
                    onChange={(e) => setBookForm({ ...bookForm, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mavjud Nusxalar Soni (Ombor qoldig'i) *
                  </label>
                  <input
                    type="number"
                    required
                    value={bookForm.stockQuantity || ''}
                    onChange={(e) => setBookForm({ ...bookForm, stockQuantity: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Sahifalar Soni
                  </label>
                  <input
                    type="number"
                    value={bookForm.pages || ''}
                    onChange={(e) => setBookForm({ ...bookForm, pages: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Muqova Rasmi Havolasi (Cover Image URL)
                  </label>
                  <input
                    type="url"
                    value={bookForm.coverImageUrl || ''}
                    onChange={(e) => setBookForm({ ...bookForm, coverImageUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Muallif Biografiyasi
                  </label>
                  <textarea
                    rows={3}
                    value={bookForm.authorBio || ''}
                    onChange={(e) => setBookForm({ ...bookForm, authorBio: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mundarija (Boblar har bir yangi qatorda)
                  </label>
                  <textarea
                    rows={6}
                    value={bookForm.tableOfContents || ''}
                    onChange={(e) => setBookForm({ ...bookForm, tableOfContents: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={bookSaving}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-semibold rounded-xl text-sm shadow-md transition disabled:opacity-60 cursor-pointer flex items-center gap-2"
                >
                  {bookSaving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      O'zgarishlarni Saqlash
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

      </main>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-600" />
                <h4 className="font-serif font-bold text-slate-900">
                  Buyurtma tafsiloti ({selectedOrder.orderReference})
                </h4>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              
              {/* Customer & Delivery Card */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Mijoz:</span>
                  <span className="font-bold text-slate-900">{selectedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Telefon:</span>
                  <a href={`tel:${selectedOrder.phoneNumber}`} className="font-mono text-amber-700 font-bold hover:underline">
                    {selectedOrder.phoneNumber}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Manzil:</span>
                  <span className="font-medium text-slate-900 text-right max-w-[70%]">{selectedOrder.deliveryAddress}</span>
                </div>
                {selectedOrder.notes && (
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-slate-500 block mb-1">Mijoz izohi / Dastxat so'rovi:</span>
                    <span className="text-amber-900 font-medium bg-amber-50 p-2 rounded-lg block border border-amber-200">
                      {selectedOrder.notes}
                    </span>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div>
                <h5 className="text-xs font-semibold uppercase text-slate-500 mb-2">Buyurtma tarkibi:</h5>
                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="p-3 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-900">{item.bookTitle}</div>
                        <div className="text-slate-500 font-mono">
                          {item.quantity} x {item.unitPrice.toLocaleString()} so'm
                        </div>
                      </div>
                      <div className="font-mono font-bold text-slate-900">
                        {item.subtotal.toLocaleString()} so'm
                      </div>
                    </div>
                  ))}
                  <div className="p-3 bg-slate-50 flex justify-between font-bold text-sm text-slate-900">
                    <span>Jami to'lov:</span>
                    <span className="font-mono text-amber-600">
                      {selectedOrder.totalAmount.toLocaleString()} so'm
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Update Controls */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <label className="block text-xs font-semibold uppercase text-slate-700">
                  Buyurtma holatini yangilash:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {(['NEW', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      disabled={updatingStatus || selectedOrder.status === st}
                      onClick={() => handleStatusChange(selectedOrder.id, st)}
                      className={`py-2 px-2 text-xs font-semibold rounded-lg border transition cursor-pointer text-center ${
                        selectedOrder.status === st
                          ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {STATUS_CONFIG[st].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status History Timeline */}
              {selectedOrder.statusHistory && selectedOrder.statusHistory.length > 0 && (
                <div className="border-t border-slate-100 pt-4">
                  <h5 className="text-xs font-semibold uppercase text-slate-500 mb-2">Holat tarixi:</h5>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                    {selectedOrder.statusHistory.map((hist) => (
                      <div key={hist.id} className="text-[11px] text-slate-500 flex justify-between bg-slate-50 p-2 rounded-lg">
                        <span>
                          <b className="text-slate-700">{hist.newStatus}</b>
                          {hist.changedBy ? ` (${hist.changedBy})` : ''}
                        </span>
                        <span className="font-mono">
                          {new Date(hist.createdAt).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
