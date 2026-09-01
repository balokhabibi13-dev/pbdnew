import React, { useState } from 'react';
import { RaporIndicator, CapaianType } from '../../types/rapor';
import { 
  FileSpreadsheet, 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Info, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Sparkles,
  Download
} from 'lucide-react';
import { exportToCSV } from '../../utils/csvHelper';

interface LaporanRaporViewProps {
  indicators: RaporIndicator[];
  onSelectIndicatorForRkt?: (indicator: RaporIndicator) => void;
}

export const LaporanRaporView: React.FC<LaporanRaporViewProps> = ({
  indicators,
  onSelectIndicatorForRkt,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDimensi, setSelectedDimensi] = useState<string>('ALL');
  const [selectedCapaian, setSelectedCapaian] = useState<string>('ALL');
  const [selectedIndicatorDetail, setSelectedIndicatorDetail] = useState<RaporIndicator | null>(null);

  const filteredIndicators = indicators.filter((ind) => {
    const matchSearch = ind.namaIndikator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ind.kode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ind.keterangan.toLowerCase().includes(searchQuery.toLowerCase());

    const matchDimensi = selectedDimensi === 'ALL' || ind.dimensiSingkat === selectedDimensi;
    const matchCapaian = selectedCapaian === 'ALL' || ind.capaian === selectedCapaian;

    return matchSearch && matchDimensi && matchCapaian;
  });

  const getCapaianBadge = (capaian: CapaianType) => {
    switch (capaian) {
      case 'Baik':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Baik</span>;
      case 'Sedang':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300"><AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Sedang</span>;
      case 'Kurang':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300"><AlertCircle className="w-3.5 h-3.5 text-rose-600" /> Kurang</span>;
    }
  };

  const handleExportThis = () => {
    const headers = [
      'Kode Indikator',
      'Nama Indikator',
      'Dimensi',
      'Capaian 2026',
      'Skor 2026',
      'Skor 2025',
      'Perubahan Delta',
      'Peringkat Nasional',
      'Peringkat Kabupaten',
      'Keterangan Capaian',
      'Akar Masalah Utama',
      'Inspirasi Rekomendasi Benahi'
    ];
    const rows = filteredIndicators.map(i => [
      i.kode,
      i.namaIndikator,
      i.dimensi,
      i.capaian,
      i.skor,
      i.skorTahunLalu,
      i.deltaSkor,
      i.peringkatNasional,
      i.peringkatKabupaten,
      i.keterangan,
      i.akarMasalahUtama,
      i.rekomendasiBenahi
    ]);
    exportToCSV('Laporan_Rapor_Pendidikan_2026', headers, rows);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-700 font-semibold text-xs uppercase tracking-wider">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Laporan Rapor Pendidikan 2026</span>
          </div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight mt-1">
            Daftar Capaian Seluruh Indikator Mutu Satuan Pendidikan
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Menampilkan data capaian indikator mutu dimensi A s.d. E berdasarkan hasil Asesmen Nasional & Survei Lingkungan Belajar (Sulingjar).
          </p>
        </div>

        <button
          onClick={handleExportThis}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold shadow-xs transition"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Unduh CSV Rapor</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari kode (misal A.1, D.1) atau nama indikator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Dimensi:</span>
          </div>
          <select
            value={selectedDimensi}
            onChange={(e) => setSelectedDimensi(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500 font-medium"
          >
            <option value="ALL">Semua Dimensi (A, C, D, E)</option>
            <option value="A">Dimensi A (Hasil Belajar)</option>
            <option value="C">Dimensi C (Kompetensi GTK)</option>
            <option value="D">Dimensi D (Kualitas Pembelajaran)</option>
            <option value="E">Dimensi E (Pengelolaan Sekolah)</option>
          </select>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold ml-2">
            <span>Capaian:</span>
          </div>
          <select
            value={selectedCapaian}
            onChange={(e) => setSelectedCapaian(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500 font-medium"
          >
            <option value="ALL">Semua Capaian</option>
            <option value="Baik">Hanya Baik</option>
            <option value="Sedang">Hanya Sedang</option>
            <option value="Kurang">Hanya Kurang</option>
          </select>
        </div>
      </div>

      {/* Table of Indicators */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-white text-[11px] uppercase font-bold tracking-wider">
              <tr>
                <th className="py-3 px-4 w-16 text-center">Kode</th>
                <th className="py-3 px-4 min-w-[220px]">Nama Indikator & Dimensi</th>
                <th className="py-3 px-3 text-center w-28">Capaian 2026</th>
                <th className="py-3 px-4 text-center w-28">Skor Saat Ini</th>
                <th className="py-3 px-3 text-center w-28">Perubahan Delta</th>
                <th className="py-3 px-3 text-center w-36">Peringkat Kab/Kota</th>
                <th className="py-3 px-4 text-center w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
              {filteredIndicators.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Tidak ada indikator yang sesuai dengan filter pencarian.
                  </td>
                </tr>
              ) : (
                filteredIndicators.map((ind) => {
                  const isPositive = ind.deltaSkor >= 0;
                  return (
                    <tr 
                      key={ind.id}
                      className="hover:bg-blue-50/50 transition cursor-pointer"
                      onClick={() => setSelectedIndicatorDetail(ind)}
                    >
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-900">
                        <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200 text-xs">
                          {ind.kode}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 text-sm">
                          {ind.namaIndikator}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {ind.dimensi}
                        </div>
                        {ind.isPrioritas && (
                          <span className="inline-block mt-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                            ★ Indikator Prioritas Kemendikdasmen
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        {getCapaianBadge(ind.capaian)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="text-base font-black text-slate-900">
                          {ind.skor.toFixed(2)}
                        </div>
                        <div className="w-16 bg-slate-100 h-1.5 rounded-full mx-auto mt-1 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              ind.capaian === 'Baik' ? 'bg-emerald-500' : ind.capaian === 'Sedang' ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${Math.min(100, ind.skor)}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <div className={`inline-flex items-center gap-1 font-bold text-xs ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                          <span>{isPositive ? `+${ind.deltaSkor.toFixed(2)}` : ind.deltaSkor.toFixed(2)}</span>
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Lalu: {ind.skorTahunLalu.toFixed(2)}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          {ind.peringkatKabupaten}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIndicatorDetail(ind);
                          }}
                          className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold text-xs transition border border-blue-200"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail Indikator */}
      {selectedIndicatorDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  {selectedIndicatorDetail.kode}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  {selectedIndicatorDetail.namaIndikator}
                </h3>
                <p className="text-xs text-slate-500">{selectedIndicatorDetail.dimensi}</p>
              </div>
              <button
                onClick={() => setSelectedIndicatorDetail(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Score cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <div className="text-[11px] text-slate-500 font-semibold">Capaian Saat Ini</div>
                <div className="text-xl font-black text-slate-900 mt-0.5">
                  {selectedIndicatorDetail.skor.toFixed(2)}
                </div>
                <div className="mt-1">{getCapaianBadge(selectedIndicatorDetail.capaian)}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <div className="text-[11px] text-slate-500 font-semibold">Tahun Sebelumnya</div>
                <div className="text-xl font-black text-slate-600 mt-0.5">
                  {selectedIndicatorDetail.skorTahunLalu.toFixed(2)}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">TP 2024/2025</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <div className="text-[11px] text-slate-500 font-semibold">Peringkat Nasional</div>
                <div className="text-xs font-bold text-slate-800 mt-1.5">
                  {selectedIndicatorDetail.peringkatNasional}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Kab: {selectedIndicatorDetail.peringkatKabupaten}</div>
              </div>
            </div>

            {/* Summary & Akar Masalah */}
            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-100">
                <div className="font-bold text-blue-900 mb-1 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span>Makna Capaian Indikator</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {selectedIndicatorDetail.keterangan}
                </p>
              </div>

              <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-100">
                <div className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Akar Masalah Teridentifikasi</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {selectedIndicatorDetail.akarMasalahUtama}
                </p>
              </div>

              <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-100">
                <div className="font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Inspirasi Kegiatan Benahi PBD</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {selectedIndicatorDetail.rekomendasiBenahi}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedIndicatorDetail(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Tutup
              </button>
              {onSelectIndicatorForRkt && (
                <button
                  onClick={() => {
                    onSelectIndicatorForRkt(selectedIndicatorDetail);
                    setSelectedIndicatorDetail(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tuangkan ke RKT &rarr;</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
