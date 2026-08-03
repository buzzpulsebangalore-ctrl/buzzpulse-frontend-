import { Link } from 'react-router-dom';
import {
  Banknote,
  Plane,
  Building2,
  Target,
  BadgeCheck,
  Sparkles,
  ShieldCheck,
  LayoutDashboard,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import Ticker from './Ticker';
import Nav from './Nav';
import Footer from './Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { brandsHiring, type CreatorTier } from '../data';
import { WRAP, SECTION_PAD } from '../styles';

interface Perk {
  icon: LucideIcon;
  title: string;
  desc: string;
}

// Same promise made on the homepage sign-up flow — kept identical here.
const creatorPerks: Perk[] = [
  { icon: Banknote, title: 'Paid in 7 days', desc: 'Flat rates agreed upfront. No chasing invoices, no revenue share.' },
  { icon: Plane, title: 'Fully funded trips', desc: 'Tourism board campaigns cover travel, stay and shoot costs.' },
  { icon: Building2, title: 'Government briefs', desc: 'Work on national programmes that reach millions of citizens.' },
  { icon: Target, title: 'Briefs that fit', desc: 'You only see campaigns matched to your niche and audience.' },
];

interface TierInfo {
  tier: CreatorTier;
  range: string;
  desc: string;
}

const tiers: TierInfo[] = [
  { tier: 'Nano', range: 'Under 10K followers', desc: 'Hyper-loyal, niche audiences — the fastest-growing part of the network.' },
  { tier: 'Micro', range: '10K – 100K followers', desc: 'The sweet spot for most brand briefs: real reach, real engagement.' },
  { tier: 'Macro', range: '100K+ followers', desc: 'Mass reach for national launches, tourism campaigns and government programmes.' },
];

const brandPoints: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: BadgeCheck, title: 'Verified, always', desc: 'Every creator is reviewed by hand before their profile goes live.' },
  { icon: Sparkles, title: 'AI-matched', desc: 'Match Score and fraud detection surface the right fit before you spend a rupee.' },
  { icon: LayoutDashboard, title: 'One workspace', desc: 'Discovery, briefs, contracts, payments and reporting — no spreadsheets and DMs.' },
];

function PerkCard({ p, index }: { p: Perk; index: number }) {
  const ref = useScrollReveal<HTMLDivElement>();
  const Icon = p.icon;
  return (
    <div
      ref={ref}
      className="reveal rounded-2xl border border-black/5 bg-white p-6 shadow-[0_10px_30px_-12px_rgba(10,10,15,.15)]"
      style={{ transitionDelay: `${(index % 4) * 0.07}s` }}
    >
      <div className="mb-3.5 grid h-12 w-12 place-items-center rounded-2xl bg-(--ink) text-white">
        <Icon size={20} strokeWidth={1.8} style={{ border: 'none' }} />
      </div>
      <h3 className="mb-1.5 text-base font-bold">{p.title}</h3>
      <p className="text-sm leading-relaxed text-[#54506E]">{p.desc}</p>
    </div>
  );
}

function TierCard({ t, index }: { t: TierInfo; index: number }) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal rounded-2xl border border-black/5 bg-white p-6 shadow-[0_10px_30px_-12px_rgba(10,10,15,.15)]"
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <span className="tag t-violet">{t.tier}</span>
      <h3 className="mb-1.5 text-lg font-bold">{t.range}</h3>
      <p className="text-sm leading-relaxed text-[#54506E]">{t.desc}</p>
    </div>
  );
}

export default function CareersPage() {
  const sampleBrands = brandsHiring.slice(0, 10);

  return (
    <>
      <Ticker />
      <Nav />

      <section className={SECTION_PAD}>
        <div className={`${WRAP} max-w-[780px]`}>
          <span className="tag t-violet">Careers</span>
          <h1 className="mb-5 text-[clamp(34px,5vw,58px)]">
            Your career grows <span className="grad-text">every time you get booked</span>.
          </h1>
          <p className="mb-6 text-lg leading-relaxed text-[#34343C]">
            BuzzPulse isn&rsquo;t a jobs board — it&rsquo;s the platform that builds careers by putting verified
            creators in front of real brands, tourism boards and government bodies. Every booking, every brief,
            every paid campaign moves your career forward.
          </p>
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
      </section>

      <section className={SECTION_PAD} style={{ background: '#F7F7FA' }}>
        <div className={WRAP}>
          <div className="shead">
            <span className="tag t-cyan">For creators</span>
            <h2>Get paid to tell the story.</h2>
            <p>
              Influencer, filmmaker, travel blogger, photographer? Join the network and collaborate with leading
              brands, tourism boards and government initiatives.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {creatorPerks.map((p, i) => (
              <PerkCard key={p.title} p={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className={SECTION_PAD}>
        <div className={WRAP}>
          <div className="shead">
            <span className="tag t-amber">Growth path</span>
            <h2>Nano, micro, macro — every tier gets briefs.</h2>
            <p>The bigger your audience, the bigger the brief — but every tier is actively booked.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {tiers.map((t, i) => (
              <TierCard key={t.tier} t={t} index={i} />
            ))}
          </div>
          <div className="mt-9 text-center">
            <Link to="/join/creator" className="btn btn-ink btn-lg inline-flex items-center gap-2">
              Become a creator
              <ArrowRight size={16} strokeWidth={2} style={{ border: 'none' }} />
            </Link>
          </div>
        </div>
      </section>

      <section className={SECTION_PAD} style={{ background: '#F7F7FA' }}>
        <div className={WRAP}>
          <div className="shead">
            <span className="tag t-pink">For brands</span>
            <h2>Careers grow faster with the right partner.</h2>
            <p>These brands are already running creator campaigns through BuzzPulse.</p>
          </div>
          <div className="mb-9 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {sampleBrands.map((b) => (
              <div
                key={b.name}
                className="rounded-2xl border border-black/5 bg-white px-4 py-6 text-center shadow-[0_4px_16px_-6px_rgba(10,10,15,.12)]"
              >
                <div
                  className="display mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl text-base text-white"
                  style={{ background: b.color }}
                >
                  {b.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="text-[13px] font-bold leading-tight">{b.name}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {brandPoints.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="flex items-start gap-3">
                  <div className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-[#F3EFFF] text-(--violet)">
                    <Icon size={18} strokeWidth={1.8} style={{ border: 'none' }} />
                  </div>
                  <div>
                    <b className="block text-sm font-bold">{b.title}</b>
                    <span className="text-[13px] leading-relaxed text-[#68687A]">{b.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-9 text-center">
            <Link to="/join/brand" className="btn btn-ink btn-lg inline-flex items-center gap-2">
              Launch a campaign
              <ArrowRight size={16} strokeWidth={2} style={{ border: 'none' }} />
            </Link>
          </div>
        </div>
      </section>

      <section className={SECTION_PAD}>
        <div className={`${WRAP} max-w-[640px] text-center`}>
          <ShieldCheck size={30} strokeWidth={1.8} className="mx-auto mb-4 text-(--violet)" style={{ border: 'none' }} />
          <span className="tag t-violet">Not sure which side you're on?</span>
          <h2 className="mb-4 text-[clamp(28px,3.6vw,42px)]">Start here — we'll route you.</h2>
          <p className="mb-7 text-[15px] leading-relaxed text-[#54506E]">
            Tell us whether you're building a following or a campaign, and we'll take you to the right place.
          </p>
          <Link to="/join" className="btn btn-ink btn-lg">
            Get started
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
