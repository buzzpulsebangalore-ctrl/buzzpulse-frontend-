import { useState } from 'react';
import { Check } from 'lucide-react';
import { signupNiches } from '../data';

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
  const [platform, setPlatform] = useState('Instagram');
  const [hd, setHd] = useState('');
  const [followers, setFollowers] = useState('1K – 10K (Nano)');
  const [errors, setErrors] = useState<Errors>(noErrors);
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [doneMsg, setDoneMsg] = useState('');

  function go(n: number) {
    setErrors(noErrors);
    if (n === 2) {
      const ok = fn.trim() && ct.trim() && em.includes('@');
      if (!ok) {
        setErrors((prev) => ({ ...prev, e1: true }));
        return;
      }
    }
    if (n === 3) {
      if (!hd.trim()) {
        setErrors((prev) => ({ ...prev, e2: true }));
        return;
      }
    }
    setStep(n);
  }

  function toggleNiche(n: string) {
    setSelectedNiches((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));
  }

  function submitForm() {
    if (!selectedNiches.length) {
      setErrors((prev) => ({ ...prev, e3: true }));
      return;
    }
    setDoneMsg(
      `Thanks ${fn.trim().split(' ')[0]} — we'll review your ${selectedNiches
        .slice(0, 3)
        .join(', ')} profile and email you within 48 hours.`,
    );
    setStep(4);
  }

  function resetForm() {
    setFn('');
    setCt('');
    setEm('');
    setHd('');
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
            <label htmlFor="ct">City</label>
            <input id="ct" placeholder="Bengaluru" value={ct} onChange={(e) => setCt(e.target.value)} />
          </div>
        </div>
        <div className={`err ${errors.e1 ? 'on' : ''}`}>Fill in your name, city and email to continue.</div>
        <label htmlFor="em">Email</label>
        <input id="em" type="email" placeholder="you@email.com" value={em} onChange={(e) => setEm(e.target.value)} />
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
            <input id="hd" placeholder="@yourhandle" value={hd} onChange={(e) => setHd(e.target.value)} />
          </div>
        </div>
        <label htmlFor="fl">Follower count</label>
        <select id="fl" value={followers} onChange={(e) => setFollowers(e.target.value)}>
          <option>1K – 10K (Nano)</option>
          <option>10K – 100K (Micro)</option>
          <option>100K – 500K (Mid)</option>
          <option>500K – 1M (Macro)</option>
          <option>1M+ (Mega)</option>
        </select>
        <div className={`err ${errors.e2 ? 'on' : ''}`}>Add your handle to continue.</div>
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
        <div className="frow">
          <button className="btn btn-ghost" onClick={() => go(2)}>
            Back
          </button>
          <button className="btn btn-ink" onClick={submitForm}>
            Submit application
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
