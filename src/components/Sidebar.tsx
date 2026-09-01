import React from 'react';
import { ActiveTab, SchoolProfile } from '../types/rapor';
import {
  LayoutDashboard,
  Building2,
  FileSpreadsheet,
  Layers,
  Sparkles,
  ClipboardList,
  Calculator,
  Compass,
  Milestone,
  HelpCircle,
  ChevronRight,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onSelectTab?: (tab: ActiveTab) => void;
  setActiveTab?: (tab: string) => void;
  school?: SchoolProfile;
  rktCount?: number;
  arkasCount?: number;
  indicatorCount?: number;
  priorityCount?: number;
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  setActiveTab,
  rktCount = 0,
  arkasCount = 0,
  indicatorCount = 13,
  priorityCount = 6,
  isOpenMobile = false,
  onCloseMobile = () => {},
}) => {
  const handleSelect = (id: ActiveTab) => {
    if (onSelectTab) onSelectTab(id);
    if (setActiveTab) setActiveTab(id);
    if (onCloseMobile) onCloseMobile();
  };

  const menuItems: {
    id: ActiveTab;
    label: string;
    description: string;
    icon: React.ElementType;
    badge?: string | number;
    badgeColor?: string;
    section?: string;
  }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      description: 'Ringkasan capaian mutu & PBD',
      icon: LayoutDashboard,
      section: 'Utama'
    },
    {
      id: 'data-sekolah',
      label: 'Data Sekolah',
      description: 'Profil lembaga, Kepsek & NIP',
      icon: Building2,
      section: 'Utama'
    },
    {
      id: 'laporan-rapor',
      label: 'Laporan Rapor',
      description: 'Data indikator & capaian mutu',
      icon: FileSpreadsheet,
      badge: `${indicatorCount}`,
      badgeColor: 'bg-blue-950 text-blue-300 border border-blue-800/60',
      section: 'Analisis Data'
    },
    {
      id: 'rekom-keseluruhan',
      label: 'Rekom Keseluruhan',
      description: 'Rekomendasi Kemendikdasmen',
      icon: Layers,
      section: 'Analisis Data'
    },
    {
      id: 'rekom-prioritas',
      label: 'Rekom Prioritas',
      description: 'Fokus intervensi terendah',
      icon: Sparkles,
      badge: priorityCount > 0 ? `${priorityCount}` : undefined,
      badgeColor: 'bg-amber-950 text-amber-300 border border-amber-800/60',
      section: 'Analisis Data'
    },
    {
      id: 'lembar-kerja-rkt',
      label: 'Lembar Kerja RKT',
      description: 'Tabel kerja rencana tahunan',
      icon: ClipboardList,
      badge: rktCount > 0 ? `${rktCount}` : undefined,
      badgeColor: 'bg-emerald-950 text-emerald-300 border border-emerald-800/60',
      section: 'Perencanaan (PBD)'
    },
    {
      id: 'lembar-kerja-arkas',
      label: 'Lembar Kerja ARKAS',
      description: 'Rancangan anggaran belanja BOSP',
      icon: Calculator,
      badge: arkasCount > 0 ? `${arkasCount}` : undefined,
      badgeColor: 'bg-indigo-950 text-indigo-300 border border-indigo-800/60',
      section: 'Perencanaan (PBD)'
    },
    {
      id: 'menu-rkt',
      label: 'Menu RKT',
      description: 'Form identifikasi, akar & benahi',
      icon: Compass,
      section: 'Strategis'
    },
    {
      id: 'menu-rkjm',
      label: 'Menu RKJM',
      description: 'Visi misi, SWOT & roadmap',
      icon: Milestone,
      section: 'Strategis'
    },
    {
      id: 'panduan-pbd',
      label: 'Panduan PBD',
      description: 'Pedoman resmi Kemendikdasmen',
      icon: HelpCircle,
      section: 'Bantuan'
    }
  ];

  let currentSection = '';

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0F172A] text-slate-300 border-r border-slate-800/90 select-none shadow-xl">
      {/* Brand Header */}
      <div className="px-4 py-4 bg-[#141E33] border-b border-slate-800 shrink-0">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span className="text-[10px] font-bold text-blue-400 tracking-wider uppercase">
                PBD SATUAN PENDIDIKAN
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-black text-white tracking-tight flex items-center gap-1.5">
              RAPOR PENDIDIKAN <span className="text-blue-400 font-extrabold">2026</span>
            </h1>
          </div>
          {isOpenMobile && (
            <button 
              onClick={onCloseMobile}
              className="md:hidden text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800"
              title="Tutup Menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation Menu List */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1 custom-scrollbar">
        {menuItems.map((item) => {
          const isSectionHeader = item.section && item.section !== currentSection;
          if (isSectionHeader) {
            currentSection = item.section!;
          }

          // Normalize active tab
          const isActive = 
            activeTab === item.id || 
            (item.id === 'lembar-kerja-rkt' && (activeTab === 'lembar-rkt' || activeTab === 'lembar-kerja-rkt')) ||
            (item.id === 'lembar-kerja-arkas' && (activeTab === 'lembar-arkas' || activeTab === 'lembar-kerja-arkas')) ||
            (item.id === 'panduan-pbd' && (activeTab === 'panduan' || activeTab === 'panduan-pbd'));

          return (
            <React.Fragment key={item.id}>
              {isSectionHeader && (
                <div className="px-2.5 pt-3 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest first:pt-1">
                  {item.section}
                </div>
              )}
              <button
                id={`sidebar-nav-${item.id}`}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-blue-600/20 text-white font-semibold border border-blue-500/40 shadow-xs'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`p-1 rounded-md shrink-0 transition-colors ${
                    isActive ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs truncate">
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-1.5">
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold leading-none ${
                        item.badgeColor || 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                </div>
              </button>
            </React.Fragment>
          );
        })}
      </nav>

      {/* Footer Info / Versioning */}
      <div className="px-4 py-3 bg-[#0B132B] border-t border-slate-800/90 text-[10px] text-slate-400 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
          <span className="font-medium text-slate-300">Terintegrasi CSV</span>
        </div>
        <span className="font-mono text-[9px] text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700">
          v2026.1
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Static Sidebar (w-64) */}
      <aside className="hidden md:block w-64 shrink-0 h-[calc(100vh-64px)] sticky top-[64px] z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity" 
            onClick={onCloseMobile} 
          />
          <div className="relative w-64 max-w-xs h-full z-10 shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

