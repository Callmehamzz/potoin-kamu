'use client';

import React, { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    nama: '',
    whatsapp: '',
    paket: 'Wisuda & Portrait',
    tanggal: '',
    jam: '',
    lokasi: '',
    catatan: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pesan = `Halo Potoin Kamu, saya ingin booking jadwal foto:%0A%0A- *Nama*: ${formData.nama}%0A- *No. WA*: ${formData.whatsapp}%0A- *Paket*: ${formData.paket}%0A- *Tanggal*: ${formData.tanggal}%0A- *Waktu/Jam*: ${formData.jam}%0A- *Lokasi*: ${formData.lokasi}${formData.catatan ? `%0A- *Catatan*: ${formData.catatan}` : ''}`;
    
    const nomorWA = '628135353498'; 
    window.open(`https://wa.me/${nomorWA}?text=${pesan}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-amber-400 selection:text-black">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-neutral-200 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold tracking-widest text-amber-600">POTOIN KAMU</h1>
        <div className="space-x-8 text-sm font-medium text-neutral-700">
          <a href="#layanan" className="hover:text-amber-600 transition">Layanan</a>
          <a href="#booking" className="hover:text-amber-600 transition">Booking</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-24 px-4 max-w-4xl mx-auto">
        <span className="text-amber-700 font-semibold text-xs tracking-[0.3em] uppercase bg-amber-50 border border-amber-200 px-4 py-1.5 rounded-full inline-block mb-6">
          Jasa Fotografi Profesional
        </span>
        <h2 className="text-4xl md:text-6xl font-extrabold mt-2 mb-6 leading-tight tracking-wide text-neutral-900">
          Abadikan Momen Terbaikmu Bersama <span className="text-amber-600">Potoin Kamu</span>
        </h2>
        <p className="text-neutral-600 text-lg mb-10 max-w-2xl mx-auto font-light">
          Layanan foto wisuda, event, portrait, dan dokumentasi momen spesial dengan sentuhan elegan dan eksklusif.
        </p>
        <a 
          href="#booking" 
          className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4 rounded-full transition shadow-lg shadow-amber-500/20 tracking-wider text-sm uppercase"
        >
          Pesan Jadwal Sekarang
        </a>
      </section>

      {/* Layanan Section */}
      <section id="layanan" className="py-20 px-4 max-w-6xl mx-auto border-t border-neutral-200">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-4 tracking-wide text-neutral-900">Layanan & Paket Foto</h3>
        <p className="text-neutral-600 text-center mb-12 text-sm">Pilih paket dokumentasi terbaik sesuai kebutuhan acaramu.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-neutral-50 border border-neutral-200 p-8 rounded-2xl hover:border-amber-400 transition duration-300 shadow-sm">
            <h4 className="text-xl font-bold mb-3 text-amber-600">Wisuda & Portrait</h4>
            <p className="text-neutral-600 text-sm mb-6 leading-relaxed">Sesi foto outdoor/indoor untuk momen kelulusan atau foto profil personal.</p>
            <p className="text-2xl font-extrabold text-neutral-900 tracking-tight">Mulai Rp 150k</p>
          </div>
          <div className="bg-neutral-50 border border-amber-400 p-8 rounded-2xl relative shadow-md shadow-amber-500/5">
            <span className="absolute -top-3 right-6 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Favorit</span>
            <h4 className="text-xl font-bold mb-3 text-amber-600">Event & Dokumentasi</h4>
            <p className="text-neutral-600 text-sm mb-6 leading-relaxed">Dokumentasi acara ulang tahun, kumpul komunitas, atau kegiatan spesial.</p>
            <p className="text-2xl font-extrabold text-neutral-900 tracking-tight">Mulai Rp 300k</p>
          </div>
          <div className="bg-neutral-50 border border-neutral-200 p-8 rounded-2xl hover:border-amber-400 transition duration-300 shadow-sm">
            <h4 className="text-xl font-bold mb-3 text-amber-600">Group / Groupie</h4>
            <p className="text-neutral-600 text-sm mb-6 leading-relaxed">Sesi foto bareng sahabat atau keluarga dengan konsep kreatif.</p>
            <p className="text-2xl font-extrabold text-neutral-900 tracking-tight">Mulai Rp 200k</p>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking" className="py-20 px-4 max-w-2xl mx-auto border-t border-neutral-200">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-2 tracking-wide text-neutral-900">Formulir Pemesanan</h3>
        <p className="text-neutral-600 text-center mb-10 text-sm">Isi data di bawah untuk terhubung langsung via WhatsApp.</p>
        
        <form onSubmit={handleSubmit} className="bg-neutral-50 p-8 md:p-10 rounded-3xl border border-neutral-200 space-y-6 shadow-xl">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-neutral-700">Nama Lengkap</label>
            <input 
              type="text" 
              required
              className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3.5 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500 transition"
              placeholder="Masukkan nama Anda"
              value={formData.nama}
              onChange={(e) => setFormData({...formData, nama: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-neutral-700">Nomor WhatsApp</label>
            <input 
              type="tel" 
              required
              className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3.5 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500 transition"
              placeholder="08135353498"
              value={formData.whatsapp}
              onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-neutral-700">Pilihan Paket</label>
            <select 
              className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3.5 text-neutral-900 focus:outline-none focus:border-amber-500 transition"
              value={formData.paket}
              onChange={(e) => setFormData({...formData, paket: e.target.value})}
            >
              <option value="Wisuda & Portrait">Wisuda & Portrait (Rp 150k)</option>
              <option value="Event & Dokumentasi">Event & Dokumentasi (Rp 300k)</option>
              <option value="Group / Groupie">Group / Groupie (Rp 200k)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-neutral-700">Tanggal Sesi Foto</label>
              <input 
                type="date" 
                required
                className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3.5 text-neutral-900 focus:outline-none focus:border-amber-500 transition"
                value={formData.tanggal}
                onChange={(e) => setFormData({...formData, tanggal: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-neutral-700">Waktu / Jam (WIB)</label>
              <input 
                type="time" 
                required
                className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3.5 text-neutral-900 focus:outline-none focus:border-amber-500 transition"
                value={formData.jam}
                onChange={(e) => setFormData({...formData, jam: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-neutral-700">Lokasi / Tempat Foto (Wajib)</label>
            <input 
              type="text" 
              required
              className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3.5 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500 transition"
              placeholder="Contoh: Universitas Brawijaya / Cafe / Outdoor"
              value={formData.lokasi}
              onChange={(e) => setFormData({...formData, lokasi: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-neutral-700">Catatan Khusus (Opsional)</label>
            <textarea 
              rows={3}
              className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3.5 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500 transition"
              placeholder="Konsep, pakaian, dll."
              value={formData.catatan}
              onChange={(e) => setFormData({...formData, catatan: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition tracking-wider uppercase text-sm cursor-pointer shadow-lg shadow-amber-500/20"
          >
            Kirim Pemesanan via WhatsApp
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-8 text-center text-neutral-500 text-xs tracking-wider">
        <p>© 2026 Potoin Kamu. All rights reserved.</p>
      </footer>
    </main>
  );
}