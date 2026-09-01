import React, { useState, useEffect } from 'react';
import { ARKASItem, RKTItem } from '../../types/rapor';
import { X, Save, Calculator } from 'lucide-react';
import { formatRupiah } from '../../utils/csvHelper';

interface AddEditARKASModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: ARKASItem) => void;
  initialItem?: ARKASItem | null;
  rktItems: RKTItem[];
  totalExisting: number;
}

export const AddEditARKASModal: React.FC<AddEditARKASModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialItem,
  rktItems,
  totalExisting,
}) => {
  const [formData, setFormData] = useState<ARKASItem>({
    id: `arkas-${Date.now()}`,
    nomor: totalExisting + 1,
    kodeProgram: '03.02.01',
    namaProgram: 'Pengembangan Standar Proses - Peningkatan Numerasi',
    kegiatanRktNama: rktItems[0]?.kegiatanBenahi || 'Pelatihan Numerasi & Pembelian Media Ajar',
    uraianBelanja: '',
    volume: 1,
    satuan: 'Paket / Kegiatan',
    hargaSatuan: 2500000,
    totalAnggaran: 2500000,
    sumberDana: 'BOSP Reguler',
    triwulan: 'TW 1',
    statusRealisasi: 'Rancangan'
  });

  useEffect(() => {
    if (initialItem) {
      setFormData({ ...initialItem });
    } else {
      setFormData({
        id: `arkas-${Date.now()}`,
        nomor: totalExisting + 1,
        kodeProgram: '03.02.01',
        namaProgram: 'Pengembangan Standar Proses - Peningkatan Mutu Pembelajaran',
        kegiatanRktNama: rktItems[0]?.kegiatanBenahi || 'Pelatihan Numerasi & Pembelian Media Ajar',
        uraianBelanja: '',
        volume: 1,
        satuan: 'Paket',
        hargaSatuan: 2500000,
        totalAnggaran: 2500000,
        sumberDana: 'BOSP Reguler',
        triwulan: 'TW 1',
        statusRealisasi: 'Rancangan'
      });
    }
  }, [initialItem, totalExisting, isOpen, rktItems]);

  if (!isOpen) return null;

  const handleVolPriceChange = (vol: number, price: number) => {
    setFormData(prev => ({
      ...prev,
      volume: vol,
      hargaSatuan: price,
      totalAnggaran: vol * price
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-black text-slate-900">
              {initialItem ? 'Edit Rincian Belanja ARKAS' : 'Tambah Rincian Belanja Baru ke ARKAS'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Kode Rekening / Kode Program ARKAS <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.kodeProgram}
                onChange={(e) => setFormData({ ...formData, kodeProgram: e.target.value })}
                placeholder="Contoh: 03.02.01"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Standar Nasional Pendidikan / Program
              </label>
              <input
                type="text"
                required
                value={formData.namaProgram}
                onChange={(e) => setFormData({ ...formData, namaProgram: e.target.value })}
                placeholder="Contoh: Pengembangan Standar Proses"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Rujukan Kegiatan RKT Terkait
            </label>
            <select
              value={formData.kegiatanRktNama}
              onChange={(e) => setFormData({ ...formData, kegiatanRktNama: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-semibold text-slate-800 bg-slate-50"
            >
              {rktItems.map((rkt) => (
                <option key={rkt.id} value={rkt.kegiatanBenahi}>
                  {rkt.nomor}. {rkt.kegiatanBenahi} {rkt.butuhAnggaran ? `(${formatRupiah(rkt.estimasiBiaya)})` : ''}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Uraian Rincian Belanja Barang/Jasa <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              required
              value={formData.uraianBelanja}
              onChange={(e) => setFormData({ ...formData, uraianBelanja: e.target.value })}
              placeholder="Contoh: Honorarium narasumber pelatihan numerasi, konsumsi 25 orang x 2 hari, dan fotokopi modul..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Volume, Satuan, Harga, Total */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Volume</label>
              <input
                type="number"
                min="1"
                value={formData.volume}
                onChange={(e) => handleVolPriceChange(parseFloat(e.target.value) || 1, formData.hargaSatuan)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Satuan</label>
              <input
                type="text"
                value={formData.satuan}
                onChange={(e) => setFormData({ ...formData, satuan: e.target.value })}
                placeholder="Contoh: Paket, Eks, Orang"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Harga Satuan (Rp)</label>
              <input
                type="number"
                min="0"
                step="1"
                value={formData.hargaSatuan}
                onChange={(e) => handleVolPriceChange(formData.volume, parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg font-mono font-bold"
              />
            </div>

            <div className="sm:col-span-3 pt-2 border-t border-indigo-200 flex items-center justify-between">
              <span className="font-bold text-slate-700">Total Anggaran Item:</span>
              <span className="font-mono text-base font-black text-indigo-700">
                {formatRupiah(formData.totalAnggaran)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Triwulan / Tahap Penyerapan</label>
              <select
                value={formData.triwulan}
                onChange={(e) => setFormData({ ...formData, triwulan: e.target.value as ARKASItem['triwulan'] })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-semibold"
              >
                <option value="TW 1">TW 1 (Triwulan 1 / Jan - Mar)</option>
                <option value="TW 2">TW 2 (Triwulan 2 / Apr - Jun)</option>
                <option value="TW 3">TW 3 (Triwulan 3 / Jul - Sep)</option>
                <option value="TW 4">TW 4 (Triwulan 4 / Okt - Des)</option>
                <option value="Tahap 1 (TW 1-2)">Tahap 1 (TW 1-2)</option>
                <option value="Tahap 2 (TW 3-4)">Tahap 2 (TW 3-4)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Sumber Dana</label>
              <select
                value={formData.sumberDana}
                onChange={(e) => setFormData({ ...formData, sumberDana: e.target.value as ARKASItem['sumberDana'] })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-semibold"
              >
                <option value="BOSP Reguler">BOSP Reguler</option>
                <option value="BOSP Kinerja">BOSP Kinerja</option>
                <option value="BOSDA">BOSDA (Daerah)</option>
                <option value="Komite Sekolah">Komite Sekolah</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white font-bold shadow-md transition"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Rincian ARKAS</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
