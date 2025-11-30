# BNCC Elite Team Recruitment - Mini Project Back End


Ini adalah sebuah aplikasi web sederhana berbasis **Express.js** yang dibangun sebagai prototype sistem pendaftaran dan seleksi awal untuk **BNCC Elite Team**. Proyek ini mendemonstrasikan penerapan konsep **MVC (Model-View-Controller)**, routing modular, manipulasi data JSON, dan validasi input tanpa database eksternal.

---

## 🚀 Fitur Utama

1. **Pendaftaran Kandidat (Registration Form)**
   - Formulir pendaftaran dengan input: **Nama Lengkap**, **NIM**, **IPK (GPA)**, dan **Divisi Pilihan**.
   - **Validasi Frontend & Backend:** Mencegah input kosong dan membatasi nilai IPK (Maksimal 4.00).

2. **Logika Seleksi**
   - Sistem secara otomatis memberikan status kepada kandidat berdasarkan IPK yang dimasukkan saat registrasi:
     - **GPA ≥ 3.80**: `Priority Candidate (Fast Track)` (Badge Hijau)
     - **GPA ≥ 3.00**: `Eligible for Interview` (Badge Biru)
     - **GPA < 3.00**: `Pending Approval` (Badge Abu-abu)

3. **Dashboard Kandidat**
   - Menampilkan daftar seluruh pendaftar dalam format tabel yang dinamis.
   - Visualisasi status kelulusan menggunakan indikator warna (Custom CSS Badges).

4. **Desain Modern (Native CSS)**
   - Menggunakan CSS murni.
   - File style terpusat di `public/css/style.css` untuk kemudahan maintenance.
   - Tampilan responsif dan bersih.

---

## 🛠️ Teknologi yang Digunakan

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3 (Native Custom Style)
- **Database:** JSON File Storage (`fs` module)
- **Config:** Dotenv
- **Architecture:** MVC Pattern

---

## ⚙️ Cara Menjalankan (Localhost)

Ikuti langkah-langkah ini untuk menjalankan proyek di komputer Anda:

### 1. Clone Repository
```bash
git clone [https://github.com/DavidLauda/TPM_BE_MiniProject_DavidNoahVincentLauda_5.git](https://github.com/DavidLauda/TPM_BE_MiniProject_DavidNoahVincentLauda_5.git)
cd TPM_BE_MiniProject_DavidNoahVincentLauda_5
```

### 2. Install Dependencies
Pastikan Anda sudah menginstall Node.js, lalu jalankan:
```bash
npm install
```

### 3. Setup Environment
- Buat file `.env` baru dengan menyalin isi dari `.env.example`.
- Sesuaikan isinya (opsional):
  ```env
  PORT=3000
  APP_NAME=BNCC Elite Team Recruitment
  ```

### 4. Jalankan Server
```bash
node server.js
```
Jika berhasil, terminal akan menampilkan: `Server running at http://localhost:3000`

---
