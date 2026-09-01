/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  SchoolProfile, 
  RaporIndicator, 
  RekomendasiItem, 
  RKTItem, 
  ARKASItem, 
  RKJMData 
} from './types/rapor';
import {
  defaultSchoolProfile,
  defaultIndicators,
  defaultRecommendations,
  defaultRKTItems,
  defaultARKASItems,
  defaultRKJMData
} from './data/defaultData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/views/DashboardView';
import { DataSekolahView } from './components/views/DataSekolahView';
import { PanduanPBDView } from './components/views/PanduanPBDView';
import { LaporanRaporView } from './components/views/LaporanRaporView';
import { RekomKeseluruhanView } from './components/views/RekomKeseluruhanView';
import { RekomPrioritasView } from './components/views/RekomPrioritasView';
import { LembarKerjaRKTView } from './components/views/LembarKerjaRKTView';
import { LembarKerjaARKASView } from './components/views/LembarKerjaARKASView';
import { MenuRKTAnalisisView } from './components/views/MenuRKTAnalisisView';
import { MenuRKJMView } from './components/views/MenuRKJMView';
import { ImportModal } from './components/modals/ImportModal';
import { PrintModal } from './components/modals/PrintModal';
import { AddEditRKTModal } from './components/modals/AddEditRKTModal';
import { AddEditARKASModal } from './components/modals/AddEditARKASModal';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Application Data States (with LocalStorage Sync)
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile>(() => {
    const saved = localStorage.getItem('rapor_school_profile_2026');
    return saved ? JSON.parse(saved) : defaultSchoolProfile;
  });

  const [indicators, setIndicators] = useState<RaporIndicator[]>(() => {
    const saved = localStorage.getItem('rapor_indicators_2026');
    return saved ? JSON.parse(saved) : defaultIndicators;
  });

  const [recommendations, setRecommendations] = useState<RekomendasiItem[]>(() => {
    const saved = localStorage.getItem('rapor_recommendations_2026');
    return saved ? JSON.parse(saved) : defaultRecommendations;
  });

  const [rktItems, setRktItems] = useState<RKTItem[]>(() => {
    const saved = localStorage.getItem('rapor_rkt_items_2026');
    return saved ? JSON.parse(saved) : defaultRKTItems;
  });

  const [arkasItems, setArkasItems] = useState<ARKASItem[]>(() => {
    const saved = localStorage.getItem('rapor_arkas_items_2026');
    return saved ? JSON.parse(saved) : defaultARKASItems;
  });

  const [rkjmData, setRkjmData] = useState<RKJMData>(() => {
    const saved = localStorage.getItem('rapor_rkjm_data_2026');
    if (!saved) return defaultRKJMData;
    try {
      const parsed = JSON.parse(saved);
      // If user had the old template placeholder, migrate automatically to GESIT
      if (parsed?.visi && parsed.visi.includes('Beriman, Unggul dalam Literasi-Numerasi')) {
        return defaultRKJMData;
      }
      return parsed;
    } catch {
      return defaultRKJMData;
    }
  });

  // Modal Control States
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [isAddEditRKTOpen, setIsAddEditRKTOpen] = useState<boolean>(false);
  const [selectedRKTItem, setSelectedRKTItem] = useState<RKTItem | null>(null);
  const [isAddEditARKASOpen, setIsAddEditARKASOpen] = useState<boolean>(false);
  const [selectedARKASItem, setSelectedARKASItem] = useState<ARKASItem | null>(null);

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('rapor_school_profile_2026', JSON.stringify(schoolProfile));
  }, [schoolProfile]);

  useEffect(() => {
    localStorage.setItem('rapor_indicators_2026', JSON.stringify(indicators));
  }, [indicators]);

  useEffect(() => {
    localStorage.setItem('rapor_recommendations_2026', JSON.stringify(recommendations));
  }, [recommendations]);

  useEffect(() => {
    localStorage.setItem('rapor_rkt_items_2026', JSON.stringify(rktItems));
  }, [rktItems]);

  useEffect(() => {
    localStorage.setItem('rapor_arkas_items_2026', JSON.stringify(arkasItems));
  }, [arkasItems]);

  useEffect(() => {
    localStorage.setItem('rapor_rkjm_data_2026', JSON.stringify(rkjmData));
  }, [rkjmData]);

  // Handler to Reset all data to defaults
  const handleResetData = () => {
    if (window.confirm('Apakah Anda yakin ingin mengatur ulang data ke default contoh Rapor Pendidikan 2026? Semua perubahan manual akan direset.')) {
      setSchoolProfile(defaultSchoolProfile);
      setIndicators(defaultIndicators);
      setRecommendations(defaultRecommendations);
      setRktItems(defaultRKTItems);
      setArkasItems(defaultARKASItems);
      setRkjmData(defaultRKJMData);
      localStorage.clear();
    }
  };

  // Handler for CSV Import
  const handleApplyImport = (data: {
    indicators?: RaporIndicator[];
    recommendations?: RekomendasiItem[];
    rktItems?: RKTItem[];
    arkasItems?: ARKASItem[];
    schoolNameDetected?: string;
    npsnDetected?: string;
  }) => {
    if (data.indicators && data.indicators.length > 0) {
      setIndicators(data.indicators);
    }
    if (data.recommendations && data.recommendations.length > 0) {
      setRecommendations(data.recommendations);
    }
    if (data.rktItems && data.rktItems.length > 0) {
      setRktItems(data.rktItems);
    }
    if (data.schoolNameDetected) {
      setSchoolProfile(prev => ({
        ...prev,
        namaSekolah: data.schoolNameDetected || prev.namaSekolah,
        npsn: data.npsnDetected || prev.npsn
      }));
    }
  };

  // Handler to Add Recommendation to RKT seamlessly
  const handleAddRecommendationToRKT = (rekom: RekomendasiItem) => {
    const newItem: RKTItem = {
      id: `rkt-${Date.now()}`,
      nomor: rktItems.length + 1,
      identifikasi: rekom.identifikasiMasalah,
      akarMasalah: `[${rekom.akarMasalahKode}] ${rekom.akarMasalahNama}: ${rekom.deskripsiAkarMasalah}`,
      kegiatanBenahi: rekom.kegiatanBenahi,
      penjelasanImplementasi: rekom.penjelasanBenahi,
      butuhAnggaran: true,
      estimasiBiaya: 7500000,
      targetWaktu: 'Semester Ganjil 2025/2026',
      penanggungJawab: 'Tim Pengembang Kurikulum & Pendidik',
      status: 'Belum Dimulai',
      indikatorTerkait: `${rekom.indikatorPrioritasKode} ${rekom.indikatorPrioritasNama}`,
      catatan: `Rujukan Program ARKAS: ${rekom.programKegiatanArkas}`
    };

    setRktItems(prev => [...prev, newItem]);
  };

  // Handler to Add new custom RKT from Analisis form
  const handleAddCustomRKT = (item: Omit<RKTItem, 'id' | 'nomor'>) => {
    const newItem: RKTItem = {
      ...item,
      id: `rkt-${Date.now()}`,
      nomor: rktItems.length + 1,
    };
    setRktItems(prev => [...prev, newItem]);
  };

  // Handler for RKT item save from Modal
  const handleSaveRKTFromModal = (item: RKTItem) => {
    if (selectedRKTItem) {
      // Edit existing
      setRktItems(prev => prev.map(r => r.id === item.id ? item : r));
    } else {
      // Add new
      setRktItems(prev => [...prev, item]);
    }
  };

  // Handler for ARKAS item save from Modal
  const handleSaveARKASFromModal = (item: ARKASItem) => {
    if (selectedARKASItem) {
      // Edit existing
      setArkasItems(prev => prev.map(a => a.id === item.id ? item : a));
    } else {
      // Add new
      setArkasItems(prev => [...prev, item]);
    }
  };

  // Priority count calculation for badges
  const priorityCount = recommendations.filter(r => r.isPrioritasUtama).length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Application Header */}
      <Header
        school={schoolProfile}
        schoolName={schoolProfile.namaSekolah}
        npsn={schoolProfile.npsn}
        statusSekolah={schoolProfile.statusSekolah}
        activeTab={activeTab}
        onOpenImport={() => setIsImportModalOpen(true)}
        onOpenPrint={() => setIsPrintModalOpen(true)}
        onResetData={handleResetData}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main App Container: Static Responsive Dapodik Sidebar + Dynamic Content View */}
      <div className="flex flex-1 w-full max-w-[1920px] mx-auto overflow-hidden">
        {/* Static Dapodik Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          indicatorCount={indicators.length}
          rktCount={rktItems.length}
          arkasCount={arkasItems.length}
          priorityCount={priorityCount}
        />

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* 1. Dashboard View */}
          {activeTab === 'dashboard' && (
            <DashboardView
              school={schoolProfile}
              indicators={indicators}
              recommendations={recommendations}
              rktItems={rktItems}
              arkasItems={arkasItems}
              rkjmData={rkjmData}
              onNavigate={setActiveTab}
              onOpenImport={() => setIsImportModalOpen(true)}
            />
          )}

          {/* 2. Data Sekolah View */}
          {activeTab === 'data-sekolah' && (
            <DataSekolahView
              school={schoolProfile}
              onSave={setSchoolProfile}
            />
          )}

          {/* 3. Panduan PBD View */}
          {activeTab === 'panduan' && (
            <PanduanPBDView />
          )}

          {/* 4. Laporan Rapor View */}
          {activeTab === 'laporan-rapor' && (
            <LaporanRaporView
              indicators={indicators}
            />
          )}

          {/* 5. Rekomendasi Keseluruhan View */}
          {activeTab === 'rekom-keseluruhan' && (
            <RekomKeseluruhanView
              recommendations={recommendations}
              onAddToRKT={handleAddRecommendationToRKT}
            />
          )}

          {/* 6. Rekomendasi Prioritas View */}
          {activeTab === 'rekom-prioritas' && (
            <RekomPrioritasView
              recommendations={recommendations}
              onAddToRKT={handleAddRecommendationToRKT}
            />
          )}

          {/* 7. Lembar Kerja RKT View */}
          {activeTab === 'lembar-rkt' && (
            <LembarKerjaRKTView
              rktItems={rktItems}
              school={schoolProfile}
              onUpdateRKT={setRktItems}
              onAddNewRKT={() => {
                setSelectedRKTItem(null);
                setIsAddEditRKTOpen(true);
              }}
              onEditRKT={(item) => {
                setSelectedRKTItem(item);
                setIsAddEditRKTOpen(true);
              }}
              onNavigateToArkas={() => setActiveTab('lembar-arkas')}
              onOpenPrint={() => setIsPrintModalOpen(true)}
            />
          )}

          {/* 8. Lembar Kerja ARKAS View */}
          {activeTab === 'lembar-arkas' && (
            <LembarKerjaARKASView
              arkasItems={arkasItems}
              school={schoolProfile}
              rktItems={rktItems}
              onUpdateARKAS={setArkasItems}
              onAddNewARKAS={() => {
                setSelectedARKASItem(null);
                setIsAddEditARKASOpen(true);
              }}
              onEditARKAS={(item) => {
                setSelectedARKASItem(item);
                setIsAddEditARKASOpen(true);
              }}
              onOpenPrint={() => setIsPrintModalOpen(true)}
            />
          )}

          {/* 9. Menu RKT Analisis View */}
          {activeTab === 'menu-rkt' && (
            <MenuRKTAnalisisView
              indicators={indicators}
              recommendations={recommendations}
              school={schoolProfile}
              onAddRKTItem={handleAddCustomRKT}
              onNavigateToRKTSheet={() => setActiveTab('lembar-rkt')}
            />
          )}

          {/* 10. Menu RKJM View */}
          {activeTab === 'menu-rkjm' && (
            <MenuRKJMView
              rkjmData={rkjmData}
              school={schoolProfile}
              onUpdateRKJM={setRkjmData}
              onOpenPrint={() => setIsPrintModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* MODALS */}
      {/* CSV Import Modal */}
      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onApplyImport={handleApplyImport}
      />

      {/* Formal Print Modal */}
      <PrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        school={schoolProfile}
        indicators={indicators}
        rktItems={rktItems}
        arkasItems={arkasItems}
        rkjmData={rkjmData}
      />

      {/* Add / Edit RKT Modal */}
      <AddEditRKTModal
        isOpen={isAddEditRKTOpen}
        onClose={() => {
          setIsAddEditRKTOpen(false);
          setSelectedRKTItem(null);
        }}
        onSave={handleSaveRKTFromModal}
        initialItem={selectedRKTItem}
        totalExisting={rktItems.length}
      />

      {/* Add / Edit ARKAS Modal */}
      <AddEditARKASModal
        isOpen={isAddEditARKASOpen}
        onClose={() => {
          setIsAddEditARKASOpen(false);
          setSelectedARKASItem(null);
        }}
        onSave={handleSaveARKASFromModal}
        initialItem={selectedARKASItem}
        rktItems={rktItems}
        totalExisting={arkasItems.length}
      />
    </div>
  );
}
