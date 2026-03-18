import React from 'react';
import { ImagePlus, Upload, Image, Trash2 } from 'lucide-react';
import { GalleryItem } from './types';

interface GalleryManagerProps {
  galleryItems: GalleryItem[];
  newGalleryItem: { title: string; category: string; image_url: string; is_featured: boolean };
  setNewGalleryItem: React.Dispatch<React.SetStateAction<{ title: string; category: string; image_url: string; is_featured: boolean }>>;
  handleFileUpload: (file: File, path: string) => Promise<string | null>;
  handleAddGalleryItem: (e: React.FormEvent) => void;
  handleDeleteGalleryItem: (id: string) => void;
  isUploading: boolean;
  galleryLoading: boolean;
}

const GalleryManager: React.FC<GalleryManagerProps> = ({
  galleryItems,
  newGalleryItem,
  setNewGalleryItem,
  handleFileUpload,
  handleAddGalleryItem,
  handleDeleteGalleryItem,
  isUploading,
  galleryLoading
}) => {
  return (
    <div className="max-w-7xl mx-auto no-print">
      {/* ADD FORM */}
      <div className="bg-white dark:bg-navy p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 mb-8">
        <h2 className="text-xl font-bold text-navy dark:text-white mb-4 flex items-center gap-2">
          <ImagePlus className="w-6 h-6" />
          Tambah Foto Baru
        </h2>
        <form onSubmit={handleAddGalleryItem} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div className="lg:col-span-2">
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Judul Foto</label>
            <input
              type="text"
              value={newGalleryItem.title}
              onChange={e => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/10 text-navy dark:text-white"
              placeholder="Contoh: Lomba Futsal 2024"
            />
          </div>
          <div className="lg:col-span-1">
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Kategori</label>
            <select
              value={newGalleryItem.category}
              onChange={e => setNewGalleryItem({ ...newGalleryItem, category: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/10 text-navy dark:text-white"
            >
              {['Semua', 'Banner Depan', 'Pramuka', 'Seni & Budaya', 'Pembelajaran', 'Olahraga', 'Acara Khusus', 'Klub', 'Bela Diri'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="lg:col-span-2">
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Pilih Gambar</label>
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = await handleFileUpload(file, 'gallery');
                    if (url) setNewGalleryItem({ ...newGalleryItem, image_url: url });
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-full px-3 py-2 rounded-lg border-2 border-dashed border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/10 flex items-center gap-2 text-slate-500 group-hover:border-primary transition-colors">
                <Upload className="w-5 h-5" />
                <span className="text-sm truncate">
                  {newGalleryItem.image_url ? 'Gambar Terpilih ✓' : 'Klik / Drop File'}
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-full flex items-center gap-4 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={newGalleryItem.is_featured}
                onChange={e => setNewGalleryItem({ ...newGalleryItem, is_featured: e.target.checked })}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm font-bold text-navy dark:text-white">Tampil di Grid Utama?</span>
            </label>
            <button
              type="submit"
              disabled={isUploading}
              className={`ml-auto px-6 py-2 bg-primary text-navy font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-md flex items-center gap-2 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isUploading && <span className="animate-spin h-4 w-4 border-2 border-navy border-t-transparent rounded-full"></span>}
              {isUploading ? 'Mengunggah...' : '+ Tambah'}
            </button>
          </div>
        </form>
      </div>

      {/* GALLERY LIST */}
      <h3 className="text-lg font-bold text-navy dark:text-white mb-4">Daftar Foto ({galleryItems.length})</h3>
      {galleryLoading ? (
        <div className="text-center py-12 text-slate-500">Memuat data gallery...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {galleryItems.map(item => (
            <div key={item.id} className="bg-white dark:bg-navy rounded-xl shadow-sm border border-slate-200 dark:border-white/10 overflow-hidden group hover:shadow-md transition-all">
              <div className="aspect-video bg-slate-100 relative overflow-hidden">
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                {item.is_featured && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-navy text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                    FEATURED
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-navy dark:text-white truncate" title={item.title}>{item.title}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">{item.category}</span>
                  <button
                    onClick={() => handleDeleteGalleryItem(item.id)}
                    className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
