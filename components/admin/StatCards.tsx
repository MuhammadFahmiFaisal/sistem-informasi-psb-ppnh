import React from 'react';
import { Users, User, Bed, Wallet, Award } from 'lucide-react';
import { formatIDR } from '../../lib/formatters';

interface StatCardsProps {
  stats: {
    total: number;
    laki: number;
    perempuan: number;
    mukim: number;
    ansor: number;
    totalDana: number;
  };
}

const StatCards: React.FC<StatCardsProps> = ({ stats }) => {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6 mb-8 no-print px-1">
      {/* Total */}
      <div className="bg-white dark:bg-navy p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:shadow-md transition-all">
        <div className="relative z-10">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-4xl font-bold text-navy dark:text-white mb-1">{stats.total}</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Pendaftar</p>
        </div>
        <Users className="absolute -right-4 -bottom-4 w-[120px] h-[120px] text-slate-100 dark:text-white/5 z-0" />
      </div>

      {/* Laki-laki */}
      <div className="bg-white dark:bg-navy p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:shadow-md transition-all">
        <div className="relative z-10">
          <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform">
            <User className="w-6 h-6" />
          </div>
          <h3 className="text-4xl font-bold text-navy dark:text-white mb-1">{stats.laki}</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Laki-Laki</p>
          <p className="text-[10px] text-teal-600 font-bold mt-1">{stats.total > 0 ? Math.round((stats.laki / stats.total) * 100) : 0}%</p>
        </div>
        <User className="absolute -right-4 -bottom-4 w-[120px] h-[120px] text-slate-100 dark:text-white/5 z-0" />
      </div>

      {/* Perempuan */}
      <div className="bg-white dark:bg-navy p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:shadow-md transition-all">
        <div className="relative z-10">
          <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform">
            <User className="w-6 h-6" />
          </div>
          <h3 className="text-4xl font-bold text-navy dark:text-white mb-1">{stats.perempuan}</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Perempuan</p>
          <p className="text-[10px] text-pink-600 font-bold mt-1">{stats.total > 0 ? Math.round((stats.perempuan / stats.total) * 100) : 0}%</p>
        </div>
        <User className="absolute -right-4 -bottom-4 w-[120px] h-[120px] text-slate-100 dark:text-white/5 z-0" />
      </div>

      {/* Santri Mukim */}
      <div className="bg-white dark:bg-navy p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:shadow-md transition-all">
        <div className="relative z-10">
          <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform">
            <Bed className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-bold text-navy dark:text-white mb-1">{stats.mukim}</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Santri Mukim</p>
          <p className="text-[10px] text-purple-600 font-bold mt-1">Target Asrama</p>
        </div>
        <Bed className="absolute -right-4 -bottom-4 w-[120px] h-[120px] text-slate-100 dark:text-white/5 z-0" />
      </div>

      {/* Santri Ansor */}
      <div className="bg-white dark:bg-navy p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:shadow-md transition-all">
        <div className="relative z-10">
          <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-bold text-navy dark:text-white mb-1">{stats.ansor}</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Santri Ansor</p>
          <p className="text-[10px] text-indigo-600 font-bold mt-1">Jalur Khusus</p>
        </div>
        <Award className="absolute -right-4 -bottom-4 w-[120px] h-[120px] text-slate-100 dark:text-white/5 z-0" />
      </div>

      {/* Total Dana (New) */}
      <div className="bg-white dark:bg-navy p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:shadow-md transition-all">
        <div className="relative z-10">
          <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform">
            <Wallet className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-navy dark:text-white mb-1 whitespace-nowrap">{formatIDR(stats.totalDana)}</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Dana Masuk</p>
          <p className="text-[10px] text-amber-600 font-bold mt-1">Estimasi Real-time</p>
        </div>
        <Wallet className="absolute -right-4 -bottom-4 w-[120px] h-[120px] text-slate-100 dark:text-white/5 z-0" />
      </div>
    </div>
  );
};

export default StatCards;
