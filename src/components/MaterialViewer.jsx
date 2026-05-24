import { formatLikes } from '../utils/formatLikes';
import { toYoutubeEmbedUrl } from '../utils/youtube';

function formatContent(body) {
  if (!body) return [];
  return body.split(/\n\n+/).filter(Boolean);
}

export default function MaterialViewer({ material }) {
  const embedUrl =
    material.contentType === 'video' ? toYoutubeEmbedUrl(material.videoUrl) : null;
  const paragraphs =
    material.contentType === 'text' ? formatContent(material.contentBody) : [];

  return (
    <article className="dash-article">
      <div className="dash-article__head">
        <h2>{material.title}</h2>
        <div className="dash-article__meta">
          <span className="dash-article__likes">
            {formatLikes(material.likesCount)} suka
          </span>
          <span className="dash-article__type">
            {material.contentType === 'video' ? 'Video' : 'Bacaan'}
          </span>
        </div>
      </div>

      {material.contentType === 'video' && embedUrl ? (
        <div className="dash-video">
          <iframe
            src={embedUrl}
            title={material.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : null}

      {material.contentType === 'text' && paragraphs.length > 0 ? (
        <div className="dash-article__body dash-article__body--pre">
          {paragraphs.map((block) => {
            const lines = block.split('\n');
            const heading = lines[0]?.endsWith(':') ? lines[0] : null;
            const rest = heading ? lines.slice(1) : lines;

            return (
              <section key={block.slice(0, 48)} className="dash-article__section">
                {heading ? <h3>{heading.replace(/:$/, '')}</h3> : null}
                <div className="dash-article__section-text whitespace-pre-line">
                  {rest.join('\n')}
                </div>
              </section>
            );
          })}
        </div>
      ) : null}

      {material.contentType === 'text' && paragraphs.length === 0 && material.contentBody ? (
        <div className="dash-article__body whitespace-pre-line">{material.contentBody}</div>
      ) : null}

      {material.contentType === 'text' && !material.contentBody ? (
        <p className="dash-article__empty">Konten materi belum tersedia.</p>
      ) : null}

      {material.contentType === 'video' && !embedUrl ? (
        <p className="dash-article__empty">Video belum tersedia.</p>
      ) : null}
    </article>
  );
}
