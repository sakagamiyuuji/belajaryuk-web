import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/auth';
import { ApiRequestError } from '../api/client';
import AuthLayout from '../components/AuthLayout.jsx';
import PasswordToggleIcon from '../components/PasswordToggleIcon.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function Register() {
  const navigate = useNavigate();
  const { showError } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email wajib diisi.');
      return;
    }
    if (password.length < 8) {
      setError('Kata sandi minimal 8 karakter.');
      return;
    }

    setLoading(true);
    try {
      await register(email.trim(), password);
      navigate('/login', {
        replace: true,
        state: { message: 'Akun berhasil dibuat. Silakan masuk.' },
      });
    } catch (err) {
      const message =
        err instanceof ApiRequestError
          ? err.message
          : 'Gagal mendaftar. Coba lagi.';
      setError(message);
      showError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Daftar"
      footer={
        <p>
          Sudah punya akun? <Link to="/login">Masuk</Link>
        </p>
      }
    >
      <div className="auth-page__card-header">
        <h2>Buat Akun</h2>
        <p>Daftar untuk mulai belajar bersama BelajarYuk</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {error ? (
          <p className="auth-page__error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="auth-field">
          <label className="auth-field__label visually-hidden" htmlFor="register-email">
            Email
          </label>
          <div className="auth-field__input-wrap">
            <svg className="auth-field__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              className="auth-field__input"
              placeholder="Email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              required
            />
          </div>
        </div>

        <div className="auth-field">
          <label className="auth-field__label visually-hidden" htmlFor="register-password">
            Kata sandi
          </label>
          <div className="auth-field__input-wrap">
            <svg className="auth-field__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              id="register-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              className="auth-field__input auth-field__input--with-toggle"
              placeholder="Kata sandi (min. 8 karakter)"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              minLength={8}
              required
            />
            <button
              type="button"
              className="auth-field__toggle"
              aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
              onClick={() => setShowPassword((v) => !v)}
            >
              <PasswordToggleIcon visible={showPassword} />
            </button>
          </div>
        </div>

        <button type="submit" className="auth-page__submit" disabled={loading}>
          {loading ? 'Memproses…' : 'Daftar'}
        </button>
      </form>
    </AuthLayout>
  );
}
