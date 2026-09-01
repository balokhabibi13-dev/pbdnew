import React from 'react';
import { SchoolProfile, RaporIndicator, RekomendasiItem, RKTItem, ARKASItem, RKJMData, ActiveTab } from '../../types/rapor';
import { formatRupiah } from '../../utils/csvHelper';
import {
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  BookOpen,
  Calculator,
  Award,
  Shield,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  ClipboardCheck,
  Building2,
  FileSpreadsheet,
  Layers
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';

interface DashboardViewProps {
  school: SchoolProfile;
  indicators: RaporIndicator[];
  recommendations?: RekomendasiItem[];
  rktItems: RKTItem[];
  arkasItems: ARKASItem[];
  rkjmData?: RKJMData;
  onNavigate: (tab: any) => void;
  onOpenImport?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  school,
  indicators,
  rktItems,
  arkasItems,
  rkjmData,
  onNavigate,
}) => {
  // Key Priority Indicators
  const indLiterasi = indicators.find(i => i.kode === 'A.1') || { skor: 84.2, skorTahunLalu: 79.0, deltaSkor: 5.2, capaian: 'Baik' };
  const indNumerasi = indicators.find(i => i.kode === 'A.2') || { skor: 76.8, skorTahunLalu: 78.2, deltaSkor: -1.4, capaian: 'Sedang' };
  const indKarakter = indicators.find(i => i.kode === 'A.3') || { skor: 91.0, skorTahunLalu: 91.0, deltaSkor: 0.0, capaian: 'Baik' };
  const indLingkungan = indicators.find(i => i.kode === 'D.8') || { skor: 88.5, skorTahunLalu: 86.4, deltaSkor: 2.1, capaian: 'Baik' };

  // Financial summary
  const totalArkas = arkasItems.reduce((acc, item) => acc + item.totalAnggaran, 0);
  const sisaPagu = Math.max(0, school.totalPaguBOS - totalArkas);
  const persentaseSerapan = school.totalPaguBOS > 0 ? ((totalArkas / school.totalPaguBOS) * 100).toFixed(1) : '0';

  // Chart data for Bar Chart
  const chartData = indicators.slice(0, 8).map(ind => ({
    name: ind.kode,
    fullName: ind.namaIndikator,
    skor: ind.skor,
    tahunLalu: ind.skorTahunLalu,
    capaian: ind.capaian
  }));

  const formatDelta = (delta: number) => {
    if (delta > 0) return `↑ ${delta.toFixed(1)}% dari 2025`;
    if (delta < 0) return `↓ ${Math.abs(delta).toFixed(1)}% dari 2025`;
    return 'Stabil dari 2025';
  };

  const getDeltaClass = (delta: number) => {
    if (delta > 0) return 'text-emerald-600';
    if (delta < 0) return 'text-rose-500';
    return 'text-slate-400';
  };

  return (
    <div className="space-y-6">
      {/* 4 Top Editorial Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Literasi */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Kemampuan Literasi
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight">
            {indLiterasi.skor.toFixed(1)}%
          </div>
          <div className={`text-[10px] font-medium mt-1 flex items-center gap-1 ${getDeltaClass(indLiterasi.deltaSkor)}`}>
            {formatDelta(indLiterasi.deltaSkor)}
          </div>
        </div>

        {/* Numerasi */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Kemampuan Numerasi
          </div>
          <div className="text-2xl sm:text-3xl font-black text-orange-500 tracking-tight">
            {indNumerasi.skor.toFixed(1)}%
          </div>
          <div className={`text-[10px] font-medium mt-1 flex items-center gap-1 ${getDeltaClass(indNumerasi.deltaSkor)}`}>
            {formatDelta(indNumerasi.deltaSkor)}
          </div>
        </div>

        {/* Karakter */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Indeks Karakter
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">
            {indKarakter.skor.toFixed(1)}%
          </div>
          <div className={`text-[10px] font-medium mt-1 flex items-center gap-1 ${getDeltaClass(indKarakter.deltaSkor)}`}>
            {formatDelta(indKarakter.deltaSkor)}
          </div>
        </div>

        {/* Lingkungan */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Iklim Lingkungan Belajar
          </div>
          <div className="text-2xl sm:text-3xl font-black text-indigo-600 tracking-tight">
            {indLingkungan.skor.toFixed(1)}%
          </div>
          <div className={`text-[10px] font-medium mt-1 flex items-center gap-1 ${getDeltaClass(indLingkungan.deltaSkor)}`}>
            {formatDelta(indLingkungan.deltaSkor)}
          </div>
        </div>
      </div>

      {/* Main Grid: 8 Cols (Table & Charts) + 4 Cols (Sidebar Widgets) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Analisis RKT & ARKAS (Integrasi CSV) Table Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap justify-between items-center gap-2">
              <div>
                <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                  Analisis RKT & ARKAS (Integrasi CSV)
                </h3>
                <p className="text-xs text-slate-500">
                  Sinkronisasi program kegiatan berbasis akar masalah rapor pendidikan
                </p>
              </div>
              <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-600">
                {rktItems.length} KEGIATAN TERDETEKSI
              </span>
            </div>

            <div className="overflow-x-auto p-4">
              <table className="w-full text-xs text-left">
                <thead className="text-[10px] text-slate-400 uppercase font-bold border-b border-slate-100">
                  <tr>
                    <th className="pb-2.5 font-semibold">Identifikasi Masalah</th>
                    <th className="pb-2.5 font-semibold">Akar Masalah</th>
                    <th className="pb-2.5 font-semibold">Kegiatan Benahi</th>
                    <th className="pb-2.5 font-semibold text-right">Biaya</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {rktItems.slice(0, 5).map((item, idx) => (
                    <tr key={item.id || idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 font-medium text-slate-700 max-w-[170px] truncate pr-2">
                        {item.identifikasi}
                      </td>
                      <td className="py-3 text-slate-500 italic max-w-[180px] truncate pr-2">
                        {item.akarMasalah}
                      </td>
                      <td className="py-3 text-blue-600 font-medium max-w-[190px] truncate pr-2">
                        {item.kegiatanBenahi}
                      </td>
                      <td className="py-3 font-bold text-slate-800 text-right whitespace-nowrap">
                        {item.butuhAnggaran ? formatRupiah(item.estimasiBiaya) : 'Non-Biaya'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 text-[11px]">
                Menampilkan 5 dari {rktItems.length} butir rencana kerja tahunan
              </span>
              <button
                onClick={() => onNavigate('lembar-kerja-rkt')}
                className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                Lihat Seluruh Lembar RKT &rarr;
              </button>
            </div>
          </div>

          {/* Bar Chart Comparison Card */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Perbandingan Skor Capaian Rapor Pendidikan vs Tahun Lalu
                </h3>
                <p className="text-xs text-slate-500">
                  Visualisasi kemajuan indikator prioritas mutu satuan pendidikan
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-xs inline-block" /> 2026 (Sekarang)
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2.5 h-2.5 bg-slate-300 rounded-xs inline-block" /> 2025 (Tahun Lalu)
                </span>
              </div>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip 
                    formatter={(value: any, name: any) => [
                      `${Number(value).toFixed(2)} pts`, 
                      name === 'skor' ? 'Skor 2026' : 'Skor 2025'
                    ]}
                    labelFormatter={(label: any) => {
                      const found = chartData.find(d => d.name === label);
                      return `${label} - ${found?.fullName || ''}`;
                    }}
                    contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar dataKey="tahunLalu" fill="#cbd5e1" radius={[3, 3, 0, 0]} name="tahunLalu" />
                  <Bar dataKey="skor" fill="#2563eb" radius={[3, 3, 0, 0]} name="skor">
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.capaian === 'Baik' ? '#10b981' : entry.capaian === 'Sedang' ? '#f59e0b' : '#ef4444'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 4-Step PBD Alur Cards */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Alur Siklus Perencanaan Berbasis Data (PBD) Satuan Pendidikan
                </h3>
                <p className="text-xs text-slate-500">
                  Tahapan terpadu Kemendikdasmen dari Identifikasi, Refleksi, Benahi, hingga Evaluasi
                </p>
              </div>
              <button
                onClick={() => onNavigate('panduan-pbd')}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
              >
                Panduan Lengkap &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Tahap 1 */}
              <div className="p-3.5 rounded-lg bg-blue-50/50 border border-blue-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                      Tahap 1
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">1. IDENTIFIKASI</h4>
                  <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                    Memaknai data kondisi mutu melalui Laporan Rapor Pendidikan 2026.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('laporan-rapor')}
                  className="mt-3 text-[11px] font-bold text-blue-700 hover:underline flex items-center gap-1"
                >
                  Laporan Rapor &rarr;
                </button>
              </div>

              {/* Tahap 2 */}
              <div className="p-3.5 rounded-lg bg-amber-50/50 border border-amber-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                      Tahap 2
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">2. REFLEKSI</h4>
                  <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                    Menetapkan indikator prioritas dan menelusuri akar masalah utama.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('rekom-prioritas')}
                  className="mt-3 text-[11px] font-bold text-amber-700 hover:underline flex items-center gap-1"
                >
                  Rekom Prioritas &rarr;
                </button>
              </div>

              {/* Tahap 3 */}
              <div className="p-3.5 rounded-lg bg-emerald-50/50 border border-emerald-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                      Tahap 3
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">3. BENAHI</h4>
                  <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                    Menyusun RKT dan menuangkan kegiatan berbiaya ke rancangan ARKAS.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('menu-rkt')}
                  className="mt-3 text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  Menu RKT &rarr;
                </button>
              </div>

              {/* Tahap 4 */}
              <div className="p-3.5 rounded-lg bg-indigo-50/50 border border-indigo-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">
                      Tahap 4
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">4. EVALUASI</h4>
                  <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                    Monitoring berkala serta penyelarasan strategi 4 tahunan (RKJM).
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('menu-rkjm')}
                  className="mt-3 text-[11px] font-bold text-indigo-700 hover:underline flex items-center gap-1"
                >
                  Menu RKJM &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 Cols - Editorial Widgets) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Data Sekolah Widget (Dark Slate Card) */}
          <div className="bg-slate-800 text-white p-5 rounded-xl border border-slate-700 shadow-xl">
            <h3 className="font-bold mb-4 flex items-center text-sm">
              <span className="w-3.5 h-3.5 bg-blue-500 rounded mr-2 inline-block"></span>
              Data Sekolah
            </h3>
            <div className="space-y-3">
              <div className="pb-2 border-b border-slate-700">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">NPSN</div>
                <div className="text-sm font-mono tracking-wider text-white">
                  {school.npsn || '202045678'}
                </div>
              </div>
              <div className="pb-2 border-b border-slate-700">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Alamat</div>
                <div className="text-xs leading-relaxed text-slate-200">
                  {school.alamat || 'Jl. Pendidikan No. 12, Kota Cerdas, Indonesia'}
                </div>
              </div>
              <div className="pb-2 border-b border-slate-700">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Kepala Sekolah & NIP</div>
                <div className="text-xs font-medium text-slate-200">
                  {school.namaKepalaSekolah || 'Dr. Budi Santoso, M.Pd'}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  NIP. {school.nipKepalaSekolah || '198203152008011012'}
                </div>
              </div>
              <div className="pb-2">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Pagu Anggaran BOSP</div>
                <div className="text-sm font-bold text-amber-400 font-mono">
                  {formatRupiah(school.totalPaguBOS)}
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('data-sekolah')}
              className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-xs font-bold transition-colors text-white text-center block"
            >
              KELOLA DATA SEKOLAH
            </button>
          </div>

          {/* Ringkasan RKJM Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-800 text-sm mb-3">
              Ringkasan RKJM
            </h3>
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
              <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">
                VISI SATUAN PENDIDIKAN
              </div>
              <div className="text-xs text-indigo-950 mt-1 font-semibold leading-relaxed">
                "{rkjmData?.visi || 'MEWUJUDKAN PESERTA DIDIK YANG “G E S I T” (GEMILANG, ETIKA, SEHAT, INOVASI, TERAMPIL)'}"
              </div>
              {rkjmData?.misi && rkjmData.misi.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-indigo-100/80 text-[11px] text-indigo-800 font-medium line-clamp-2">
                  <span className="font-bold text-indigo-600">Misi 1:</span> {rkjmData.misi[0]}
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Strategi 4 Tahunan</span>
              <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold uppercase text-[9px]">
                Valid PBD
              </span>
            </div>

            <div className="mt-2 space-y-2">
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-3/4 rounded-full"></div>
              </div>
              <div className="flex justify-between text-[10px] font-medium text-slate-600">
                <span>Tahun Ke-1 (Digitalisasi & Literasi)</span>
                <span className="font-bold text-slate-800">75%</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('menu-rkjm')}
              className="w-full mt-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded text-xs font-semibold transition-colors text-center block"
            >
              Buka Rencana Jangka Menengah &rarr;
            </button>
          </div>

          {/* Ringkasan ARKAS BOSP Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-800 text-sm">
                Alokasi Pagu ARKAS
              </h3>
              <span className="text-xs font-bold text-blue-600">
                {persentaseSerapan}% Terencana
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Pagu BOSP Sekolah:</span>
                <strong className="text-slate-800 font-mono">{formatRupiah(school.totalPaguBOS)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Teranggarkan:</span>
                <strong className="text-blue-600 font-bold font-mono">{formatRupiah(totalArkas)}</strong>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-100">
                <span className="text-slate-500">Sisa Pagu Tersedia:</span>
                <strong className="text-emerald-600 font-bold font-mono">{formatRupiah(sisaPagu)}</strong>
              </div>
            </div>

            <button
              onClick={() => onNavigate('lembar-kerja-arkas')}
              className="w-full mt-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs rounded transition-colors text-center block"
            >
              Kelola Rincian Belanja ARKAS &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

