import { API_BASE_URL } from './config';
import { getCookie } from '../utils/cookies';

export interface CreateBookingRequest {
  creatorId: string;
  phone: string;
  fullName?: string;
  email?: string;
}

export interface BookingResponse {
  id: string;
  creatorId: string;
  bookerId: string | null;
  fullName: string;
  phone: string;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function createBooking(payload: CreateBookingRequest): Promise<BookingResponse> {
  const token = getCookie('access_token');
  const res = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Create booking failed with status ${res.status}${body ? `: ${body}` : ''}`);
  }

  return res.json();
}

export interface CreateGeneralBookingRequest {
  phone: string;
  message: string;
  fullName?: string;
  email?: string;
}

export interface GeneralBookingResponse {
  id: string;
  bookerId: string | null;
  fullName: string;
  phone: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export async function createGeneralBooking(payload: CreateGeneralBookingRequest): Promise<GeneralBookingResponse> {
  const token = getCookie('access_token');
  const res = await fetch(`${API_BASE_URL}/bookings/general`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Create general booking failed with status ${res.status}${body ? `: ${body}` : ''}`);
  }

  return res.json();
}

export type BookingStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'CANCELLED';

export interface BookingCreatorSummary {
  id: string;
  fullName: string;
  handle: string;
  avatarUrl: string | null;
  platform: string;
}

export interface BookingBookerSummary {
  id: string;
  fullName: string | null;
  email: string;
  role: string;
}

export interface BookingListItem {
  id: string;
  creatorId: string;
  bookerId: string | null;
  fullName: string;
  phone: string;
  email: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  creator: BookingCreatorSummary | null;
  booker: BookingBookerSummary | null;
}

function authHeaders(): Record<string, string> {
  const token = getCookie('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function readErrorMessage(res: Response): Promise<string> {
  const body = await res.text().catch(() => '');
  return body ? `: ${body}` : '';
}

export async function listBookings(): Promise<BookingListItem[]> {
  const res = await fetch(`${API_BASE_URL}/bookings`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error(`List bookings failed with status ${res.status}${await readErrorMessage(res)}`);
  }

  return res.json();
}

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<BookingListItem> {
  const res = await fetch(`${API_BASE_URL}/bookings/${id}/status`, {
    method: 'PATCH',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error(`Update booking status failed with status ${res.status}${await readErrorMessage(res)}`);
  }

  return res.json();
}
