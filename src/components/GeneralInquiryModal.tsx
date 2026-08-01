import { useEffect, useRef, useState } from 'react';
import { X, Check } from 'lucide-react';
import { createGeneralBooking } from '../api/bookings';
import { getCookie } from '../utils/cookies';

interface Props {
  topic: string;
  onClose: () => void;
}

export default function GeneralInquiryModal({ topic, onClose }: Props) {
  const loggedIn = !!getCookie('access_token');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(`${topic} -  `);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);

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

  useEffect(() => {
    const el = messageRef.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
  }, []);

  async function submit() {
    const phoneValid = phone.replace(/\D/g, '').length >= 7;
    const messageValid = message.trim().length > 0;
    const ok = loggedIn
      ? phoneValid && messageValid
      : Boolean(name.trim()) && phoneValid && email.includes('@') && messageValid;
    if (!ok) {
      setError(true);
      return;
    }
    setError(false);
    setSubmitting(true);
    try {
      await createGeneralBooking(
        loggedIn
          ? { phone, message: message.trim() }
          : { phone, message: message.trim(), fullName: name.trim(), email: email.trim() },
      );
    } catch (err) {
      console.error('Failed to send inquiry:', err);
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
            <span className="tag t-violet">Quick inquiry</span>
            <h3>{topic}</h3>
            <p className="modal-hint">Tell us what you're looking for and we'll match you with the right creators.</p>

            {!loggedIn && (
              <>
                <label htmlFor="gi-name">Full name</label>
                <input id="gi-name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
              </>
            )}

            <label htmlFor="gi-phone">Phone number</label>
            <input
              id="gi-phone"
              type="tel"
              inputMode="numeric"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={handlePhoneChange}
            />

            {!loggedIn && (
              <>
                <label htmlFor="gi-email">Email</label>
                <input
                  id="gi-email"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            )}

            <label htmlFor="gi-message">Message</label>
            <textarea
              id="gi-message"
              ref={messageRef}
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className={`err ${error ? 'on' : ''}`}>
              {loggedIn
                ? 'Enter a valid phone number and message to continue.'
                : 'Fill in your name, phone, a valid email and a message to continue.'}
            </div>

            <div className="frow">
              <button className="btn btn-ghost" onClick={onClose} disabled={submitting}>
                Cancel
              </button>
              <button className="btn btn-ink" onClick={submit} disabled={submitting}>
                {submitting ? 'Sending…' : 'Send inquiry'}
              </button>
            </div>
          </>
        ) : (
          <div className="done-box">
            <div className="check">
              <Check size={36} strokeWidth={3} color="#fff" style={{ border: 'none' }} />
            </div>
            <h3>Inquiry sent</h3>
            <p>We'll match you with the right creators and follow up by email within 48 hours.</p>
            <button className="btn btn-ink" onClick={onClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
