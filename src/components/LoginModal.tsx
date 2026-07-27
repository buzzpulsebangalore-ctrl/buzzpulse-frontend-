import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function LoginModal({ onClose }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  function submit() {
    const ok = email.includes('@') && password.length >= 6;
    if (!ok) {
      setError(true);
      return;
    }
    setError(false);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          <X size={20} strokeWidth={2} style={{ border: 'none' }} />
        </button>

        <span className="tag t-violet">Welcome back</span>
        <h3>Log in to your account</h3>
        <p className="modal-hint">Access your creator or brand dashboard.</p>

        <label htmlFor="lg-email">Email</label>
        <input
          id="lg-email"
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="lg-pass">Password</label>
        <input
          id="lg-pass"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className={`err ${error ? 'on' : ''}`}>Enter a valid email and a password of at least 6 characters.</div>

        <div className="frow">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-ink" onClick={submit}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
