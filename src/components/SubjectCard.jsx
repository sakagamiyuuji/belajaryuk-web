import { Link } from 'react-router-dom';
import ExpandableText from './ExpandableText.jsx';
import { resolveIconUrl } from '../utils/iconUrl';

export default function SubjectCard({ subject, to, meta }) {
  const iconSrc = resolveIconUrl(subject.iconUrl);

  return (
    <Link to={to} className="dash-subject-card">
      <div className="dash-subject-card__icon">
        {iconSrc ? <img src={iconSrc} alt="" /> : null}
      </div>
      <div className="dash-subject-card__body">
        <h2>{subject.title}</h2>
        <ExpandableText
          text={subject.description}
          className="expandable-text--card"
          lines={2}
        />
        {meta ? <div className="dash-subject-card__meta">{meta}</div> : null}
      </div>
      <svg className="dash-subject-card__chevron" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M9 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
