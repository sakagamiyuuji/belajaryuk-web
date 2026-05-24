import { Link } from 'react-router-dom';

export default function BackLink({ to, children = 'Kembali' }) {
  return (
    <Link to={to} className="dash-back">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M15 6l-6 6 6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </Link>
  );
}
