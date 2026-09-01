import React, { useState } from 'react';
import { RKTItem, SchoolProfile } from '../../types/rapor';
import { formatRupiah, exportToCSV } from '../../utils/csvHelper';
import { 
  ClipboardList, 
  Plus, 
  Trash2, 
  Edit3, 
  Download, 
  Printer, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  DollarSign, 
  Search,
  Filter,
  ArrowRight
} from 'lucide-react';

interface LembarKerjaRKTViewProps {
  rktItems: RKTItem[];
  school: SchoolProfile;
  onUpdateRKT: (items: RKTItem[]) => void;
  onAddNewRKT: () => void;
  onEditRKT: (item: RKTItem) => void;
  onNavigateToArkas: () => void;
  onOpenPrint: () => void;
}

export const LembarKerjaRKTView: React.FC<LembarKerjaRKTViewProps> = ({
  rktItems,
  school,
  onUpdateRKT,
  onAddNewRKT,
  onEditRKT,
  onNavigateToArkas,
  onOpenPrint,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAnggaran, setFilterAnggaran] = useState<'ALL' | 'YA' | 'TIDAK'>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredItems = rktItems.filter(item => {
    const matchSearch = item.identifikasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kegiatanBenahi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.akarMasalah.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.penanggungJawab.toLowerCase().includes(searchQuery.toLowerCase());

    const matchAnggaran = filterAnggaran === 'ALL' || (filterAnggaran === 'YA' ? item.butuhAnggaran : !item.butuhAnggaran);
    const matchStatus = filterStatus === 'ALL' || item.status === filterStatus;

    return matchSearch && matchAnggaran && matchStatus;
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus butir kegiatan RKT ini?')) {
      const updated = rktItems.filter(item => item.id !== id).map((item, index) => ({
        ...item,
        nomor: index + 1
      }));
      onUpdateRKT(updated);
    }
  };

  const handleExport = () => {
    const headers = [
      'No',
      'Identifikasi Masalah',
      'Akar Masalah',
      'Kegiatan Benahi',
      'Penjelasan Implementasi Kegiatan',
      'Apakah Kegiatan Membutuhkan Anggaran?',
      'Estimasi Biaya',
      'Target Waktu Pelaksanaan',
      'Penanggung Jawab (PIC)',
      'Status Pelaksanaan'
    ];
    const rows = filteredItems.map(item => [
      item.nomor,
      item.identifikasi,
      item.akarMasalah,
      item.kegiatanBenahi,
      item.penjelasanImplementasi,
      item.butuhAnggaran ? 'Ya' : 'Tidak',
      item.estimasiBiaya,
      item.targetWaktu,
      item.penanggungJawab,
      item.status
    ]);
    exportToCSV(`Lembar_Kerja_RKT_${school.npsn}_2026`, headers, rows);
  };

  const totalEstimasiBiaya = rktItems.reduce((acc, curr) => acc + (curr.butuhAnggaran ? curr.estimasiBiaya : 0), 0);
  const totalKegiatanAnggaran = rktItems.filter(r => r.butuhAnggaran).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs uppercase tracking-wider">
            <ClipboardList className="w-4 h-4" />
            <span>3. Lembar Kerja RKT (Rencana Kerja Tahunan)</span>
          </div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight mt-1">
            Lembar Kerja Rencana Kegiatan Tahunan 2026
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 max-w-3xl leading-relaxed">
            Dokumen kerja perencanaan kegiatan pembenahan mutu berdasarkan identifikasi, refleksi akar masalah, dan penentuan rencana tindak lanjut beserta penanggung jawab dan kebutuhan anggaran.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onAddNewRKT}
            id="btn-add-rkt"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Kegiatan RKT</span>
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
            <span>Cetak RKT</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Total Kegiatan Terencana</div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {rktItems.length} <span className="text-xs font-normal text-slate-500">Program</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Kegiatan Membutuhkan Anggaran (BOS)</div>
          <div className="text-2xl font-black text-blue-700 mt-1">
            {totalKegiatanAnggaran} <span className="text-xs font-normal text-slate-500">Kegiatan ({formatRupiah(totalEstimasiBiaya)})</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-semibold">Integrasi ARKAS</div>
            <div className="text-xs font-bold text-emerald-700 mt-1">
              {totalKegiatanAnggaran} Kegiatan Siap Dianggarkan
            </div>
          </div>
          <button
            onClick={onNavigateToArkas}
            className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-lg transition flex items-center gap-1"
          >
            <span>Buka ARKAS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari kegiatan, masalah, akar masalah, atau PIC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-600">Kebutuhan Anggaran:</span>
            <select
              value={filterAnggaran}
              onChange={(e) => setFilterAnggaran(e.target.value as any)}
              className="border border-slate-300 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500 text-xs font-medium"
            >
              <option value="ALL">Semua Kegiatan</option>
              <option value="YA">Hanya Membutuhkan Anggaran (Ya)</option>
              <option value="TIDAK">Tanpa Anggaran (Tidak)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-600">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-slate-300 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500 text-xs font-medium"
            >
              <option value="ALL">Semua Status</option>
              <option value="Belum Dimulai">Belum Dimulai</option>
              <option value="Sedang Berjalan">Sedang Berjalan</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table of RKT Sheet */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111e38] text-white text-[11px] uppercase font-bold tracking-wider">
              <tr>
                <th className="py-3 px-3 w-12 text-center">No</th>
                <th className="py-3 px-4 min-w-[200px]">Identifikasi Masalah</th>
                <th className="py-3 px-4 min-w-[200px]">Akar Masalah</th>
                <th className="py-3 px-4 min-w-[220px]">Kegiatan Benahi</th>
                <th className="py-3 px-4 min-w-[220px]">Penjelasan Implementasi</th>
                <th className="py-3 px-3 text-center w-28">Butuh Anggaran?</th>
                <th className="py-3 px-3 min-w-[120px]">Target & PIC</th>
                <th className="py-3 px-3 text-center w-28">Status</th>
                <th className="py-3 px-3 text-center w-24">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    Belum ada data RKT yang sesuai kriteria. Klik tombol "Tambah Kegiatan RKT" di atas untuk menambahkan.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-3 text-center font-bold text-slate-800">
                      {item.nomor}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-900 leading-snug">
                      {item.identifikasi}
                      {item.indikatorTerkait && (
                        <span className="block text-[10px] text-blue-600 font-mono mt-0.5">
                          Terkait: {item.indikatorTerkait}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 leading-snug">
                      {item.akarMasalah}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 leading-snug">
                        {item.kegiatanBenahi}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 leading-snug">
                      {item.penjelasanImplementasi}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      {item.butuhAnggaran ? (
                        <div>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                            Ya
                          </span>
                          {item.estimasiBiaya > 0 && (
                            <div className="text-[10px] font-bold text-slate-700 mt-0.5">
                              {formatRupiah(item.estimasiBiaya)}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600">
                          Tidak
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="text-[11px] font-semibold text-slate-800 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{item.targetWaktu}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        PIC: <strong>{item.penanggungJawab}</strong>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'Selesai'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : item.status === 'Sedang Berjalan'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => onEditRKT(item)}
                          className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                          title="Edit Kegiatan RKT"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded"
                          title="Hapus Kegiatan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
