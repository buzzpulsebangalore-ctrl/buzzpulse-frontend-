import { API_BASE_URL } from './config';
import { getCookie } from '../utils/cookies';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    fullName: string | null;
    role: string;
  };
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Login request failed with status ${res.status}${body ? `: ${body}` : ''}`);
  }

  return res.json();
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export async function changePassword(payload: ChangePasswordRequest): Promise<{ message: string }> {
  const token = getCookie('access_token');
  const res = await fetch(`${API_BASE_URL}/auth/change-password`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Change password failed with status ${res.status}${body ? `: ${body}` : ''}`);
  }

  return res.json();
}
