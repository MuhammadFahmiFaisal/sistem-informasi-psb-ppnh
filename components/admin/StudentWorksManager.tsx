import React from 'react';
import { Image, Camera, X, Images, Edit2, Trash2 } from 'lucide-react';
import { StudentWork } from './types';

interface StudentWorksManagerProps {
  studentWorks: StudentWork[];
  newStudentWork: { title: string; student_name: string; category: string; description: string; content: string; image_url: string; images: string[] };
  setNewStudentWork: React.Dispatch<React.SetStateAction<{ title: string; student_name: string; category: string; description: string; content: string; image_url: string; images: string[] }>>;
  editingStudentWork: StudentWork | null;
  setEditingStudentWork: (item: StudentWork | null) => void;
  handleFileUpload: (file: File, path: string) => Promise<string | null>;
  handleAddStudentWork: (e: React.FormEvent) => void;
  handleUpdateStudentWorkItem: (e: React.FormEvent) => void;
  handleDeleteStudentWork: (id: string) => void;
  handleEditStudentWork: (item: StudentWork) => void;
  filterCategory: string;
  setFilterCategory: (val: string) => void;
  isUploading: boolean;
}

const StudentWorksManager: React.FC<StudentWorksManagerProps> = ({
  studentWorks,
  newStudentWork,
  setNewStudentWork,
  editingStudentWork,
  setEditingStudentWork,
  handleFileUpload,
  handleAddStudentWork,
  handleUpdateStudentWorkItem,
  handleDeleteStudentWork,
  handleEditStudentWork,
  filterCategory,
  setFilterCategory,
  isUploading
}) => {
  return (
    <div className="max-w-7xl mx-auto no-print">
      {/* Form Tambah Karya */}
      <div className="bg-white dark:bg-navy p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-navy dark:text-white">{editingStudentWork ? 'Edit Karya Santri' : 'Tambah Karya Santri'}</h2>
          {editingStudentWork && (
            <button
              onClick={() => {
                setEditingStudentWork(null);
                setNewStudentWork({ title: '', student_name: '', category: 'Prestasi', description: '', content: '', image_url: '', images: [] });
              }}
              className="text-sm text-red-500 hover:underline"
            >
              Batal Edit
            </button>
          )}
        </div>
        <form onSubmit={editingStudentWork ? handleUpdateStudentWorkItem : handleAddStudentWork} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Judul Karya / Prestasi"
            className="p-2 border rounded bg-white dark:bg-navy-dark border-slate-200 dark:border-white/10 text-navy dark:text-white"
            value={newStudentWork.title}
            onChange={e => setNewStudentWork({ ...newStudentWork, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Nama Santri"
            className="p-2 border rounded bg-white dark:bg-navy-dark border-slate-200 dark:border-white/10 text-navy dark:text-white"
            value={newStudentWork.student_name}
            onChange={e => setNewStudentWork({ ...newStudentWork, student_name: e.target.value })}
            required
          />

          <select
            className="p-2 border rounded bg-white dark:bg-navy-dark border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300"
            value={newStudentWork.category}
            onChange={e => setNewStudentWork({ ...newStudentWork, category: e.target.value })}
          >
            <option value="Prestasi">Prestasi</option>
            <option value="Seni">Seni</option>
            <option value="Karya Tulis">Karya Tulis</option>
            <option value="Teknologi">Teknologi</option>
          </select>

          <div className="relative group">
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = await handleFileUpload(file, 'works');
                  if (url) setNewStudentWork({ ...newStudentWork, image_url: url });
                }
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="w-full px-3 py-2 rounded-lg border-2 border-dashed border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/10 flex items-center gap-2 text-slate-500 group-hover:border-primary transition-colors">
              <Image className="w-5 h-5" />
              <span className="text-sm truncate">
                {newStudentWork.image_url ? 'Gambar Terpilih ✓' : 'Upload Foto Karya'}
              </span>
            </div>
          </div>

          <textarea
            placeholder="Deskripsi Singkat (Muncul di kartu depan)"
            className="p-2 border rounded md:col-span-2 bg-white dark:bg-navy-dark border-slate-200 dark:border-white/10 text-navy dark:text-white"
            rows={2}
            value={newStudentWork.description}
            onChange={e => setNewStudentWork({ ...newStudentWork, description: e.target.value })}
            required
          />

          <textarea
            placeholder="Konten Lengkap / Isi Karya (Teks/Puisi/Cerita)"
            className="p-2 border rounded md:col-span-2 bg-white dark:bg-navy-dark border-slate-200 dark:border-white/10 text-navy dark:text-white"
            rows={6}
            value={newStudentWork.content}
            onChange={e => setNewStudentWork({ ...newStudentWork, content: e.target.value })}
          />

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold text-slate-500 dark:text-slate-400">Galeri Gambar Tambahan (Opsional)</label>
            <div className="flex flex-wrap gap-2">
              {newStudentWork.images.map((img, i) => (
                <div key={i} className="relative group w-20 h-20">
                  <img src={img} className="w-full h-full object-cover rounded-lg" alt="Gallery item" />
                  <button
                    type="button"
                    onClick={() => setNewStudentWork({ ...newStudentWork, images: newStudentWork.images.filter((_, idx) => idx !== i) })}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity font-bold"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <label className="w-20 h-20 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={async (e) => {
                    const files = Array.from(e.target.files || []);
                    for (const fileItem of files) {
                      const file = fileItem as File;
                      const url = await handleFileUpload(file, 'works/gallery');
                      if (url) {
                        setNewStudentWork(prev => ({ ...prev, images: [...prev.images, url] }));
                      }
                    }
                  }}
                  className="hidden"
                />
                <Camera className="w-6 h-6 text-slate-400" />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className={`md:col-span-2 py-3 bg-primary text-navy font-bold rounded hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isUploading && <span className="animate-spin h-5 w-5 border-2 border-navy border-t-transparent rounded-full"></span>}
            {isUploading ? 'Menyimpan...' : (editingStudentWork ? 'Update Karya Santri' : 'Simpan Karya Santri')}
          </button>
        </form>
      </div>

      {/* Filter & List Karya */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-navy dark:text-white">Daftar Karya Santri</h2>
        <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl overflow-x-auto no-scrollbar max-w-full">
          {['Semua', 'Prestasi', 'Seni', 'Karya Tulis', 'Teknologi'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${filterCategory === cat
                ? 'bg-white dark:bg-navy text-primary shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {studentWorks
          .filter(work => filterCategory === 'Semua' || work.category === filterCategory)
          .map(work => (
            <div key={work.id} className="bg-white dark:bg-navy rounded-xl shadow p-4 relative group border border-slate-200 dark:border-white/10">
              <div className="relative h-40 mb-3 overflow-hidden rounded-lg">
                <img src={work.image_url || 'https://images.unsplash.com/photo-1523240715630-349f7636e0d9?q=80&w=2070&auto=format&fit=crop'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={work.title} />
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 bg-primary text-navy text-[9px] font-black uppercase rounded shadow-lg">
                    {work.category}
                  </span>
                </div>
                {work.images && work.images.length > 0 && (
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-[9px] font-bold rounded flex items-center gap-1">
                    <Images className="w-3 h-3" />
                    +{work.images.length}
                  </div>
                )}
              </div>
              <h3 className="font-bold text-navy dark:text-white line-clamp-1">{work.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-2">Oleh: {work.student_name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">{work.description}</p>

              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEditStudentWork(work)}
                  className="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-lg"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteStudentWork(work.id)}
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

export default StudentWorksManager;
