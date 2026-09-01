import { RaporIndicator, RekomendasiItem, RKTItem, ARKASItem, CapaianType } from '../types/rapor';

export const formatRupiah = (number: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

export const parseCSVLines = (text: string): string[][] => {
  const lines: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  // Auto-detect delimiter: check frequency of ';' vs ',' in first line
  const firstLine = text.split('\n')[0] || '';
  const semicolonCount = (firstLine.match(/;/g) || []).length;
  const commaCount = (firstLine.match(/,/g) || []).length;
  const delimiter = semicolonCount >= commaCount ? ';' : ',';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++; // skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      currentRow.push(currentField.trim());
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentField.trim());
      if (currentRow.some(field => field.length > 0)) {
        lines.push(currentRow);
      }
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some(field => field.length > 0)) {
      lines.push(currentRow);
    }
  }

  return lines;
};

export const exportToCSV = (filename: string, headers: string[], rows: (string | number | boolean)[][]) => {
  const escapeField = (val: string | number | boolean) => {
    const str = String(val ?? '');
    if (str.includes(';') || str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const csvContent = [
    headers.map(escapeField).join(';'),
    ...rows.map(row => row.map(escapeField).join(';'))
  ].join('\r\n');

  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const parseUploadedRaporCSV = (csvText: string): {
  indicators?: RaporIndicator[];
  recommendations?: RekomendasiItem[];
  rktItems?: RKTItem[];
  arkasItems?: ARKASItem[];
  schoolNameDetected?: string;
  npsnDetected?: string;
} => {
  const rows = parseCSVLines(csvText);
  const result: {
    indicators: RaporIndicator[];
    recommendations: RekomendasiItem[];
    rktItems: RKTItem[];
    arkasItems: ARKASItem[];
    schoolNameDetected?: string;
    npsnDetected?: string;
  } = {
    indicators: [],
    recommendations: [],
    rktItems: [],
    arkasItems: []
  };

  // Inspect headers or section markers
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const joined = row.join(' ').toLowerCase();

    // Check for school name/NPSN if present in headers
    if (joined.includes('nama satuan') || joined.includes('nama sekolah')) {
      const match = row.find(c => c.length > 5 && !c.toLowerCase().includes('nama sekolah'));
      if (match) result.schoolNameDetected = match;
    }
    if (joined.includes('npsn')) {
      const match = row.find(c => /^\d{8}$/.test(c.trim()));
      if (match) result.npsnDetected = match.trim();
    }

    // Try parsing Rapor Indicators rows
    // Standard format: [No/Kode, Nama Indikator, Capaian, Skor, Delta/Perubahan, Peringkat...]
    const firstCol = row[0] || '';
    const secondCol = row[1] || '';
    
    // Pattern for indicator code like A.1, A.2, D.1, C.1, E.1 or A.1.1
    const codeMatch = firstCol.match(/^[A-E](\.\d+)+$/i) || secondCol.match(/^[A-E](\.\d+)+$/i);
    if (codeMatch) {
      const code = codeMatch[0].toUpperCase();
      const name = secondCol.length > 3 ? secondCol : (row[2] || 'Indikator ' + code);
      const capaianRaw = row.find(c => ['baik', 'sedang', 'kurang'].includes(c.toLowerCase()));
      const capaian: CapaianType = capaianRaw ? (capaianRaw.charAt(0).toUpperCase() + capaianRaw.slice(1).toLowerCase() as CapaianType) : 'Sedang';
      
      const numValues = row.map(c => parseFloat(c.replace(',', '.'))).filter(n => !isNaN(n) && n >= 0 && n <= 100);
      const score = numValues.length > 0 ? numValues[0] : 65.0;
      const lastScore = numValues.length > 1 ? numValues[1] : Math.max(0, score - 3.5);

      const firstChar = code.charAt(0).toUpperCase();
      const validDim: 'A' | 'C' | 'D' | 'E' = (firstChar === 'C' || firstChar === 'D' || firstChar === 'E') ? firstChar : 'A';
      const dimMap: Record<'A' | 'C' | 'D' | 'E', 'Dimensi A (Hasil Belajar)' | 'Dimensi C (Kompetensi GTK)' | 'Dimensi D (Kualitas Pembelajaran)' | 'Dimensi E (Pengelolaan Sekolah)'> = {
        'A': 'Dimensi A (Hasil Belajar)',
        'C': 'Dimensi C (Kompetensi GTK)',
        'D': 'Dimensi D (Kualitas Pembelajaran)',
        'E': 'Dimensi E (Pengelolaan Sekolah)',
      };

      result.indicators.push({
        id: `parsed-ind-${i}`,
        kode: code,
        namaIndikator: name,
        dimensi: dimMap[validDim],
        dimensiSingkat: validDim,
        capaian: capaian,
        skor: score,
        skorTahunLalu: lastScore,
        deltaSkor: Number((score - lastScore).toFixed(2)),
        rentangSkor: 'Skor 0 - 100',
        peringkatNasional: score >= 75 ? 'Atas (1-20%)' : score >= 55 ? 'Menengah Atas (21-40%)' : 'Menengah (41-60%)',
        peringkatKabupaten: score >= 75 ? 'Atas (1-20%)' : score >= 55 ? 'Menengah (41-60%)' : 'Bawah (61-80%)',
        keterangan: `Capaian indikator ${code} ${name} berada pada kategori ${capaian} dengan nilai ${score}.`,
        isPrioritas: capaian === 'Kurang' || (capaian === 'Sedang' && (code.startsWith('A.1') || code.startsWith('A.2') || code.startsWith('D.1'))),
        akarMasalahUtama: `Akar masalah terkait indikator ${code}: perlunya penguatan implementasi proses pembelajaran.`,
        rekomendasiBenahi: `Peningkatan kompetensi GTK dan pengadaan media belajar pendukung ${name}.`,
      });
    }

    // Try parsing RKT row if row contains Identifikasi and Akar Masalah
    if (row.length >= 4 && (joined.includes('benahi') || joined.includes('kegiatan') || joined.includes('masalah'))) {
      if (!joined.includes('indikator') && !joined.includes('panduan')) {
        const ident = row[1] || row[0];
        const akar = row[2] || 'Akar masalah teridentifikasi dari Rapor Pendidikan';
        const benahi = row[3] || 'Peningkatan kapasitas pembelajaran';
        const penjelasan = row[4] || 'Implementasi kegiatan benahi bersama warga sekolah';
        const butuhBiaya = joined.includes('ya') || joined.includes('anggaran') || joined.includes('rp') || (row[5] && row[5].toLowerCase().includes('ya'));

        if (ident.length > 5 && benahi.length > 5) {
          result.rktItems.push({
            id: `parsed-rkt-${i}`,
            nomor: result.rktItems.length + 1,
            identifikasi: ident,
            akarMasalah: akar,
            kegiatanBenahi: benahi,
            penjelasanImplementasi: penjelasan,
            butuhAnggaran: !!butuhBiaya,
            estimasiBiaya: butuhBiaya ? 5000000 : 0,
            targetWaktu: 'Tahun Ajaran 2025/2026',
            penanggungJawab: 'Tim Pengembang Kurikulum',
            status: 'Sedang Berjalan',
            indikatorTerkait: 'Rapor Pendidikan 2026',
          });
        }
      }
    }
  }

  return result;
};
