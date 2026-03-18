import React from 'react';
import { Trash2 } from 'lucide-react';
import { VideoItem } from './types';

interface VideoManagerProps {
  videoItems: VideoItem[];
  newVideoItem: { title: string; duration: string; thumbnail_url: string; embed_url: string; display_order: number };
  setNewVideoItem: React.Dispatch<React.SetStateAction<{ title: string; duration: string; thumbnail_url: string; embed_url: string; display_order: number }>>;
  getYoutubeThumbnail: (url: string) => string | null;
  handleAddVideoItem: (e: React.FormEvent) => void;
  handleDeleteVideoItem: (id: string) => void;
}

const VideoManager: React.FC<VideoManagerProps> = ({
  videoItems,
  newVideoItem,
  setNewVideoItem,
  getYoutubeThumbnail,
  handleAddVideoItem,
  handleDeleteVideoItem
}) => {
  return (
    <div className="max-w-7xl mx-auto no-print">
      <div className="bg-white dark:bg-navy p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 mb-8">
        <h2 className="text-xl font-bold text-navy dark:text-white mb-4">Tambah Video</h2>
        <form onSubmit={handleAddVideoItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Judul Video" className="p-2 border rounded bg-white dark:bg-navy-dark border-slate-200 dark:border-white/10" value={newVideoItem.title} onChange={e => setNewVideoItem({ ...newVideoItem, title: e.target.value })} required />
          <div className="grid grid-cols-2 gap-2">
            <input type="text" placeholder="Durasi (e.g. 5:30)" className="p-2 border rounded bg-white dark:bg-navy-dark border-slate-200 dark:border-white/10" value={newVideoItem.duration} onChange={e => setNewVideoItem({ ...newVideoItem, duration: e.target.value })} />
            <input type="number" placeholder="Urutan (1, 2, ...)" className="p-2 border rounded bg-white dark:bg-navy-dark border-slate-200 dark:border-white/10" value={newVideoItem.display_order} onChange={e => setNewVideoItem({ ...newVideoItem, display_order: parseInt(e.target.value) || 0 })} />
          </div>
          <input
            type="text"
            placeholder="URL Embed YouTube (e.g. https://www.youtube.com/embed/xxx)"
            className="p-2 border rounded md:col-span-2 bg-white dark:bg-navy-dark border-slate-200 dark:border-white/10"
            value={newVideoItem.embed_url}
            onChange={e => {
              const url = e.target.value;
              const thumb = getYoutubeThumbnail(url);
              setNewVideoItem({ ...newVideoItem, embed_url: url, thumbnail_url: thumb || newVideoItem.thumbnail_url });
            }}
            required
          />
          <div className="md:col-span-2">
            <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">URL Thumbnail (Opsional - Otomatis dari YouTube)</label>
            <input type="text" placeholder="URL Thumbnail" className="w-full p-2 border rounded bg-white dark:bg-navy-dark border-slate-200 dark:border-white/10 text-xs text-navy dark:text-white" value={newVideoItem.thumbnail_url} onChange={e => setNewVideoItem({ ...newVideoItem, thumbnail_url: e.target.value })} />
          </div>
          <button type="submit" className="md:col-span-2 py-2 bg-primary text-navy font-bold rounded">Simpan Video</button>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {videoItems.map(video => (
          <div key={video.id} className="bg-white dark:bg-navy rounded-xl shadow p-4 relative group">
            <div className="relative aspect-video mb-2">
              <img src={video.thumbnail_url} className="w-full h-full object-cover rounded" />
              <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded font-bold backdrop-blur-sm">
                Urutan: {video.display_order}
              </div>
            </div>
            <h3 className="font-bold text-navy dark:text-white line-clamp-1">{video.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{video.duration}</p>
            <button onClick={() => handleDeleteVideoItem(video.id)} className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-lg backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoManager;
