export function toYoutubeEmbedUrl(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url.trim());

    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.replace(/^\//, '').split('/')[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (!parsed.hostname.includes('youtube.com') && !parsed.hostname.includes('youtube-nocookie.com')) {
      return null;
    }

    const pathParts = parsed.pathname.split('/').filter(Boolean);

    if (pathParts[0] === 'embed' && pathParts[1]) {
      return `https://www.youtube.com/embed/${pathParts[1]}`;
    }

    if (pathParts[0] === 'shorts' && pathParts[1]) {
      return `https://www.youtube.com/embed/${pathParts[1]}`;
    }

    const id = parsed.searchParams.get('v');
    if (id) return `https://www.youtube.com/embed/${id}`;
  } catch {
    return null;
  }

  return null;
}
