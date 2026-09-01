import React, { useState } from 'react';
import { SchoolProfile } from '../../types/rapor';
import { formatRupiah } from '../../utils/csvHelper';
import { 
  Building2, 
  UserCheck, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  Calendar,
  Wallet,
  Phone,
  Mail,
  Globe
} from 'lucide-react';

interface DataSekolahViewProps {
  school: SchoolProfile;
  onSave: (updated: SchoolProfile) => void;
}

export const DataSekolahView: React.FC<DataSekolahViewProps> = ({
  school,
  onSave,
}) => {
  const [formData, setFormData] = useState<SchoolProfile>({ ...school });
  const [paguInput, setPaguInput] = useState<string>(school.totalPaguBOS ? school.totalPaguBOS.toString() : '0');
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setIsSaved(false);
  };

  const handlePaguChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    setPaguInput(rawVal);
    const parsed = parseFloat(rawVal.replace(/[^0-9.-]/g, '')) || 0;
    setFormData(prev => ({
      ...prev,
      totalPaguBOS: parsed
    }));
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(paguInput.replace(/[^0-9.-]/g, '')) || 0;
    const updatedData = {
      ...formData,
      totalPaguBOS: parsed
    };
    onSave(updatedData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Title Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-700 font-semibold text-xs uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Manajemen Profil Satuan Pendidikan</span>
          </div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight mt-1">
            Data Sekolah & Pejabat Penanggung Jawab
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Nama sekolah yang diisi di form ini akan otomatis tersinkronisasi pada Header aplikasi dan lembar cetak dokumen resmi.
          </p>
        </div>

        {isSaved && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-300 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Data Berhasil Disimpan & Sinkron!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Main Input Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Identitas Lembaga */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>1. Identitas Satuan Pendidikan</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Sekolah / Satuan Pendidikan <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="namaSekolah"
                  value={formData.namaSekolah}
                  onChange={handleChange}
                  required
                  placeholder="Contoh: SD NEGERI 1 TELADAN NUSANTARA"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold text-slate-900 bg-slate-50/50"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  *Nama ini akan tampil di bagian atas Header dan Kop Surat Cetak.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nomor Pokok Sekolah Nasional (NPSN) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="npsn"
                  value={formData.npsn}
                  onChange={handleChange}
                  required
                  placeholder="8 Digit NPSN (Contoh: 10293847)"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Bentuk Pendidikan / Jenjang
                </label>
                <select
                  name="bentukPendidikan"
                  value={formData.bentukPendidikan}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="SD">SD (Sekolah Dasar)</option>
                  <option value="SMP">SMP (Sekolah Menengah Pertama)</option>
                  <option value="SMA">SMA (Sekolah Menengah Atas)</option>
                  <option value="SMK">SMK (Sekolah Menengah Kejuruan)</option>
                  <option value="SLB">SLB (Sekolah Luar Biasa)</option>
                  <option value="PAUD/TK">PAUD / TK</option>
                  <option value="PKBM">PKBM / Kesetaraan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Status Sekolah
                </label>
                <select
                  name="statusSekolah"
                  value={formData.statusSekolah}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Negeri">Negeri</option>
                  <option value="Swasta">Swasta</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Peringkat Akreditasi
                </label>
                <input
                  type="text"
                  name="akreditasi"
                  value={formData.akreditasi}
                  onChange={handleChange}
                  placeholder="Contoh: A (Unggul)"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kurikulum Operasional Satuan Pendidikan
                </label>
                <input
                  type="text"
                  name="kurikulum"
                  value={formData.kurikulum}
                  onChange={handleChange}
                  placeholder="Contoh: Kurikulum Merdeka"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tahun Ajaran Aktif
                </label>
                <input
                  type="text"
                  name="tahunAjaran"
                  value={formData.tahunAjaran}
                  onChange={handleChange}
                  placeholder="Contoh: 2025/2026"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alamat Lengkap Sekolah <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  required
                  rows={2}
                  placeholder="Contoh: Jl. Pendidikan Mandiri No. 45"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Desa / Kelurahan
                </label>
                <input
                  type="text"
                  name="desaKelurahan"
                  value={formData.desaKelurahan}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kecamatan
                </label>
                <input
                  type="text"
                  name="kecamatan"
                  value={formData.kecamatan}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kabupaten / Kota
                </label>
                <input
                  type="text"
                  name="kabupatenKota"
                  value={formData.kabupatenKota}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Provinsi
                </label>
                <input
                  type="text"
                  name="provinsi"
                  value={formData.provinsi}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Data Kepala Sekolah & Penganggaran */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>2. Pejabat Penanggung Jawab & Pagu Anggaran</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Kepala Sekolah <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="namaKepalaSekolah"
                  value={formData.namaKepalaSekolah}
                  onChange={handleChange}
                  required
                  placeholder="Contoh: Dr. Hj. Siti Rahmawati, M.Pd."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  NIP Kepala Sekolah <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="nipKepalaSekolah"
                  value={formData.nipKepalaSekolah}
                  onChange={handleChange}
                  required
                  placeholder="Contoh: 19780415 200212 2 004 (atau - jika swasta)"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Jabatan <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="jabatan"
                  value={formData.jabatan}
                  onChange={handleChange}
                  required
                  placeholder="Contoh: Kepala Satuan Pendidikan"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Total Pagu Bantuan Operasional (BOSP) Setahun
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-sm text-slate-400 font-bold">Rp</span>
                  <input
                    type="number"
                    name="totalPaguBOS"
                    value={paguInput}
                    onChange={handlePaguChange}
                    min="0"
                    step="1"
                    placeholder="Ketik pagu anggaran (contoh: 125000000)"
                    className="w-full pl-10 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono font-bold"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                  <span>Terformat: <strong className="text-emerald-700 font-mono">{formatRupiah(formData.totalPaguBOS)}</strong></span>
                  <span className="text-slate-400 italic">Bebas ketik nominal berapa saja</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Kontak & Informasi */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-purple-600" />
              <span>3. Kontak & Media Resmi Sekolah</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nomor Telepon
                </label>
                <input
                  type="text"
                  name="nomorTelepon"
                  value={formData.nomorTelepon}
                  onChange={handleChange}
                  placeholder="(021) 7894561"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Resmi Sekolah
                </label>
                <input
                  type="email"
                  name="emailSekolah"
                  value={formData.emailSekolah}
                  onChange={handleChange}
                  placeholder="sekolah@belajar.id"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Website / Portal
                </label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://sdn1teladan.sch.id"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              id="btn-save-school-profile"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-sm shadow-md transition"
            >
              <Save className="w-4 h-4" />
              <span>Simpan & Perbarui Data Sekolah</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({ ...school });
                setPaguInput(school.totalPaguBOS ? school.totalPaguBOS.toString() : '0');
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-sm transition"
            >
              Batal Perubahan
            </button>
          </div>
        </div>

        {/* Right 1 Column: Live Preview Identity Card */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-5 border border-blue-900/40 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                Kartu Lembaga Dapodik
              </span>
              <span className="text-[10px] bg-blue-600/40 border border-blue-400/30 text-blue-300 px-2 py-0.5 rounded font-mono">
                {formData.statusSekolah}
              </span>
            </div>

            <div>
              <h4 className="text-lg font-black text-white leading-tight">
                {formData.namaSekolah || 'NAMA SEKOLAH'}
              </h4>
              <div className="flex items-center gap-2 mt-1 text-xs text-blue-300 font-mono">
                <span>NPSN: {formData.npsn || '-'}</span>
                <span>•</span>
                <span>Akreditasi: {formData.akreditasi}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  {formData.alamat}, {formData.desaKelurahan}, {formData.kecamatan}, {formData.kabupatenKota}, {formData.provinsi}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Tahun Ajaran: {formData.tahunAjaran}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Kurikulum: {formData.kurikulum}</span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Pagu BOS: {formatRupiah(formData.totalPaguBOS)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 bg-slate-950/60 p-3 rounded-xl">
              <div className="text-[11px] text-slate-400 uppercase font-semibold">
                {formData.jabatan}:
              </div>
              <div className="text-sm font-bold text-white mt-0.5">
                {formData.namaKepalaSekolah}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                NIP: {formData.nipKepalaSekolah}
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 space-y-2">
            <h5 className="font-bold flex items-center gap-1.5 text-amber-800">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              <span>Petunjuk Sinkronisasi PBD</span>
            </h5>
            <p className="leading-relaxed text-[11px] text-amber-800">
              Pastikan nama sekolah, NIP kepala sekolah, dan NPSN sudah valid sesuai data verval Kemendikdasmen. Data ini akan dicantumkan secara otomatis pada dokumen cetak Lembar Kerja RKT dan Pengesahan ARKAS.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
