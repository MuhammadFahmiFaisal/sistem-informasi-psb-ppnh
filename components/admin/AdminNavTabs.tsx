import React from 'react';
import { Users, Image, Film, Newspaper, Wrench, Sparkles } from 'lucide-react';

interface AdminNavTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: string | null;
}

const AdminNavTabs: React.FC<AdminNavTabsProps> = ({ activeTab, setActiveTab, userRole }) => {
  return (
    <div className="max-w-7xl mx-auto mb-8 flex overflow-x-auto no-scrollbar gap-2 md:grid md:grid-cols-2 lg:grid-cols-6 md:gap-4 no-print pb-2 md:pb-0">
      {(userRole === 'super_admin' || userRole === 'psb_admin') && (
        <button
          onClick={() => setActiveTab('registrants')}
          className={`py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'registrants'
            ? 'bg-white dark:bg-navy text-primary shadow-sm border border-slate-200 dark:border-white/10'
            : 'bg-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
        >
          <Users className="w-5 h-5" />
          Pendaftar
        </button>
      )}

      {(userRole === 'super_admin' || userRole === 'content_admin') && (
        <>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'gallery'
              ? 'bg-white dark:bg-navy text-primary shadow-sm border border-slate-200 dark:border-white/10'
              : 'bg-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
          >
            <Image className="w-5 h-5" />
            Galeri
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'videos'
              ? 'bg-white dark:bg-navy text-primary shadow-sm border border-slate-200 dark:border-white/10'
              : 'bg-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
          >
            <Film className="w-5 h-5" />
            Video
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'news'
              ? 'bg-white dark:bg-navy text-primary shadow-sm border border-slate-200 dark:border-white/10'
              : 'bg-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
          >
            <Newspaper className="w-5 h-5" />
            Berita
          </button>
          <button
            onClick={() => setActiveTab('facilities')}
            className={`py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'facilities'
              ? 'bg-white dark:bg-navy text-primary shadow-sm border border-slate-200 dark:border-white/10'
              : 'bg-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
          >
            <Wrench className="w-5 h-5" />
            Fasilitas
          </button>
          <button
            onClick={() => setActiveTab('student_works')}
            className={`py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'student_works'
              ? 'bg-white dark:bg-navy text-primary shadow-sm border border-slate-200 dark:border-white/10'
              : 'bg-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
          >
            <Sparkles className="w-5 h-5" />
            Karya Santri
          </button>
        </>
      )}


    </div>
  );
};

export default AdminNavTabs;
