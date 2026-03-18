
import React, { useState, useRef, useEffect } from "react";
import { ZoomIn, ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { supabase } from "../lib/supabaseClient";

interface GalleryItem {
  id?: string;
  title: string;
  category: string;
  img: string; // mapped from image_url
  is_featured?: boolean;
}

const Gallery: React.FC = () => {
  const categories = [
    "Semua",
    "Pramuka",
    "Seni & Budaya",
    "Pembelajaran",
    "Olahraga",
    "Acara Khusus",
    "Klub",
    "Bela Diri"
  ];

  // FALLBACK DATA
  const initialGridItems: GalleryItem[] = [
    { title: "Pencak Silat", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022540/silat_k7zfg5.png", category: "Bela Diri" },
    { title: "Hadroh", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022539/hadroh_lr5ywb.png", category: "Seni & Budaya" },
    { title: "Marching Band", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022658/marching_d67jjp.jpg", category: "Seni & Budaya" },
    { title: "Badminton", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022601/badminton_wzdwjy.jpg", category: "Olahraga" },
    { title: "Volly Ball", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022651/volli_ymgdi9.jpg", category: "Olahraga" },
    { title: "Futsal", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022583/futsal_kpfpqr.jpg", category: "Olahraga" },
    { title: "Pramuka", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022706/pramuka_psiqtq.jpg", category: "Klub" },
    { title: "Arabic Song", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022655/musikalisasi_fiv3l9.jpg", category: "Seni & Budaya" },
    { title: "Catur", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022565/catur_jafswj.jpg", category: "Klub" },
    { title: "Kesenian", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022666/seni_trkn8o.jpg", category: "Seni & Budaya" },
    { title: "Lari Pagi", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022569/lari_cfet9f.jpg", category: "Olahraga" },
    { title: "PASKARDA", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022708/paskarda_tag1k5.jpg", category: "Bela Diri" },
  ];

  const initialExtraImages: Record<string, string[]> = {
    "Pramuka": [
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029907/DSC_0419_wd2cad.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029900/DSC_0356_lglmed.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029889/DSC_0360_kwodlv.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029877/DSC_0349_q98ng5.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029836/DSC_0209_wfn6hq.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029835/DSC_0091_er9cgv.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029828/DSC_09082_yx3dnv.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029831/DSC_0079_hgl9bv.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029873/DSC_0344_zv21ub.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029872/DSC_0176_yqyywx.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029913/DSC_0055_pz10vc.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029909/DSC_0411_cgwj2l.jpg",
    ],
    "Pembelajaran": [
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029864/DSC_0564_uhuix6.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029841/DSC_0641_siuek8.jpg",
    ],
    "Olahraga": [
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029837/NHD_0932_gfua7h.jpg",
    ],
    "Acara Khusus": [
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029812/Pentas_Seni_Milad_6_u7bw2v.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765022691/reuni_byqotm.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765022538/pergarus_r6ulmh.jpg"],
  };

  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Data State
  const [gridItems, setGridItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH DATA FROM SUPABASE
  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Error fetching gallery:", error);
        } else if (data && data.length > 0) {
          const fetchedItems: GalleryItem[] = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            category: item.category,
            img: item.image_url,
            is_featured: item.is_featured
          }));
          setGridItems(fetchedItems);
        }
      } catch (err) {
        console.error("Connection error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Normalize all items for the viewer
  const getAllActiveItems = () => {
    // If no data from Supabase yet, use fallback logic
    if (gridItems.length === 0) {
      const fallbackGrid = activeCategory === "Semua" 
        ? initialGridItems 
        : initialGridItems.filter(i => i.category === activeCategory);
      
      let fallbackExtra: GalleryItem[] = [];
      if (activeCategory === "Semua") {
        Object.keys(initialExtraImages).forEach(cat => {
          initialExtraImages[cat].forEach(imgUrl => {
            fallbackExtra.push({ title: "Kegiatan " + cat, category: cat, img: imgUrl });
          });
        });
      } else {
        (initialExtraImages[activeCategory] || []).forEach(imgUrl => {
          fallbackExtra.push({ title: "Kegiatan " + activeCategory, category: activeCategory, img: imgUrl });
        });
      }
      return [...fallbackGrid, ...fallbackExtra];
    }

    // Use consistent database items
    return activeCategory === "Semua"
      ? gridItems
      : gridItems.filter(i => i.category === activeCategory);
  };

  const activeItems = getAllActiveItems();

  const openImage = (item: GalleryItem) => {
    const idx = activeItems.findIndex(i => i.img === item.img);
    setCurrentIndex(idx !== -1 ? idx : 0);
    setSelectedItem(item);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % activeItems.length;
      setSelectedItem(activeItems[next]);
      return next;
    });
  };

  const prevImage = () => {
    setCurrentIndex((prev) => {
      const next = (prev - 1 + activeItems.length) % activeItems.length;
      setSelectedItem(activeItems[next]);
      return next;
    });
  };

  // SWIPE HANDLING
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: any) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: any) => {
    touchEndX.current = e.changedTouches[0].clientX;
    if (touchStartX.current - touchEndX.current > 80) nextImage();
    if (touchEndX.current - touchStartX.current > 80) prevImage();
  };

  return (
    <section id="gallery" className="py-16 bg-[#F8F9FA] dark:bg-navy-dark transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-20">

        {/* TITLE */}
        <Reveal>
          <div className="flex justify-between items-center mb-10">
            <div>
              <span className="px-4 py-1.5 bg-gold/10 text-gold text-xs font-black rounded-full uppercase tracking-[0.2em] mb-4 inline-block">Momen Berharga</span>
              <h2 className="text-4xl md:text-5xl font-black text-navy dark:text-white leading-tight">
                Galeri <span className="text-gold">Kegiatan Pesantren</span>
              </h2>
            </div>
          </div>
        </Reveal>

        {/* FILTER KATEGORI */}
        <div className="relative mb-12">
          <div className="flex overflow-x-auto no-scrollbar gap-3 pb-4 scroll-smooth snap-x">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-2xl text-xs md:text-sm font-black transition-all whitespace-nowrap flex-shrink-0 snap-start border-2 ${activeCategory === cat
                  ? "bg-gold text-navy border-gold shadow-xl shadow-gold/20 scale-105"
                  : "bg-white dark:bg-white/5 text-slate-500 dark:text-white/40 border-slate-100 dark:border-white/10 hover:border-gold/30 hover:text-navy dark:hover:text-white"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gold"></div>
            <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-xs">Menyelaraskan Visual...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {activeItems.map((item, idx) => (
                <Reveal key={idx} delay={idx * 50}>
                  <div
                    onClick={() => openImage(item)}
                    className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] cursor-pointer bg-slate-200 dark:bg-navy-darker"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url("${item.img}")` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>

                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-[10px] font-black text-gold uppercase tracking-widest mb-1 block">
                        {item.category}
                      </span>
                      <h4 className="text-white font-bold leading-tight line-clamp-2">{item.title}</h4>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {activeItems.length === 0 && (
              <div className="text-center py-24 bg-white dark:bg-white/5 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-white/5">
                <ImageIcon className="w-12 h-12 text-slate-200 dark:text-white/10 mb-4 mx-auto" />
                <p className="text-slate-400 font-medium">Belum ada dokumentasi untuk kategori ini.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* POPUP VIEW IMPROVED */}
      {selectedItem && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center animate-fadeIn overflow-hidden">
          {/* Enhanced Backdrop */}
          <div
            className="fixed inset-0 bg-navy/98 backdrop-blur-3xl"
            onClick={() => setSelectedItem(null)}
          ></div>

          {/* Viewer Container */}
          <div
            className="relative w-full h-full flex flex-col items-center justify-between p-4 md:p-10 z-10 animate-scaleIn pointer-events-none"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Header Info */}
            <div className="w-full flex justify-between items-start z-20 pointer-events-none max-w-7xl mx-auto">
              <div className="bg-white/10 backdrop-blur-2xl p-4 md:p-5 rounded-[2rem] border border-white/20 pointer-events-auto flex items-center gap-5 shadow-2xl">
                <div className="hidden sm:flex w-12 h-12 rounded-full border-2 border-gold items-center justify-center text-gold bg-gold/5 shrink-0">
                  <ZoomIn className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="w-2 h-2 bg-gold rounded-full"></span>
                    <span className="text-[10px] text-gold font-black uppercase tracking-[0.2em]">{selectedItem.category}</span>
                  </div>
                  <h3 className="text-white font-black text-lg md:text-2xl uppercase tracking-tighter leading-none">{selectedItem.title}</h3>
                  <p className="text-white/40 text-[10px] mt-1.5 font-bold tracking-widest uppercase">Gambar {currentIndex + 1} / {activeItems.length}</p>
                </div>
              </div>

              <div className="flex gap-4 pointer-events-auto">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-[1.5rem] bg-white text-navy shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
                >
                  <X className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-90 transition-transform" />
                </button>
              </div>
            </div>

            {/* Main Image Area */}
            <div className="flex-1 w-full flex items-center justify-center relative group pointer-events-auto py-4">
              <button
                onClick={prevImage}
                className="absolute left-2 md:left-4 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-gold text-white hover:text-navy border border-white/20 flex items-center justify-center transition-all z-20"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 md:right-4 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-gold text-white hover:text-navy border border-white/20 flex items-center justify-center transition-all z-20"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              {/* Main Image */}
              <div className="relative w-full h-full flex items-center justify-center p-2">
                <img
                  key={selectedItem.img}
                  src={selectedItem.img}
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl transition-all duration-500 select-none border border-white/10"
                  alt={selectedItem.title}
                />
              </div>
            </div>

            {/* Thumbnail Strip Overlay */}
            <div className="w-full max-w-4xl pb-4 pointer-events-auto">
              <div className="flex gap-2 md:gap-3 overflow-x-auto no-scrollbar justify-center py-2 mask-fade">
                {activeItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setSelectedItem(item);
                    }}
                    className={`relative flex-shrink-0 w-12 h-16 md:w-20 md:h-24 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${currentIndex === idx ? "scale-110 border-gold shadow-lg z-10" : "opacity-40 grayscale hover:grayscale-0 hover:opacity-100 border-transparent"}`}
                  >
                    <img src={item.img} className="w-full h-full object-cover" alt="thumbnail" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM ANIMATIONS */}
      <style>{`
        .mask-fade {
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </section>
  );
};

export default Gallery;
