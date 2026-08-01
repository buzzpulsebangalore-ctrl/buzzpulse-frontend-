import { useEffect, useMemo, useState } from 'react';
import {
  X,
  Menu,
  Search,
  LayoutDashboard,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Mail,
  MapPin,
  CalendarDays,
  CalendarCheck,
  Briefcase,
  Phone,
  Loader2,
} from 'lucide-react';
import {
  listCreators,
  updateCreatorStatus,
  type CreatorProfileResponse,
  type CreatorStatus,
} from '../api/creators';
import {
  listBookings,
  updateBookingStatus,
  type BookingListItem,
  type BookingStatus,
} from '../api/bookings';
import {
  listBrands,
  updateBrandStatus,
  type BrandResponse,
  type BrandStatus,
} from '../api/brands';
import { getAdminDashboard, type AdminDashboardResponse } from '../api/dashboard';
import { deleteCookie, getCookie } from '../utils/cookies';
import { toast } from './Toast';
import AccountMenu from './AccountMenu';
import SidebarProfileCard from './SidebarProfileCard';
import WeeklyTrendChart from './WeeklyTrendChart';
import { getInitials, formatFollowers } from '../utils/format';

type View = 'overview' | 'users' | 'bookings' | 'brands';
type StatusFilter = 'All' | CreatorStatus;
type BookingStatusFilter = 'All' | BookingStatus;
type BrandStatusFilter = 'All' | BrandStatus;

const statusFilters: StatusFilter[] = ['All', 'PENDING', 'APPROVED', 'REJECTED'];
const bookingStatusFilters: BookingStatusFilter[] = ['All', 'PENDING', 'ACCEPTED', 'DECLINED', 'CANCELLED'];
const brandStatusFilters: BrandStatusFilter[] = ['All', 'PENDING', 'APPROVED', 'REJECTED'];

function redirectToLogin() {
  deleteCookie('access_token');
  deleteCookie('role');
  window.location.assign('/');
}

function StatusBadge({ status }: { status: string }) {
  const s = status.toUpperCase();
  const cls =
    s === 'APPROVED' || s === 'ACCEPTED'
      ? 'badge-approved'
      : s === 'REJECTED' || s === 'DECLINED' || s === 'CANCELLED'
        ? 'badge-rejected'
        : 'badge-pending';
  return <span className={`admin-badge ${cls}`}>{status}</span>;
}

function DetailModal({
  creator,
  busy,
  onClose,
  onSetStatus,
}: {
  creator: CreatorProfileResponse;
  busy: boolean;
  onClose: () => void;
  onSetStatus: (status: CreatorStatus) => void;
}) {
  const initials = getInitials(creator.fullName);

  return (
    <div className="modal-overlay admin-modal" onClick={onClose}>
      <div className="modal-card profile-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          <X size={20} strokeWidth={2} style={{ border: 'none' }} />
        </button>

        <div className="profile-banner" />
        <div className="profile-header">
          <div className="profile-avatar">
            {creator.avatarUrl ? <img src={creator.avatarUrl} alt="" /> : initials}
          </div>
          <div className="profile-header-info">
            <div className="profile-name-row">
              <span className="profile-name">{creator.fullName}</span>
              <StatusBadge status={creator.status} />
            </div>
            <div className="profile-handle">
              {creator.handle} &middot; {creator.platform}
            </div>
          </div>
        </div>

        <div className="profile-stats">
          <div className="profile-stat">
            <b>{formatFollowers(creator.followerCount)}</b>
            <span>Followers</span>
          </div>
          <div className="profile-stat">
            <b>{creator.niches.length}</b>
            <span>Niches</span>
          </div>
          <div className="profile-stat">
            <b>{new Date(creator.createdAt).getFullYear()}</b>
            <span>Member since</span>
          </div>
        </div>

        <div className="profile-info-list">
          <div className="profile-info-row">
            <Mail size={16} strokeWidth={2} style={{ border: 'none' }} />
            {creator.email}
          </div>
          <div className="profile-info-row">
            <MapPin size={16} strokeWidth={2} style={{ border: 'none' }} />
            {creator.city}
          </div>
          <div className="profile-info-row">
            <CalendarDays size={16} strokeWidth={2} style={{ border: 'none' }} />
            Applied {new Date(creator.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="profile-niches">
          {creator.niches.map((n) => (
            <span key={n} className="tag t-violet">
              {n}
            </span>
          ))}
        </div>

        <div className="frow profile-modal-actions">
          <button className="btn btn-ghost" onClick={() => onSetStatus('REJECTED')} disabled={busy}>
            Reject
          </button>
          <button className="btn btn-ghost" onClick={() => onSetStatus('PENDING')} disabled={busy}>
            Reset
          </button>
          <button className="btn btn-ink" onClick={() => onSetStatus('APPROVED')} disabled={busy}>
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [view, setView] = useState<View>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [creators, setCreators] = useState<CreatorProfileResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('All');
  const [selected, setSelected] = useState<CreatorProfileResponse | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [bookings, setBookings] = useState<BookingListItem[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsLoaded, setBookingsLoaded] = useState(false);
  const [bookingsError, setBookingsError] = useState('');
  const [bookingQuery, setBookingQuery] = useState('');
  const [bookingStatus, setBookingStatus] = useState<BookingStatusFilter>('All');
  const [updatingBookingId, setUpdatingBookingId] = useState<string | null>(null);
  const [updatingBookingAction, setUpdatingBookingAction] = useState<BookingStatus | null>(null);

  const [brands, setBrands] = useState<BrandResponse[]>([]);
  const [brandsLoading, setBrandsLoading] = useState(true);
  const [brandsLoaded, setBrandsLoaded] = useState(false);
  const [brandsError, setBrandsError] = useState('');
  const [brandQuery, setBrandQuery] = useState('');
  const [brandStatus, setBrandStatus] = useState<BrandStatusFilter>('All');
  const [updatingBrandId, setUpdatingBrandId] = useState<string | null>(null);
  const [updatingBrandAction, setUpdatingBrandAction] = useState<BrandStatus | null>(null);

  const [dashboard, setDashboard] = useState<AdminDashboardResponse | null>(null);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState('');

  useEffect(() => {
    if (!getCookie('access_token')) {
      redirectToLogin();
      return;
    }
    loadCreators();
    loadDashboard();
  }, []);

  function loadDashboard() {
    setDashboardLoading(true);
    setDashboardError('');
    getAdminDashboard()
      .then(setDashboard)
      .catch((err) => {
        console.error('Failed to load admin dashboard:', err);
        if (String(err.message).includes('401') || String(err.message).includes('403')) {
          redirectToLogin();
          return;
        }
        setDashboardError("Couldn't load dashboard stats. Please try again.");
      })
      .finally(() => setDashboardLoading(false));
  }

  useEffect(() => {
    if (view === 'bookings' && !bookingsLoaded) {
      loadBookings();
    }
  }, [view, bookingsLoaded]);

  useEffect(() => {
    if (view === 'brands' && !brandsLoaded) {
      loadBrands();
    }
  }, [view, brandsLoaded]);

  function loadCreators() {
    setLoading(true);
    setLoadError('');
    listCreators()
      .then(setCreators)
      .catch((err) => {
        console.error('Failed to load creators:', err);
        if (String(err.message).includes('401') || String(err.message).includes('403')) {
          redirectToLogin();
          return;
        }
        setLoadError("Couldn't load creators. Please try again.");
      })
      .finally(() => setLoading(false));
  }

  function loadBookings() {
    setBookingsLoading(true);
    setBookingsError('');
    listBookings()
      .then((res) => {
        setBookings(res);
        setBookingsLoaded(true);
      })
      .catch((err) => {
        console.error('Failed to load booking requests:', err);
        if (String(err.message).includes('401') || String(err.message).includes('403')) {
          redirectToLogin();
          return;
        }
        setBookingsError("Couldn't load booking requests. Please try again.");
      })
      .finally(() => setBookingsLoading(false));
  }

  function loadBrands() {
    setBrandsLoading(true);
    setBrandsError('');
    listBrands()
      .then((res) => {
        setBrands(res);
        setBrandsLoaded(true);
      })
      .catch((err) => {
        console.error('Failed to load brand requests:', err);
        if (String(err.message).includes('401') || String(err.message).includes('403')) {
          redirectToLogin();
          return;
        }
        setBrandsError("Couldn't load brand requests. Please try again.");
      })
      .finally(() => setBrandsLoading(false));
  }

  const filteredBrands = useMemo(() => {
    return brands.filter((b) => {
      const matchesStatus = brandStatus === 'All' || b.status === brandStatus;
      const q = brandQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        b.brandName.toLowerCase().includes(q) ||
        b.companyName.toLowerCase().includes(q) ||
        b.contactName.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [brands, brandQuery, brandStatus]);

  async function handleSetBrandStatus(id: string, next: BrandStatus) {
    setUpdatingBrandId(id);
    setUpdatingBrandAction(next);
    try {
      const updated = await updateBrandStatus(id, next);
      setBrands((prev) => prev.map((b) => (b.id === id ? updated : b)));
      toast(`Brand marked as ${next.toLowerCase()}`, 'success');
    } catch (err) {
      console.error('Failed to update brand status:', err);
      toast("Couldn't update brand. Please try again.", 'error');
    } finally {
      setUpdatingBrandId(null);
      setUpdatingBrandAction(null);
    }
  }

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesStatus = bookingStatus === 'All' || b.status === bookingStatus;
      const q = bookingQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        b.fullName.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        Boolean(b.creator?.fullName.toLowerCase().includes(q)) ||
        Boolean(b.creator?.handle.toLowerCase().includes(q));
      return matchesStatus && matchesQuery;
    });
  }, [bookings, bookingQuery, bookingStatus]);

  async function handleSetBookingStatus(id: string, next: BookingStatus) {
    setUpdatingBookingId(id);
    setUpdatingBookingAction(next);
    try {
      const updated = await updateBookingStatus(id, next);
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, ...updated, creator: updated.creator ?? b.creator, booker: updated.booker ?? b.booker } : b
        )
      );
      toast(`Booking marked as ${next.toLowerCase()}`, 'success');
    } catch (err) {
      console.error('Failed to update booking status:', err);
      toast("Couldn't update booking. Please try again.", 'error');
    } finally {
      setUpdatingBookingId(null);
      setUpdatingBookingAction(null);
    }
  }

  const filtered = useMemo(() => {
    return creators.filter((c) => {
      const matchesStatus = status === 'All' || c.status.toUpperCase() === status;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        c.fullName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.handle.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [creators, query, status]);

  async function handleSetStatus(id: string, next: CreatorStatus) {
    setUpdatingId(id);
    try {
      const updated = await updateCreatorStatus(id, next);
      setCreators((prev) => prev.map((c) => (c.id === id ? updated : c)));
      setSelected(updated);
      toast(`Marked as ${next.toLowerCase()}`, 'success');
    } catch (err) {
      console.error('Failed to update status:', err);
      toast("Couldn't update status. Please try again.", 'error');
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="admin">
      <div className="admin-topbar">
        <div className="admin-topbar-in admin-topbar-full">
          <div className="admin-topbar-left">
            <button
              type="button"
              className="admin-menu-btn"
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} strokeWidth={2} style={{ border: 'none' }} />
            </button>
            <div className="logo">
              <img src="/BP-logo-transparent.png" alt="BuzzPulse" className="logo-full" width={82} height={40} />
            </div>
          </div>
          <AccountMenu />
        </div>
      </div>

      <div className="admin-shell">
        {sidebarOpen && <div className="admin-sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}
        <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <button
            type="button"
            className="admin-sidebar-close"
            aria-label="Close menu"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} strokeWidth={2} style={{ border: 'none' }} />
          </button>
          <button
            type="button"
            className={`admin-nav-item ${view === 'overview' ? 'on' : ''}`}
            onClick={() => {
              setView('overview');
              setSidebarOpen(false);
            }}
          >
            <LayoutDashboard size={17} strokeWidth={2} style={{ border: 'none' }} />
            Overview
          </button>
          <button
            type="button"
            className={`admin-nav-item ${view === 'users' ? 'on' : ''}`}
            onClick={() => {
              setView('users');
              setSidebarOpen(false);
            }}
          >
            <Users size={17} strokeWidth={2} style={{ border: 'none' }} />
            Creator list
          </button>
          <button
            type="button"
            className={`admin-nav-item ${view === 'bookings' ? 'on' : ''}`}
            onClick={() => {
              setView('bookings');
              setSidebarOpen(false);
            }}
          >
            <CalendarCheck size={17} strokeWidth={2} style={{ border: 'none' }} />
            Booking requests
          </button>
          <button
            type="button"
            className={`admin-nav-item ${view === 'brands' ? 'on' : ''}`}
            onClick={() => {
              setView('brands');
              setSidebarOpen(false);
            }}
          >
            <Briefcase size={17} strokeWidth={2} style={{ border: 'none' }} />
            Brand requests
          </button>

          <SidebarProfileCard />
        </aside>

        <div className="admin-main">
          {view !== 'bookings' && view !== 'brands' && !loading && loadError && <p className="admin-sub">{loadError}</p>}

          {view === 'overview' && (
            <>
              <h1 className="admin-title">Overview</h1>
              <p className="admin-sub">A quick look at the creator network.</p>

              {!dashboardLoading && dashboardError && <p className="admin-sub">{dashboardError}</p>}

              {!dashboardError && (
                <>
                  <div className="admin-stats">
                    {dashboardLoading || !dashboard
                      ? Array.from({ length: 4 }, (_, i) => (
                          <div key={i} className="admin-stat admin-stat-skel">
                            <div className="admin-skel-icon" />
                            <div className="admin-skel-num" />
                            <div className="admin-skel-label" />
                          </div>
                        ))
                      : (
                        <>
                          <div className="admin-stat admin-stat-total">
                            <Users size={26} strokeWidth={1.8} className="stat-icon" style={{ border: 'none' }} />
                            <b>{dashboard.creators.total}</b>
                            <span>Total</span>
                          </div>
                          <div className="admin-stat admin-stat-pending">
                            <Clock size={26} strokeWidth={1.8} className="stat-icon" style={{ border: 'none' }} />
                            <b>{dashboard.creators.pending}</b>
                            <span>Pending</span>
                          </div>
                          <div className="admin-stat admin-stat-approved">
                            <CheckCircle2 size={26} strokeWidth={1.8} className="stat-icon" style={{ border: 'none' }} />
                            <b>{dashboard.creators.approved}</b>
                            <span>Approved</span>
                          </div>
                          <div className="admin-stat admin-stat-rejected">
                            <XCircle size={26} strokeWidth={1.8} className="stat-icon" style={{ border: 'none' }} />
                            <b>{dashboard.creators.rejected}</b>
                            <span>Rejected</span>
                          </div>
                        </>
                      )}
                  </div>

                  <p className="admin-section-label">Bookings</p>
                  <div className="admin-mini-stats">
                    {dashboardLoading || !dashboard
                      ? Array.from({ length: 5 }, (_, i) => (
                          <div key={i} className="admin-mini-stat">
                            <div className="admin-skel-num" />
                            <div className="admin-skel-label" />
                          </div>
                        ))
                      : (
                        <>
                          <div className="admin-mini-stat">
                            <b>{dashboard.bookings.total}</b>
                            <span>Total</span>
                          </div>
                          <div className="admin-mini-stat">
                            <b>{dashboard.bookings.pending}</b>
                            <span>Pending</span>
                          </div>
                          <div className="admin-mini-stat">
                            <b>{dashboard.bookings.accepted}</b>
                            <span>Accepted</span>
                          </div>
                          <div className="admin-mini-stat">
                            <b>{dashboard.bookings.declined}</b>
                            <span>Declined</span>
                          </div>
                          <div className="admin-mini-stat">
                            <b>{dashboard.bookings.cancelled}</b>
                            <span>Cancelled</span>
                          </div>
                        </>
                      )}
                  </div>

                  {dashboard && dashboard.weeklyTrend.length > 0 && <WeeklyTrendChart data={dashboard.weeklyTrend} />}
                </>
              )}
            </>
          )}

          {!loadError && view === 'users' && (
            <>
              <h1 className="admin-title">Creator list</h1>
              <p className="admin-sub">Review and manage creator applications.</p>

              {!loading && (
                <div className="admin-controls">
                  <div className="admin-search">
                    <Search size={16} strokeWidth={2} style={{ border: 'none' }} />
                    <input
                      placeholder="Search name, email or handle…"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                  <div className="filters">
                    {statusFilters.map((s) => (
                      <button key={s} className={`chip ${status === s ? 'on' : ''}`} onClick={() => setStatus(s)}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th />
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {loading
                      ? Array.from({ length: 5 }, (_, i) => (
                          <tr key={i}>
                            <td>
                              <span className="admin-row-avatar admin-row-skel-avatar" />
                            </td>
                            <td>
                              <div className="admin-skel-bar w-70" />
                            </td>
                            <td>
                              <div className="admin-skel-bar w-50" />
                            </td>
                            <td>
                              <div className="admin-skel-pill" />
                            </td>
                            <td>
                              <div className="admin-skel-btn" />
                            </td>
                          </tr>
                        ))
                      : (
                        <>
                          {filtered.map((c) => (
                            <tr key={c.id}>
                              <td>
                                <span className="admin-row-avatar">
                                  {c.avatarUrl ? <img src={c.avatarUrl} alt="" /> : getInitials(c.fullName)}
                                </span>
                              </td>
                              <td>{c.fullName}</td>
                              <td>{c.email}</td>
                              <td>
                                <StatusBadge status={c.status} />
                              </td>
                              <td>
                                <button className="btn btn-ghost admin-view-btn" onClick={() => setSelected(c)}>
                                  View
                                </button>
                              </td>
                            </tr>
                          ))}
                          {!filtered.length && (
                            <tr>
                              <td colSpan={5} className="admin-empty">
                                No creators match your filters.
                              </td>
                            </tr>
                          )}
                        </>
                      )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {view === 'bookings' && (
            <>
              <h1 className="admin-title">Booking requests</h1>
              <p className="admin-sub">Review and manage creator booking requests.</p>

              {!bookingsLoading && bookingsError && <p className="admin-sub">{bookingsError}</p>}

              {!bookingsError && (
                <>
                  {!bookingsLoading && (
                    <div className="admin-controls">
                      <div className="admin-search">
                        <Search size={16} strokeWidth={2} style={{ border: 'none' }} />
                        <input
                          placeholder="Search creator, name or email…"
                          value={bookingQuery}
                          onChange={(e) => setBookingQuery(e.target.value)}
                        />
                      </div>
                      <div className="filters">
                        {bookingStatusFilters.map((s) => (
                          <button
                            key={s}
                            className={`chip ${bookingStatus === s ? 'on' : ''}`}
                            onClick={() => setBookingStatus(s)}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Creator</th>
                          <th>Requested by</th>
                          <th>Contact</th>
                          <th>Status</th>
                          <th>Requested</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {bookingsLoading &&
                          Array.from({ length: 5 }, (_, i) => (
                            <tr key={i}>
                              <td>
                                <div className="admin-row-creator">
                                  <span className="admin-row-avatar admin-row-skel-avatar" />
                                  <div>
                                    <div className="admin-skel-bar w-70" />
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="admin-skel-bar w-50" />
                              </td>
                              <td>
                                <div className="admin-skel-bar w-70" />
                              </td>
                              <td>
                                <div className="admin-skel-pill" />
                              </td>
                              <td>
                                <div className="admin-skel-bar w-50" />
                              </td>
                              <td>
                                <div className="admin-skel-btn" />
                              </td>
                            </tr>
                          ))}
                        {!bookingsLoading && filteredBookings.map((b) => (
                          <tr key={b.id}>
                            <td>
                              {b.creator ? (
                                <div className="admin-row-creator">
                                  <span className="admin-row-avatar">
                                    {b.creator.avatarUrl ? (
                                      <img src={b.creator.avatarUrl} alt="" />
                                    ) : (
                                      getInitials(b.creator.fullName)
                                    )}
                                  </span>
                                  <div>
                                    <div>{b.creator.fullName}</div>
                                    <div className="admin-row-sub">{b.creator.handle}</div>
                                  </div>
                                </div>
                              ) : (
                                <span className="admin-row-sub">Deleted creator</span>
                              )}
                            </td>
                            <td>{b.bookerId ? b.fullName : <span className="admin-row-sub">Guest</span>}</td>
                            <td>
                              <div>{b.email}</div>
                              <div className="admin-row-sub">
                                <Phone size={12} strokeWidth={2} style={{ border: 'none' }} /> {b.phone}
                              </div>
                            </td>
                            <td>
                              <StatusBadge status={b.status} />
                            </td>
                            <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                            <td>
                              <div className="admin-row-actions">
                                <button
                                  className="btn btn-ghost admin-view-btn"
                                  onClick={() => handleSetBookingStatus(b.id, 'DECLINED')}
                                  disabled={updatingBookingId === b.id}
                                >
                                  {updatingBookingId === b.id && updatingBookingAction === 'DECLINED' ? (
                                    <Loader2 size={14} strokeWidth={2} className="spin" style={{ border: 'none' }} />
                                  ) : (
                                    'Reject'
                                  )}
                                </button>
                                <button
                                  className="btn btn-ink admin-view-btn"
                                  onClick={() => handleSetBookingStatus(b.id, 'ACCEPTED')}
                                  disabled={updatingBookingId === b.id}
                                >
                                  {updatingBookingId === b.id && updatingBookingAction === 'ACCEPTED' ? (
                                    <Loader2 size={14} strokeWidth={2} className="spin" style={{ border: 'none' }} />
                                  ) : (
                                    'Approve'
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {!bookingsLoading && !filteredBookings.length && (
                          <tr>
                            <td colSpan={6} className="admin-empty">
                              No booking requests match your filters.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </>
          )}

          {view === 'brands' && (
            <>
              <h1 className="admin-title">Brand requests</h1>
              <p className="admin-sub">Review and manage brand partnership applications.</p>

              {!brandsLoading && brandsError && <p className="admin-sub">{brandsError}</p>}

              {!brandsError && (
                <>
                  {!brandsLoading && (
                    <div className="admin-controls">
                      <div className="admin-search">
                        <Search size={16} strokeWidth={2} style={{ border: 'none' }} />
                        <input
                          placeholder="Search brand, company or email…"
                          value={brandQuery}
                          onChange={(e) => setBrandQuery(e.target.value)}
                        />
                      </div>
                      <div className="filters">
                        {brandStatusFilters.map((s) => (
                          <button
                            key={s}
                            className={`chip ${brandStatus === s ? 'on' : ''}`}
                            onClick={() => setBrandStatus(s)}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Brand</th>
                          <th>Company</th>
                          <th>Contact</th>
                          <th>Looking for</th>
                          <th>Status</th>
                          <th>Requested</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {brandsLoading &&
                          Array.from({ length: 5 }, (_, i) => (
                            <tr key={i}>
                              <td>
                                <div className="admin-skel-bar w-70" />
                              </td>
                              <td>
                                <div className="admin-skel-bar w-70" />
                              </td>
                              <td>
                                <div className="admin-skel-bar w-50" />
                              </td>
                              <td>
                                <div className="admin-skel-bar w-70" />
                              </td>
                              <td>
                                <div className="admin-skel-pill" />
                              </td>
                              <td>
                                <div className="admin-skel-bar w-50" />
                              </td>
                              <td>
                                <div className="admin-skel-btn" />
                              </td>
                            </tr>
                          ))}
                        {!brandsLoading && filteredBrands.map((b) => (
                          <tr key={b.id}>
                            <td>{b.brandName}</td>
                            <td>{b.companyName}</td>
                            <td>
                              <div>{b.contactName}</div>
                              <div className="admin-row-sub">
                                <Mail size={12} strokeWidth={2} style={{ border: 'none' }} /> {b.email}
                              </div>
                              <div className="admin-row-sub">
                                <Phone size={12} strokeWidth={2} style={{ border: 'none' }} /> {b.phone}
                              </div>
                            </td>
                            <td>{b.lookingFor}</td>
                            <td>
                              <StatusBadge status={b.status} />
                            </td>
                            <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                            <td>
                              <div className="admin-row-actions">
                                <button
                                  className="btn btn-ghost admin-view-btn"
                                  onClick={() => handleSetBrandStatus(b.id, 'REJECTED')}
                                  disabled={updatingBrandId === b.id || b.status === 'REJECTED'}
                                >
                                  {updatingBrandId === b.id && updatingBrandAction === 'REJECTED' ? (
                                    <Loader2 size={14} strokeWidth={2} className="spin" style={{ border: 'none' }} />
                                  ) : (
                                    'Reject'
                                  )}
                                </button>
                                <button
                                  className="btn btn-ink admin-view-btn"
                                  onClick={() => handleSetBrandStatus(b.id, 'APPROVED')}
                                  disabled={updatingBrandId === b.id || b.status === 'APPROVED'}
                                >
                                  {updatingBrandId === b.id && updatingBrandAction === 'APPROVED' ? (
                                    <Loader2 size={14} strokeWidth={2} className="spin" style={{ border: 'none' }} />
                                  ) : (
                                    'Approve'
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {!brandsLoading && !filteredBrands.length && (
                          <tr>
                            <td colSpan={7} className="admin-empty">
                              No brand requests match your filters.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {selected && (
        <DetailModal
          creator={selected}
          busy={updatingId === selected.id}
          onClose={() => setSelected(null)}
          onSetStatus={(next) => handleSetStatus(selected.id, next)}
        />
      )}
    </div>
  );
}
