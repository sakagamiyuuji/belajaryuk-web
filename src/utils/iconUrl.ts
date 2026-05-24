import { API_BASE_URL } from '../config/env';

export function resolveIconUrl(iconUrl: string | null | undefined): string {
  if (!iconUrl) return '';
  if (iconUrl.startsWith('http://') || iconUrl.startsWith('https://')) {
    return iconUrl;
  }
  return `${API_BASE_URL}${iconUrl.startsWith('/') ? iconUrl : `/${iconUrl}`}`;
}
