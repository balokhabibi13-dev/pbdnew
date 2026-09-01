import React, { useState, useEffect } from 'react';
import { RKTItem } from '../../types/rapor';
import { X, Save, ClipboardList } from 'lucide-react';
import { formatRupiah } from '../../utils/csvHelper';

interface AddEditRKTModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: RKTItem) => void;
  initialItem?: RKTItem | null;
  totalExisting: number;
}

export const AddEditRKTModal: React.FC<AddEditRKTModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialItem,
  totalExisting,
}) => {
  const [formData, setFormData] = useState<RKTItem>({
    id: `rkt-${Date.now()}`,
    nomor: totalExisting + 1,
    identifikasi: '',
    akarMasalah: '',
    kegiatanBenahi: '',
    penjelasanImplementasi: '',
    butuhAnggaran: true,
    estimasiBiaya: 5000000,
    targetWaktu: 'Juli - Desember 2025',
    penanggungJawab: 'Tim Pengembang Kurikulum',
    status: 'Belum Dimulai',
    indikatorTerkait: 'A.1 Kemampuan Literasi',
    catatan: ''
  });

  useEffect(() => {
    if (initialItem) {
      setFormData({ ...initialItem });
    } else {
      setFormData({
        id: `rkt-${Date.now()}`,
        nomor: totalExisting + 1,
        identifikasi: '',
        akarMasalah: '',
        kegiatanBenahi: '',
        penjelasanImplementasi: '',
        butuhAnggaran: true,
        estimasiBiaya: 5000000,
        targetWaktu: 'Juli - Desember 2025',
        penanggungJawab: 'Tim Pengembang Kurikulum',
        status: 'Belum Dimulai',
        indikatorTerkait: 'A.2 Kemampuan Numerasi',
        catatan: ''
      });
    }
  }, [initialItem, totalExisting, isOpen]);

  if (!isOpen) return null;

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
            <ClipboardList className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-black text-slate-900">
              {initialItem ? 'Edit Kegiatan Lembar RKT' : 'Tambah Kegiatan Baru ke Lembar RKT'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Identifikasi Masalah <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              required
              value={formData.identifikasi}
              onChange={(e) => setFormData({ ...formData, identifikasi: e.target.value })}
              placeholder="Contoh: A.2 Kemampuan Numerasi masih rendah..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Refleksi Akar Masalah <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              required
              value={formData.akarMasalah}
              onChange={(e) => setFormData({ ...formData, akarMasalah: e.target.value })}
              placeholder="Contoh: D.1.3 Guru belum menguasai metode konkret..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Judul Kegiatan Benahi <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.kegiatanBenahi}
              onChange={(e) => setFormData({ ...formData, kegiatanBenahi: e.target.value })}
              placeholder="Contoh: Workshop Pembelajaran Matematika Kontekstual"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Penjelasan Implementasi Kegiatan
            </label>
            <textarea
              rows={2}
              value={formData.penjelasanImplementasi}
              onChange={(e) => setFormData({ ...formData, penjelasanImplementasi: e.target.value })}
              placeholder="Contoh: Pelaksanaan pelatihan 2 hari bersama BPMP dan pendampingan di Kombel..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Apakah Butuh Anggaran?
              </label>
              <select
                value={formData.butuhAnggaran ? 'YA' : 'TIDAK'}
                onChange={(e) => setFormData({ ...formData, butuhAnggaran: e.target.value === 'YA' })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-bold"
              >
                <option value="YA">Ya (Memerlukan Anggaran)</option>
                <option value="TIDAK">Tidak (Non-Anggaran)</option>
              </select>
            </div>

            {formData.butuhAnggaran && (
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Estimasi Biaya (Rp)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={formData.estimasiBiaya}
                  onChange={(e) => setFormData({ ...formData, estimasiBiaya: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">{formatRupiah(formData.estimasiBiaya)}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Waktu</label>
              <input
                type="text"
                value={formData.targetWaktu}
                onChange={(e) => setFormData({ ...formData, targetWaktu: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Penanggung Jawab (PIC)</label>
              <input
                type="text"
                value={formData.penanggungJawab}
                onChange={(e) => setFormData({ ...formData, penanggungJawab: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Status Pelaksanaan</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-semibold"
              >
                <option value="Belum Dimulai">Belum Dimulai</option>
                <option value="Sedang Berjalan">Sedang Berjalan</option>
                <option value="Selesai">Selesai</option>
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
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold shadow-md transition"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Butir RKT</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
