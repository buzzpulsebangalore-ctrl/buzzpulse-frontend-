import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Heart, LineChart, Target, Building2, type LucideIcon } from 'lucide-react';
import Ticker from './Ticker';
import Nav from './Nav';
import Footer from './Footer';
import StatsBand from './StatsBand';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { WRAP, SECTION_PAD } from '../styles';

interface Reason {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const reasons: Reason[] = [
  {
    icon: ShieldCheck,
    title: 'Every profile is checked by hand',
    desc: 'Follower counts, engagement authenticity and brand safety are reviewed by a real person before a creator goes live — not just a script.',
  },
  {
    icon: Zap,
    title: 'Days, not months',
    desc: 'Discovery, briefs, approvals and payments all live in one workspace, so campaigns launch in days instead of weeks of back-and-forth.',
  },
  {
    icon: Heart,
    title: 'Fair terms for creators',
    desc: 'Sign-up is free and stays free. No revenue share, no chasing invoices — creators are matched only to briefs that fit their niche.',
  },
  {
    icon: LineChart,
    title: 'Reporting you can trust',
    desc: 'Live dashboards tie every creator to reach, engagement and ROI, so you can show results without stitching together spreadsheets.',
  },
  {
    icon: Target,
    title: 'Match Score, not guesswork',
    desc: 'Every shortlist is ranked by audience overlap, brand safety and past performance, so you spend time briefing, not scrolling.',
  },
  {
    icon: Building2,
    title: 'Built for scale',
    desc: 'From a single product launch to a nationwide government campaign, it is the same vetted network and the same hands-on team.',
  },
];

const comparisons: [string, string][] = [
  ['Weeks of DMs and spreadsheets to shortlist creators', 'A ranked shortlist in minutes, filtered by niche and tier'],
  ['No way to tell if follower counts are real', 'Every profile manually vetted for authenticity and brand safety'],
  ['Chasing invoices and payment terms after a shoot', 'Flat rates agreed upfront, paid on the terms promised'],
  ['Campaign results scattered across screenshots', 'One live dashboard for reach, engagement and ROI'],
];

function ReasonCard({ r, index }: { r: Reason; index: number }) {
  const ref = useScrollReveal<HTMLDivElement>();
  const Icon = r.icon;
  return (
    <div
      ref={ref}
      className="reveal rounded-[20px] border border-black/5 bg-white/85 backdrop-blur-md p-6 shadow-[0_10px_30px_-12px_rgba(10,10,15,.15)]"
      style={{ transitionDelay: `${(index % 3) * 0.07}s` }}
    >
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-(--ink) text-white">
        <Icon size={22} strokeWidth={1.8} style={{ border: 'none' }} />
      </div>
      <h3 className="mb-2 text-lg font-bold">{r.title}</h3>
      <p className="text-sm leading-relaxed text-[#54506E]">{r.desc}</p>
    </div>
  );
}

export default function WhyUsPage() {
  return (
    <>
      <Ticker />
      <Nav />

      <section className={SECTION_PAD}>
        <div className={`${WRAP} max-w-[820px]`}>
          <span className="tag t-violet">Why BuzzPulse</span>
          <h1 className="mb-6 text-[clamp(34px,5vw,58px)]">
            The old way doesn&rsquo;t scale.
            <br />
            <span className="grad-text">This does.</span>
          </h1>
          <p className="text-lg leading-relaxed text-[#34343C]">
            Influencer marketing in India grew faster than the tools around it. We built BuzzPulse to fix the parts
            that were broken — verification, speed, fairness and reporting — instead of just listing more profiles.
          </p>
        </div>
      </section>

      <section className={SECTION_PAD} style={{ background: '#F7F7FA' }}>
        <div className={WRAP}>
          <div className="shead">
            <span className="tag t-cyan">Before and after</span>
            <h2>What changes when you switch.</h2>
            <p>The same campaign, run the old way and the BuzzPulse way.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-[20px] border border-black/5 bg-white p-6">
              <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-[#9A9AA8]">
                The old way
              </span>
              <ul className="flex flex-col gap-4">
                {comparisons.map(([before]) => (
                  <li key={before} className="text-sm leading-relaxed text-[#54506E]">
                    {before}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[20px] border border-black/5 bg-(--ink) p-6 text-white">
              <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-white/60">
                With BuzzPulse
              </span>
              <ul className="flex flex-col gap-4">
                {comparisons.map(([, after]) => (
                  <li key={after} className="text-sm leading-relaxed text-white/85">
                    {after}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={SECTION_PAD}>
        <div className={WRAP}>
          <div className="shead">
            <span className="tag t-pink">What sets us apart</span>
            <h2>Six reasons brands stay.</h2>
            <p>None of this is a gimmick — it is what it takes to book a creator with confidence.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <ReasonCard key={r.title} r={r} index={i} />
            ))}
          </div>
        </div>
      </section>

      <StatsBand />

      <section className="final-cta">
        <div className={`${WRAP} final-cta-in`}>
          <h2>See the difference for yourself.</h2>
          <p>Tell us the objective. We&rsquo;ll come back with a campaign, a creator list and a number.</p>
          <div className="final-cta-actions">
            <Link to="/join/brand" className="btn btn-ink btn-lg">
              Launch a campaign
            </Link>
            <Link to="/join/creator" className="btn btn-ghost btn-lg">
              Join as a creator
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
