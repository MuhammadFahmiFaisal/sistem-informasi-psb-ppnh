import React from 'react';
import { LayoutDashboard, RefreshCw, LogOut } from 'lucide-react';

interface AdminHeaderProps {
  userRole: string | null;
  fetchData: () => void;
  handleLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ userRole, fetchData, handleLogout }) => {
  return (
    <div className="max-w-7xl mx-auto mb-8 bg-white dark:bg-navy p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 no-print">
      <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
        <div className="p-2.5 md:p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl text-yellow-600 dark:text-yellow-400 shrink-0">
          <LayoutDashboard className="w-6 h-6 md:w-8 md:h-8" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl md:text-3xl font-bold text-navy dark:text-white tracking-tight flex flex-wrap items-center gap-2">
            Dashboard
            <span className="px-2 py-0.5 bg-primary/20 text-primary text-[8px] md:text-[10px] font-black uppercase rounded-lg tracking-widest border border-primary/20 truncate">
              {userRole?.replace('_', ' ')}
            </span>
          </h1>
          <p className="text-[10px] md:text-sm text-slate-500 font-medium truncate">Data Realtime System 2026/2027</p>
        </div>
      </div>

      <div className="flex gap-2 md:gap-3 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
        <button onClick={fetchData} className="flex-1 md:flex-none justify-center px-4 md:px-5 py-2 md:py-2.5 rounded-xl bg-blue-50 text-blue-600 font-bold hover:bg-blue-100 transition-colors flex items-center gap-2 border border-blue-200 text-xs md:text-sm whitespace-nowrap">
          <RefreshCw className="w-4 h-4 md:w-5 md:h-5" />
          Refresh
        </button>
        <button onClick={handleLogout} className="flex-1 md:flex-none justify-center px-4 md:px-5 py-2 md:py-2.5 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors flex items-center gap-2 border border-red-200 text-xs md:text-sm whitespace-nowrap">
          <LogOut className="w-4 h-4 md:w-5 md:h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
