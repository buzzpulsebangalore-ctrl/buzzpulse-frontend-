import { ArrowLeft } from 'lucide-react';
import SignupForm from './SignupForm';

export default function CreatorApplyPage() {
  return (
    <div className="auth-page">
      <div className="blob b1" style={{ opacity: 0.16 }} />
      <div className="blob b3" style={{ opacity: 0.16 }} />

      <div className="auth-page-header">
        <a href="/" className="logo">
          <img src="/BP-logo-transparent.png" alt="BuzzPulse" className="logo-full" width={82} height={40} />
        </a>
      </div>

      <div className="auth-page-body">
        <div className="join-apply-wrap">
          <a href="/join" className="auth-page-back">
            <ArrowLeft size={14} strokeWidth={2} style={{ border: 'none' }} />
            Back
          </a>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
