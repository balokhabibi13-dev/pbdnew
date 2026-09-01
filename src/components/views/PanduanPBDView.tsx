import React from 'react';
import { 
  HelpCircle, 
  BookOpen, 
  ExternalLink, 
  CheckCircle2, 
  FileText, 
  Layers, 
  Sparkles, 
  ClipboardList, 
  Calculator,
  RefreshCw,
  Compass
} from 'lucide-react';

export const PanduanPBDView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 shadow-md border border-blue-800/40 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold border border-blue-400/30">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Panduan Resmi Kemendikdasmen RI</span>
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">
          Panduan Umum Pemanfaatan Unduhan Rapor Pendidikan & PBD 2026
        </h2>
        <p className="text-blue-100/90 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Dokumen panduan ini memandu Kepala Satuan Pendidikan dan dewan guru dalam menganalisis laporan Rapor Pendidikan dan melakukan Perencanaan Berbasis Data (PBD) secara berkelanjutan.
        </p>
      </div>

      {/* 4 Bagian Dokumen Unduhan Rapor */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span>Struktur 4 Bagian Dokumen Rapor Pendidikan & PBD</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="font-bold text-blue-800 text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>Panduan PBD & Siklus Kerja</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Memuat petunjuk umum untuk memanfaatkan laporan Rapor Pendidikan dan melakukan evaluasi diri perencanaan berbasis data.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="font-bold text-indigo-800 text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>Laporan Rapor & Rekomendasi</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Memuat seluruh data capaian indikator mutu (Dimensi A s.d. E) disertai <strong>2.1 Rekomendasi Keseluruhan</strong> dan <strong>2.2 Rekomendasi Prioritas</strong> Kemendikdasmen.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="font-bold text-emerald-800 text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>Lembar Kerja RKT</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Dokumen kerja rencana kegiatan pembenahan mutu di tahun mendatang berdasarkan identifikasi masalah, refleksi akar masalah, dan penentuan rencana tindak lanjut.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="font-bold text-purple-800 text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">4</span>
              <span>Lembar Kerja Rancangan ARKAS</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Rincian kegiatan yang memerlukan penganggaran dana BOSP sebagai rujukan saat satuan pendidikan melakukan input penganggaran ke dalam aplikasi ARKAS.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Siklus Kerja PBD Detail */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Compass className="w-5 h-5 text-indigo-600" />
          <span>Penjelasan 4 Siklus Kerja Perencanaan Berbasis Data (PBD)</span>
        </h3>

        {/* Step 1 */}
        <div className="border-l-4 border-blue-600 pl-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-700 uppercase bg-blue-100 px-2 py-0.5 rounded">
              Langkah 1
            </span>
            <h4 className="text-sm font-bold text-slate-900">
              IDENTIFIKASI: Kumpulkan dan Maknai Data Kondisi Satuan Pendidikan Anda
            </h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ketahui kondisi satuan pendidikan melalui data yang relevan:
          </p>
          <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 pl-2">
            <li><strong>Data Rapor Pendidikan:</strong> Hasil Asesmen Nasional & Survei Lingkungan Belajar (Sulingjar).</li>
            <li><strong>Data Mandiri Sekolah:</strong> Refleksi pendidik, supervisi kepala sekolah, umpan balik orang tua & murid.</li>
          </ul>
          <div className="pt-1">
            <a
              href="https://guru.kemendikdasmen.go.id/artikel/758"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
            >
              <span>Alat bantu Tahap Identifikasi Kemendikdasmen</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Step 2 */}
        <div className="border-l-4 border-amber-500 pl-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-700 uppercase bg-amber-100 px-2 py-0.5 rounded">
              Langkah 2
            </span>
            <h4 className="text-sm font-bold text-slate-900">
              REFLEKSI: Tetapkan Perbaikan Prioritas Layanan di Satuan Pendidikan
            </h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Menentukan indikator yang paling berdampak signifikan pada murid. Gunakan rekomendasi Kemendikdasmen untuk menemukan pasangan indikator prioritas dan akar masalahnya.
          </p>
          <div className="pt-1">
            <a
              href="https://guru.kemendikdasmen.go.id/artikel/759"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-amber-700 hover:text-amber-900 inline-flex items-center gap-1"
            >
              <span>Alat bantu Tahap Refleksi Kemendikdasmen</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Step 3 */}
        <div className="border-l-4 border-emerald-500 pl-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 uppercase bg-emerald-100 px-2 py-0.5 rounded">
              Langkah 3
            </span>
            <h4 className="text-sm font-bold text-slate-900">
              BENAHI: Rencanakan Upaya Perbaikan Layanan Pendidikan
            </h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Menyusun perencanaan dan penganggaran di 3 aspek utama:
          </p>
          <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 pl-2">
            <li><strong>Pembelajaran:</strong> Peningkatan kurikulum dan modul ajar.</li>
            <li><strong>Pengembangan Profesional PTK:</strong> Komunitas Belajar (Kombel) dan pelatihan mandiri di PMM.</li>
            <li><strong>Pengelolaan Sumber Daya:</strong> Lembar Kerja RKT dan Lembar Kerja ARKAS.</li>
          </ul>
          <div className="pt-1">
            <a
              href="https://guru.kemendikdasmen.go.id/artikel/761"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1"
            >
              <span>Alat bantu Tahap Benahi Kemendikdasmen</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Step 4 */}
        <div className="border-l-4 border-purple-500 pl-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-purple-700 uppercase bg-purple-100 px-2 py-0.5 rounded">
              Langkah 4
            </span>
            <h4 className="text-sm font-bold text-slate-900">
              IMPLEMENTASI & EVALUASI: Lakukan Evaluasi Hasilnya Secara Berkala
            </h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Laksanakan kegiatan benahi dan evaluasi setiap triwulan atau akhir semester bersama dewan guru dan komite sekolah. Perencanaan bersifat dinamis dan disesuaikan dengan kebutuhan belajar murid.
          </p>
          <div className="pt-1">
            <a
              href="https://guru.kemendikdasmen.go.id/artikel/760"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-purple-700 hover:text-purple-900 inline-flex items-center gap-1"
            >
              <span>Panduan Evaluasi Berkala PBD</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
