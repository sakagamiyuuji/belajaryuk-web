import { useEffect, useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import BackLink from '../components/BackLink.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { MaterialSkeleton } from '../components/LoadingSkeleton.jsx';
import MaterialViewer from '../components/MaterialViewer.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useMaterial } from '../hooks/useMaterial';
import { useSubject } from '../hooks/useSubject';
import { markMaterialCompleted } from '../utils/progress.js';
import '../styles/Dashboard.css';

export default function MaterialDetail() {
  const { subjectId, chapterId, materialId } = useParams();
  const { material, loading, error, reload } = useMaterial(materialId);
  const { subject } = useSubject(subjectId);
  const { showError } = useToast();

  const chapterTitle = useMemo(() => {
    if (!subject?.chapters || !chapterId) return null;
    return subject.chapters.find((c) => c.id === chapterId)?.title ?? null;
  }, [subject, chapterId]);

  useEffect(() => {
    if (error) showError(error);
  }, [error, showError]);

  useEffect(() => {
    if (subjectId && chapterId && materialId && material) {
      markMaterialCompleted(subjectId, chapterId, materialId);
    }
  }, [subjectId, chapterId, materialId, material]);

  const backTo = subjectId ? `/subjects/${subjectId}` : '/subjects';

  if (!loading && error && !material) {
    return (
      <div className="dash dash--material">
        <header className="dash-header dash-header--material">
          <BackLink to={backTo} />
        </header>
        <main className="dash-content dash-content--material">
          <EmptyState
            title="Materi tidak ditemukan"
            description={error}
            action={
              <button type="button" className="dash-btn-retry" onClick={reload}>
                Coba lagi
              </button>
            }
          />
        </main>
      </div>
    );
  }

  if (!loading && !material) {
    return <Navigate to={backTo} replace />;
  }

  return (
    <div className="dash dash--material">
      <header className="dash-header dash-header--material">
        <BackLink to={backTo} />
        <h1>{chapterTitle ?? 'Materi'}</h1>
        <div className="dash-header__curve" aria-hidden="true" />
      </header>

      <main className="dash-content dash-content--material">
        {loading ? <MaterialSkeleton /> : null}
        {!loading && material ? <MaterialViewer material={material} /> : null}
      </main>

      <p className="dash-subject-footer">
        <Link to={backTo}>← Kembali ke daftar materi</Link>
      </p>
    </div>
  );
}
