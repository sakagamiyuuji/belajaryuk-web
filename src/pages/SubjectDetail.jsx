import { useEffect, useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import BackLink from '../components/BackLink.jsx';
import ChapterList from '../components/ChapterList.jsx';
import ExpandableText from '../components/ExpandableText.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { ChapterSkeleton } from '../components/LoadingSkeleton.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useSubject } from '../hooks/useSubject';
import { isMaterialCompleted } from '../utils/progress.js';
import { resolveIconUrl } from '../utils/iconUrl';
import '../styles/Dashboard.css';

export default function SubjectDetail() {
  const { subjectId } = useParams();
  const { subject, loading, error, reload } = useSubject(subjectId);
  const { showError } = useToast();

  const chapters = useMemo(() => {
    if (!subject?.chapters) return [];
    return [...subject.chapters].sort((a, b) => a.orderIndex - b.orderIndex);
  }, [subject]);

  useEffect(() => {
    if (error) showError(error);
  }, [error, showError]);

  if (!loading && error && !subject) {
    return (
      <div className="dash dash--subject">
        <header className="dash-header dash-header--subject">
          <BackLink to="/subjects" />
        </header>
        <main className="dash-content dash-content--chapters">
          <EmptyState
            title="Mata pelajaran tidak ditemukan"
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

  if (!loading && !subject) {
    return <Navigate to="/subjects" replace />;
  }

  const iconSrc = subject ? resolveIconUrl(subject.iconUrl) : '';

  return (
    <div className="dash dash--subject">
      <header className="dash-header dash-header--subject">
        <BackLink to="/subjects" />
        {subject ? (
          <div className="dash-header__subject">
            <div className="dash-header__icon-wrap">
              {iconSrc ? <img src={iconSrc} alt="" /> : null}
            </div>
            <div>
              <h1>{subject.title}</h1>
              <ExpandableText
                text={subject.description}
                className="expandable-text--header"
                lines={3}
              />
            </div>
          </div>
        ) : (
          <div className="skeleton skeleton--line skeleton--lg" aria-hidden="true" />
        )}
        <div className="dash-header__curve" aria-hidden="true" />
      </header>

      <main className="dash-content dash-content--chapters">
        {loading ? (
          <>
            <ChapterSkeleton />
            <ChapterSkeleton />
          </>
        ) : null}

        {!loading && chapters.length === 0 ? (
          <EmptyState
            title="Belum ada bab"
            description="Bab pembelajaran untuk mata pelajaran ini belum tersedia."
          />
        ) : null}

        {!loading && chapters.length > 0 && subject ? (
          <ChapterList
            chapters={chapters.map((chapter) => ({
              ...chapter,
              materials: [...(chapter.materials ?? [])].sort(
                (a, b) => a.orderIndex - b.orderIndex,
              ),
            }))}
            subjectId={subject.id}
            isMaterialCompleted={isMaterialCompleted}
          />
        ) : null}
      </main>

      <p className="dash-subject-footer">
        <Link to="/subjects">← Semua mata pelajaran</Link>
      </p>
    </div>
  );
}
