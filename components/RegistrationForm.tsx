import React, { useRef, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Box,
  ClipboardCheck,
  MessageCircle,
  Camera,
  Construction,
  PiggyBank,
  Building2,
  PartyPopper,
  AlertCircle,
  Megaphone,
  Sparkles,
  Banknote,
  Receipt,
  BarChart3,
  AlertTriangle,
  Info,
  Send
} from 'lucide-react';
import { useRegistrationForm } from '../hooks/useRegistrationForm';
import { formatIDR } from '../lib/formatters';
import { JENJANG_OPTIONS, INCOME_OPTIONS, getSPPOptionsByIncome, FASILITAS_OPTIONS } from '../lib/registrationConstants';

interface RegistrationFormProps {
  onClose: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onClose }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const {
    formStatus,
    errorMessage,
    jenjang,
    setJenjang,
    income,
    setIncome,
    infaqVal,
    setInfaqVal,
    infaqScheme,
    setInfaqScheme,
    uangPangkalVal,
    setUangPangkalVal,
    uangPangkalScheme,
    setUangPangkalScheme,
    setIsFasilitasMonthly,
    setFasilitasVal,
    isMondok,
    totalPendaftaran,
    totalBulananNext,
    fotoSantri,
    setFotoSantri,
    fileSKM,
    setFileSKM,
    setFileBukti,
    handleFileChange,
    submitForm
  } = useRegistrationForm();

  useEffect(() => {
    if (formStatus === 'success' && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [formStatus]);

  const sppOptions = getSPPOptionsByIncome(income);


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/90 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-navy rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col h-full max-h-[85vh] md:max-h-[90vh]">

        {/* Header */}
        {/* Header - Compact Version for Mobile */}
        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-navy-dark flex-shrink-0 gap-2">
          <div className="flex-1">
            <h2 className="text-lg md:text-2xl font-bold text-navy dark:text-white leading-tight">
              Formulir Pendaftaran
            </h2>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 md:line-clamp-none">
              Pondok Pesantren Nurul Huda Malati - TA 2026/2027
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors flex-shrink-0">
            <X className="w-6 h-6 text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div ref={contentRef} className="p-4 md:p-8 overflow-y-auto flex-grow min-h-0">
          {formStatus === 'success' ? (
            <div className="p-4 md:p-10 flex flex-col items-start text-left space-y-6 w-full">
              <div className="w-full flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 rounded-xl text-green-800 dark:text-green-100 mb-2">
                <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                <div>
                  <h3 className="text-lg font-bold">Pendaftaran Berhasil!</h3>
                  <p className="text-sm">Terima kasih atas kepercayaan Bapak/Ibu mendaftarkan putra/putrinya.</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed w-full">
                <p>
                  Sebagai tindak lanjut, Bapak/Ibu diharapkan untuk <strong>melengkapi dokumen pendaftaran</strong> di <strong>Kantor Bendahara Pondok Pesantren Nurul Huda</strong>.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10">
                    <h4 className="font-bold text-navy dark:text-primary mb-2 border-b border-slate-200 dark:border-white/10 pb-1 flex items-center gap-2">
                      <Box className="w-4 h-4" /> Berkas Wajib
                    </h4>
                    <ul className="space-y-1 text-xs md:text-sm">
                      <li className="flex gap-2"><span>•</span> Fotocopy Kartu Keluarga</li>
                      <li className="flex gap-2"><span>•</span> Fotocopy KTP Orang Tua</li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10">
                    <h4 className="font-bold text-navy dark:text-primary mb-2 border-b border-slate-200 dark:border-white/10 pb-1 flex items-center gap-2">
                      <ClipboardCheck className="w-4 h-4" /> Berkas Opsional
                    </h4>
                    <ul className="space-y-1 text-xs md:text-sm">
                      <li className="flex gap-2"><span>•</span> Fotocopy Kartu BPJS / KIP</li>
                      <li className="flex gap-2"><span>•</span> Fotocopy Ijazah / SKTB</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-action-blue/10 dark:bg-primary/10 border-l-4 border-action-blue dark:border-primary rounded-r-xl">
                  <p className="mb-2 text-xs md:text-sm">
                    Silakan bergabung dalam <strong>Grup WhatsApp Calon Santri</strong> untuk informasi lebih lanjut:
                  </p>
                  <a
                    href={jenjang.includes('ANSOR') ? "https://chat.whatsapp.com/GkuORmScGsBKZKabmFGqAE" : "https://chat.whatsapp.com/K5LHiA66RMoHmyd6OLiKS5"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-action-blue dark:text-primary font-bold hover:underline break-all text-xs md:text-sm"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {jenjang.includes('ANSOR') ? "Grup WhatsApp Khusus Ansor 2026/2027" : "Grup WhatsApp Calon Santri 2026/2027"}
                  </a>
                </div>
              </div>

              <div className="w-full flex justify-center mt-8">
                <button onClick={onClose} className="bg-primary text-navy font-bold py-3 px-8 md:px-12 rounded-full hover:bg-white transition-all border border-primary shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Tutup Formulir
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Welcome Info Box */}
              <div className="bg-slate-50 dark:bg-white/5 p-4 md:p-6 rounded-2xl border border-slate-200 dark:border-white/10 text-xs md:text-sm text-slate-700 dark:text-slate-300 space-y-3 shadow-sm">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">NH</div>
                  <div>
                    <p className="text-primary font-bold tracking-wider uppercase text-[10px] md:text-xs">
                      Nurul Huda Maju Bersama
                    </p>
                    <p className="font-bold text-action-blue dark:text-primary text-sm">Pendaftaran Santri Baru 2026/2027</p>
                  </div>
                </div>
                <p className="leading-relaxed">
                  <span className="font-bold">Awali dengan Basmallah.</span> Bergabunglah dengan lingkungan pendidikan yang memadukan pesantren dan sekolah formal terpadu untuk membangun masa depan cerah.
                </p>
              </div>

              <form onSubmit={submitForm} className="space-y-10">

                {/* --- REGISTRASI --- */}
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-8 h-8 rounded-lg bg-action-blue dark:bg-primary text-white dark:text-navy flex items-center justify-center font-bold text-sm">01</span>
                    <h3 className="text-lg font-bold text-navy dark:text-white">Registrasi Pendaftaran</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    <div className="space-y-1.5">
                      <label className="block text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Tanggal Pendaftaran *</label>
                      <input type="date" name="Tanggal_Pendaftaran" required className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Asal Sekolah *</label>
                      <input type="text" name="Asal_Sekolah" required placeholder="Nama Sekolah Asal" className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all" />
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="block text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Masuk Ke Jenjang *</label>
                      <select
                        name="Masuk_Ke_Jenjang"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all appearance-none"
                        onChange={(e) => setJenjang(e.target.value)}
                      >
                        <option value="">Pilih Jenjang...</option>
                        {JENJANG_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      {jenjang.includes("DOMISI SEKITAR") && (
                        <div className="flex gap-2 mt-2 px-3 py-2 bg-blue-50 dark:bg-white/5 rounded-lg border border-blue-100 dark:border-white/10">
                          <Info className="w-4 h-4 text-action-blue dark:text-primary" />
                          <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">
                            <strong>Sekitar:</strong> Desa Padaasih, Padasuka, Sirnajaya, Padamulya dan Pasirkiamis.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* --- DATA DIRI --- */}
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-8 h-8 rounded-lg bg-action-blue dark:bg-primary text-white dark:text-navy flex items-center justify-center font-bold text-sm">02</span>
                    <h3 className="text-lg font-bold text-navy dark:text-white">Data Diri Calon Santri</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="block text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Foto Calon Santri (3x4) *</label>
                      <div className="border-2 border-dashed border-slate-300 dark:border-white/20 rounded-2xl p-6 md:p-8 text-center hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer relative group">
                        <input
                          type="file"
                          accept="image/*"
                          required
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => handleFileChange(e, setFotoSantri)}
                        />
                        {fotoSantri ? (
                          <div className="flex flex-col items-center gap-2 text-green-600 dark:text-green-400">
                            <CheckCircle2 className="w-10 h-10" />
                            <span className="font-bold text-sm">Foto Berhasil Diunggah</span>
                          </div>
                        ) : (
                          <div className="text-slate-500 group-hover:text-primary transition-colors">
                            <Camera className="w-10 h-10 mb-2 mx-auto" />
                            <p className="text-sm font-bold">Ketuk untuk upload foto</p>
                            <p className="text-[10px] md:text-xs mt-1">Format: JPG, PNG (Maks 2MB)</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Nama Lengkap *</label>
                      <input type="text" name="Nama_Santri_Baru" required placeholder="Sesuai Ijazah" className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Tempat Lahir *</label>
                      <input type="text" name="Tempat_Lahir" required placeholder="Sesuai KK" className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Tanggal Lahir *</label>
                      <input type="date" name="Tanggal_Lahir" required className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">No. HP / WhatsApp *</label>
                      <input type="tel" name="No_HP" required placeholder="0812xxxx" className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Nama Ayah *</label>
                      <input type="text" name="Nama_Ayah" required placeholder="Ayah Kandung" className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Nama Ibu *</label>
                      <input type="text" name="Nama_Ibu" required placeholder="Ibu Kandung" className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Jenis Kelamin *</label>
                      <select name="Jenis_Kelamin" required className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary appearance-none">
                        <option value="">Pilih...</option>
                        <option value="Laki-Laki">Laki-Laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Ukuran Seragam *</label>
                      <select name="Ukuran_Seragam" required className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary appearance-none">
                        <option value="">Pilih Ukuran...</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Alamat Email *</label>
                      <input type="email" name="Email" required placeholder="email@aktif.com" className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">NISN *</label>
                      <input type="number" name="NISN" required placeholder="10 Digit NISN" className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all" />
                    </div>

                    {isMondok && (
                      <>
                        <div className="md:col-span-2 space-y-1.5">
                          <label className="block text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Ada saudara kandung yang sedang mondok di sini? *</label>
                          <select name="Saudara_Kandung" required className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary appearance-none">
                            <option value="">Pilih...</option>
                            <option value="Iya">Iya, Ada</option>
                            <option value="Tidak">Tidak Ada</option>
                          </select>
                        </div>
                        <div className="md:col-span-2 space-y-1.5">
                          <label className="block text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Apakah ananda seorang yatim? *</label>
                          <select name="Anak_Yatim" required className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary appearance-none">
                            <option value="">Pilih...</option>
                            <option value="Iya">Iya (Yatim/Piatu)</option>
                            <option value="Tidak">Tidak</option>
                          </select>
                        </div>
                      </>
                    )}

                    <div className="md:col-span-2 space-y-1.5">
                      <label className="block text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Alamat Lengkap *</label>
                      <textarea name="Alamat_Lengkap" required rows={3} placeholder="Alamat Sesuai KTP" className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all resize-none"></textarea>
                    </div>
                  </div>
                </section>

                {/* --- DATA ADMINISTRASI & PEMBAYARAN --- */}
                {isMondok && (
                  <section className="animate-[fadeIn_0.5s_ease] space-y-8">
                    <div className="flex items-center gap-2 mb-6">
                      <span className="w-8 h-8 rounded-lg bg-action-blue dark:bg-primary text-white dark:text-navy flex items-center justify-center font-bold text-sm">03</span>
                      <h3 className="text-lg font-bold text-navy dark:text-white">Administrasi & Pembayaran</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      {/* INFAQ */}
                      <div className="bg-white dark:bg-navy-dark p-5 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -mr-16 -mt-16 rounded-full"></div>

                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-50 dark:bg-white/5 rounded-lg text-action-blue dark:text-primary">
                              <Construction className="w-6 h-6" />
                            </div>
                            <div>
                              <label className="text-sm md:text-base font-bold text-navy dark:text-white uppercase tracking-tight">Infaq Pembangunan Pesantren *</label>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400">Pilih metode kontribusi partisipasi pembangunan</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                            {/* Option Langsung */}
                            <div
                              onClick={() => { setInfaqVal(500000); setInfaqScheme('Langsung'); }}
                              className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden ${infaqScheme === 'Langsung'
                                ? 'border-primary bg-primary/5 shadow-md ring-4 ring-primary/10'
                                : 'border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 hover:border-slate-300 dark:hover:border-white/20'
                                }`}
                            >
                              {infaqScheme === 'Langsung' && (
                                <div className="absolute top-0 right-0 p-2">
                                  <CheckCircle2 className="w-5 h-5 text-primary" />
                                </div>
                              )}
                              <div className="flex flex-col h-full">
                                <div className="mb-3">
                                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2 ${infaqScheme === 'Langsung' ? 'bg-primary text-navy' : 'bg-green-100 dark:bg-green-900/30 text-green-600'
                                    }`}>
                                    Paling Hemat
                                  </span>
                                  <h4 className="text-sm font-bold text-navy dark:text-white">Pembayaran Langsung</h4>
                                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-1">Satu kali bayar untuk 3 tahun ke depan</p>
                                </div>
                                <div className="mt-auto">
                                  <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-black text-navy dark:text-white tracking-tighter">Rp 500rb</span>
                                    <span className="text-xs font-medium text-slate-400 line-through decoration-red-500/50">600rb</span>
                                  </div>
                                  <div className="mt-2 text-[10px] font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
                                    <PiggyBank className="w-3.5 h-3.5" />
                                    Hemat Rp 100.000
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Option Normal */}
                            <div
                              onClick={() => { setInfaqVal(200000); setInfaqScheme('Normal'); }}
                              className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${infaqScheme === 'Normal'
                                ? 'border-primary bg-primary/5 shadow-md ring-4 ring-primary/10'
                                : 'border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 hover:border-slate-300 dark:hover:border-white/20'
                                }`}
                            >
                              {infaqScheme === 'Normal' && (
                                <div className="absolute top-0 right-0 p-2">
                                  <CheckCircle2 className="w-5 h-5 text-primary" />
                                </div>
                              )}
                              <div className="flex flex-col h-full">
                                <div className="mb-3">
                                  <span className="inline-block px-3 py-1 rounded-full bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400 text-[10px] font-black uppercase tracking-wider mb-2">
                                    Skema Tahunan
                                  </span>
                                  <h4 className="text-sm font-bold text-navy dark:text-white">Pembayaran Normal</h4>
                                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-1">Dicicil rutin setiap awal tahun ajaran</p>
                                </div>
                                <div className="mt-auto">
                                  <p className="text-2xl font-black text-navy dark:text-white tracking-tighter">Rp 200rb</p>
                                  <p className="text-[10px] text-slate-400 mt-1 italic">Total Rp 600rb (3x Pembayaran)</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <input type="hidden" name="Infaq_Pembangunan" value={infaqScheme === 'Langsung' ? "Pembayaran Langsung - Rp. 500.000 (Per 3 Tahun)" : "Pembayaran Normal - Rp. 200.000 (Per Tahun)"} required />
                          {infaqScheme === '' && <p className="mt-3 text-[10px] text-red-500 font-bold flex items-center gap-1 animate-pulse"><AlertCircle className="w-3.5 h-3.5" /> Mohon pilih salah satu skema infaq</p>}
                        </div>
                      </div>

                      {/* UANG PANGKAL (MUKIM ONLY) */}
                      {isMondok && (
                        <div className="bg-white dark:bg-navy-dark p-5 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 -mr-16 -mt-16 rounded-full"></div>

                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="p-2 bg-amber-50 dark:bg-white/5 rounded-lg text-amber-500">
                                <Building2 className="w-6 h-6" />
                              </div>
                              <div>
                                <label className="text-sm md:text-base font-bold text-navy dark:text-white uppercase tracking-tight">Uang Pangkal (Santri Mukim) *</label>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400">Biaya investasi awal untuk kenyamanan santri</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                              {/* Option Langsung */}
                              <div
                                onClick={() => { setUangPangkalVal(1000000); setUangPangkalScheme('Langsung'); }}
                                className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden ${uangPangkalScheme === 'Langsung'
                                  ? 'border-amber-500 bg-amber-500/5 shadow-md ring-4 ring-amber-500/10'
                                  : 'border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 hover:border-slate-300 dark:hover:border-white/20'
                                  }`}
                              >
                                {uangPangkalScheme === 'Langsung' && (
                                  <div className="absolute top-0 right-0 p-2">
                                    <CheckCircle2 className="w-5 h-5 text-amber-500" />
                                  </div>
                                )}
                                <div className="flex flex-col h-full">
                                  <div className="mb-3">
                                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2 ${uangPangkalScheme === 'Langsung' ? 'bg-amber-500 text-white' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600'
                                      }`}>
                                      Best Deal
                                    </span>
                                    <h4 className="text-sm font-bold text-navy dark:text-white">Pembayaran Langsung</h4>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-1">Hanya dibayar satu kali untuk selamanya</p>
                                  </div>
                                  <div className="mt-auto">
                                    <div className="flex items-baseline gap-1">
                                      <span className="text-2xl font-black text-navy dark:text-white tracking-tighter">Rp 1 JT</span>
                                      <span className="text-xs font-medium text-slate-400 line-through decoration-red-500/50">1.2JT</span>
                                    </div>
                                    <div className="mt-2 text-[10px] font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
                                      <PartyPopper className="w-3.5 h-3.5" />
                                      Hemat Rp 200.000
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Option Normal */}
                              <div
                                onClick={() => { setUangPangkalVal(400000); setUangPangkalScheme('Normal'); }}
                                className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${uangPangkalScheme === 'Normal'
                                  ? 'border-amber-500 bg-amber-500/5 shadow-md ring-4 ring-amber-500/10'
                                  : 'border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 hover:border-slate-300 dark:hover:border-white/20'
                                  }`}
                              >
                                {uangPangkalScheme === 'Normal' && (
                                  <div className="absolute top-0 right-0 p-2">
                                    <CheckCircle2 className="w-5 h-5 text-amber-500" />
                                  </div>
                                )}
                                <div className="flex flex-col h-full">
                                  <div className="mb-3">
                                    <span className="inline-block px-3 py-1 rounded-full bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400 text-[10px] font-black uppercase tracking-wider mb-2">
                                      Cicilan Tahunan
                                    </span>
                                    <h4 className="text-sm font-bold text-navy dark:text-white">Pembayaran Normal</h4>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-1">Dibayar setiap awal tahun ajaran (SMP/SMK)</p>
                                  </div>
                                  <div className="mt-auto">
                                    <p className="text-2xl font-black text-navy dark:text-white tracking-tighter">Rp 400rb</p>
                                    <p className="text-[10px] text-slate-400 mt-1 italic">Total Rp 1.2jt (3x Pembayaran)</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <input type="hidden" name="Uang_Pangkal" value={uangPangkalScheme === 'Langsung' ? "Pembayaran Langsung - Rp. 1.000.000 (Per 3 Tahun)" : "Pembayaran Normal - Rp. 400.000 (Per Tahun)"} required />
                            {uangPangkalScheme === '' && <p className="mt-3 text-[10px] text-red-100 font-bold flex items-center gap-1 animate-pulse bg-red-500/10 p-2 rounded-lg border border-red-500/20"><AlertCircle className="w-3.5 h-3.5" /> Mohon pilih salah satu skema uang pangkal</p>}
                          </div>
                        </div>
                      )}

                      {/* KHUTBATUL ARSY */}
                      <div className="bg-blue-50 dark:bg-white/5 p-4 md:p-6 rounded-2xl border border-blue-100 dark:border-white/10 shadow-sm border-l-4 border-l-action-blue">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2 text-action-blue dark:text-primary">
                            <Megaphone className="w-5 h-5" />
                            <label className="text-sm font-bold uppercase tracking-tight">Khutbatul ‘Arsy (Leadership Camp) *</label>
                          </div>
                          <span className="bg-action-blue text-white px-3 py-1 rounded-full text-[10px] font-bold self-start md:self-auto">Wajib (Rp 150.000)</span>
                        </div>
                        <p className="text-[11px] md:text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                          Workshop Pembinaan & Bumi Perkemahan kolaboratif pembukaan tahun ajaran.
                        </p>
                        <input type="hidden" name="Khutbatul_Arsy" value="Lunas - Rp. 150.000 (Workshop & Perkemahan)" />
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-[10px] font-bold bg-white/50 dark:bg-black/20 p-2 rounded-lg border border-green-200 dark:border-green-900/30">
                          <Sparkles className="w-4 h-4" />
                          <span>Biaya otomatis ditambahkan ke ringkasan pendaftaran</span>
                        </div>
                      </div>

                      {/* DETAIL BIAYA */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Pendapatan Orang Tua *</label>
                          <select
                            name="Pendapatan_Orang_Tua"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary appearance-none"
                            onChange={(e) => setIncome(e.target.value)}
                          >
                             <option value="">Pilih Pendapatan...</option>
                             {INCOME_OPTIONS.map(opt => (
                               <option key={opt} value={opt}>{opt}</option>
                             ))}
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Paket SPP Sekolah *</label>
                          {income ? (
                            <div className="w-full px-4 py-4 rounded-xl border-2 border-primary bg-primary/5 text-navy dark:text-white text-sm font-bold flex items-center justify-between animate-[fadeIn_0.3s_ease]">
                              <div className="flex items-center gap-2">
                                <Banknote className="w-5 h-5 text-primary" />
                                <span>{sppOptions[0]?.label}</span>
                              </div>
                              <div className="px-2 py-0.5 bg-primary text-navy text-[8px] rounded-full uppercase tracking-tighter">Otomatis</div>
                            </div>
                          ) : (
                            <div className="w-full px-4 py-4 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-navy-dark text-slate-400 text-sm italic flex items-center gap-2">
                              <Info className="w-4 h-4" />
                              Tentukan pendapatan dahulu...
                            </div>
                          )}
                          <input type="hidden" name="Kesiapan_SPP" value={sppOptions[0]?.label || ""} required />
                        </div>

                        {income === "Kurang dari Rp. 1.100.000" && (
                          <div className="md:col-span-2 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl border border-yellow-200 dark:border-yellow-700/50 space-y-2">
                            <label className="block text-xs font-bold text-amber-800 dark:text-amber-400 mb-1">Upload SKTM (Surat Keterangan Tidak Mampu) *</label>
                            <input
                              type="file"
                              required
                              className="block w-full text-[10px] text-slate-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-navy hover:file:bg-white transition-all"
                              onChange={(e) => handleFileChange(e, setFileSKM)}
                            />
                          </div>
                        )}

                        {/* PAKET MAKAN & FASILITAS (MUKIM ONLY) */}
                        {isMondok && (
                          <>
                            <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10">
                              <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Paket Makan Pesantren</label>
                                <span className="text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase">Wajib Mukim</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-white dark:bg-navy-dark rounded-xl border border-slate-100 dark:border-white/10 shadow-sm">
                                <p className="text-xs font-bold text-navy dark:text-white">Fasilitas VIP</p>
                                <p className="text-sm font-black text-primary">Rp 575.000 / Bln</p>
                              </div>
                              <input type="hidden" name="Fasilitas_Makan" value="VIP - Rp. 575.000/Bulan" />
                            </div>

                            <div className="space-y-1.5 flex flex-col justify-end">
                              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Pilihan Iuran Fasilitas *</label>
                              <select
                                name="Pilihan_Fasilitas"
                                required={isMondok}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary appearance-none"
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (val.includes("75.000")) { setFasilitasVal(75000); setIsFasilitasMonthly(true); }
                                  else if (val.includes("2.400.000")) { setFasilitasVal(2400000); setIsFasilitasMonthly(false); }
                                  else if (val.includes("800.000")) { setFasilitasVal(800000); setIsFasilitasMonthly(false); }
                                  else if (val.includes("400.000")) { setFasilitasVal(400000); setIsFasilitasMonthly(false); }
                                  else { setFasilitasVal(0); setIsFasilitasMonthly(false); }
                                }}
                              >
                                <option value="">Pilih Skema Fasilitas...</option>
                                {FASILITAS_OPTIONS.map(opt => (
                                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                              </select>
                            </div>
                          </>
                        )}
                      </div>

                      {/* --- RINGKASAN BIAYA --- */}
                      <div className="mt-4 p-5 rounded-3xl bg-navy dark:bg-primary/5 border border-slate-200 dark:border-primary/20 shadow-xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                          <Receipt className="w-16 h-16 text-white dark:text-primary" />
                        </div>
                        <h4 className="flex items-center gap-2 text-white dark:text-primary font-black uppercase tracking-widest text-[10px] mb-4">
                          <BarChart3 className="w-4 h-4" />
                          Estimasi Biaya Pendaftaran
                        </h4>
                        <div className="space-y-4 relative z-10">
                          <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                            <div>
                              <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Total Bayar Pertama</p>
                              <p className="text-[10px] text-slate-500 italic leading-tight">(Pendaftaran + SPP & Makan Bln-1)</p>
                            </div>
                            <p className="text-2xl font-black text-primary">{formatIDR(totalPendaftaran)}</p>
                          </div>
                          <div className="flex justify-between items-center px-4">
                            <div>
                              <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Iuran Bulanan Berikutnya</p>
                              <p className="text-[10px] text-slate-500 italic leading-tight">(SPP + Makan + Iuran Fasilitas)</p>
                            </div>
                            <p className="text-lg font-bold text-white dark:text-primary-dark">{formatIDR(totalBulananNext)}</p>
                          </div>
                        </div>
                        <p className="mt-5 pt-4 border-t border-white/10 text-[9px] text-slate-500 text-center uppercase tracking-wider">
                          * Nominal di atas adalah estimasi awal sistem
                        </p>
                      </div>

                      {/* UPLOAD BUKTI */}
                      <div className="pt-6">
                        <div className="flex items-center gap-2 mb-4 text-navy dark:text-white">
                          <Receipt className="w-5 h-5" />
                          <label className="text-sm font-bold uppercase tracking-tight">Upload Bukti Pembayaran Awal *</label>
                        </div>
                        <div className="bg-slate-50 dark:bg-white/5 p-5 md:p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-5">
                            <div>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-1 uppercase font-bold tracking-widest">Rekening Tujuan (Bank BJB)</p>
                              <p className="text-xl md:text-2xl font-black text-navy dark:text-primary tracking-tight">0158-8824-1810-0</p>
                              <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mt-1">PANITIA PSB NURUL HUDA MALATI GARUT</p>
                            </div>
                            <div className="bg-white dark:bg-navy-dark p-3 rounded-xl shadow-inner border border-slate-100 dark:border-white/5 flex items-center gap-3">
                              <AlertTriangle className="w-5 h-5 text-amber-500" />
                              <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Gunakan <span className="font-bold underline">Nama Santri</span> pada berita transfer</p>
                            </div>
                          </div>
                          <input
                            type="file"
                            accept="image/*, application/pdf"
                            required={isMondok}
                            onChange={(e) => handleFileChange(e, setFileBukti)}
                            className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-navy file:text-white dark:file:bg-primary dark:file:text-navy hover:file:opacity-90 transition-all cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3 text-sm">
                    <AlertCircle className="w-5 h-5" />
                    {errorMessage}
                  </div>
                )}

                <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row justify-end gap-3 md:gap-4 pb-12">
                  <button type="button" onClick={onClose} className="w-full md:w-auto px-8 py-3.5 rounded-xl border border-slate-300 dark:border-white/20 text-slate-700 dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-sm">
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full md:w-auto px-10 py-3.5 rounded-xl bg-primary text-navy font-black hover:bg-white hover:text-primary border-2 border-primary transition-all shadow-lg hover:shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-sm"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <span className="animate-spin h-5 w-5 border-2 border-navy/30 border-t-navy rounded-full"></span>
                        <span>Memproses...</span>
                      </>
                    ) : (
                      <>
                        <span>Kirim Pendaftaran</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
