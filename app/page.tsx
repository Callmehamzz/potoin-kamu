'use client';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, ArrowLeft, Check, Calendar, Clock, MapPin, ExternalLink, HelpCircle, ChevronDown, ChevronUp, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

const categories = [
  {
    id: 'momenmu',
    title: 'Potoin Momenmu',
    tagline: 'Prewed, wisuda, keluarga, & momen spesialmu.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    subcategories: [
      { 
        id: 'wisuda',
        name: 'Potoin Kelulusanmu (Wisuda)', 
        desc: 'Abadikan momen kelulusanmu dengan gaya terbaik.', 
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
        packages: [
          { name: 'Potoin Aja (Basic)', price: 'Rp 250rb', spec: '45 menit • 1 lokasi kampus • 1 outfit • 8 foto edit', bonus: 'Semua file ori', ideal: 'Sendiri, budget pas' },
          { name: 'Potoin Puas (Best Seller)', price: 'Rp 450rb', spec: '1.5 jam • 2 lokasi kampus/ikon • 2 outfit • 20 foto edit', bonus: 'Semua file ori + 5 cetak 4R', ideal: 'Bareng bestie/doi, mau ganti outfit' },
          { name: 'Potoin Total (Pro)', price: 'Rp 750rb', spec: '2.5 jam • 3 lokasi bebas • 3 outfit + toga terbang • 40 foto edit', bonus: 'Semua file ori + 10 cetak 4R + Album mini', ideal: 'Sekeluarga, mau all-out' },
          { name: 'Potoin Semaumu (Custom)', price: 'Mulai Rp 1jt', spec: 'Sesukamu • Bebas tentuin lokasi & outfit • Sesuai request', bonus: 'Kita obrolin', ideal: 'Punya ide liar' }
        ]
      },
      { 
        id: 'prewed',
        name: 'Potoin Cinta Kalian (Prewed/Couple)', 
        desc: 'Konsep romantis, natural, & estetik.', 
        image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
        packages: [
          { name: 'Potoin Aja (Basic)', price: 'Rp 1jt', spec: '2 jam • 1 lokasi • 1 outfit • 25 foto edit', bonus: 'File ori + Moodboard', ideal: 'Foto santai sore-sore' },
          { name: 'Potoin Puas (Best Seller)', price: 'Rp 1,8jt', spec: '3 jam • 1-2 lokasi • 2 outfit • 40 foto edit', bonus: 'File ori + Cetak 10R 2pcs', ideal: 'Paket lengkap kebanyakan orang' },
          { name: 'Potoin Total (Pro)', price: 'Rp 3,5jt', spec: '6 jam (Half Day) • 3 lokasi • 4 outfit • 80 foto edit', bonus: 'File ori + Album 20x30 + Video teaser', ideal: 'Mau konsep + properti niat' },
          { name: 'Potoin Semaumu (Custom)', price: 'Mulai Rp 5jt', spec: 'Full day • Bebas luar kota OK • Sesuai request', bonus: 'Prewed konsep Bali? Bisa!', ideal: 'Mimpi prewed harus jadi' }
        ]
      },
      { 
        id: 'keluarga',
        name: 'Potoin Keluarga', 
        desc: 'Hangat, kasual, dan penuh kebersamaan.', 
        image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=800&q=80',
        packages: [
          { name: 'Potoin Aja (Basic)', price: 'Rp 350rb', spec: '1 jam • 1 lokasi indoor/outdoor • 1 kostum • 10 foto edit', bonus: 'Semua file ori', ideal: 'Keluarga kecil, santai' },
          { name: 'Potoin Puas (Best Seller)', price: 'Rp 650rb', spec: '2 jam • 2 lokasi • 2 kostum • 25 foto edit', bonus: 'Semua file ori + Cetak 10R', ideal: 'Keluarga besar, kumpul formasi lengkap' },
          { name: 'Potoin Total (Pro)', price: 'Rp 1,1jt', spec: '3 jam • Lokasi bebas + Studio • All-out • 50 foto edit', bonus: 'File ori + Album mini + 2 frame foto', ideal: 'Momen tahun baru / Lebaran' },
          { name: 'Potoin Semaumu (Custom)', price: 'Mulai Rp 1,5jt', spec: 'Sesuai request keluarga', bonus: 'Diskusi konsep bebas', ideal: 'Acara spesial keluarga besar' }
        ]
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
        id: 'birthday',
        name: 'Potoin Birthday / Party', 
        desc: 'Dokumentasi keseruan acara ulang tahun.', 
        image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
        packages: [
          { name: 'Potoin Aja (Basic)', price: 'Rp 300rb', spec: '1 jam liputan • 15 foto edit pilihan', bonus: 'Semua file ori', ideal: 'Acara tiup lilin intimate' },
          { name: 'Potoin Puas (Best Seller)', price: 'Rp 550rb', spec: '2 jam liputan • 35 foto edit pilihan', bonus: 'Semua file ori + Highlight video singkat', ideal: 'Pesta ulang tahun seru' },
          { name: 'Potoin Total (Pro)', price: 'Rp 950rb', spec: 'Full event liputan • 70 foto edit • Lighting profesional', bonus: 'Semua file ori + Album kolase', ideal: 'Sweet 17 / Acara besar' },
          { name: 'Potoin Semaumu (Custom)', price: 'Mulai Rp 1,2jt', spec: 'Durasi & kru menyesuaikan venue', bonus: 'Custom deliverables', ideal: 'Pesta megah / konsep unik' }
        ]
      },
      { 
        id: 'gathering',
        name: 'Potoin Gathering / Event', 
        desc: 'Liputan profesional event kantor atau komunitas.', 
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
        packages: [
          { name: 'Potoin Aja (Basic)', price: 'Rp 500rb', spec: 'Half day liputan • 30 foto edit', bonus: 'File ori hi-res', ideal: 'Workshop / meeting kecil' },
          { name: 'Potoin Puas (Best Seller)', price: 'Rp 950rb', spec: 'Full day liputan • 70 foto edit', bonus: 'File ori + Teaser reels IG', ideal: 'Gathering kantor / komunitas' },
          { name: 'Potoin Total (Pro)', price: 'Rp 1,7jt', spec: 'Multi-day / 2 fotografer • 150 foto edit', bonus: 'File ori + Cinematic video 1 menit', ideal: 'Event skala nasional / korporat' },
          { name: 'Potoin Semaumu (Custom)', price: 'Mulai Rp 2jt', spec: 'Sesuai Term of Reference (TOR) event', bonus: 'Full crew & gear support', ideal: 'Festival / Konser' }
        ]
      },
      { 
        id: 'wedding',
        name: 'Potoin Wedding Intimate', 
        desc: 'Liputan spesial hari pernikahan khidmat.', 
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
        packages: [
          { name: 'Potoin Aja (Basic)', price: 'Rp 1,2jt', spec: 'Akad / Pemberkatan saja • 4 jam • 50 foto edit', bonus: 'File ori + Box cetak', ideal: 'Nikahan sederhana & sakral' },
          { name: 'Potoin Puas (Best Seller)', price: 'Rp 2,5jt', spec: 'Akad + Resepsi (1 hari) • 8 jam • 120 foto edit', bonus: 'File ori + Cetak album kolase 20x30', ideal: 'Standar wedding idaman' },
          { name: 'Potoin Total (Pro)', price: 'Rp 4,5jt', spec: 'Full Day 2 Fotografer + Videografer Cinematic', bonus: 'Album eksklusif + Flashdisk custom + Teaser', ideal: 'All-out wedding celebration' },
          { name: 'Potoin Semaumu (Custom)', price: 'Mulai Rp 6jt', spec: 'Luar kota / Adat khusus / Multi-lokasi', bonus: 'Custom wedding package', ideal: 'Pernikahan impian skala besar' }
        ]
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
        id: 'umkm',
        name: 'Potoin Jualanmu (Produk UMKM)', 
        desc: 'Bikin pembeli langsung auto checkout!', 
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
        packages: [
          { name: 'Potoin Aja (Basic)', price: 'Rp 250rb', spec: '10 foto produk • 1 angle/produk • Background putih polos', bonus: 'File hi-res', ideal: 'Baru mulai, stok dikit' },
          { name: 'Potoin Puas (Best Seller)', price: 'Rp 500rb', spec: '20 foto produk • 2 angle/produk • Background putih + 1 warna', bonus: 'File hi-res + resize IG', ideal: 'Update feed bulanan' },
          { name: 'Potoin Total (Pro)', price: 'Rp 1,2jt', spec: '30 foto produk • 3 angle/produk • Konsep/themed + properti', bonus: 'File hi-res + resize + retouch detail', ideal: 'Launching produk baru' },
          { name: 'Potoin Semaumu (Custom)', price: 'Mulai Rp 1,5jt', spec: 'Sesuai kebutuhan • Angle bebas • Styling niat', bonus: 'Buat katalog full? Gas', ideal: 'Brand udah gede' }
        ]
      },
      { 
        id: 'kuliner',
        name: 'Potoin Menu-mu (Kuliner)', 
        desc: 'Menu makanan & minuman bikin ngiler.', 
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        packages: [
          { name: 'Potoin Aja (Basic)', price: 'Rp 200rb', spec: '10 menu makanan/minuman • Standar lighting', bonus: 'File siap upload GoFood/GrabFood', ideal: 'Cafe / warung baru buka' },
          { name: 'Potoin Puas (Best Seller)', price: 'Rp 450rb', spec: '25 menu • Flat lay & angle menggugah selera • Properti', bonus: 'File hi-res + bonus video reels 3 menu', ideal: 'Menu baru cafe / resto' },
          { name: 'Potoin Total (Pro)', price: 'Rp 900rb', spec: 'All menu resto + Suasana tempat & kitchen action', bonus: 'File hi-res + Buku menu digital design', ideal: 'Resto besar / franchise' },
          { name: 'Potoin Semaumu (Custom)', price: 'Mulai Rp 1,2jt', spec: 'Styling makanan khusus / Food stylist partner', bonus: 'Diskusi konsep menu', ideal: 'Resto eksklusif' }
        ]
      },
      { 
        id: 'headshot',
        name: 'Potoin Dirimu Kerja (Headshot)', 
        desc: 'Foto tim profesional & profil perusahaan.', 
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        packages: [
          { name: 'Potoin Aja (Basic)', price: 'Rp 150rb / org', spec: '30 menit per orang • 2 file edit', bonus: 'File ori', ideal: 'LinkedIn / Profil pribadi' },
          { name: 'Potoin Puas (Best Seller)', price: 'Rp 400rb / 3 org', spec: 'Paket tim kecil • Lighting studio portabel ke kantor', bonus: 'Masing-masing 3 file edit', ideal: 'Tim startup / UMKM' },
          { name: 'Potoin Total (Pro)', price: 'Rp 900rb / 10 org', spec: 'Satu divisi / perusahaan • Retouching profesional', bonus: 'File hi-res + Group photo bonus', ideal: 'Profil company website' },
          { name: 'Potoin Semaumu (Custom)', price: 'Mulai Rp 1,2jt', spec: 'Seluruh karyawan kantor', bonus: 'Datang langsung ke lokasi', ideal: 'Perusahaan skala menengah' }
        ]
      },
    ]
  }
];

// Menggunakan array yang diperbanyak hingga 20 kali lipat agar sangat panjang dan tidak pernah habis dirasakan user
const infiniteCategories = Array(20).fill(categories).flat();

const faqsData = [
  {
    category: '1. BOOKING & JADWAL',
    items: [
      {
        q: 'Gimana cara booking di "potoin kamu"?',
        a: 'Gampang! Tinggal klik tombol "Potoin Aku!" atau kalkulator interaktif di atas, pilih paket yang kamu mau, atau langsung WhatsApp kita. Ceritain mau potoin apa, tanggal berapa, dan di mana.'
      },
      {
        q: 'Harus DP berapa? H- berapa baru boleh booking?',
        a: 'DP 50% buat kunci tanggal kamu ya. Sisa pelunasan pas hari H selesai sesi foto. Booking bisa dari H-3 bulan sampai H-7.'
      },
      {
        q: 'Bisa gak sih dadakan? Besok mau dipotoin.',
        a: 'Bisa banget kalau jadwal kita kosong! Coba DM aja dulu. Kalau urgent/besok ada charge +Rp 100rb ya.'
      },
      {
        q: 'Kalau ujan/cuaca jelek gimana?',
        a: 'Tenang, bisa reschedule gratis 1x kok. Atau kita pindah ke lokasi indoor/cafe.'
      }
    ]
  },
  {
    category: '2. HARGA & PAKET',
    items: [
      {
        q: 'Itu harga "mulai dari", nanti bisa nambah apa aja?',
        a: 'Bisa nambah kalau: lokasi di luar Malang Kota, nambah jam +Rp 150rb/jam, nambah foto edit +Rp 15rb/foto, atau request cetak album. Semua transparan di awal.'
      },
      {
        q: 'Kok murah? Hasilnya bagus gak?',
        a: 'Murah karena kita pake paket durasi pendek & efisien, bukan karena hasil asal-asalan. Cek aja hasil "potoin kamu" di IG @potoin.kamu.'
      },
      {
        q: 'Bisa nego gak? Budget aku pas-pasan.',
        a: 'Daripada nego, mending kamu ambil paket paling dasar terus nambah add-on dikit-dikit sesuai budget, atau pakai paket custom Semaumu.'
      },
      {
        q: 'File aslinya dikasih semua gak?',
        a: 'Dikasih dong! Semua paket udah dapet BONUS semua file original via Google Drive.'
      }
    ]
  },
  {
    category: '3. TEKNIS SESI FOTO',
    items: [
      {
        q: 'Lokasinya di mana aja? Bisa di rumah?',
        a: 'Bisa banget! Outdoor area Malang Kota, Home visit (kita dateng ke rumahmu), atau Studio partner.'
      },
      {
        q: 'Outfit/bajunya harus gimana? Diajarin pose gak?',
        a: 'Pakai yang bikin kamu pede! Nanti H-7 kita kirim guide warna & outfit. Pas sesi juga bakal kita arahin posenya.'
      },
      {
        q: 'Aku malu kamera, bisa gak sih?',
        a: 'Justru itu tugas kita! Kita ngobrol-ngobrol dan becanda dulu biar kamu rileks.'
      },
      {
        q: 'Berapa lama fotonya jadi?',
        a: 'File original H+1 dikirim. File edit: 3-7 hari kerja tergantung paket.'
      }
    ]
  },
  {
    category: '4. LAIN-LAIN',
    items: [
      {
        q: 'Min berapa orang kalau mau foto grup?',
        a: 'Gak ada minimal! Sendiri bisa, ber-30 juga hayuk.'
      },
      {
        q: 'Bisa bawa properti sendiri?',
        a: 'Boleh banget! Balon, buket, topi toga, properti jualanmu, bawa aja.'
      },
      {
        q: '"potoin kamu" melayani luar kota Malang gak?',
        a: 'Melayani! Area Batu, Surabaya, dll bisa dengan tambahan transport & akomodasi.'
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
  const [selectedSub, setSelectedSub] = useState<null | typeof categories[0]['subcategories'][0]>(null);
  
  // Wizard / Kalkulator State
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardCatId, setWizardCatId] = useState(categories[0].id);
  const [wizardSubId, setWizardSubId] = useState(categories[0].subcategories[0].id);
  const [wizardPeopleCount, setWizardPeopleCount] = useState('1-2 orang');
  const [wizardDuration, setWizardDuration] = useState('Standar (1-2 jam)');
  const [wizardDate, setWizardDate] = useState('');
  const [wizardTime, setWizardTime] = useState(availableTimeSlots[0]);
  const [wizardLocation, setWizardLocation] = useState('');

  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState(availableTimeSlots[0]);
  const [locationText, setLocationText] = useState('');
  const [selectedPackageForBooking, setSelectedPackageForBooking] = useState<{ name: string; price: string; spec: string } | null>(null);

  const [openFaqIndex, setOpenFaqIndex] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Set posisi awal scroll di tengah agar pengguna bisa geser ke kiri/kanan sejauh apa pun secara bebas
  useEffect(() => {
    if (scrollRef.current) {
      const totalWidth = scrollRef.current.scrollWidth;
      scrollRef.current.scrollLeft = totalWidth / 2;
    }
  }, []);

  // Fungsi deteksi otomatis: jika pengguna menggeser mendekati ujung kiri atau kanan, posisinya diputar mulus kembali ke tengah
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    // Jika mendekati ujung kanan (sisa 300px), lompat mulus kembali ke tengah
    if (scrollLeft >= scrollWidth - clientWidth - 300) {
      scrollRef.current.scrollLeft = scrollWidth / 2;
    } 
    // Jika mendekati ujung kiri (sisa 300px), lompat mulus kembali ke tengah
    else if (scrollLeft <= 300) {
      scrollRef.current.scrollLeft = scrollWidth / 2;
    }
  };

  const scrollCard = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const toggleFaq = (key: string) => {
    setOpenFaqIndex(openFaqIndex === key ? null : key);
  };

  const handleOpenWizard = () => {
    setIsWizardOpen(true);
    setWizardStep(1);
  };

  const handleWizardSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wizardDate) {
      alert('Mohon pilih tanggal pemotretan terlebih dahulu.');
      return;
    }

    const currentCatObj = categories.find(c => c.id === wizardCatId);
    const currentSubObj = currentCatObj?.subcategories.find(s => s.id === wizardSubId);

    const message = encodeURIComponent(
      `Halo Kak, saya booking via Kalkulator Potoin Kamu:\n\n` +
      `📌 *Kategori*: ${currentCatObj?.title} - ${currentSubObj?.name}\n` +
      `👥 *Jumlah Orang/Produk*: ${wizardPeopleCount}\n` +
      `⏱️ *Durasi*: ${wizardDuration}\n` +
      `📅 *Tanggal*: ${wizardDate}\n` +
      `⏰ *Jam / Slot*: ${wizardTime}\n` +
      `📍 *Lokasi*: ${wizardLocation || 'Akan dikirim via chat'}\n\n` +
      `Mohon info ketersediaan jadwalnya ya kak. Terima kasih!`
    );

    window.open(`https://wa.me/628135353498?text=${message}`, '_blank');
    setIsWizardOpen(false);
  };

  const handlePackageBookingWhatsApp = (pkg: { name: string; price: string; spec: string }) => {
    setSelectedPackageForBooking(pkg);
  };

  const handleFinalBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate) {
      alert('Mohon pilih tanggal.');
      return;
    }

    const message = encodeURIComponent(
      `Halo Kak, saya ingin booking paket Potoin Kamu:\n\n` +
      `📌 *Sub-Kategori*: ${selectedSub?.name}\n` +
      `✨ *Paket*: ${selectedPackageForBooking?.name} (${selectedPackageForBooking?.price})\n` +
      `📋 *Detail*: ${selectedPackageForBooking?.spec}\n` +
      `📅 *Tanggal*: ${bookingDate}\n` +
      `⏰ *Jam / Slot*: ${bookingTime}\n` +
      `📍 *Lokasi*: ${locationText || 'Akan dikirim via chat'}\n\n` +
      `Mohon konfirmasinya ya kak!`
    );

    window.open(`https://wa.me/628135353498?text=${message}`, '_blank');
  };

  const activeWizardCat = categories.find(c => c.id === wizardCatId) || categories[0];

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
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-scale-pulse {
          animation: pulse-scale 2s ease-in-out infinite;
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

        <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-4 leading-tight">
          Your Story, Captured.
        </h1>
        <p className="text-neutral-600 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Jasa Fotografi Profesional untuk Segala Kebutuhanmu.
        </p>
      </header>

      {/* Main Section */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        {!selectedCategory ? (
          <>
            <div className="text-center mb-6">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900">
                Portofolio & Kategori Foto
              </h2>
              <p className="text-neutral-500 text-sm mt-1">Geser tanpa batas ke samping untuk melihat pilihan kategori lainnya ➔</p>
            </div>

            {/* Seamless Infinite Loop Horizontal Scrolling Card Grid */}
            <div className="relative max-w-5xl mx-auto">
              <button 
                onClick={() => scrollCard('left')}
                className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-xl rounded-full items-center justify-center text-neutral-800 hover:bg-amber-100 transition-all border border-neutral-200"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button 
                onClick={() => scrollCard('right')}
                className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-xl rounded-full items-center justify-center text-neutral-800 hover:bg-amber-100 transition-all border border-neutral-200"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto no-scrollbar gap-6 py-6 px-4 snap-x snap-mandatory scroll-smooth"
              >
                {infiniteCategories.map((cat, idx) => (
                  <div
                    key={`${cat.id}-${idx}`}
                    className="snap-center flex-shrink-0 w-[85%] md:w-[380px] rounded-3xl overflow-hidden bg-neutral-900 text-white shadow-xl flex flex-col justify-end p-6 md:p-8 relative"
                    style={{ minHeight: '450px' }}
                  >
                    <div className="absolute inset-0 z-0">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover opacity-75 hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                    </div>

                    <div className="relative z-10 mt-auto flex flex-col justify-end">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-1 drop-shadow-md">
                            {cat.title}
                          </h3>
                          <p className="text-neutral-300 text-sm font-light drop-shadow">
                            {cat.tagline}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedCategory(cat);
                            setSelectedSub(null);
                          }}
                          className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold py-2 px-4 rounded-xl text-xs flex items-center gap-1 shadow-lg transition-all flex-shrink-0"
                        >
                          <span>Pilih Kategori</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Potoin Aku Sekarang Button -> Opens Wizard */}
            <div className="text-center mt-12 mb-16">
              <button
                onClick={handleOpenWizard}
                className="bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 text-base tracking-wide animate-scale-pulse"
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
            </div>
          </>
        ) : !selectedSub ? (
          /* Sub-Category View */
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
              {selectedCategory.subcategories.map((sub) => (
                <div
                  key={sub.id}
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
                    <p className="text-neutral-600 text-sm mb-4">{sub.desc}</p>
                    <button
                      onClick={() => setSelectedSub(sub)}
                      className="w-full md:w-auto bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 text-sm flex items-center justify-center gap-2 shadow-md"
                    >
                      <Check className="w-4 h-4" />
                      <span>Pilih Sub-Kategori Ini</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : !selectedPackageForBooking ? (
          /* Detailed 4 Cards View */
          <div className="max-w-4xl mx-auto bg-amber-50/40 border border-amber-200/60 rounded-3xl p-6 md:p-10 shadow-xl">
            <button
              onClick={() => setSelectedSub(null)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800 hover:text-amber-950 mb-6 bg-white px-4 py-2 rounded-full shadow-sm border border-amber-200/60 transition-all hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Sub-Kategori
            </button>

            <div className="border-b border-amber-200/60 pb-6 mb-8">
              <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
                Pilihan Paket: {selectedSub.name}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900 mt-2 mb-1">
                Pilih Paket yang Sesuai Budget & Keinginanmu
              </h2>
              <p className="text-neutral-600 text-sm">Setiap paket sudah dirancang transparan tanpa biaya tersembunyi.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedSub.packages.map((pkg, i) => {
                const isCustom = pkg.name.includes('Semaumu');
                return (
                  <div 
                    key={i}
                    className={`rounded-3xl p-6 border shadow-md flex flex-col justify-between transition-all ${
                      isCustom 
                        ? 'bg-amber-50 border-amber-300 md:col-span-2' 
                        : 'bg-white border-neutral-200 hover:border-amber-400'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-serif text-xl font-bold text-neutral-900">{pkg.name}</h3>
                        <span className="bg-amber-100 text-amber-900 font-mono font-bold text-sm px-3 py-1 rounded-full">
                          {pkg.price}
                        </span>
                      </div>
                      
                      {!isCustom ? (
                        <div className="space-y-2 mb-6 text-sm text-neutral-700">
                          <p className="font-medium text-neutral-900">📦 {pkg.spec}</p>
                          <p className="text-emerald-700 font-medium">🎁 Bonus: {pkg.bonus}</p>
                          <p className="text-neutral-500 italic text-xs">💡 Cocok buat: {pkg.ideal}</p>
                        </div>
                      ) : (
                        <div className="space-y-2 mb-6 text-sm text-neutral-700">
                          <p className="font-serif font-bold text-amber-900 text-base">Punya ide sendiri?</p>
                          <p className="text-neutral-700">Budget & konsep bisa kita sesuaikan. Ceritain aja mau kamu dipotoin kayak gimana!</p>
                        </div>
                      )}
                    </div>

                    {!isCustom ? (
                      <button
                        onClick={() => handlePackageBookingWhatsApp(pkg)}
                        className="w-full bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-white font-semibold py-3 px-4 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow"
                      >
                        <Check className="w-4 h-4" />
                        <span>Pilih Paket Ini</span>
                      </button>
                    ) : (
                      <a
                        href="https://wa.me/628135353498?text=Halo%20Kak,%20saya%20punya%20ide%20konsep%20custom%20sendiri%20untuk%20sesi%20foto."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow"
                      >
                        <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                        <span>Konsultasi Gratis via WhatsApp</span>
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Final Booking Form */
          <div className="max-w-2xl mx-auto bg-white border border-amber-200/80 rounded-3xl p-6 md:p-10 shadow-xl">
            <button
              onClick={() => setSelectedPackageForBooking(null)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800 hover:text-amber-950 mb-6 bg-amber-50 px-4 py-2 rounded-full shadow-sm border border-amber-200/60 transition-all hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Daftar Paket
            </button>

            <div className="border-b border-neutral-100 pb-5 mb-6">
              <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Konfirmasi Jadwal & Paket
              </span>
              <h3 className="font-serif text-xl font-bold text-neutral-900 mt-1">
                {selectedPackageForBooking.name} ({selectedPackageForBooking.price})
              </h3>
              <p className="text-neutral-600 text-xs mt-1">{selectedPackageForBooking.spec}</p>
            </div>

            <form onSubmit={handleFinalBookingSubmit} className="space-y-5">
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
                  placeholder="Contoh: Jl. Merdeka No. 10 (atau tempel link Google Maps)"
                  value={locationText}
                  onChange={(e) => setLocationText(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-neutral-800 bg-neutral-50 text-sm"
                />
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

      {/* WIZARD MODAL / KALKULATOR "Potoin Aku Sekarang" */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <h3 className="font-serif text-xl font-bold text-neutral-900">Kalkulator "Potoin Aku"</h3>
              </div>
              <button 
                onClick={() => setIsWizardOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-neutral-600 hover:bg-neutral-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleWizardSubmitWhatsApp} className="space-y-5">
              {wizardStep === 1 && (
                <div className="space-y-4">
                  <label className="block font-semibold text-neutral-900 text-base">1. Pilih Kategori Utama:</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {categories.map(c => (
                      <button
                        type="button"
                        key={c.id}
                        onClick={() => {
                          setWizardCatId(c.id);
                          setWizardSubId(c.subcategories[0].id);
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          wizardCatId === c.id ? 'border-amber-500 bg-amber-50/60 font-bold' : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        {c.title}
                      </button>
                    ))}
                  </div>

                  <label className="block font-semibold text-neutral-900 text-base mt-4">Pilih Sub-Kategori Spesifik:</label>
                  <div className="grid grid-cols-1 gap-2">
                    {activeWizardCat.subcategories.map(sub => (
                      <button
                        type="button"
                        key={sub.id}
                        onClick={() => setWizardSubId(sub.id)}
                        className={`p-3 rounded-xl border text-left text-sm transition-all ${
                          wizardSubId === sub.id ? 'border-amber-500 bg-amber-50 font-semibold' : 'border-neutral-200'
                        }`}
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setWizardStep(2)}
                    className="w-full mt-6 bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-white font-semibold py-3.5 rounded-xl transition-all"
                  >
                    Selanjutnya ➔
                  </button>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-4">
                  <label className="block font-semibold text-neutral-900 text-base">2. Detail Orang, Durasi & Tanggal:</label>
                  
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1">Jumlah Orang / Produk:</label>
                    <input 
                      type="text" 
                      value={wizardPeopleCount}
                      onChange={(e) => setWizardPeopleCount(e.target.value)}
                      placeholder="Contoh: Sendiri, 2 orang, atau 15 produk"
                      className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-amber-500 bg-neutral-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1">Estimasi Waktu / Durasi:</label>
                    <input 
                      type="text" 
                      value={wizardDuration}
                      onChange={(e) => setWizardDuration(e.target.value)}
                      placeholder="Contoh: 1 jam, Half day"
                      className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-amber-500 bg-neutral-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1">Pilih Tanggal Foto:</label>
                    <input 
                      type="date" 
                      required
                      value={wizardDate}
                      onChange={(e) => setWizardDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-amber-500 bg-neutral-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1">Pilih Sesi Jam:</label>
                    <select
                      value={wizardTime}
                      onChange={(e) => setWizardTime(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-amber-500 bg-neutral-50"
                    >
                      {availableTimeSlots.map((slot, i) => (
                        <option key={i} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1">Lokasi Foto (Opsional):</label>
                    <input 
                      type="text" 
                      value={wizardLocation}
                      onChange={(e) => setWizardLocation(e.target.value)}
                      placeholder="Contoh: Alun-alun Malang / Kampus UB"
                      className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-amber-500 bg-neutral-50"
                    />
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setWizardStep(1)}
                      className="w-1/3 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-semibold py-3.5 rounded-xl transition-all text-sm"
                    >
                      Kembali
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm"
                    >
                      <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                      <span>Kirim Request ke WhatsApp</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      <footer className="text-center py-8 text-neutral-400 text-xs border-t border-neutral-100">
        &copy; 2026 Potoin Kamu. All rights reserved. UMKM & Student Friendly Photography.
      </footer>
    </main>
  );
}