import React, { useState, useEffect } from "react";
import { PlayCircle, ShieldCheck, Globe } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface HeroProps {
  onRegisterClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onRegisterClick }) => {
  const [slideImages, setSlideImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      const { data } = await supabase
        .from('gallery')
        .select('image_url')
        .eq('category', 'Banner Depan')
        .order('created_at', { ascending: false });

      if (data && data.length > 0) {
        setSlideImages(data.map(item => item.image_url));
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (slideImages.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideImages.length);
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, [slideImages.length, isPaused]);

  const defaultImage = "https://res.cloudinary.com/dhovq374h/image/upload/v1765022707/model_cjzttz.png";
  const displayImage = slideImages.length > 0 ? slideImages[currentIndex] : defaultImage;

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center px-4 py-24 sm:px-6 lg:px-8 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(10, 25, 47, 0.9) 0%, rgba(19, 164, 174, 0.2) 100%), url('https://res.cloudinary.com/dhovq374h/image/upload/v1765022669/bg_sfc4sd.jpg')`,
      }}
    >
      {/* Glow background */}
      <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-300/10 blur-[100px]"></div>

      <div className="container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 pt-16">

        {/* LEFT TEXT */}
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left animate-[fadeIn_1s_ease]">
          <div className="flex flex-col gap-4 sm:gap-6 w-full pr-1 sm:pr-0">
            <h1 className="text-white text-[28px] sm:text-4xl lg:text-5xl font-black leading-[1.15] tracking-tight drop-shadow-xl">
              Penerimaan Santri Baru 2026/2027 <br />SMP Plus & SMK&nbsp;Plus
            </h1>

            <div className="flex flex-col gap-1.5 sm:gap-2">
              <h2 className="text-yellow-300 text-[17px] sm:text-2xl font-extrabold tracking-wider drop-shadow-md uppercase">
                Pondok Pesantren Nurul Huda Malati&nbsp;Garut
              </h2>

              <div className="flex flex-col text-[13px] sm:text-[15px] lg:text-base text-white/95 mt-1 max-w-[98%] sm:max-w-xl">

                <p className="font-bold text-white text-[14px] sm:text-lg drop-shadow-md leading-tight mb-0.5 sm:mb-1">
                  Tempat Lahirnya Pemimpin Masa&nbsp;Depan.
                </p>
                <p className="italic text-white/80 drop-shadow-sm leading-tight mb-2 sm:mb-3 pr-2 sm:pr-0">
                  Integrasi Salaf-Modern, Disiplin Tinggi, dan Akses Global ke Jepang dan Dunia&nbsp;Industri.
                </p>

                <p className="font-bold text-yellow-400 text-[14px] sm:text-lg drop-shadow-md leading-tight mb-2 sm:mb-3 pr-2 sm:pr-0">
                  Investasi Terbaik Bukan Sekedar Pendidikan, Tapi Masa Depan Anak&nbsp;Anda.
                </p>

                <p className="font-bold text-white drop-shadow-md leading-tight mb-0.5 sm:mb-1 pr-2 sm:pr-0">
                  Daftarkan Putra Anda di Pesantren Yang Mempersiapkan Masa Depan&nbsp;Nyata.
                </p>
                <p className="italic text-white/80 drop-shadow-sm leading-tight mb-2 sm:mb-3 pr-2 sm:pr-0">
                  Bukan Hanya Ilmu Agama, Tapi Disiplin, Karakter, dan Peluang&nbsp;Global.
                </p>

                <p className="font-bold text-white drop-shadow-md leading-tight mb-0.5 sm:mb-1 pr-2 sm:pr-0">
                  Bukan Banyaknya Santri Yang Kami Kejar, Tapi Besarnya Dampak Yang Mereka&nbsp;Bawa.
                </p>
                <p className="italic text-yellow-300 font-semibold drop-shadow-md leading-tight">
                  Dari Pesantren, Untuk&nbsp;Dunia.
                </p>

              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex w-full flex-col flex-wrap items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <button
              onClick={onRegisterClick}
              className="flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-lg h-12 px-5 bg-primary text-navy font-bold tracking-[0.015em] sm:w-auto shadow-lg transition-transform hover:scale-105"
            >
              Daftar Sekarang
            </button>

            <a
              href="https://youtu.be/B1xSsSDzqI4?si=a715t1jkQFgygTb_"
              target="_blank"
              rel="noreferrer"
              className="flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center gap-2 rounded-lg h-12 px-5 bg-white/10 text-white font-bold border border-white/20 backdrop-blur-sm sm:w-auto transition-transform hover:scale-105 hover:bg-white/20"
            >
              <PlayCircle className="w-5 h-5" />
              <span>Video Profil Pondok</span>
            </a>
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-5 h-5 text-gold" />
              <span>Standar ISO 9001:2015</span>
            </div>
            <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
            <div className="flex items-center gap-1">
              <Globe className="w-5 h-5 text-gold" />
              <span>Koneksi LPK Jepang</span>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE (Floating + Tilt Hover) */}
        <div className="relative flex w-full justify-center lg:justify-end h-full mt-4 lg:mt-0">
          <div
            className="w-full max-w-[320px] sm:max-w-sm md:max-w-md lg:max-w-lg aspect-[4/5] sm:aspect-square lg:aspect-[4/3] xl:aspect-[3/2] rounded-2xl p-2 sm:p-3 bg-white/5 backdrop-blur-md shadow-2xl border border-white/10 transition-transform hover:scale-[1.02] hover:rotate-1 overflow-hidden relative group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >

            {/* Pause overlay icon visually hints the user */}
            <div className={`absolute top-4 right-4 z-20 bg-black/50 backdrop-blur text-white text-xs px-2 py-1 rounded transition-opacity duration-300 ${isPaused && slideImages.length > 1 ? 'opacity-100' : 'opacity-0'}`}>
              Ditahan
            </div>
            {/* If there are multiple images, we map over them to create a fading slider. Otherwise just show one. */}
            {slideImages.length > 1 ? (
              slideImages.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-2 sm:inset-3 rounded-xl bg-center bg-no-repeat bg-contain shadow-inner transition-all duration-1000 ease-in-out ${idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                    }`}
                  style={{
                    backgroundImage: `url('${imgUrl}')`,
                    animation: idx === currentIndex ? "float 6s ease-in-out infinite" : "none",
                  }}
                />
              ))
            ) : (
              <div
                className="absolute inset-2 sm:inset-3 rounded-xl bg-center bg-no-repeat bg-contain shadow-inner transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('${displayImage}')`,
                  animation: "float 6s ease-in-out infinite",
                }}
              ></div>
            )}

            {/* Optional dot indicators if we have slides */}
            {slideImages.length > 1 && (
              <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center gap-1.5 sm:gap-2 z-10">
                {slideImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 shadow-sm ${idx === currentIndex ? 'bg-primary w-6 sm:w-8' : 'bg-white/50 hover:bg-white/80 w-2'
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
