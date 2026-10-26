import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Phone, MapPin, Send, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-600/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                Ustoz Rahimova
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              "Zamonaviy Pedagogika va Ta'lim Mahorati" — o'qituvchining darsdagi ishonchini, o'quvchilar bilan mehrli munosabatini va kasbiy yuksalishini ta'minlovchi amaliy qo'llanma.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-400">
                ⭐ 1-nashr (2024)
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400">
                ✓ Rasmiy mualliflik huquqi
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              Bo'limlar
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  Kitob haqida
                </a>
              </li>
              <li>
                <a href="#contents" className="hover:text-amber-400 transition-colors">
                  Mundarija va boblar
                </a>
              </li>
              <li>
                <a href="#author" className="hover:text-amber-400 transition-colors">
                  Muallif biografiyasi
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">
                  O'qituvchilar fikri
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition-colors">
                  Savollar va yetkazib berish
                </a>
              </li>
            </ul>
          </div>

          {/* Contact / Delivery info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              Bog'lanish
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:+998901234567" className="hover:text-amber-400 font-mono">
                  +998 (90) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Send className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
                  @ustoz_rahimova_bot
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Toshkent shahri va butun O'zbekiston bo'ylab yetkazib beriladi</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Ustoz Nigora Rahimova. Barcha huquqlar himoyalangan.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin tizimi</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
