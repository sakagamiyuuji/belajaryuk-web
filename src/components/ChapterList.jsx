import MaterialListItem from './MaterialListItem';

export default function ChapterList({
  chapters,
  subjectId,
  isMaterialCompleted,
  renderTrailing,
}) {
  return chapters.map((chapter) => {
    const materials = chapter.materials ?? [];

    return (
      <section key={chapter.id} className="dash-chapter-card">
        <h2>{chapter.title}</h2>
        <ul className="dash-material-list">
          {materials.map((material) => {
            const materialPath = `/subjects/${subjectId}/${chapter.id}/${material.id}`;
            const done = isMaterialCompleted?.(subjectId, chapter.id, material.id);

            return (
              <li key={material.id}>
                <MaterialListItem
                  material={material}
                  to={materialPath}
                  trailing={
                    renderTrailing?.(done) ??
                    (done ? (
                      <span className="dash-material__done" aria-label="Selesai dibaca">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M5 13l4 4L19 7"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    ) : null)
                  }
                />
              </li>
            );
          })}
        </ul>
      </section>
    );
  });
}
