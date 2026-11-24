'use client';
import { useState, useRef, useEffect } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { MessageCircle, ArrowLeft, Check, Calendar, Clock, MapPin, ChevronDown, ChevronUp, ChevronRight, ChevronLeft, Sparkles, User, Menu, X } from 'lucide-react';

/* ============================================================
   KONSTANTA & TIPE
   ============================================================ */

const WA_NUMBER = '628135353498';

type PackageItem = { name: string; price: string; spec: string; bonus: string; ideal: string };
type SubCategory = { id: string; name: string; desc: string; image: string; packages: PackageItem[] };
type Category = { id: string; title: string; tagline: string; image: string; subcategories: SubCategory[] };

type LocationData = {
  type: string;     // id jenis lokasi
  area: string;     // wilayah layanan
  address: string;  // nama spot / alamat lengkap (teks manual)
  landmark: string; // patokan atau catatan tambahan (opsional)
};

const popularSpots = [
  'Alun-Alun Kota Malang',
  'Kayutangan Heritage',
  'Universitas Brawijaya'
];

const locationTypes = [
  {
    id: 'outdoor',
    label: 'Outdoor / spot populer',
    addressLabel: 'Nama spot atau alamat',
    placeholder: 'Mis. Alun-Alun Kota Malang, atau Jl. Ijen, Malang',
    required: true
  },
  {
    id: 'home',
    label: 'Home visit (rumahku)',
    addressLabel: 'Alamat rumah lengkap',
    placeholder: 'Jalan, nomor rumah, RT/RW, kelurahan',
    required: true
  },
  {
    id: 'venue',
    label: 'Venue acara / kampus',
    addressLabel: 'Nama venue dan alamatnya',
    placeholder: 'Mis. nama gedung / kampus / kafe, jalan, kelurahan',
    required: true
  },
  {
    id: 'studio',
    label: 'Studio partner',
    addressLabel: 'Preferensi studio (opsional)',
    placeholder: 'Kosongkan kalau mau kami yang rekomendasikan',
    required: false
  }
];

const areaOptions = ['Kota Malang', 'Kabupaten Malang', 'Kota Batu', 'Luar kota (Surabaya, dll)'];
const transportAreas = ['Kota Batu', 'Luar kota (Surabaya, dll)'];

const emptyLocation: LocationData = {
  type: locationTypes[0].id,
  area: areaOptions[0],
  address: '',
  landmark: ''
};

const availableTimeSlots = [
  '09.00 - 11.00 WIB (Pagi)',
  '13.00 - 15.00 WIB (Siang)',
  '16.00 - 18.00 WIB (Sore / Golden Hour)'
];

const navLinks = [
  { id: 'kategori', label: 'Kategori' },
  { id: 'layanan', label: 'Layanan' },
  { id: 'tentang', label: 'Tentang' },
  { id: 'cara-booking', label: 'Cara booking' },
  { id: 'faq', label: 'FAQ' },
  { id: 'kontak', label: 'Kontak' }
];

// Teks deskripsi pada slide kategori (tidak mengubah struktur data kategori)
const heroCopy: Record<string, string> = {
  momenmu: 'Wisuda, prewed, dan foto keluarga. Abadikan momen spesialmu dengan gaya yang santai, natural, dan penuh cerita.',
  acaramu: 'Liputan ulang tahun, gathering, event komunitas, sampai wedding intimate, supaya setiap momen seru tidak terlewat.',
  bisnismu: 'Foto produk UMKM, menu kuliner untuk GoFood dan GrabFood, serta headshot tim, biar usahamu tampil meyakinkan.'
};

const aboutPoints = [
  'Harga transparan, tanpa biaya tersembunyi.',
  'Semua paket dapat file original lewat Google Drive.',
  'Reschedule gratis 1x kalau cuaca kurang bersahabat.'
];

const bookingSteps = [
  {
    title: 'Pilih kategori dan paket',
    desc: 'Lihat pilihan paket di tiap kategori, atau pakai kalkulator Potoin Aku untuk dipandu langkah demi langkah.'
  },
  {
    title: 'Isi jadwal dan lokasi',
    desc: 'Tentukan tanggal, sesi jam, dan lokasi pemotretan. Cukup tulis nama spot atau alamat lengkapnya.'
  },
  {
    title: 'Kirim ke WhatsApp dan DP',
    desc: 'Detail pesananmu otomatis dirangkum di chat. DP 50% untuk mengunci tanggal.'
  },
  {
    title: 'Sesi foto dan pelunasan',
    desc: 'Pelunasan dilakukan setelah sesi foto selesai. Semua hasil dikirim lewat Google Drive.'
  }
];

const serviceAreas = [
  {
    name: 'Kota dan Kabupaten Malang',
    desc: 'Wilayah layanan utama kami, tanpa biaya transport tambahan.'
  },
  {
    name: 'Kota Batu',
    desc: 'Tersedia dengan tambahan biaya transport. Nominalnya dikonfirmasi lewat WhatsApp.'
  },
  {
    name: 'Surabaya dan kota lainnya',
    desc: 'Tersedia dengan tambahan biaya transport. Nominalnya dikonfirmasi lewat WhatsApp.'
  }
];

const categories: Category[] = [
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
          { name: 'Potoin Semaumu (Custom)', price: 'Mulai Rp 1,2jt', spec: 'Seluruh karyawan kantor', bonus: 'Datang langsung ke lokasi', ideal: 'Perusahaan skala menengah' },
        ]
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
        a: 'Gampang! Tinggal klik tombol "Hitung pesananku" atau pilih langsung paket yang kamu mau di bagian kategori, atau langsung WhatsApp kita.'
      },
      {
        q: 'Harus DP berapa? H- berapa baru boleh booking?',
        a: 'DP 50% buat kunci tanggal kamu ya. Sisa pelunasan pas hari H selesai sesi foto.'
      },
      {
        q: 'Bisa gak sih dadakan? Besok mau dipotoin.',
        a: 'Bisa banget kalau jadwal kita kosong! Coba DM aja dulu.'
      },
      {
        q: 'Kalau ujan/cuaca jelek gimana?',
        a: 'Tenang, bisa reschedule gratis 1x kok atau pindah lokasi indoor.'
      }
    ]
  },
  {
    category: '2. HARGA & PAKET',
    items: [
      {
        q: 'Itu harga "mulai dari", nanti bisa nambah apa aja?',
        a: 'Bisa nambah jam, nambah foto edit, atau request cetak album. Semua transparan di awal.'
      },
      {
        q: 'File aslinya dikasih semua gak?',
        a: 'Dikasih dong! Semua paket udah dapet bonus file original via Google Drive.'
      }
    ]
  },
  {
    category: '3. TEKNIS SESI FOTO',
    items: [
      {
        q: 'Lokasinya di mana aja? Bisa di rumah?',
        a: 'Bisa outdoor, home visit ke rumahmu, atau studio partner.'
      },
      {
        q: 'Aku malu kamera, bisa gak sih?',
        a: 'Justru itu tugas kita! Kita ngobrol-ngobrol dulu biar rileks.'
      }
    ]
  },
  {
    category: '4. LAIN-LAIN',
    items: [
      {
        q: '"potoin kamu" melayani luar kota Malang gak?',
        a: 'Melayani! Area Batu, Surabaya, dll dengan tambahan transport.'
      }
    ]
  }
];

// Daftar datar semua sub-kategori untuk grid Layanan
const allServices = categories.flatMap(cat => cat.subcategories.map(sub => ({ cat, sub })));

/* ============================================================
   FUNGSI BANTU
   ============================================================ */

const isCustomPackage = (pkg: PackageItem) => pkg.name.includes('Semaumu');

// Versi resolusi lebih besar untuk foto latar slider layar penuh
const bigImage = (url: string) => url.replace('w=800', 'w=1600');

// Mengubah "2026-11-20" menjadi "Jumat, 20 November 2026" tanpa pergeseran zona waktu
const formatDateID = (iso: string) => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

// Validasi lokasi: mengembalikan pesan error, atau undefined kalau sudah benar
const validateLocation = (loc: LocationData): string | undefined => {
  const t = locationTypes.find(x => x.id === loc.type) ?? locationTypes[0];
  if (t.required && loc.address.trim().length < 3) {
    return 'Isi nama spot atau alamat lokasi sesi foto.';
  }
  return undefined;
};

// Merangkum lokasi menjadi teks rapi untuk pesan WhatsApp
const buildLocationText = (loc: LocationData): string => {
  const t = locationTypes.find(x => x.id === loc.type) ?? locationTypes[0];
  const lines: string[] = [`${t.label} - ${loc.area}`];
  if (loc.address.trim()) lines.push(loc.address.trim());
  if (loc.landmark.trim()) lines.push(`Patokan: ${loc.landmark.trim()}`);
  if (transportAreas.includes(loc.area)) lines.push('Catatan: area ini ada tambahan transport');
  return lines.join('\n   ');
};

const inputClass = (hasError?: boolean) =>
  `w-full px-4 py-3 rounded-xl border ${
    hasError ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-neutral-200 focus:border-amber-500 focus:ring-amber-200'
  } focus:ring-2 outline-none text-neutral-800 bg-neutral-50 text-sm`;

/* ============================================================
   KOMPONEN KECIL
   ============================================================ */

// Efek muncul saat di-scroll: naik pelan + fade-in, sekali saja per elemen
function Reveal({
  children,
  delay = 0,
  className = ''
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
      className={`reveal transition-all duration-700 ease-out ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function SectionTitle({ label, title, desc }: { label: string; title: string; desc?: string }) {
  return (
    <Reveal className="text-center mb-10 md:mb-12">
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-700">{label}</p>
      <h2 className="font-serif text-2xl md:text-4xl font-bold text-neutral-900 mt-2">{title}</h2>
      <div className="w-14 h-1 bg-amber-400 rounded-full mx-auto mt-4" />
      {desc && <p className="text-neutral-500 text-sm md:text-base mt-4 max-w-2xl mx-auto">{desc}</p>}
    </Reveal>
  );
}

function Field({
  label,
  icon,
  error,
  htmlFor,
  children
}: {
  label: string;
  icon?: ReactNode;
  error?: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-neutral-800 mb-2 flex items-center gap-2">
        {icon}
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-red-600 mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
}

// Kolom lokasi terstruktur (teks manual, tanpa peta / sharelock)
function LocationFields({
  value,
  onChange,
  error,
  idPrefix
}: {
  value: LocationData;
  onChange: (next: LocationData) => void;
  error?: string;
  idPrefix: string;
}) {
  const typeInfo = locationTypes.find(t => t.id === value.type) ?? locationTypes[0];
  const showSpots = value.type === 'outdoor';
  const needsTransport = transportAreas.includes(value.area);
  const set = (patch: Partial<LocationData>) => onChange({ ...value, ...patch });

  return (
    <div className="space-y-4">
      <div>
        <span className="text-xs font-semibold text-neutral-600 mb-1.5 block">Jenis lokasi</span>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Jenis lokasi">
          {locationTypes.map(t => {
            const active = value.type === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => set({ type: t.id })}
                className={`text-xs px-3.5 py-2 rounded-full border transition-colors ${
                  active
                    ? 'bg-neutral-900 text-white border-neutral-900 font-semibold'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-amber-400'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-area`} className="text-xs font-semibold text-neutral-600 mb-1.5 block">
          Wilayah
        </label>
        <select
          id={`${idPrefix}-area`}
          value={value.area}
          onChange={e => set({ area: e.target.value })}
          className={inputClass()}
        >
          {areaOptions.map(a => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        {needsTransport && (
          <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-2">
            Area ini ada tambahan biaya transport. Nominalnya kami konfirmasi lewat WhatsApp.
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${idPrefix}-address`} className="text-xs font-semibold text-neutral-600 mb-1.5 block">
          {typeInfo.addressLabel}
        </label>
        <textarea
          id={`${idPrefix}-address`}
          rows={2}
          value={value.address}
          onChange={e => set({ address: e.target.value })}
          placeholder={typeInfo.placeholder}
          aria-invalid={!!error}
          className={inputClass(!!error)}
        />
        {showSpots && (
          <div className="flex flex-wrap gap-2 mt-2">
            {popularSpots.map(spot => (
              <button
                type="button"
                key={spot}
                onClick={() => set({ address: spot, area: areaOptions[0] })}
                className="text-xs px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 hover:bg-amber-100 transition-colors"
              >
                {spot}
              </button>
            ))}
          </div>
        )}
        {error && (
          <p role="alert" className="text-xs text-red-600 mt-1.5">
            {error}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${idPrefix}-landmark`} className="text-xs font-semibold text-neutral-600 mb-1.5 block">
          Patokan atau catatan (opsional)
        </label>
        <input
          id={`${idPrefix}-landmark`}
          type="text"
          value={value.landmark}
          onChange={e => set({ landmark: e.target.value })}
          placeholder="Mis. depan toko biru, masuk gang sebelah masjid"
          className={inputClass()}
        />
      </div>
    </div>
  );
}

/* ============================================================
   HALAMAN UTAMA
   ============================================================ */

export default function LandingPage() {
  // Navigasi tampilan
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSub, setSelectedSub] = useState<SubCategory | null>(null);
  const [selectedPackageForBooking, setSelectedPackageForBooking] = useState<PackageItem | null>(null);

  // Slider kategori (tidak berpindah otomatis, hanya saat digeser / diklik)
  const [slide, setSlide] = useState(0);

  // Form booking paket
  const [bookingName, setBookingName] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState(availableTimeSlots[0]);
  const [bookingLoc, setBookingLoc] = useState<LocationData>(emptyLocation);
  const [bookingErrors, setBookingErrors] = useState<Record<string, string>>({});

  // Wizard / kalkulator
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardCatId, setWizardCatId] = useState(categories[0].id);
  const [wizardSubId, setWizardSubId] = useState(categories[0].subcategories[0].id);
  const [wizardPkgIdx, setWizardPkgIdx] = useState<number | null>(null);
  const [wizardName, setWizardName] = useState('');
  const [wizardPeople, setWizardPeople] = useState('');
  const [wizardDate, setWizardDate] = useState('');
  const [wizardTime, setWizardTime] = useState(availableTimeSlots[0]);
  const [wizardLoc, setWizardLoc] = useState<LocationData>(emptyLocation);
  const [wizardNote, setWizardNote] = useState('');
  const [wizardErrors, setWizardErrors] = useState<Record<string, string>>({});

  // Lain-lain
  const [minDate, setMinDate] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<string | null>(null);
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const logoRef = useRef<HTMLImageElement>(null);
  const prevViewKey = useRef<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // Tanggal minimum = hari ini (waktu lokal perangkat), dihitung di client agar tidak terjadi mismatch hydration
  useEffect(() => {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    setMinDate(local.toISOString().split('T')[0]);
  }, []);

  // Jika logo sudah gagal dimuat sebelum hydration selesai, onError terlewat: cek ulang di sini
  useEffect(() => {
    const img = logoRef.current;
    if (img && img.complete && img.naturalWidth === 0) setLogoError(true);
  }, []);

  // Scroll ke atas hanya saat tampilan benar-benar berpindah (kategori -> sub -> paket -> form),
  // bukan saat halaman pertama kali dibuka
  useEffect(() => {
    const key = `${selectedCategory?.id ?? ''}|${selectedSub?.id ?? ''}|${selectedPackageForBooking?.name ?? ''}`;
    if (prevViewKey.current !== null && prevViewKey.current !== key) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    prevViewKey.current = key;
  }, [selectedCategory, selectedSub, selectedPackageForBooking]);

  // Modal wizard: tutup dengan Escape dan kunci scroll halaman di belakangnya
  useEffect(() => {
    if (!isWizardOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsWizardOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isWizardOpen]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4500);
  };

  const openWhatsApp = (text: string) => {
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    const win = window.open(url, '_blank');
    if (win) {
      win.opener = null;
    } else {
      // Popup diblokir browser: buka di tab yang sama
      window.location.href = url;
      return;
    }
    showToast('Membuka WhatsApp. Tinggal kirim pesannya ya!');
  };

  /* ---------- Slider kategori ---------- */

  // Dari slide terakhir, geser selanjutnya kembali ke slide pertama (dan sebaliknya)
  const nextSlide = () => setSlide(i => (i + 1) % categories.length);
  const prevSlide = () => setSlide(i => (i - 1 + categories.length) % categories.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) nextSlide();
      else prevSlide();
    }
  };

  const handleSliderKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  };

  const toggleFaq = (key: string) => {
    setOpenFaqIndex(openFaqIndex === key ? null : key);
  };

  const resetViews = () => {
    setSelectedCategory(null);
    setSelectedSub(null);
    setSelectedPackageForBooking(null);
  };

  const openSub = (cat: Category, sub: SubCategory) => {
    setSelectedCategory(cat);
    setSelectedSub(sub);
    setSelectedPackageForBooking(null);
  };

  const goHome = () => {
    setIsMenuOpen(false);
    if (selectedCategory) {
      resetViews();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToSection = (id: string) => {
    setIsMenuOpen(false);
    const onHome = !selectedCategory;
    if (!onHome) resetViews();
    window.setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      onHome ? 0 : 250
    );
  };

  /* ---------- Wizard ---------- */

  const activeWizardCat = categories.find(c => c.id === wizardCatId) || categories[0];
  const activeWizardSub =
    activeWizardCat.subcategories.find(s => s.id === wizardSubId) || activeWizardCat.subcategories[0];
  const wizardPkg = wizardPkgIdx !== null ? activeWizardSub.packages[wizardPkgIdx] : null;

  const handleOpenWizard = () => {
    setIsMenuOpen(false);
    setIsWizardOpen(true);
    setWizardStep(1);
    setWizardErrors({});
  };

  const handleWizardNext = () => {
    if (wizardStep === 2 && wizardPkgIdx === null) {
      setWizardErrors({ pkg: 'Pilih salah satu paket dulu ya.' });
      return;
    }
    setWizardErrors({});
    setWizardStep(s => Math.min(3, s + 1));
  };

  const handleWizardSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (wizardStep !== 3 || !wizardPkg) return;

    const errs: Record<string, string> = {};
    if (!wizardName.trim()) errs.name = 'Isi nama pemesan.';
    if (!wizardDate) errs.date = 'Pilih tanggal pemotretan.';
    else if (minDate && wizardDate < minDate) errs.date = 'Tanggal tidak boleh sudah lewat.';
    const locErr = validateLocation(wizardLoc);
    if (locErr) errs.location = locErr;
    setWizardErrors(errs);
    if (Object.keys(errs).length) return;

    const lines = [
      'Halo Kak, saya booking via Kalkulator Potoin Kamu:',
      '',
      `🙋 *Nama*: ${wizardName.trim()}`,
      `📌 *Kategori*: ${activeWizardCat.title} - ${activeWizardSub.name}`,
      `✨ *Paket*: ${wizardPkg.name} (${wizardPkg.price})`,
      `📋 *Detail*: ${wizardPkg.spec}`
    ];
    if (wizardPeople.trim()) lines.push(`👥 *Jumlah orang/produk*: ${wizardPeople.trim()}`);
    lines.push(
      `📅 *Tanggal*: ${formatDateID(wizardDate)}`,
      `⏰ *Jam / slot*: ${wizardTime}`,
      `📍 *Lokasi*:\n   ${buildLocationText(wizardLoc)}`
    );
    if (wizardNote.trim()) lines.push(`📝 *Catatan*: ${wizardNote.trim()}`);
    lines.push('', 'Mohon info ketersediaan jadwalnya ya kak. Terima kasih!');

    openWhatsApp(lines.join('\n'));
    setIsWizardOpen(false);
  };

  /* ---------- Booking dari kartu paket ---------- */

  const handleFinalBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedPackageForBooking) return;

    const errs: Record<string, string> = {};
    if (!bookingName.trim()) errs.name = 'Isi nama pemesan.';
    if (!bookingDate) errs.date = 'Pilih tanggal pemotretan.';
    else if (minDate && bookingDate < minDate) errs.date = 'Tanggal tidak boleh sudah lewat.';
    const locErr = validateLocation(bookingLoc);
    if (locErr) errs.location = locErr;
    setBookingErrors(errs);
    if (Object.keys(errs).length) return;

    const lines = [
      'Halo Kak, saya ingin booking paket Potoin Kamu:',
      '',
      `🙋 *Nama*: ${bookingName.trim()}`,
      `📌 *Sub-kategori*: ${selectedSub?.name}`,
      `✨ *Paket*: ${selectedPackageForBooking.name} (${selectedPackageForBooking.price})`,
      `📋 *Detail*: ${selectedPackageForBooking.spec}`,
      `📅 *Tanggal*: ${formatDateID(bookingDate)}`,
      `⏰ *Jam / slot*: ${bookingTime}`,
      `📍 *Lokasi*:\n   ${buildLocationText(bookingLoc)}`,
      '',
      'Mohon konfirmasinya ya kak!'
    ];
    openWhatsApp(lines.join('\n'));
  };

  const wizardStepLabels = ['Kategori', 'Paket', 'Jadwal & lokasi'];
  const filteredServices = allServices.filter(s => serviceFilter === 'all' || s.cat.id === serviceFilter);
  const waConsultUrl = `https://wa.me/${WA_NUMBER}?text=Halo%20Kak,%20saya%20mau%20konsultasi%20dulu%20tentang%20jasa%20fotografinya.`;

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
        html {
          scroll-behavior: smooth;
        }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .slide-anim { transition: none !important; }
        }
      `}</style>

      {/* Toast notifikasi */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] bg-neutral-900 text-white text-sm font-medium px-5 py-3 rounded-full shadow-2xl max-w-[90vw] text-center"
        >
          {toast}
        </div>
      )}

      {/* Floating WhatsApp CTA */}
      <a
        href={waConsultUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Konsultasi dulu via WhatsApp"
        className="fixed bottom-5 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2.5 bg-emerald-600 text-white px-4 py-3 md:px-5 md:py-3.5 rounded-full shadow-2xl hover:bg-emerald-700 transition-all duration-300 hover:scale-105 font-medium text-sm md:text-base border border-emerald-500/30"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
        <span className="hidden sm:inline tracking-wide">konsultasi dulu</span>
      </a>

      {/* Navbar */}
      <nav
        aria-label="Navigasi utama"
        className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-neutral-100"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
          <button onClick={goHome} aria-label="Potoin Kamu, ke beranda" className="flex items-center flex-shrink-0">
            {logoError ? (
              <span className="font-serif font-bold text-xl text-neutral-900">Potoin Kamu</span>
            ) : (
              <img
                ref={logoRef}
                src="/logo.png"
                alt="Potoin Kamu"
                className="h-8 md:h-10 w-auto max-w-[160px] md:max-w-[200px] object-contain"
                onError={() => setLogoError(true)}
              />
            )}
          </button>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => goToSection(link.id)}
                className="text-sm font-medium text-neutral-600 hover:text-amber-700 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenWizard}
              className="bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-full transition-all"
            >
              Potoin aku
            </button>
            <button
              onClick={() => setIsMenuOpen(o => !o)}
              aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={isMenuOpen}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-neutral-800 hover:bg-neutral-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-neutral-100 bg-white">
            <ul className="max-w-6xl mx-auto px-4 py-2">
              {navLinks.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => goToSection(link.id)}
                    className="w-full text-left py-3 text-sm font-medium text-neutral-700 hover:text-amber-700 border-b border-neutral-50 last:border-0"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {!selectedCategory ? (
        <>
          {/* Slider kategori layar penuh: 3 slide, garis indikator di bawah, geser dari slide 3 kembali ke slide 1 */}
          <section
            id="kategori"
            role="region"
            aria-roledescription="carousel"
            aria-label="Kategori foto"
            tabIndex={0}
            onKeyDown={handleSliderKey}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="scroll-mt-16 relative isolate overflow-hidden bg-neutral-900 text-white h-[calc(100svh-4rem)] min-h-[540px] max-h-[760px] outline-none"
          >
            {categories.map((cat, i) => {
              const active = i === slide;
              return (
                <div
                  key={cat.id}
                  aria-hidden={!active}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} dari ${categories.length}`}
                  className={`slide-anim absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={bigImage(cat.image)}
                    alt=""
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-neutral-950/55" />
                  <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-transparent to-neutral-950/60" />

                  <div
                    className={`slide-anim relative h-full max-w-4xl mx-auto px-14 md:px-24 flex flex-col items-center justify-center text-center transition-all duration-700 delay-200 ${
                      active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <p className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-amber-300">
                      Your Story, Captured.
                    </p>
                    <h2 className="font-serif text-3xl md:text-5xl font-bold uppercase tracking-wide mt-4 leading-tight">
                      {cat.title}
                    </h2>
                    <p className="text-neutral-100 text-sm md:text-lg leading-relaxed mt-5 max-w-2xl">
                      {heroCopy[cat.id] ?? cat.tagline}
                    </p>
                    <button
                      tabIndex={active ? 0 : -1}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSelectedSub(null);
                        setSelectedPackageForBooking(null);
                      }}
                      className="mt-8 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold px-8 py-3.5 rounded-full text-sm transition-all shadow-lg"
                    >
                      Pilih Kategori
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Panah kiri / kanan */}
            <button
              onClick={prevSlide}
              aria-label="Slide sebelumnya"
              className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.25} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Slide berikutnya"
              className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <ChevronRight className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.25} />
            </button>

            {/* Garis putih tipis: satu per kategori (3 slide) */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {categories.map((cat, i) => (
                <button
                  key={cat.id}
                  onClick={() => setSlide(i)}
                  aria-label={`Ke slide ${i + 1}: ${cat.title}`}
                  aria-current={i === slide}
                  className="py-3 group"
                >
                  <span
                    className={`block h-[3px] w-10 md:w-14 rounded-full transition-all duration-300 ${
                      i === slide ? 'bg-white' : 'bg-white/40 group-hover:bg-white/70'
                    }`}
                  />
                </button>
              ))}
            </div>
          </section>

          {/* Strip aksi */}
          <section className="bg-white border-b border-neutral-100">
            <div className="max-w-6xl mx-auto px-4 py-8 text-center">
              <Reveal>
                <button
                  onClick={handleOpenWizard}
                  className="bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-white font-semibold px-8 py-3.5 rounded-full transition-all text-sm"
                >
                  Hitung pesananku
                </button>
                <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-5 text-sm text-neutral-600">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    DP 50% untuk kunci jadwal
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    File original via Google Drive
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    Melayani Malang, Batu, dan Surabaya
                  </li>
                </ul>
              </Reveal>
            </div>
          </section>

          {/* Layanan: semua sub-kategori dengan filter */}
          <section id="layanan" className="scroll-mt-16 py-16 md:py-20 bg-neutral-50">
            <div className="max-w-6xl mx-auto px-4">
              <SectionTitle
                label="Layanan"
                title="Semua layanan Potoin Kamu"
                desc="Pilih layanan untuk melihat detail paket dan harganya."
              />

              <div className="flex flex-wrap justify-center gap-2 mb-8" role="group" aria-label="Filter layanan">
                {[{ id: 'all', title: 'Semua' }, ...categories.map(c => ({ id: c.id, title: c.title }))].map(f => {
                  const active = serviceFilter === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setServiceFilter(f.id)}
                      aria-pressed={active}
                      className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                        active
                          ? 'bg-neutral-900 text-white border-neutral-900 font-semibold'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-amber-400'
                      }`}
                    >
                      {f.title}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map(({ cat, sub }, idx) => (
                  <Reveal key={sub.id} delay={(idx % 3) * 100} className="h-full">
                    <article className="group h-full bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col">
                      <div className="relative h-48 overflow-hidden bg-neutral-100">
                        <img
                          src={sub.image}
                          alt={sub.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <span className="absolute top-3 left-3 bg-white/90 text-neutral-800 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                          {cat.title}
                        </span>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-serif text-lg font-bold text-neutral-900 leading-snug">{sub.name}</h3>
                        <p className="text-neutral-600 text-sm mt-1.5 flex-1">{sub.desc}</p>
                        <div className="flex items-center justify-between gap-3 mt-4">
                          <span className="text-xs text-neutral-500">
                            Mulai dari <strong className="text-amber-800 font-mono">{sub.packages[0].price}</strong>
                          </span>
                          <button
                            onClick={() => openSub(cat, sub)}
                            className="bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-white text-xs font-semibold px-4 py-2 rounded-full transition-all flex items-center gap-1 flex-shrink-0"
                          >
                            Lihat paket
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Tentang Kami */}
          <section id="tentang" className="scroll-mt-16 py-16 md:py-20">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <Reveal>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-700">Tentang Kami</p>
                <h2 className="font-serif text-2xl md:text-4xl font-bold text-neutral-900 mt-2 leading-tight">
                  Fotografi yang santai, hasil yang niat
                </h2>
                <div className="w-14 h-1 bg-amber-400 rounded-full mt-4" />
                <p className="text-neutral-600 leading-relaxed mt-5">
                  Potoin Kamu adalah jasa fotografi untuk wilayah Malang dan sekitarnya yang ramah untuk mahasiswa dan UMKM. Dari wisuda, prewed, dan foto keluarga, sampai liputan acara serta foto produk untuk jualanmu. Kami ngobrol dulu biar kamu rileks, baru memotret.
                </p>
                <ul className="space-y-3 mt-6">
                  {aboutPoints.map(point => (
                    <li key={point} className="flex items-start gap-3 text-neutral-700">
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                      </span>
                      <span className="text-sm md:text-base">{point}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleOpenWizard}
                  className="mt-8 bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-white font-semibold px-7 py-3.5 rounded-full transition-all text-sm"
                >
                  Hitung pesananku
                </button>
              </Reveal>

              <div className="grid grid-cols-2 gap-4">
                <Reveal delay={100}>
                  <img
                    src={categories[0].subcategories[1].image}
                    alt="Foto prewed"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
                  />
                </Reveal>
                <Reveal delay={250}>
                  <img
                    src={categories[0].subcategories[0].image}
                    alt="Foto wisuda"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg mt-8"
                  />
                </Reveal>
              </div>
            </div>
          </section>

          {/* Banner reservasi */}
          <section className="relative isolate overflow-hidden bg-neutral-900 text-white">
            <img
              src={categories[1].image}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
            />
            <div className="absolute inset-0 -z-10 bg-neutral-950/60" />
            <div className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
              <Reveal>
                <h2 className="font-serif text-2xl md:text-4xl font-bold leading-tight">Reservasi atau konsultasi dulu?</h2>
                <p className="text-neutral-200 mt-4 leading-relaxed">
                  Ceritain aja foto apa yang kamu butuhkan, kami bantu pilihkan paket dan jadwalnya.
                </p>
                <a
                  href={waConsultUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-7 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-7 py-3.5 rounded-full transition-all text-sm"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                  Reservasi / Konsultasi via WhatsApp
                </a>
              </Reveal>
            </div>
          </section>

          {/* Cara booking */}
          <section id="cara-booking" className="scroll-mt-16 py-16 md:py-20 bg-neutral-50">
            <div className="max-w-4xl mx-auto px-4">
              <SectionTitle
                label="Cara Booking"
                title="Empat langkah, dari pilih paket sampai foto jadi"
              />

              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                {bookingSteps.map((step, i) => (
                  <li key={step.title}>
                    <Reveal delay={(i % 2) * 120} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 text-amber-900 font-serif font-bold flex items-center justify-center"
                      >
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-serif font-bold text-neutral-900 text-lg leading-snug">{step.title}</h3>
                        <p className="text-neutral-600 text-sm leading-relaxed mt-1">{step.desc}</p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="scroll-mt-16 py-16 md:py-20">
            <div className="max-w-3xl mx-auto px-4">
              <SectionTitle
                label="FAQ Potoin Kamu"
                title="Yang sering ditanyain sebelum booking"
              />

              <div className="space-y-8">
                {faqsData.map((group, groupIdx) => (
                  <Reveal key={groupIdx} className="space-y-3">
                    <h3 className="font-serif font-bold text-amber-800 text-lg border-b border-amber-200/50 pb-2">
                      {group.category}
                    </h3>
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
                              aria-expanded={isOpen}
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
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Kontak */}
          <section id="kontak" className="scroll-mt-16 py-16 md:py-20 bg-neutral-50">
            <div className="max-w-5xl mx-auto px-4">
              <SectionTitle
                label="Kontak"
                title="Hubungi Potoin Kamu"
                desc="Cara tercepat adalah lewat WhatsApp. Sebutkan foto apa yang kamu butuhkan, kami bantu dari sana."
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Reveal className="h-full">
                  <div className="h-full bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
                    <h3 className="font-serif font-bold text-neutral-900 text-lg flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      WhatsApp
                    </h3>
                    <p className="text-neutral-600 text-sm mt-2 leading-relaxed">
                      Tanya paket, cek jadwal kosong, atau diskusi konsep custom.
                    </p>
                    <a
                      href={waConsultUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all"
                    >
                      Chat sekarang
                    </a>
                  </div>
                </Reveal>

                <Reveal delay={120} className="h-full">
                  <div className="h-full bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
                    <h3 className="font-serif font-bold text-neutral-900 text-lg flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      Area layanan
                    </h3>
                    <ul className="mt-3 space-y-3">
                      {serviceAreas.map(area => (
                        <li key={area.name}>
                          <p className="text-sm font-semibold text-neutral-800">{area.name}</p>
                          <p className="text-xs text-neutral-500 leading-relaxed">{area.desc}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={240} className="h-full">
                  <div className="h-full bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
                    <h3 className="font-serif font-bold text-neutral-900 text-lg flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600" />
                      Sesi foto
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {availableTimeSlots.map(slot => (
                        <li key={slot} className="text-sm text-neutral-700">{slot}</li>
                      ))}
                    </ul>
                    <p className="text-xs text-neutral-500 mt-3 leading-relaxed">
                      Sesi foto bisa di outdoor, home visit, atau studio partner.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="max-w-6xl mx-auto px-4 pt-8 pb-20">
          {!selectedSub ? (
            /* Sub-Category View */
            <div className="max-w-3xl mx-auto bg-amber-50/40 border border-amber-200/60 rounded-3xl p-6 md:p-10 shadow-xl">
              <button
                onClick={resetViews}
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
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 w-full">
                      <h4 className="font-serif text-xl font-bold text-neutral-900 mb-1">{sub.name}</h4>
                      <p className="text-neutral-600 text-sm mb-4">{sub.desc}</p>
                      <button
                        onClick={() => {
                          setSelectedSub(sub);
                          setSelectedPackageForBooking(null);
                        }}
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
                  const isCustom = isCustomPackage(pkg);
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
                        <div className="flex justify-between items-start mb-3 gap-3">
                          <h3 className="font-serif text-xl font-bold text-neutral-900">{pkg.name}</h3>
                          <span className="bg-amber-100 text-amber-900 font-mono font-bold text-sm px-3 py-1 rounded-full flex-shrink-0">
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
                          onClick={() => {
                            setBookingErrors({});
                            setSelectedPackageForBooking(pkg);
                          }}
                          className="w-full bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-white font-semibold py-3 px-4 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow"
                        >
                          <Check className="w-4 h-4" />
                          <span>Pilih Paket Ini</span>
                        </button>
                      ) : (
                        <a
                          href={`https://wa.me/${WA_NUMBER}?text=Halo%20Kak,%20saya%20punya%20ide%20konsep%20custom%20sendiri%20untuk%20sesi%20foto.`}
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
            /* Final Booking Form dengan lokasi teks terstruktur */
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

              <form onSubmit={handleFinalBookingSubmit} noValidate className="space-y-5">
                <Field
                  label="Nama Pemesan"
                  htmlFor="booking-name"
                  icon={<User className="w-4 h-4 text-amber-600" />}
                  error={bookingErrors.name}
                >
                  <input
                    id="booking-name"
                    type="text"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    placeholder="Tulis namamu"
                    aria-invalid={!!bookingErrors.name}
                    className={inputClass(!!bookingErrors.name)}
                  />
                </Field>

                <Field
                  label="Pilih Tanggal Pemotretan"
                  htmlFor="booking-date"
                  icon={<Calendar className="w-4 h-4 text-amber-600" />}
                  error={bookingErrors.date}
                >
                  <input
                    id="booking-date"
                    type="date"
                    min={minDate}
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    aria-invalid={!!bookingErrors.date}
                    className={inputClass(!!bookingErrors.date)}
                  />
                </Field>

                <Field
                  label="Pilih Sesi Jam / Waktu"
                  htmlFor="booking-time"
                  icon={<Clock className="w-4 h-4 text-amber-600" />}
                >
                  <select
                    id="booking-time"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className={inputClass()}
                  >
                    {availableTimeSlots.map((slot, i) => (
                      <option key={i} value={slot}>{slot}</option>
                    ))}
                  </select>
                </Field>

                <div>
                  <span className="text-sm font-semibold text-neutral-800 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    Lokasi Sesi Foto
                  </span>
                  <LocationFields
                    idPrefix="booking-loc"
                    value={bookingLoc}
                    onChange={setBookingLoc}
                    error={bookingErrors.location}
                  />
                </div>

                {/* Ringkasan pesanan */}
                <div className="rounded-2xl bg-amber-50/60 border border-amber-200/70 p-4 text-sm">
                  <p className="font-serif font-bold text-neutral-900 mb-2">Ringkasan pesananmu</p>
                  <dl className="space-y-1.5 text-neutral-700">
                    <div className="flex gap-2">
                      <dt className="w-20 flex-shrink-0 text-neutral-500">Paket</dt>
                      <dd className="font-medium">{selectedPackageForBooking.name} ({selectedPackageForBooking.price})</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="w-20 flex-shrink-0 text-neutral-500">Tanggal</dt>
                      <dd className="font-medium">{bookingDate ? formatDateID(bookingDate) : 'Belum dipilih'}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="w-20 flex-shrink-0 text-neutral-500">Jam</dt>
                      <dd className="font-medium">{bookingTime}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="w-20 flex-shrink-0 text-neutral-500">Lokasi</dt>
                      <dd className="font-medium">
                        {bookingLoc.address.trim()
                          ? `${bookingLoc.address.trim()} (${bookingLoc.area})`
                          : `Belum diisi (${bookingLoc.area})`}
                      </dd>
                    </div>
                  </dl>
                  <p className="text-xs text-neutral-500 mt-3">DP 50% untuk mengunci tanggal, pelunasan setelah sesi foto selesai.</p>
                </div>

                <div className="pt-2">
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
      )}

      {/* WIZARD MODAL / KALKULATOR */}
      {isWizardOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsWizardOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Kalkulator Potoin Aku"
            className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-5 border-b pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <h3 className="font-serif text-xl font-bold text-neutral-900">Kalkulator “Potoin Aku”</h3>
              </div>
              <button 
                onClick={() => setIsWizardOpen(false)}
                aria-label="Tutup kalkulator"
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-neutral-600 hover:bg-neutral-200"
              >
                ✕
              </button>
            </div>

            {/* Indikator langkah */}
            <ol className="flex gap-2 mb-6" aria-label="Langkah kalkulator">
              {wizardStepLabels.map((label, i) => (
                <li key={label} className="flex-1" aria-current={wizardStep === i + 1 ? 'step' : undefined}>
                  <div className={`h-1.5 rounded-full ${wizardStep >= i + 1 ? 'bg-amber-500' : 'bg-neutral-200'}`} />
                  <span className={`block text-xs mt-1.5 ${wizardStep === i + 1 ? 'font-semibold text-neutral-900' : 'text-neutral-400'}`}>
                    {label}
                  </span>
                </li>
              ))}
            </ol>

            <form onSubmit={handleWizardSubmit} noValidate className="space-y-5">
              {wizardStep === 1 && (
                <div className="space-y-4">
                  <p className="font-semibold text-neutral-900 text-base">Pilih kategori utama</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {categories.map(c => (
                      <button
                        type="button"
                        key={c.id}
                        onClick={() => {
                          setWizardCatId(c.id);
                          setWizardSubId(c.subcategories[0].id);
                          setWizardPkgIdx(null);
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          wizardCatId === c.id ? 'border-amber-500 bg-amber-50/60 font-bold' : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        {c.title}
                      </button>
                    ))}
                  </div>

                  <p className="font-semibold text-neutral-900 text-base mt-4">Pilih sub-kategori</p>
                  <div className="grid grid-cols-1 gap-2">
                    {activeWizardCat.subcategories.map(sub => (
                      <button
                        type="button"
                        key={sub.id}
                        onClick={() => {
                          setWizardSubId(sub.id);
                          setWizardPkgIdx(null);
                        }}
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
                    onClick={handleWizardNext}
                    className="w-full mt-6 bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-white font-semibold py-3.5 rounded-xl transition-all"
                  >
                    Selanjutnya ➔
                  </button>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-neutral-900 text-base">Pilih paket</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{activeWizardSub.name}</p>
                  </div>

                  <div className="space-y-3" role="radiogroup" aria-label="Pilihan paket">
                    {activeWizardSub.packages.map((pkg, i) => {
                      const active = wizardPkgIdx === i;
                      const custom = isCustomPackage(pkg);
                      return (
                        <button
                          type="button"
                          key={i}
                          role="radio"
                          aria-checked={active}
                          onClick={() => {
                            setWizardPkgIdx(i);
                            setWizardErrors({});
                          }}
                          className={`w-full text-left p-4 rounded-2xl border transition-all ${
                            active ? 'border-amber-500 bg-amber-50' : 'border-neutral-200 hover:border-amber-300'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-3">
                            <span className="font-serif font-bold text-neutral-900">{pkg.name}</span>
                            <span className="bg-amber-100 text-amber-900 font-mono font-bold text-xs px-2.5 py-1 rounded-full flex-shrink-0">
                              {pkg.price}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-600 mt-1.5">
                            {custom ? 'Konsep dan budget disesuaikan, kita obrolin dulu via WhatsApp.' : pkg.spec}
                          </p>
                          {!custom && <p className="text-xs text-emerald-700 font-medium mt-1">🎁 {pkg.bonus}</p>}
                        </button>
                      );
                    })}
                  </div>
                  {wizardErrors.pkg && (
                    <p role="alert" className="text-xs text-red-600">{wizardErrors.pkg}</p>
                  )}

                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setWizardStep(1)}
                      className="w-1/3 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-semibold py-3.5 rounded-xl transition-all text-sm"
                    >
                      Kembali
                    </button>
                    <button
                      type="button"
                      onClick={handleWizardNext}
                      className="w-2/3 bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-white font-semibold py-3.5 rounded-xl transition-all text-sm"
                    >
                      Selanjutnya ➔
                    </button>
                  </div>
                </div>
              )}

              {wizardStep === 3 && wizardPkg && (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-4">
                    <p className="text-xs text-neutral-500">Paket pilihanmu</p>
                    <div className="flex justify-between items-start gap-3 mt-0.5">
                      <p className="font-serif font-bold text-neutral-900">{wizardPkg.name}</p>
                      <p className="font-mono font-bold text-sm text-amber-900 flex-shrink-0">{wizardPkg.price}</p>
                    </div>
                    <p className="text-xs text-neutral-600 mt-1">{activeWizardSub.name}</p>
                    {isCustomPackage(wizardPkg) && (
                      <p className="text-xs text-neutral-500 mt-1.5">Harga final menyesuaikan konsep yang kamu mau.</p>
                    )}
                  </div>

                  <Field label="Nama pemesan" htmlFor="wizard-name" error={wizardErrors.name}>
                    <input 
                      id="wizard-name"
                      type="text" 
                      value={wizardName}
                      onChange={(e) => setWizardName(e.target.value)}
                      placeholder="Tulis namamu"
                      aria-invalid={!!wizardErrors.name}
                      className={inputClass(!!wizardErrors.name)}
                    />
                  </Field>

                  <Field label="Jumlah orang / produk (opsional)" htmlFor="wizard-people">
                    <input 
                      id="wizard-people"
                      type="text" 
                      value={wizardPeople}
                      onChange={(e) => setWizardPeople(e.target.value)}
                      placeholder="Contoh: Sendiri, 2 orang, atau 15 produk"
                      className={inputClass()}
                    />
                  </Field>

                  <Field label="Tanggal foto" htmlFor="wizard-date" error={wizardErrors.date}>
                    <input 
                      id="wizard-date"
                      type="date" 
                      min={minDate}
                      value={wizardDate}
                      onChange={(e) => setWizardDate(e.target.value)}
                      aria-invalid={!!wizardErrors.date}
                      className={inputClass(!!wizardErrors.date)}
                    />
                  </Field>

                  <Field label="Sesi jam" htmlFor="wizard-time">
                    <select
                      id="wizard-time"
                      value={wizardTime}
                      onChange={(e) => setWizardTime(e.target.value)}
                      className={inputClass()}
                    >
                      {availableTimeSlots.map((slot, i) => (
                        <option key={i} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </Field>

                  <div>
                    <span className="text-sm font-semibold text-neutral-800 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      Lokasi sesi foto
                    </span>
                    <LocationFields
                      idPrefix="wizard-loc"
                      value={wizardLoc}
                      onChange={setWizardLoc}
                      error={wizardErrors.location}
                    />
                  </div>

                  <Field label="Catatan atau konsep (opsional)" htmlFor="wizard-note">
                    <textarea
                      id="wizard-note"
                      rows={2}
                      value={wizardNote}
                      onChange={(e) => setWizardNote(e.target.value)}
                      placeholder="Mis. tema warna, referensi gaya, atau permintaan khusus"
                      className={inputClass()}
                    />
                  </Field>

                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setWizardStep(2)}
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

      {/* Footer */}
      <footer className="bg-neutral-950 text-neutral-300">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-serif font-bold text-xl text-white">Potoin Kamu</p>
            <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
              Jasa fotografi profesional untuk wilayah Malang dan sekitarnya. UMKM & Student Friendly Photography.
            </p>
          </div>

          <div>
            <p className="font-semibold text-sm text-white mb-3">Jelajahi</p>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => goToSection(link.id)}
                    className="text-sm text-neutral-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-sm text-white mb-3">Hubungi kami</p>
            <a
              href={waConsultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              Chat via WhatsApp
            </a>
          </div>
        </div>

        <div className="text-center py-6 text-neutral-500 text-xs border-t border-neutral-800">
          &copy; 2026 Potoin Kamu. All rights reserved.
        </div>
      </footer>
    </main>
  );
}