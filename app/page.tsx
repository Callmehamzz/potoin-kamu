'use client';
import { useState, useRef, useEffect } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { MessageCircle, ArrowLeft, Check, Calendar, Clock, MapPin, HelpCircle, ChevronDown, ChevronUp, ChevronRight, ChevronLeft, Sparkles, User } from 'lucide-react';

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
  { id: 'cara-booking', label: 'Cara booking' },
  { id: 'area-layanan', label: 'Area layanan' },
  { id: 'faq', label: 'FAQ' }
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
        a: 'Gampang! Tinggal klik tombol "Potoin aku sekarang" atau pilih langsung paket yang kamu mau di bagian kategori, atau langsung WhatsApp kita.'
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

/* ============================================================
   FUNGSI BANTU
   ============================================================ */

const isCustomPackage = (pkg: PackageItem) => pkg.name.includes('Semaumu');

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
  const [logoError, setLogoError] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Tanggal minimum = hari ini (waktu lokal perangkat), dihitung di client agar tidak terjadi mismatch hydration
  useEffect(() => {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    setMinDate(local.toISOString().split('T')[0]);
  }, []);

  // Card kategori selalu mulai dari posisi paling kiri saat dibuka / di-refresh
  useEffect(() => {
    scrollRef.current?.scrollTo({ left: 0, behavior: 'auto' });
  }, [selectedCategory]);

  // Scroll ke atas setiap pindah tampilan (kategori -> sub -> paket -> form)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const resetViews = () => {
    setSelectedCategory(null);
    setSelectedSub(null);
    setSelectedPackageForBooking(null);
  };

  const goHome = () => {
    if (selectedCategory) {
      resetViews();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToSection = (id: string) => {
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
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .animate-scale-pulse { animation: none; }
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
        href={`https://wa.me/${WA_NUMBER}?text=Halo%20Kak,%20saya%20mau%20konsultasi%20dulu%20tentang%20jasa%20fotografinya.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-full shadow-2xl hover:bg-emerald-700 transition-all duration-300 hover:scale-105 font-medium text-sm md:text-base border border-emerald-500/30"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
        <span className="tracking-wide">konsultasi dulu</span>
      </a>

      {/* Navbar */}
      <nav
        aria-label="Navigasi utama"
        className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-neutral-100"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-4">
          <button onClick={goHome} className="font-serif font-bold text-lg text-neutral-900 hover:text-amber-700 transition-colors">
            Potoin Kamu
          </button>

          <div className="hidden md:flex items-center gap-6">
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

          <button
            onClick={handleOpenWizard}
            className="bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-full transition-all"
          >
            Potoin aku
          </button>
        </div>
      </nav>

      {/* Header & Hero */}
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-8 text-center">
        <div className="flex justify-center mb-6">
          {logoError ? (
            <span className="font-serif text-3xl font-bold text-neutral-900">Potoin Kamu</span>
          ) : (
            <div className="relative h-14 w-48">
              <img
                src="/logo.png"
                alt="Potoin Kamu Logo"
                className="object-contain h-full w-full"
                onError={() => setLogoError(true)}
              />
            </div>
          )}
        </div>

        <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-4 leading-tight">
          Your Story, Captured.
        </h1>
        <p className="text-neutral-600 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Jasa Fotografi Profesional untuk Segala Kebutuhanmu.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <button
            onClick={() => goToSection('kategori')}
            className="w-full sm:w-auto bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-white font-semibold px-7 py-3.5 rounded-2xl shadow-lg transition-all text-sm"
          >
            Lihat paket dan harga
          </button>
          <button
            onClick={handleOpenWizard}
            className="w-full sm:w-auto bg-white hover:bg-amber-50 text-neutral-900 font-semibold px-7 py-3.5 rounded-2xl border border-neutral-300 hover:border-amber-400 transition-all text-sm"
          >
            Hitung pesananku
          </button>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-sm text-neutral-600">
          <li className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" />
            DP 50% untuk kunci jadwal
          </li>
          <li className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" />
            Reschedule gratis 1x kalau cuaca buruk
          </li>
          <li className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" />
            Melayani Malang, Batu, dan Surabaya
          </li>
        </ul>
      </header>

      {/* Main Section */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        {!selectedCategory ? (
          <>
            <div id="kategori" className="scroll-mt-20 text-center mb-6">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900">
                Portofolio & Kategori Foto
              </h2>
              <p className="text-neutral-500 text-sm mt-1">Geser ke samping untuk melihat pilihan kategori lainnya ➔</p>
            </div>

            {/* Horizontal scrolling manual yang stabil (tidak bergeser otomatis) */}
            <div className="relative max-w-5xl mx-auto">
              <button 
                onClick={() => scrollCard('left')}
                aria-label="Geser ke kiri"
                className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-xl rounded-full items-center justify-center text-neutral-800 hover:bg-amber-100 transition-all border border-neutral-200"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button 
                onClick={() => scrollCard('right')}
                aria-label="Geser ke kanan"
                className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-xl rounded-full items-center justify-center text-neutral-800 hover:bg-amber-100 transition-all border border-neutral-200"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div 
                ref={scrollRef}
                className="flex overflow-x-auto no-scrollbar gap-6 py-6 px-4 snap-x snap-proximity scroll-px-4"
              >
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="snap-start flex-shrink-0 w-[85%] md:w-[380px] rounded-3xl overflow-hidden bg-neutral-900 text-white shadow-xl flex flex-col justify-end p-6 md:p-8 relative"
                    style={{ minHeight: '450px' }}
                  >
                    <div className="absolute inset-0 z-0">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        loading="lazy"
                        decoding="async"
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
                            setSelectedPackageForBooking(null);
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

            {/* Cara booking */}
            <div id="cara-booking" className="scroll-mt-20 pt-12 border-t border-neutral-100 max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900">
                  Cara booking di Potoin Kamu
                </h3>
                <p className="text-neutral-500 text-sm mt-1">Empat langkah, dari pilih paket sampai foto jadi.</p>
              </div>

              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                {bookingSteps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 w-9 h-9 rounded-full bg-amber-100 text-amber-900 font-serif font-bold flex items-center justify-center"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-neutral-900 text-lg leading-snug">{step.title}</h4>
                      <p className="text-neutral-600 text-sm leading-relaxed mt-1">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Area layanan */}
            <div id="area-layanan" className="scroll-mt-20 mt-20 pt-12 border-t border-neutral-100 max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900">
                  Area layanan
                </h3>
                <p className="text-neutral-500 text-sm mt-1">
                  Sesi foto bisa di outdoor, home visit ke rumahmu, atau di studio partner.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {serviceAreas.map(area => (
                  <div key={area.name} className="border-l-4 border-amber-400 pl-4">
                    <h4 className="font-serif font-bold text-neutral-900 text-lg leading-snug flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      {area.name}
                    </h4>
                    <p className="text-neutral-600 text-sm leading-relaxed mt-1.5">{area.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete FAQ Section with Accordion */}
            <div id="faq" className="scroll-mt-20 mt-20 pt-12 border-t border-neutral-100 max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 text-amber-700 bg-amber-50 px-3.5 py-1 rounded-full text-xs font-semibold mb-2">
                  <HelpCircle className="w-3.5 h-3.5" />
                  FAQ “POTOIN KAMU”
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
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : !selectedSub ? (
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
                        onClick={() => setSelectedPackageForBooking(pkg)}
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

      {/* WIZARD MODAL / KALKULATOR */}
      {isWizardOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => {
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
      <footer className="border-t border-neutral-100 bg-neutral-50/60">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-serif font-bold text-xl text-neutral-900">Potoin Kamu</p>
            <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
              Jasa fotografi profesional untuk wilayah Malang dan sekitarnya.
            </p>
          </div>

          <div>
            <p className="font-semibold text-sm text-neutral-900 mb-3">Jelajahi</p>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => goToSection(link.id)}
                    className="text-sm text-neutral-600 hover:text-amber-700 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-sm text-neutral-900 mb-3">Hubungi kami</p>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=Halo%20Kak,%20saya%20mau%20konsultasi%20dulu%20tentang%20jasa%20fotografinya.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              Chat via WhatsApp
            </a>
          </div>
        </div>

        <div className="text-center py-6 text-neutral-400 text-xs border-t border-neutral-100">
          &copy; 2026 Potoin Kamu. All rights reserved. UMKM & Student Friendly Photography.
        </div>
      </footer>
    </main>
  );
}
