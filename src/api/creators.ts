import { API_BASE_URL } from './config';
import { getCookie } from '../utils/cookies';

export interface CreatorApplyRequest {
  fullName: string;
  email: string;
  city: string;
  password: string;
  platform: string;
  handle: string;
  followerCount: string;
  niches: string[];
}

export async function applyCreator(payload: CreatorApplyRequest): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/creators/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
}

export interface CreatorProfileResponse {
  id: string;
  email: string;
  role: string;
  fullName: string;
  city: string;
  platform: string;
  handle: string;
  followerCount: number;
  niches: string[];
  avatarUrl: string | null;
  avatarDeleteUrl: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateCreatorProfileRequest {
  fullName?: string;
  city?: string;
  password?: string;
  platform?: string;
  handle?: string;
  followerCount?: string;
  niches?: string[];
}

function authHeaders(): Record<string, string> {
  const token = getCookie('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function readErrorMessage(res: Response): Promise<string> {
  const body = await res.text().catch(() => '');
  return body ? `: ${body}` : '';
}

export async function getMyProfile(): Promise<CreatorProfileResponse> {
  const res = await fetch(`${API_BASE_URL}/creators/me`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error(`Get profile failed with status ${res.status}${await readErrorMessage(res)}`);
  }

  return res.json();
}

export async function updateMyProfile(payload: UpdateCreatorProfileRequest): Promise<CreatorProfileResponse> {
  const res = await fetch(`${API_BASE_URL}/creators/me`, {
    method: 'PATCH',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Update profile failed with status ${res.status}${await readErrorMessage(res)}`);
  }

  return res.json();
}

export async function updateMyAvatar(avatarFile: File): Promise<CreatorProfileResponse> {
  const form = new FormData();
  form.append('avatar', avatarFile);

  const res = await fetch(`${API_BASE_URL}/creators/me/avatar`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: form,
  });

  if (!res.ok) {
    throw new Error(`Update avatar failed with status ${res.status}${await readErrorMessage(res)}`);
  }

  return res.json();
}

export type CreatorStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export async function listCreators(status?: CreatorStatus): Promise<CreatorProfileResponse[]> {
  const query = status ? `?status=${status}` : '';
  const res = await fetch(`${API_BASE_URL}/creators${query}`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error(`List creators failed with status ${res.status}${await readErrorMessage(res)}`);
  }

  return res.json();
}

export async function getCreator(id: string): Promise<CreatorProfileResponse> {
  const res = await fetch(`${API_BASE_URL}/creators/${id}`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error(`Get creator failed with status ${res.status}${await readErrorMessage(res)}`);
  }

  return res.json();
}

export interface PublicCreator {
  id: string;
  fullName: string;
  handle: string;
  platform: string;
  niches: string[];
  followerCount: number;
  avatarUrl: string | null;
  engagementRate: number;
  campaignsCount: number;
}

export interface PublicCreatorsResponse {
  data: PublicCreator[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export async function listPublicCreators(page = 1): Promise<PublicCreatorsResponse> {
  const res = await fetch(`${API_BASE_URL}/creators/public?page=${page}`);

  if (!res.ok) {
    throw new Error(`List public creators failed with status ${res.status}${await readErrorMessage(res)}`);
  }

  return res.json();
}

export async function updateCreatorStatus(id: string, status: CreatorStatus): Promise<CreatorProfileResponse> {
  const res = await fetch(`${API_BASE_URL}/creators/${id}/status`, {
    method: 'PATCH',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error(`Update creator status failed with status ${res.status}${await readErrorMessage(res)}`);
  }

  return res.json();
}
