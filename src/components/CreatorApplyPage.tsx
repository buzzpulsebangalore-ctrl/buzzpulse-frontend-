import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SignupForm from './SignupForm';

export default function CreatorApplyPage() {
  return (
    <div className="auth-page">
      <div className="blob b1" style={{ opacity: 0.16 }} />
      <div className="blob b3" style={{ opacity: 0.16 }} />

      <div className="auth-page-header">
        <Link to="/" className="logo">
          <img src="/BP-logo-transparent.png" alt="BuzzPulse" className="logo-full" width={82} height={40} />
        </Link>
      </div>

      <div className="auth-page-body">
        <div className="join-apply-wrap">
          <Link to="/join" className="auth-page-back">
            <ArrowLeft size={14} strokeWidth={2} style={{ border: 'none' }} />
            Back
          </Link>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
