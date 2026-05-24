import { API_BASE_URL, ACCESS_TOKEN_KEY } from '../config/env';
import type { ApiErrorBody, ApiSuccess } from './types';

export class ApiRequestError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
  }
}

type RequestOptions = RequestInit & {
  auth?: boolean;
  body?: unknown;
};

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string | null): void {
  if (token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { auth = false, body, headers: customHeaders, ...init } = options;

  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(customHeaders as Record<string, string>),
  };

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  if (auth) {
    const token = getAccessToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let payload: ApiSuccess<T> | ApiErrorBody;
  try {
    payload = (await response.json()) as ApiSuccess<T> | ApiErrorBody;
  } catch {
    throw new ApiRequestError('Respons server tidak valid.', response.status);
  }

  if (!payload.success) {
    throw new ApiRequestError(payload.error, response.status);
  }

  return payload.data;
}
