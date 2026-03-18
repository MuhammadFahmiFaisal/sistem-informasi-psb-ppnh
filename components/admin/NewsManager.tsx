import React from 'react';
import { Image, Edit2, Trash2 } from 'lucide-react';
import { NewsItem } from './types';

interface NewsManagerProps {
  newsItems: NewsItem[];
  newNewsItem: { source_name: string; badge_text: string; title: string; quote: string; content: string; image_url: string; link_url: string; is_active: boolean };
  setNewNewsItem: React.Dispatch<React.SetStateAction<{ source_name: string; badge_text: string; title: string; quote: string; content: string; image_url: string; link_url: string; is_active: boolean }>>;
  editingNews: NewsItem | null;
  setEditingNews: (item: NewsItem | null) => void;
  handleFileUpload: (file: File, path: string) => Promise<string | null>;
  handleAddNewsItem: (e: React.FormEvent) => void;
  handleUpdateNewsItem: (e: React.FormEvent) => void;
  handleDeleteNewsItem: (id: string) => void;
  handleEditNews: (item: NewsItem) => void;
  isUploading: boolean;
}

const NewsManager: React.FC<NewsManagerProps> = ({
  newsItems,
  newNewsItem,
  setNewNewsItem,
  editingNews,
  setEditingNews,
  handleFileUpload,
  handleAddNewsItem,
  handleUpdateNewsItem,
  handleDeleteNewsItem,
  handleEditNews,
  isUploading
}) => {
  return (
    <div className="max-w-7xl mx-auto no-print">
      <div className="bg-white dark:bg-navy p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-navy dark:text-white">{editingNews ? 'Edit Berita' : 'Tambah Berita'}</h2>
          {editingNews && (
            <button
              onClick={() => {
                setEditingNews(null);
                setNewNewsItem({ source_name: 'Wartain.com', badge_text: 'Liputan Khusus', title: '', quote: '', content: '', image_url: '', link_url: '', is_active: true });
              }}
              className="text-sm text-red-500 hover:underline"
            >
              Batal Edit
            </button>
          )}
        </div>
        <form onSubmit={editingNews ? handleUpdateNewsItem : handleAddNewsItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Judul Berita" className="p-2 border rounded md:col-span-2 bg-white dark:bg-navy-dark border-slate-200 dark:border-white/10 text-navy dark:text-white" value={newNewsItem.title} onChange={e => setNewNewsItem({ ...newNewsItem, title: e.target.value })} required />
          <input type="text" placeholder="Sumber (e.g. Wartain.com)" className="p-2 border rounded bg-white dark:bg-navy-dark border-slate-200 dark:border-white/10 text-navy dark:text-white" value={newNewsItem.source_name} onChange={e => setNewNewsItem({ ...newNewsItem, source_name: e.target.value })} />
          <input type="text" placeholder="Badge (e.g. Liputan Khusus)" className="p-2 border rounded bg-white dark:bg-navy-dark border-slate-200 dark:border-white/10 text-navy dark:text-white" value={newNewsItem.badge_text} onChange={e => setNewNewsItem({ ...newNewsItem, badge_text: e.target.value })} />
          <textarea placeholder="Kutipan (Quote)" className="p-2 border rounded md:col-span-2 bg-white dark:bg-navy-dark border-slate-200 dark:border-white/10 text-navy dark:text-white" value={newNewsItem.quote} onChange={e => setNewNewsItem({ ...newNewsItem, quote: e.target.value })} />
          <textarea placeholder="Isi Berita" className="p-2 border rounded md:col-span-2 bg-white dark:bg-navy-dark border-slate-200 dark:border-white/10 text-navy dark:text-white" rows={4} value={newNewsItem.content} onChange={e => setNewNewsItem({ ...newNewsItem, content: e.target.value })} required />

          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Pilih Gambar Berita</label>
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = await handleFileUpload(file, 'news');
                    if (url) setNewNewsItem({ ...newNewsItem, image_url: url });
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-full px-3 py-2 rounded-lg border-2 border-dashed border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/10 flex items-center gap-2 text-slate-500 group-hover:border-primary transition-colors">
                <Image className="w-5 h-5" />
                <span className="text-sm truncate">
                  {newNewsItem.image_url ? 'Gambar Terpilih ✓' : 'Pilih File Gambar'}
                </span>
              </div>
            </div>
          </div>

          <input type="text" placeholder="Link Berita Asli (URL)" className="p-2 border rounded bg-white dark:bg-navy-dark border-slate-200 dark:border-white/10 h-10 mt-5 text-navy dark:text-white" value={newNewsItem.link_url} onChange={e => setNewNewsItem({ ...newNewsItem, link_url: e.target.value })} required />

          <button
            type="submit"
            disabled={isUploading}
            className={`md:col-span-2 py-3 bg-primary text-navy font-bold rounded hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isUploading && <span className="animate-spin h-5 w-5 border-2 border-navy border-t-transparent rounded-full"></span>}
            {isUploading ? 'Mengunggah Metadata Berita...' : (editingNews ? 'Update Berita' : 'Simpan Berita')}
          </button>
        </form>
      </div>
      <div className="space-y-4">
        {newsItems.map(news => (
          <div key={news.id} className="bg-white dark:bg-navy rounded-xl shadow p-4 flex flex-col md:flex-row gap-4 border border-slate-200 dark:border-white/10 relative group">
            <img src={news.image_url} className="w-full md:w-32 h-32 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-bold text-navy dark:text-white">{news.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-2">{news.content}</p>
              <div className="mt-2 flex gap-2">
                <span className="text-[10px] bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded uppercase font-bold text-slate-500">{news.source_name}</span>
                {!news.is_active && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded uppercase font-bold">Draft</span>}
              </div>
            </div>
            <div className="flex md:flex-col gap-2">
              <button
                onClick={() => handleEditNews(news)}
                className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors border border-blue-100"
                title="Edit Berita"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDeleteNewsItem(news.id)}
                className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors border border-red-100"
                title="Hapus Berita"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsManager;
