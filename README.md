# BelajarYuk Web

Frontend React (Vite) untuk platform belajar BelajarYuk. Mengonsumsi REST API backend untuk kurikulum (mata pelajaran, bab, materi) dan autentikasi.

## Prasyarat

- Node.js 18+
- Backend API berjalan di **port 3004** (lihat repo backend)

## Konfigurasi environment

Salin contoh env dan sesuaikan jika perlu:

```bash
cp .env.example .env
```

Isi `.env`:

```env
VITE_API_URL=http://localhost:3004
```

Variabel ini dipakai untuk semua request API dan URL ikon mata pelajaran (`iconUrl` relatif dari backend).

## Menjalankan

1. Jalankan backend di `http://localhost:3004` (pastikan CORS mengizinkan origin frontend, mis. `http://localhost:3000`).
2. Install dependensi dan jalankan dev server:

```bash
npm install
npm run dev
```

Aplikasi web: [http://localhost:3000](http://localhost:3000)

Build produksi:

```bash
npm run build
npm run preview
```

