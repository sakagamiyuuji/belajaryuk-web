import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../api/auth';
import AuthLayout from '../components/AuthLayout.jsx';

const GENERIC_SUCCESS =
  'Jika email terdaftar, link reset telah dikirim. Periksa kotak masuk atau folder spam.';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email wajib diisi.');
      return;
    }

    setLoading(true);
    try {
      await forgotPassword(email.trim());
    } catch {
      // Jangan bocorkan apakah email terdaftar — tampilkan pesan sukses generik sama.
    } finally {
      setLoading(false);
      setSent(true);
    }
  }

  return (
    <AuthLayout
      title="Lupa kata sandi"
      footer={
        <p>
          Ingat kata sandi? <Link to="/login">Masuk</Link>
        </p>
      }
    >
      <div className="auth-page__card-header">
        <h2>Reset kata sandi</h2>
        <p>
          {sent
            ? GENERIC_SUCCESS
            : 'Masukkan email akunmu untuk menerima tautan reset.'}
        </p>
      </div>

      {sent ? (
        <p className="auth-page__success" role="status">
          {GENERIC_SUCCESS}
        </p>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {error ? (
            <p className="auth-page__error" role="alert">
              {error}
            </p>
          ) : null}

          <div className="auth-field">
            <label className="auth-field__label visually-hidden" htmlFor="forgot-email">
              Email
            </label>
            <div className="auth-field__input-wrap">
              <input
                id="forgot-email"
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

          <button type="submit" className="auth-page__submit" disabled={loading}>
            {loading ? 'Mengirim…' : 'Kirim instruksi'}
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
