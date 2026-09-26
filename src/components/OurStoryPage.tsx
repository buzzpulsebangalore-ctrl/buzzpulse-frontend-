import { Link } from 'react-router-dom';
import { Lightbulb, Rocket, TrendingUp, Globe, type LucideIcon } from 'lucide-react';
import Ticker from './Ticker';
import Nav from './Nav';
import Footer from './Footer';
import StatsBand from './StatsBand';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { WRAP, SECTION_PAD } from '../styles';

interface Milestone {
  icon: LucideIcon;
  year: string;
  title: string;
  desc: string;
}

const milestones: Milestone[] = [
  {
    icon: Lightbulb,
    year: '2023',
    title: 'The idea',
    desc: 'A small team frustrated with spreadsheets and unverified follower counts starts sketching a better way to book creators.',
  },
  {
    icon: Rocket,
    year: '2024',
    title: 'Platform launch',
    desc: 'BuzzPulse goes live in Bengaluru with a manually vetted creator network and its first brand campaigns.',
  },
  {
    icon: TrendingUp,
    year: '2025',
    title: 'National scale',
    desc: 'The network crosses thousands of verified creators across every major Indian state, with government and enterprise brands on board.',
  },
  {
    icon: Globe,
    year: '2026',
    title: 'One workspace',
    desc: 'Discovery, briefs, contracts, payments and reporting come together in a single live dashboard for every campaign.',
  },
];

function MilestoneCard({ m, index }: { m: Milestone; index: number }) {
  const ref = useScrollReveal<HTMLDivElement>();
  const Icon = m.icon;
  return (
    <div ref={ref} className="step reveal" style={{ transitionDelay: `${(index % 4) * 0.07}s` }}>
      <span className="step-num-bg">{m.year}</span>
      <div className="step-badge">
        <Icon size={22} strokeWidth={2} style={{ border: 'none' }} />
      </div>
      <div className="step-n">{m.year}</div>
      <h3>{m.title}</h3>
      <p>{m.desc}</p>
    </div>
  );
}

export default function OurStoryPage() {
  return (
    <>
      <Ticker />
      <Nav />

      <section className={SECTION_PAD}>
        <div className={`${WRAP} max-w-[820px]`}>
          <span className="tag t-violet">Our Story</span>
          <h1 className="mb-6 text-[clamp(34px,5vw,58px)]">
            From a shared frustration to
            <br />
            <span className="grad-text">a platform brands trust.</span>
          </h1>
          <p className="text-lg leading-relaxed text-[#34343C]">
            BuzzPulse started with a simple problem: finding the right creator for a campaign meant weeks of DMs,
            spreadsheets and guesswork, and nobody could say for sure if those follower numbers were real.
          </p>
        </div>
      </section>

      <section className={SECTION_PAD} style={{ background: '#F7F7FA' }}>
        <div className={`${WRAP} grid gap-10 lg:grid-cols-2 lg:items-center`}>
          <div className="rounded-[24px] border border-black/5 bg-white/85 backdrop-blur-md p-8 shadow-[0_20px_44px_-20px_rgba(10,10,15,.25)]">
            <p className="mb-6 text-[15px] leading-relaxed text-[#34343C]">
              &ldquo;We didn&rsquo;t want to build another marketplace that just lists names and follower counts. We
              wanted something we&rsquo;d actually trust to book a creator for our own campaign.&rdquo;
            </p>
            <div>
              <b className="block text-sm font-bold">The BuzzPulse founding team</b>
              <span className="text-xs text-[#68687A]">Bengaluru, India</span>
            </div>
          </div>
          <div>
            <span className="tag t-cyan">The vision</span>
            <h2 className="mb-4 text-[clamp(28px,3.6vw,42px)]">Verified people, not just profiles.</h2>
            <p className="text-[15px] leading-relaxed text-[#54506E]">
              Every feature we&rsquo;ve shipped comes back to the same idea: a booking should be as trustworthy as
              hiring someone you already know. That means real humans reviewing every profile, transparent terms for
              creators, and reporting that brands can actually stand behind.
            </p>
          </div>
        </div>
      </section>

      <section className={SECTION_PAD}>
        <div className={WRAP}>
          <div className="shead">
            <span className="tag t-pink">Milestones</span>
            <h2>How we got here.</h2>
            <p>A short timeline of the biggest steps so far.</p>
          </div>
          <div className="proc">
            {milestones.map((m, i) => (
              <MilestoneCard key={m.year} m={m} index={i} />
            ))}
          </div>
        </div>
      </section>

      <StatsBand />

      <section className="final-cta">
        <div className={`${WRAP} final-cta-in`}>
          <h2>Be part of the next chapter.</h2>
          <p>Whether you&rsquo;re launching a campaign or growing as a creator, there&rsquo;s a place for you here.</p>
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
