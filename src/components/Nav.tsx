import { useEffect, useRef, useState } from 'react';
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
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const loggedIn = !!getCookie('access_token');

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function onScroll() {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastScrollY.current;
      setHidden(scrollingDown && currentY > 80);
      lastScrollY.current = currentY;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) setHidden(false);
  }, [menuOpen]);

  function handleBecomeCreator() {
    setMenuOpen(false);
    if (loggedIn) goToDashboard();
    else scrollTo('join');
  }

  function handleLoginOrDashboard() {
    setMenuOpen(false);
    if (loggedIn) goToDashboard();
    else setShowLogin(true);
  }

  return (
    <nav className={hidden ? 'nav-hidden' : ''}>
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
          <button className="btn" onClick={handleBecomeCreator}>
            Become a Creator
          </button>
          <button className="btn" onClick={handleLoginOrDashboard}>
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
          <div className="nav-mobile-actions">
            <button className="btn btn-ghost" onClick={handleBecomeCreator}>
              Become a Creator
            </button>
            <button className="btn btn-ink" onClick={handleLoginOrDashboard}>
              {loggedIn ? 'Dashboard' : 'Login'}
            </button>
          </div>
        </div>
      )}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </nav>
  );
}
