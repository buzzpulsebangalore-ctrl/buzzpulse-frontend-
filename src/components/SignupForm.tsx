import { useState } from 'react';
import { Check } from 'lucide-react';
import { signupNiches } from '../data';
import { applyCreator } from '../api/creators';

interface Errors {
  e1: boolean;
  e2: boolean;
  e3: boolean;
}

const noErrors: Errors = { e1: false, e2: false, e3: false };

export default function SignupForm() {
  const [step, setStep] = useState(1);
  const [fn, setFn] = useState('');
  const [ct, setCt] = useState('');
  const [em, setEm] = useState('');
  const [pw, setPw] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [hd, setHd] = useState('@');
  const [followers, setFollowers] = useState('');
  const [errors, setErrors] = useState<Errors>(noErrors);
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [doneMsg, setDoneMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function isStrongPassword(value: string) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(value);
  }

  function go(n: number) {
    setErrors(noErrors);
    if (n === 2) {
      const ok = fn.trim() && em.includes('@') && isStrongPassword(pw);
      if (!ok) {
        setErrors((prev) => ({ ...prev, e1: true }));
        return;
      }
    }
    if (n === 3) {
      const ok = hd.trim().length > 1 && ct.trim() && /^\d+[KM]?$/.test(followers);
      if (!ok) {
        setErrors((prev) => ({ ...prev, e2: true }));
        return;
      }
    }
    setStep(n);
  }

  function handleChange(raw: string) {
    if (!raw.startsWith('@')) return setHd(`@${raw}`);
    setHd(raw);
  }

  function sanitizeFollowers(raw: string) {
    const cleaned = raw.replace(/[^0-9kKmM]/g, '');
    const match = cleaned.match(/^(\d*)([kKmM]?)/);
    if (!match) return '';
    const [, digits, suffix] = match;
    return digits + suffix.toUpperCase();
  }

  function toggleNiche(n: string) {
    setSelectedNiches((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));
  }

  async function submitForm() {
    if (!selectedNiches.length) {
      setErrors((prev) => ({ ...prev, e3: true }));
      return;
    }

    setSubmitting(true);
    setSubmitError('');
    try {
      await applyCreator({
        fullName: fn.trim(),
        email: em.trim(),
        city: ct.trim(),
        password: pw,
        platform: platform.toUpperCase(),
        handle: hd.trim(),
        followerCount: followers,
        niches: selectedNiches,
      });

      setDoneMsg(
        `Thanks ${fn.trim().split(' ')[0]} — we'll review your ${selectedNiches
          .slice(0, 3)
          .join(', ')} profile and email you within 48 hours.`,
      );
      setStep(4);
    } catch {
      setSubmitError("Couldn't submit your application. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setFn('');
    setCt('');
    setEm('');
    setPw('');
    setHd('@');
    setFollowers('');
    setSelectedNiches([]);
    setErrors(noErrors);
    setStep(1);
  }

  const pDone = (i: number) => i < Math.min(step, 3);

  return (
    <div className="form-card">
      <div className="prog">
        <div className={`pbar ${pDone(0) ? 'done' : ''}`}>
          <i />
        </div>
        <div className={`pbar ${pDone(1) ? 'done' : ''}`}>
          <i />
        </div>
        <div className={`pbar ${pDone(2) ? 'done' : ''}`}>
          <i />
        </div>
      </div>

      {/* STEP 1 */}
      <div className={`fstep ${step === 1 ? 'on' : ''}`}>
        <div className="stepno">STEP 1 OF 3</div>
        <h3>Who are you?</h3>
        <p className="sub">Takes about 90 seconds. We review every application by hand.</p>
        <div className="two">
          <div>
            <label htmlFor="fn">Full name</label>
            <input id="fn" placeholder="Ananya Rao" value={fn} onChange={(e) => setFn(e.target.value)} />
          </div>
          <div>
            <label htmlFor="em">Email</label>
            <input
              id="em"
              type="email"
              placeholder="you@email.com"
              value={em}
              onChange={(e) => setEm(e.target.value)}
            />
          </div>
        </div>
        <label htmlFor="pw">Password</label>
        <input
          id="pw"
          type="password"
          placeholder="••••••••"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <div className="hint">
          Min 8 characters, with uppercase, lowercase, a number and a special character.
        </div>
        <div className={`err ${errors.e1 ? 'on' : ''}`}>
          Fill in your name, email and a strong password to continue.
        </div>
        <div className="frow">
          <button className="btn btn-ink" onClick={() => go(2)}>
            Continue
          </button>
        </div>
      </div>

      {/* STEP 2 */}
      <div className={`fstep ${step === 2 ? 'on' : ''}`}>
        <div className="stepno">STEP 2 OF 3</div>
        <h3>Where do you post?</h3>
        <p className="sub">Link your main handle. We verify audience quality before approval.</p>
        <div className="two">
          <div>
            <label htmlFor="pl">Platform</label>
            <select id="pl" value={platform} onChange={(e) => setPlatform(e.target.value)}>
              <option>Instagram</option>
              <option>YouTube</option>
              <option>LinkedIn</option>
              <option>X</option>
              <option>Multiple</option>
            </select>
          </div>
          <div>
            <label htmlFor="hd">Handle</label>
            <input id="hd" placeholder="@yourhandle" value={hd} onChange={(e) => handleChange(e.target.value)} />
          </div>
        </div>
        <div className="two">
          <div>
            <label htmlFor="ct">City</label>
            <input id="ct" placeholder="Bengaluru" value={ct} onChange={(e) => setCt(e.target.value)} />
          </div>
          <div>
            <label htmlFor="fl">Follower count</label>
            <input
              id="fl"
              placeholder="e.g. 10K, 500K, 1M"
              value={followers}
              onChange={(e) => setFollowers(sanitizeFollowers(e.target.value))}
            />
          </div>
        </div>
        <div className={`err ${errors.e2 ? 'on' : ''}`}>
          Add your handle, city and follower count (numbers, optionally ending in K or M) to continue.
        </div>
        <div className="frow">
          <button className="btn btn-ghost" onClick={() => go(1)}>
            Back
          </button>
          <button className="btn btn-ink" onClick={() => go(3)}>
            Continue
          </button>
        </div>
      </div>

      {/* STEP 3 */}
      <div className={`fstep ${step === 3 ? 'on' : ''}`}>
        <div className="stepno">STEP 3 OF 3</div>
        <h3>Pick your niches</h3>
        <p className="sub">Choose up to three. You'll only be matched with briefs that fit.</p>
        <div className="niches">
          {signupNiches.map((n) => (
            <button
              key={n}
              className={`nchip ${selectedNiches.includes(n) ? 'on' : ''}`}
              onClick={() => toggleNiche(n)}
            >
              {n}
            </button>
          ))}
        </div>
        <div className={`err ${errors.e3 ? 'on' : ''}`}>Pick at least one niche.</div>
        <div className={`err ${submitError ? 'on' : ''}`}>{submitError}</div>
        <div className="frow">
          <button className="btn btn-ghost" onClick={() => go(2)} disabled={submitting}>
            Back
          </button>
          <button className="btn btn-ink" onClick={submitForm} disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit application'}
          </button>
        </div>
      </div>

      {/* DONE */}
      <div className={`fstep ${step === 4 ? 'on' : ''}`}>
        <div className="done-box">
          <div className="check">
            <Check size={36} strokeWidth={3} color="#fff" style={{ border: 'none' }} />
          </div>
          <h3>Application received</h3>
          <p>{doneMsg || "We'll review your profile and email you within 48 hours."}</p>
          <button className="btn btn-ink" onClick={resetForm}>
            Submit another
          </button>
        </div>
      </div>
    </div>
  );
}
