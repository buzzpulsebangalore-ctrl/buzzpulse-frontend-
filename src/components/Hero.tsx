import { Heart, MessageCircle, Send } from 'lucide-react';
import { WRAP } from '../styles';

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />
      <div className={`${WRAP} hero-grid`}>
        <div>
          <div className="eyebrow">
            <span className="dot" /> 12,400+ creators live right now
          </div>
          <h1>
            Creating Buzz.
            <br />
            <span className="grad-text">Driving Impact.</span>
          </h1>
          <p className="lead">
            India's premier platform for influencer marketing, destination branding, events and public engagement.
            Match with verified creators, launch in days, measure everything.
          </p>
          <div className="hero-cta">
            <button className="btn btn-ink btn-lg" onClick={() => scrollTo('creators')}>
              Start your campaign
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => scrollTo('join')}>
              Become a creator
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <b className="grad-text">12.4K</b>
              <span>Creators</span>
            </div>
            <div className="stat">
              <b className="grad-text">840M</b>
              <span>Monthly reach</span>
            </div>
            <div className="stat">
              <b className="grad-text">28</b>
              <span>States covered</span>
            </div>
            <div className="stat">
              <b className="grad-text">96%</b>
              <span>Repeat clients</span>
            </div>
          </div>
        </div>

        <div className="phone-wrap">
          <div className="float-card fc1">
            <span className="fc-num">+312%</span>Engagement lift
          </div>
          <div className="float-card fc2">
            <span className="fc-num">&#8377;0</span>Platform fee, creators
          </div>
          <div className="phone">
            <div className="screen">
              <div className="ph-top">
                <img className="ph-av" src="https://i.pravatar.cc/120?img=32" alt="" />
                <div>
                  <b>ananya.wanders</b>
                  <small>Hampi, Karnataka</small>
                </div>
              </div>
              <div className="ph-img" style={{ backgroundImage: "url('https://picsum.photos/seed/hampi/600/400')" }} />
              <div className="ph-actions">
                <Heart size={20} strokeWidth={2} style={{ border: 'none' }} />
                <MessageCircle size={20} strokeWidth={2} style={{ border: 'none' }} />
                <Send size={20} strokeWidth={2} style={{ border: 'none' }} />
              </div>
              <div className="ph-body">
                <b>84,201 likes</b>
                <br />
                <b>ananya.wanders</b> Sunrise over the boulders. Never gets old.{' '}
                <span className="ph-tag">#IncredibleIndia #BuzzPulse</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
