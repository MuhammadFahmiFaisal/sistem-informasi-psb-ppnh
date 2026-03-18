export interface Registrant {
  row_index?: number;
  Tanggal_Pendaftaran: string;
  Asal_Sekolah: string;
  Masuk_Ke_Jenjang: string;
  Nama_Santri_Baru: string;
  Nama_Ayah: string;
  Tempat_Lahir: string;
  Tanggal_Lahir: string;
  Nama_Ibu: string;
  Jenis_Kelamin: string;
  Email: string;
  Saudara_Kandung: string;
  Anak_Yatim: string;
  Ukuran_Seragam: string;
  No_HP: string;
  NISN: string;
  Alamat_Lengkap: string;
  Pendapatan_Orang_Tua: string;
  Kesiapan_SPP: string;
  Pilihan_Fasilitas: string;
  Fasilitas_Makan: string;
  Infaq_Pembangunan?: string;
  Uang_Pangkal?: string;
  Khutbatul_Arsy?: string;
  Foto_Santri: string;
  File_SKM: string;
  File_Bukti_Bayar: string;
  Nominal_Bayar?: string | number;
  Total_Bayar_Pertama?: string;
  Iuran_Bulanan?: string;
  nominal?: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  is_featured: boolean;
  created_at: string;
}

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  thumbnail_url: string;
  embed_url: string;
  display_order: number;
  created_at: string;
}

export interface NewsItem {
  id: string;
  source_name: string;
  badge_text: string;
  title: string;
  quote: string;
  content: string;
  image_url: string;
  link_url: string;
  is_active: boolean;
  created_at: string;
}

export interface FacilityItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  icon_name: string;
  display_order: number;
  created_at: string;
}

export interface StudentWork {
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

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: string;
}
