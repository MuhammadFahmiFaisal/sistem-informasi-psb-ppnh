import React from 'react';
import { Search, Info, CheckCircle2, Clock, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Registrant } from './types';
import { formatIDR, extractNominal } from '../../lib/formatters';

interface RegistrantsTableProps {
  filteredRegistrants: Registrant[];
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  filterCategory: string;
  setFilterCategory: (val: string) => void;
  isDataLoading: boolean;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  setSelectedRegistrant: (reg: Registrant) => void;
  setImgError: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  setShowDetailModal: (val: boolean) => void;
}

const RegistrantsTable: React.FC<RegistrantsTableProps> = ({
  filteredRegistrants,
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  isDataLoading,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setSelectedRegistrant,
  setImgError,
  setShowDetailModal
}) => {
  return (
    <div className="max-w-7xl mx-auto bg-white dark:bg-navy rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 overflow-hidden no-print">
      {/* Search Bar & Filters */}
      <div className="p-6 border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-navy dark:text-white leading-tight">Daftar Pendaftar Masuk</h2>
            <div className="flex items-center gap-1.5 text-[10px] text-blue-600 bg-blue-50 dark:bg-white/5 px-2 py-1 rounded-md border border-blue-100 dark:border-white/10 w-fit">
              <Info className="w-3 h-3" />
              <span>Tips: Nominal bisa diisi manual lewat kolom <code className="font-bold">Nominal_Bayar</code> di Spreadsheet</span>
            </div>
          </div>
          {/* SEARCH */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama, sekolah, nisn..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-white/20 bg-white dark:bg-navy-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex flex-wrap gap-2">
          {['Semua', 'SMP', 'SMK', 'Mukim', 'Ansor'].map((cat) => (
            <button
              key={cat}
              onClick={() => { setFilterCategory(cat); setCurrentPage(1); }}
              className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-all ${filterCategory === cat
                ? 'bg-navy text-white border-navy dark:bg-primary dark:text-navy dark:border-primary'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-white/5 dark:text-slate-300 dark:border-white/10 dark:hover:bg-white/10'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {isDataLoading ? (
        <div className="p-20 flex flex-col items-center justify-center text-slate-400">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
          <p>Mengambil data terbaru...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {/* Desktop Table */}
          <table className="w-full text-left hidden md:table">
            <thead className="bg-slate-50 dark:bg-black/20 text-slate-500 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="p-4 w-16 text-center">#</th>
                <th className="p-4">Nama Lengkap</th>
                <th className="p-4">Asal Sekolah</th>
                <th className="p-4">Jenjang</th>
                <th className="p-4 text-center">Nominal</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm">
              {filteredRegistrants.length > 0 ? (
                filteredRegistrants
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((reg, idx) => {
                    const globalIdx = (currentPage - 1) * itemsPerPage + idx + 1;
                    return (
                      <tr key={idx} className="hover:bg-blue-50/50 dark:hover:bg-white/5 transition-colors cursor-pointer" onClick={() => {
                        setSelectedRegistrant(reg);
                        setImgError({});
                        setShowDetailModal(true);
                      }}>
                        <td className="p-4 text-center text-slate-400 font-mono">{globalIdx}</td>
                        <td className="p-4">
                          <div className="font-bold text-navy dark:text-white">{reg.Nama_Santri_Baru}</div>
                          <div className="text-xs text-slate-500">{reg.NISN}</div>
                        </td>
                        <td className="p-4 text-slate-600 dark:text-slate-300">{reg.Asal_Sekolah}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold border whitespace-nowrap ${String(reg.Masuk_Ke_Jenjang).toLowerCase().includes('mukim')
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : 'bg-orange-50 text-orange-700 border-orange-200'
                            }`}>
                            {reg.Masuk_Ke_Jenjang}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <div className="text-xs font-bold text-navy dark:text-white">
                            {reg.File_Bukti_Bayar ? (
                              reg.Nominal_Bayar ? formatIDR(typeof reg.Nominal_Bayar === 'number' ? reg.Nominal_Bayar : parseInt(String(reg.Nominal_Bayar).replace(/[^0-9]/g, '')) || 0)
                                : formatIDR(extractNominal(reg.Pilihan_Fasilitas))
                            ) : '-'}
                          </div>
                          {reg.Nominal_Bayar && (
                            <div className="text-[9px] text-green-600 font-bold uppercase mt-0.5">Manual Verified</div>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {reg.File_Bukti_Bayar ? (
                            <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-[10px] font-bold border border-green-200">
                              <CheckCircle2 className="w-3 h-3" />
                              Bayar
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-red-500 bg-red-50 px-2 py-1 rounded-full text-[10px] font-bold border border-red-200">
                              <Clock className="w-3 h-3" />
                              Belum
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          <button className="p-2 bg-white dark:bg-navy-dark border border-slate-200 dark:border-white/10 rounded-lg hover:bg-primary hover:text-navy hover:border-primary transition-colors shadow-sm">
                            <Eye className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-500">
                    Tidak ada data yang cocok dengan filter yang dipilih.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Mobile Card View */}
          <div className="md:hidden flex flex-col divide-y divide-slate-100 dark:divide-white/5">
            {filteredRegistrants.length > 0 ? (
              filteredRegistrants
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((reg, idx) => (
                  <div 
                    key={idx} 
                    className="p-5 active:bg-slate-50 dark:active:bg-white/5 transition-colors"
                    onClick={() => {
                      setSelectedRegistrant(reg);
                      setImgError({});
                      setShowDetailModal(true);
                    }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nama Santri</div>
                        <h4 className="text-base font-bold text-navy dark:text-white leading-tight">{reg.Nama_Santri_Baru}</h4>
                        <p className="text-[10px] text-slate-500">{reg.NISN}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-[9px] font-bold border ${String(reg.Masuk_Ke_Jenjang).toLowerCase().includes('mukim')
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : 'bg-orange-50 text-orange-700 border-orange-200'
                      }`}>
                        {reg.Masuk_Ke_Jenjang}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 text-left">Sekolah Asal</div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-bold truncate">{reg.Asal_Sekolah}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Pembayaran</div>
                        {reg.File_Bukti_Bayar ? (
                          <div className="flex flex-col items-end">
                             <span className="inline-flex items-center gap-1 text-green-600 font-bold text-xs">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              TERBAYAR
                            </span>
                            <span className="text-[10px] text-navy dark:text-white font-black mt-0.5">
                               {reg.Nominal_Bayar ? formatIDR(typeof reg.Nominal_Bayar === 'number' ? reg.Nominal_Bayar : parseInt(String(reg.Nominal_Bayar).replace(/[^0-9]/g, '')) || 0)
                                : formatIDR(extractNominal(reg.Pilihan_Fasilitas))}
                            </span>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-500 font-bold text-[10px]">
                            <Clock className="w-3.5 h-3.5" />
                            BELUM LUNAS
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="p-10 text-center text-slate-500 text-sm">
                Data tidak ditemukan.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {!isDataLoading && filteredRegistrants.length > itemsPerPage && (
        <div className="p-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
          <p className="text-xs text-slate-500 font-medium">
            Menampilkan <span className="font-bold text-navy dark:text-white">{(currentPage - 1) * itemsPerPage + 1}</span> - <span className="font-bold text-navy dark:text-white">{Math.min(currentPage * itemsPerPage, filteredRegistrants.length)}</span> dari <span className="font-bold text-navy dark:text-white">{filteredRegistrants.length}</span> santri
          </p>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1 ${currentPage === 1
                ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                : 'border-slate-200 text-slate-600 hover:bg-white dark:border-white/10 dark:text-white dark:hover:bg-white/10'
                }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Sebelumnya
            </button>
            <button
              disabled={currentPage === Math.ceil(filteredRegistrants.length / itemsPerPage)}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredRegistrants.length / itemsPerPage)))}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1 ${currentPage === Math.ceil(filteredRegistrants.length / itemsPerPage)
                ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                : 'border-slate-200 text-slate-600 hover:bg-white dark:border-white/10 dark:text-white dark:hover:bg-white/10'
                }`}
            >
              Selanjutnya
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrantsTable;
