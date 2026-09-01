export type CapaianType = 'Baik' | 'Sedang' | 'Kurang';

export interface SchoolProfile {
  namaSekolah: string;
  npsn: string;
  alamat: string;
  desaKelurahan: string;
  kecamatan: string;
  kabupatenKota: string;
  provinsi: string;
  namaKepalaSekolah: string;
  nipKepalaSekolah: string;
  jabatan: string;
  bentukPendidikan: string; // SD, SMP, SMA, SMK, PKBM
  statusSekolah: 'Negeri' | 'Swasta';
  akreditasi: string; // A, B, C, Belum Terakreditasi
  kurikulum: string; // Kurikulum Merdeka, Kurikulum 2013
  tahunAjaran: string; // 2025/2026
  nomorTelepon: string;
  emailSekolah: string;
  website: string;
  totalPaguBOS: number;
}

export interface RaporIndicator {
  id: string;
  kode: string; // e.g. A.1, A.2, D.1
  namaIndikator: string;
  dimensi: 'Dimensi A (Hasil Belajar)' | 'Dimensi C (Kompetensi GTK)' | 'Dimensi D (Kualitas Pembelajaran)' | 'Dimensi E (Pengelolaan Sekolah)';
  dimensiSingkat: 'A' | 'C' | 'D' | 'E';
  capaian: CapaianType;
  skor: number; // 0 - 100
  skorTahunLalu: number;
  deltaSkor: number;
  rentangSkor: string; // e.g. "Skor 0 - 100"
  peringkatNasional: string; // e.g. "Atas (1-20%)", "Menengah Atas (21-40%)"
  peringkatKabupaten: string;
  keterangan: string;
  isPrioritas: boolean;
  akarMasalahUtama: string;
  rekomendasiBenahi: string;
}

export interface RekomendasiItem {
  id: string;
  nomor: number;
  dimensi: string;
  indikatorPrioritasKode: string;
  indikatorPrioritasNama: string;
  capaianIndikator: CapaianType;
  skorIndikator: number;
  identifikasiMasalah: string;
  akarMasalahKode: string;
  akarMasalahNama: string;
  deskripsiAkarMasalah: string;
  kegiatanBenahi: string;
  penjelasanBenahi: string;
  programKegiatanArkas: string;
  tautanPMM?: string;
  isPrioritasUtama: boolean;
}

export interface RKTItem {
  id: string;
  nomor: number;
  identifikasi: string;
  akarMasalah: string;
  kegiatanBenahi: string;
  penjelasanImplementasi: string;
  butuhAnggaran: boolean;
  estimasiBiaya: number;
  targetWaktu: string;
  penanggungJawab: string;
  status: 'Belum Dimulai' | 'Sedang Berjalan' | 'Selesai';
  indikatorTerkait: string;
  catatan?: string;
}

export interface ARKASItem {
  id: string;
  nomor: number;
  kodeProgram: string; // e.g. "03.02.01"
  namaProgram: string; // e.g. "Pengembangan Standar Proses"
  kegiatanRktId?: string;
  kegiatanRktNama: string;
  uraianBelanja: string; // e.g. "Pengadaan Buku Bacaan Literasi & Numerasi Pilihan Siswa"
  volume: number;
  satuan: string; // e.g. "Paket", "Eks", "Kegiatan", "Bulan"
  hargaSatuan: number;
  totalAnggaran: number;
  sumberDana: 'BOSP Reguler' | 'BOSP Kinerja' | 'BOSDA' | 'Komite Sekolah' | 'Lainnya';
  triwulan: 'Tahap 1 (TW 1-2)' | 'Tahap 2 (TW 3-4)' | 'TW 1' | 'TW 2' | 'TW 3' | 'TW 4';
  statusRealisasi: 'Rancangan' | 'Disetujui' | 'Terealisasi';
}

export interface RKJMStrategyYear {
  tahun: string; // "Tahun ke-1 (2025/2026)", etc.
  targetCapaian: string;
  programUtama: string[];
  indikatorKunci: string;
  estimasiAnggaran: number;
}

export interface RKJMData {
  visi: string;
  misi: string[];
  tujuan4Tahun: string[];
  analisisLingkungan: {
    kekuatanInternal: string[];
    kelemahanInternal: string[];
    peluangEksternal: string[];
    ancamanEksternal: string[];
  };
  strategi4Tahunan: RKJMStrategyYear[];
}

export interface UserSession {
  username: string;
  name: string;
  role: string;
  email: string;
  loginTime: string;
  schoolName: string;
  npsn: string;
}

export type ActiveTab = 
  | 'dashboard'
  | 'data-sekolah'
  | 'laporan-rapor'
  | 'rekom-keseluruhan'
  | 'rekom-prioritas'
  | 'lembar-kerja-rkt'
  | 'lembar-kerja-arkas'
  | 'menu-rkt'
  | 'menu-rkjm'
  | 'panduan-pbd';
