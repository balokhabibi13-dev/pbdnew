import React, { useState } from 'react';
import { ARKASItem, SchoolProfile, RKTItem } from '../../types/rapor';
import { formatRupiah, exportToCSV } from '../../utils/csvHelper';
import { 
  Calculator, 
  Plus, 
  Trash2, 
  Edit3, 
  Download, 
  Printer, 
  Wallet, 
  PieChart, 
  CheckCircle2, 
  Search,
  Filter,
  DollarSign,
  Layers
} from 'lucide-react';

interface LembarKerjaARKASViewProps {
  arkasItems: ARKASItem[];
  school: SchoolProfile;
  rktItems: RKTItem[];
  onUpdateARKAS: (items: ARKASItem[]) => void;
  onAddNewARKAS: () => void;
  onEditARKAS: (item: ARKASItem) => void;
  onOpenPrint: () => void;
}

export const LembarKerjaARKASView: React.FC<LembarKerjaARKASViewProps> = ({
  arkasItems,
  school,
  rktItems,
  onUpdateARKAS,
  onAddNewARKAS,
  onEditARKAS,
  onOpenPrint,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTriwulan, setFilterTriwulan] = useState<string>('ALL');
  const [filterSumberDana, setFilterSumberDana] = useState<string>('ALL');

  const filteredItems = arkasItems.filter(item => {
    const matchSearch = item.uraianBelanja.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kegiatanRktNama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kodeProgram.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.namaProgram.toLowerCase().includes(searchQuery.toLowerCase());

    const matchTriwulan = filterTriwulan === 'ALL' || item.triwulan === filterTriwulan;
    const matchSumber = filterSumberDana === 'ALL' || item.sumberDana === filterSumberDana;

    return matchSearch && matchTriwulan && matchSumber;
  });

  const totalAnggaran = arkasItems.reduce((acc, curr) => acc + curr.totalAnggaran, 0);
  const sisaPagu = Math.max(0, school.totalPaguBOS - totalAnggaran);
  const persentaseAlokasi = school.totalPaguBOS > 0 ? ((totalAnggaran / school.totalPaguBOS) * 100).toFixed(1) : '0';

  // Triwulan breakdown
  const tw1 = arkasItems.filter(a => a.triwulan.includes('TW 1') || a.triwulan.includes('Tahap 1')).reduce((a, b) => a + b.totalAnggaran, 0);
  const tw2 = arkasItems.filter(a => a.triwulan.includes('TW 2')).reduce((a, b) => a + b.totalAnggaran, 0);
  const tw3 = arkasItems.filter(a => a.triwulan.includes('TW 3') || a.triwulan.includes('Tahap 2')).reduce((a, b) => a + b.totalAnggaran, 0);
  const tw4 = arkasItems.filter(a => a.triwulan.includes('TW 4')).reduce((a, b) => a + b.totalAnggaran, 0);

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus uraian belanja ARKAS ini?')) {
      const updated = arkasItems.filter(item => item.id !== id).map((item, index) => ({
        ...item,
        nomor: index + 1
      }));
      onUpdateARKAS(updated);
    }
  };

  const handleExport = () => {
    const headers = [
      'No',
      'Kode Program/Rekening',
      'Standar / Nama Program',
      'Kegiatan RKT Terkait',
      'Uraian Rincian Belanja',
      'Volume',
      'Satuan',
      'Harga Satuan (Rp)',
      'Total Anggaran (Rp)',
      'Sumber Dana',
      'Triwulan Penyerapan',
      'Status Realisasi'
    ];
    const rows = filteredItems.map(item => [
      item.nomor,
      item.kodeProgram,
      item.namaProgram,
      item.kegiatanRktNama,
      item.uraianBelanja,
      item.volume,
      item.satuan,
      item.hargaSatuan,
      item.totalAnggaran,
      item.sumberDana,
      item.triwulan,
      item.statusRealisasi
    ]);
    exportToCSV(`Lembar_Kerja_Rancangan_ARKAS_${school.npsn}_2026`, headers, rows);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner Info */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>4. Lembar Kerja Rancangan ARKAS (Aplikasi Rencana Kegiatan & Anggaran Sekolah)</span>
          </div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight mt-1">
            Rancangan Anggaran Belanja Bantuan Operasional Satuan Pendidikan (BOSP)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 max-w-3xl leading-relaxed">
            Rincian penganggaran kegiatan pembenahan mutu yang memerlukan dana BOSP/BOSDA sebagai rujukan input ke dalam aplikasi ARKAS Kemendikdasmen.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onAddNewARKAS}
            id="btn-add-arkas"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-bold shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Rincian Belanja</span>
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold shadow-xs transition"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Ekspor CSV</span>
          </button>

          <button
            onClick={onOpenPrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold shadow-xs transition"
          >
            <Printer className="w-4 h-4 text-blue-200" />
            <span>Cetak ARKAS</span>
          </button>
        </div>
      </div>

      {/* Financial Health KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Total Pagu BOSP Sekolah</div>
          <div className="text-xl font-black text-slate-900 mt-1">
            {formatRupiah(school.totalPaguBOS)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Pagu Alokasi APBN TP {school.tahunAjaran}</div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Total Rencana Belanja</div>
          <div className="text-xl font-black text-indigo-700 mt-1">
            {formatRupiah(totalAnggaran)}
          </div>
          <div className="text-[11px] text-indigo-600 font-semibold mt-1">
            {persentaseAlokasi}% dari Pagu Terencana
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Sisa Pagu Belum Dialokasi</div>
          <div className={`text-xl font-black mt-1 ${sisaPagu < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
            {formatRupiah(sisaPagu)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {sisaPagu === 0 ? '✓ Pagu Pas 100%' : sisaPagu > 0 ? 'Dapat dialokasikan lagi' : 'Peringatan: Over Budget'}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Distribusi Triwulan</div>
          <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-700 mt-1.5 font-mono">
            <div>TW 1: <strong>{formatRupiah(tw1)}</strong></div>
            <div>TW 2: <strong>{formatRupiah(tw2)}</strong></div>
            <div>TW 3: <strong>{formatRupiah(tw3)}</strong></div>
            <div>TW 4: <strong>{formatRupiah(tw4)}</strong></div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari uraian belanja, program, atau kegiatan RKT..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-600">Triwulan / Tahap:</span>
            <select
              value={filterTriwulan}
              onChange={(e) => setFilterTriwulan(e.target.value)}
              className="border border-slate-300 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500 text-xs font-medium"
            >
              <option value="ALL">Semua Triwulan</option>
              <option value="TW 1">TW 1 (Triwulan 1)</option>
              <option value="TW 2">TW 2 (Triwulan 2)</option>
              <option value="TW 3">TW 3 (Triwulan 3)</option>
              <option value="TW 4">TW 4 (Triwulan 4)</option>
              <option value="Tahap 1 (TW 1-2)">Tahap 1 (TW 1-2)</option>
              <option value="Tahap 2 (TW 3-4)">Tahap 2 (TW 3-4)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-600">Sumber Dana:</span>
            <select
              value={filterSumberDana}
              onChange={(e) => setFilterSumberDana(e.target.value)}
              className="border border-slate-300 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500 text-xs font-medium"
            >
              <option value="ALL">Semua Sumber Dana</option>
              <option value="BOSP Reguler">BOSP Reguler</option>
              <option value="BOSP Kinerja">BOSP Kinerja</option>
              <option value="BOSDA">BOSDA</option>
              <option value="Komite Sekolah">Komite Sekolah</option>
            </select>
          </div>
        </div>
      </div>

      {/* ARKAS Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111e38] text-white text-[11px] uppercase font-bold tracking-wider">
              <tr>
                <th className="py-3 px-3 w-12 text-center">No</th>
                <th className="py-3 px-3 w-28 text-center">Kode Program</th>
                <th className="py-3 px-4 min-w-[200px]">Program / Kegiatan RKT</th>
                <th className="py-3 px-4 min-w-[240px]">Uraian Rincian Belanja</th>
                <th className="py-3 px-3 text-center w-24">Vol & Satuan</th>
                <th className="py-3 px-3 text-right w-28">Harga Satuan</th>
                <th className="py-3 px-3 text-right w-32">Total Anggaran</th>
                <th className="py-3 px-3 text-center w-28">Triwulan / Sumber</th>
                <th className="py-3 px-3 text-center w-24">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    Belum ada uraian belanja ARKAS yang sesuai filter.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-3 text-center font-bold text-slate-800">
                      {item.nomor}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className="font-mono text-[11px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-800 border border-slate-200">
                        {item.kodeProgram}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-xs">
                        {item.namaProgram}
                      </div>
                      <div className="text-[11px] text-blue-700 mt-0.5 leading-snug">
                        RKT: {item.kegiatanRktNama}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-800 font-medium leading-snug">
                      {item.uraianBelanja}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono">
                      <span className="font-bold">{item.volume}</span> {item.satuan}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-slate-700">
                      {formatRupiah(item.hargaSatuan)}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-indigo-700 text-sm">
                      {formatRupiah(item.totalAnggaran)}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className="inline-block bg-indigo-50 text-indigo-800 font-bold px-2 py-0.5 rounded text-[10px] border border-indigo-100">
                        {item.triwulan}
                      </span>
                      <div className="text-[10px] text-slate-500 mt-0.5">{item.sumberDana}</div>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => onEditARKAS(item)}
                          className="p-1 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded"
                          title="Edit Rincian ARKAS"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded"
                          title="Hapus Rincian"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {/* Total Footer Row */}
            <tfoot className="bg-slate-50 font-bold border-t-2 border-slate-200">
              <tr>
                <td colSpan={6} className="py-3.5 px-4 text-right text-slate-800 text-xs">
                  TOTAL KESELURUHAN RENCANA ANGGARAN ARKAS:
                </td>
                <td className="py-3.5 px-3 text-right text-indigo-800 font-mono text-sm font-black">
                  {formatRupiah(totalAnggaran)}
                </td>
                <td colSpan={2} className="py-3.5 px-3 text-center text-xs text-slate-500">
                  {arkasItems.length} Rincian Belanja
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
