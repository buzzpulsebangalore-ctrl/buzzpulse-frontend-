import { useEffect, useState, type FormEvent } from 'react';
import { X } from 'lucide-react';
import { login } from '../api/auth';
import { setCookie } from '../utils/cookies';
import { toast } from './Toast';

interface Props {
  onClose: () => void;
}

export default function LoginModal({ onClose }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  async function submit(e: FormEvent) {
    e.preventDefault();
    const ok = email.includes('@') && password.length >= 6;
    if (!ok) {
      setError(true);
      return;
    }
    setError(false);
    setSubmitting(true);
    try {
      const res = await login({ email: email.trim(), password });
      if (res.user.role === 'ADMIN') {
        toast('Login failed. Check your email and password.', 'error');
        return;
      }
      setCookie('access_token', res.access_token);
      setCookie('role', res.user.role);
      const displayName = res.user.fullName?.trim().split(' ')[0] || res.user.email;
      toast(`Welcome back, ${displayName}!`, 'success');
      onClose();
      window.location.assign('/creator');
    } catch (err) {
      console.error('Login failed:', err);
      toast('Login failed. Check your email and password.', 'error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-overlay modal-overlay-top" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          <X size={20} strokeWidth={2} style={{ border: 'none' }} />
        </button>

        <span className="tag t-violet">Welcome back</span>
        <h3>Log in to your account</h3>
        <p className="modal-hint">Access your creator or brand dashboard.</p>

        <form onSubmit={submit}>
          <label htmlFor="lg-email">Email</label>
          <input
            id="lg-email"
            type="email"
            autoComplete="username"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="lg-pass">Password</label>
          <input
            id="lg-pass"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className={`err ${error ? 'on' : ''}`}>
            Enter a valid email and a password of at least 6 characters.
          </div>

          <div className="frow">
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-ink" disabled={submitting}>
              {submitting ? 'Logging in…' : 'Log in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
