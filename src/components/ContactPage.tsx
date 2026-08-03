import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  Handshake,
  Clock,
  ShieldCheck,
  Users,
  Mail,
  Camera,
  Briefcase,
  AtSign,
  Plus,
  type LucideIcon,
} from 'lucide-react';
import Ticker from './Ticker';
import Nav from './Nav';
import Footer from './Footer';
import StatsBand from './StatsBand';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { WRAP, SECTION_PAD } from '../styles';

interface Channel {
  icon: LucideIcon;
  gradient: string;
  title: string;
  desc: string;
  action: string;
  href: string;
}

const channels: Channel[] = [
  {
    icon: Handshake,
    gradient: 'from-(--hot) to-(--violet)',
    title: 'Talk to sales',
    desc: 'Planning a campaign or want a platform walkthrough? We’ll get back within a business day.',
    action: 'sales@thebuzzpulse.com',
    href: 'mailto:sales@thebuzzpulse.com',
  },
  {
    icon: MessageCircle,
    gradient: 'from-(--violet) to-(--cyan)',
    title: 'Get support',
    desc: 'Already on the platform and need a hand with your account, a booking or a payment?',
    action: 'support@thebuzzpulse.com',
    href: 'mailto:support@thebuzzpulse.com',
  },
  {
    icon: Phone,
    gradient: 'from-(--amber) to-(--hot)',
    title: 'Call us',
    desc: 'Prefer to talk it through? Reach the team directly, Mon–Sat, 10am–7pm IST.',
    action: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
];

const trustPoints: { icon: LucideIcon; text: string }[] = [
  { icon: Clock, text: 'Under 48-hour response' },
  { icon: ShieldCheck, text: 'Real humans, no bots' },
  { icon: Users, text: 'Routed to the right person' },
];

const socials: { icon: LucideIcon; label: string; href: string }[] = [
  { icon: Camera, label: 'Instagram', href: '#' },
  { icon: Briefcase, label: 'LinkedIn', href: '#' },
  { icon: AtSign, label: 'X (Twitter)', href: '#' },
];

const faqs: [string, string][] = [
  ['How fast will I hear back?', 'Most queries get a reply within 48 hours, often much sooner on business days.'],
  [
    'Do you take on smaller campaigns?',
    'Yes. We work with everyone from D2C startups to national government programmes, so tell us the goal and we’ll scope it.',
  ],
  [
    'I’m a creator, not a brand. Who do I talk to?',
    'Head to our creator application instead. It’s the fastest way to get matched to briefs.',
  ],
  [
    'Can I get support on an existing campaign?',
    'Email support@thebuzzpulse.com or call us directly, and existing clients get priority routing.',
  ],
];

function ChannelCard({ c, index }: { c: Channel; index: number }) {
  const ref = useScrollReveal<HTMLAnchorElement>();
  const Icon = c.icon;
  return (
    <a
      ref={ref}
      href={c.href}
      className="reveal group block rounded-[20px] border border-black/5 bg-white p-7 shadow-[0_10px_30px_-12px_rgba(10,10,15,.15)] transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_24px_46px_-20px_rgba(10,10,15,.28)]"
      style={{ transitionDelay: `${index * 0.07}s` }}
    >
      <div className={`mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br ${c.gradient} text-white`}>
        <Icon size={24} strokeWidth={1.8} style={{ border: 'none' }} />
      </div>
      <h3 className="mb-2.5 text-[19px] font-bold tracking-tight">{c.title}</h3>
      <p className="mb-5 text-sm leading-relaxed text-[#54506E]">{c.desc}</p>
      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-(--ink) transition-all group-hover:gap-2.5">
        {c.action} →
      </span>
    </a>
  );
}

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Ticker />
      <Nav />

      <section className="hero" style={{ padding: '64px 0 40px' }}>
        <div className="blob b1" />
        <div className="blob b2" />
        <div className={`${WRAP} relative z-2 mx-auto max-w-190 text-center`}>
          <div className="eyebrow mx-auto">
            <span className="dot" /> We reply within 48 hours
          </div>
          <h1 className="mb-5 text-[clamp(34px,5vw,58px)]">
            Whatever you&rsquo;re building, <span className="grad-text">let&rsquo;s talk.</span>
          </h1>
          <p className="mx-auto max-w-140 text-lg leading-relaxed text-[#34343C]">
            Whether you&rsquo;re launching a campaign or growing as a creator, tell us what you need. We&rsquo;ll get
            it to the right person, whether you&rsquo;re a brand, a tourism board, a government body or an
            influencer.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-x-8 gap-y-4">
            {trustPoints.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.text} className="flex items-center gap-2 text-sm font-bold text-(--ink)">
                  <Icon size={16} strokeWidth={2} style={{ border: 'none' }} />
                  {t.text}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={SECTION_PAD} style={{ paddingTop: 0 }}>
        <div className={WRAP}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {channels.map((c, i) => (
              <ChannelCard key={c.title} c={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      <StatsBand />

      <section className={SECTION_PAD}>
        <div className={`${WRAP} grid gap-10 lg:grid-cols-2 lg:items-center`}>
          <div>
            <span className="tag t-cyan">Prefer social?</span>
            <h2 className="mb-4 text-[clamp(28px,3.6vw,42px)]">Find us where you already are.</h2>
            <p className="mb-6 text-[15px] leading-relaxed text-[#54506E]">
              DM us on Instagram or LinkedIn if that&rsquo;s easier. It&rsquo;s the same team and the same 48-hour
              promise, just a different inbox.
            </p>
            <div className="flex flex-wrap gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="grid h-12 w-12 place-items-center rounded-full border border-black/10 bg-white text-(--ink) shadow-[0_8px_20px_-14px_rgba(10,10,15,.3)] transition-all hover:-translate-y-1 hover:border-(--violet) hover:text-(--violet)"
                  >
                    <Icon size={19} strokeWidth={1.8} style={{ border: 'none' }} />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-[0_20px_44px_-20px_rgba(10,10,15,.25)]">
            <span className="tag t-pink">Our promise</span>
            <ul className="flex flex-col gap-5">
              {[
                'No call centers, no chatbots. A real strategist reads and replies personally.',
                'Every message gets routed to the person who can actually solve it.',
                'You&rsquo;ll always know what happens next, and by when.',
              ].map((line) => (
                <li key={line} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#34343C]">
                  <ShieldCheck
                    size={18}
                    strokeWidth={2}
                    className="mt-0.5 flex-none text-(--violet)"
                    style={{ border: 'none' }}
                  />
                  <span dangerouslySetInnerHTML={{ __html: line }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="faq" className={SECTION_PAD} style={{ background: '#F7F7FA' }}>
        <div className={WRAP}>
          <div className="shead mx-auto text-center">
            <span className="tag t-amber">FAQ</span>
            <h2>Before you reach out.</h2>
          </div>
          <div className="mx-auto max-w-190">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f[0]} className="mb-3 overflow-hidden rounded-2xl border border-black/5 bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-bold"
                    aria-expanded={open}
                  >
                    {f[0]}
                    <Plus
                      size={22}
                      className={`flex-none transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
                      style={{ border: 'none' }}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-[#5A5680]">{f[1]}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="final-cta relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-90 w-90 -translate-x-1/2 rounded-full bg-white/25 blur-[100px]"
          aria-hidden="true"
        />
        <div className={`${WRAP} final-cta-in relative`}>
          <Mail size={30} strokeWidth={2} className="mx-auto mb-5" style={{ border: 'none' }} />
          <h2>Not ready to talk yet?</h2>
          <p>Have a look at our real campaign results first, or just jump straight in as a brand or a creator.</p>
          <div className="final-cta-actions">
            <Link to="/case-studies" className="btn btn-white btn-lg">
              See case studies
            </Link>
            <Link to="/join" className="btn btn-ink btn-lg">
              Get started free
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
