import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-slate-800 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold tracking-wider text-amber-400">POTOIN KAMU</h1>
        <div className="space-x-6 text-sm font-medium">
          <a href="#layanan" className="hover:text-amber-400 transition">Layanan</a>
          <a href="#portofolio" className="hover:text-amber-400 transition">Portofolio</a>
          <a href="#kontak" className="hover:text-amber-400 transition">Kontak</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 px-4 max-w-4xl mx-auto">
        <span className="text-amber-400 font-semibold text-sm tracking-widest uppercase">Jasa Fotografi Profesional</span>
        <h2 className="text-4xl md:text-6xl font-extrabold mt-4 mb-6 leading-tight">
          Abadikan Momen Terbaikmu Bersama <span className="text-amber-400">Potoin Kamu</span>
        </h2>
        <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
          Layanan foto wisuda, event, portrait, dan dokumentasi momen spesial dengan hasil estetis dan harga bersahabat.
        </p>
        <a 
          href="https://wa.me/6281234567890" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-4 rounded-full transition shadow-lg shadow-amber-500/20"
        >
          Pesan Jadwal Sekarang
        </a>
      </section>

      {/* Layanan Section */}
      <section id="layanan" className="py-16 px-4 max-w-6xl mx-auto border-t border-slate-800">
        <h3 className="text-2xl font-bold text-center mb-12">Layanan & Paket Foto</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h4 className="text-xl font-bold mb-2 text-amber-400">Wisuda & Portrait</h4>
            <p className="text-slate-400 text-sm mb-4">Sesi foto outdoor/indoor untuk momen kelulusan atau foto profil personal.</p>
            <p className="text-2xl font-extrabold text-white mb-4">Mulai Rp 150k</p>
          </div>
          <div className="bg-slate-900 border border-amber-500/50 p-6 rounded-2xl relative shadow-lg shadow-amber-500/10">
            <span className="absolute -top-3 right-4 bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full">Populer</span>
            <h4 className="text-xl font-bold mb-2 text-amber-400">Event & Dokumentasi</h4>
            <p className="text-slate-400 text-sm mb-4">Dokumentasi acara ulang tahun, kumpul komunitas, atau kegiatan spesial.</p>
            <p className="text-2xl font-extrabold text-white mb-4">Mulai Rp 300k</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h4 className="text-xl font-bold mb-2 text-amber-400">Group / Groupie</h4>
            <p className="text-slate-400 text-sm mb-4">Sesi foto bareng sahabat atau keluarga dengan konsep kreatif.</p>
            <p className="text-2xl font-extrabold text-white mb-4">Mulai Rp 200k</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p>© 2026 Potoin Kamu. All rights reserved.</p>
      </footer>
    </main>
  );
}