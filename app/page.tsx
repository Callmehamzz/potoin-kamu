'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MessageCircle, ChevronLeft, ChevronRight, ArrowLeft, Check, Sparkles } from 'lucide-react';

const categories = [
  {
    id: 'momenmu',
    title: 'Potoin Momenmu',
    tagline: 'Prewed, wisuda, keluarga, & momen spesialmu.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    subcategories: [
      { name: 'Potoin Prewedding', desc: 'Konsep romantis, natural, & estetik.', price: 'Rp 450.000' },
      { name: 'Potoin Wisuda', desc: 'Abadikan momen kelulusanmu dengan gaya terbaik.', price: 'Rp 250.000' },
      { name: 'Potoin Keluarga', desc: 'Hangat, kasual, dan penuh kebersamaan.', price: 'Rp 350.000' },
    ]
  },
  {
    id: 'acaramu',
    title: 'Potoin Acaramu',
    tagline: 'Ulang tahun, event mini, gathering, hingga wedding.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    subcategories: [
      { name: 'Potoin Birthday / Party', desc: 'Dokumentasi keseruan acara ulang tahun.', price: 'Rp 300.000 / jam' },
      { name: 'Potoin Gathering / Event', desc: 'Liputan profesional event kantor atau komunitas.', price: 'Rp 500.000 / acara' },
      { name: 'Potoin Wedding Intimate', desc: 'Liputan spesial hari pernikahan khidmat.', price: 'Rp 1.200.000' },
    ]
  },
  {
    id: 'bisnismu',
    title: 'Potoin Bisnismu',
    tagline: 'Foto produk, menu makanan GoFood, & headshot tim.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    subcategories: [
      { name: 'Potoin Jualanmu (Produk UMKM)', desc: 'Bikin pembeli langsung auto checkout!', price: 'Rp 15.000 / produk' },
      { name: 'Potoin Menu-mu (Kuliner)', desc: 'Menu makanan & minuman bikin ngiler.', price: 'Rp 200.000 (10 menu)' },
      { name: 'Potoin Dirimu Kerja (Headshot)', desc: 'Foto tim profesional & profil perusahaan.', price: 'Rp 150.000 / orang' },
    ]
  }
];

export default function LandingPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<null | typeof categories[0]>(null);

  useEffect(() => {
    if (selectedCategory) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [selectedCategory]);

  const handleWhatsAppOrder = (itemTitle: string) => {
    const message = encodeURIComponent(`Halo Kak, saya mau konsultasi dan pesan layanan: *${itemTitle}* di Potoin Kamu.`);
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-amber-200">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
      `}</style>

      {/* Floating WhatsApp CTA */}
      <a
        href="https://wa.me/6281234567890?text=Halo%20Kak,%20saya%20mau%20konsultasi%20dulu%20tentang%20jasa%20fotografinya."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-full shadow-2xl hover:bg-emerald-700 transition-all duration-300 hover:scale-105 font-medium text-sm md:text-base border border-emerald-500/30"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
        <span className="tracking-wide">konsultasi dulu</span>
      </a>

      {/* Header & Hero */}
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative h-14 w-48">
            <Image
              src="/logo.png"
              alt="Potoin Kamu Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/60 px-4 py-1.5 rounded-full text-xs font-semibold text-amber-800 mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          UMKM & Student Friendly Photography
        </div>

        <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-4 leading-tight">
          Buat kenangan yang gak bakal keulang.
        </h1>
        <p className="text-neutral-600 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Tanpa kaku, harga jujur, dan hasil yang bikin kamu senyum-senyum sendiri.
        </p>
      </header>

      {/* Main Section */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        {!selectedCategory ? (
          <>
            <div className="text-center mb-10">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900">
                Portofolio & Kategori Foto
              </h2>
            </div>

            {/* Carousel */}
            <div className="relative overflow-hidden py-6">
              <div className="flex items-center justify-center gap-4 md:gap-6 transition-all duration-500 ease-out">
                {categories.map((cat, idx) => {
                  const isCenter = idx === activeIndex;
                  return (
                    <div
                      key={cat.id}
                      className={`transition-all duration-500 ease-in-out rounded-3xl overflow-hidden bg-neutral-900 text-white shadow-xl flex flex-col justify-between p-6 md:p-8 relative ${
                        isCenter
                          ? 'w-[90%] md:w-[550px] scale-100 opacity-100 z-20 ring-2 ring-amber-400/50'
                          : 'w-[40%] md:w-[320px] scale-90 opacity-40 blur-[1px] z-10 hidden md:flex'
                      }`}
                      style={{ minHeight: '420px' }}
                    >
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={cat.image}
                          alt={cat.title}
                          fill
                          className="object-cover opacity-40 hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                      </div>

                      <div className="relative z-10 flex justify-between items-center">
                        <span className="bg-amber-500/90 text-black font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                          Kategori Utama
                        </span>
                        <span className="text-xs text-amber-200/80 font-mono">
                          0{idx + 1} / 0{categories.length}
                        </span>
                      </div>

                      <div className="relative z-10 my-auto py-6">
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">
                          {cat.title}
                        </h3>
                        <p className="text-neutral-300 text-sm md:text-base font-light mb-6">
                          {cat.tagline}
                        </p>

                        <button
                          onClick={() => setSelectedCategory(cat)}
                          className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold py-3.5 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/20 active:scale-[0.98]"
                        >
                          <span>Pilih Kategori Ini</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="relative z-10 flex justify-center gap-2 pt-2">
                        {categories.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={() => setActiveIndex(dotIdx)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              dotIdx === activeIndex ? 'w-8 bg-amber-400' : 'w-2 bg-white/40'
                            }`}
                            aria-label={`Go to slide ${dotIdx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => setActiveIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1))}
                  className="p-3 rounded-full bg-neutral-100 hover:bg-amber-500 hover:text-white transition-colors text-neutral-800 shadow-md"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveIndex((prev) => (prev + 1) % categories.length)}
                  className="p-3 rounded-full bg-neutral-100 hover:bg-amber-500 hover:text-white transition-colors text-neutral-800 shadow-md"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Potoin Aku Button Moved Here */}
            <div className="text-center mt-12">
              <button
                onClick={() => handleWhatsAppOrder("Potoin Aku (Custom Session)")}
                className="bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 text-base tracking-wide"
              >
                Potoin aku sekarang ✨
              </button>
            </div>
          </>
        ) : (
          /* Focused Sub-Category View */
          <div className="max-w-3xl mx-auto bg-amber-50/40 border border-amber-200/60 rounded-3xl p-6 md:p-10 shadow-xl">
            <button
              onClick={() => setSelectedCategory(null)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800 hover:text-amber-950 mb-6 bg-white px-4 py-2 rounded-full shadow-sm border border-amber-200/60 transition-all hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Pilihan Kategori
            </button>

            <div className="border-b border-amber-200/60 pb-6 mb-8">
              <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
                Sub-Kategori & Paket Harga
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mt-3 mb-2">
                {selectedCategory.title}
              </h2>
              <p className="text-neutral-600 text-base">{selectedCategory.tagline}</p>
            </div>

            <div className="space-y-4">
              {selectedCategory.subcategories.map((sub, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 hover:border-amber-300 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="font-serif text-lg font-bold text-neutral-900 mb-1">{sub.name}</h4>
                    <p className="text-neutral-600 text-sm mb-2">{sub.desc}</p>
                    <span className="inline-block font-mono text-amber-700 font-bold text-sm bg-amber-50 px-3 py-1 rounded-lg">
                      {sub.price}
                    </span>
                  </div>
                  <button
                    onClick={() => handleWhatsAppOrder(`${selectedCategory.title} - ${sub.name} (${sub.price})`)}
                    className="bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 text-sm flex items-center justify-center gap-2 shadow-md"
                  >
                    <Check className="w-4 h-4" />
                    <span>Pilih Paket Ini</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <footer className="text-center py-8 text-neutral-400 text-xs border-t border-neutral-100">
        © {new Date().getFullYear()} Potoin Kamu. All rights reserved. UMKM & Student Friendly Photography.
      </footer>
    </main>
  );
}