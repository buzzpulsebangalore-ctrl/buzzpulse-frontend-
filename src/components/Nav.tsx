import { useState } from 'react';
import { Menu } from 'lucide-react';
import { WRAP } from '../styles';
import LoginModal from './LoginModal';
import { getCookie } from '../utils/cookies';

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function goToDashboard() {
  const role = getCookie('role');
  window.location.assign(role === 'ADMIN' ? '/admin' : '/creator');
}

export default function Nav() {
  const [showLogin, setShowLogin] = useState(false);
  const loggedIn = !!getCookie('access_token');

  return (
    <nav>
      <div className={`${WRAP} nav-in`}>
        <div className="logo">
          <img src="/BP-logo-transparent.png" alt="BuzzPulse" className="logo-full" width={82} height={40} />
        </div>
        <div className="nav-links">
          <a href="#creators">Creators</a>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#join">Join</a>
        </div>
        <div className="nav-actions">
          <button className="btn" onClick={() => (loggedIn ? goToDashboard() : scrollTo('join'))}>
            Become a Creator
          </button>
          <button className="btn" onClick={() => (loggedIn ? goToDashboard() : setShowLogin(true))}>
            {loggedIn ? 'Dashboard' : 'Login'}
          </button>
        </div>
        <button className="menu-btn" aria-label="Menu">
          <Menu size={24} strokeWidth={2} style={{ border: 'none' }} />
        </button>
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </nav>
  );
}
