import { WRAP } from '../styles';

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function CtaBand() {
  return (
    <div className="cta-band">
      <div className={WRAP}>
        <h2>
          Let's build something
          <br />
          people talk about.
        </h2>
        <p>Tell us the objective. We'll come back with a campaign, a creator list and a number.</p>
        <button className="btn btn-white btn-lg">Start your campaign</button>
        <button className="btn btn-ink btn-lg" onClick={() => scrollTo('join')}>
          Join as a creator
        </button>
      </div>
    </div>
  );
}
