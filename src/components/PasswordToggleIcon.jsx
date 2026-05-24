function PasswordToggleIcon({ visible }) {
  if (visible) {
    return (
      <svg className="auth-field__toggle-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9.9 5.1A9.8 9.8 0 0 1 12 5c5 0 9 4 10 7-0.4 1-1.1 2.2-2.1 3.3M6.1 6.1C4.2 7.4 2.8 9.1 2 11c1 3 5 7 10 7 1.1 0 2.1-0.2 3.1-0.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className="auth-field__toggle-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default PasswordToggleIcon;
