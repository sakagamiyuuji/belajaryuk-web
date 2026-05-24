export const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') ||
  'https://belajaryuk-backend.onrender.com';

export const ACCESS_TOKEN_KEY = 'belajaryuk_access_token';
