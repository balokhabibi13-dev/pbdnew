import React, { useState } from 'react';
import { RekomendasiItem } from '../../types/rapor';
import { 
  Layers, 
  Search, 
  ExternalLink, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Download,
  AlertTriangle,
  BookOpen
} from 'lucide-react';
import { exportToCSV } from '../../utils/csvHelper';

interface RekomKeseluruhanViewProps {
  recommendations: RekomendasiItem[];
  onAddToRKT: (item: RekomendasiItem) => void;
}

export const RekomKeseluruhanView: React.FC<RekomKeseluruhanViewProps> = ({
  recommendations,
  onAddToRKT,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = recommendations.filter((r) =>
    r.indikatorPrioritasNama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.identifikasiMasalah.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.kegiatanBenahi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.akarMasalahNama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    const headers = [
      'No',
      'Dimensi',
      'Indikator Prioritas',
      'Capaian',
      'Identifikasi Masalah',
      'Akar Masalah',
      'Kegiatan Benahi',
      'Penjelasan Implementasi',
      'Program ARKAS',
      'Tautan PMM'
    ];
    const rows = filtered.map(r => [
      r.nomor,
      r.dimensi,
      `${r.indikatorPrioritasKode} - ${r.indikatorPrioritasNama}`,
      r.capaianIndikator,
      r.identifikasiMasalah,
      `${r.akarMasalahKode} ${r.akarMasalahNama}: ${r.deskripsiAkarMasalah}`,
      r.kegiatanBenahi,
      r.penjelasanBenahi,
      r.programKegiatanArkas,
      r.tautanPMM || '-'
    ]);
    exportToCSV('Rekomendasi_Keseluruhan_Kemendikdasmen_2026', headers, rows);
  };

  const handleAdd = (item: RekomendasiItem) => {
    onAddToRKT(item);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-700 font-semibold text-xs uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>2.1 Rekomendasi Keseluruhan</span>
          </div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight mt-1">
            Daftar Rekomendasi Keseluruhan Perbaikan Layanan
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 max-w-3xl leading-relaxed">
            Menyajikan data rekomendasi keseluruhan dari Kemendikdasmen yang memuat fokus perbaikan layanan satuan pendidikan beserta pasangan identifikasi, akar masalah, dan inspirasi kegiatan benahi.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold shadow-xs transition"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Unduh CSV Rekomendasi</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between gap-3">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari indikator, masalah, atau kegiatan benahi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="text-xs text-slate-500 font-semibold">
          Total: <strong className="text-slate-800">{filtered.length} Rekomendasi</strong>
        </div>
      </div>

      {/* List / Cards of Recommendations */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 hover:border-blue-300 transition space-y-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center">
                  #{item.nomor}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      {item.indikatorPrioritasKode}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {item.indikatorPrioritasNama}
                    </h3>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{item.dimensi}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                  item.capaianIndikator === 'Baik' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : item.capaianIndikator === 'Sedang'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}>
                  Capaian: {item.capaianIndikator} ({item.skorIndikator.toFixed(2)})
                </span>

                <button
                  onClick={() => handleAdd(item)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-xs ${
                    copiedId === item.id 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-blue-700 hover:bg-blue-600 text-white'
                  }`}
                >
                  {copiedId === item.id ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Dimasukkan ke RKT!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>+ Masukkan ke RKT</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 3 Step Card: Identifikasi -> Akar Masalah -> Kegiatan Benahi */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {/* Box 1: Identifikasi */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>1. Identifikasi Masalah</span>
                </div>
                <p className="text-slate-700 leading-relaxed text-xs">
                  {item.identifikasiMasalah}
                </p>
              </div>

              {/* Box 2: Akar Masalah */}
              <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200/80 space-y-1">
                <div className="font-bold text-amber-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>2. Akar Masalah ({item.akarMasalahKode})</span>
                </div>
                <div className="font-bold text-slate-900 text-xs">
                  {item.akarMasalahNama}
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {item.deskripsiAkarMasalah}
                </p>
              </div>

              {/* Box 3: Kegiatan Benahi */}
              <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-200/80 space-y-1">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>3. Inspirasi Kegiatan Benahi</span>
                </div>
                <div className="font-bold text-slate-900 text-xs">
                  {item.kegiatanBenahi}
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {item.penjelasanBenahi}
                </p>
              </div>
            </div>

            {/* Bottom Program ARKAS & PMM link */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Rujukan Program ARKAS:</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-800 font-mono">
                  {item.programKegiatanArkas}
                </span>
              </div>

              {item.tautanPMM && (
                <a
                  href={item.tautanPMM}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Materi Panduan PMM</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
