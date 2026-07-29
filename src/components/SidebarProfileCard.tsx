import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { getCookie } from '../utils/cookies';
import { getMyProfile, type CreatorProfileResponse } from '../api/creators';
import { getInitials } from '../utils/format';

export default function SidebarProfileCard() {
  const [profile, setProfile] = useState<CreatorProfileResponse | null>(null);
  const role = getCookie('role');

  useEffect(() => {
    getMyProfile()
      .then(setProfile)
      .catch(() => {});
  }, []);

  const displayName = profile?.fullName || profile?.email;

  return (
    <div className="sidebar-profile-card">
      {profile && displayName ? (
        <>
          <span className="sidebar-profile-avatar">
            {profile.avatarUrl ? <img src={profile.avatarUrl} alt="" /> : getInitials(displayName)}
          </span>
          <span className="sidebar-profile-info">
            <span className="sidebar-profile-name">{displayName}</span>
            <span className="sidebar-profile-email">{profile.email}</span>
          </span>
        </>
      ) : (
        <>
          <span className="sidebar-profile-avatar">
            <User size={16} strokeWidth={2} style={{ border: 'none' }} />
          </span>
          <span className="sidebar-profile-info">
            <span className="sidebar-profile-name">{role === 'ADMIN' ? 'Admin' : 'Creator'}</span>
          </span>
        </>
      )}
    </div>
  );
}
