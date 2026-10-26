import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, ShoppingBag, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenOrderModal: () => void;
  onOpenTrackModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrderModal, onOpenTrackModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="block font-serif text-xl font-bold tracking-tight text-slate-900 group-hover:text-amber-700 transition-colors">
                Ustoz Rahimova
              </span>
              <span className="block text-xs font-medium text-amber-600 tracking-wider uppercase">
                Mualliflik Nashri
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors">
              Kitob haqida
            </a>
            <a href="#contents" className="text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors">
              Mundarija
            </a>
            <a href="#author" className="text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors">
              Muallif
            </a>
            <a href="#reviews" className="text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors">
              Fikrlar
            </a>
            <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors">
              Savol-javob
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenTrackModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Buyurtmani tekshirish"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span>Buyurtmani tekshirish</span>
            </button>

            <button
              onClick={onOpenOrderModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 active:scale-95 rounded-lg shadow-md shadow-amber-600/20 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Buyurtma berish</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenTrackModal}
              className="p-2 text-slate-600 hover:text-amber-600"
              title="Buyurtmani tekshirish"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-600 rounded-md"
            >
              Kitob haqida
            </a>
            <a
              href="#contents"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-600 rounded-md"
            >
              Mundarija
            </a>
            <a
              href="#author"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-600 rounded-md"
            >
              Muallif
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-600 rounded-md"
            >
              Fikrlar
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-600 rounded-md"
            >
              Savol-javob
            </a>
          </nav>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-600 text-white rounded-lg font-semibold shadow hover:bg-amber-700"
            >
              <ShoppingBag className="w-4 h-4" />
              Hoziroq buyurtma berish
            </button>
            <Link
              to="/admin/login"
              className="flex items-center justify-center gap-2 py-2 text-xs text-slate-400 hover:text-slate-600"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin kirish
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
