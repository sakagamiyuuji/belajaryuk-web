# BelajarYuk Web

Frontend React (Vite) untuk platform belajar BelajarYuk. Mengonsumsi REST API backend untuk kurikulum (mata pelajaran, bab, materi) dan autentikasi.

## Prasyarat

- Node.js 18+

## Konfigurasi environment

Salin contoh env dan sesuaikan jika perlu:

```bash
cp .env.example .env
```

Default production API:

```env
VITE_API_URL=https://belajaryuk-backend.onrender.com
```

Untuk development lokal dengan backend di mesin sendiri:

```env
VITE_API_URL=http://localhost:3004
```

Variabel ini dipakai untuk semua request API dan URL ikon mata pelajaran (`iconUrl` relatif dari backend).

## Menjalankan

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

## Alur aplikasi

| Rute | Keterangan |
|------|------------|
| `/` | Landing |
| `/subjects` | Daftar mata pelajaran (API publik) |
| `/subjects/:id` | Detail mapel + bab + daftar materi |
| `/subjects/:id/:chapterId/:materialId` | Konten materi (teks / video YouTube) |
| `/login`, `/register` | Auth |
| `/forgot-password`, `/reset-password` | Reset kata sandi |
| `/profile` | Profil (perlu login, `GET /api/auth/me`) |

Rute lama `/dashboard/*` diarahkan ke `/subjects/*`.

## API backend

- Production: [https://belajaryuk-backend.onrender.com](https://belajaryuk-backend.onrender.com)
- Layer kode: `src/api/` (client, types, auth, curriculum), `src/hooks/`
- Token disimpan di `localStorage` (`belajaryuk_access_token`)

### Reset password (production)

Backend mengirim email dengan link `{RESET_PASSWORD_URL}?token=...`. Di Render/backend, set:

```env
RESET_PASSWORD_URL=https://<domain-web-anda>/reset-password
```

Contoh lokal: `http://localhost:3000/reset-password` (bukan port API `3004`).

Frontend membaca `?token=` di `/reset-password` dan mengirim `POST /api/auth/reset-password`.

## Checklist fitur

| Fitur | Status |
|-------|--------|
| Login / register / logout | ✓ |
| Forgot password (pesan sukses generik) | ✓ |
| Reset password (`?token=` + konfirmasi password) | ✓ |
| Profil protected (`GET /api/auth/me`) | ✓ |
| Kurikulum dari API (subjects, chapters, materials) | ✓ |
| Materi teks & video YouTube + likesCount | ✓ |
| Icon mapel via `VITE_API_URL` + `iconUrl` | ✓ |
