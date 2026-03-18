# Panduan Konfigurasi Supabase Storage (Bucket)

Ikuti langkah-langkah di bawah ini agar fitur **Upload Gambar** di Dashboard Admin dapat berjalan dengan lancar.

### 1. Membuat Bucket Baru
1. Buka [Dashboard Supabase](https://app.supabase.com/) dan pilih proyek Anda.
2. Di sidebar sebelah kiri, klik menu **Storage** (ikon kubus/kotak).
3. Klik tombol **New Bucket**.
4. Masukkan nama bucket: `uploads` (pastikan menggunakan huruf kecil semua).
5. Aktifkan opsi **Public Bucket**. Ini agar gambar dapat diakses langsung oleh pengunjung website tanpa link khusus.
6. Klik **Create Bucket**.

### 2. Mengatur Izin Akses (RLS Policies)
Agar dashboard bisa mengunggah file ke bucket tersebut, Anda perlu mengatur izinnya:
1. Pastikan Anda berada di halaman Storage dan telah memilih bucket `uploads`.
2. Klik tab **Policies** di bagian atas.
3. Pada kolom **Storage Policies**, klik tombol **New Policy**.
4. Pilih opsi **For full customization** (atau "Get started quickly").
5. Anda perlu membuat 2 Policy utama:

   **Policy A: Izinkan Siapa Saja Melihat Gambar (SELECT)**
   - Policy name: `Allow Public Select`
   - Allowed operations: centang **SELECT**
   - Target roles: biarkan default (public)
   - Using expression: isi dengan `true`
   - Klik **Review** lalu **Save policy**.

   **Policy B: Izinkan Upload Gambar (INSERT & UPDATE)**
   - Policy name: `Allow All Uploads`
   - Allowed operations: centang **INSERT** dan **UPDATE**
   - Target roles: biarkan default (public/authenticated)
   - Check expression: isi dengan `true`
   - Klik **Review** lalu **Save policy**.

---

### 3. Struktur Folder Otomatis
Setelah bucket dibuat, dashboard akan secara otomatis membuat folder di dalam bucket tersebut saat Anda melakukan upload pertama:
- `news/` (untuk gambar berita)
- `gallery/` (untuk foto galeri)
- `facilities/` (untuk foto fasilitas)

**Catatan:** Jika Anda mengalami error "Bucket not found", pastikan kembali nama bucket yang Anda buat adalah tepat `uploads`.
