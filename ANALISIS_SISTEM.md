# ANALISIS KEBUTUHAN PERANGKAT LUNAK DAN DESAIN BERORIENTASI OBJEK
**Sistem Informasi dan Penerimaan Santri Baru (PSB)**
**Pondok Pesantren Nurul Huda Malati (PPNH Malati)**

---

## BAB I: ANALISIS KEBUTUHAN PERANGKAT LUNAK

### 1.1. Pendahuluan
Sistem Informasi dan Penerimaan Santri Baru (PSB) PPNH Malati adalah sebuah platform antarmuka web modern yang dibangun untuk mendigitalisasi proses pendaftaran santri baru serta menjadi media informasi interaktif (profil, program unggulan, fasilitas, galeri, berita, dan karya santri) bagi masyarakat umum.

### 1.2. Identifikasi Pengguna (Aktor)
Sistem ini dirancang untuk berinteraksi dengan empat jenis pengguna (aktor) utama:
1. **Pengguna Umum / Calon Santri**: Masyarakat yang mengunjungi website untuk mencari informasi tentang pondok pesantren atau melakukan pendaftaran secara *online*.
2. **Super Admin**: Administrator utama yang memiliki wewenang penuh atas seluruh fitur sistem, manajemen konten, data pendaftar, dan kontrol hak akses admin lainnya.
3. **Admin PSB (Panitia Pendaftaran)**: Staf admin yang khusus ditugaskan untuk mengelola dan memvalidasi data calon santri yang masuk.
4. **Admin Konten**: Staf admin yang secara khusus mengelola publikasi media dan informasi pondok (Galeri, Video, Berita, Fasilitas, dan Karya Santri).

### 1.3. Kebutuhan Fungsional (Functional Requirements)
Kebutuhan fungsional mendeskripsikan layanan, fitur, atau fungsi yang harus disediakan oleh sistem.

| Kode | Fungsionalitas | Aktor |
| :--- | :--- | :--- |
| **FR-01** | **Manajemen Tampilan Publik (Landing Page)** | Umum |
| FR-01.1 | Sistem dapat menampilkan profil, sejarah, dan keunggulan pondok. | Umum |
| FR-01.2 | Sistem dapat menampilkan daftar fasilitas, program, berita, dan galeri interaktif. | Umum |
| **FR-02** | **Sistem Pendaftaran Online (PSB)** | Umum |
| FR-02.1 | Pendaftar dapat mengisi formulir pendaftaran santri baru secara *online*. | Umum |
| FR-02.2 | Pendaftar dapat mengunggah berkas persyaratan (Foto, Bukti Transfer). | Umum |
| **FR-03** | **Otentikasi Pengguna & Keamanan (Login System)** | Semua Admin |
| FR-03.1 | Admin wajib melakukan otentikasi (login) email dan sandi sebelum mengakses _Dashboard_. | Semua Admin |
| FR-03.2 | Sistem memblokir atau menyembunyikan akses tab menu di luar wewenang (*Role-Based*). | Semua Admin |
| **FR-04** | **Manajemen Data Pendaftar (Dashboard PSB)** | Super Admin, Admin PSB |
| FR-04.1 | Admin dapat melihat, mencari (berdasarkan nama/NISN), dan memfilter data pendaftaran secara interaktif (*Realtime*). | Super Admin, Admin PSB |
| FR-04.2 | Admin dapat melihat detail informasi secara penuh, mengunduh, atau mencetak dokumen formulir pendaftar. | Super Admin, Admin PSB |
| FR-04.3 | Sistem secara otomatis menghitung kalkulasi metrik statistik pendaftar (Total dana asrama, total pendaftar putra/putri, dsb). | Super Admin, Admin PSB |
| **FR-05** | **Manajemen Konten Multimedia & Artikel** | Super Admin, Admin Konten |
| FR-05.1 | Admin dapat mengelola (Tambah, Ubah, Hapus) foto Galeri dan *thumbnail* YouTube (*Video*). | Super Admin, Admin Konten |
| FR-05.2 | Admin dapat menulis, mengubah, dan menghapus artikel Berita (*News*) dan mengunggah gambar sampaiannya. | Super Admin, Admin Konten |
| FR-05.3 | Admin dapat mempublikasikan daftar portofolio Karya Santri beserta kategori lombanya. | Super Admin, Admin Konten |
| FR-05.4 | Admin dapat menambah/memperbarui daftar fasilitas (infrastruktur) pondok. | Super Admin, Admin Konten |
| **FR-06** | **Manajemen Hak Akses Super** | Super Admin |
| FR-06.1 | Super admin dapat mengubah wewenang (*role*) pengguna lain di dalam log sistem. | Super Admin |

### 1.4. Kebutuhan Non-Fungsional (Non-Functional Requirements)
1. **Keamanan (Security)**: Password harus dienkripsi menggunakan *Secure Hash Algorithm*. *Database endpoint* dikunci dengan *Row Level Security* (RLS) dan akses berbasis JWT (Supabase Auth). Data formulir pendaftar dirahasiakan melalui arsitektur Google Cloud & Google Workspace.
2. **Kinerja (Performance)**: Aplikasi bertipe *Single Page Application* (SPA) dengan *React* untuk meminimalisasi *loading* saat perpindahan halaman. Aset di-*load* dengan *Lazy Loading*.
3. **Ketersediaan & Platform (Availability)**: Perangkat lunak berbentuk *Web-Base* responsif (Ponsel, Tablet, dan Desktop) berjalan 24/7 di atas infrastruktur *CDN hosting*.
4. **Penyimpanan Multimedia (Storage)**: Unggahan gambar dari admin dikompresi kualitasnya *(Image Compression)* melalui *browser* sebelum dikirim ke arsitektur Supabase Storage.

---

## BAB II: ANALISIS DESAIN BERORIENTASI OBJEK (OODA)

Pendekatan *Object-Oriented Design* digunakan untuk merepresentasikan konseptual dunia nyata dari spesifikasi sistem ini ke dalam bentuk objek/entitas dan metode pertukaran datanya.

### 2.1. Spesifikasi Use Case (Deskripsi Aktor)
Alur interaksi diagram digambarkan sebagai berikut:
- **Calon Santri** $\rightarrow$ `Melihat Informasi Web` $\rightarrow$ `Mengisi Form Pendaftaran` $\rightarrow$ _Submit Form (Trigger Google Apps Script_).
- **Admin PSB** $\rightarrow$ `Login Auth` $\rightarrow$ `Dashboard Pendaftar` $\rightarrow$ `Mencari & Mencetak Data Santri`.
- **Admin Konten** $\rightarrow$ `Login Auth` $\rightarrow$ `Dashboard Multimedia` $\rightarrow$ `Operasi CRUD (Galeri, Fasilitas, Berita, Karya)`.
- **Super Admin** $\rightarrow$ `Login Auth` $\rightarrow$ `Akses Seluruh Tab Dashboard` Termasuk `Ubah Role Admin`.

### 2.2. Class & Data Modeling (Struktur Objek)
Basis Data (*Database*) dan entitas lokal menggunakan objek berikut:

**1. Entitas: `Profile (User)`**
- `id`: UUID (Primary Key)
- `email`: String
- `role`: Enum (`super_admin`, `psb_admin`, `content_admin`)
- `updated_at`: Timestamp
- **Methods/Logika**: `checkUser()`, `handleLogin()`, `handleLogout()`.

**2. Entitas: `Registrant (Santri / Pendaftar)`**
- `id`: String (Key dari Spreadsheet)
- `Nama_Santri_Baru`: String
- `NISN`: String
- `Jenis_Kelamin`: Enum (Laki-Laki, Perempuan)
- `Masuk_Ke_Jenjang`: String
- `Nominal_Bayar`: Integer
- `Timestamp`: Date
- `File_Bukti_Bayar`: String (URL URL Google Drive)
- **Methods/Logika**: `fetchRegistrants()`, `calculateStats()`, `handlePrint()`.

**3. Entitas: `GalleryItem`**
- `id`: UUID (Primary Key)
- `title`: String
- `category`: String
- `image_url`: String (Supabase Cloud URL)
- `is_featured`: Boolean
- `created_at`: Timestamp
- **Methods/Logika**: `handleAddGalleryItem()`, `handleDeleteGalleryItem()`, `handleFileUpload(file, compress)`.

**4. Entitas: `NewsItem`**
- `id`: UUID (Primary Key)
- `title`: String
- `content`: Text (Artikel)
- `quote`: String
- `source_name`: String
- `badge_text`: String
- `image_url`: String
- `is_active`: Boolean
- **Methods/Logika**: `handleAddNewsItem()`, `handleUpdateNewsItem()`, `handleDeleteNewsItem()`.

**5. Entitas: `StudentWork (Karya)`**
- `id`: UUID (Primary Key)
- `title`: String
- `student_name`: String
- `category`: Enum (Prestasi, dsb)
- `description`: Text
- `image_url`: String
- **Methods/Logika**: `handleAddStudentWork()`, `handleUpdateStudentWorkItem()`, `handleDeleteStudentWork()`.

**6. Entitas: `FacilityItem`**
- `id`: UUID (Primary Key)
- `title`: String
- `description`: Text
- `icon_name`: String
- `image_url`: String
- `display_order`: Integer

### 2.3. Diagram Aktivitas (Activity Flow)

**A. Proses Aktivitas (Pengguna Umum Mendaftar)**
1. Pengguna membuka URL Website PPNH Malati.
2. Sistem me-render komponen UI Landing Page (`<LandingPage />`).
3. Pengguna menekan tombol "Daftar Sekarang". Sistem menampilkan *Modal Registration Form*.
4. Pengguna memvalidasi form (wajib isi) $\rightarrow$ sistem mengecek ketersediaan input.
5. Jika tidak valid, muncul peringatan (*Field required*).
6. Jika valid, pendaftar mengunggah bukti bayar. Sistem mengirim permintaan berpayload *JSON* via mode `POST` ke *Google Apps Script Web App Endpoint*.
7. GAS Script memproses data dan menuliskannya secara baris-ke-baris ke *Google Spreadsheet*.
8. Sistem (Frontend) mengucapkan sukses pendaftaran.

**B. Proses Aktivitas (Admin CRUD Data - Berorientasi Objek)**
1. Admin mengakses `/admin`.
2. Sistem mengeksekusi `checkUser()` di fase *mounting React (useEffect)*.
3. Otentikasi JWT tidak ditemukan $\rightarrow$ Buka Layar Login (`<LoginView />`).
4. Otentikasi dimasukkan $\rightarrow$ API Supabase dikontak, Token disahkan, *Role* dibaca dari tabel `profiles`.
5. Status sistem diperbarui: `isAdmin (True)`, `userRole` (*terdefinisi*).
6. Admin menavigasi ke tab *Berita / Konten*.
7. *State* lokal antarmuka berubah (*activeTab*).
8. Admin mengunggah gambar berita $\rightarrow$ Kompresi Client-side *Local Blob* $\rightarrow$ unggah ke Supabase Cloud Storage. URL kembalian Storage disimpan di JSON.
9. Admin tekan Simpan $\rightarrow$ Object disuntik (*Insert*) ke RDBMS PostgreSQL Supabase.
10. Tampilan me-*rehydrate/refetch* otomatis dan tabel berita baru tampil (*Realtime Lifecycle*).

### 2.4. Kesimpulan Arsitektur Teknis
Proyek menggunakan pendekatan *Modern Monolith* untuk antarmuka (*React/Vite*)  serta arsitektur *Backend as a Service* (BaaS) berbasis Cloud (Supabase dan *Google Workspace*). 

Penggabungan fungsionalitas deklaratif *React Hooks* (`useAdminDashboard.ts`) yang mengatur manajemen relasi *state* (Model), mengontrol tata letak komponen (View), dan sinkronisasi komputasi/layanan jaringan API (Controller/Object Services) menjadikannya arsitektur perangkat lunak modular yang bersih, sangat cepat, responsif, dan mudah dalam pemeliharaannya (*Maintenance*).
