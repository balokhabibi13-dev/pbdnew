import React from 'react';
import { SchoolProfile, UserSession } from '../types/rapor';
import { 
  Upload, 
  Download, 
  Printer, 
  RotateCcw,
  Menu,
  Building2,
  LogOut,
  UserCheck
} from 'lucide-react';

interface HeaderProps {
  school: SchoolProfile;
  schoolName?: string;
  npsn?: string;
  statusSekolah?: string;
  activeTab?: string;
  userSession?: UserSession | null;
  onOpenImport: () => void;
  onOpenPrint: () => void;
  onExportCurrent?: () => void;
  onResetData: () => void;
  onLogout?: () => void;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  school,
  schoolName,
  npsn,
  statusSekolah,
  userSession,
  onOpenImport,
  onOpenPrint,
  onExportCurrent,
  onResetData,
  onLogout,
  onToggleSidebar,
}) => {
  const currentSchoolName = school?.namaSekolah || schoolName || 'SDN SELOGUDIG WETAN II';
  const currentNpsn = school?.npsn || npsn || '20547750';
  const currentStatus = school?.statusSekolah || statusSekolah || 'Negeri';
  const currentBentuk = school?.bentukPendidikan || 'SD';
  const operatorName = userSession?.name || school?.namaKepalaSekolah || 'BALOK HABIBI, S.Pd';
  const operatorEmail = userSession?.email || school?.emailSekolah || 'balok.habibi13@admin.sd.belajar.id';

  // Acronym helper
  const getAcronym = (name: string) => {
    if (name.includes('SMP')) return 'SMP';
    if (name.includes('SMA')) return 'SMA';
    if (name.includes('SMK')) return 'SMK';
    if (name.includes('PAUD')) return 'PAUD';
    if (name.includes('TK')) return 'TK';
    return currentBentuk || 'SD';
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 sticky top-0 z-30 shadow-xs">
      {/* Left: Mobile Toggle & School Identity */}
      <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
        <button 
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
          title="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="w-9 h-9 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center font-bold text-blue-700 text-xs shrink-0 tracking-tight shadow-xs">
          {getAcronym(currentSchoolName)}
        </div>

        <div className="truncate">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-base sm:text-lg text-slate-800 tracking-tight truncate">
              {currentSchoolName}
            </h2>
            <span className="hidden sm:inline-flex text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">
              NPSN: {currentNpsn}
            </span>
          </div>
          <div className="text-[11px] text-slate-500 hidden sm:flex items-center gap-2">
            <span>Status: <strong className="text-slate-700 font-semibold">{currentStatus}</strong></span>
            <span>•</span>
            <span>Kec. Pajarakan, Kab. Probolinggo</span>
            <span>•</span>
            <span>Rapor Pendidikan 2026</span>
          </div>
        </div>
      </div>

      {/* Right: Actions & Principal Profile */}
      <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onOpenImport}
            id="btn-header-import-csv"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors shadow-xs cursor-pointer"
            title="Import Data CSV Rapor"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Import CSV</span>
          </button>

          {onExportCurrent && (
            <button
              onClick={onExportCurrent}
              id="btn-header-export-csv"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              title="Unduh CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden md:inline">Ekspor CSV</span>
            </button>
          )}

          <button
            onClick={onOpenPrint}
            id="btn-header-print-doc"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors shadow-xs cursor-pointer"
            title="Cetak Lembar Kerja RKT, ARKAS, & RKJM"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Cetak Dokumen</span>
          </button>

          <button
            onClick={onResetData}
            id="btn-header-reset-data"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors cursor-pointer"
            title="Reset Data ke Default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Divider */}
        <div className="hidden lg:block h-7 w-px bg-slate-200" />

        {/* Operator Profile */}
        <div className="hidden sm:flex items-center space-x-3 text-right">
          <div>
            <div className="text-xs font-bold text-slate-900 leading-tight flex items-center justify-end gap-1.5">
              <span className="truncate max-w-[130px]">{operatorName}</span>
              <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.2 rounded border border-blue-200">
                Admin
              </span>
            </div>
            <div className="text-[10px] text-slate-500 leading-tight font-mono truncate max-w-[190px]">
              {operatorEmail}
            </div>
          </div>
          <div className="relative">
            <div className="w-9 h-9 bg-blue-900 text-white rounded-full border-2 border-white ring-1 ring-slate-200 flex items-center justify-center font-bold text-xs shadow-xs">
              BH
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
        </div>

        {/* Logout Button */}
        {onLogout && (
          <button
            onClick={onLogout}
            id="btn-header-logout"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-rose-700 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-200 hover:border-rose-600 rounded-lg text-xs font-bold transition-all shadow-2xs cursor-pointer"
            title="Keluar dari Sistem (Logout)"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        )}
      </div>
    </header>
  );
};

