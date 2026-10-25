'use client';

import React, { useState } from 'react';
import { 
  Camera, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Tag, 
  Info,
  Layers,
  Heart,
  Briefcase,
  Lightbulb
} from 'lucide-react';

export default function Home() {
  // State untuk Tab Portofolio
  const [activeTab, setActiveTab] = useState<'momen' | 'acara' | 'bisnis' | 'gila'>('momen');

  // State untuk FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // State Form Booking Multi-Step
  const [step1Category, setStep1Category] = useState<string>('');
  const [step2SubCategory, setStep2SubCategory] = useState<string>('');
  const [locationType, setLocationType] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('');
  const [timePeriod, setTimePeriod] = useState<string>('AM');
  const [notes, setNotes] = useState<string>('');

  // Mapping Sub-Kategori berdasarkan Step 1
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
      { label: 'Potoin Tim Hebatmu - Company Profile / Headshot', value: 'Company Profile & Headshot' },
      { label: 'Potoin Tempat Kece-mu - Interior & Properti', value: 'Interior & Properti' }
    ],
    'Potoin Ide Gila-ku': [
      { label: 'Potoin Imajinasimu - Themed / Conceptual', value: 'Themed/Conceptual' },
      { label: 'Potoin Gayamu - Fashion & Editorial', value: 'Fashion & Editorial' }
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

  // Data FAQ
  const faqs = [
    {
      q: "Gimana cara booking di 'potoin kamu'?",
      a: "Gampang! Tinggal isi form booking di website ini atau langsung WhatsApp kita. Ceritain mau potoin apa, tanggal berapa, dan di mana. Nanti kita cek jadwal & kirim detail bookingnya."
    },
    {
      q: "Harus DP berapa? H- berapa baru boleh booking?",
      a: "DP 50% buat kunci tanggal kamu ya. Sisa pelunasan pas hari H selesai sesi foto. Booking bisa dari H-3 bulan sampai H-7, tapi makin mepet takutnya bentrok. Mending dari H-14 biar aman."
    },
    {
      q: "Bisa gak sih dadakan? Besok mau dipotoin.",
      a: "Bisa banget kalau jadwal kita kosong! Coba WhatsApp aja dulu. Kalau urgent/besok ada charge +Rp 100rb ya, soalnya kita harus atur ulang jadwal lain."
    },
    {
      q: "Kalau ujan/cuaca jelek gimana?",
      a: "Tenang, bisa reschedule gratis 1x kok. Atau kita pindah ke lokasi indoor/cafe. Kita pastiin kamu tetep kepotoin dengan cakep."
    },
    {
      q: "Itu harga 'mulai dari', nanti bisa nambah apa aja?",
      a: "Bisa nambah kalau: lokasi di luar Malang Kota (harga menyesuaikan jarak), nambah jam +Rp 150rb/jam, nambah foto edit +Rp 15rb/foto, atau request cetak album. Tapi semua kita infoin di awal, jadi gak ada biaya kaget."
    },
    {
      q: "Kok murah? Hasilnya bagus gak?",
      a: "Murah karena kita pake sistem paket durasi pendek & efisien, bukan karena hasil asal-asalan. Cek aja hasil 'potoin kamu' di Instagram buat buktiin."
    },
    {
      q: "Bisa nego gak? Budget aku pas-pasan.",
      a: "Daripada nego, mending kamu ambil paket paling dasar terus nambah add-on dikit-dikit sesuai budget. Atau WhatsApp aja ceritain budget-mu, nanti kita racikin paket khusus buat kamu."
    },
    {
      q: "File aslinya dikasih semua gak?",
      a: "Dikasih dong! Semua paket udah dapet BONUS semua file original via Google Drive. Jadi selain file edit pilihan, kamu tetep punya semua momen mentahnya."
    },
    {
      q: "Lokasinya di mana aja? Bisa di rumah?",
      a: "Bisa banget! Kita ada 3 opsi: 1. Outdoor area Malang Kota (alun-alun, taman, kampus). 2. Home visit (kita yang dateng ke rumahmu). 3. Studio partner (ada biaya sewa mulai Rp 150rb/jam)."
    },
    {
      q: "Outfit/bajunya harus gimana? Diajarin pose gak?",
      a: "Pakai yang bikin kamu pede! Nanti H-7 kita kirim guide warna & outfit biar nyambung. Pas sesi juga bakal kita arahin pose kok, dijamin gak bakal kaku."
    },
    {
      q: "Aku malu kamera, bisa gak sih?",
      a: "Justru itu tugas kita! 90% klien 'potoin kamu' awalnya juga gitu. Kita ngobrol-ngobrol dulu, becanda, biar kamu lupa kalau lagi dipotoin. Hasilnya malah lebih natural."
    },
    {
      q: "Berapa lama fotonya jadi?",
      a: "File original H+1 udah kita kirim. File edit: 3-7 hari kerja tergantung paketnya. Kalau mau express 1x24 jam bisa +Rp 200rb. Nanti H+1 kamu juga dapet 3-5 foto sneak peek buat diupload duluan."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans pb-24 selection:bg-amber-100 selection:text-amber-900">
      
      {/* --- HERO SECTION --- */}
      <header className="relative py-20 px-4 text-center overflow-hidden border-b border-amber-100 bg-gradient-to-b from-amber-50/60 to-white">
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-sm font-semibold mb-2 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-600" /> UMKM & Student Friendly Photography
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900">
            Potoin <span className="text-amber-600 underline decoration-amber-400">Kamu</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto font-normal">
            Buat kenangan yang gak bakal keulang. Tanpa kaku, harga jujur, dan hasil yang bikin kamu senyum-senyum sendiri.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a href="#booking" className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold transition shadow-md shadow-amber-500/20">
              Potoin Aku Sekarang!
            </a>
            <a href="#harga" className="px-6 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold border border-neutral-300 transition">
              Lihat Paket Harga
            </a>
          </div>
        </div>
      </header>

      {/* --- PORTOFOLIO / KATALOG TAB --- */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl font-bold text-neutral-900">Portofolio & Kategori Foto</h2>
          <p className="text-neutral-500">Pilih kategori momen yang ingin kamu abadikan</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-neutral-200 pb-4">
          {[
            { id: 'momen', label: '1. Potoin Momenmu', icon: Heart },
            { id: 'acara', label: '2. Potoin Acaramu', icon: Calendar },
            { id: 'bisnis', label: '3. Potoin Bisnismu', icon: Briefcase },
            { id: 'gila', label: '4. Potoin Ide Gila-mu', icon: Lightbulb },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
                  isActive 
                    ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20' 
                    : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Grid Display Placeholder Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'momen' && (
            <>
              <PortfolioCard title="Prewedding & Couple" desc="Potoin Cinta Kalian - Abadikan chemistry sebelum hari-H. Mau intimate, cinematic, atau playful?" img="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop" />
              <PortfolioCard title="Wisuda / Graduation" desc="Potoin Kelulusanmu - Toga udah kepake, masa fotonya biasa aja? Bikin momen wisuda jadi epic." img="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop" />
              <PortfolioCard title="Keluarga & Maternity" desc="Potoin Keluarga Kecilmu - Dari baby bump sampai keluarga gede, semua tawa tangisnya kita simpen." img="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&auto=format&fit=crop" />
              <PortfolioCard title="Ulang Tahun" desc="Potoin Level Up-mu - Nambah umur harus nambah foto kece. Konsepnya mau cute atau elegan?" img="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop" />
            </>
          )}

          {activeTab === 'acara' && (
            <>
              <PortfolioCard title="Wedding Day" desc="Potoin Hari Spesialmu - Dari akad sampai resepsi, semua detail & air mata bahagia kita tangkepin." img="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop" />
              <PortfolioCard title="Lamaran & Sangjit" desc="Potoin 'Iya'-nya Dia - Detik-detik dia bilang iya itu sakral. Jangan sampai blur." img="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&auto=format&fit=crop" />
              <PortfolioCard title="Event & Gathering" desc="Potoin Serunya Eventmu - Seminar, konser, gathering kantor — biar semua kebagian spotlight." img="https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop" />
            </>
          )}

          {activeTab === 'bisnis' && (
            <>
              <PortfolioCard title="Produk & Katalog" desc="Potoin Jualanmu - Foto produk yang bikin orang auto checkout. Styling + lighting kita yang urus." img="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop" />
              <PortfolioCard title="Makanan & Minuman" desc="Potoin Menu Andalanmu - Bikin makananmu keliatan seenak aslinya. GoFood ready!" img="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop" />
              <PortfolioCard title="Company Profile & Headshot" desc="Potoin Tim Hebatmu - Foto profesional buat LinkedIn, website, dan company profile." img="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop" />
              <PortfolioCard title="Interior & Properti" desc="Potoin Tempat Kece-mu - Cafe, kosan, atau rumah. Angle terbaik biar orang langsung takjub." img="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop" />
            </>
          )}

          {activeTab === 'gila' && (
            <>
              <PortfolioCard title="Themed / Conceptual" desc="Potoin Imajinasimu - Cosplay, yearbook cinematic, fine art, atau ide aneh lainnya. Spill aja!" img="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop" />
              <PortfolioCard title="Fashion & Editorial" desc="Potoin Gayamu - Mau bikin lookbook atau konten ala majalah? Let's make you a star." img="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&auto=format&fit=crop" />
            </>
          )}
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="harga" className="py-16 px-4 bg-amber-50/40 border-y border-amber-100">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-neutral-900">Daftar Paket & Harga</h2>
            <p className="text-neutral-600">Harga jujur & transparan. Disesuaikan dengan kebutuhanmu.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <PriceCard
              title="Potoin Kelulusanmu"
              badge="Wisuda Sat-Set"
              price="Rp 250rb"
              details={[
                "45 menit di area kampus",
                "8 foto edit hi-res",
                "Semua file original via GDrive",
                "1 Outfit pilihanmu"
              ]}
              highlight="Toga udah keren, fotonya jangan kalah keren!"
            />

            {/* Card 2 */}
            <PriceCard
              title="Potoin Bestie / Date"
              badge="Couple / Friend"
              price="Rp 350rb"
              details={[
                "1 jam sesi foto",
                "1 lokasi taman / cafe",
                "10 foto edit hi-res",
                "Semua file original via GDrive",
                "Maksimal 2 orang"
              ]}
              highlight="Abadikan chemistry seru kalian berdua."
            />

            {/* Card 3 */}
            <PriceCard
              title="Potoin Jualanmu"
              badge="Produk UMKM"
              price="Rp 25rb /foto"
              details={[
                "Minimal order 10 foto",
                "Background polos / simpel",
                "Lighting & styling rapi",
                "File siap upload e-commerce / IG"
              ]}
              highlight="Bikin calon pembeli auto checkout!"
            />

            {/* Card 4 */}
            <PriceCard
              title="Potoin Konsepmu"
              badge="Themed & Ide Gila"
              price="Rp 750rb"
              details={[
                "1 jam sesi interaktif",
                "1 konsep unik / costume",
                "15 foto edit cinematic",
                "Bisa diskusi ide via WA dulu"
              ]}
              highlight="Eksplorasi imajinasi tanpa batas!"
            />
          </div>

          {/* Policy & Add-On Info */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 text-amber-600 font-bold text-lg border-b border-neutral-100 pb-3">
              <Tag className="w-5 h-5" /> Paket Add-On & Fasilitas Tambahan
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-neutral-700">
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                <span className="font-bold text-neutral-900 block mb-1">Tambah Foto Edit</span>
                +Rp 75.000 / 5 foto tambahan
              </div>
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                <span className="font-bold text-neutral-900 block mb-1">Sewa Studio Partner</span>
                Mulai Rp 150.000 / jam
              </div>
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                <span className="font-bold text-neutral-900 block mb-1">Sesi Malam Hari (19.00-21.00)</span>
                +Rp 100.000 (Luar ruangan/Lighting khusus)
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2 text-xs text-neutral-600 bg-amber-50 p-4 rounded-xl border border-amber-200/80">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                <span><strong>Free Transport Malang Kota.</strong> Luar kota Surabaya/Batu biaya menyesuaikan jarak.</span>
              </div>
              <p className="font-semibold text-amber-700">
                *Harga khusus pelajar, mahasiswa, & UMKM. Punya budget pas? Diskusi aja!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- DYNAMIC BOOKING FORM SECTION --- */}
      <section id="booking" className="py-16 px-4 max-w-3xl mx-auto">
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 space-y-8 shadow-xl">
          <div className="text-center space-y-2 border-b border-neutral-100 pb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">Form Pemesanan Potoin Kamu</h2>
            <p className="text-neutral-500 text-sm">Isi 3 langkah simpel di bawah ini untuk kunci jadwalmu</p>
          </div>

          <form onSubmit={handleSendWhatsApp} className="space-y-6">
            {/* STEP 1 */}
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

            {/* STEP 2 */}
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

            {/* STEP 3 */}
            <div className="space-y-4 pt-2 border-t border-neutral-100">
              <label className="block text-sm font-bold text-amber-600 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center text-xs font-bold">3</span>
                Mau potoin di mana & Kapan?
              </label>

              {/* Opsi Lokasi */}
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

              {/* Tanggal & Waktu (AM/PM) */}
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

              {/* Data Diri */}
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

              {/* Catatan Tambahan */}
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

            {/* Submit Button */}
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
      <section className="py-16 px-4 max-w-4xl mx-auto border-t border-neutral-200">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-3xl font-bold text-neutral-900">FAQ Potoin Kamu</h2>
          <p className="text-neutral-500">Hal-hal yang sering ditanyakan sebelum booking</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-neutral-200 bg-white rounded-xl overflow-hidden transition shadow-sm"
            >
              <button
                onClick={() => handleToggleFaq(index)}
                className="w-full p-4 text-left font-semibold text-neutral-900 flex items-center justify-between gap-4 hover:bg-neutral-50"
              >
                <span>{faq.q}</span>
                {openFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-amber-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-neutral-400 shrink-0" />
                )}
              </button>
              {openFaq === index && (
                <div className="px-4 pb-4 text-sm text-neutral-600 border-t border-neutral-100 pt-3 leading-relaxed bg-neutral-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8 p-6 bg-amber-50/50 rounded-2xl border border-amber-200">
          <p className="text-neutral-700 text-sm">Masih ada yang bingung? Langsung tanya aja, tim "potoin kamu" gak gigit kok! 😊</p>
          <a 
            href="https://api.whatsapp.com/send/?phone=628135353498&text=Halo+Potoin+Kamu%2C+mau+tanya-tanya+dulu+dong" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-amber-600 hover:text-amber-700 text-sm font-bold"
          >
            <MessageCircle className="w-4 h-4" /> Tanya via WhatsApp
          </a>
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

// Sub-component Card Portofolio
function PortfolioCard({ title, desc, img }: { title: string; desc: string; img: string }) {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden group hover:border-amber-400 transition shadow-sm hover:shadow-md">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
        />
      </div>
      <div className="p-5 space-y-2">
        <h3 className="font-bold text-lg text-neutral-900 group-hover:text-amber-600 transition">{title}</h3>
        <p className="text-xs text-neutral-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// Sub-component Card Pricing
function PriceCard({ title, badge, price, details, highlight }: { title: string; badge: string; price: string; details: string[]; highlight: string }) {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-400 transition shadow-sm hover:shadow-md space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 border border-amber-200">{badge}</span>
        </div>
        <div>
          <h3 className="font-bold text-lg text-neutral-900">{title}</h3>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">{price}</div>
        </div>
        <p className="text-xs italic text-neutral-500 border-l-2 border-amber-400 pl-2 py-0.5">{highlight}</p>
        <ul className="space-y-2 pt-2 text-xs text-neutral-700">
          {details.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <a 
        href="#booking" 
        className="w-full py-2.5 text-center text-xs font-bold rounded-xl bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-white transition"
      >
        Potoin Aku!
      </a>
    </div>
  );
}