import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { supabase } from '../lib/supabaseClient';

interface FacilityItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  icon_name: string;
  display_order: number;
}

const Facilities: React.FC = () => {
  const [facilities, setFacilities] = useState<FacilityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      const { data, error } = await supabase
        .from('facilities')
        .select('*')
        .order('display_order', { ascending: true });

      if (data) setFacilities(data);
      setLoading(false);
    };
    fetchFacilities();
  }, []);

  // Default items if database is empty
  const defaultItems = [
    { title: "Masjid Jami'", description: "Pusat kegiatan ibadah dan spiritual yang megah dan nyaman.", icon_name: "mosque", image_url: "https://res.cloudinary.com/dhovq374h/image/upload/v1765024510/mesjid_hvmjrp.jpg" },
    { title: "Komplek Pendidikan", description: "Gedung belajar representatif dengan fasilitas teknologi modern.", icon_name: "school", image_url: "https://res.cloudinary.com/dhovq374h/image/upload/v1765024511/komplek_pendidikan_arp2bb.jpg" },
    { title: "Lapangan Olahraga", description: "Fasilitas olahraga lengkap untuk menjaga kebugaran para santri.", icon_name: "sports_basketball", image_url: "https://res.cloudinary.com/dhovq374h/image/upload/v1765024508/lapangan_vh8dt7.jpg" },
    { title: "Asrama Santri", description: "Tempat istirahat yang aman dan nyaman seperti rumah sendiri.", icon_name: "home", image_url: "https://res.cloudinary.com/dhovq374h/image/upload/v1765024502/asrama_l0nzza.jpg" },
  ];

  const displayItems = facilities.length > 0 ? facilities : defaultItems;

  return (
    <section id="facilities" className="py-20 bg-[#f8fafc] dark:bg-navy-dark transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20">
        <Reveal>
          <div className="text-center mb-16 relative">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            <h2 className="text-3xl md:text-5xl font-black text-navy dark:text-white uppercase tracking-tight">
              Fasilitas <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-gold">Unggulan</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
              Dukungan fasilitas yang lengkap dan modern untuk menciptakan ekosistem belajar yang kondusif bagi pertumbuhan santri.
            </p>
          </div>
        </Reveal>

        <div className="relative group/carousel">
          <div
            id="facilities-carousel"
            className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-8"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {displayItems.map((item, idx) => (
              <div
                key={idx}
                className="min-w-[280px] sm:min-w-[320px] md:min-w-[350px] w-full max-w-[400px] scroll-snap-align-start"
                style={{ scrollSnapAlign: 'start' }}
              >
                <Reveal delay={idx * 150} className="h-full">
                  <div className="group bg-white dark:bg-navy rounded-[3rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(242,185,13,0.15)] transition-all duration-500 h-full flex flex-col border border-slate-50 dark:border-white/5">
                    {/* Image Wrap */}
                    <div className="relative h-56 md:h-60 overflow-hidden">
                      <img
                        src={(item as any).image_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-7 md:p-8 flex-grow flex flex-col">
                      <h3 className="text-lg md:text-xl font-black text-navy dark:text-white mb-2 md:mb-3 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 font-medium">
                        {(item as any).description || (item as any).desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => {
              const el = document.getElementById('facilities-carousel');
              if (el) el.scrollLeft -= 350;
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-navy shadow-xl flex items-center justify-center text-navy dark:text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10 border border-slate-100 dark:border-white/10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('facilities-carousel');
              if (el) el.scrollLeft += 350;
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-navy shadow-xl flex items-center justify-center text-navy dark:text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10 border border-slate-100 dark:border-white/10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Facilities;
