import { useLayoutEffect, useRef, useState } from 'react';

export default function ExpandableText({
  text,
  className = '',
  lines = 2,
  moreLabel = 'Selengkapnya',
  lessLabel = 'Sembunyikan',
}) {
  const contentRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el || expanded) return;

    const measure = () => {
      setTruncated(el.scrollHeight > el.clientHeight + 1);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [text, lines, expanded]);

  function handleToggle(e) {
    e.preventDefault();
    e.stopPropagation();
    setExpanded((v) => !v);
  }

  const showToggle = truncated || expanded;
  const clamped = !expanded && truncated;

  return (
    <div className={`expandable-text ${className}`.trim()}>
      <p
        ref={contentRef}
        className={`expandable-text__content${clamped ? ' expandable-text__content--clamped' : ''}`}
        style={clamped ? { WebkitLineClamp: lines } : undefined}
      >
        {text}
        {expanded && showToggle ? (
          <>
            {' '}
            <button
              type="button"
              className="expandable-text__toggle"
              onClick={handleToggle}
              aria-expanded
            >
              {lessLabel}
            </button>
          </>
        ) : null}
      </p>
      {clamped && showToggle ? (
        <button
          type="button"
          className="expandable-text__toggle expandable-text__toggle--end"
          onClick={handleToggle}
          aria-expanded={false}
        >
          {moreLabel}
        </button>
      ) : null}
    </div>
  );
}
