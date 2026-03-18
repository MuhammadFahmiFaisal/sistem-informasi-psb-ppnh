# PENJAMINAN KEAMANAN SISTEM & PRIVASI DATA SANTRI
**Pondok Pesantren Nurul Huda Malati (PPNH Malati)**

Dokumen ini disusun untuk memberikan transparansi dan jaminan teknis mengenai standar keamanan arsitektur perangkat lunak yang diterapkan pada Sistem Informasi & Penerimaan Santri Baru (PSB) PPNH Malati.

Sistem ini dibangun dengan memprioritaskan keamanan berlapis (Defense-in-Depth), khususnya dalam menangani privasi dan data sensitif calon santri.

---

## 1. Infrastruktur Penyimpanan Data Pendaftar (Tingkat Tinggi)
Data privasi santri (seperti nama, alamat, NISN, nama orang tua, dan mutasi keuangan) **tidak disimpan** secara sembarangan di *hosting web publik*. 

- **Google Cloud Ecosystem**: Data formulir secara langsung diintegrasikan dengan *Google Sheets* menggunakan *Google Apps Script*. Artinya, perlindungan fisik dan *cyber* terhadap pangkalan data pendaftar sepenuhnya didukung oleh **infrastruktur keamanan Google**.
- **Komunikasi Tertutup**: Aplikasi membaca data ini menggunakan jalur *end-point* (API) yang diamankan. Pihak luar tidak bisa secara bebas mengubah formulir tersebut tanpa hak akses dari akun Google admin institusi.

## 2. Sistem Otentikasi dan Basis Data Utama (Supabase)
Sistem administrasi portal (Dashboard) dibangun menggunakan **Supabase**, yang merupakan alternatif *open-source* berstandar *enterprise* dari Firebase.
- **Enkripsi Kata Sandi (Password Hashing)**: Kata sandi admin dienkripsi menggunakan algoritma standar industri yang sangat kuat (Bcrypt/Argon2). Bahkan pengembang aplikasi sekalipun **tidak dapat** melihat *password* asli Anda.
- **JSON Web Token (JWT)**: Setiap kali Admin berhasil *login*, sistem akan menerbitkan "kunci digital" (Token) sementara yang terenkripsi. Token ini digunakan sebagai izin akses masuk aplikasi.

## 3. Pembatasan Hak Akses Administrator (Role-Based Access Control)
Untuk mencegah *human error* atau peretasan internal, sistem membagi wewenang ke dalam beberapa tingkatan (Role):
1. **Super Admin**: Memiliki akses ke kontrol hak dari admin lainnya.
2. **Admin PSB**: Hanya bisa melihat dan mencetak data calon santri (tidak bisa merusak / menghapus portofolio web).
3. **Admin Konten**: Hanya bisa mengelola galeri, berita, dan karya santri (sama sekali tidak bisa melihat nomor telepon, NIK, atau rahasia calon santri).

Sistem secara ketat "mengusir" admin jika ia mencoba menembus tab/fitur yang bukan merupakan wewenang posisinya.

## 4. Keamanan Lapis Baris Data (Row Level Security / RLS)
Pangkalan data Supabase di sistem ini memberlakukan **RLS (Row Level Security)**. 
- Ini adalah tameng di mana *Database* secara langsung menolak permintaan membaca/menulis tabel jika aplikasi tidak melampirkan token *login* JWT yang valid.
- Ini berarti, sekalipun ada oknum (Hacker) yang berhasil mendapatkan "Alamat Database" portal ini, mereka akan selalu ditolak oleh server (Akses Ditolak/Unauthorized) karena mereka tidak memiliki kunci sesi Login milik Admin yang sah.

## 5. Transmisi Data Terenkripsi Penuh (SSL/HTTPS/TLS)
Seluruh jalur komunikasi antara perangkat (HP/Laptop pendaftar dan admin) menuju ke Server (hosting web, Supabase, Google Apps Script) **wajib menggunakan protokol HTTPS**.
- Layanan *hosting* otomatis menyertakan sertifikat **SSL (Secure Socket Layer)**. 
- Mencegah serangan *Target Interception* (*Man-In-The-Middle attack*). Artinya, apabila pendaftar melakukan pendaftaran atau transaksi menggunakan WiFi publik/warkop, data ketikan formulir mereka terkunci dari pihak yang mencoba menyadap WiFi.

## 6. Kekebalan terhadap Eksploitasi Klasik
- **Aman dari SQL Injection**: Karena program tidak menggunakan perintah SQL tradisional untuk *input* *form*, dan bertopang kepada *Library Database* resmi milik Supabase, serangan injeksi kode (SQL Injection) yang marak menimpa web sekolah tradisional otomatis berhasil dihindarkan.
- **Zero-Server Vulnerability**: Struktur arsitektur web modern yang digunakan (*Static Site Generation / JAMStack Component*) berarti tidak ada *backend server* tradisional (seperti Apache/CPanel) yang "menyala" dan menunggu untuk diretas atau di-DDOS. Konten yang diantarkan langsung disajikan oleh CDN (Content Delivery Network).

---

### Kesimpulan
Sistem PPNH Malati mengawinkan **Keamanan Google (Google Cloud)**, **Manajemen Identitas mutakhir (Supabase Auth)**, dan **Enkripsi Lintasan (HTTPS)**. Dengan konfigurasi *Role-Based Access* dan RLS berlapis, sistem ini dipastikan **sangat aman dan sangat mumpuni** dibandingkan sistem manajemen konvensional pada umumnya, dan **sudah cukup matang** untuk memikul kepercayaan dan kerahasiaan data calon santri pendaftar.
