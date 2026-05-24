import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ApiRequestError } from '../api/client';
import AuthLayout from '../components/AuthLayout.jsx';
import PasswordToggleIcon from '../components/PasswordToggleIcon.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

const REMEMBER_EMAIL_KEY = 'belajaryuk_remember_email';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, initializing } = useAuth();
  const { showError } = useToast();
  const redirectTo = location.state?.from || '/subjects';
  const successMessage = location.state?.message;

  const [email, setEmail] = useState(
    () => localStorage.getItem(REMEMBER_EMAIL_KEY) || '',
  );
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(
    () => Boolean(localStorage.getItem(REMEMBER_EMAIL_KEY)),
  );
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!initializing && isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Email dan kata sandi wajib diisi.');
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);

      if (remember) {
        localStorage.setItem(REMEMBER_EMAIL_KEY, email.trim());
      } else {
        localStorage.removeItem(REMEMBER_EMAIL_KEY);
      }

      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message =
        err instanceof ApiRequestError
          ? err.message
          : 'Gagal masuk. Periksa email dan kata sandi.';
      setError(message);
      showError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Masuk"
      footer={
        <p>
          Belum punya akun? <Link to="/register">Daftar</Link>
        </p>
      }
    >
      <div className="auth-page__card-header">
        <h2>Selamat Datang Kembali</h2>
        <p>Masuk ke akunmu untuk melanjutkan belajar</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {successMessage ? (
          <p className="auth-page__success" role="status">
            {successMessage}
          </p>
        ) : null}
        {error ? (
          <p className="auth-page__error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="auth-field">
          <label className="auth-field__label visually-hidden" htmlFor="login-email">
            Email
          </label>
          <div className="auth-field__input-wrap">
            <svg className="auth-field__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              id="login-email"
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
          <label className="auth-field__label visually-hidden" htmlFor="login-password">
            Kata sandi
          </label>
          <div className="auth-field__input-wrap">
            <svg className="auth-field__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              id="login-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              className="auth-field__input auth-field__input--with-toggle"
              placeholder="Kata sandi"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
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

        <div className="auth-page__row">
          <label className="auth-page__remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={(ev) => setRemember(ev.target.checked)}
            />
            Ingat saya
          </label>
          <Link to="/forgot-password" className="auth-page__link">
            Lupa kata sandi?
          </Link>
        </div>

        <button type="submit" className="auth-page__submit" disabled={loading}>
          {loading ? 'Memproses…' : 'Masuk'}
        </button>
      </form>
    </AuthLayout>
  );
}
