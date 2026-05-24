import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function LearningLayout({ children, greet }) {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate('/', { replace: true });
  }

  return (
    <div className="dash">
      <header className="dash-topbar">
        <div className="dash-topbar__brand">
          <Link to="/subjects" className="dash-topbar__logo">
            BelajarYuk
          </Link>
          <p className="dash-topbar__greet">
            {greet ??
              (isAuthenticated && user?.email
                ? `Halo, ${user.email.split('@')[0]}! Siap belajar hari ini?`
                : 'Jelajahi mata pelajaran dan mulai belajar.')}
          </p>
        </div>
        <nav className="dash-topbar__actions" aria-label="Akun">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="dash-topbar__link">
                Profil
              </Link>
              <button type="button" className="dash-topbar__logout" onClick={handleLogout}>
                Keluar
              </button>
            </>
          ) : (
            <Link to="/login" className="dash-topbar__logout">
              Masuk
            </Link>
          )}
        </nav>
      </header>
      <main className="dash-main">{children}</main>
    </div>
  );
}
