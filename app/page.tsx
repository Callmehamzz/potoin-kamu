'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Heart,
  Briefcase,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [step1Category, setStep1Category] = useState<string>('');
  const [step2SubCategory, setStep2SubCategory] = useState<string>('');
  const [locationType, setLocationType] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('');
  const [timePeriod, setTimePeriod] = useState<string>('AM');
  const [notes, setNotes] = useState<string>('');

  const categoryData = [
    {
      id: 'momen',
      title: 'Potoin Momenmu',
      icon: Heart,
      desc: 'Prewed, wisuda, keluarga, & momen spesialmu.',
      subCategories: [
        {
          name: 'Potoin Kelulusanmu (Wisuda)',
          desc: 'Toga udah keren, fotonya jangan kalah keren!',
          packages: [
            { name: 'Wisuda Sat-Set', price: 'Rp 250rb', detail: '45 menit, 1 lokasi kampus, 8 foto edit, semua file original' },
            { name: 'Wisuda Ultimate / Group', price: 'Rp 450rb', detail: '90 menit, 1-2 lokasi, 15 foto edit, bonus 1 cetak 10R' }
          ]
        },
        {
          name: 'Potoin Bestie / Date (Couple)',
          desc: 'Abadikan chemistry seru kalian berdua.',
          packages: [
            { name: 'Couple / Friend Casual', price: 'Rp 350rb', detail: '1 jam, 1 lokasi taman/cafe, 10 foto edit, max 2 orang' }
          ]
        },
        {
          name: 'Potoin Diri Sendiri (Personal)',
          desc: 'Tampil makin pede di sosial media & LinkedIn.',
          packages: [
            { name: 'Personal Studio/Kost', price: 'Rp 200rb', detail: '30 menit, 5 foto edit hi-res, background polos + flash' }
          ]
        },
        {
          name: 'Potoin Keluarga Mini',
          desc: 'Kehangatan keluarga kecil dalam jepretan manis.',
          packages: [
            { name: 'Keluarga Home Visit', price: 'Rp 650rb', detail: '1 jam, home visit Malang, 15 foto edit, max 4 orang' }
          ]
        }
      ]
    },
    {
      id: 'acara',
      title: 'Potoin Acaramu',
      icon: Calendar,
      desc: 'Ulang tahun, event mini, gathering, hingga wedding.',
      subCategories: [
        {
          name: 'Potoin Ultah Simpel',
          desc: 'Momen nambah umur seru bareng temen-temen.',
          packages: [
            { name: 'Birthday Basic', price: 'Rp 500rb', detail: '1.5 jam, 1 lokasi, 30 foto edit, semua file ori via GDrive' }
          ]
        },
        {
          name: 'Potoin Event Mini',
          desc: 'Gathering, seminar, atau pentas seni kecil.',
          packages: [
            { name: 'Event Coverage 2 Jam', price: 'Rp 900rb', detail: '2 jam, 1 fotografer, 80 foto edit, pengerjaan cepat' }
          ]
        }
      ]
    },
    {
      id: 'bisnis',
      title: 'Potoin Bisnismu',
      icon: Briefcase,
      desc: 'Foto produk, menu makanan GoFood, & headshot tim.',
      subCategories: [
        {
          name: 'Potoin Jualanmu (Produk UMKM)',
          desc: 'Bikin pembeli langsung auto checkout!',
          packages: [
            { name: 'Produk Hemat', price: 'Rp 25rb /foto', detail: 'Min. 10 foto, background putih/simpel, 1 angle, file e-commerce ready' }
          ]
        },
        {
          name: 'Potoin Menu-mu (Kuliner)',
          desc: 'Menu makanan & minuman bikin ngiler.',
          packages: [
            { name: 'Makanan Basic', price: 'Rp 350rb', detail: '5 menu, 2 foto/menu, styling simpel, GoFood ready' }
          ]
        },
        {
          name: 'Potoin Dirimu Kerja (Headshot)',
          desc: 'Foto tim profesional & kompro perusahaan.',
          packages: [
            { name: 'Headshot / Org', price: 'Rp 125rb /orang', detail: 'Min. 3 orang, dateng ke lokasi, 2 foto edit/orang' }
          ]
        }
      ]
    },
    {
      id: 'gila',
      title: 'Potoin Ide Gila-mu',
      icon: Lightbulb,
      desc: 'Konsep tematik, cosplay, yearbook, & gaya bebas.',
      subCategories: [
        {
          name: 'Potoin Konsepmu (Themed)',
          desc: 'Punya ide unik yang mau direalisasikan?',
          packages: [
            { name: 'Themed 1 Jam', price: 'Rp 750rb', detail: '1 jam, 1 konsep unik, 15 foto edit, diskusi konsep via WA' }
          ]
        }
      ]
    }
  ];

  const portfolioSlides = [
    { title: 'Wisuda Sat-Set', category: 'Potoin Momenmu', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop' },
    { title: 'Couple & Prewedding', category: 'Potoin Momenmu', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop' },
    { title: 'Katalog Produk UMKM', category: 'Potoin Bisnismu', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop' },
    { title: 'Kuliner & Menu Food', category: 'Potoin Bisnismu', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop' },
    { title: 'Themed / Ide Gila', category: 'Potoin Ide Gila-mu', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % portfolioSlides.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [portfolioSlides.length]);

  const subCategoriesMap: Record<string, { label: string; value: string }[]> = {
    'Potoin Momenku': [
      { label: 'Potoin Cinta Kalian - Prewedding', value: 'Prewedding & Couple' },
      { label: 'Potoin Kelulusanmu - Wisuda', value: 'Wisuda/Graduation' },
      { label: 'Potoin Keluarga Kecilmu - Keluarga/Maternity', value: 'Keluarga & Maternity' },
      { label: 'Potoin Level Up-mu - Ulang Tahun', value: 'Ulang Tahun' }
    ],
    'Potoin Acaraku': [
      { label: 'Potoin Hari Spesialmu - Wedding Day', value: 'Wedding Day' },
      { label: "Potoin 'Iya'-nya Dia - Lamaran & Sangjit", value: 'Lamaran & Sangjit' },
      { label: 'Potoin Serunya Eventmu - Gathering/Konser', value: 'Event & Gathering' }
    ],
    'Potoin Bisnisku': [
      { label: 'Potoin Jualanmu - Produk & Katalog', value: 'Produk & Katalog' },
      { label: 'Potoin Menu Andalanmu - Makanan & Minuman', value: 'Makanan & Minuman' },
      { label: 'Potoin Tim Hebatmu - Headshot', value: 'Company Profile & Headshot' }
    ],
    'Potoin Ide Gila-ku': [
      { label: 'Potoin Imajinasimu - Themed / Conceptual', value: 'Themed/Conceptual' }
    ]
  };

  const handleToggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const fullTime = bookingTime ? `${bookingTime} ${timePeriod}` : 'Belum ditentukan';
    const text = `Halo Potoin Kamu, saya ingin booking jadwal foto:

- *Nama*: ${clientName || '-'}
- *No. WA*: ${clientPhone || '-'}
- *Kategori Utama*: ${step1Category || '-'}
- *Sub-Kategori*: ${step2SubCategory || '-'}
- *Opsi Lokasi*: ${locationType || '-'}
- *Tanggal*: ${bookingDate || '-'}
- *Waktu/Jam*: ${fullTime}
- *Catatan*: ${notes || '-'}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send/?phone=628135353498&text=${encodedText}`, '_blank');
  };

  const faqs = [
    { q: "Gimana cara booking di 'potoin kamu'?", a: "Gampang! Tinggal isi form booking di website ini atau langsung WhatsApp kita. Ceritain mau potoin apa, tanggal berapa, dan di mana." },
    { q: "Harus DP berapa? H- berapa baru boleh booking?", a: "DP 50% buat kunci tanggal kamu ya. Sisa pelunasan pas hari H selesai sesi foto. Booking mending dari H-14 biar aman." },
    { q: "Bisa gak sih dadakan? Besok mau dipotoin.", a: "Bisa banget kalau jadwal kita kosong! Coba WhatsApp aja dulu. Kalau urgent/besok ada charge +Rp 100rb ya." },
    { q: "Kalau ujan/cuaca jelek gimana?", a: "Tenang, bisa reschedule gratis 1x kok. Atau kita pindah ke lokasi indoor/cafe." },
    { q: "Itu harga 'mulai dari', nanti bisa nambah apa aja?", a: "Bisa nambah kalau: lokasi di luar Malang Kota, nambah jam +Rp 150rb/jam, nambah foto edit +Rp 15rb/foto, atau cetak album." },
    { q: "File aslinya dikasih semua gak?", a: "Dikasih dong! Semua paket udah dapet BONUS semua file original via Google Drive." }
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans pb-24 selection:bg-amber-100 selection:text-amber-900">
      
      {/* --- HERO SECTION --- */}
      <header className="relative py-12 px-4 text-center overflow-hidden border-b border-amber-100 bg-gradient-to-b from-amber-50/60 to-white">
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          
          {/* LOGO ASLI */}
          <div className="flex justify-center mb-2">
            <img 
              src="/logo.png" 
              alt="Potoin Kamu Logo" 
              className="h-16 md:h-24 object-contain drop-shadow-sm" 
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs md:text-sm font-semibold shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-600" /> UMKM & Student Friendly Photography
          </div>
          
          <p className="text-base md:text-lg text-neutral-600 max-w-xl mx-auto font-normal">
            Buat kenangan yang gak bakal keulang. Tanpa kaku, harga jujur, dan hasil yang bikin kamu senyum-senyum sendiri.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <a href="#booking" className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-extrabold transition shadow-md shadow-amber-500/20 text-sm">
              Potoin aku
            </a>
            <a 
              href="https://api.whatsapp.com/send/?phone=628135353498&text=Halo+Potoin+Kamu%2C+mau+konsultasi+dulu+dong" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold border border-neutral-300 transition text-sm flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" /> Mau konsultasi dulu
            </a>
          </div>
        </div>
      </header>

      {/* --- CAROUSEL PORTOFOLIO SLIDER --- */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-6 space-y-1">
          <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900">Portofolio & Kategori Foto</h2>
          <p className="text-sm text-neutral-500">Card bergeser otomatis tiap 2 detik (bisa di-swipe manual juga)</p>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-200 bg-neutral-950 aspect-[16/9] md:aspect-[21/9]">
          <img 
            src={portfolioSlides[currentSlide].img} 
            alt={portfolioSlides[currentSlide].title} 
            className="w-full h-full object-cover transition-all duration-700 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent flex flex-col justify-end p-6 text-white">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">{portfolioSlides[currentSlide].category}</span>
            <h3 className="text-xl md:text-2xl font-black">{portfolioSlides[currentSlide].title}</h3>
          </div>

          <button 
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? portfolioSlides.length - 1 : prev - 1))}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-neutral-900 hover:bg-white transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setCurrentSlide((prev) => (prev + 1) % portfolioSlides.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-neutral-900 hover:bg-white transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 right-4 flex gap-1.5">
            {portfolioSlides.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all ${currentSlide === idx ? 'w-6 bg-amber-400' : 'w-2 bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- KATEGORI ➔ SUB-KATEGORI ➔ PAKET HARGA --- */}
      <section id="harga" className="py-12 px-4 max-w-5xl mx-auto border-t border-neutral-200">
        <div className="text-center mb-8 space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">Pilih Kategori Layanan</h2>
          <p className="text-sm text-neutral-600">Klik "Pilih yang ini" untuk membuka sub-kategori & paket harga</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {categoryData.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <div 
                key={cat.id}
                className={`p-5 rounded-2xl border flex flex-col justify-between transition shadow-sm ${
                  isSelected 
                    ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-400/50' 
                    : 'border-neutral-200 bg-white hover:border-amber-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-lg text-neutral-900">{cat.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{cat.desc}</p>
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedSubCategory(null);
                  }}
                  className={`mt-6 w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                    isSelected
                      ? 'bg-amber-500 text-neutral-950'
                      : 'bg-neutral-900 text-white hover:bg-amber-500 hover:text-neutral-950'
                  }`}
                >
                  {isSelected ? 'Kategori Dipilih ✓' : 'Pilih yang ini'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {selectedCategory && (
          <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-6 mb-8 animate-fadeIn space-y-4">
            <h3 className="text-lg font-extrabold text-neutral-900 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              Pilih Sub-Kategori untuk: <span className="text-amber-700">{categoryData.find(c => c.id === selectedCategory)?.title}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categoryData.find(c => c.id === selectedCategory)?.subCategories.map((sub, idx) => {
                const isSubSelected = selectedSubCategory === sub.name;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedSubCategory(sub.name)}
                    className={`p-4 rounded-xl text-left border transition ${
                      isSubSelected
                        ? 'border-amber-500 bg-amber-500 text-neutral-950 shadow-md font-bold'
                        : 'border-neutral-200 bg-white text-neutral-800 hover:border-amber-400'
                    }`}
                  >
                    <div className="text-sm font-bold">{sub.name}</div>
                    <div className={`text-xs mt-0.5 ${isSubSelected ? 'text-neutral-900/80' : 'text-neutral-500'}`}>{sub.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {selectedCategory && selectedSubCategory && (
          <div className="bg-white border-2 border-amber-400 rounded-2xl p-6 space-y-6 shadow-lg animate-fadeIn">
            <div className="border-b border-neutral-100 pb-3">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Daftar Paket Harga</span>
              <h4 className="text-xl font-extrabold text-neutral-900">{selectedSubCategory}</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryData
                .find(c => c.id === selectedCategory)
                ?.subCategories.find(s => s.name === selectedSubCategory)
                ?.packages.map((pkg, idx) => (
                  <div key={idx} className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h5 className="font-extrabold text-base text-neutral-900">{pkg.name}</h5>
                        <span className="text-base font-black text-amber-600">{pkg.price}</span>
                      </div>
                      <p className="text-xs text-neutral-600 mt-2">{pkg.detail}</p>
                    </div>

                    <a
                      href="#booking"
                      onClick={() => {
                        setStep1Category(categoryData.find(c => c.id === selectedCategory)?.title || '');
                        setStep2SubCategory(selectedSubCategory);
                      }}
                      className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs text-center transition block mt-3"
                    >
                      Potoin Aku Paket Ini!
                    </a>
                  </div>
                ))}
            </div>
          </div>
        )}
      </section>

      {/* --- FORM BOOKING MULTI-STEP --- */}
      <section id="booking" className="py-12 px-4 max-w-3xl mx-auto">
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 space-y-8 shadow-xl">
          <div className="text-center space-y-2 border-b border-neutral-100 pb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">Form Pemesanan Potoin Kamu</h2>
            <p className="text-neutral-500 text-sm">Isi 3 langkah simpel di bawah ini untuk kunci jadwalmu</p>
          </div>

          <form onSubmit={handleSendWhatsApp} className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-amber-600 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center text-xs font-bold">1</span>
                Kamu mau dipotoin untuk apa?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: 'Potoin Momenku', desc: 'Prewed, wisuda, keluarga, ultah' },
                  { title: 'Potoin Acaraku', desc: 'Wedding, lamaran, event' },
                  { title: 'Potoin Bisnisku', desc: 'Produk, makanan, company profile' },
                  { title: 'Potoin Ide Gila-ku', desc: 'Punya konsep sendiri? Spill di sini!' },
                ].map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => {
                      setStep1Category(item.title);
                      setStep2SubCategory('');
                    }}
                    className={`p-3.5 rounded-xl text-left border transition ${
                      step1Category === item.title
                        ? 'border-amber-500 bg-amber-50 text-neutral-900 font-semibold shadow-sm'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-300'
                    }`}
                  >
                    <div className="font-bold text-sm text-neutral-900">{item.title}</div>
                    <div className="text-xs text-neutral-500 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {step1Category && (
              <div className="space-y-3 pt-2">
                <label className="block text-sm font-bold text-amber-600 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center text-xs font-bold">2</span>
                  Spill detail pilihannya
                </label>
                <div className="space-y-2">
                  {subCategoriesMap[step1Category]?.map((sub) => (
                    <label 
                      key={sub.value}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                        step2SubCategory === sub.value
                          ? 'border-amber-500 bg-amber-50 text-neutral-900 font-medium'
                          : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="subCategory"
                        value={sub.value}
                        checked={step2SubCategory === sub.value}
                        onChange={(e) => setStep2SubCategory(e.target.value)}
                        className="accent-amber-500 w-4 h-4"
                      />
                      <span className="text-sm font-medium">{sub.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4 pt-2 border-t border-neutral-100">
              <label className="block text-sm font-bold text-amber-600 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center text-xs font-bold">3</span>
                Mau potoin di mana & Kapan?
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  'Outdoor Malang',
                  'Venue / Rumahku',
                  'Studio Malang',
                  'Diskusi dulu'
                ].map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setLocationType(loc)}
                    className={`p-2.5 rounded-lg text-xs font-medium border text-center transition ${
                      locationType === loc
                        ? 'border-amber-500 bg-amber-50 text-neutral-900 font-bold'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-300'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1">Pilih Tanggal</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1">Pilih Jam & Sesi</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Contoh: 10:00"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-amber-500"
                    />
                    <select
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(e.target.value)}
                      className="bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-sm text-amber-700 font-bold focus:outline-none focus:border-amber-500"
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama kamu"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1">Nomor WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="08123456789"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">Catatan Khusus (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Misal: Foto keluarga 5 orang, request tone hangat/moody..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-amber-500 resize-none"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-extrabold flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/20 text-base"
            >
              <MessageCircle className="w-5 h-5 fill-neutral-950" />
              Kirim Pemesanan via WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* --- FAQ ACCORDION SECTION --- */}
      <section className="py-12 px-4 max-w-4xl mx-auto border-t border-neutral-200">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">FAQ Potoin Kamu</h2>
          <p className="text-neutral-500 text-sm">Hal-hal yang sering ditanyakan sebelum booking</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-neutral-200 bg-white rounded-xl overflow-hidden transition shadow-sm"
            >
              <button
                onClick={() => handleToggleFaq(index)}
                className="w-full p-4 text-left font-semibold text-neutral-900 flex items-center justify-between gap-4 hover:bg-neutral-50 text-sm"
              >
                <span>{faq.q}</span>
                {openFaq === index ? (
                  <ChevronUp className="w-4 h-4 text-amber-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                )}
              </button>
              {openFaq === index && (
                <div className="px-4 pb-4 text-xs md:text-sm text-neutral-600 border-t border-neutral-100 pt-3 leading-relaxed bg-neutral-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- FLOATING WHATSAPP BUTTON --- */}
      <a
        href="https://api.whatsapp.com/send/?phone=628135353498&text=Halo+Potoin+Kamu%2C+saya+mau+tanya+jadwal+foto"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition hover:scale-110 active:scale-95"
        title="Chat WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>

      {/* --- FOOTER --- */}
      <footer className="border-t border-neutral-200 py-8 text-center text-xs text-neutral-500">
        <p>© 2026 Potoin Kamu. All rights reserved. Malang, Jawa Timur.</p>
      </footer>
    </div>
  );
}