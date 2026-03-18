import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Profile } from './types';

interface UserManagerProps {
  profiles: Profile[];
  profilesLoading: boolean;
  handleChangeRole: (id: string, role: string) => void;
}

const UserManager: React.FC<UserManagerProps> = ({ profiles, profilesLoading, handleChangeRole }) => {
  return (
    <div className="max-w-7xl mx-auto no-print">
      <div className="bg-white dark:bg-navy p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 mb-8">
        <h2 className="text-xl font-bold text-navy dark:text-white mb-6 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-primary" />
          Manajemen Hak Akses Staff
          <span className="ml-auto text-xs font-normal text-slate-400">Total: {profiles.length} Staff</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profilesLoading ? (
            <div className="col-span-full py-20 text-center text-slate-400">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Memuat data profiles...</p>
            </div>
          ) : (
            profiles.map((profile) => (
              <div key={profile.id} className="p-6 rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 relative group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black uppercase">
                    {profile.full_name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <h3 className="font-bold text-navy dark:text-white line-clamp-1">{profile.full_name || 'Admin PPNH'}</h3>
                    <p className="text-xs text-slate-500 lowercase truncate max-w-[150px]">{profile.email || 'tanpa email'}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">{profile.role?.replace('_', ' ')}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Jabatan / Role</label>
                  <select
                    value={profile.role}
                    onChange={(e) => handleChangeRole(profile.id, e.target.value)}
                    className="w-full p-3 bg-white dark:bg-navy-dark border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold outline-none ring-primary/20 focus:ring-4 transition-all"
                  >
                    <option value="content_admin">Admin Konten</option>
                    <option value="psb_admin">Admin PSB</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>

                {profile.role === 'super_admin' && (
                  <div className="absolute top-4 right-4">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManager;
