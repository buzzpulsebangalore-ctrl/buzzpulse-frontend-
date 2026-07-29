import { useState } from 'react';
import { X } from 'lucide-react';
import { changePassword } from '../api/auth';
import { toast } from './Toast';

interface Props {
  onClose: () => void;
}

export default function ChangePasswordModal({ onClose }: Props) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function submit() {
    if (!current || next.length < 8) {
      setError('Enter your current password and a new one of at least 8 characters.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      await changePassword({ oldPassword: current, newPassword: next });
      toast('Password updated successfully', 'success');
      onClose();
    } catch (err) {
      console.error('Failed to change password:', err);
      setError("Couldn't change your password. Check your current password and try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-overlay modal-overlay-top" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          <X size={20} strokeWidth={2} style={{ border: 'none' }} />
        </button>

        <span className="tag t-violet">Security</span>
        <h3>Change password</h3>
        <p className="modal-hint">Use at least 8 characters for your new password.</p>

        <label htmlFor="cp-current">Current password</label>
        <input
          id="cp-current"
          type="password"
          placeholder="••••••••"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
        />

        <label htmlFor="cp-new">New password</label>
        <input
          id="cp-new"
          type="password"
          placeholder="••••••••"
          value={next}
          onChange={(e) => setNext(e.target.value)}
        />

        <div className={`err ${error ? 'on' : ''}`}>{error}</div>

        <div className="frow">
          <button className="btn btn-ghost" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button className="btn btn-ink" onClick={submit} disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
