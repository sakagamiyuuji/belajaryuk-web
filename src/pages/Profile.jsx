import { Link } from 'react-router-dom';
import LearningLayout from '../components/LearningLayout.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/Dashboard.css';

export default function Profile() {
  const { user } = useAuth();

  return (
    <LearningLayout greet="Profil akunmu">
      <section className="dash-hero-card dash-profile-card">
        <h1>Profil</h1>
        {user ? (
          <dl className="dash-profile-dl">
            <div>
              <dt>Email</dt>
              <dd>{user.email}</dd>
            </div>
            <div>
              <dt>Bergabung</dt>
              <dd>
                {new Date(user.createdAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </dd>
            </div>
          </dl>
        ) : null}
        <p className="dash-profile-actions">
          <Link to="/subjects" className="dash-btn-retry">
            Lanjut belajar
          </Link>
        </p>
      </section>
    </LearningLayout>
  );
}
