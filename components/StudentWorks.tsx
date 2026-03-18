import React, { useEffect, useState } from 'react';
import { User, ArrowRight, X, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { supabase } from '../lib/supabaseClient';

interface StudentWork {
  id: string;
  title: string;
  student_name: string;
  category: string;
  description: string;
  content?: string;
  image_url: string;
  images?: string[];
  created_at: string;
}

export const DUMMY_WORKS: StudentWork[] = [
  {
    id: '1',
    title: 'Juara 1 MSQ Tingkat Kabupaten',
    student_name: 'Tim MSQ Putra',
    category: 'Prestasi',
    description: 'Keberhasilan santri dalam Musabaqah Syarhil Quran tingkat Kabupaten Garut tahun 2025 dengan membawakan tema moderasi beragama.',
    content: `Alhamdulillah, Tim MSQ Pondok Pesantren Nurul Huda Malati berhasil meraih juara 1 dalam ajang Musabaqah Syarhil Quran (MSQ) tingkat Kabupaten Garut.

Tim yang terdiri dari 3 santri berbakat ini membawakan tema "Moderasi Beragama dalam Bingkai NKRI". Penampilan mereka memukau dewan hakim dengan perpaduan tilawah yang merdu, terjemahan yang puitis, dan syarahan yang tajam.

Kemenangan ini diharapkan menjadi motivasi bagi santri-santri lain untuk terus menggali potensi diri dan menyebarkan pesan damai Al-Quran di era milenial.`,
    image_url: 'https://images.unsplash.com/photo-1577891729319-f4871c6ecdfd?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1577891729319-f4871c6ecdfd?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523240715630-349f7636e0d9?q=80&w=2070&auto=format&fit=crop'
    ],
    created_at: '2025-10-15T00:00:00Z'
  },
  {
    id: '2',
    title: 'Puisi: Cahaya di Balik Pesantren',
    student_name: 'Ahmad Fauzi',
    category: 'Karya Tulis',
    description: 'Sebuah buku kumpulan puisi yang mengeksplorasi sisi spiritual dan sosial kehidupan di dalam asrama.',
    content: `Di balik tembok usang yang kokoh,
Ada doa-doa yang terbang subuh.
Menyelinap di antara kantuk yang masih utuh,
Mencari ridho Sang Khalik yang teguh.

Kitab-kitab berserakan di hamparan sajadah,
Menjadi saksi bisu perjuangan yang lelah.
Namun di sinilah, hati tak pernah gundah,
Karena cahaya ilmu, sungguh tak pernah punah.

Wahai pesantren, pelita dalam gulita,
Di sini kami merajut asa dan cinta.
Bukan sekadar aksara yang terbaca,
Tapi tentang akhlak, dalam tiap jeda peristiwa.`,
    image_url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop',
    created_at: '2025-09-20T00:00:00Z'
  },
  {
    id: '3',
    title: 'Kaligrafi Kontemporer "Ar-Rahman"',
    student_name: 'Siti Maryam',
    category: 'Seni',
    description: 'Karya seni rupa yang menggabungkan teknik kanvas modern dengan kaidah khat Tsulust yang presisi.',
    content: `Karya kaligrafi ini mengeksplorasi asma Allah "Ar-Rahman" (Yang Maha Pengasih). 

Siti Maryam menggunakan perpaduan palet warna biru laut dan emas untuk melambangkan kedalaman kasih sayang Allah yang tak bertepi. Media yang digunakan adalah kanvas 100x120cm dengan campuran cat akrilik dan teknik tekstur pasir.

Proses pembuatan memakan waktu 3 minggu, memastikan setiap lekukan khat sesuai dengan kaidah Tsulust konvensional namun tetap memiliki sentuhan modern pada latar belakangnya.`,
    image_url: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=1780&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=1780&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=2070&auto=format&fit=crop'
    ],
    created_at: '2025-11-05T00:00:00Z'
  },
  {
    id: '4',
    title: 'Sistem Absensi Digital Santri',
    student_name: 'Muhammad Rizki',
    category: 'Teknologi',
    description: 'Aplikasi berbasis web untuk memudahkan pendataan kehadiran santri saat kegiatan belajar mengajar.',
    content: `Guna mendigitalisasi pesanten, Muhammad Rizki mengembangkan sistem absensi cerdas menggunakan QR Code.

Sistem ini memudahkan ustadz untuk mendata kehadiran santri secara real-time. Data kehadiran langsung terintegrasi dengan dashboard admin, sehingga memudahkan pelaporan kepada wali santri secara mingguan.

Fitur unggulan:
- Scan QR Code Cepat
- Laporan Otomatis ke WhatsApp
- Monitoring Izin & Sakit
- Dashboard Rekapitulasi`,
    image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    created_at: '2025-08-12T00:00:00Z'
  }
];

const StudentWorks: React.FC = () => {
  const [works, setWorks] = useState<StudentWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Semua');
  const [selectedWork, setSelectedWork] = useState<StudentWork | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const categories = ['Semua', 'Prestasi', 'Seni', 'Karya Tulis', 'Teknologi'];

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const { data, error } = await supabase
          .from('student_works')
          .select('*')
          .order('created_at', { ascending: false });

        if (data && data.length > 0) {
          setWorks(data);
        } else {
          setWorks(DUMMY_WORKS);
        }
      } catch (err) {
        console.error("Error fetching works, using dummy data:", err);
        setWorks(DUMMY_WORKS);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  useEffect(() => {
    if (selectedWork) {
      setActiveImage(selectedWork.image_url);
    } else {
      setActiveImage(null);
    }
  }, [selectedWork]);

  const filteredWorks = filter === 'Semua'
    ? works
    : works.filter(work => work.category === filter);

  const handleShare = async (work: StudentWork) => {
    const shareData = {
      title: work.title,
      text: `Lihat prestasi santri Pondok Pesantren Nurul Huda Malati: ${work.title} oleh ${work.student_name}.`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('Tautan berhasil disalin ke clipboard!');
      } catch (err) {
        alert('Gagal menyalin tautan.');
      }
    }
  };

  return (
    <section id="karya" className="py-16 md:py-24 bg-white dark:bg-navy-dark overflow-hidden">
      {loading ? (
        <div className="py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      ) : works.length === 0 ? null : (
        <div className="container mx-auto px-4 lg:px-20">
          <div className="text-center mb-10 md:mb-16">
            <Reveal>
              <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs md:text-sm font-bold rounded-full uppercase tracking-wider mb-4 inline-block">
                Kebanggaan Kami
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-navy dark:text-white mb-4 md:mb-6">
                Karya & <span className="text-primary">Prestasi Santri</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base md:text-lg px-4 md:px-0">
                Wujud kreativitas dan dedikasi santri Pondok Pesantren Nurul Huda Malati dalam berbagai bidang.
              </p>
            </Reveal>
          </div>

          <div className="flex overflow-x-auto pb-4 mb-8 md:mb-12 no-scrollbar md:justify-center gap-3 px-4 -mx-4 md:mx-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`flex-shrink-0 px-5 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold transition-all ${filter === cat
                  ? 'bg-primary text-navy shadow-lg shadow-primary/20 scale-105'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative group/carousel">
            <div
              id="student-works-carousel"
              className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-8"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {filteredWorks.map((work, index) => (
                <div
                  key={work.id}
                  className="min-w-[280px] sm:min-w-[350px] md:min-w-[400px] w-full max-w-[450px] scroll-snap-align-start"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <Reveal delay={index * 0.1}>
                    <div
                      className="group relative bg-slate-50 dark:bg-navy-darker rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-slate-100 dark:border-white/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full flex flex-col"
                      onClick={() => setSelectedWork(work)}
                    >
                      <div className="relative h-56 md:h-64 overflow-hidden">
                        <img
                          src={work.image_url || 'https://images.unsplash.com/photo-1523240715630-349f7636e0d9?q=80&w=2070&auto=format&fit=crop'}
                          alt={work.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 dark:bg-navy/90 backdrop-blur-sm text-primary text-[9px] md:text-[10px] font-black uppercase rounded-lg shadow-lg">
                            {work.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 md:p-8 flex-grow flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                          </div>
                          <span className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 truncate">
                            By: {work.student_name}
                          </span>
                        </div>

                        <h3 className="text-lg md:text-xl font-bold text-navy dark:text-white mb-2 md:mb-3 group-hover:text-primary transition-colors line-clamp-1">
                          {work.title}
                        </h3>

                        <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 line-clamp-2">
                          {work.description}
                        </p>

                        <div className="mt-auto pt-4 md:pt-6 border-t border-slate-200 dark:border-white/5 flex justify-between items-center">
                          <span className="text-[9px] md:text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            {new Date(work.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </span>
                          <button className="text-primary hover:text-primary-dark transition-colors flex items-center gap-1 text-xs md:text-sm font-bold group/link">
                            Detail
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => {
                const el = document.getElementById('student-works-carousel');
                if (el) el.scrollLeft -= 400;
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-navy shadow-xl flex items-center justify-center text-navy dark:text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10 border border-slate-100 dark:border-white/10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('student-works-carousel');
                if (el) el.scrollLeft += 400;
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-navy shadow-xl flex items-center justify-center text-navy dark:text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10 border border-slate-100 dark:border-white/10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {selectedWork && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-fadeIn">
          <div
            className="absolute inset-0 bg-navy/95 backdrop-blur-md"
            onClick={() => setSelectedWork(null)}
          ></div>

          <div className="relative bg-white dark:bg-navy-dark w-full max-w-5xl rounded-[2rem] overflow-hidden shadow-2xl animate-scaleIn flex flex-col max-h-[90vh] overflow-y-auto no-scrollbar">

            <button
              onClick={() => setSelectedWork(null)}
              className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 hover:bg-primary hover:text-navy transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col">
              <div className="relative h-64 md:h-[50vh] overflow-hidden">
                <img
                  src={activeImage || selectedWork.image_url}
                  className="w-full h-full object-cover"
                  alt={selectedWork.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-4 py-1.5 bg-primary text-navy text-[10px] font-black uppercase rounded-lg shadow-lg">
                      {selectedWork.category}
                    </span>
                    <span className="text-xs text-white/70 uppercase tracking-widest font-medium">
                      {new Date(selectedWork.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">
                    {selectedWork.title}
                  </h2>
                </div>
              </div>

              <div className="p-6 md:p-12 flex flex-col lg:flex-row gap-10">
                <div className="lg:w-2/3">
                  <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Kreator Berbakat</p>
                      <p className="text-lg font-bold text-navy dark:text-white uppercase">{selectedWork.student_name}</p>
                    </div>
                  </div>

                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    {selectedWork.content ? (
                      <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed whitespace-pre-wrap font-medium font-serif italic border-l-4 border-primary/30 pl-6 py-2">
                        {selectedWork.content}
                      </p>
                    ) : (
                      <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed">
                        {selectedWork.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="lg:w-1/3 space-y-8">
                  {selectedWork.images && selectedWork.images.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-sm font-black text-navy dark:text-white uppercase tracking-widest flex items-center gap-2">
                        <span className="w-8 h-1 bg-primary rounded-full"></span>
                        Galeri Karya
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedWork.images.map((img, idx) => (
                          <div
                            key={idx}
                            className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${activeImage === img ? 'border-primary ring-4 ring-primary/20' : 'border-transparent hover:border-primary/50'}`}
                            onClick={() => setActiveImage(img)}
                          >
                            <img src={img} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-8 bg-primary/5 rounded-[2rem] border border-primary/10">
                    <h4 className="text-primary font-black uppercase tracking-widest text-xs mb-4">Bagikan Kebanggaan</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">Bagikan prestasi santri kami ke media sosial sebagai bentuk apresiasi.</p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleShare(selectedWork)}
                        className="flex-1 py-3 bg-white dark:bg-navy rounded-xl shadow-sm text-primary flex items-center justify-center gap-2 hover:scale-105 transition-all border border-primary/20 hover:border-primary active:scale-95"
                      >
                        <Share2 className="w-5 h-5" />
                        <span className="font-bold text-xs uppercase">Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StudentWorks;
