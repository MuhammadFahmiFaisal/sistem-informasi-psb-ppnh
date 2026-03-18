import React from 'react';
import { Calendar, Users, GraduationCap, Building2, Hammer, Home, IdCard, Camera, FileText, Mic, PenTool, CheckCircle2, Clock, HeartHandshake } from 'lucide-react';
import { Reveal } from './Reveal';

const AdmissionsInfo: React.FC = () => {
  return (
    <section id="admissions" className="py-20 bg-white dark:bg-navy-dark transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-20">
        <Reveal>
          <div className="mb-12">
            <h2 className="text-4xl font-black text-navy dark:text-white mb-2">Informasi PSB 2026</h2>
            {/* <p className="text-slate-500 dark:text-slate-400 text-lg">Paling Penting</p> */}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Jadwal & Kuota Column */}
          <div className="flex flex-col gap-8">
            <Reveal className="h-full" delay={200}>
              <div className="bg-white dark:bg-navy p-8 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm h-full">
                <h3 className="text-2xl font-bold text-navy dark:text-white mb-6">Jadwal Pendaftaran</h3>
                <div className="flex flex-col gap-0">
                  {[
                    { title: "Official Enrollment Period", date: "Pendaftaran resmi mulai bulan Syawal", icon: Calendar },
                    { title: "Early Registration", date: "Bisa daftar dari sekarang (sebelum waktu resmi)", icon: Calendar },
                  ].map((item, idx, arr) => (
                    <div key={idx} className="flex gap-4 relative">
                      <div className="flex flex-col items-center">
                        <div className="text-action-blue dark:text-primary bg-blue-50 dark:bg-white/5 p-1 rounded-md mb-2">
                          <item.icon className="w-5 h-5" />
                        </div>
                        {idx !== arr.length - 1 && <div className="w-0.5 bg-slate-200 dark:bg-slate-700 flex-grow my-1"></div>}
                      </div>
                      <div className="pb-8">
                        <p className="text-navy dark:text-white font-bold text-lg">{item.title}</p>
                        <p className="text-slate-500 dark:text-slate-400">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Kuota Penerimaan */}
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
                  <h3 className="text-xl font-bold text-navy dark:text-white mb-6 flex items-center gap-2">
                    <Users className="w-6 h-6 text-action-blue dark:text-primary" />
                    Kuota Penerimaan
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0">
                    {[
                      { label: "SMP Ansor", value: "60 Kuota", icon: GraduationCap },
                      { label: "SMP Mukim", value: "200 Kuota", icon: Building2 },
                      { label: "SMK Ansor", value: "30 Kuota", icon: Hammer },
                      { label: "SMK Mukim", value: "60 Kuota", icon: Home },
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 relative">
                        <div className="flex flex-col items-center">
                          <div className="text-action-blue dark:text-primary bg-blue-50 dark:bg-white/5 p-1 rounded-md mb-2">
                            <item.icon className="w-5 h-5" />
                          </div>
                        </div>
                        <div className="pb-6">
                          <p className="text-navy dark:text-white font-bold text-sm">{item.label}</p>
                          <p className="text-amber-500 dark:text-amber-400 font-bold">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-8">
            {/* Syarat */}
            <Reveal delay={400}>
              <div className="bg-white dark:bg-navy p-8 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm flex-1">
                <h3 className="text-2xl font-bold text-navy dark:text-white mb-6">Syarat Pendaftaran</h3>
                <div className="grid gap-6">
                  {[
                    { title: "Kartu Keluarga & Akta Kelahiran", sub: "Fotokopi", icon: IdCard },
                    { title: "Ijazah Terakhir", sub: "Legalisir", icon: GraduationCap },
                    { title: "Pas Foto", sub: "Ukuran 3x4 (2 lembar)", icon: Camera },
                    { title: "Surat Keterangan Sehat", sub: "Dari dokter atau puskesmas", icon: FileText },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-white/5 text-action-blue dark:text-primary flex items-center justify-center">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-navy dark:text-white">{item.title}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Materi Testing */}
            <Reveal delay={600}>
              <div className="bg-white dark:bg-navy p-8 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm flex-1">
                <h3 className="text-2xl font-bold text-navy dark:text-white mb-4">Materi Testing</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-lg">
                    <h4 className="text-action-blue dark:text-primary font-bold mb-2 flex items-center gap-2">
                      <Mic className="w-4 h-4" />
                      Lisan / Oral
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Tahfizh, Ibadah Praktis, & Wawancara</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-lg">
                    <h4 className="text-action-blue dark:text-primary font-bold mb-2 flex items-center gap-2">
                      <PenTool className="w-4 h-4" />
                      Tulisan / Written
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Pengetahuan Agama & Umum</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Biaya Administrasi Section */}
        <Reveal delay={800}>
          <div className="mt-12 bg-slate-50 dark:bg-navy p-8 md:p-12 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h3 className="text-3xl font-black text-navy dark:text-white">Rincian Biaya Administrasi</h3>
                <p className="text-slate-500 dark:text-slate-400">Transparansi biaya pendaftaran santri baru TA 2026/2027</p>
              </div>
              <div className="px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm font-bold border border-amber-200 dark:border-amber-800/30">
                Tersedia Skema Cicilan & Keringanan
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Infaq Pembangunan */}
              <div className="bg-white dark:bg-navy-dark p-6 rounded-xl border border-slate-100 dark:border-white/5 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-blue-500/5 rounded-full group-hover:scale-150 transition-transform"></div>
                <div className="absolute top-2 right-2 bg-green-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full z-10">HEMAT 100RB</div>
                <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-4">Infaq Pembangunan</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold text-navy dark:text-white">Rp. 500.000</p>
                      <p className="text-xs text-slate-400 line-through">600rb</p>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">Bebas biaya pembangunan 3 tahun</p>
                  </div>
                  <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2">
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span><b>Pembayaran Langsung:</b> Rp 500rb</span>
                    </li>
                    <li className="flex gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span><b>Normal:</b> Rp 200rb x 3 Tahun</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Uang Pangkal */}
              <div className="bg-white dark:bg-navy-dark p-6 rounded-xl border border-slate-100 dark:border-white/5 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-amber-500/5 rounded-full group-hover:scale-150 transition-transform"></div>
                <div className="absolute top-2 right-2 bg-amber-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full z-10">HEMAT 200RB</div>
                <h4 className="text-sm font-black text-amber-500 uppercase tracking-widest mb-4">Uang Pangkal (Mukim)</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold text-navy dark:text-white">Rp. 1.000.000</p>
                      <p className="text-xs text-slate-400 line-through">1.2jt</p>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">Investasi kenyamanan satu kali bayar</p>
                  </div>
                  <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2">
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span><b>Pembayaran Langsung:</b> Rp 1 Juta</span>
                    </li>
                    <li className="flex gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span><b>Normal:</b> Rp 400rb x 3 Tahun</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Khutbatul Arsy */}
              <div className="bg-white dark:bg-navy-dark p-6 rounded-xl border border-slate-100 dark:border-white/5 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-green-500/5 rounded-full group-hover:scale-150 transition-transform"></div>
                <h4 className="text-sm font-black text-green-500 uppercase tracking-widest mb-4">Khutbatul 'Arsy</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-2xl font-bold text-navy dark:text-white">Rp. 150.000</p>
                    <p className="text-xs text-slate-400">Pentahelix Leadership Camp</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-100 dark:border-white/5">
                    <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Breakdown:</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">• Workshop Pembinaan: Rp. 50rb</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">• Bumi Perkemahan: Rp. 100rb</p>
                  </div>
                </div>
              </div>

              {/* Uang Makan */}
              <div className="bg-white dark:bg-navy-dark p-6 rounded-xl border border-slate-100 dark:border-white/5 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-rose-500/5 rounded-full group-hover:scale-150 transition-transform"></div>
                <div className="absolute top-2 right-2 bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full z-10">MUKIM</div>
                <h4 className="text-sm font-black text-rose-500 uppercase tracking-widest mb-4">Paket Makan VIP</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-2xl font-bold text-navy dark:text-white">Rp. 575.000</p>
                    <p className="text-xs text-slate-400">Bulanan</p>
                  </div>
                  <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2">
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      <span>Makan 2x Sehari (Sudah Termasuk Lauk Pauk)</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      <span>Wajib khusus santri mukim</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* SPP */}
              <div className="bg-white dark:bg-navy-dark p-6 rounded-xl border border-slate-100 dark:border-white/5 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-purple-500/5 rounded-full group-hover:scale-150 transition-transform"></div>
                <div className="absolute top-2 right-2 bg-purple-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full z-10">SUBSIDI SILANG</div>
                <h4 className="text-sm font-black text-purple-500 uppercase tracking-widest mb-4">SPP Sekolah</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-xl font-bold text-navy dark:text-white">Mulai Rp. 100rb</p>
                    <p className="text-[10px] text-slate-400">Disesuaikan Pendapatan Orang Tua</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-100 dark:border-white/5">
                    <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Pilihan SPP:</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">• SKTM : Rp. 100.000</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">• Proporsional : Rp. 150.000</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">• Dasar : Rp. 215.000</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">• Kontribusi : Rp. 250.000</p>
                  </div>
                </div>
              </div>

              {/* Fasilitas */}
              <div className="bg-white dark:bg-navy-dark p-6 rounded-xl border border-slate-100 dark:border-white/5 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-cyan-500/5 rounded-full group-hover:scale-150 transition-transform"></div>
                <h4 className="text-sm font-black text-cyan-500 uppercase tracking-widest mb-4">Iuran Fasilitas</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-2xl font-bold text-navy dark:text-white">Rp. 75.000</p>
                    <p className="text-xs text-slate-400">Skema Bulanan</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-100 dark:border-white/5">
                    <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Skema Lainnya:</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">• Per Semester: Rp. 400.000 <span className="text-green-600 dark:text-green-400 font-bold">(Hemat 50rb)</span></p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">• Per Tahun: Rp. 800.000 <span className="text-green-600 dark:text-green-400 font-bold">(Hemat 100rb)</span></p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">• Per 3 Tahun: Rp. 2.400.000 <span className="text-green-600 dark:text-green-400 font-bold">(Hemat 300rb)</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-navy dark:bg-primary rounded-xl text-white dark:text-navy flex flex-col md:flex-row items-center gap-4 text-center md:text-left transition-colors">
              <HeartHandshake className="w-10 h-10" />
              <p className="text-sm font-medium leading-relaxed">
                Infaq Partisipasi merupakan bentuk gotong royong wali santri untuk mendukung pembangunan fasilitas pesantren demi kenyamanan santri.
              </p>
            </div>
          </div>
        </Reveal>


      </div>
    </section>
  );
};

export default AdmissionsInfo;
