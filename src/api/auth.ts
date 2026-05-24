import { apiRequest, setAccessToken } from './client';
import type { AuthLoginData, User } from './types';

export async function register(email: string, password: string): Promise<User> {
  return apiRequest<User>('/api/auth/register', {
    method: 'POST',
    body: { email, password },
  });
}

export async function login(email: string, password: string): Promise<AuthLoginData> {
  const data = await apiRequest<AuthLoginData>('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  });
  setAccessToken(data.accessToken);
  return data;
}

export async function fetchMe(): Promise<User> {
  return apiRequest<User>('/api/auth/me', { auth: true });
}

export async function forgotPassword(email: string): Promise<void> {
  await apiRequest<Record<string, never>>('/api/auth/forgot-password', {
    method: 'POST',
    body: { email },
  });
}

export async function resetPassword(
  token: string,
  newPassword: string,
): Promise<void> {
  await apiRequest<Record<string, never>>('/api/auth/reset-password', {
    method: 'POST',
    body: { token, newPassword },
  });
}

export function logoutLocal(): void {
  setAccessToken(null);
}
