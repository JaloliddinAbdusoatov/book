import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  ShoppingBag,
  Award,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Star,
  Quote,
  Clock,
  Layers,
  HeartHandshake,
  Truck,
  HelpCircle,
  GraduationCap,
} from 'lucide-react';
import { Book } from '../types';
import { bookApi } from '../services/api';

interface HomePageProps {
  onOpenOrderModal: () => void;
  onOpenTrackModal: () => void;
  book: Book | null;
  setBook: (b: Book) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenOrderModal,
  onOpenTrackModal,
  book,
  setBook,
}) => {
  const [loading, setLoading] = useState(false);
  const [openChapter, setOpenChapter] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const books = await bookApi.getActiveBooks();
        if (books && books.length > 0) {
          setBook(books[0]);
        }
      } catch (err) {
        console.error('Failed to load book info from backend:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [setBook]);

  // Default fallback values if DB is freshly starting
  const title = book?.title || "Zamonaviy Pedagogika va Ta'lim Mahorati";
  const subtitle = book?.subtitle || "O'qituvchilar, murabbiylar va yosh mutaxassislar uchun amaliy qo'llanma";
  const authorName = book?.authorName || "Ustoz Nigora Rahimova";
  const price = book?.price || 85000;
  const pages = book?.pages || 280;
  const stock = book?.stockQuantity !== undefined ? book.stockQuantity : 150;
  const coverImage = book?.coverImageUrl || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80";
  const authorBio = book?.authorBio || "Nigora Rahimova — Xalq ta'limi a'lochisi, oliy toifali pedagog va metodist. 20 yildan ortiq pedagogik faoliyati davomida yuzlab o'qituvchilarga ustozlik qilgan, viloyat va respublika ochiq darslari hamda metodik anjumanlarida doimiy ma'ruzachi bo'lib kelmoqda.";

  // Parsed chapters
  const chapters = book?.tableOfContents
    ? book.tableOfContents.split('\n').filter(Boolean)
    : [
        "1-bob. Yangi davr o'qituvchisining kasbiy ko'nikmalari va etikasi",
        "2-bob. O'quvchilar diqqatini jalb qilish va motivatsiyani uyg'otish",
        "3-bob. Darsda interfaol metodlar va zamonaviy texnologiyalardan foydalanish",
        "4-bob. Turli xarakterdagi o'quvchilar bilan muloqot va nizolarni bartaraf etish",
        "5-bob. Baholashning zamonaviy va adolatli mezonlari",
        "6-bob. Ota-onalar bilan mustahkam hamkorlik o'rnatish sirlari",
        "7-bob. O'qituvchining ruhiy xotirjamligi va kasbiy charchoqni (burnout) yengish",
      ];

  const faqs = [
    {
      q: "Yetkazib berish qanday amalga oshiriladi?",
      a: "Toshkent shahri ichida buyurtmangiz 24 soat ichida, viloyatlarga esa BTS yoki O'zbekiston Pochtasi orqali 2-3 ish kuni mobaynida yetkaziladi.",
    },
    {
      q: "To'lovni qachon va qanday to'layman?",
      a: "To'lov kitob qo'lingizga yetib borganida amalga oshiriladi (Naqd, Payme yoki Click orqali). Oldindan hech qanday to'lov talab qilinmaydi.",
    },
    {
      q: "Muallif dastxati (avtograf) olish mumkinmi?",
      a: "Ha, albatta! Buyurtma berish chog'ida 'Muallif dastxati bilan' bandini belgilasangiz, Ustoz Nigora Rahimova kitob sahifasiga shaxsan siz uchun samimiy tilaklarini yozib beradi.",
    },
    {
      q: "Maktab yoki o'quv markaz uchun ko'p nusxada buyurtma bersa bo'ladimi?",
      a: "Ha, 5 nusxadan ortiq buyurtmalar uchun bepul yetkazib berish hamda qo'shimcha metodik tarqatma materiallar sovg'a tariqasida taqdim etiladi.",
    },
  ];

  return (
    <div className="min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/60 via-white to-slate-50 pt-12 pb-20 lg:pt-16 lg:pb-32">
        {/* Subtle decorative background patterns */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange-100/40 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Yangi chop etilgan mualliflik nashri (2024)</span>
              </div>

              {/* Main Book Title */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]">
                {title}
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-slate-600 font-medium max-w-2xl leading-relaxed">
                {subtitle}
              </p>

              {/* Author Byline */}
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500 shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
                    alt={authorName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-slate-900 text-base">{authorName}</div>
                  <div className="text-xs text-amber-700 font-medium">Xalq ta'limi a'lochisi • 20+ yillik tajriba</div>
                </div>
              </div>

              {/* Quick Spec Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg border border-slate-200 text-xs font-medium text-slate-700 shadow-xs">
                  <BookOpen className="w-3.5 h-3.5 text-amber-600" /> {pages} sahifa
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg border border-slate-200 text-xs font-medium text-slate-700 shadow-xs">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-600" /> O'zbek tili (Lotin)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg border border-slate-200 text-xs font-medium text-slate-700 shadow-xs">
                  <Layers className="w-3.5 h-3.5 text-amber-600" /> Qattiq muqova & Yuqori sifat
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-lg border border-emerald-200 text-xs font-medium text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Mavjud: {stock} nusxa
                </span>
              </div>

              {/* Price & Primary CTA */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Kitob narxi:</div>
                  <div className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
                    {price.toLocaleString()} <span className="text-lg font-normal text-slate-600">so'm</span>
                  </div>
                </div>

                <button
                  onClick={onOpenOrderModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white text-base font-bold rounded-xl shadow-xl shadow-amber-600/25 transition-all cursor-pointer group"
                >
                  <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>Hoziroq buyurtma berish</span>
                </button>
              </div>

              {/* Assurance note */}
              <p className="text-xs text-slate-500 flex items-center justify-center lg:justify-start gap-2">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Butun O'zbekiston bo'ylab yetkazib berish. To'lov kitobni olganda!</span>
              </p>
            </div>

            {/* Right Column: 3D Book Showcase */}
            <div className="lg:col-span-5 flex justify-center items-center py-6">
              <div className="relative group cursor-pointer" onClick={onOpenOrderModal}>
                
                {/* 3D Book Container */}
                <div className="relative w-64 sm:w-72 aspect-[1/1.45] rounded-r-2xl rounded-l-md overflow-hidden book-cover-3d border-y-2 border-r-2 border-amber-800/40 bg-slate-900">
                  
                  {/* Spine effect */}
                  <div className="book-spine-effect z-20" />

                  {/* Book Cover Image */}
                  <img
                    src={coverImage}
                    alt={title}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay text on cover for realism */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 p-6 flex flex-col justify-between text-white z-10">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 bg-black/40 px-2 py-0.5 rounded">
                        Amaliy Qo'llanma
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-serif text-lg font-bold leading-snug drop-shadow-md">
                        {title}
                      </h3>
                      <p className="text-xs text-amber-200 font-medium">
                        {authorName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-3 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Muallif dastxati</div>
                    <div className="text-[11px] text-slate-500">Buyurtma bilan bepul!</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. VALUE PROPOSITIONS (Why This Book) */}
      <section id="about" className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              Kitobning afzalliklari
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Bu kitob o'qituvchiga nima beradi?
            </h3>
            <p className="text-base text-slate-600">
              Nazariy qoidalardan ko'ra, har kuni sinfxonada duch kelinadigan real holatlar va sinovdan o'tgan pedagogik yechimlar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Darsda Jonli Muhit",
                desc: "Zerikarli darslardan qutilish va bolalarning faningizga bo'lgan chinakam qiziqishini uyg'otish texnikalari.",
              },
              {
                icon: Layers,
                title: "Interfaol Metodlar",
                desc: "50 dan ortiq tayyor mashg'ulotlar, kvest-darslar va har qanday dars mavzusiga moslashuvchan o'yinlar.",
              },
              {
                icon: HeartHandshake,
                title: "Psixologik Muloqot",
                desc: "Qaysar, tortinchoq yoki o'ta faol o'quvchilar bilan til topishish va ota-onalar bilan sog'lom muloqot o'rnatish.",
              },
              {
                icon: Clock,
                title: "Kasbiy Erkinlik & Vaqt",
                desc: "Darsga tayyorlanish vaqtini tejash, hissiy charchoqni oldini olish va o'qituvchilik kasbidan zavq olish sirlari.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-amber-50/40 rounded-2xl p-7 border border-slate-200/80 hover:border-amber-200 transition-all hover:shadow-lg group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 3. TABLE OF CONTENTS (Mundarija) */}
      <section id="contents" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              Kitob tuzilishi
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Mundarija va boblar tarkibi
            </h3>
            <p className="text-sm text-slate-600">
              Ushbu asar 7 ta asosiy bo'lim va 280 sahifalik tizimli qo'llanmadan iborat
            </p>
          </div>

          <div className="space-y-3">
            {chapters.map((chapterText, idx) => {
              const isOpen = openChapter === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenChapter(isOpen ? null : idx)}
                    className="w-full px-6 py-4.5 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0 border border-amber-200">
                        {idx + 1}
                      </span>
                      <span className="font-serif text-base font-semibold text-slate-800">
                        {chapterText}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-amber-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-slate-600 border-t border-slate-100 bg-amber-50/20 leading-relaxed">
                      Ushbu bobda amaliy metodik qoliplar, dars jarayonidagi real holatlar tahlili, o'qituvchilar uchun eslatmalar va interfaol mashqlar batafsil yoritilgan.
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Call to action inside contents */}
          <div className="mt-10 p-6 bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl text-white text-center sm:flex items-center justify-between shadow-lg">
            <div className="text-left mb-4 sm:mb-0">
              <h4 className="font-serif text-lg font-bold">Ushbu bilimlarni darsingizda qo'llashni xohlaysizmi?</h4>
              <p className="text-xs text-amber-100 mt-0.5">Kitob nusxasini bir necha daqiqada buyurtma qiling.</p>
            </div>
            <button
              onClick={onOpenOrderModal}
              className="px-6 py-3 bg-white text-amber-900 font-bold rounded-xl text-sm hover:bg-amber-50 transition cursor-pointer shrink-0 shadow-md"
            >
              Buyurtma berish
            </button>
          </div>
        </div>
      </section>


      {/* 4. AUTHOR SECTION (Muallif Haqida) */}
      <section id="author" className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Author Image and Badges */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                <div className="w-72 sm:w-80 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                    alt={authorName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute -bottom-6 -right-6 bg-amber-600 text-white p-4 rounded-xl shadow-xl max-w-xs">
                  <div className="font-serif font-bold text-sm">Xalq ta'limi a'lochisi</div>
                  <div className="text-xs text-amber-100 mt-0.5">20 yillik tajribaga ega ustoz-metodist</div>
                </div>
              </div>
            </div>

            {/* Author Biography & Mission */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">
                  Muallif bilan tanishing
                </h2>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
                  {authorName}
                </h3>
              </div>

              <p className="text-base text-slate-600 leading-relaxed">
                {authorBio}
              </p>

              {/* Achievements Box */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
                <h4 className="font-serif font-bold text-slate-900 text-base flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  Yutuqlar va pedagogik faoliyat:
                </h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Xalq ta'limi a'lochisi ko'krak nishoni sohibasi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>"Yilning eng yaxshi fidoiy o'qituvchisi" tanlovi g'olibi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>50 dan ortiq ilmiy-metodik maqolalar va tavsiyalar muallifi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Respublika va viloyat miqyosidagi o'nlab seminar va master-klasslar spikeri</span>
                  </li>
                </ul>
              </div>

              {/* Author Quote */}
              <div className="p-5 border-l-4 border-amber-600 bg-amber-50/50 rounded-r-xl italic text-slate-700 text-sm leading-relaxed">
                "O'qituvchilik shunchaki kasb emas, bu kelajak avlod qalbini shakllantiruvchi buyuk san'atdir. Agar ushbu kitob hatto bitta o'qituvchining darsini yengillashtirsa va bolalar ko'zidagi mehrni oshirsa — o'z maqsadimga yetgan bo'laman."
                <div className="font-bold text-slate-900 not-italic mt-2 font-serif">— {authorName}</div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 5. READER REVIEWS (Sharhlar) */}
      <section id="reviews" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              Kitobxonlar e'tirofi
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Hamkasblar va o'quvchilar fikrlari
            </h3>
            <p className="text-sm text-slate-600">
              Kitobni xarid qilib, amaliyotda qo'llagan ustozlarning xolis munosabati
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Shahnoza Alimova",
                role: "Oliy toifali matematika fani o'qituvchisi (Toshkent)",
                comment:
                  "Ushbu kitobdagi 3-bobdagi darsni qiziqarli boshlash metodlari mening darslarimni butunlay o'zgartirdi. O'quvchilar dars tugaganini sezmay qolishmoqda!",
                stars: 5,
              },
              {
                name: "Bobur Mirzayev",
                role: "Maktab direktori o'rinbosari (Samarqand)",
                comment:
                  "Maktabimizdagi barcha yosh o'qituvchilarga tavsiya qildik. Juda tushunarli, ilmiy va ayni paytda nihoyatda hayotiy qo'llanma bo'libdi. Muallifga chuqur minnatdorchilik bildiramiz.",
                stars: 5,
              },
              {
                name: "Malika Yusupova",
                role: "Pedagogika universiteti magistranti (Farg'ona)",
                comment:
                  "Institutda o'qitilmaydigan ko'plab amaliy sirlar shu kitobda jamlangan ekan. Ota-onalar bilan muloqot bo'limi ayniqsa juda katta yordam berdi.",
                stars: 5,
              },
            ].map((review, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed italic mb-6">
                    "{review.comment}"
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <div className="font-serif font-bold text-slate-900 text-base">
                    {review.name}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {review.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 6. FAQ (Ko'p Beriladigan Savollar) */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              Savol-javoblar
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Ko'p beriladigan savollar
            </h3>
            <p className="text-sm text-slate-600">
              Buyurtma berish va yetkazib berish jarayoni bo'yicha ma'lumotlar
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left font-serif font-semibold text-slate-800 hover:bg-slate-50 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-amber-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-sm text-slate-600 border-t border-slate-100 pt-3 bg-amber-50/10 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* 7. BOTTOM ORDER CTA BANNER */}
      <section className="py-16 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="font-serif text-3xl sm:text-4xl font-bold">
            Kitobni bugunoq o'z kutubxonangizga qo'shing
          </h3>
          <p className="text-amber-100 max-w-xl mx-auto text-base">
            O'zingiz yoki hamkasbingiz uchun eng qimmatli pedagogik sovg'a. Muallif dastxati va qulay yetkazib berish xizmati bilan.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenOrderModal}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-amber-900 hover:bg-amber-50 active:scale-95 text-base font-bold rounded-xl shadow-xl transition-all cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              <span>Hoziroq buyurtma berish ({price.toLocaleString()} so'm)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Floating mobile bottom order bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <div className="text-[10px] text-slate-400 font-semibold uppercase">Kitob narxi:</div>
          <div className="font-mono font-bold text-slate-900 text-lg">
            {price.toLocaleString()} so'm
          </div>
        </div>
        <button
          onClick={onOpenOrderModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 text-white font-semibold text-sm rounded-xl shadow-md"
        >
          <ShoppingBag className="w-4 h-4" />
          Buyurtma
        </button>
      </div>

    </div>
  );
};
