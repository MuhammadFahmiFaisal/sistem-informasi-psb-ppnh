import React from 'react';
import { Registrant } from './types';
import { formatDateIndo } from '../../lib/formatters';

interface PrintViewProps {
  selectedRegistrant: Registrant | null;
}

const getSafeImageUrl = (url: string) => {
  if (!url) return '';
  if (url.includes('drive.google.com')) {
    const id = url.split('id=')[1] || url.split('/d/')[1]?.split('/')[0];
    return id ? `https://lh3.googleusercontent.com/d/${id}=s1000?authuser=0` : url;
  }
  return url;
};

const PrintView: React.FC<PrintViewProps> = ({ selectedRegistrant }) => {
  if (!selectedRegistrant) return null;

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white !important; color: #001f3f !important; margin: 0 !important; padding: 0 !important; }
          @page { 
            size: 210mm 330mm; /* F4 / Folio Size */
            margin: 1cm 1.5cm; 
          }
          .section-header {
            background-color: #f8fafc !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            border-left: 4px solid #d4af37 !important; /* Gold Accent */
            padding: 4px 10px !important;
            font-size: 10px !important;
            text-transform: uppercase !important;
            font-weight: 800 !important;
            margin-bottom: 6px !important;
            margin-top: 12px !important;
            color: #001f3f !important;
          }
          table td { border: none !important; padding: 1px 0 !important; }
          .kop-border { border-bottom: 4px double #001f3f !important; }
        }
      `}</style>
      <div className="print-only hidden font-serif text-black p-4 max-w-[21.5cm] mx-auto">
      {/* KOP SURAT SEDERHANA (OFFICIAL CENTERED) */}
      <div className="text-center kop-border pb-3 mb-6 relative">
        <h1 className="text-xl font-bold uppercase tracking-wide text-navy">Panitia Penerimaan Santri Baru</h1>
        <h2 className="text-2xl font-black uppercase tracking-tight text-navy">Pondok Pesantren Nurul Huda Malati</h2>
        <h3 className="text-lg font-black uppercase tracking-wide text-gold">Tahun Ajaran 2026/2027</h3>
        <p className="text-[9px] mt-1 text-slate-600">Alamat: Kp. Malati Ds. Padaasih Kec. Pasirwangi Kab. Garut | Email: psb_nurulhudamalati@gmail.com</p>
      </div>

      {/* JUDUL DAN NOMOR REGISTRASI */}
      <div className="text-center mb-4">
        <p className="text-sm font-mono tracking-widest font-bold bg-slate-50 inline-block px-4 py-1 border-2 border-navy rounded-lg text-navy">
          REG: {new Date(selectedRegistrant.Tanggal_Pendaftaran).getFullYear()}
          {String(new Date(selectedRegistrant.Tanggal_Pendaftaran).getMonth() + 1).padStart(2, '0')}
          {String(selectedRegistrant.row_index || '99').padStart(3, '0')}
        </p>
      </div>

      {/* GRID DATA UTAMA */}
      <div className="space-y-4 relative">
        {/* I. DATA CALON SANTRI */}
        <div>
          <h4 className="section-header">I. Identitas Calon Santri</h4>
          <table className="w-full text-sm">
            <tbody>
              <tr><td className="w-44 border-none py-1">Nama Lengkap</td><td className="border-none py-1">: <span className="font-bold uppercase">{selectedRegistrant.Nama_Santri_Baru}</span></td></tr>
              <tr><td className="w-44 border-none py-1">NISN</td><td className="border-none py-1">: {selectedRegistrant.NISN || '-'}</td></tr>
              <tr><td className="w-44 border-none py-1">Tempat, Tanggal Lahir</td><td className="border-none py-1">: {selectedRegistrant.Tempat_Lahir}, {formatDateIndo(selectedRegistrant.Tanggal_Lahir, false)}</td></tr>
              <tr><td className="w-44 border-none py-1">Jenis Kelamin</td><td className="border-none py-1">: {selectedRegistrant.Jenis_Kelamin}</td></tr>
              <tr><td className="w-44 border-none py-1">Asal Sekolah</td><td className="border-none py-1">: {selectedRegistrant.Asal_Sekolah}</td></tr>
              <tr><td className="w-44 border-none py-1">Pilihan Jenjang</td><td className="border-none py-1">: <span className="font-bold">{selectedRegistrant.Masuk_Ke_Jenjang}</span></td></tr>
              <tr><td className="w-44 border-none py-1">Ukuran Seragam</td><td className="border-none py-1">: {selectedRegistrant.Ukuran_Seragam}</td></tr>
              <tr><td className="w-44 border-none py-1 align-top">Alamat Domisili</td><td className="border-none py-1 leading-relaxed">: {selectedRegistrant.Alamat_Lengkap}</td></tr>
            </tbody>
          </table>
        </div>

        {/* II. DATA ORANG TUA / WALI */}
        <div>
          <h4 className="section-header">II. Identitas Orang Tua / Wali</h4>
          <table className="w-full text-sm">
            <tbody>
              <tr><td className="w-44 border-none py-1">Nama Ayah Kandung</td><td className="border-none py-1">: {selectedRegistrant.Nama_Ayah}</td></tr>
              <tr><td className="w-44 border-none py-1">Nama Ibu Kandung</td><td className="border-none py-1">: {selectedRegistrant.Nama_Ibu}</td></tr>
              <tr><td className="w-44 border-none py-1">Pendapatan Rata-Rata</td><td className="border-none py-1">: {selectedRegistrant.Pendapatan_Orang_Tua}</td></tr>
              <tr><td className="w-44 border-none py-1">Nomor Kontak (WhatsApp)</td><td className="border-none py-1">: {selectedRegistrant.No_HP}</td></tr>
            </tbody>
          </table>
        </div>

        {/* III. RINCIAN ADMINISTRASI KEUANGAN (Hanya jika Mukim) */}
        {selectedRegistrant.Masuk_Ke_Jenjang?.toLowerCase().includes('mukim') && (
          <div>
            <h4 className="section-header">III. Rincian Administrasi Keuangan (Estimasi)</h4>
            <table className="w-full border border-navy text-xs">
              <thead className="bg-slate-50">
                <tr>
                  <th className="border border-navy p-1 text-center text-navy font-black">Komponen Biaya</th>
                  <th className="border border-navy p-1 text-center text-navy font-black">Skema / Paket Pilihan</th>
                  <th className="border border-navy p-1 text-center text-navy font-black">Nominal</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-navy p-1">Infaq Pembangunan</td><td className="border border-navy p-1 text-center">{selectedRegistrant.Infaq_Pembangunan}</td><td className="border border-navy p-1 text-right">Terlampir</td></tr>
                <tr><td className="border border-navy p-1">Uang Pangkal</td><td className="border border-navy p-1 text-center">{selectedRegistrant.Uang_Pangkal}</td><td className="border border-navy p-1 text-right">Terlampir</td></tr>
                <tr><td className="border border-navy p-1 font-bold">Total Pembayaran Pertama</td><td className="border border-navy p-1 bg-yellow-50/50 text-center font-bold text-navy">SKEMA TERPILIH</td><td className="border border-navy p-1 text-right font-black text-navy">{selectedRegistrant.Total_Bayar_Pertama}</td></tr>
                <tr><td className="border border-navy p-1 font-bold">Iuran Bulanan (SPP + Makan)</td><td className="border border-navy p-1 text-center font-medium font-bold">{selectedRegistrant.Kesiapan_SPP}</td><td className="border border-navy p-1 text-right font-black text-navy">{selectedRegistrant.Iuran_Bulanan}</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {/* IV. PERNYATAAN DAN CHECKLIST */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="border border-navy/30 bg-slate-50/30 p-2 rounded-lg text-[9px] leading-tight italic">
            <p className="font-bold underline mb-1 uppercase text-navy">Pernyataan Orang Tua:</p>
            "Dengan ini saya menyatakan bahwa data yang diisi adalah benar. Saya bersedia mengikuti seluruh regulasi dan tata tertib yang berlaku di Pondok Pesantren Nurul Huda Malati selama anak saya menjadi santri."
          </div>
          <div className="border border-navy/30 p-2 rounded-lg">
            <p className="text-[9px] font-bold uppercase mb-1 text-navy">Ceklis Kelengkapan Berkas (Admin):</p>
            <div className="grid grid-cols-2 gap-x-2 text-[8px]">
              <div className="flex items-center gap-1">□ Pas Foto (Softcopy)</div>
              <div className="flex items-center gap-1">□ Fotocopy KK</div>
              <div className="flex items-center gap-1">□ Bukti Transfer</div>
              <div className="flex items-center gap-1">□ Akta Kelahiran</div>
              <div className="flex items-center gap-1">□ Ijazah/SKL</div>
              <div className="flex items-center gap-1">□ Kartu NISN</div>
            </div>
          </div>
        </div>
        {/* RINGKASAN PEMBAYARAN */}
        <div className="bg-navy/5 border-2 border-navy p-3 rounded-lg grid grid-cols-2 gap-4">
          <div className="text-center border-r border-navy/20">
            <p className="text-[10px] font-bold text-navy uppercase">Total Bayar Saat Pendaftaran</p>
            <p className="text-xl font-black text-navy">{selectedRegistrant.Total_Bayar_Pertama || '-'}</p>
            <p className="text-[8px] text-slate-500 italic mt-0.5">*Sudah termasuk Uang Pangkal & Biaya Awal</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold text-gold uppercase">Total Bayar Bulan Berikutnya</p>
            <p className="text-xl font-black text-gold">{selectedRegistrant.Iuran_Bulanan || '-'}</p>
            <p className="text-[8px] text-slate-500 italic mt-0.5">*Estimasi SPP & Makan setiap bulan</p>
          </div>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-3 text-center text-xs">
        <div className="flex flex-col h-28 justify-between">
          <p>Orang Tua / Wali Santri,</p>
          <div className="h-20"></div>
          <p className="font-bold border-b border-navy inline-block mx-auto min-w-[3cm]">({selectedRegistrant.Nama_Ayah})</p>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="w-24 h-24 border-2 border-dotted border-slate-200 rounded-full flex items-center justify-center opacity-20">
            <span className="text-[6px] text-center uppercase tracking-widest">LOKASI<br />STEMPEL</span>
          </div>
        </div>

        <div className="flex flex-col h-28 justify-between">
          <p>Garut, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}<br />Panitia PPDB,</p>
          <div className="h-20"></div>
          <p className="font-bold text-navy border-b border-navy inline-block mx-auto min-w-[4cm]">Ust. Ahmad Tanjil</p>
        </div>
      </div>

      {/* FOOTER SYSTEM */}
      <div className="mt-12 pt-1 border-t border-gray-300 text-[7px] text-gray-400 flex justify-between uppercase tracking-tighter">
        <span>PPNH SYSTEM VER 2026.1</span>
        <span>Dokumen Sah Hasil Cetakan Sistem - Dicetak pada {new Date().toLocaleString('id-ID')}</span>
        <span>Halaman 1 dari 1</span>
      </div>
    </div>
    </>
  );
};

export default PrintView;
