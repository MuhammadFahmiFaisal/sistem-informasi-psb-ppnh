import React from 'react';
import { Castle, Edit2, Trash2 } from 'lucide-react';
import { FacilityItem } from './types';

interface FacilityManagerProps {
  facilityItems: FacilityItem[];
  newFacilityItem: { title: string; description: string; image_url: string; icon_name: string; display_order: number };
  setNewFacilityItem: React.Dispatch<React.SetStateAction<{ title: string; description: string; image_url: string; icon_name: string; display_order: number }>>;
  editingFacility: FacilityItem | null;
  setEditingFacility: (item: FacilityItem | null) => void;
  handleFileUpload: (file: File, path: string) => Promise<string | null>;
  handleAddFacilityItem: (e: React.FormEvent) => void;
  handleUpdateFacilityItem: (e: React.FormEvent) => void;
  handleDeleteFacilityItem: (id: string) => void;
  handleEditFacility: (item: FacilityItem) => void;
  isUploading: boolean;
}

const FacilityManager: React.FC<FacilityManagerProps> = ({
  facilityItems,
  newFacilityItem,
  setNewFacilityItem,
  editingFacility,
  setEditingFacility,
  handleFileUpload,
  handleAddFacilityItem,
  handleUpdateFacilityItem,
  handleDeleteFacilityItem,
  handleEditFacility,
  isUploading
}) => {
  return (
    <div className="max-w-7xl mx-auto no-print">
      <div className="bg-white dark:bg-navy p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-navy dark:text-white">{editingFacility ? 'Edit Fasilitas' : 'Tambah Fasilitas'}</h2>
          {editingFacility && (
            <button
              onClick={() => {
                setEditingFacility(null);
                setNewFacilityItem({ title: '', description: '', image_url: '', icon_name: 'Building2', display_order: 0 });
              }}
              className="text-sm text-red-500 hover:underline"
            >
              Batal Edit
            </button>
          )}
        </div>
        <form onSubmit={editingFacility ? handleUpdateFacilityItem : handleAddFacilityItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Nama Fasilitas" className="p-2 border rounded bg-white dark:bg-navy-dark border-slate-200 dark:border-white/10 text-navy dark:text-white" value={newFacilityItem.title} onChange={e => setNewFacilityItem({ ...newFacilityItem, title: e.target.value })} required />

          <div className="relative group">
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = await handleFileUpload(file, 'facilities');
                  if (url) setNewFacilityItem({ ...newFacilityItem, image_url: url });
                }
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="w-full px-3 py-2 rounded-lg border-2 border-dashed border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/10 flex items-center gap-2 text-slate-500 group-hover:border-primary transition-colors">
              <Castle className="w-5 h-5" />
              <span className="text-sm truncate">
                {newFacilityItem.image_url ? 'Gambar Terpilih ✓' : 'Upload Foto Fasilitas'}
              </span>
            </div>
          </div>

          <input type="number" placeholder="Urutan Tampilan" className="p-2 border rounded bg-white dark:bg-navy-dark border-slate-200 dark:border-white/10 text-navy dark:text-white" value={newFacilityItem.display_order} onChange={e => setNewFacilityItem({ ...newFacilityItem, display_order: parseInt(e.target.value) || 0 })} />
          <textarea placeholder="Deskripsi Singkat Fasilitas" className="p-2 border rounded md:col-span-2 bg-white dark:bg-navy-dark border-slate-200 dark:border-white/10 text-navy dark:text-white" rows={2} value={newFacilityItem.description} onChange={e => setNewFacilityItem({ ...newFacilityItem, description: e.target.value })} />
          <button
            type="submit"
            disabled={isUploading}
            className={`md:col-span-2 py-3 bg-primary text-navy font-bold rounded hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isUploading && <span className="animate-spin h-5 w-5 border-2 border-navy border-t-transparent rounded-full"></span>}
            {isUploading ? 'Memproses Fasilitas...' : (editingFacility ? 'Update Fasilitas' : 'Simpan Fasilitas')}
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {facilityItems.map(facility => (
          <div key={facility.id} className="bg-white dark:bg-navy rounded-xl shadow p-4 relative group border border-slate-200 dark:border-white/10">
            <img src={facility.image_url} className="w-full h-40 object-cover rounded mb-3" alt={facility.title} />
            <h3 className="font-bold text-navy dark:text-white line-clamp-1">{facility.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">{facility.description}</p>
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEditFacility(facility)}
                className="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-lg"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteFacilityItem(facility.id)}
                className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 shadow-lg"
                title="Hapus"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilityManager;
