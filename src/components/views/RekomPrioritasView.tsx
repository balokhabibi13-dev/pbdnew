import React, { useState } from 'react';
import { RekomendasiItem } from '../../types/rapor';
import { 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  BookOpen, 
  ArrowRight, 
  HelpCircle,
  Download,
  Flame
} from 'lucide-react';
import { exportToCSV } from '../../utils/csvHelper';

interface RekomPrioritasViewProps {
  recommendations: RekomendasiItem[];
  onAddToRKT: (item: RekomendasiItem) => void;
}

export const RekomPrioritasView: React.FC<RekomPrioritasViewProps> = ({
  recommendations,
  onAddToRKT,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter only priority items or top 3 lowest score items
  const priorityItems = recommendations.filter(r => r.isPrioritasUtama);

  const handleAdd = (item: RekomendasiItem) => {
    onAddToRKT(item);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  const handleExport = () => {
    const headers = [
      'No',
      'Indikator Prioritas Terendah',
      'Skor Capaian',
      'Identifikasi Masalah Prioritas',
      'Akar Masalah',
      'Kegiatan Benahi PBD',
      'Penjelasan Implementasi',
      'Program ARKAS Terkait',
      'Tautan PMM'
    ];
    const rows = priorityItems.map(r => [
      r.nomor,
      `${r.indikatorPrioritasKode} - ${r.indikatorPrioritasNama}`,
      `${r.capaianIndikator} (${r.skorIndikator})`,
      r.identifikasiMasalah,
      `${r.akarMasalahKode} ${r.akarMasalahNama}: ${r.deskripsiAkarMasalah}`,
      r.kegiatanBenahi,
      r.penjelasanBenahi,
      r.programKegiatanArkas,
      r.tautanPMM || '-'
    ]);
    exportToCSV('Rekomendasi_Prioritas_Kemendikdasmen_2026', headers, rows);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-amber-600/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs font-bold border border-amber-400/30">
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              <span>2.2 Rekomendasi Prioritas Utama Kemendikdasmen</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Fokus Utama Intervensi & Pembenahan Satuan Pendidikan
            </h2>
            <p className="text-amber-100/80 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Rekomendasi prioritas disusun khusus berdasarkan capaian indikator yang paling rendah dan memiliki dampak paling signifikan pada mutu hasil belajar murid.
            </p>
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-bold shadow-md border border-amber-500/40 transition shrink-0"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Unduh CSV Prioritas</span>
          </button>
        </div>
      </div>

      {/* Why Priority Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-blue-900">
        <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-bold">Mengapa Rekomendasi Prioritas Penting?</strong> Kemendikdasmen menetapkan bahwa sekolah sebaiknya tidak memecah fokus pada terlalu banyak hal sekaligus. Pilihlah 2 hingga 4 indikator prioritas di bawah ini untuk dimasukkan langsung ke dalam <strong>Lembar Kerja RKT</strong> dan dianggarkan pada <strong>ARKAS</strong>.
        </div>
      </div>

      {/* Priority Cards */}
      <div className="space-y-5">
        {priorityItems.map((item, idx) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border-2 border-amber-200/80 shadow-md p-6 relative overflow-hidden space-y-4 hover:border-amber-400 transition"
          >
            <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[10px] uppercase font-black px-4 py-1 rounded-bl-xl shadow-xs tracking-wider">
              PRIORITAS UTAMA #{idx + 1}
            </div>

            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3 pr-28">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                    {item.indikatorPrioritasKode}
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    {item.indikatorPrioritasNama}
                  </h3>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{item.dimensi}</div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Skor Rapor: <strong>{item.skorIndikator.toFixed(2)}</strong> ({item.capaianIndikator})
                </span>
              </div>
            </div>

            {/* 3 Step Interactive PBD Journey */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
              {/* Box 1: Identifikasi Masalah */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between space-y-2">
                <div>
                  <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider flex items-center gap-1.5 text-blue-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    <span>Langkah 1: Identifikasi</span>
                  </div>
                  <p className="text-slate-700 mt-2 leading-relaxed text-xs">
                    {item.identifikasiMasalah}
                  </p>
                </div>
                <div className="text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-200">
                  Data Rapor Pendidikan 2026
                </div>
              </div>

              {/* Box 2: Refleksi Akar Masalah */}
              <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 flex flex-col justify-between space-y-2">
                <div>
                  <div className="font-bold text-amber-900 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                    <span>Langkah 2: Refleksi Akar Masalah</span>
                  </div>
                  <div className="font-bold text-slate-900 text-xs mt-2">
                    [{item.akarMasalahKode}] {item.akarMasalahNama}
                  </div>
                  <p className="text-slate-600 mt-1 leading-relaxed text-[11px]">
                    {item.deskripsiAkarMasalah}
                  </p>
                </div>
                <div className="text-[11px] text-amber-700 font-semibold pt-2 border-t border-amber-200">
                  Fokus Pembenahan Pendidik (GTK)
                </div>
              </div>

              {/* Box 3: Kegiatan Benahi */}
              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 flex flex-col justify-between space-y-2">
                <div>
                  <div className="font-bold text-emerald-900 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    <span>Langkah 3: Kegiatan Benahi</span>
                  </div>
                  <div className="font-bold text-slate-900 text-xs mt-2">
                    {item.kegiatanBenahi}
                  </div>
                  <p className="text-slate-600 mt-1 leading-relaxed text-[11px]">
                    {item.penjelasanBenahi}
                  </p>
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold pt-2 border-t border-emerald-200">
                  Rencana Masuk RKT & ARKAS
                </div>
              </div>
            </div>

            {/* Bottom Action bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 bg-slate-50/60 p-3 rounded-xl">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Kode Program ARKAS:</span>
                <span className="bg-white border border-slate-200 px-2 py-1 rounded text-slate-900 font-mono font-bold">
                  {item.programKegiatanArkas}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {item.tautanPMM && (
                  <a
                    href={item.tautanPMM}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-700 hover:text-blue-900 font-semibold inline-flex items-center gap-1"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Modul PMM Terkait</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                <button
                  onClick={() => handleAdd(item)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
                    copiedId === item.id 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  }`}
                >
                  {copiedId === item.id ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Berhasil Dimasukkan ke RKT!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>+ Masukkan ke Lembar Kerja RKT</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
