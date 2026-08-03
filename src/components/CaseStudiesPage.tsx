import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Bot,
  ShieldCheck,
  Settings,
  BadgeCheck,
  BarChart3,
  TrendingUp,
  Repeat,
  Users,
  ClipboardList,
  Search,
  Mail,
  Clapperboard,
  Rocket,
  Star,
  Plus,
  Sparkles,
  Shirt,
  ShoppingBag,
  Gamepad2,
  UtensilsCrossed,
  HeartPulse,
  Laptop,
  GraduationCap,
  Plane,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import Ticker from './Ticker';
import Nav from './Nav';
import Footer from './Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { WRAP, SECTION_PAD } from '../styles';

interface CaseStudy {
  id: string;
  brand: string;
  industry: string;
  platform: string;
  from: string;
  to: string;
  imgSeed: string;
  objective: string;
  challenge: string;
  goal: string;
  strategy: string;
  creators: string;
  content: string;
  kpis: [string, string][];
  table: [string, string][];
}

const caseStudies: CaseStudy[] = [
  {
    id: 'lumiglow',
    brand: 'LumiGlow',
    industry: 'Beauty',
    platform: 'Instagram',
    from: '#FF962D',
    to: '#FF7A00',
    imgSeed: 'bp-cs-beauty',
    objective: 'Product launch — new vitamin-C serum',
    challenge:
      'A crowded skincare shelf and near-zero awareness for a hero SKU ahead of a festive launch window.',
    goal: 'Drive launch-week awareness and first-time trials with a measurable cost-per-acquisition ceiling.',
    strategy:
      'A tiered creator mix — 40 micro dermatology and skincare voices for credibility, 6 macro beauty names for reach — seeding the serum three weeks pre-launch with an authentic before/after arc.',
    creators: '46 activated · 88% micro/mid, 12% macro · all audience-verified, under 3% fake-follower score.',
    content: '46 Reels, 120+ Stories, 14 long-form reviews, 30 pieces of licensed UGC for paid amplification.',
    kpis: [
      ['Reach', '12.4M'],
      ['Engagement', '8.6%'],
      ['Conversions', '12,500'],
      ['ROAS', '7.8x'],
    ],
    table: [
      ['Reach', '12.4M'],
      ['Impressions', '21.9M'],
      ['Engagement rate', '8.6%'],
      ['Video views', '18.5M'],
      ['Link clicks', '480K'],
      ['Conversions', '12,500'],
      ['ROAS', '7.8x'],
      ['CPM improvement', '-34%'],
    ],
  },
  {
    id: 'fluxwear',
    brand: 'FluxWear',
    industry: 'Fashion',
    platform: 'Multi-platform',
    from: '#2F6FED',
    to: '#0B3FA8',
    imgSeed: 'bp-cs-fashion',
    objective: 'Brand awareness — Gen-Z apparel line',
    challenge: 'Strong product, weak cultural relevance with an 18–24 audience that ignores traditional ads.',
    goal: 'Build always-on brand affinity and grow owned social following ahead of a retail rollout.',
    strategy:
      'A 90-day creator engine across Instagram and YouTube — trend-led styling content, campus micro-creators and two hero collabs timed to drop days.',
    creators: '62 activated across fashion, lifestyle and comedy · blended nano-to-macro for reach and trust.',
    content: '170+ posts, 3 YouTube hauls, an owned UGC library of 90 assets.',
    kpis: [
      ['Reach', '28.1M'],
      ['Engagement', '9.4%'],
      ['New followers', '214K'],
      ['CPM', '-41%'],
    ],
    table: [
      ['Reach', '28.1M'],
      ['Impressions', '44.7M'],
      ['Engagement rate', '9.4%'],
      ['Video views', '31.2M'],
      ['New followers', '214K'],
      ['Website sessions', '362K'],
      ['CPM improvement', '-41%'],
      ['Brand-lift (recall)', '+27pts'],
    ],
  },
  {
    id: 'novapay',
    brand: 'NovaPay',
    industry: 'Finance',
    platform: 'YouTube',
    from: '#123A8F',
    to: '#2F6FED',
    imgSeed: 'bp-cs-finance',
    objective: 'App installs — fintech UPI app',
    challenge: 'High trust barrier in finance; paid installs plateaued with a rising cost-per-install.',
    goal: 'Lower blended CPI and drive verified sign-ups through credible finance educators.',
    strategy:
      'Long-form explainer content from finance YouTubers with trackable deep links and a first-transaction incentive, layered with short-form recap Reels.',
    creators: '21 finance and business creators · vetted for compliance-safe messaging.',
    content: '21 long-form videos, 40 Shorts/Reels, 18 Stories with swipe-up install links.',
    kpis: [
      ['Installs', '340K'],
      ['CPI', '-52%'],
      ['Sign-ups', '96K'],
      ['ROAS', '5.1x'],
    ],
    table: [
      ['Reach', '9.8M'],
      ['Video views', '14.2M'],
      ['App installs', '340K'],
      ['Verified sign-ups', '96,000'],
      ['First transactions', '61,400'],
      ['Cost per install', '-52%'],
      ['ROAS', '5.1x'],
      ['Retention (D30)', '+18%'],
    ],
  },
  {
    id: 'crispco',
    brand: 'CrispCo',
    industry: 'FMCG',
    platform: 'Instagram',
    from: '#FFB066',
    to: '#FF962D',
    imgSeed: 'bp-cs-fmcg',
    objective: 'Sales — snack range in modern trade',
    challenge: 'Driving offline sales lift that could be attributed back to social activity.',
    goal: 'Create measurable footfall and redemption via creator-led coupon codes.',
    strategy:
      'Regional food creators in six cities with unique discount codes, geo-tagged content and a recipe-hack format.',
    creators: '38 regional food and lifestyle creators across 6 metros.',
    content: '38 Reels, 60+ Stories, 22 UGC assets for in-store screens.',
    kpis: [
      ['Reach', '7.1M'],
      ['Redemptions', '44K'],
      ['Sales lift', '+31%'],
      ['ROAS', '6.4x'],
    ],
    table: [
      ['Reach', '7.1M'],
      ['Engagement rate', '10.1%'],
      ['Coupon redemptions', '44,200'],
      ['Attributed sales lift', '+31%'],
      ['New buyers', '28,900'],
      ['ROAS', '6.4x'],
      ['CPM improvement', '-29%'],
      ['Content reused (paid)', '22 assets'],
    ],
  },
  {
    id: 'stackflow',
    brand: 'StackFlow',
    industry: 'SaaS',
    platform: 'LinkedIn',
    from: '#0B3FA8',
    to: '#2F6FED',
    imgSeed: 'bp-cs-saas',
    objective: 'Lead generation — B2B workflow tool',
    challenge: 'Reaching decision-makers without burning budget on broad, low-intent impressions.',
    goal: 'Generate qualified demo requests through trusted B2B creators.',
    strategy:
      'LinkedIn thought-leaders and niche operator-creators producing use-case content with gated demo CTAs and a co-hosted webinar.',
    creators: '14 B2B/operator creators · audience skewed to founders and ops leaders.',
    content: '14 carousel posts, 6 long-form videos, 1 co-hosted webinar (2.4K live).',
    kpis: [
      ['Reach', '3.2M'],
      ['Demo requests', '1,880'],
      ['CPL', '-46%'],
      ['Pipeline', '₹4.2Cr'],
    ],
    table: [
      ['Reach', '3.2M'],
      ['Impressions', '5.6M'],
      ['Engagement rate', '6.8%'],
      ['Demo requests', '1,880'],
      ['Qualified leads (SQL)', '640'],
      ['Cost per lead', '-46%'],
      ['Influenced pipeline', '₹4.2Cr'],
      ['Closed-won (90d)', '₹78L'],
    ],
  },
  {
    id: 'treknest',
    brand: 'TrekNest',
    industry: 'Travel',
    platform: 'Multi-platform',
    from: '#FF7A00',
    to: '#2F6FED',
    imgSeed: 'bp-cs-travel',
    objective: 'UGC + awareness — travel booking app',
    challenge: 'Needed a steady stream of authentic destination content and off-season demand.',
    goal: 'Build a UGC engine and lift off-season bookings in three regions.',
    strategy:
      'Fully-funded creator trips across travel, couple and photography niches, with a branded hashtag challenge and always-on UGC licensing.',
    creators: '29 travel creators · couple, solo and photography sub-niches.',
    content: '29 Reels, 8 YouTube vlogs, 140+ Stories, 210 licensed UGC assets.',
    kpis: [
      ['Reach', '16.7M'],
      ['UGC created', '210'],
      ['Bookings', '+38%'],
      ['ROAS', '6.9x'],
    ],
    table: [
      ['Reach', '16.7M'],
      ['Impressions', '29.3M'],
      ['Engagement rate', '9.1%'],
      ['Video views', '22.4M'],
      ['UGC assets licensed', '210'],
      ['Off-season bookings', '+38%'],
      ['ROAS', '6.9x'],
      ['CPM improvement', '-33%'],
    ],
  },
];

const metrics: [string, string][] = [
  ['2B+', 'Reach generated'],
  ['50,000+', 'Creators activated'],
  ['10,000+', 'Campaigns managed'],
  ['95%', 'Client retention'],
  ['4.8', 'Avg. campaign rating'],
  ['30+', 'Countries served'],
];

const timeline: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: ClipboardList, title: 'Brief', desc: 'Goals and KPIs locked' },
  { icon: Search, title: 'Discovery', desc: 'AI creator shortlist' },
  { icon: Mail, title: 'Outreach', desc: 'Contracts and briefs' },
  { icon: Clapperboard, title: 'Content', desc: 'Creation and approvals' },
  { icon: Rocket, title: 'Launch', desc: 'Go live, all channels' },
  { icon: BarChart3, title: 'Analytics', desc: 'Full ROI report' },
];

const whyUs: { icon: LucideIcon; gradient: string; title: string; desc: string }[] = [
  {
    icon: Bot,
    gradient: 'from-(--hot) to-(--violet)',
    title: 'AI creator discovery',
    desc: 'Search 10M+ profiles by intent and get AI-ranked fit scores.',
  },
  {
    icon: ShieldCheck,
    gradient: 'from-(--violet) to-(--cyan)',
    title: 'Fraud detection',
    desc: 'Fake-follower and engagement-pod screening on every profile.',
  },
  {
    icon: Settings,
    gradient: 'from-(--cyan) to-(--amber)',
    title: 'Campaign automation',
    desc: 'Briefs, approvals, deliverables and reminders on autopilot.',
  },
  {
    icon: BadgeCheck,
    gradient: 'from-(--amber) to-(--hot)',
    title: 'Verified creators',
    desc: 'Manually vetted audiences and brand-safety scoring.',
  },
  {
    icon: BarChart3,
    gradient: 'from-(--violet) to-(--amber)',
    title: 'Analytics dashboard',
    desc: 'Live reach, engagement and conversion tracking.',
  },
  {
    icon: TrendingUp,
    gradient: 'from-(--hot) to-(--amber)',
    title: 'ROI tracking',
    desc: 'UTM and deep-link attribution tied back to revenue.',
  },
  {
    icon: Repeat,
    gradient: 'from-(--cyan) to-(--violet)',
    title: 'End-to-end management',
    desc: 'Concept to payout in a single workspace.',
  },
  {
    icon: Users,
    gradient: 'from-(--amber) to-(--violet)',
    title: 'Dedicated support',
    desc: 'A strategist on every enterprise campaign.',
  },
];

const testimonials = [
  {
    quote:
      'BuzzPulse turned influencer marketing from a guessing game into a forecastable channel. The ROI reporting alone changed how we plan budgets.',
    name: 'Meghna Iyer',
    role: 'VP Growth, LumiGlow',
    avatarSeed: 9,
  },
  {
    quote:
      'The creator vetting is the real differentiator. Zero wasted spend on inflated accounts, and the fit scores were consistently accurate.',
    name: 'Rahul Bose',
    role: 'Head of Brand, CrispCo',
    avatarSeed: 14,
  },
  {
    quote:
      'We ran a five-market campaign end to end without a single spreadsheet. The dashboard kept every stakeholder aligned in real time.',
    name: 'Divya Nair',
    role: 'Marketing Director, TrekNest',
    avatarSeed: 24,
  },
];

const industries: { icon: LucideIcon; label: string }[] = [
  { icon: Sparkles, label: 'Beauty' },
  { icon: Shirt, label: 'Fashion' },
  { icon: ShoppingBag, label: 'E-commerce' },
  { icon: Gamepad2, label: 'Gaming' },
  { icon: UtensilsCrossed, label: 'Food' },
  { icon: HeartPulse, label: 'Healthcare' },
  { icon: Laptop, label: 'Technology' },
  { icon: GraduationCap, label: 'Education' },
  { icon: Plane, label: 'Travel' },
  { icon: Smartphone, label: 'Electronics' },
];

const faqs: [string, string][] = [
  [
    'How do you measure influencer campaign ROI?',
    'We tie every campaign to defined KPIs and use UTM tracking, deep links and promo codes for attribution, then report reach, engagement, conversions, ROAS and cost-per-result in a live dashboard.',
  ],
  [
    'How are creators selected for a campaign?',
    'Our AI shortlists creators by audience fit, engagement authenticity and brand safety. A strategist then curates the final list, and every profile is screened for fake followers before activation.',
  ],
  [
    'How long does a campaign take to launch?',
    'Most campaigns move from brief to live in two to three weeks, depending on creator count and content approvals. Always-on programs run continuously.',
  ],
  [
    'Which industries do you work with?',
    'Beauty, fashion, FMCG, SaaS, finance, healthcare, travel, gaming, education and consumer electronics, among others — with vetted creators in each vertical.',
  ],
  [
    'What reporting do brands receive?',
    'A live dashboard during the campaign plus a full post-campaign ROI report covering reach, engagement, conversions, ROAS and content performance.',
  ],
  [
    'How do you prevent influencer fraud?',
    'Fake-follower detection, engagement-pod screening and audience-authenticity scoring run on every profile before and during a campaign.',
  ],
];

function initials(name: string) {
  return name
    .replace(/[^A-Za-z ]/g, '')
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
}

function CaseStudyModal({ cs, onClose }: { cs: CaseStudy; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay modal-overlay-top" onClick={onClose}>
      <div
        className="modal-card relative flex flex-col"
        style={{ maxWidth: 720, padding: 0, maxHeight: '75vh', overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
          aria-label="Close"
          onClick={onClose}
        >
          <X size={18} strokeWidth={2} style={{ border: 'none' }} />
        </button>

        <div className="overflow-y-auto">
          <div
            className="relative p-8 text-white"
            style={{ background: `linear-gradient(135deg,${cs.from},${cs.to})`, borderRadius: '26px 26px 0 0' }}
          >
            <div
              className="mb-4 grid h-13 w-13 place-items-center rounded-2xl bg-white text-[20px] font-black"
              style={{ color: cs.from }}
            >
              {initials(cs.brand)}
            </div>
            <h2 className="mb-1.5 text-[26px]">{cs.brand}</h2>
            <p className="max-w-130 text-[15px] opacity-90">
              {cs.industry} · {cs.platform} · {cs.objective}
            </p>
          </div>

          <div className="p-8">
            {[
              ['Business challenge', cs.challenge],
              ['Goals', cs.goal],
              ['Campaign strategy', cs.strategy],
              ['Creator selection', cs.creators],
              ['Content produced', cs.content],
            ].map(([label, text]) => (
              <div key={label} className="mb-6">
                <h4 className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-(--violet)">{label}</h4>
                <p className="text-[15px] leading-relaxed text-[#3E3B5C]">{text}</p>
              </div>
            ))}

            <div className="mb-6">
              <h4 className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-(--violet)">Performance metrics</h4>
              <div className="overflow-hidden rounded-xl border border-black/10">
                <table className="w-full border-collapse text-[15px]">
                  <thead>
                    <tr>
                      <th className="bg-[#F7F7FA] px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wide text-[#9A9AA8]">
                        Metric
                      </th>
                      <th className="bg-[#F7F7FA] px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wide text-[#9A9AA8]">
                        Result
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cs.table.map((row) => (
                      <tr key={row[0]} className="border-t border-black/5">
                        <td className="px-4 py-3 font-semibold">{row[0]}</td>
                        <td className="px-4 py-3 text-right font-extrabold">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Link to="/contact" className="btn btn-ink w-full justify-center text-center">
              Book a demo like {cs.brand}&rsquo;s →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedCase({ cs, index, onOpen }: { cs: CaseStudy; index: number; onOpen: (id: string) => void }) {
  const ref = useScrollReveal<HTMLDivElement>();
  const reversed = index % 2 === 1;
  return (
    <article
      ref={ref}
      className={`reveal grid overflow-hidden rounded-[22px] border border-black/5 bg-white shadow-[0_20px_44px_-24px_rgba(10,10,15,.3)] lg:grid-cols-2`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div
        className={`relative min-h-[280px] bg-cover bg-center ${reversed ? 'lg:order-2' : ''}`}
        style={{
          backgroundImage: `linear-gradient(140deg,${cs.from}dd,rgba(10,10,15,.35)), url('https://picsum.photos/seed/${cs.imgSeed}/700/500')`,
        }}
      >
        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-xl bg-white/95 px-3.5 py-2 font-extrabold backdrop-blur">
          <span
            className="grid h-6 w-6 place-items-center rounded-md text-[11px] font-extrabold text-white"
            style={{ background: cs.from }}
          >
            {initials(cs.brand)}
          </span>
          {cs.brand}
        </div>
        <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-black/70 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur">
            {cs.industry}
          </span>
          <span className="rounded-full bg-black/70 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur">
            {cs.platform}
          </span>
        </div>
      </div>
      <div className="p-8">
        <div className="mb-3 text-xs font-extrabold uppercase tracking-widest text-(--violet)">{cs.objective}</div>
        <h3 className="mb-3.5 text-[22px]">{cs.challenge}</h3>
        <p className="mb-2 text-sm leading-relaxed text-[#54506E]">
          <b className="text-(--ink)">Strategy:</b> {cs.strategy}
        </p>
        <div className="my-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {cs.kpis.map((k) => (
            <div key={k[0]} className="rounded-xl bg-[#F7F7FA] px-2.5 py-3.5 text-center">
              <b className="grad-text block text-xl font-extrabold">{k[1]}</b>
              <span className="mt-1.5 block text-[10px] font-extrabold uppercase tracking-wide text-[#9A9AA8]">
                {k[0]}
              </span>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-(--violet) transition-all hover:gap-2.5"
          onClick={() => onOpen(cs.id)}
        >
          Read the full case study →
        </button>
      </div>
    </article>
  );
}

function LibraryCard({ cs, onOpen }: { cs: CaseStudy; onOpen: (id: string) => void }) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <article
      ref={ref}
      className="reveal flex cursor-pointer flex-col overflow-hidden rounded-[18px] border border-black/5 bg-white shadow-[0_10px_26px_-16px_rgba(10,10,15,.25)] transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_24px_46px_-20px_rgba(10,10,15,.32)]"
      onClick={() => onOpen(cs.id)}
    >
      <div
        className="relative h-[120px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(140deg,${cs.from}cc,rgba(10,10,15,.3)), url('https://picsum.photos/seed/${cs.imgSeed}/500/300')`,
        }}
      >
        <div
          className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-[10px] bg-white/95 text-sm font-extrabold"
          style={{ color: cs.from }}
        >
          {initials(cs.brand)}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4.5">
        <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-[#9A9AA8]">
          {cs.industry} · {cs.platform}
        </div>
        <h4 className="mb-3 text-[17px] leading-snug">{cs.objective}</h4>
        <div className="mt-auto flex gap-2 border-t border-black/5 pt-3.5">
          {cs.kpis.slice(0, 3).map((k) => (
            <div key={k[0]} className="flex-1 text-center">
              <b className="block text-base font-extrabold">{k[1]}</b>
              <span className="text-[9px] font-bold uppercase tracking-wide text-[#9A9AA8]">{k[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function CaseStudiesPage() {
  const [industryFilter, setIndustryFilter] = useState('All');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [openCaseId, setOpenCaseId] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const industryOptions = useMemo(
    () => ['All', ...Array.from(new Set(caseStudies.map((c) => c.industry)))],
    [],
  );
  const platformOptions = useMemo(
    () => ['All', ...Array.from(new Set(caseStudies.map((c) => c.platform)))],
    [],
  );

  const filtered = caseStudies.filter(
    (c) => (industryFilter === 'All' || c.industry === industryFilter) && (platformFilter === 'All' || c.platform === platformFilter),
  );

  const openCase = caseStudies.find((c) => c.id === openCaseId) ?? null;

  return (
    <>
      <Ticker />
      <Nav />

      <section className={SECTION_PAD} style={{ paddingBottom: 0 }}>
        <div className={`${WRAP} max-w-[840px]`}>
          <span className="tag t-pink">Influencer marketing case studies</span>
          <h1 className="mb-4.5 text-[clamp(34px,4.8vw,60px)]">
            Proven results. <span className="grad-text">Real growth.</span>
            <br />
            See how brands scale with BuzzPulse.
          </h1>
          <p className="mb-7 max-w-[620px] text-lg leading-relaxed text-[#4A4670]">
            Creator marketing campaigns backed by data, creativity and measurable ROI. Explore how enterprise
            brands, D2C challengers and agencies turned influence into revenue.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-ink btn-lg">
              Contact team
            </Link>
            <button
              type="button"
              className="btn btn-ghost btn-lg"
              onClick={() => document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Browse case studies
            </button>
          </div>
        </div>
      </section>

      <section className={SECTION_PAD}>
        <div className={WRAP}>
          <div className="shead">
            <span className="tag t-violet">Featured success stories</span>
            <h2>Campaigns with a measurable job.</h2>
            <p>Every engagement starts with one objective and ends with a number. Here are three of our most-cited results.</p>
          </div>
          <div className="flex flex-col gap-6">
            {caseStudies.slice(0, 3).map((cs, i) => (
              <FeaturedCase key={cs.id} cs={cs} index={i} onOpen={setOpenCaseId} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-(--ink) py-14 text-center text-white">
        <div className={`${WRAP} grid grid-cols-3 gap-6 md:grid-cols-6`}>
          {metrics.map((m) => (
            <div key={m[1]}>
              <b className="grad-text block text-[clamp(22px,3vw,36px)] font-black leading-none">{m[0]}</b>
              <span className="mt-2 block text-[11px] font-semibold uppercase tracking-widest text-[#A9A5C9]">{m[1]}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="library" className={SECTION_PAD}>
        <div className={WRAP}>
          <div className="shead">
            <span className="tag t-cyan">Explore the library</span>
            <h2>Creator marketing success stories.</h2>
            <p>Filter by industry or platform. Click any story for the full brief, strategy and performance table.</p>
          </div>

          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="mr-1.5 min-w-[70px] text-[11px] font-bold uppercase tracking-wide text-[#9A9AA8]">Industry</span>
            {industryOptions.map((x) => (
              <button key={x} className={`chip ${industryFilter === x ? 'on' : ''}`} onClick={() => setIndustryFilter(x)}>
                {x}
              </button>
            ))}
          </div>
          <div className="filters">
            <span className="mr-1.5 min-w-[70px] text-[11px] font-bold uppercase tracking-wide text-[#9A9AA8]">Platform</span>
            {platformOptions.map((x) => (
              <button key={x} className={`chip ${platformFilter === x ? 'on' : ''}`} onClick={() => setPlatformFilter(x)}>
                {x}
              </button>
            ))}
          </div>

          {filtered.length ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((cs) => (
                <LibraryCard key={cs.id} cs={cs} onOpen={setOpenCaseId} />
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-[#68687A]">No case studies match those filters yet.</p>
          )}
        </div>
      </section>

      <section className={SECTION_PAD} style={{ background: '#F7F7FA' }}>
        <div className={WRAP}>
          <div className="shead">
            <span className="tag t-amber">How a campaign runs</span>
            <h2>From brief to ROI report.</h2>
            <p>A transparent, repeatable journey — every stage tracked and reported.</p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {timeline.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="text-center">
                  <div className="mx-auto mb-3.5 grid h-12 w-12 place-items-center rounded-full border-2 border-(--violet) bg-white">
                    <Icon size={20} strokeWidth={2} style={{ border: 'none' }} />
                  </div>
                  <b className="mb-1 block text-sm">{s.title}</b>
                  <span className="text-xs leading-snug text-[#68687A]">{s.desc}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="why" className={SECTION_PAD}>
        <div className={WRAP}>
          <div className="shead">
            <span className="tag t-pink">Why brands choose BuzzPulse</span>
            <h2>An unfair advantage, built in.</h2>
            <p>The platform capabilities behind every result on this page.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((w) => {
              const Icon = w.icon;
              return (
                <div
                  key={w.title}
                  className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_10px_30px_-12px_rgba(10,10,15,.15)] transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className={`mb-3.5 grid h-11.5 w-11.5 place-items-center rounded-xl bg-linear-to-br ${w.gradient} text-white`}>
                    <Icon size={21} strokeWidth={1.8} style={{ border: 'none' }} />
                  </div>
                  <h4 className="mb-1.5 text-base font-bold">{w.title}</h4>
                  <p className="text-[13px] leading-relaxed text-[#54506E]">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={SECTION_PAD} style={{ background: '#F7F7FA' }}>
        <div className={WRAP}>
          <div className="shead">
            <span className="tag t-violet">In their words</span>
            <h2>Trusted by the teams behind the numbers.</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-[20px] border border-black/5 bg-white p-6.5 shadow-[0_20px_40px_-24px_rgba(10,10,15,.25)]"
              >
                <div className="mb-3 flex gap-0.5 text-(--amber)">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" style={{ border: 'none' }} />
                  ))}
                </div>
                <p className="mb-4.5 text-[15px] leading-relaxed text-[#2C2950]">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-2.5">
                  <img
                    src={`https://i.pravatar.cc/80?img=${t.avatarSeed}`}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <b className="block text-sm">{t.name}</b>
                    <span className="text-xs text-[#68687A]">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={SECTION_PAD}>
        <div className={WRAP}>
          <div className="shead">
            <span className="tag t-cyan">Industries served</span>
            <h2>Expertise across every vertical.</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <div
                  key={ind.label}
                  className="rounded-2xl border border-black/5 bg-white px-4 py-6 text-center shadow-[0_10px_26px_-18px_rgba(10,10,15,.25)] transition-all duration-200 hover:-translate-y-1 hover:border-(--violet)"
                >
                  <Icon size={26} strokeWidth={1.8} className="mx-auto mb-2.5" style={{ border: 'none' }} />
                  <b className="text-sm font-bold">{ind.label}</b>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="faq" className={SECTION_PAD} style={{ background: '#F7F7FA' }}>
        <div className={WRAP}>
          <div className="shead mx-auto text-center">
            <span className="tag t-amber">FAQ</span>
            <h2>Influencer marketing, answered.</h2>
          </div>
          <div className="mx-auto max-w-[760px]">
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

      <Footer />

      {openCase && <CaseStudyModal cs={openCase} onClose={() => setOpenCaseId(null)} />}
    </>
  );
}
