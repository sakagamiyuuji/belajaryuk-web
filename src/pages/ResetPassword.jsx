import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../api/auth';
import { ApiRequestError } from '../api/client';
import AuthLayout from '../components/AuthLayout.jsx';
import PasswordToggleIcon from '../components/PasswordToggleIcon.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get('token') ?? '';

  const [token, setToken] = useState(tokenFromUrl);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { showError } = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!token.trim()) {
      setError('Token reset wajib diisi.');
      return;
    }
    if (newPassword.length < 8) {
      setError('Kata sandi baru minimal 8 karakter.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token.trim(), newPassword);
      navigate('/login', {
        replace: true,
        state: { message: 'Kata sandi berhasil diubah. Silakan masuk.' },
      });
    } catch (err) {
      const message =
        err instanceof ApiRequestError
          ? err.message
          : 'Gagal mengubah kata sandi. Coba lagi.';
      setError(message);
      showError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Reset kata sandi"
      footer={
        <p>
          <Link to="/login">Kembali ke masuk</Link>
        </p>
      }
    >
      <div className="auth-page__card-header">
        <h2>Kata sandi baru</h2>
        <p>Masukkan token dari email dan kata sandi barumu.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {error ? (
          <p className="auth-page__error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="auth-field">
          <label className="auth-field__label visually-hidden" htmlFor="reset-token">
            Token
          </label>
          <div className="auth-field__input-wrap">
            <input
              id="reset-token"
              name="token"
              type="text"
              className="auth-field__input"
              placeholder="Token reset"
              value={token}
              onChange={(ev) => setToken(ev.target.value)}
              required
            />
          </div>
        </div>

        <div className="auth-field">
          <label className="auth-field__label visually-hidden" htmlFor="reset-password">
            Kata sandi baru
          </label>
          <div className="auth-field__input-wrap">
            <input
              id="reset-password"
              name="newPassword"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              className="auth-field__input auth-field__input--with-toggle"
              placeholder="Kata sandi baru (min. 8 karakter)"
              value={newPassword}
              onChange={(ev) => setNewPassword(ev.target.value)}
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
          {loading ? 'Memproses…' : 'Simpan kata sandi'}
        </button>
      </form>
    </AuthLayout>
  );
}
