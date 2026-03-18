import React, { useState, useEffect } from 'react';
import { getSPPOptionsByIncome, SCRIPT_URL } from '../lib/registrationConstants';
import { formatIDR } from '../lib/formatters';
import { compressImage } from '../lib/imageUtils';

export const useRegistrationForm = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // State untuk Conditional Logic & Biaya
  const [jenjang, setJenjang] = useState<string>('');
  const [income, setIncome] = useState<string>('');
  const [infaqVal, setInfaqVal] = useState<number>(0);
  const [uangPangkalVal, setUangPangkalVal] = useState<number>(0);
  const [sppVal, setSppVal] = useState<number>(0);
  const [makanVal, setMakanVal] = useState<number>(0);
  const [fasilitasVal, setFasilitasVal] = useState<number>(0);
  const [isFasilitasMonthly, setIsFasilitasMonthly] = useState<boolean>(false);
  const [infaqScheme, setInfaqScheme] = useState<'Langsung' | 'Normal' | ''>('');
  const [uangPangkalScheme, setUangPangkalScheme] = useState<'Langsung' | 'Normal' | ''>('');

  // File States (Base64)
  const [fotoSantri, setFotoSantri] = useState<string>('');
  const [fileSKM, setFileSKM] = useState<string>('');
  const [fileBukti, setFileBukti] = useState<string>('');

  const isMondok = jenjang.includes("MUKIM");

  // Auto-set SPP when income changes
  useEffect(() => {
    const opts = getSPPOptionsByIncome(income);
    if (opts.length > 0) {
      setSppVal(opts[0].value);
    } else {
      setSppVal(0);
    }
  }, [income]);

  // Auto-set/reset fees when isMondok changes
  useEffect(() => {
    if (isMondok) {
      setMakanVal(575000);
    } else {
      setMakanVal(0);
      setInfaqVal(0);
      setInfaqScheme('');
      setUangPangkalVal(0);
      setUangPangkalScheme('');
      setFasilitasVal(0);
      setSppVal(0);
      setIncome('');
    }
  }, [isMondok]);

  const totalPendaftaran = isMondok ? ((infaqVal || 0) + (uangPangkalVal || 0) + 150000 + (sppVal || 0) + (makanVal || 0) + (fasilitasVal || 0)) : 0;
  const totalBulananNext = isMondok ? ((sppVal || 0) + (makanVal || 0) + (isFasilitasMonthly ? (fasilitasVal || 0) : 0)) : 0;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<string>>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        // Kompresi sebelum diubah ke Base64 (max width 1000px, quality 0.7)
        const compressedBlob = await compressImage(file, 1000, 0.7);
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (ev.target?.result) {
            setFile(ev.target.result as string);
          }
        };
        reader.readAsDataURL(compressedBlob);
      } catch (err) {
        console.error("Compression failed, using original:", err);
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (ev.target?.result) {
            setFile(ev.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const payload = {
      Tanggal_Pendaftaran: formData.get("Tanggal_Pendaftaran"),
      Asal_Sekolah: formData.get("Asal_Sekolah"),
      Masuk_Ke_Jenjang: formData.get("Masuk_Ke_Jenjang"),
      Nama_Santri_Baru: formData.get("Nama_Santri_Baru"),
      Nama_Ayah: formData.get("Nama_Ayah"),
      Tempat_Lahir: formData.get("Tempat_Lahir"),
      Tanggal_Lahir: formData.get("Tanggal_Lahir"),
      Nama_Ibu: formData.get("Nama_Ibu"),
      Jenis_Kelamin: formData.get("Jenis_Kelamin"),
      Email: formData.get("Email"),
      Saudara_Kandung: formData.get("Saudara_Kandung") || "-",
      Anak_Yatim: formData.get("Anak_Yatim") || "-",
      Ukuran_Seragam: formData.get("Ukuran_Seragam"),
      No_HP: formData.get("No_HP"),
      NISN: formData.get("NISN"),
      Alamat_Lengkap: formData.get("Alamat_Lengkap"),
      Pendapatan_Orang_Tua: formData.get("Pendapatan_Orang_Tua") || "",
      Kesiapan_SPP: formData.get("Kesiapan_SPP") || "",
      Fasilitas_Makan: formData.get("Fasilitas_Makan") || "",
      Pilihan_Fasilitas: formData.get("Pilihan_Fasilitas") || "",
      Infaq_Pembangunan: formData.get("Infaq_Pembangunan") || "",
      Uang_Pangkal: formData.get("Uang_Pangkal") || "",
      Khutbatul_Arsy: formData.get("Khutbatul_Arsy") || "",
      Total_Bayar_Pertama: isMondok ? formatIDR(totalPendaftaran) : "Rp 0 (Ansor)",
      Iuran_Bulanan: isMondok ? formatIDR(totalBulananNext) : "Rp 0 (Ansor)",
      Foto_Santri: fotoSantri,
      File_SKM: fileSKM,
      File_Bukti_Bayar: fileBukti
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload)
      });
      setFormStatus("success");
    } catch (error: any) {
      setFormStatus("error");
      setErrorMessage(error.message || "Terjadi kesalahan koneksi.");
    }
  };

  return {
    formStatus,
    setFormStatus,
    errorMessage,
    jenjang,
    setJenjang,
    income,
    setIncome,
    infaqVal,
    setInfaqVal,
    infaqScheme,
    setInfaqScheme,
    uangPangkalVal,
    setUangPangkalVal,
    uangPangkalScheme,
    setUangPangkalScheme,
    sppVal,
    makanVal,
    fasilitasVal,
    setFasilitasVal,
    setIsFasilitasMonthly,
    isMondok,
    totalPendaftaran,
    totalBulananNext,
    fotoSantri,
    setFotoSantri,
    fileSKM,
    setFileSKM,
    fileBukti,
    setFileBukti,
    handleFileChange,
    submitForm
  };
};
