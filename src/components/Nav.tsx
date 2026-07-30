import { useState } from 'react';
import { Menu, X } from 'lucide-react';
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

const navLinks = [
  { id: 'creators', label: 'Creators' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'join', label: 'Join' },
];

export default function Nav() {
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const loggedIn = !!getCookie('access_token');

  return (
    <nav>
      <div className={`${WRAP} nav-in`}>
        <div className="logo">
          <img src="/BP-logo-transparent.png" alt="BuzzPulse" className="logo-full" width={82} height={40} />
        </div>
        <div className="nav-links">
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <button className="btn" onClick={() => (loggedIn ? goToDashboard() : scrollTo('join'))}>
            Become a Creator
          </button>
          <button className="btn" onClick={() => (loggedIn ? goToDashboard() : setShowLogin(true))}>
            {loggedIn ? 'Dashboard' : 'Login'}
          </button>
        </div>
        <button
          className="menu-btn"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? (
            <X size={24} strokeWidth={2} style={{ border: 'none' }} />
          ) : (
            <Menu size={24} strokeWidth={2} style={{ border: 'none' }} />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className={`${WRAP} nav-mobile`}>
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      )}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </nav>
  );
}
