import React, { useEffect, useState } from 'react';
import { Play, PlayCircle } from 'lucide-react';
import { Reveal } from './Reveal';
import { supabase } from '../lib/supabaseClient';

interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail_url: string;
  embed_url: string;
}

const VideoGallery: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('display_order', { ascending: true });

      if (data && data.length > 0) {
        setVideos(data);
        setActiveVideo(data[0]);
      }
      setLoading(false);
    };
    fetchVideos();
  }, []);

  const handleVideoChange = (video: Video) => {
    setActiveVideo(video);
    setIsPlaying(false);
  };

  if (loading) return null;
  if (videos.length === 0) return null;

  return (
    <section id="videos" className="py-20 bg-slate-50 dark:bg-navy transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        <Reveal>
          <div className="flex flex-col items-center text-center pb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy dark:text-white">Galeri Video</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-2xl text-lg">
              Saksikan kegiatan dan kehidupan santri di Pondok Pesantren Nurul Huda Malati melalui lensa kamera.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Player */}
          <div className="lg:w-2/3">
            <Reveal className="h-full">
              {activeVideo && (
                <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10">
                  {isPlaying ? (
                    <iframe
                      src={`${activeVideo.embed_url}${activeVideo.embed_url.includes('?') ? '&' : '?'}autoplay=1`}
                      title={activeVideo.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="relative w-full h-full cursor-pointer group" onClick={() => setIsPlaying(true)}>
                      <img src={activeVideo.thumbnail_url} alt={activeVideo.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-10 h-10 text-white fill-current" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-white text-xl font-bold line-clamp-2">{activeVideo.title}</h3>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Reveal>
          </div>

          {/* Playlist */}
          <div className="lg:w-1/3 flex flex-col gap-4">
            <Reveal delay={200}>
              <h3 className="text-navy dark:text-white text-xl font-bold mb-2">Video Terbaru</h3>
              <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => handleVideoChange(video)}
                    className={`flex gap-3 p-3 rounded-lg cursor-pointer transition-colors ${activeVideo?.id === video.id ? 'bg-white dark:bg-white/10 shadow-md border border-slate-100 dark:border-transparent' : 'hover:bg-white/50 dark:hover:bg-white/5 border border-transparent'}`}
                  >
                    <div className="relative w-32 aspect-video rounded-md overflow-hidden flex-shrink-0 bg-black">
                      <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                        {video.duration}
                      </div>
                      {activeVideo?.id === video.id && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <PlayCircle className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className={`text-sm font-bold line-clamp-2 ${activeVideo?.id === video.id ? 'text-action-blue dark:text-primary' : 'text-navy dark:text-white'}`}>
                        {video.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Nurul Huda Malati
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
