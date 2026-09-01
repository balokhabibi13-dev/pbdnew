import React, { useState } from 'react';
import { RKJMData, SchoolProfile } from '../../types/rapor';
import { formatRupiah, exportToCSV } from '../../utils/csvHelper';
import {
  Milestone,
  Target,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Save,
  CheckCircle2,
  Download,
  Printer,
  Calendar,
  Layers,
  Plus,
  Trash2
} from 'lucide-react';

interface MenuRKJMViewProps {
  rkjmData: RKJMData;
  school: SchoolProfile;
  onUpdateRKJM: (data: RKJMData) => void;
  onOpenPrint: () => void;
}

export const MenuRKJMView: React.FC<MenuRKJMViewProps> = ({
  rkjmData,
  school,
  onUpdateRKJM,
  onOpenPrint,
}) => {
  const [data, setData] = useState<RKJMData>({ ...rkjmData });
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'visi-misi' | 'swot' | 'roadmap'>('roadmap');

  const handleSave = () => {
    onUpdateRKJM(data);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleExportCSV = () => {
    const headers = [
      'Bagian RKJM',
      'Detail / Tahun',
      'Konten / Sasaran Strategis',
      'Indikator Capaian',
      'Estimasi Anggaran'
    ];
    const rows: (string | number)[][] = [
      ['Visi Sekolah', '-', data.visi, '-', '-'],
      ...data.misi.map((m, i) => ['Misi Sekolah', `Misi ${i + 1}`, m, '-', '-']),
      ...data.tujuan4Tahun.map((t, i) => ['Tujuan 4 Tahun', `Tujuan ${i + 1}`, t, '-', '-']),
      ...data.analisisLingkungan.kekuatanInternal.map(s => ['SWOT Internal', 'Kekuatan (Strengths)', s, '-', '-']),
      ...data.analisisLingkungan.kelemahanInternal.map(w => ['SWOT Internal', 'Kelemahan (Weaknesses)', w, '-', '-']),
      ...data.analisisLingkungan.peluangEksternal.map(o => ['SWOT Eksternal', 'Peluang (Opportunities)', o, '-', '-']),
      ...data.analisisLingkungan.ancamanEksternal.map(t => ['SWOT Eksternal', 'Tantangan (Threats)', t, '-', '-']),
      ...data.strategi4Tahunan.map(s => [
        'Roadmap 4 Tahun',
        s.tahun,
        `${s.targetCapaian} | Program: ${s.programUtama.join(', ')}`,
        s.indikatorKunci,
        s.estimasiAnggaran
      ])
    ];

    exportToCSV(`Dokumen_RKJM_4_Tahunan_${school.npsn}_2026_2029`, headers, rows);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white rounded-2xl p-6 shadow-md border border-indigo-800/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-bold border border-indigo-400/30">
              <Milestone className="w-3.5 h-3.5 text-indigo-300" />
              <span>Perencanaan Strategis Jangka Menengah (4 Tahunan)</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              RKJM: Rencana Kerja Jangka Menengah 2025 - 2029
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Disusun berdasarkan hasil sintesis evaluasi Rapor Pendidikan 2026 yang memuat Ringkasan Visi Misi, Analisis Lingkungan Strategis (SWOT), dan Strategi Pencapaian 4 Tahunan Satuan Pendidikan.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <button
              onClick={handleSave}
              id="btn-save-rkjm"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold shadow-xs transition"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Ekspor CSV</span>
            </button>

            <button
              onClick={onOpenPrint}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold shadow-xs transition"
            >
              <Printer className="w-4 h-4 text-emerald-200" />
              <span>Cetak RKJM</span>
            </button>
          </div>
        </div>
      </div>

      {isSaved && (
        <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl p-3.5 flex items-center gap-2 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Dokumen RKJM 4 Tahunan Berhasil Disimpan!</span>
        </div>
      )}

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'roadmap'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          1. Strategi & Roadmap Pencapaian 4 Tahunan
        </button>
        <button
          onClick={() => setActiveTab('visi-misi')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'visi-misi'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          2. Visi, Misi & Tujuan 4 Tahunan
        </button>
        <button
          onClick={() => setActiveTab('swot')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'swot'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          3. Analisis Lingkungan Strategis (SWOT)
        </button>
      </div>

      {/* TAB 1: 4-Year Strategic Roadmap */}
      {activeTab === 'roadmap' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.strategi4Tahunan.map((strat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border-2 border-slate-200 hover:border-blue-400 shadow-xs flex flex-col justify-between space-y-4 transition"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {strat.tahun}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">Tahap {idx + 1}</span>
                  </div>

                  <h4 className="text-sm font-black text-slate-900 mt-2.5 leading-snug">
                    {strat.targetCapaian}
                  </h4>

                  <div className="mt-3 space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Program Prioritas:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {strat.programUtama.map((prog, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                          <span className="leading-snug">{prog}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1 text-[11px]">
                  <div className="text-slate-500">
                    Indikator Kunci: <strong className="text-slate-800">{strat.indikatorKunci}</strong>
                  </div>
                  <div className="text-indigo-700 font-bold font-mono">
                    Estimasi Pagu: {formatRupiah(strat.estimasiAnggaran)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Visi Misi & Tujuan */}
      {activeTab === 'visi-misi' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Visi Satuan Pendidikan
            </label>
            <textarea
              rows={2}
              value={data.visi}
              onChange={(e) => setData({ ...data, visi: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-semibold text-slate-900 bg-slate-50/50"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800">
                Misi Satuan Pendidikan (4 Tahunan)
              </label>
            </div>
            <div className="space-y-2">
              {data.misi.map((m, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={m}
                    onChange={(e) => {
                      const updated = [...data.misi];
                      updated[idx] = e.target.value;
                      setData({ ...data, misi: updated });
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-800"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800">
                Tujuan Strategis 4 Tahunan Satuan Pendidikan
              </label>
            </div>
            <div className="space-y-2">
              {data.tujuan4Tahun.map((t, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={t}
                    onChange={(e) => {
                      const updated = [...data.tujuan4Tahun];
                      updated[idx] = e.target.value;
                      setData({ ...data, tujuan4Tahun: updated });
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-800"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Analisis Lingkungan SWOT */}
      {activeTab === 'swot' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kekuatan (Strengths) */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider border-b border-emerald-100 pb-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600" />
              <span>Kekuatan Internal (Strengths)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {data.analisisLingkungan.kekuatanInternal.map((item, idx) => (
                <li key={idx} className="p-2.5 bg-emerald-50/50 rounded-lg border border-emerald-100/80 leading-relaxed">
                  ✓ {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Kelemahan (Weaknesses) */}
          <div className="bg-white rounded-2xl p-5 border border-rose-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider border-b border-rose-100 pb-2">
              <span className="w-3 h-3 rounded-full bg-rose-600" />
              <span>Kelemahan Internal (Weaknesses - Hasil Rapor 2026)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {data.analisisLingkungan.kelemahanInternal.map((item, idx) => (
                <li key={idx} className="p-2.5 bg-rose-50/50 rounded-lg border border-rose-100/80 leading-relaxed">
                  ⚠ {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Peluang (Opportunities) */}
          <div className="bg-white rounded-2xl p-5 border border-blue-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-blue-800 font-bold text-xs uppercase tracking-wider border-b border-blue-100 pb-2">
              <span className="w-3 h-3 rounded-full bg-blue-600" />
              <span>Peluang Eksternal (Opportunities)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {data.analisisLingkungan.peluangEksternal.map((item, idx) => (
                <li key={idx} className="p-2.5 bg-blue-50/50 rounded-lg border border-blue-100/80 leading-relaxed">
                  ★ {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Tantangan (Threats) */}
          <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider border-b border-amber-100 pb-2">
              <span className="w-3 h-3 rounded-full bg-amber-600" />
              <span>Tantangan / Ancaman Eksternal (Threats)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {data.analisisLingkungan.ancamanEksternal.map((item, idx) => (
                <li key={idx} className="p-2.5 bg-amber-50/50 rounded-lg border border-amber-100/80 leading-relaxed">
                  ⚡ {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
