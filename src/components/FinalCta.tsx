import { WRAP } from '../styles';

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function FinalCta() {
  return (
    <section className="final-cta">
      <div className={`${WRAP} final-cta-in`}>
        <h2>Ready to create the buzz?</h2>
        <p>Join 1M+ brands and 10M+ creators building campaigns people actually talk about.</p>
        <div className="final-cta-actions">
          <button className="btn btn-white btn-lg" onClick={() => window.location.assign('/join/brand')}>
            Launch brand
          </button>
          <button className="btn btn-ink btn-lg" onClick={() => scrollTo('creators')}>
            Browse creators
          </button>
        </div>
      </div>
    </section>
  );
}
