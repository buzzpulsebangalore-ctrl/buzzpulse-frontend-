import { API_BASE_URL } from './config';
import { getCookie } from '../utils/cookies';

export interface AdminDashboardCreatorStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export interface AdminDashboardBookingStats {
  total: number;
  pending: number;
  accepted: number;
  declined: number;
  cancelled: number;
}

export interface WeeklyTrendPoint {
  weekStart: string;
  weekEnd: string;
  creatorSignups: number;
  bookings: number;
}

export interface AdminDashboardResponse {
  creators: AdminDashboardCreatorStats;
  bookings: AdminDashboardBookingStats;
  weeklyTrend: WeeklyTrendPoint[];
}

function authHeaders(): Record<string, string> {
  const token = getCookie('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function readErrorMessage(res: Response): Promise<string> {
  const body = await res.text().catch(() => '');
  return body ? `: ${body}` : '';
}

export async function getAdminDashboard(): Promise<AdminDashboardResponse> {
  const res = await fetch(`${API_BASE_URL}/admin/dashboard`, {
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error(`Get admin dashboard failed with status ${res.status}${await readErrorMessage(res)}`);
  }

  return res.json();
}
