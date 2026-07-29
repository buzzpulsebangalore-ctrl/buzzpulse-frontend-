import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { getCookie } from '../utils/cookies';
import { getMyProfile } from '../api/creators';
import { getInitials } from '../utils/format';

export default function SidebarProfileCard() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const role = getCookie('role');
  const fullName = getCookie('fullName');
  const email = getCookie('email');

  useEffect(() => {
    if (role !== 'ADMIN') {
      getMyProfile()
        .then((profile) => setAvatarUrl(profile.avatarUrl))
        .catch(() => {});
    }
  }, [role]);

  return (
    <div className="sidebar-profile-card">
      {fullName && email ? (
        <>
          <span className="sidebar-profile-avatar">
            {avatarUrl ? <img src={avatarUrl} alt="" /> : getInitials(fullName)}
          </span>
          <span className="sidebar-profile-info">
            <span className="sidebar-profile-name">{fullName}</span>
            <span className="sidebar-profile-email">{email}</span>
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
