import { useState, type FormEvent } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { applyBrand } from '../api/brands';

export default function BrandApplyPage() {
  const [brandName, setBrandName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [done, setDone] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const ok =
      brandName.trim() && companyName.trim() && contactName.trim() && email.includes('@') && phone.trim() && lookingFor.trim();
    if (!ok) {
      setError(true);
      return;
    }
    setError(false);
    setSubmitting(true);
    setSubmitError('');
    try {
      await applyBrand({
        brandName: brandName.trim(),
        companyName: companyName.trim(),
        contactName: contactName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        lookingFor: lookingFor.trim(),
      });
      setDone(true);
    } catch (err) {
      console.error('Brand application failed:', err);
      if (String((err as Error).message).includes('409')) {
        setSubmitError('An application with this email has already been submitted.');
      } else {
        setSubmitError("Couldn't submit your application. Please check your connection and try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

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
        <div className="join-apply-wrap">
          {!done && (
            <a href="/join" className="auth-page-back">
              <ArrowLeft size={14} strokeWidth={2} style={{ border: 'none' }} />
              Back
            </a>
          )}

          <div className="form-card">
            {done ? (
              <div className="done-box">
                <div className="check">
                  <Check size={36} strokeWidth={3} color="#fff" style={{ border: 'none' }} />
                </div>
                <h3>Application received</h3>
                <p>
                  Thanks {contactName.trim().split(' ')[0]} — our team will review {brandName.trim()} and email you
                  within 48 hours.
                </p>
                <a href="/" className="btn btn-ink">
                  Back to home
                </a>
              </div>
            ) : (
              <>
                <span className="tag t-cyan">Brand sign-up</span>
                <h3>Tell us about your brand</h3>
                <p className="sub">We review every application and match you with the right creators.</p>

                <form onSubmit={submit}>
                  <div className="two">
                    <div>
                      <label htmlFor="br-name">Brand name</label>
                      <input
                        id="br-name"
                        placeholder="Glow Luxe"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="br-company">Company name</label>
                      <input
                        id="br-company"
                        placeholder="Glow Luxe Pvt. Ltd."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="two">
                    <div>
                      <label htmlFor="br-contact">Contact name</label>
                      <input
                        id="br-contact"
                        placeholder="Priya Rao"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="br-phone">Phone</label>
                      <input
                        id="br-phone"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <label htmlFor="br-email">Email</label>
                  <input
                    id="br-email"
                    type="email"
                    placeholder="you@brand.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <label htmlFor="br-looking">What are you looking for?</label>
                  <textarea
                    id="br-looking"
                    rows={3}
                    placeholder="Beauty and skincare influencers with 50K+ followers"
                    value={lookingFor}
                    onChange={(e) => setLookingFor(e.target.value)}
                  />

                  <div className={`err ${error ? 'on' : ''}`}>Fill in every field to submit your application.</div>
                  <div className={`err ${submitError ? 'on' : ''}`}>{submitError}</div>

                  <div className="frow">
                    <button type="submit" className="btn btn-ink" disabled={submitting}>
                      {submitting ? 'Submitting…' : 'Submit application'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
