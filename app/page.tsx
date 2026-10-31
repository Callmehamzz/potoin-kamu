'use client';
import { useState, useEffect } from 'react';
import { MessageCircle, ChevronRight, ArrowLeft, Check, Sparkles, Calendar, Clock, MapPin, ExternalLink, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const categories = [
  {
    id: 'momenmu',
    title: 'Potoin Momenmu',
    tagline: 'Prewed, wisuda, keluarga, & momen spesialmu.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    subcategories: [
      { 
        name: 'Potoin Prewedding', 
        desc: 'Konsep romantis, natural, & estetik.', 
        price: 'Rp 450.000', 
        duration: '2-3 Jam',
        image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80' 
      },
      { 
        name: 'Potoin Wisuda', 
        desc: 'Abadikan momen kelulusanmu dengan gaya terbaik.', 
        price: 'Rp 250.000', 
        duration: '1-2 Jam',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80' 
      },
      { 
        name: 'Potoin Keluarga', 
        desc: 'Hangat, kasual, dan penuh kebersamaan.', 
        price: 'Rp 350.000', 
        duration: '1-2 Jam',
        image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=800&q=80' 
      },
    ]
  },
  {
    id: 'acaramu',
    title: 'Potoin Acaramu',
    tagline: 'Ulang tahun, event mini, gathering, hingga wedding.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    subcategories: [
      { 
        name: 'Potoin Birthday / Party', 
        desc: 'Dokumentasi keseruan acara ulang tahun.', 
        price: 'Rp 300.000 / jam', 
        duration: 'Sesuai Acara',
        image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80' 
      },
      { 
        name: 'Potoin Gathering / Event', 
        desc: 'Liputan profesional event kantor atau komunitas.', 
        price: 'Rp 500.000 / acara', 
        duration: 'Half Day / Full Day',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80' 
      },
      { 
        name: 'Potoin Wedding Intimate', 
        desc: 'Liputan spesial hari pernikahan khidmat.', 
        price: 'Rp 1.200.000', 
        duration: 'Full Service',
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80' 
      },
    ]
  },
  {
    id: 'bisnismu',
    title: 'Potoin Bisnismu',
    tagline: 'Foto produk, menu makanan GoFood, & headshot tim.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    subcategories: [
      { 
        name: 'Potoin Jualanmu (Produk UMKM)', 
        desc: 'Bikin pembeli langsung auto checkout!', 
        price: 'Rp 15.000 / produk', 
        duration: 'Fleksibel',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80' 
      },
      { 
        name: 'Potoin Menu-mu (Kuliner)', 
        desc: 'Menu makanan & minuman bikin ngiler.', 
        price: 'Rp 200.000 (10 menu)', 
        duration: '1-2 Jam',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80' 
      },
      { 
        name: 'Potoin Dirimu Kerja (Headshot)', 
        desc: 'Foto tim profesional & profil perusahaan.', 
        price: 'Rp 150.000 / orang', 
        duration: '30 Menit / orang',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' 
      },
    ]
  }
];

const faqsData = [
  {
    category: '1. BOOKING & JADWAL',
    items: [
      {
        q: 'Gimana cara booking di "potoin kamu"?',
        a: 'Gampang! Tinggal klik tombol "Potoin Aku!" di paket yang kamu mau, atau DM/WhatsApp kita. Ceritain mau potoin apa, tanggal berapa, dan di mana. Nanti kita cek jadwal & kirim detail bookingnya.'
      },
      {
        q: 'Harus DP berapa? H- berapa baru boleh booking?',
        a: 'DP 50% buat kunci tanggal kamu ya. Sisa pelunasan pas hari H selesai sesi foto. Booking bisa dari H-3 bulan sampai H-7, tapi makin mepet takutnya bentrok. Mending dari H-14 biar aman.'
      },
      {
        q: 'Bisa gak sih dadakan? Besok mau dipotoin.',
        a: 'Bisa banget kalau jadwal kita kosong! Coba DM aja dulu. Kalau urgent/besok ada charge +Rp 100rb ya, soalnya kita harus atur ulang jadwal lain.'
      },
      {
        q: 'Kalau ujan/cuaca jelek gimana?',
        a: 'Tenang, bisa reschedule gratis 1x kok. Atau kita pindah ke lokasi indoor/cafe. Kita pastiin kamu tetep kepotoin dengan cakep.'
      }
    ]
  },
  {
    category: '2. HARGA & PAKET',
    items: [
      {
        q: 'Itu harga "mulai dari", nanti bisa nambah apa aja?',
        a: 'Bisa nambah kalau: lokasi di luar Malang Kota (harga menyesuaikan jarak), nambah jam +Rp 150rb/jam, nambah foto edit +Rp 15rb/foto, atau request cetak album. Tapi semua kita infoin di awal, jadi gak ada biaya kaget.'
      },
      {
        q: 'Kok murah? Hasilnya bagus gak?',
        a: 'Murah karena kita pake paket durasi pendek & efisien, bukan karena hasil asal-asalan. Cek aja hasil "potoin kamu" di IG @potoin.kamu buat buktiin.'
      },
      {
        q: 'Bisa nego gak? Budget aku pas-pasan.',
        a: 'Daripada nego, mending kamu ambil paket paling dasar terus nambah add-on dikit-dikit sesuai budget. Atau DM aja ceritain budget-mu, nanti kita racikin paket "potoin sebisanya" khusus buat kamu.'
      },
      {
        q: 'File aslinya dikasih semua gak?',
        a: 'Dikasih dong! Semua paket udah dapet BONUS semua file original via Google Drive. Jadi selain file edit pilihan, kamu tetep punya semua momen mentahnya.'
      }
    ]
  },
  {
    category: '3. TEKNIS SESI FOTO',
    items: [
      {
        q: 'Lokasinya di mana aja? Bisa di rumah?',
        a: 'Bisa banget! Kita ada 3 opsi: 1. Outdoor area Malang Kota — alun-alun, taman, kampus. 2. Home visit — kita yang dateng ke rumahmu. 3. Studio partner — ada biaya sewa mulai Rp 150rb/jam. Kamu pilih yang paling nyaman.'
      },
      {
        q: 'Outfit/bajunya harus gimana? Diajarin pose gak?',
        a: 'Pakai yang bikin kamu pede! Nanti H-7 kita kirim guide warna & outfit biar nyambung. Pas sesi juga bakal kita arahin pose kok, dijamin gak bakal kaku. Tim "potoin kamu" jagonya bikin suasana cair.'
      },
      {
        q: 'Aku malu kamera, bisa gak sih?',
        a: 'Justru itu tugas kita! 90% klien "potoin kamu" awalnya juga gitu. Kita ngobrol-ngobrol dulu, becanda, biar kamu lupa kalau lagi dipotoin. Hasilnya malah lebih natural.'
      },
      {
        q: 'Berapa lama fotonya jadi?',
        a: 'File original H+1 udah kita kirim. File edit: 3-7 hari kerja tergantung paketnya. Kalau mau express 1x24 jam bisa +Rp 200rb. Nanti H+1 kamu juga dapet 3-5 foto sneak peek buat diupload duluan.'
      }
    ]
  },
  {
    category: '4. LAIN-LAIN',
    items: [
      {
        q: 'Min berapa orang kalau mau foto grup?',
        a: 'Gak ada minimal! Sendiri bisa, ber-30 juga hayuk. Kalau di atas 6 orang, ambil paket "Potoin Keluarga Mini" atau "Potoin Event Mini" ya biar waktunya cukup.'
      },
      {
        q: 'Bisa bawa properti sendiri?',
        a: 'Boleh banget! Balon, buket, topi toga, properti jualanmu, bawa aja. Makin personal makin bagus.'
      },
      {
        q: '"potoin kamu" melayani luar kota Malang gak?',
        a: 'Melayani! Area Batu, Surabaya, dll bisa. Ada tambahan transport & akomodasi aja. DM buat quotation khusus luar kota ya.'
      }
    ]
  }
];

const availableTimeSlots = [
  '09.00 - 11.00 WIB (Pagi)',
  '13.00 - 15.00 WIB (Siang)',
  '16.00 - 18.00 WIB (Sore / Golden Hour)'
];

export default function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState<null | typeof categories[0]>(null);
  const [selectedSub, setSelectedSub] = useState<null | { name: string; price: string; duration: string; image: string }>(null);
  
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState(availableTimeSlots[0]);
  const [locationText, setLocationText] = useState('');

  const [openFaqIndex, setOpenFaqIndex] = useState<string | null>(null);

  const toggleFaq = (key: string) => {
    setOpenFaqIndex(openFaqIndex === key ? null : key);
  };

  const handleOpenBookingForm = (sub: { name: string; price: string; duration: string; image: string }) => {
    setSelectedSub(sub);
  };

  const handleFinalSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate) {
      alert('Mohon pilih tanggal pemotretan terlebih dahulu.');
      return;
    }

    const message = encodeURIComponent(
      `Halo Kak, saya ingin booking layanan Potoin Kamu:\n\n` +
      `📌 *Kategori*: ${selectedCategory?.title}\n` +
      `✨ *Paket*: ${selectedSub?.name} (${selectedSub?.price})\n` +
      `⏱️ *Durasi*: ${selectedSub?.duration}\n` +
      `📅 *Tanggal*: ${bookingDate}\n` +
      `⏰ *Jam / Slot*: ${bookingTime}\n` +
      `📍 *Lokasi / Google Maps*: ${locationText || 'Akan dikirim via chat'}\n\n` +
      `Mohon info ketersediaan jadwalnya ya kak. Terima kasih!`
    );

    window.open(`https://wa.me/628135353498?text=${message}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-amber-200">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
      />
      <style>{`
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Floating WhatsApp CTA */}
      <a
        href="https://wa.me/628135353498?text=Halo%20Kak,%20saya%20mau%20konsultasi%20dulu%20tentang%20jasa%20fotografinya."
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
            <img
              src="/logo.png"
              alt="Potoin Kamu Logo"
              className="object-contain h-full w-full"
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
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900">
                Portofolio & Kategori Foto
              </h2>
              <p className="text-neutral-500 text-sm mt-1">Geser ke samping untuk melihat pilihan kategori lainnya ➔</p>
            </div>

            {/* Horizontal Scrolling Card Grid */}
            <div className="flex overflow-x-auto no-scrollbar gap-6 py-6 px-4 snap-x snap-mandatory">
              {categories.map((cat, idx) => (
                <div
                  key={cat.id}
                  className="snap-center flex-shrink-0 w-[85%] md:w-[420px] rounded-3xl overflow-hidden bg-neutral-900 text-white shadow-xl flex flex-col justify-between p-6 md:p-8 relative"
                  style={{ minHeight: '450px' }}
                >
                  <div className="absolute inset-0 z-0">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover opacity-70 hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                  </div>

                  <div className="relative z-10 flex justify-between items-center">
                    <span className="bg-amber-500 text-black font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      Kategori Utama
                    </span>
                    <span className="text-xs text-amber-200 font-mono font-bold bg-black/40 px-2.5 py-1 rounded-md">
                      0{idx + 1} / 0{categories.length}
                    </span>
                  </div>

                  <div className="relative z-10 my-auto py-6">
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-md">
                      {cat.title}
                    </h3>
                    <p className="text-neutral-200 text-sm md:text-base font-light mb-6 drop-shadow">
                      {cat.tagline}
                    </p>

                    <button
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSelectedSub(null);
                      }}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold py-3.5 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/20 active:scale-[0.98]"
                    >
                      <span>Pilih Kategori Ini</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Potoin Aku Button */}
            <div className="text-center mt-12 mb-16">
              <button
                onClick={() => {
                  setSelectedCategory(categories[0]);
                  setSelectedSub(categories[0].subcategories[0]);
                }}
                className="bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 text-base tracking-wide"
              >
                Potoin aku sekarang ✨
              </button>
            </div>

            {/* Complete FAQ Section with Accordion */}
            <div className="mt-20 pt-12 border-t border-neutral-100 max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 text-amber-700 bg-amber-50 px-3.5 py-1 rounded-full text-xs font-semibold mb-2">
                  <HelpCircle className="w-3.5 h-3.5" />
                  FAQ "POTOIN KAMU"
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900">
                  Yang sering ditanyain sebelum booking
                </h3>
              </div>

              <div className="space-y-8">
                {faqsData.map((group, groupIdx) => (
                  <div key={groupIdx} className="space-y-3">
                    <h4 className="font-serif font-bold text-amber-800 text-lg border-b border-amber-200/50 pb-2">
                      {group.category}
                    </h4>
                    <div className="space-y-3">
                      {group.items.map((item, itemIdx) => {
                        const uniqueKey = `${groupIdx}-${itemIdx}`;
                        const isOpen = openFaqIndex === uniqueKey;
                        return (
                          <div 
                            key={itemIdx} 
                            className="bg-amber-50/20 border border-amber-200/50 rounded-2xl overflow-hidden shadow-sm transition-all"
                          >
                            <button
                              onClick={() => toggleFaq(uniqueKey)}
                              className="w-full text-left p-5 font-serif font-bold text-neutral-900 text-base md:text-lg flex justify-between items-center gap-4 hover:bg-amber-50/40 transition-colors"
                            >
                              <span>Q: {item.q}</span>
                              {isOpen ? <ChevronUp className="w-5 h-5 text-amber-700 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-amber-700 flex-shrink-0" />}
                            </button>
                            {isOpen && (
                              <div className="px-5 pb-5 text-neutral-600 text-sm md:text-base leading-relaxed border-t border-amber-100/60 pt-3">
                                <span className="font-bold text-neutral-800 mr-1">A:</span> {item.a}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ CTA */}
              <div className="mt-12 text-center bg-amber-50 border border-amber-200 rounded-3xl p-8 shadow-sm">
                <p className="font-serif font-bold text-neutral-900 text-lg mb-3">
                  Masih ada yang bingung? Langsung tanya aja, tim "potoin kamu" gak gigit kok 👉
                </p>
                <a
                  href="https://wa.me/628135353498?text=Halo%20Kak,%20saya%20mau%20tanya-tanya%20tentang%20jasa%20fotografinya."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                  <span>Chat WhatsApp Sekarang</span>
                </a>
              </div>
            </div>
          </>
        ) : !selectedSub ? (
          /* Focused Sub-Category View */
          <div className="max-w-3xl mx-auto bg-amber-50/40 border border-amber-200/60 rounded-3xl p-6 md:p-10 shadow-xl">
            <button
              onClick={() => setSelectedCategory(null)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800 hover:text-amber-950 mb-6 bg-white px-4 py-2 rounded-full shadow-sm border border-amber-200/60 transition-all hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Beranda & Kategori
            </button>

            <div className="border-b border-amber-200/60 pb-6 mb-8">
              <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
                Sub-Kategori & Portofolio Paket
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mt-3 mb-2">
                {selectedCategory.title}
              </h2>
              <p className="text-neutral-600 text-base">{selectedCategory.tagline}</p>
            </div>

            <div className="space-y-6">
              {selectedCategory.subcategories.map((sub, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100 hover:border-amber-300 transition-all duration-300 flex flex-col md:flex-row items-center gap-6"
                >
                  <div className="relative w-full md:w-44 h-40 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100 shadow-md">
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 w-full">
                    <h4 className="font-serif text-xl font-bold text-neutral-900 mb-1">{sub.name}</h4>
                    <p className="text-neutral-600 text-sm mb-3">{sub.desc}</p>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="font-mono text-amber-700 font-bold text-sm bg-amber-50 px-3 py-1 rounded-lg">
                        {sub.price}
                      </span>
                      <span className="text-xs text-neutral-500 flex items-center gap-1 bg-neutral-100 px-2.5 py-1 rounded-lg">
                        <Clock className="w-3.5 h-3.5 text-neutral-500" />
                        Estimasi: {sub.duration}
                      </span>
                    </div>
                    <button
                      onClick={() => handleOpenBookingForm(sub)}
                      className="w-full md:w-auto bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 text-sm flex items-center justify-center gap-2 shadow-md"
                    >
                      <Check className="w-4 h-4" />
                      <span>Pilih Paket Ini</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Booking & Schedule Slot Form */
          <div className="max-w-2xl mx-auto bg-white border border-amber-200/80 rounded-3xl p-6 md:p-10 shadow-xl">
            <button
              onClick={() => setSelectedSub(null)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800 hover:text-amber-950 mb-6 bg-amber-50 px-4 py-2 rounded-full shadow-sm border border-amber-200/60 transition-all hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Daftar Paket
            </button>

            <div className="flex items-center gap-4 border-b border-neutral-100 pb-5 mb-6">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100 shadow">
                <img src={selectedSub.image} alt={selectedSub.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Konfirmasi Jadwal
                </span>
                <h3 className="font-serif text-xl font-bold text-neutral-900 mt-1">
                  {selectedSub.name}
                </h3>
                <p className="text-amber-800 font-bold text-xs">{selectedSub.price} • {selectedSub.duration}</p>
              </div>
            </div>

            <form onSubmit={handleFinalSubmitWhatsApp} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  Pilih Tanggal Pemotretan
                </label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-neutral-800 bg-neutral-50"
                />
                <p className="text-xs text-neutral-500 mt-1">Pilih tanggal yang diinginkan untuk menghindari bentrok jadwal.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  Pilih Sesi Jam / Waktu
                </label>
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-neutral-800 bg-neutral-50"
                >
                  {availableTimeSlots.map((slot, i) => (
                    <option key={i} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  Lokasi / Tautan Google Maps
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Jl. Merdeka No. 10 (atau tempel link Google Maps di sini)"
                  value={locationText}
                  onChange={(e) => setLocationText(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-neutral-800 bg-neutral-50 text-sm"
                />
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs text-neutral-500">Klien dapat melampirkan link titik lokasi Google Maps.</span>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-amber-700 hover:underline flex items-center gap-1"
                  >
                    Buka Google Maps <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01]"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                  <span>Kirim Jadwal & Pesan via WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </section>

      <footer className="text-center py-8 text-neutral-400 text-xs border-t border-neutral-100">
        &copy; 2026 Potoin Kamu. All rights reserved. UMKM & Student Friendly Photography.
      </footer>
    </main>
  );
}