import React, { useState } from 'react';
import { parseUploadedRaporCSV, exportToCSV } from '../../utils/csvHelper';
import { RaporIndicator, RekomendasiItem, RKTItem, ARKASItem } from '../../types/rapor';
import { Upload, FileText, CheckCircle2, AlertTriangle, X, Download, Sparkles } from 'lucide-react';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyImport: (data: {
    indicators?: RaporIndicator[];
    recommendations?: RekomendasiItem[];
    rktItems?: RKTItem[];
    arkasItems?: ARKASItem[];
    schoolNameDetected?: string;
    npsnDetected?: string;
  }) => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({
  isOpen,
  onClose,
  onApplyImport,
}) => {
  const [csvContent, setCsvContent] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [parseSummary, setParseSummary] = useState<{
    indicatorCount: number;
    rktCount: number;
    schoolName?: string;
    npsn?: string;
  } | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setCsvContent(text);
      analyzeCSV(text);
    };
    reader.readAsText(file);
  };

  const analyzeCSV = (text: string) => {
    const parsed = parseUploadedRaporCSV(text);
    setParseSummary({
      indicatorCount: parsed.indicators?.length || 0,
      rktCount: parsed.rktItems?.length || 0,
      schoolName: parsed.schoolNameDetected,
      npsn: parsed.npsnDetected,
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setCsvContent(text);
    if (text.length > 20) {
      analyzeCSV(text);
    } else {
      setParseSummary(null);
    }
  };

  const handleApply = () => {
    if (!csvContent) return;
    const parsed = parseUploadedRaporCSV(csvContent);
    onApplyImport(parsed);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  const handleDownloadTemplate = () => {
    const headers = [
      'Kode Indikator;Nama Indikator;Capaian;Skor 2026;Skor 2025;Peringkat Kabupaten;Identifikasi Masalah;Akar Masalah;Kegiatan Benahi;Penjelasan Implementasi;Butuh Anggaran;Estimasi Biaya'
    ];
    const rows = [
      ['A.1', 'Kemampuan Literasi', 'Baik', 78.45, 72.10, 'Atas (1-20%)', 'Perlu penguatan literasi membaca kritis', 'Koleksi buku non-teks terbatas', 'Pengadaan Buku Non-Teks SIPLah', 'Pengadaan 300 buku bacaan berjenjang', 'Ya', 12000000],
      ['A.2', 'Kemampuan Numerasi', 'Sedang', 58.20, 53.40, 'Menengah (41-60%)', 'Penalaran numerasi kontekstual masih rendah', 'Guru belum menguasai alat peraga', 'Pelatihan Matematika Realistik', 'Workshop guru 2 hari dan Math Corner', 'Ya', 9500000],
      ['D.1', 'Kualitas Pembelajaran', 'Sedang', 62.80, 59.10, 'Menengah (41-60%)', 'Aktivasi kognitif siswa belum optimal', 'Guru belum menerapkan HOTS', 'IHT Pembelajaran Berdiferensiasi', 'Pelaksanaan IHT awal semester 3 hari', 'Ya', 8500000]
    ];
    exportToCSV('Template_Rapor_Pendidikan_2026', headers, rows);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-700 flex items-center justify-center font-bold">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                Import Data File CSV Rapor Pendidikan 2026
              </h3>
              <p className="text-xs text-slate-500">
                Otomatis membaca dan memperbarui data Rapor, Rekomendasi, RKT, dan ARKAS
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Box */}
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-blue-500 transition bg-slate-50/50">
          <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-xs font-bold text-slate-800">
            {fileName ? `File terpilih: ${fileName}` : 'Unggah File CSV Rapor Pendidikan Anda'}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Mendukung format unduhan resmi Kemendikdasmen (.csv dengan pemisah titik koma ; atau koma ,)
          </p>
          <label className="mt-3 inline-block px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs transition">
            Pilih File CSV
            <input
              type="file"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Or Paste Raw text */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Atau Tempel (Paste) Teks CSV di Bawah Ini:
          </label>
          <textarea
            rows={4}
            value={csvContent}
            onChange={handleTextChange}
            placeholder="Contoh: A.1;Kemampuan Literasi;Baik;78.45;72.10;Atas (1-20%);..."
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Parsing preview summary */}
        {parseSummary && (
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs space-y-1.5 animate-in fade-in">
            <div className="font-bold text-blue-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Hasil Analisis Otomatis File CSV:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-700">
              <div>• Indikator Mutu Terdeteksi: <strong>{parseSummary.indicatorCount}</strong></div>
              <div>• Butir Kegiatan RKT Terdeteksi: <strong>{parseSummary.rktCount}</strong></div>
              {parseSummary.schoolName && <div>• Nama Sekolah: <strong>{parseSummary.schoolName}</strong></div>}
              {parseSummary.npsn && <div>• NPSN: <strong>{parseSummary.npsn}</strong></div>}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={handleDownloadTemplate}
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh Contoh Template CSV</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
            >
              Batal
            </button>
            <button
              onClick={handleApply}
              disabled={!csvContent}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white shadow-md transition ${
                csvContent ? 'bg-blue-700 hover:bg-blue-600' : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Terapkan Data ke Aplikasi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
