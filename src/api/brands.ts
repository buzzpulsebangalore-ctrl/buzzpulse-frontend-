import { API_BASE_URL } from './config';
import { getCookie } from '../utils/cookies';

export interface BrandApplyRequest {
  brandName: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  lookingFor: string;
}

export type BrandStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface BrandResponse {
  id: string;
  brandName: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  lookingFor: string;
  status: BrandStatus;
  createdAt: string;
  updatedAt: string;
}

export async function applyBrand(payload: BrandApplyRequest): Promise<BrandResponse> {
  const res = await fetch(`${API_BASE_URL}/brands/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Brand application failed with status ${res.status}${body ? `: ${body}` : ''}`);
  }

  return res.json();
}

function authHeaders(): Record<string, string> {
  const token = getCookie('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function readErrorMessage(res: Response): Promise<string> {
  const body = await res.text().catch(() => '');
  return body ? `: ${body}` : '';
}

export async function listBrands(status?: BrandStatus): Promise<BrandResponse[]> {
  const query = status ? `?status=${status}` : '';
  const res = await fetch(`${API_BASE_URL}/brands${query}`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error(`List brands failed with status ${res.status}${await readErrorMessage(res)}`);
  }

  return res.json();
}

export async function getBrand(id: string): Promise<BrandResponse> {
  const res = await fetch(`${API_BASE_URL}/brands/${id}`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error(`Get brand failed with status ${res.status}${await readErrorMessage(res)}`);
  }

  return res.json();
}

export async function updateBrandStatus(id: string, status: BrandStatus): Promise<BrandResponse> {
  const res = await fetch(`${API_BASE_URL}/brands/${id}/status`, {
    method: 'PATCH',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error(`Update brand status failed with status ${res.status}${await readErrorMessage(res)}`);
  }

  return res.json();
}
