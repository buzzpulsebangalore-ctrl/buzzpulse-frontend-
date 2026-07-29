import { useEffect, useState } from 'react';
import { X, Check } from 'lucide-react';
import type { PublicCreator } from '../api/creators';
import { createBooking } from '../api/bookings';
import { getCookie } from '../utils/cookies';
import { formatFollowers } from '../utils/format';

interface Props {
  creator: PublicCreator;
  onClose: () => void;
}

export default function BookingModal({ creator, onClose }: Props) {
  const loggedIn = !!getCookie('access_token');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone('+' + e.target.value.replace(/\D/g, ''));
  }

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

  async function submit() {
    const phoneValid = phone.replace(/\D/g, '').length >= 7;
    const ok = loggedIn ? phoneValid : Boolean(name.trim()) && phoneValid && email.includes('@');
    if (!ok) {
      setError(true);
      return;
    }
    setError(false);
    setSubmitting(true);
    try {
      await createBooking(
        loggedIn
          ? { creatorId: creator.id, phone }
          : { creatorId: creator.id, phone, fullName: name.trim(), email: email.trim() }
      );
    } catch (err) {
      console.error('Failed to create booking:', err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          <X size={20} strokeWidth={2} style={{ border: 'none' }} />
        </button>

        {!submitted ? (
          <>
            <span className="tag t-violet">Book a creator</span>
            <h3>{creator.fullName}</h3>
            <p className="modal-hint">
              {creator.handle} &middot; {creator.niches[0] ?? 'Creator'} &middot; {formatFollowers(creator.followerCount)}{' '}
              followers
            </p>

            {!loggedIn && (
              <>
                <label htmlFor="bk-name">Full name</label>
                <input id="bk-name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
              </>
            )}

            <label htmlFor="bk-phone">Phone number</label>
            <input
              id="bk-phone"
              type="tel"
              inputMode="numeric"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={handlePhoneChange}
            />

            {!loggedIn && (
              <>
                <label htmlFor="bk-email">Email</label>
                <input
                  id="bk-email"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            )}

            <div className={`err ${error ? 'on' : ''}`}>
              {loggedIn
                ? 'Enter a valid phone number to continue.'
                : 'Fill in your name, phone and a valid email to continue.'}
            </div>

            <div className="frow">
              <button className="btn btn-ghost" onClick={onClose} disabled={submitting}>
                Cancel
              </button>
              <button className="btn btn-ink" onClick={submit} disabled={submitting}>
                {submitting ? 'Sending…' : 'Request booking'}
              </button>
            </div>
          </>
        ) : (
          <div className="done-box">
            <div className="check">
              <Check size={36} strokeWidth={3} color="#fff" style={{ border: 'none' }} />
            </div>
            <h3>Request sent</h3>
            <p>
              We'll pass your details to {creator.fullName.split(' ')[0]}'s team and follow up by email within 48
              hours.
            </p>
            <button className="btn btn-ink" onClick={onClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
