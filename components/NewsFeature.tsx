import React, { useEffect, useState, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, TrendingUp } from 'lucide-react';
import { Reveal } from './Reveal';
import { supabase } from '../lib/supabaseClient';

interface NewsItem {
  id: string;
  source_name: string;
  badge_text: string;
  title: string;
  quote: string;
  content: string;
  image_url: string;
  link_url: string;
}

const NewsFeature: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const fetchNews = useCallback(async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (data) setNewsList(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Auto-play logic with restart
  useEffect(() => {
    let interval: any;
    if (isAutoPlay && newsList.length > 1) {
      interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % newsList.length);
      }, 6000);
    }

    // Auto-restart autoplay after 15s of inactivity
    const restartTimeout = setTimeout(() => {
      if (!isAutoPlay) setIsAutoPlay(true);
    }, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(restartTimeout);
    };
  }, [isAutoPlay, newsList.length]);

  const handleNext = () => {
    setIsAutoPlay(false);
    setActiveIndex((current) => (current + 1) % newsList.length);
  };

  const handlePrev = () => {
    setIsAutoPlay(false);
    setActiveIndex((current) => (current - 1 + newsList.length) % newsList.length);
  };

  if (loading) return (
    <div className="h-[500px] flex items-center justify-center bg-slate-50 dark:bg-navy-dark">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-10 w-48 bg-slate-200 dark:bg-white/10 rounded-full mb-4"></div>
        <div className="h-4 w-64 bg-slate-200 dark:bg-white/10 rounded-full"></div>
      </div>
    </div>
  );

  if (newsList.length === 0) return null;

  const currentNews = newsList[activeIndex];

  return (
    <section id="news" className="relative py-8 md:py-16 lg:py-12 bg-slate-50 dark:bg-navy-darker overflow-hidden">
      {/* --- PREMIUM LIGHT EFFECTS (BACKGROUND) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Main Background Blur (Dynamic) */}
        <div
          className="absolute inset-x-0 top-0 h-full bg-center bg-cover blur-[100px] transition-all duration-[1500ms] ease-in-out scale-110 opacity-10 dark:opacity-20"
          style={{ backgroundImage: `url(${currentNews.image_url})` }}
        />

        {/* Animated Light Flares */}
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[35%] h-[35%] bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>

        {/* Floating Bokeh Lights */}
        <div className="absolute top-[20%] right-[10%] w-4 h-4 bg-primary/40 rounded-full blur-sm animate-bounce delay-300"></div>
        <div className="absolute bottom-[30%] left-[15%] w-3 h-3 bg-white/20 rounded-full blur-sm animate-bounce delay-700"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16 min-h-0 md:min-h-[420px] lg:min-h-[380px]">

          {/* Content Section */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1 lg:max-w-2xl" key={`content-${activeIndex}`}>
            <Reveal className="animate-[fadeIn_0.5s_ease-out]">
              <div className="flex items-center gap-3 mb-3 lg:mb-4">
                <span className="flex h-1.5 w-1.5 rounded-full bg-red-600 animate-ping"></span>
                <span className="px-2.5 py-0.5 bg-red-600/10 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-[0.15em] rounded-full">
                  {currentNews.source_name}
                </span>
                <span className="text-slate-400 dark:text-white/30 text-[9px] font-bold uppercase tracking-widest hidden sm:inline">
                  {currentNews.badge_text}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-navy dark:text-white leading-[1.2] md:leading-[1.1] mb-4 lg:mb-6 tracking-tight">
                {currentNews.title}
              </h2>

              {currentNews.quote && (
                <div className="relative mb-4 lg:mb-6 pl-4 border-l-4 border-primary">
                  <span className="absolute -top-3 -left-1 text-4xl text-primary/20 font-serif leading-none italic select-none">“</span>
                  <p className="text-base md:text-lg italic text-slate-600 dark:text-slate-300 leading-snug md:leading-relaxed font-medium line-clamp-2 lg:line-clamp-3">
                    {currentNews.quote}
                  </p>
                </div>
              )}

              <p className="text-slate-500 dark:text-white/60 mb-6 lg:mb-8 leading-relaxed max-w-xl text-sm md:text-base lg:text-lg line-clamp-3 lg:line-clamp-4">
                {currentNews.content}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6">
                <a
                  href={currentNews.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 px-6 py-3.5 md:px-8 md:py-4 bg-navy dark:bg-primary text-white dark:text-navy font-black rounded-xl md:rounded-2xl hover:translate-y-[-4px] transition-all shadow-lg hover:shadow-primary/20 overflow-hidden text-sm md:text-base border border-transparent dark:border-white/10"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
                  {/* Glowing Effect on Hover */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-white/30 to-primary/0 skew-x-[-20deg] animate-[shimmer_2s_infinite] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <span className="relative z-10">Baca Lengkap</span>
                  <ArrowRight className="relative z-10 w-5 h-5 font-bold" />
                </a>

                {/* Navigation Controls */}
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-navy dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all shadow-sm group/btn"
                  >
                    <ChevronLeft className="w-6 h-6 group-hover/btn:-translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-navy dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all shadow-sm group/btn"
                  >
                    <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Slider Progress Dots */}
              <div className="flex gap-2 mt-8 md:mt-12 items-center">
                {newsList.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setIsAutoPlay(false); setActiveIndex(idx); }}
                    className={`relative overflow-hidden transition-all duration-500 rounded-full h-1.5 ${idx === activeIndex
                      ? 'w-10 bg-slate-200 dark:bg-white/10 shadow-[0_0_10px_rgba(242,185,13,0.3)]'
                      : 'w-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400'
                      }`}
                  >
                    {idx === activeIndex && isAutoPlay && (
                      <div
                        className="absolute inset-0 bg-primary origin-left animate-[shimmer_6s_linear_infinite]"
                        style={{ animationFillMode: 'both' }}
                      ></div>
                    )}
                    {idx === activeIndex && !isAutoPlay && (
                      <div className="absolute inset-0 bg-primary"></div>
                    )}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Visual Section */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <Reveal className="relative group p-4">
              {/* --- MODERN BORDER BEAM EFFECT --- */}
              <div className="absolute inset-0 rounded-[2.5rem] p-[2px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,#f2b90d_360deg)] animate-[spin_3s_linear_infinite]"></div>
              </div>

              {/* Main Image Container */}
              <div className="relative aspect-[16/9] md:aspect-[4/3] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl dark:shadow-none border-4 md:border-[6px] border-white dark:border-white/10 bg-white/5 backdrop-blur-sm p-0.5">
                <div className="relative w-full h-full rounded-[0.9rem] md:rounded-[1.6rem] overflow-hidden" key={`image-${activeIndex}`}>
                  <img
                    src={currentNews.image_url}
                    alt={currentNews.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[2000ms] ease-out animate-[fadeIn_0.8s_ease-out]"
                  />

                  {/* Moving Light Overlay (Shimmer) */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] animate-[shimmer_5s_infinite] pointer-events-none"></div>

                  {/* Floating Content Mask (Glassmorphism) - Hidden on Mobile */}
                  <div className="absolute bottom-6 left-6 right-6 p-6 glassmorphism rounded-2xl border border-white/20 hidden lg:block animate-[scaleIn_0.6s_ease-out]">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                      <span className="text-white text-xs font-bold tracking-widest uppercase">Berita Terverifikasi</span>
                    </div>
                    <p className="text-white/80 text-sm italic font-medium line-clamp-2">Konfirmasi keaslian berita dari sumber resmi {currentNews.source_name}.</p>
                  </div>
                </div>
              </div>

              {/* Action Badge */}
              <div className="absolute top-0 -left-2 md:-top-2 md:-left-6 bg-white dark:bg-navy-dark p-2 md:p-3 rounded-xl md:rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 hidden sm:block animate-bounce z-20">
                <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                <p className="text-[8px] md:text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase mt-0.5 tracking-tighter">Trending</p>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewsFeature;
