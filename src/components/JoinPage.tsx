import { useState } from 'react';
import { Building2, Star } from 'lucide-react';
import LoginModal from './LoginModal';

export default function JoinPage() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="auth-page">
      <div className="blob b1" style={{ opacity: 0.16 }} />
      <div className="blob b2" style={{ opacity: 0.16 }} />

      <div className="auth-page-header">
        <a href="/" className="logo">
          <img src="/BP-logo-transparent.png" alt="BuzzPulse" className="logo-full" width={82} height={40} />
        </a>
      </div>

      <div className="auth-page-body">
        <div className="join-page-card">
          <h1>Join The Buzz Pulse</h1>
          <p className="modal-hint">How do you want to use the platform?</p>

          <div className="join-options">
            <a href="/join/brand" className="join-option">
              <span className="join-option-icon join-option-icon-brand">
                <Building2 size={22} strokeWidth={2} style={{ border: 'none' }} />
              </span>
              <b>I'm a Brand</b>
              <span>Discover creators, run campaigns, track ROI.</span>
            </a>
            <a href="/join/creator" className="join-option">
              <span className="join-option-icon join-option-icon-creator">
                <Star size={22} strokeWidth={2} style={{ border: 'none' }} />
              </span>
              <b>I'm a Creator</b>
              <span>Get matched with paid brand collaborations.</span>
            </a>
          </div>

          <p className="join-login-hint">
            Already have an account?{' '}
            <button type="button" className="join-login-link" onClick={() => setShowLogin(true)}>
              Log in
            </button>
          </p>
        </div>
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}
