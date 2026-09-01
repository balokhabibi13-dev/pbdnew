import React, { useState } from 'react';
import { SchoolProfile, UserSession } from '../../types/rapor';
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  LogIn, 
  AlertCircle, 
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  Calculator,
  KeyRound
} from 'lucide-react';

interface LoginViewProps {
  school: SchoolProfile;
  onLoginSuccess: (session: UserSession) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ school, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanUser || !cleanPass) {
      setErrorMessage('Silakan masukkan username dan password.');
      return;
    }

    setIsLoading(true);

    // Authentication verification (username: admin, password: admin)
    setTimeout(() => {
      if (cleanUser === 'admin' && cleanPass === 'admin') {
        const session: UserSession = {
          username: 'admin',
          name: school.namaKepalaSekolah || 'BALOK HABIBI, S.Pd',
          role: 'Administrator / Operator Sekolah',
          email: school.emailSekolah || 'balok.habibi13@admin.sd.belajar.id',
          loginTime: new Date().toISOString(),
          schoolName: school.namaSekolah,
          npsn: school.npsn
        };

        if (rememberMe) {
          localStorage.setItem('rapor_auth_session', JSON.stringify(session));
        } else {
          sessionStorage.setItem('rapor_auth_session', JSON.stringify(session));
        }

        onLoginSuccess(session);
      } else {
        setIsLoading(false);
        setErrorMessage('Username atau Password salah! Gunakan username: admin dan password: admin.');
      }
    }, 450);
  };

  const handleQuickFill = () => {
    setUsername('admin');
    setPassword('admin');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-100 relative overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Ministry Banner */}
      <header className="w-full bg-[#0A101D]/90 border-b border-slate-800/80 backdrop-blur-md py-3.5 px-4 sm:px-8 z-10">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-black text-blue-400 text-sm shadow-inner">
              PBD
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-blue-400">
                KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH
              </div>
              <h1 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                Sistem Informasi Rapor Pendidikan & PBD 2026
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="hidden sm:inline">Server Siap •</span>
            <span className="font-semibold text-slate-300">Tahun Ajaran 2025/2026</span>
          </div>
        </div>
      </header>

      {/* Main Login Card Section */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 z-10">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: School Identity & PBD Highlights (5 Cols on LG) */}
          <div className="lg:col-span-5 space-y-5 order-2 lg:order-1">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Satuan Pendidikan Terdaftar
                </span>
                <span className="text-[10px] font-mono font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                  NPSN: {school.npsn}
                </span>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-400 shrink-0" />
                  <span>{school.namaSekolah}</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {school.alamat}, Desa {school.desaKelurahan}, Kec. {school.kecamatan}, {school.kabupatenKota}, {school.provinsi}.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-xs">
                <div className="text-slate-400">
                  Kepala Sekolah: <strong className="text-white font-semibold">{school.namaKepalaSekolah}</strong>
                </div>
                <div className="text-slate-400 font-mono text-[11px]">
                  NIP: <span className="text-slate-300">{school.nipKepalaSekolah}</span>
                </div>
              </div>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 text-center">
                <FileSpreadsheet className="w-4 h-4 text-blue-400 mx-auto mb-1.5" />
                <div className="text-[11px] font-bold text-slate-200">Rapor Mutu</div>
                <div className="text-[9px] text-slate-400">Kemendikdasmen</div>
              </div>
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 text-center">
                <Layers className="w-4 h-4 text-emerald-400 mx-auto mb-1.5" />
                <div className="text-[11px] font-bold text-slate-200">RKT & RKJM</div>
                <div className="text-[9px] text-slate-400">PBD 4 Tahunan</div>
              </div>
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 text-center">
                <Calculator className="w-4 h-4 text-amber-400 mx-auto mb-1.5" />
                <div className="text-[11px] font-bold text-slate-200">ARKAS BOSP</div>
                <div className="text-[9px] text-slate-400">Anggaran 2026</div>
              </div>
            </div>
          </div>

          {/* Right Column: Authentication Form (7 Cols on LG) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
              
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Autentikasi Pengguna</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Masuk ke Aplikasi
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Silakan masukkan kredensial akun administrator untuk mengelola data Rapor Pendidikan dan perencanaan satuan pendidikan.
                </p>
              </div>

              {/* Quick Fill Demo Helper Badge */}
              <div className="mb-5 p-3 rounded-xl bg-blue-950/40 border border-blue-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-blue-400 shrink-0" />
                  <div className="text-xs text-slate-300">
                    <span className="font-semibold text-blue-300">Kredensial Login:</span>{' '}
                    <span className="font-mono bg-blue-900/60 px-1.5 py-0.5 rounded text-blue-200">admin</span> /{' '}
                    <span className="font-mono bg-blue-900/60 px-1.5 py-0.5 rounded text-blue-200">admin</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="text-[11px] font-bold px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors whitespace-nowrap"
                >
                  Isi Otomatis
                </button>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="mb-5 p-3 rounded-xl bg-rose-950/50 border border-rose-800/60 text-rose-200 text-xs flex items-center gap-2.5 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setErrorMessage('');
                      }}
                      placeholder="Masukkan username (admin)"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium transition"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrorMessage('');
                      }}
                      placeholder="Masukkan password (admin)"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Options Row */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <label className="flex items-center gap-2 text-slate-400 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500/20"
                    />
                    <span>Ingat Saya di Perangkat Ini</span>
                  </label>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Akses: Full Operator
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  id="btn-login-submit"
                  className="w-full mt-2 py-3 px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition duration-150 cursor-pointer"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Memverifikasi Akses...</span>
                    </div>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Masuk ke Sistem Rapor</span>
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-4 text-center border-t border-slate-800/80 bg-[#0A101D]/70 text-[11px] text-slate-400 z-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © 2026 {school.namaSekolah} • NPSN {school.npsn}. Hak Cipta Dilindungi.
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Perencanaan Berbasis Data (PBD)</span>
            <span>•</span>
            <span>Kemendikdasmen</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
