import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { login } from '../api/auth';
import { setCookie } from '../utils/cookies';
import { toast } from './Toast';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
      if (res.user.role !== 'ADMIN') {
        toast('Invalid credentials or insufficient access.', 'error');
        return;
      }
      setCookie('access_token', res.access_token);
      setCookie('role', res.user.role);
      navigate('/admin');
    } catch (err) {
      console.error('Admin login failed:', err);
      toast('Invalid credentials or insufficient access.', 'error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="admin-login-page">
      <div className="blob b1" style={{ opacity: 0.16 }} />
      <div className="blob b2" style={{ opacity: 0.16 }} />
      <div className="admin-login-card">
        <div className="admin-login-icon">
          <ShieldCheck size={24} strokeWidth={2} style={{ border: 'none' }} />
        </div>
        <h1>Admin Access</h1>
        <p className="sub">Sign in with your administrator account.</p>

        <form onSubmit={submit}>
          <label htmlFor="al-email">Email</label>
          <input
            id="al-email"
            type="email"
            autoComplete="username"
            placeholder="admin@thebuzzpulse.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="al-pass">Password</label>
          <input
            id="al-pass"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className={`err ${error ? 'on' : ''}`}>
            Enter a valid email and a password of at least 6 characters.
          </div>

          <button type="submit" className="btn btn-ink btn-lg admin-login-submit" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
