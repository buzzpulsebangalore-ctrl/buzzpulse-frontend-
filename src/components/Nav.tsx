import { useState } from 'react';
import { Menu } from 'lucide-react';
import { WRAP } from '../styles';
import LoginModal from './LoginModal';

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Nav() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <nav>
      <div className={`${WRAP} nav-in`}>
        <div className="logo">
          <img src="/logo-icon-light.png" alt="" className="logo-mark" width={34} height={28} />
          THE BUZZ PULSE
        </div>
        <div className="nav-links">
          <a href="#creators">Creators</a>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#join">Join</a>
        </div>
        <div className="nav-actions">
          <button className="btn" onClick={() => scrollTo('join')}>
            Become a Creator
          </button>
          <button className="btn" onClick={() => setShowLogin(true)}>
            Login
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
