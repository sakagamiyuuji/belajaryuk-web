import { Link } from 'react-router-dom';
import likeIcon from '../assets/ic-like.svg';
import { formatLikes } from '../utils/formatLikes';

function VideoBadge() {
  return (
    <span className="dash-material__badge">
      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M3 3h10v10H3V3zm4 2v6l5-3-5-3z" />
      </svg>
      Video
    </span>
  );
}

function TextBadge() {
  return <span className="dash-material__badge dash-material__badge--text">Bacaan</span>;
}

export default function MaterialListItem({ material, to, trailing }) {
  return (
    <Link to={to} className="dash-material">
      <div className="dash-material__title-row">
        <span className="dash-material__title">{material.title}</span>
        {material.contentType === 'video' ? <VideoBadge /> : <TextBadge />}
      </div>
      <div className="dash-material__footer">
        <span className="dash-material__likes">
          <img
            src={likeIcon}
            alt=""
            className="dash-material__like-icon"
            width={18}
            height={18}
            aria-hidden="true"
          />
          {formatLikes(material.likesCount)}
        </span>
        {trailing ?? null}
      </div>
    </Link>
  );
}
