import { Link } from 'react-router-dom';
import { WRAP } from '../styles';
import { brands } from '../data';
import HeroWall from './HeroWall';

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

const searchChips = ['Fashion', 'Beauty', 'Tech', 'Gaming', 'Finance', 'Travel', 'Food'];

export default function Hero() {
  return (
    <section className="hero">
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />
      <div className={`${WRAP} relative z-[2] grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14`}>
        <div className="max-w-xl">
          <div className="eyebrow">
            <span className="dot" /> 12,400+ creators live right now
          </div>
          <h1 className="mb-5 text-[clamp(38px,5.6vw,72px)]">
            Discover the <span className="grad-text">perfect creator</span> with AI.
          </h1>
          <p className="mb-7 max-w-[520px] text-lg leading-relaxed text-[#34343C]">
            India&rsquo;s premier platform for influencer marketing, destination branding, events and public
            engagement. Match with verified creators, launch in days, measure everything.
          </p>

          <div className="mb-8 flex flex-wrap gap-2">
            {searchChips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => scrollTo('creators')}
                className="rounded-full border border-black/10 bg-white px-3.5 py-2 text-[13px] font-semibold text-[#4A4670] transition-colors hover:border-(--violet) hover:text-(--violet)"
              >
                {c}
              </button>
            ))}
          </div>

          <div className="hero-cta">
            <button className="btn btn-ink btn-lg" onClick={() => scrollTo('creators')}>
              Find creators
            </button>
            <Link to="/join/creator" className="btn btn-ghost btn-lg">
              Become a creator
            </Link>
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

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#68687A]">Trusted by</span>
            <div className="flex flex-wrap items-center gap-4">
              {brands.slice(0, 5).map((b) => (
                <span key={b} className="text-sm font-black text-[#B3AFC9]">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        <HeroWall />
      </div>
    </section>
  );
}
