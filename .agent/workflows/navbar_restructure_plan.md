---
description: Rencana Perubahan Navbar dengan Sistem Dropdown Terstruktur
---

# Rencana Pembaruan Navbar (Header)

## 1. Tujuan
Meningkatkan navigasi pengguna agar lebih cepat menemukan bagian spesifik situs tanpa perlu menelaah seluruh halaman. Menampilkan kesan profesional dan modern pada situs Pondok Pesantren Nurul Huda Malati.

## 2. Struktur Menu Baru
Navbar akan diorganisir menjadi beberapa kategori utama dengan sub-menu:

### A. Profil (Dropdown)
*   **Visi & Misi**: Mengarah ke bagian perkenalan pondok (`#about`).
*   **Fasilitas**: Mengarah ke showcase fasilitas unggulan (`#facilities`).
*   **Sejarah**: (Opsional, jika ada bagian spesifik).

### B. Akademik / Program (Dropdown)
*   Integrasi ke bagian pendidikan (`#programs`).
*   **TK Plus**
*   **SMP Plus**
*   **SMK Plus** (TKJ & Tata Busana)

### C. Media & Informasi (Dropdown)
*   **Berita Terkini**: Mengarah ke seksi berita terbaru (`#news`).
*   **Galeri Foto**: Mengarah ke portofolio foto kegiatan (`#gallery`).
*   **Galeri Video**: Mengarah ke dokumentasi video (`#videos`).

### D. Pendaftaran (Menu Tunggal / Highlighted)
*   **Daftar Sekarang**: Mengarah langsung ke formulir pendaftaran (`#admissions`).

### E. Kontak (Menu Tunggal)
*   **Hubungi Kami**: Mengarah ke informasi kontak dan peta (`#contact`).

## 3. Fitur Teknis Baru
1.  **Smart Header**: Header tetap transparan di Hero dan menjadi solid/blur saat scroll (Sudah ada, akan diperkuat).
2.  **Smooth Dropdown**: Animasi transisi saat menu diarahkan (Hover) di desktop dan diklik di mobile.
3.  **Visual Indicators**: Penambahan ikon panah kecil (chevron) untuk menandai menu yang memiliki sub-navbar.
4.  **Mobile Friendly**: Menu mobile yang dapat diekspansi (accordion style) untuk sub-menu.

## 4. Langkah Eksekusi
1.  Update `navLinks` object di `Header.tsx` untuk mendukung struktur bertingkat.
2.  Modifikasi fungsi render pada `Header.tsx` untuk menangani status `isHovered` pada tiap menu.
3.  Styling ulang sub-menu dengan gaya Glassmorphism sesuai estetika desain saat ini.
4.  Testing navigasi di berbagai ukuran layar.
