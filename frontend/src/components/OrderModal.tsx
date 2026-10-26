import React, { useState } from 'react';
import { X, CheckCircle, Copy, Check, ShoppingBag, Truck, ShieldAlert, Sparkles } from 'lucide-react';
import { Book, CreateOrderRequest, OrderResponse } from '../types';
import { orderApi } from '../services/api';

interface OrderModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ book, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+998 ');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [withAutograph, setWithAutograph] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdOrder, setCreatedOrder] = useState<OrderResponse | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const unitPrice = book ? book.price : 85000;
  const totalAmount = unitPrice * quantity;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+998')) {
      val = '+998 ';
    }
    setPhoneNumber(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) return;

    if (!customerName.trim()) {
      setError('Iltimos, ism va familiyangizni kiriting');
      return;
    }

    const cleanPhone = phoneNumber.replace(/\s+/g, '');
    if (cleanPhone.length < 13) {
      setError('Iltimos, telefon raqamingizni to\'liq kiriting (masalan: +998 90 123 45 67)');
      return;
    }

    if (!deliveryAddress.trim()) {
      setError('Iltimos, yetkazib berish manzilini kiriting');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const combinedNotes = withAutograph
        ? `[Muallif dastxati bilan] ${notes}`.trim()
        : notes.trim();

      const payload: CreateOrderRequest = {
        customerName: customerName.trim(),
        phoneNumber: cleanPhone,
        deliveryAddress: deliveryAddress.trim(),
        notes: combinedNotes,
        items: [
          {
            bookId: book.id,
            quantity: quantity,
          },
        ],
      };

      const result = await orderApi.createOrder(payload);
      setCreatedOrder(result);
    } catch (err: any) {
      console.error('Order creation failed:', err);
      const msg = err.response?.data?.message || 'Buyurtma yaratishda xatolik yuz berdi. Qayta urinib ko\'ring.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyRef = () => {
    if (!createdOrder) return;
    navigator.clipboard.writeText(createdOrder.orderReference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCloseModal = () => {
    setCreatedOrder(null);
    setError(null);
    setQuantity(1);
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-600" />
            <h3 className="font-serif text-lg font-bold text-slate-800">
              {createdOrder ? 'Buyurtma qabul qilindi!' : 'Kitobga buyurtma berish'}
            </h3>
          </div>
          <button
            onClick={handleCloseModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {createdOrder ? (
            /* Success State */
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-900 font-serif">
                  Tashakkur, buyurtmangiz muvaffaqiyatli qabul qilindi!
                </h4>
                <p className="text-sm text-slate-600 mt-2">
                  Tez orada operatorimiz <b>{createdOrder.phoneNumber}</b> raqamingizga bog'lanib, yetkazib berish vaqtini aniqlashtiradi.
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-left">
                <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
                  Buyurtma kodi (Kuzatish uchun):
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xl font-bold text-amber-950">
                    {createdOrder.orderReference}
                  </span>
                  <button
                    onClick={handleCopyRef}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Nusxalandi!' : 'Nusxa olish'}</span>
                  </button>
                </div>
              </div>

              {/* Order Summary Details */}
              <div className="bg-slate-50 rounded-xl p-4 text-left space-y-2 text-sm border border-slate-100">
                <div className="flex justify-between text-slate-600">
                  <span>Qabul qiluvchi:</span>
                  <span className="font-medium text-slate-900">{createdOrder.customerName}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Yetkazish manzili:</span>
                  <span className="font-medium text-slate-900 text-right max-w-[60%] truncate">{createdOrder.deliveryAddress}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Nusxalar soni:</span>
                  <span className="font-medium text-slate-900">{quantity} dona</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-base text-slate-900">
                  <span>Jami to'lov:</span>
                  <span className="text-amber-600 font-mono">
                    {createdOrder.totalAmount.toLocaleString()} so'm
                  </span>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="w-full py-3 px-4 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors"
              >
                Tushunarli, oynani yopish
              </button>
            </div>
          ) : (
            /* Order Form State */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Book Summary Card */}
              <div className="flex items-center gap-4 p-3 bg-amber-50/60 rounded-xl border border-amber-100">
                <img
                  src={book?.coverImageUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80'}
                  alt={book?.title}
                  className="w-14 h-18 object-cover rounded shadow-sm border border-amber-200 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif font-bold text-slate-900 text-sm truncate">
                    {book?.title || 'Zamonaviy Pedagogika'}
                  </h4>
                  <p className="text-xs text-slate-500 truncate">
                    {book?.authorName || 'Ustoz Nigora Rahimova'}
                  </p>
                  <p className="text-sm font-bold text-amber-700 mt-1 font-mono">
                    {unitPrice.toLocaleString()} so'm
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border border-amber-200 bg-white rounded-lg overflow-hidden shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-slate-600 hover:bg-amber-100 transition font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 font-semibold text-slate-800 text-sm">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-slate-600 hover:bg-amber-100 transition font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Customer Inputs */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Ism va Familiyangiz *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Aziza Karimova"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Telefon raqamingiz *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+998 90 123 45 67"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-mono transition"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  Buyurtmani tasdiqlash uchun ushbu raqamga qo'ng'iroq qilinadi
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Yetkazib berish manzili *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Viloyat, shahar/tuman, ko'cha, uy/xonadon raqami"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                />
              </div>

              {/* Autograph Option */}
              <label className="flex items-center gap-3 p-3 bg-amber-50/40 rounded-xl border border-amber-100 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={withAutograph}
                  onChange={(e) => setWithAutograph(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 border-slate-300"
                />
                <div className="flex-1 text-xs">
                  <div className="font-semibold text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Muallifdan maxsus dastxat (esdalik yozuvi) bilan olish
                  </div>
                  <div className="text-slate-500">
                    Ustoz kitob titul varag'iga shaxsan siz uchun dil so'zlarini yozib beradi
                  </div>
                </div>
              </label>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Qo'shimcha izoh yoki dastxat uchun ism
                </label>
                <input
                  type="text"
                  placeholder="Masalan: 'Hamkasbim Dilafruz uchun' yoki yetkazish vaqti"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                />
              </div>

              {/* Total Summary */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Jami to'lov miqdori:</span>
                  <span className="text-xl font-bold text-slate-900 font-mono">
                    {totalAmount.toLocaleString()} so'm
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 font-medium">
                  <Truck className="w-3.5 h-3.5" />
                  <span>To'lov qabul qilinganda</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-amber-600 hover:bg-amber-700 active:scale-[0.99] text-white font-semibold rounded-xl shadow-lg shadow-amber-600/20 transition-all disabled:opacity-70 cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Buyurtmani tasdiqlash
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
