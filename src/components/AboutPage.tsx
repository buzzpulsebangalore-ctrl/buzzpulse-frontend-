import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Heart, Users, type LucideIcon } from 'lucide-react';
import Ticker from './Ticker';
import Nav from './Nav';
import Footer from './Footer';
import StatsBand from './StatsBand';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { WRAP, SECTION_PAD } from '../styles';

interface Value {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const values: Value[] = [
  {
    icon: ShieldCheck,
    title: 'Verified, always',
    desc: 'We check every creator by hand before their profile goes live. Follower counts, engagement, audience quality, brand safety. If something looks off, we ask questions before we approve it.',
  },
  {
    icon: Zap,
    title: 'Built for speed',
    desc: 'Applications get reviewed fast, and booking requests get a response fast. Campaigns run on deadlines, so we try not to sit on anything.',
  },
  {
    icon: Heart,
    title: 'Fair to creators',
    desc: 'Joining is free and stays free. No revenue share, no hidden cuts. You only see briefs that actually match your niche and your audience.',
  },
  {
    icon: Users,
    title: 'People, not just software',
    desc: 'Our tools help us search faster and catch fake followers sooner, but a real person still reviews every profile and every campaign before it gets approved.',
  },
];

function ValueCard({ v, index }: { v: Value; index: number }) {
  const ref = useScrollReveal<HTMLDivElement>();
  const Icon = v.icon;
  return (
    <div
      ref={ref}
      className="reveal rounded-[20px] border border-black/5 bg-white p-6 shadow-[0_10px_30px_-12px_rgba(10,10,15,.15)]"
      style={{ transitionDelay: `${(index % 4) * 0.07}s` }}
    >
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-(--ink) text-white">
        <Icon size={22} strokeWidth={1.8} style={{ border: 'none' }} />
      </div>
      <h3 className="mb-2 text-lg font-bold">{v.title}</h3>
      <p className="text-sm leading-relaxed text-[#54506E]">{v.desc}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Ticker />
      <Nav />

      <section className={SECTION_PAD}>
        <div className={`${WRAP} max-w-[820px]`}>
          <span className="tag t-violet">About BuzzPulse</span>
          <h1 className="mb-6 text-[clamp(34px,5vw,58px)]">
            Creating Buzz.
            <br />
            <span className="grad-text">Driving Impact.</span>
          </h1>
          <p className="mb-5 text-lg leading-relaxed text-[#34343C]">
            The Buzz Pulse started with a simple frustration: finding the right creator for a campaign meant weeks of
            DMs, spreadsheets and guesswork, and nobody could tell you if those follower numbers were even real. So
            we built a platform that fixes that.
          </p>
          <p className="text-lg leading-relaxed text-[#34343C]">
            Today, brands, tourism boards and government bodies use BuzzPulse to find verified creators, book them
            directly and launch campaigns in days instead of months. Every profile is reviewed by a real person
            before it goes live, and every booking is handled by our team, not an algorithm you can't talk to.
          </p>
        </div>
      </section>

      <StatsBand />

      <section className={SECTION_PAD} style={{ background: '#F7F7FA' }}>
        <div className={`${WRAP} grid gap-10 lg:grid-cols-2 lg:items-center`}>
          <div>
            <span className="tag t-cyan">Our story</span>
            <h2 className="mb-4 text-[clamp(28px,3.6vw,42px)]">Why we built this.</h2>
            <p className="mb-4 text-[15px] leading-relaxed text-[#54506E]">
              Influencer marketing in India was growing fast, but the tools around it hadn't caught up. Brands were
              paying for reach that didn't exist. Creators were chasing invoices for months after a shoot. Government
              campaigns were coordinating hundreds of creators over WhatsApp groups and hoping nothing fell through
              the cracks.
            </p>
            <p className="text-[15px] leading-relaxed text-[#54506E]">
              We thought there had to be a better way, so we built one. We're a small team based in India, and we
              still read every creator application and every booking request ourselves. That's not going to change
              as we grow.
            </p>
          </div>
          <div className="rounded-[24px] border border-black/5 bg-white p-8 shadow-[0_20px_44px_-20px_rgba(10,10,15,.25)]">
            <p className="mb-6 text-[15px] leading-relaxed text-[#34343C]">
              &ldquo;We didn't want to build another marketplace that just lists names and follower counts. We wanted
              something we'd actually trust to book a creator for our own campaign.&rdquo;
            </p>
            <div>
              <b className="block text-sm font-bold">The BuzzPulse team</b>
              <span className="text-xs text-[#68687A]">Bengaluru, India</span>
            </div>
          </div>
        </div>
      </section>

      <section className={SECTION_PAD}>
        <div className={WRAP}>
          <div className="shead">
            <span className="tag t-pink">What we stand for</span>
            <h2>The principles behind the platform.</h2>
            <p>Four things we try not to compromise on, no matter how fast we're moving.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <ValueCard key={v.title} v={v} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className={SECTION_PAD} style={{ background: '#F7F7FA' }}>
        <div className={`${WRAP} grid gap-10 lg:grid-cols-2`}>
          <div>
            <span className="tag t-cyan">Who we work with</span>
            <h2 className="mb-4 text-[clamp(28px,3.6vw,42px)]">Brands, tourism boards and government.</h2>
            <p className="text-[15px] leading-relaxed text-[#54506E]">
              From a single product launch with a handful of creators to a multi state tourism campaign or a
              national awareness programme, it's the same vetted network and the same hands on team, just scaled to
              fit the brief.
            </p>
          </div>
          <div>
            <span className="tag t-amber">Who we're for</span>
            <h2 className="mb-4 text-[clamp(28px,3.6vw,42px)]">Creators who want real briefs.</h2>
            <p className="text-[15px] leading-relaxed text-[#54506E]">
              Influencers, filmmakers, travel bloggers and photographers join for free, get matched only to campaigns
              that fit their niche and audience, and get paid on the terms they agreed to. No revenue share, no
              chasing invoices.
            </p>
          </div>
        </div>
      </section>

      <section className={SECTION_PAD}>
        <div className={`${WRAP} max-w-[640px] text-center`}>
          <span className="tag t-violet">Want to know more?</span>
          <h2 className="mb-4 text-[clamp(28px,3.6vw,42px)]">We're happy to talk it through.</h2>
          <p className="mb-7 text-[15px] leading-relaxed text-[#54506E]">
            Whether you're planning a campaign, curious about the platform, or thinking about applying as a creator,
            reach out and a real person will get back to you.
          </p>
          <Link to="/contact" className="btn btn-ink btn-lg">
            Get in touch
          </Link>
        </div>
      </section>

      <section className="final-cta">
        <div className={`${WRAP} final-cta-in`}>
          <h2>Let's build something people talk about.</h2>
          <p>Tell us the objective. We'll come back with a campaign, a creator list and a number.</p>
          <div className="final-cta-actions">
            <Link to="/join/brand" className="btn btn-white btn-lg">
              Launch a campaign
            </Link>
            <Link to="/join/creator" className="btn btn-ink btn-lg">
              Join as a creator
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
