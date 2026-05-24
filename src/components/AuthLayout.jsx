import { Link } from 'react-router-dom';
import '../styles/Auth.css';

export default function AuthLayout({ title, children, footer }) {
  return (
    <div className="auth-page">
      <header className="auth-page__header">
        <Link to="/" className="auth-page__back" aria-label="Kembali ke beranda">
          ←
        </Link>
        <Link to="/" className="auth-page__logo">BelajarYuk</Link>
      </header>

      <div className="auth-page__body">
        <h1 className="auth-page__heading">{title}</h1>

        <div className="auth-page__card">
          {children}
        </div>
      </div>

      {footer ? <div className="auth-page__footer">{footer}</div> : null}
    </div>
  );
}
