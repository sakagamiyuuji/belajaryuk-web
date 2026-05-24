import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState.jsx';
import LearningLayout from '../components/LearningLayout.jsx';
import { SubjectCardSkeleton } from '../components/LoadingSkeleton.jsx';
import SubjectCard from '../components/SubjectCard.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useSubjects } from '../hooks/useSubjects';
import '../styles/Dashboard.css';

export default function SubjectsHome() {
  const { subjects, loading, error, reload } = useSubjects();
  const { showError } = useToast();

  useEffect(() => {
    if (error) showError(error);
  }, [error, showError]);

  return (
    <LearningLayout>
      <section className="dash-hero-card">
        <h1>Mata Pelajaran</h1>
        <p>Pilih pelajaran untuk melihat bab dan materi pembelajaran.</p>
      </section>

      {loading ? (
        <ul className="dash-subject-list">
          {[1, 2].map((n) => (
            <li key={n}>
              <SubjectCardSkeleton />
            </li>
          ))}
        </ul>
      ) : null}

      {!loading && error ? (
        <EmptyState
          title="Gagal memuat mata pelajaran"
          description={error}
          action={
            <button type="button" className="dash-btn-retry" onClick={reload}>
              Coba lagi
            </button>
          }
        />
      ) : null}

      {!loading && !error && subjects.length === 0 ? (
        <EmptyState
          title="Belum ada mata pelajaran"
          description="Konten kurikulum akan muncul di sini setelah tersedia di server."
        />
      ) : null}

      {!loading && !error && subjects.length > 0 ? (
        <ul className="dash-subject-list">
          {subjects.map((subject) => (
            <li key={subject.id}>
              <SubjectCard subject={subject} to={`/subjects/${subject.id}`} />
            </li>
          ))}
        </ul>
      ) : null}

      <p className="dash-home-footer">
        <Link to="/">← Kembali ke beranda</Link>
      </p>
    </LearningLayout>
  );
}
