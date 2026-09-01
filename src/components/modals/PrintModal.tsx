import React, { useState } from 'react';
import { SchoolProfile, RaporIndicator, RKTItem, ARKASItem, RKJMData } from '../../types/rapor';
import { formatRupiah } from '../../utils/csvHelper';
import { Printer, X, Download, FileText, CheckCircle2 } from 'lucide-react';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  school: SchoolProfile;
  indicators: RaporIndicator[];
  rktItems: RKTItem[];
  arkasItems: ARKASItem[];
  rkjmData: RKJMData;
}

export const PrintModal: React.FC<PrintModalProps> = ({
  isOpen,
  onClose,
  school,
  indicators,
  rktItems,
  arkasItems,
  rkjmData,
}) => {
  const [docType, setDocType] = useState<'rkt' | 'arkas' | 'rkjm' | 'rapor'>('rkt');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl border border-slate-200 space-y-4 my-8 max-h-[92vh] overflow-y-auto print:max-h-none print:overflow-visible print:border-none print:shadow-none print:p-0">
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 print:hidden">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Printer className="w-5 h-5 text-blue-600" />
              <span>Pratinjau Cetak Dokumen Resmi PBD & Rapor 2026</span>
            </h3>
            <p className="text-xs text-slate-500">
              Dokumen dilengkapi Kop Surat Satuan Pendidikan, Capaian Data, dan Lembar Pengesahan.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value as any)}
              className="text-xs font-bold border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 text-slate-800"
            >
              <option value="rkt">1. Lembar Kerja RKT 2026</option>
              <option value="arkas">2. Lembar Kerja Rancangan ARKAS 2026</option>
              <option value="rkjm">3. Dokumen RKJM 4 Tahunan (2025-2029)</option>
              <option value="rapor">4. Laporan Capaian Rapor Pendidikan</option>
            </select>

            <button
              onClick={handlePrint}
              id="btn-trigger-print"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold shadow-md transition"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Sekarang (Print / PDF)</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE OFFICIAL LETTERHEAD & CONTENT */}
        <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-xl print:border-none print:p-0 text-slate-900">
          {/* Formal Kop Surat */}
          <div className="text-center border-b-4 border-double border-slate-900 pb-3 mb-6">
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">
              PEMERINTAH {school.provinsi.toUpperCase()}
            </div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">
              DINAS PENDIDIKAN DAN KEBUDAYAAN {school.kabupatenKota.toUpperCase()}
            </div>
            <h1 className="text-lg sm:text-xl font-black uppercase text-slate-900 tracking-tight mt-0.5">
              {school.namaSekolah}
            </h1>
            <div className="text-[11px] text-slate-600 mt-1">
              Alamat: {school.alamat}, {school.desaKelurahan}, Kec. {school.kecamatan}, {school.kabupatenKota} | NPSN: {school.npsn}
            </div>
            <div className="text-[11px] text-slate-600">
              Email: {school.emailSekolah} | Telp: {school.nomorTelepon} | Akreditasi: {school.akreditasi}
            </div>
          </div>

          {/* Document Title Header */}
          <div className="text-center mb-6 space-y-1">
            <h2 className="text-base sm:text-lg font-black uppercase underline tracking-wide text-slate-950">
              {docType === 'rkt' && 'LEMBAR KERJA RENCANA KEGIATAN TAHUNAN (RKT)'}
              {docType === 'arkas' && 'LEMBAR KERJA RANCANGAN ANGGARAN SEKOLAH (ARKAS)'}
              {docType === 'rkjm' && 'RENCANA KERJA JANGKA MENENGAH (RKJM) 4 TAHUNAN'}
              {docType === 'rapor' && 'LAPORAN CAPAIAN RAPOR PENDIDIKAN TAHUN 2026'}
            </h2>
            <div className="text-xs font-semibold text-slate-700">
              Tahun Ajaran / Anggaran: {school.tahunAjaran}
            </div>
          </div>

          {/* Content Based on Selected Document Type */}

          {/* 1. RKT Document */}
          {docType === 'rkt' && (
            <div className="space-y-4 text-xs">
              <table className="w-full border-collapse border border-slate-800 text-[11px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-bold text-center">
                    <th className="border border-slate-800 p-2 w-10">No</th>
                    <th className="border border-slate-800 p-2 w-1/4">Identifikasi Masalah</th>
                    <th className="border border-slate-800 p-2 w-1/4">Refleksi Akar Masalah</th>
                    <th className="border border-slate-800 p-2 w-1/4">Kegiatan Benahi</th>
                    <th className="border border-slate-800 p-2">Penjelasan & Anggaran</th>
                    <th className="border border-slate-800 p-2 w-20">Target & PIC</th>
                  </tr>
                </thead>
                <tbody>
                  {rktItems.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-slate-800 p-2 text-center font-bold">{item.nomor}</td>
                      <td className="border border-slate-800 p-2 font-medium">{item.identifikasi}</td>
                      <td className="border border-slate-800 p-2">{item.akarMasalah}</td>
                      <td className="border border-slate-800 p-2 font-bold">{item.kegiatanBenahi}</td>
                      <td className="border border-slate-800 p-2">
                        <div>{item.penjelasanImplementasi}</div>
                        <div className="mt-1 font-semibold text-slate-800">
                          Butuh Anggaran: <strong>{item.butuhAnggaran ? `Ya (${formatRupiah(item.estimasiBiaya)})` : 'Tidak'}</strong>
                        </div>
                      </td>
                      <td className="border border-slate-800 p-2 text-center text-[10px]">
                        <div>{item.targetWaktu}</div>
                        <div className="font-bold mt-0.5">{item.penanggungJawab}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 2. ARKAS Document */}
          {docType === 'arkas' && (
            <div className="space-y-4 text-xs">
              <table className="w-full border-collapse border border-slate-800 text-[11px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-bold text-center">
                    <th className="border border-slate-800 p-2 w-10">No</th>
                    <th className="border border-slate-800 p-2 w-20">Kode</th>
                    <th className="border border-slate-800 p-2">Program / Kegiatan RKT</th>
                    <th className="border border-slate-800 p-2">Uraian Rincian Belanja</th>
                    <th className="border border-slate-800 p-2 w-16">Vol</th>
                    <th className="border border-slate-800 p-2 w-24">Harga Satuan</th>
                    <th className="border border-slate-800 p-2 w-28">Total (Rp)</th>
                    <th className="border border-slate-800 p-2 w-20">Triwulan</th>
                  </tr>
                </thead>
                <tbody>
                  {arkasItems.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-slate-800 p-2 text-center font-bold">{item.nomor}</td>
                      <td className="border border-slate-800 p-2 text-center font-mono">{item.kodeProgram}</td>
                      <td className="border border-slate-800 p-2">
                        <div className="font-bold">{item.namaProgram}</div>
                        <div className="text-[10px] text-slate-600">RKT: {item.kegiatanRktNama}</div>
                      </td>
                      <td className="border border-slate-800 p-2">{item.uraianBelanja}</td>
                      <td className="border border-slate-800 p-2 text-center font-mono">{item.volume} {item.satuan}</td>
                      <td className="border border-slate-800 p-2 text-right font-mono">{formatRupiah(item.hargaSatuan)}</td>
                      <td className="border border-slate-800 p-2 text-right font-mono font-bold">{formatRupiah(item.totalAnggaran)}</td>
                      <td className="border border-slate-800 p-2 text-center text-[10px]">{item.triwulan}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-100 font-bold">
                    <td colSpan={6} className="border border-slate-800 p-2 text-right">TOTAL RENCANA ANGGARAN BELANJA:</td>
                    <td className="border border-slate-800 p-2 text-right font-mono font-black">
                      {formatRupiah(arkasItems.reduce((a, b) => a + b.totalAnggaran, 0))}
                    </td>
                    <td className="border border-slate-800 p-2 text-center text-[10px]">Pagu Sesuai</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {/* 3. RKJM Document */}
          {docType === 'rkjm' && (
            <div className="space-y-4 text-xs">
              <div className="border border-slate-800 p-3 rounded-md space-y-2">
                <div className="font-bold text-slate-900">A. VISI SATUAN PENDIDIKAN:</div>
                <div className="italic text-slate-800 pl-4 font-serif">{rkjmData.visi}</div>
              </div>

              <div className="border border-slate-800 p-3 rounded-md space-y-2">
                <div className="font-bold text-slate-900">B. MISI SATUAN PENDIDIKAN (4 TAHUN):</div>
                <ol className="list-decimal list-inside pl-2 space-y-1">
                  {rkjmData.misi.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ol>
              </div>

              <div className="border border-slate-800 p-3 rounded-md space-y-2">
                <div className="font-bold text-slate-900">C. STRATEGI & ROADMAP 4 TAHUNAN:</div>
                <table className="w-full border-collapse border border-slate-800 text-[11px] mt-2">
                  <thead>
                    <tr className="bg-slate-100 font-bold">
                      <th className="border border-slate-800 p-2 w-28 text-center">Tahun</th>
                      <th className="border border-slate-800 p-2">Sasaran & Target Capaian</th>
                      <th className="border border-slate-800 p-2 w-1/3">Program Prioritas</th>
                      <th className="border border-slate-800 p-2 w-28 text-right">Estimasi Pagu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rkjmData.strategi4Tahunan.map((strat, i) => (
                      <tr key={i}>
                        <td className="border border-slate-800 p-2 text-center font-bold">{strat.tahun}</td>
                        <td className="border border-slate-800 p-2">
                          <div className="font-bold">{strat.targetCapaian}</div>
                          <div className="text-[10px] text-slate-600 mt-0.5">Indikator: {strat.indikatorKunci}</div>
                        </td>
                        <td className="border border-slate-800 p-2">
                          <ul className="list-disc list-inside space-y-0.5 text-[10px]">
                            {strat.programUtama.map((p, pIdx) => <li key={pIdx}>{p}</li>)}
                          </ul>
                        </td>
                        <td className="border border-slate-800 p-2 text-right font-mono font-bold">
                          {formatRupiah(strat.estimasiAnggaran)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. Rapor Summary Document */}
          {docType === 'rapor' && (
            <div className="space-y-4 text-xs">
              <table className="w-full border-collapse border border-slate-800 text-[11px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-bold text-center">
                    <th className="border border-slate-800 p-2 w-16">Kode</th>
                    <th className="border border-slate-800 p-2">Nama Indikator Mutu</th>
                    <th className="border border-slate-800 p-2 w-24">Capaian</th>
                    <th className="border border-slate-800 p-2 w-24">Skor 2026</th>
                    <th className="border border-slate-800 p-2 w-24">Skor 2025</th>
                    <th className="border border-slate-800 p-2 w-32">Peringkat Kab/Kota</th>
                  </tr>
                </thead>
                <tbody>
                  {indicators.map((ind) => (
                    <tr key={ind.id}>
                      <td className="border border-slate-800 p-2 text-center font-mono font-bold">{ind.kode}</td>
                      <td className="border border-slate-800 p-2 font-medium">
                        {ind.namaIndikator}
                        <div className="text-[10px] text-slate-600">{ind.dimensi}</div>
                      </td>
                      <td className="border border-slate-800 p-2 text-center font-bold">{ind.capaian}</td>
                      <td className="border border-slate-800 p-2 text-center font-mono font-black">{ind.skor.toFixed(2)}</td>
                      <td className="border border-slate-800 p-2 text-center font-mono">{ind.skorTahunLalu.toFixed(2)}</td>
                      <td className="border border-slate-800 p-2 text-center">{ind.peringkatKabupaten}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Formal Signatures Block */}
          <div className="mt-12 pt-4 border-t border-slate-300 grid grid-cols-2 gap-8 text-xs text-center">
            <div>
              <div>Menyetujui,</div>
              <div className="font-bold text-slate-900 mt-0.5">Ketua Komite Satuan Pendidikan</div>
              <div className="h-20" />
              <div className="font-bold text-slate-900 underline uppercase">
                ( .................................................... )
              </div>
            </div>

            <div>
              <div>Ditetapkan di: {school.kabupatenKota}</div>
              <div className="text-slate-600">Pada Tanggal: {currentDate}</div>
              <div className="font-bold text-slate-900 mt-1">{school.jabatan}</div>
              <div className="h-16" />
              <div className="font-bold text-slate-900 underline uppercase">
                {school.namaKepalaSekolah}
              </div>
              <div className="text-slate-700 font-mono text-[11px]">
                NIP. {school.nipKepalaSekolah}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
