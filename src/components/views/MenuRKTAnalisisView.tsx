import React, { useState } from 'react';
import { RaporIndicator, RekomendasiItem, RKTItem, SchoolProfile } from '../../types/rapor';
import { formatRupiah } from '../../utils/csvHelper';
import {
  Compass,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Save,
  Plus,
  Layers,
  ArrowRight,
  RotateCcw,
  BookOpen,
  DollarSign,
  Calendar,
  UserCheck
} from 'lucide-react';

interface MenuRKTAnalisisViewProps {
  indicators: RaporIndicator[];
  recommendations: RekomendasiItem[];
  school: SchoolProfile;
  onAddRKTItem: (item: Omit<RKTItem, 'id' | 'nomor'>) => void;
  onNavigateToRKTSheet: () => void;
}

export const MenuRKTAnalisisView: React.FC<MenuRKTAnalisisViewProps> = ({
  indicators,
  recommendations,
  school,
  onAddRKTItem,
  onNavigateToRKTSheet,
}) => {
  // Form State
  const [identifikasi, setIdentifikasi] = useState('');
  const [akarMasalah, setAkarMasalah] = useState('');
  const [kegiatanBenahi, setKegiatanBenahi] = useState('');
  const [penjelasanImplementasi, setPenjelasanImplementasi] = useState('');
  const [butuhAnggaran, setButuhAnggaran] = useState<boolean>(true);
  const [estimasiBiaya, setEstimasiBiaya] = useState<number>(5000000);
  const [targetWaktu, setTargetWaktu] = useState('Juli - Desember 2025');
  const [penanggungJawab, setPenanggungJawab] = useState('Koordinator Kurikulum & Pendidik');
  const [indikatorTerkait, setIndikatorTerkait] = useState('A.2 Kemampuan Numerasi');
  const [isSuccessNotification, setIsSuccessNotification] = useState(false);

  // Quick Preset Selection from Rapor Recommendations
  const handleSelectPreset = (rekom: RekomendasiItem) => {
    setIdentifikasi(rekom.identifikasiMasalah);
    setAkarMasalah(`[${rekom.akarMasalahKode}] ${rekom.akarMasalahNama}: ${rekom.deskripsiAkarMasalah}`);
    setKegiatanBenahi(rekom.kegiatanBenahi);
    setPenjelasanImplementasi(rekom.penjelasanBenahi);
    setIndikatorTerkait(`${rekom.indikatorPrioritasKode} ${rekom.indikatorPrioritasNama}`);
    setButuhAnggaran(true);
    setEstimasiBiaya(8000000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifikasi || !akarMasalah || !kegiatanBenahi) {
      alert('Mohon lengkapi Form Identifikasi, Akar Masalah, dan Kegiatan Benahi.');
      return;
    }

    onAddRKTItem({
      identifikasi,
      akarMasalah,
      kegiatanBenahi,
      penjelasanImplementasi: penjelasanImplementasi || 'Implementasi terpadu kegiatan pembenahan bersama dewan guru.',
      butuhAnggaran,
      estimasiBiaya: butuhAnggaran ? Number(estimasiBiaya) : 0,
      targetWaktu,
      penanggungJawab,
      status: 'Belum Dimulai',
      indikatorTerkait,
      catatan: 'Hasil analisis formulir RKT Perencanaan Berbasis Data.'
    });

    setIsSuccessNotification(true);
    setTimeout(() => setIsSuccessNotification(false), 4000);

    // Reset some fields
    setIdentifikasi('');
    setAkarMasalah('');
    setKegiatanBenahi('');
    setPenjelasanImplementasi('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Info Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-blue-800/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold border border-blue-400/30">
              <Compass className="w-3.5 h-3.5 text-blue-300" />
              <span>Analisis Perencanaan Berbasis Data (PBD)</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Menu Analisis & Form Perumusan RKT 2026
            </h2>
            <p className="text-blue-100/80 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Formulir terpadu untuk melakukan analisis siklus PBD dari file CSV Rapor Pendidikan: merumuskan Identifikasi Masalah, mendiagnosis Akar Masalah, menetapkan Kegiatan Benahi, mendeskripsikan Penjelasan Implementasi, serta memetakan Kebutuhan Anggaran.
            </p>
          </div>

          <button
            onClick={onNavigateToRKTSheet}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition shrink-0"
          >
            <span>Lihat Tabel Lembar RKT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isSuccessNotification && (
        <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl p-4 flex items-center justify-between animate-in zoom-in-95 duration-200">
          <div className="flex items-center gap-2 text-xs font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Kegiatan RKT Berhasil Disimpan & Ditambahkan ke Lembar Kerja RKT!</span>
          </div>
          <button
            onClick={onNavigateToRKTSheet}
            className="text-xs text-emerald-800 underline font-semibold hover:text-emerald-950"
          >
            Buka Lembar Kerja RKT &rarr;
          </button>
        </div>
      )}

      {/* Main Grid: Form Left (2 Col), Quick Inspiration Right (1 Col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Form Input PBD RKT */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Formulir Analisis Rencana Kegiatan Tahunan (RKT)
                </h3>
                <p className="text-xs text-slate-500">
                  Isi tahapan perencanaan berbasis data di bawah ini atau klik inspirasi rekomendasi di samping kanan.
                </p>
              </div>
              <span className="text-[11px] font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200">
                PBD Standar 2026
              </span>
            </div>

            {/* Field 0: Indikator Rapor Terkait */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pilih Indikator Capaian Rapor Pendidikan Terkait
              </label>
              <select
                value={indikatorTerkait}
                onChange={(e) => setIndikatorTerkait(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-semibold text-slate-900 bg-slate-50"
              >
                {indicators.map((ind) => (
                  <option key={ind.id} value={`${ind.kode} ${ind.namaIndikator}`}>
                    [{ind.kode}] {ind.namaIndikator} - Capaian: {ind.capaian} (Skor {ind.skor.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>

            {/* Field 1: Form Identifikasi */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-blue-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span>1. Form Identifikasi Masalah</span>
                  <span className="text-rose-500">*</span>
                </span>
                <span className="text-[11px] font-normal text-slate-400">Apa masalah capaian yang perlu dibenahi?</span>
              </label>
              <textarea
                value={identifikasi}
                onChange={(e) => setIdentifikasi(e.target.value)}
                required
                rows={3}
                placeholder="Contoh: A.2 Kemampuan Numerasi peserta didik masih kategori Sedang (58.20). Kemampuan menalar soal cerita matematika kontekstual masih rendah."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 leading-relaxed"
              />
            </div>

            {/* Field 2: Form Akar Masalah */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-amber-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                  <span>2. Form Refleksi Akar Masalah</span>
                  <span className="text-rose-500">*</span>
                </span>
                <span className="text-[11px] font-normal text-slate-400">Apa faktor penyebab mendasar di balik masalah ini?</span>
              </label>
              <textarea
                value={akarMasalah}
                onChange={(e) => setAkarMasalah(e.target.value)}
                required
                rows={3}
                placeholder="Contoh: D.1.3 Guru belum menguasai metode pembelajaran matematika kontekstual berbasis alat peraga konkret dan jarang melakukan asesmen diagnostik."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-slate-900 leading-relaxed"
              />
            </div>

            {/* Field 3: Form Kegiatan Benahi */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-emerald-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span>3. Form Kegiatan Benahi</span>
                  <span className="text-rose-500">*</span>
                </span>
                <span className="text-[11px] font-normal text-slate-400">Judul program/kegiatan intervensi perbaikan</span>
              </label>
              <input
                type="text"
                value={kegiatanBenahi}
                onChange={(e) => setKegiatanBenahi(e.target.value)}
                required
                placeholder="Contoh: Pelatihan Guru dalam Pembuatan Media Konkret & Pembelajaran Numerasi Kontekstual"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 font-semibold"
              />
            </div>

            {/* Field 4: Form Penjelasan Implementasi Kegiatan */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-purple-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                  <span>4. Form Penjelasan Implementasi Kegiatan</span>
                </span>
                <span className="text-[11px] font-normal text-slate-400">Bagaimana langkah teknis pelaksanaan & sasarannya?</span>
              </label>
              <textarea
                value={penjelasanImplementasi}
                onChange={(e) => setPenjelasanImplementasi(e.target.value)}
                rows={3}
                placeholder="Contoh: Menyelenggarakan workshop intensif selama 2 hari bersama instruktur numerasi BPMP, pembuatan alat peraga matematika tiap kelas 1-6, dan pendampingan di Komunitas Belajar mingguan."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-900 leading-relaxed"
              />
            </div>

            {/* Field 5: Apakah Kegiatan Membutuhkan Anggaran & Rincian */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    5. Apakah Kegiatan Ini Membutuhkan Anggaran Biaya?
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Jika Ya, kegiatan ini akan menjadi rujukan untuk penginputan lembar ARKAS BOSP.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setButuhAnggaran(true)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition border ${
                      butuhAnggaran
                        ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                        : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    Ya (Butuh Anggaran)
                  </button>
                  <button
                    type="button"
                    onClick={() => setButuhAnggaran(false)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition border ${
                      !butuhAnggaran
                        ? 'bg-slate-700 text-white border-slate-700 shadow-xs'
                        : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    Tidak (Non-Anggaran)
                  </button>
                </div>
              </div>

              {butuhAnggaran && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-200">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Estimasi Biaya (Rp)
                    </label>
                    <input
                      type="number"
                      value={estimasiBiaya}
                      onChange={(e) => setEstimasiBiaya(parseFloat(e.target.value) || 0)}
                      min="0"
                      step="500000"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono font-bold"
                    />
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      {formatRupiah(estimasiBiaya)}
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Target Waktu Pelaksanaan
                    </label>
                    <input
                      type="text"
                      value={targetWaktu}
                      onChange={(e) => setTargetWaktu(e.target.value)}
                      placeholder="Contoh: Juli - Agustus 2025"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Penanggung Jawab (PIC)
                    </label>
                    <input
                      type="text"
                      value={penanggungJawab}
                      onChange={(e) => setPenanggungJawab(e.target.value)}
                      placeholder="Contoh: Koordinator Tim Numerasi"
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Form Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                id="btn-submit-rkt-form"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-sm shadow-md transition"
              >
                <Save className="w-4 h-4" />
                <span>Simpan & Masukkan ke Lembar RKT</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIdentifikasi('');
                  setAkarMasalah('');
                  setKegiatanBenahi('');
                  setPenjelasanImplementasi('');
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
              >
                Reset Formulir
              </button>
            </div>
          </form>
        </div>

        {/* Right 1 Col: Quick Inspiration & Auto-Fill from CSV Recommendations */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Inspirasi Cepat Rekomendasi Kemendikdasmen</span>
              </h4>
              <span className="text-[10px] text-slate-400 font-mono">1-Klik Isi</span>
            </div>

            <p className="text-[11px] text-slate-500 leading-snug">
              Klik salah satu rekomendasi hasil analisis CSV di bawah ini untuk mengisi formulir secara otomatis:
            </p>

            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {recommendations.map((rekom) => (
                <div
                  key={rekom.id}
                  onClick={() => handleSelectPreset(rekom)}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition cursor-pointer group space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                      {rekom.indikatorPrioritasKode}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      rekom.capaianIndikator === 'Baik' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {rekom.capaianIndikator}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-slate-800 group-hover:text-blue-700 leading-snug">
                    {rekom.kegiatanBenahi}
                  </div>

                  <div className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">
                    Akar: {rekom.akarMasalahNama}
                  </div>

                  <div className="text-[10px] font-bold text-blue-600 pt-1 flex items-center gap-1">
                    <span>Gunakan template ini</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
