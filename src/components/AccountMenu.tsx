import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { deleteCookie, getCookie } from '../utils/cookies';
import ChangePasswordModal from './ChangePasswordModal';

export default function AccountMenu() {
  const [open, setOpen] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const label = getCookie('role') === 'ADMIN' ? 'Admin Account' : 'Creator Account';

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function logout() {
    deleteCookie('access_token');
    deleteCookie('role');
    deleteCookie('fullName');
    deleteCookie('email');
    window.location.assign('/');
  }

  return (
    <div className="account-menu" ref={ref}>
      <button type="button" className="account-menu-trigger" onClick={() => setOpen((o) => !o)}>
        {label}
        <ChevronDown size={14} strokeWidth={2} style={{ border: 'none' }} />
      </button>

      {open && (
        <div className="account-menu-dropdown">
          <a href="/" className="account-menu-item">
            &larr; Back to site
          </a>
          <button
            type="button"
            className="account-menu-item"
            onClick={() => {
              setShowChangePassword(true);
              setOpen(false);
            }}
          >
            Change password
          </button>
          <button type="button" className="account-menu-item" onClick={logout}>
            Log out
          </button>
        </div>
      )}

      {showChangePassword && <ChangePasswordModal onClose={() => setShowChangePassword(false)} />}
    </div>
  );
}
