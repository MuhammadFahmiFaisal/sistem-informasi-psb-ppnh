import React from 'react';
import { X, ImageOff, ExternalLink, MessageCircle, Paperclip, AlertTriangle, Download } from 'lucide-react';
import { Registrant } from './types';
import { formatIDR, formatDateIndo } from '../../lib/formatters';

interface RegistrantDetailModalProps {
  selectedRegistrant: Registrant;
  showDetailModal: boolean;
  setShowDetailModal: (val: boolean) => void;
  imgError: Record<string, boolean>;
  setImgError: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  getSafeImageUrl: (url: string) => string;
  handlePrint: () => void;
}

const RegistrantDetailModal: React.FC<RegistrantDetailModalProps> = ({
  selectedRegistrant,
  showDetailModal,
  setShowDetailModal,
  imgError,
  setImgError,
  getSafeImageUrl,
  handlePrint
}) => {
  if (!showDetailModal) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto no-print">
      <div className="bg-white dark:bg-navy w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-[scaleIn_0.3s_ease] my-8">

        {/* Modal Header */}
        <div className="p-5 md:p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-start bg-slate-50 dark:bg-black/20 sticky top-0 z-10">
          <div className="flex-1 min-w-0 pr-4">
            <h2 className="text-xl md:text-2xl font-black text-navy dark:text-white leading-tight break-words">
              {selectedRegistrant.Nama_Santri_Baru}
            </h2>
            <p className="text-slate-500 mt-1 font-mono text-xs md:text-sm">NISN: {selectedRegistrant.NISN}</p>
          </div>
          <button onClick={() => { setShowDetailModal(false); }} className="p-2 bg-white dark:bg-white/10 hover:bg-red-50 dark:hover:bg-red-500/20 text-slate-500 hover:text-red-500 rounded-xl transition-all font-bold shrink-0 shadow-sm border border-slate-200 dark:border-white/10">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="p-5 md:p-8 overflow-y-auto max-h-[calc(100vh-160px)] md:max-h-[75vh]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

            {/* Left Column: Photo & Basic */}
            <div className="md:col-span-1 space-y-6">
              {/* Photo Card */}
              <div className="aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative group">
                {!imgError['foto_santri'] && selectedRegistrant.Foto_Santri ? (
                  <img
                    src={getSafeImageUrl(selectedRegistrant.Foto_Santri)}
                    alt="Foto Santri"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      console.warn("Failed to load image:", selectedRegistrant.Foto_Santri);
                      setImgError(prev => ({ ...prev, 'foto_santri': true }))
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 text-center bg-slate-100">
                    <ImageOff className="w-10 h-10 mb-2 text-slate-300" />
                    <p className="text-xs mb-3">Foto tidak dapat ditampilkan.</p>
                    {selectedRegistrant.Foto_Santri && (
                      <a
                        href={selectedRegistrant.Foto_Santri}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold hover:bg-blue-200 transition-colors flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Buka di Drive
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Jenjang Pilihan</p>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-200 inline-block">
                    {selectedRegistrant.Masuk_Ke_Jenjang}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Daftar Pada</p>
                  <p className="font-medium text-navy dark:text-white">
                    {formatDateIndo(selectedRegistrant.Tanggal_Pendaftaran)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                  <p className="text-navy dark:text-white text-sm break-all">{selectedRegistrant.Email || '-'}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="md:col-span-2 space-y-8">

              {/* Personal Info Grid */}
              <div>
                <h3 className="text-primary font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4 border-b border-slate-100 dark:border-white/5 pb-2">Informasi Pribadi</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Tempat, Tgl Lahir</p>
                    <p className="text-navy dark:text-white font-medium text-lg">
                      {selectedRegistrant.Tempat_Lahir}, {formatDateIndo(selectedRegistrant.Tanggal_Lahir, false)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Jenis Kelamin</p>
                    <p className="text-navy dark:text-white font-medium text-lg">{selectedRegistrant.Jenis_Kelamin}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Punya Saudara Kandung?</p>
                    <p className="text-navy dark:text-white font-medium">{selectedRegistrant.Saudara_Kandung || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Status Anak Yatim</p>
                    <p className="text-navy dark:text-white font-medium">{selectedRegistrant.Anak_Yatim || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Ukuran Seragam</p>
                    <span className="inline-block px-3 py-1 bg-slate-100 rounded text-navy font-bold">{selectedRegistrant.Ukuran_Seragam || '-'}</span>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Alamat Lengkap</p>
                    <p className="text-navy dark:text-white font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {selectedRegistrant.Alamat_Lengkap}
                    </p>
                  </div>
                </div>
              </div>

              {/* Family & Academic */}
              <div>
                <h3 className="text-primary font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4 border-b border-slate-100 dark:border-white/5 pb-2">Akademik & Keluarga</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Asal Sekolah</p>
                    <p className="text-navy dark:text-white font-medium">{selectedRegistrant.Asal_Sekolah}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Nama Ayah</p>
                    <p className="text-navy dark:text-white font-medium">{selectedRegistrant.Nama_Ayah}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Nama Ibu</p>
                    <p className="text-navy dark:text-white font-medium">{selectedRegistrant.Nama_Ibu}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">No. WhatsApp</p>
                    <div className="flex items-center gap-2">
                      <span className="text-navy dark:text-white font-medium">{selectedRegistrant.No_HP}</span>
                      <a href={`https://wa.me/${String(selectedRegistrant.No_HP).replace(/^0/, '62').replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-green-600 hover:text-green-700 font-bold">
                        <MessageCircle className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial */}
              <div>
                <h3 className="text-primary font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4 border-b border-slate-100 dark:border-white/5 pb-2">Keuangan & Pembayaran</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Kesanggupan SPP</p>
                    <p className="text-navy font-bold text-lg">{selectedRegistrant.Kesiapan_SPP || '-'}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Nominal Bayar (Verified)</p>
                    <p className="text-navy font-bold text-lg">
                      {selectedRegistrant.Nominal_Bayar ? formatIDR(typeof selectedRegistrant.Nominal_Bayar === 'number' ? selectedRegistrant.Nominal_Bayar : parseInt(String(selectedRegistrant.Nominal_Bayar).replace(/[^0-9]/g, '')) || 0)
                        : (selectedRegistrant.File_Bukti_Bayar ? 'Menunggu Review Admin' : '-')}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Pendapatan Orang Tua</p>
                    <p className="text-navy font-bold text-sm">{selectedRegistrant.Pendapatan_Orang_Tua || '-'}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Pilihan Makan</p>
                    <p className="text-navy font-bold text-sm">{selectedRegistrant.Fasilitas_Makan || '-'}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Infaq Pembangunan</p>
                    <p className="text-navy font-bold text-sm">{selectedRegistrant.Infaq_Pembangunan || '-'}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Uang Pangkal (Mukim)</p>
                    <p className="text-navy font-bold text-sm">{selectedRegistrant.Uang_Pangkal || '-'}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Khutbatul Arsy</p>
                    <p className="text-navy font-bold text-sm">{selectedRegistrant.Khutbatul_Arsy || '-'}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Pilihan Fasilitas</p>
                    <p className="text-navy font-bold text-sm">{selectedRegistrant.Pilihan_Fasilitas || '-'}</p>
                  </div>
                  <div className="md:col-span-2 grid grid-cols-2 gap-4 mt-2">
                    <div className="bg-primary/10 p-5 rounded-2xl border-2 border-primary/20 shadow-sm">
                      <p className="text-[10px] text-primary dark:text-navy uppercase font-black tracking-widest mb-1">Estimasi Total Awal (System)</p>
                      <p className="text-navy dark:text-white font-black text-2xl tracking-tighter">{selectedRegistrant.Total_Bayar_Pertama || '-'}</p>
                      <p className="text-[10px] text-slate-500 mt-1 italic">*Berdasarkan pilihan skema di form</p>
                    </div>
                    <div className="bg-blue-500/10 p-5 rounded-2xl border-2 border-blue-500/20 shadow-sm">
                      <p className="text-[10px] text-blue-600 uppercase font-black tracking-widest mb-1">Total Iuran Bulanan (System)</p>
                      <p className="text-navy dark:text-white font-black text-2xl tracking-tighter">{selectedRegistrant.Iuran_Bulanan || '-'}</p>
                      <p className="text-[10px] text-slate-500 mt-1 italic">*SPP + Makan + Fasilitas Bulanan</p>
                    </div>
                  </div>
                </div>

                {/* File SKM */}
                {selectedRegistrant.File_SKM && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase">Surat Keterangan Tidak Mampu (SKM)</p>
                      <p className="text-xs text-slate-400">Terlampir</p>
                    </div>
                    <a href={selectedRegistrant.File_SKM} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
                      <Paperclip className="w-4 h-4" />
                      Lihat File
                    </a>
                  </div>
                )}

                <div className="mt-6">
                  <p className="text-xs text-slate-500 uppercase font-bold mb-2">Bukti Transfer / Pembayaran</p>
                  <div className="border border-slate-200 rounded-xl p-2 bg-slate-50">
                    {!imgError['bukti_bayar'] && selectedRegistrant.File_Bukti_Bayar ? (
                      <div className="relative group">
                        <img
                          src={getSafeImageUrl(selectedRegistrant.File_Bukti_Bayar)}
                          alt="Bukti Bayar"
                          className="w-full h-auto max-h-64 object-contain rounded-lg"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            console.warn("Failed to load proof:", selectedRegistrant.File_Bukti_Bayar);
                            setImgError(prev => ({ ...prev, 'bukti_bayar': true }))
                          }}
                        />
                        <a href={selectedRegistrant.File_Bukti_Bayar} target="_blank" rel="noreferrer" className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                          <span className="text-white font-bold flex items-center gap-2">
                            <ExternalLink className="w-5 h-5" />
                            Buka Gambar Asli
                          </span>
                        </a>
                      </div>
                    ) : (
                      selectedRegistrant.File_Bukti_Bayar ? (
                        <div className="p-4 text-center bg-slate-50 border border-slate-100 rounded-lg flex flex-col items-center">
                          <p className="text-sm font-bold text-slate-600 mb-2">Preview tidak tersedia</p>
                          <a href={selectedRegistrant.File_Bukti_Bayar} target="_blank" rel="noreferrer" className="px-4 py-2 bg-primary text-navy font-bold rounded-lg text-sm flex items-center gap-2 hover:bg-primary-dark font-bold">
                            <ExternalLink className="w-4 h-4" />
                            Buka Bukti Bayar (Drive)
                          </a>
                        </div>
                      ) : (
                        <div className="p-8 text-center bg-red-50 border border-red-100 rounded-lg text-red-500 flex flex-col items-center">
                          <AlertTriangle className="w-10 h-10 mb-2" />
                          <p className="font-bold">Belum ada bukti pembayaran yang diupload.</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="p-5 md:p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20 flex flex-col sm:flex-row justify-end gap-3 sticky bottom-0 z-10">
          <button
            onClick={() => setShowDetailModal(false)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/5 transition-colors text-sm"
          >
            Tutup
          </button>
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-primary text-navy font-bold hover:bg-primary-dark shadow-lg flex items-center justify-center gap-2 text-sm"
          >
            <Download className="w-5 h-5" />
            Unduh PDF
          </button>
        </div>

      </div>
    </div>
  );
};

export default RegistrantDetailModal;
