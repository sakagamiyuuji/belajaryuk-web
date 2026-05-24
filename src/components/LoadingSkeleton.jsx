export function SubjectCardSkeleton() {
  return (
    <li className="dash-subject-card dash-subject-card--skeleton" aria-hidden="true">
      <div className="skeleton skeleton--circle" />
      <div className="skeleton-body">
        <div className="skeleton skeleton--line skeleton--lg" />
        <div className="skeleton skeleton--line" />
        <div className="skeleton skeleton--line skeleton--short" />
      </div>
    </li>
  );
}

export function ChapterSkeleton() {
  return (
    <section className="dash-chapter-card dash-chapter-card--skeleton" aria-hidden="true">
      <div className="skeleton skeleton--line skeleton--lg" />
      <ul className="dash-material-list">
        {[1, 2, 3].map((n) => (
          <li key={n}>
            <div className="dash-material dash-material--skeleton">
              <div className="skeleton skeleton--line" />
              <div className="skeleton skeleton--line skeleton--short" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function MaterialSkeleton() {
  return (
    <article className="dash-article dash-article--skeleton" aria-hidden="true">
      <div className="skeleton skeleton--line skeleton--lg" />
      <div className="skeleton skeleton--line skeleton--short" />
      <div className="skeleton skeleton--block" />
      <div className="skeleton skeleton--line" />
      <div className="skeleton skeleton--line" />
    </article>
  );
}
