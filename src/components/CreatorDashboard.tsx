import { useEffect, useState } from 'react';
import { Camera, X, Mail, MapPin, CalendarDays } from 'lucide-react';
import { getMyProfile, updateMyProfile, updateMyAvatar, type CreatorProfileResponse } from '../api/creators';
import { deleteCookie, getCookie } from '../utils/cookies';
import { signupNiches } from '../data';
import { toast } from './Toast';
import AccountMenu from './AccountMenu';
import { formatFollowers, getInitials } from '../utils/format';

const platforms = ['INSTAGRAM', 'YOUTUBE', 'TIKTOK', 'TWITTER', 'FACEBOOK'];

function redirectToLogin() {
  deleteCookie('access_token');
  deleteCookie('role');
  window.location.assign('/');
}

interface FormState {
  fullName: string;
  city: string;
  platform: string;
  handle: string;
  followerCount: string;
  niches: string[];
}

function toForm(profile: CreatorProfileResponse): FormState {
  return {
    fullName: profile.fullName,
    city: profile.city,
    platform: profile.platform,
    handle: profile.handle,
    followerCount: String(profile.followerCount),
    niches: profile.niches,
  };
}

function StatusBadge({ status }: { status: string }) {
  const s = status.toUpperCase();
  const cls = s === 'APPROVED' ? 'badge-approved' : s === 'REJECTED' ? 'badge-rejected' : 'badge-pending';
  return <span className={`admin-badge ${cls}`}>{status}</span>;
}

function AvatarUploadModal({
  currentUrl,
  onClose,
  onUploaded,
}: {
  currentUrl: string | null;
  onClose: () => void;
  onUploaded: (profile: CreatorProfileResponse) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  function pickFile(f: File | null) {
    setFile(f);
    setError('');
    setPreviewUrl(f ? URL.createObjectURL(f) : null);
  }

  async function upload() {
    if (!file) {
      setError('Choose a photo first.');
      return;
    }
    setUploading(true);
    setError('');
    try {
      const updated = await updateMyAvatar(file);
      onUploaded(updated);
      toast('Profile photo updated', 'success');
    } catch (err) {
      console.error('Failed to update avatar:', err);
      setError("Couldn't upload that photo. Please try a different file.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          <X size={20} strokeWidth={2} style={{ border: 'none' }} />
        </button>

        <span className="tag t-violet">Profile photo</span>
        <h3>Update your photo</h3>
        <p className="modal-hint">JPG or PNG works best.</p>

        <div className="avatar-preview">
          {previewUrl ? <img src={previewUrl} alt="" /> : currentUrl ? <img src={currentUrl} alt="" /> : null}
        </div>

        <input type="file" accept="image/*" onChange={(e) => pickFile(e.target.files?.[0] ?? null)} />

        <div className={`err ${error ? 'on' : ''}`}>{error}</div>

        <div className="frow">
          <button className="btn btn-ghost" onClick={onClose} disabled={uploading}>
            Cancel
          </button>
          <button className="btn btn-ink" onClick={upload} disabled={uploading}>
            {uploading ? 'Uploading…' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CreatorDashboard() {
  const [profile, setProfile] = useState<CreatorProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);

  useEffect(() => {
    if (!getCookie('access_token')) {
      redirectToLogin();
      return;
    }

    getMyProfile()
      .then((res) => setProfile(res))
      .catch((err) => {
        console.error('Failed to load profile:', err);
        if (String(err.message).includes('401')) {
          redirectToLogin();
          return;
        }
        setLoadError("Couldn't load your profile. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  function startEdit() {
    if (!profile) return;
    setForm(toForm(profile));
    setSaveError('');
    setEditing(true);
  }

  function toggleNiche(n: string) {
    setForm((prev) => {
      if (!prev) return prev;
      const has = prev.niches.includes(n);
      if (!has && prev.niches.length >= 3) return prev;
      return { ...prev, niches: has ? prev.niches.filter((x) => x !== n) : [...prev.niches, n] };
    });
  }

  async function saveProfile() {
    if (!form) return;
    if (!form.niches.length) {
      setSaveError('Pick at least one niche.');
      return;
    }

    setSaving(true);
    setSaveError('');
    try {
      const updated = await updateMyProfile({
        fullName: form.fullName,
        city: form.city,
        platform: form.platform,
        handle: form.handle,
        followerCount: form.followerCount,
        niches: form.niches,
      });
      setProfile(updated);
      setEditing(false);
      toast('Profile updated', 'success');
    } catch (err) {
      console.error('Failed to update profile:', err);
      setSaveError("Couldn't save your changes. Please check the fields and try again.");
    } finally {
      setSaving(false);
    }
  }

  const initials = profile ? getInitials(profile.fullName) : '';

  return (
    <div className="admin">
      <div className="admin-topbar">
        <div className="admin-wrap admin-topbar-in">
          <div className="logo">
            <img src="/BP-logo-transparent.png" alt="BuzzPulse" className="logo-full" width={82} height={40} />
          </div>
          <AccountMenu />
        </div>
      </div>

      <div className="admin-wrap admin-body">
        <div className="profile-page">
          {loading && (
            <div className="profile-card profile-skeleton">
              <div className="skeleton-banner" />
              <div className="skeleton-header">
                <div className="skeleton-avatar" />
                <div className="skeleton-lines">
                  <div className="skeleton-line w-40" />
                  <div className="skeleton-line w-24" />
                </div>
              </div>
              <div className="skeleton-stats">
                <div className="skeleton-block" />
                <div className="skeleton-block" />
                <div className="skeleton-block" />
              </div>
              <div className="skeleton-rows">
                <div className="skeleton-line w-full" />
                <div className="skeleton-line w-full" />
                <div className="skeleton-line w-2/3" />
              </div>
            </div>
          )}
          {!loading && loadError && <p className="admin-sub">{loadError}</p>}

        {!loading && profile && !editing && (
          <div className="profile-card">
            <div className="profile-banner" />
            <div className="profile-header">
              <button
                type="button"
                className="profile-avatar profile-avatar-btn"
                onClick={() => setAvatarModalOpen(true)}
                aria-label="Update profile photo"
              >
                {profile.avatarUrl ? <img src={profile.avatarUrl} alt="" /> : initials}
                <span className="profile-avatar-overlay">
                  <Camera size={16} strokeWidth={2} style={{ border: 'none' }} />
                </span>
              </button>
              <div className="profile-header-info">
                <div className="profile-name-row">
                  <span className="profile-name">{profile.fullName}</span>
                  <StatusBadge status={profile.status} />
                </div>
                <div className="profile-handle">
                  {profile.handle} &middot; {profile.platform}
                </div>
              </div>
              <button className="btn btn-ink profile-edit-btn" onClick={startEdit}>
                Edit profile
              </button>
            </div>

            <div className="profile-stats">
              <div className="profile-stat">
                <b>{formatFollowers(profile.followerCount)}</b>
                <span>Followers</span>
              </div>
              <div className="profile-stat">
                <b>{profile.niches.length}</b>
                <span>Niches</span>
              </div>
              <div className="profile-stat">
                <b>{new Date(profile.createdAt).getFullYear()}</b>
                <span>Member since</span>
              </div>
            </div>

            <div className="profile-info-list">
              <div className="profile-info-row">
                <Mail size={16} strokeWidth={2} style={{ border: 'none' }} />
                {profile.email}
              </div>
              <div className="profile-info-row">
                <MapPin size={16} strokeWidth={2} style={{ border: 'none' }} />
                {profile.city}
              </div>
              <div className="profile-info-row">
                <CalendarDays size={16} strokeWidth={2} style={{ border: 'none' }} />
                Joined {new Date(profile.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="profile-niches">
              {profile.niches.map((n) => (
                <span key={n} className="tag t-violet">
                  {n}
                </span>
              ))}
            </div>
          </div>
        )}

        {!loading && profile && editing && form && (
          <div className="form-card profile-form-card">
            <h3>Edit profile</h3>
            <div className="two">
              <div>
                <label htmlFor="pf-name">Full name</label>
                <input
                  id="pf-name"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="pf-city">City</label>
                <input id="pf-city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              </div>
            </div>
            <div className="two">
              <div>
                <label htmlFor="pf-platform">Platform</label>
                <select
                  id="pf-platform"
                  value={form.platform}
                  onChange={(e) => setForm({ ...form, platform: e.target.value })}
                >
                  {platforms.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="pf-handle">Handle</label>
                <input
                  id="pf-handle"
                  value={form.handle}
                  onChange={(e) => setForm({ ...form, handle: e.target.value })}
                />
              </div>
            </div>
            <label htmlFor="pf-followers">Follower count</label>
            <input
              id="pf-followers"
              placeholder="e.g. 10k, 1.2M"
              value={form.followerCount}
              onChange={(e) => setForm({ ...form, followerCount: e.target.value })}
            />

            <label>Niches (up to 3)</label>
            <div className="niches">
              {signupNiches.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`nchip ${form.niches.includes(n) ? 'on' : ''}`}
                  onClick={() => toggleNiche(n)}
                >
                  {n}
                </button>
              ))}
            </div>

            <div className={`err ${saveError ? 'on' : ''}`}>{saveError}</div>

            <div className="frow">
              <button className="btn btn-ghost" onClick={() => setEditing(false)} disabled={saving}>
                Cancel
              </button>
              <button className="btn btn-ink" onClick={saveProfile} disabled={saving}>
                {saving ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </div>
        )}
        </div>
      </div>

      {avatarModalOpen && (
        <AvatarUploadModal
          currentUrl={profile?.avatarUrl ?? null}
          onClose={() => setAvatarModalOpen(false)}
          onUploaded={(updated) => {
            setProfile(updated);
            setAvatarModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
