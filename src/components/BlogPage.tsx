import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Calendar, Clock, ArrowRight } from 'lucide-react';
import Ticker from './Ticker';
import Nav from './Nav';
import Footer from './Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { WRAP, SECTION_PAD } from '../styles';

interface Post {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  body: string[];
  date: string;
  readTime: string;
  imgSeed: string;
  from: string;
  to: string;
}

const posts: Post[] = [
  {
    id: 'fake-followers',
    title: 'How to spot fake followers before you brief a creator',
    category: 'Influencer Marketing',
    excerpt: 'Five signals that separate a genuinely engaged audience from a bought one — and why follower count alone tells you almost nothing.',
    body: [
      'Follower count is the least useful number on a creator profile. It is also the easiest to inflate, which is why so many brands still get burned by it.',
      'Look at engagement consistency instead of engagement rate on a single viral post. A creator averaging 2-4% engagement across their last 20 posts, with comments that reference specifics from the post, is a far safer bet than one spiking to 15% on a single reel and sitting near zero elsewhere.',
      'Check audience geography and language match. A creator whose comments are dominated by generic emoji-only accounts, or whose audience location does not match their stated market, is a red flag worth running through fraud detection before you commit budget.',
      'On BuzzPulse, every profile carries a fake-follower and engagement-pod score computed before it is ever surfaced in search results, so this check happens before you even see the creator.',
    ],
    date: '2026-06-02',
    readTime: '5 min read',
    imgSeed: 'bp-blog-fraud',
    from: '#2F6FED',
    to: '#0B3FA8',
  },
  {
    id: 'brief-that-works',
    title: 'The creator brief template we send on every campaign',
    category: 'Playbooks',
    excerpt: 'A vague brief gets vague content. Here is the exact structure our team uses to get on-brand deliverables the first time.',
    body: [
      'Most content misses aren\'t a creator problem, they\'re a brief problem. A creator can only hit a target they can actually see.',
      'Our brief always opens with the single business objective in one sentence — not "brand awareness" but "drive 5,000 app installs in three weeks." Everything downstream gets measured against that line.',
      'Then: three must-hit talking points, three things to avoid, one reference piece of content, and the exact CTA and link/code to use. We deliberately leave tone, format and hook to the creator — that is what their audience trusts them for.',
      'Approval rounds are capped at two before a piece goes live, which keeps both timelines and creator goodwill intact.',
    ],
    date: '2026-05-18',
    readTime: '4 min read',
    imgSeed: 'bp-blog-brief',
    from: '#FF7A00',
    to: '#FF962D',
  },
  {
    id: 'micro-vs-macro',
    title: 'Micro vs macro creators: what actually moves the ROAS needle',
    category: 'Strategy',
    excerpt: 'We pulled performance data across 200+ campaigns to see where budget is best spent — the answer depends on the objective.',
    body: [
      'For awareness objectives, macro and mid-tier creators still win on cost-per-reach — one 500K-follower creator is operationally simpler than sourcing and managing forty nano accounts for the same reach number.',
      'For conversion objectives, the pattern flips hard. Nano and micro creators (10K-100K) consistently produced lower cost-per-acquisition across our beauty, fashion and fintech campaigns, largely because their audiences treat recommendations as coming from a peer rather than an ad.',
      'The highest-performing campaigns in our data were not pure macro or pure micro, but a tiered mix: two to four macro names for reach and credibility, with the majority of budget spread across fifteen to sixty micro creators for conversion.',
      'Fit score and audience-authenticity screening matter more than tier at any budget level — a verified micro creator will consistently outperform an unverified macro one on cost-per-result.',
    ],
    date: '2026-05-03',
    readTime: '6 min read',
    imgSeed: 'bp-blog-tiers',
    from: '#0B3FA8',
    to: '#FF962D',
  },
  {
    id: 'attribution-basics',
    title: 'Attribution for creator campaigns without a marketing science team',
    category: 'ROI & Reporting',
    excerpt: 'You do not need a data science team to know what is working. UTM links, promo codes and deep links get you most of the way.',
    body: [
      'The single highest-leverage habit in creator marketing is giving every creator a unique, trackable link or code before content goes live — not after someone asks for a report.',
      'UTM parameters on link-in-bio and story swipe-ups tell you channel and creator-level traffic. Unique promo codes tell you revenue. Deep links into an app tell you install and in-app event attribution. Layer these three and you have a full funnel without touching a data warehouse.',
      'The mistake we see most often: brands set this up for macro creators and skip it for micro and nano creators "because the volume is too small to matter." In our data, the aggregate micro-tier spend is usually the largest line item in the budget, and the one with the least visibility.',
      'BuzzPulse generates and tracks these automatically per creator per campaign, rolling up into one live dashboard rather than a spreadsheet per creator.',
    ],
    date: '2026-04-21',
    readTime: '5 min read',
    imgSeed: 'bp-blog-attribution',
    from: '#123A8F',
    to: '#2F6FED',
  },
  {
    id: 'tourism-case',
    title: 'What we learned running a state tourism board\'s creator programme',
    category: 'Government & Tourism',
    excerpt: 'Public-sector campaigns move slower and answer to more stakeholders. Here is what changes and what does not.',
    body: [
      'Approval chains are the biggest structural difference. A single piece of content can need sign-off from a tourism board, a state information department and sometimes a district authority, so we build a two-week buffer into any government timeline that a brand campaign would not need.',
      'Compliance-safe messaging is non-negotiable — no unverified claims about safety, weather or logistics, ever. We brief creators explicitly on what cannot be said, not just what should be.',
      'The upside is reach: regional creators with strong local trust consistently outperformed national names on both view-through and stated intent-to-visit in post-campaign surveys.',
      'The programme ran across six creators per district over twelve districts and became the template we now reuse for other state tourism engagements.',
    ],
    date: '2026-03-30',
    readTime: '7 min read',
    imgSeed: 'bp-blog-tourism',
    from: '#FF7A00',
    to: '#123A8F',
  },
  {
    id: 'platform-update-q1',
    title: 'Platform update: fit score v2 and faster fraud screening',
    category: 'Product',
    excerpt: 'A behind-the-scenes look at what changed in our matching model this quarter, and why it should shorten your shortlisting time.',
    body: [
      'Fit score v2 now weights audience-content overlap alongside category and engagement signals, which meaningfully improved shortlist relevance in our internal testing on beauty and fintech searches.',
      'Fraud screening moved from a nightly batch job to near real-time, so a creator\'s score reflects activity from the last 24 hours rather than the last week.',
      'We also shipped bulk shortlist export and a comparison view for up to eight creators side by side, both requested repeatedly by agency accounts running multi-creator campaigns.',
      'Full changelog and what is coming next quarter is available to logged-in brand accounts from the dashboard.',
    ],
    date: '2026-03-08',
    readTime: '3 min read',
    imgSeed: 'bp-blog-product',
    from: '#FF962D',
    to: '#2F6FED',
  },
];

const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function PostModal({ post, onClose }: { post: Post; onClose: () => void }) {
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
            className="relative flex min-h-[180px] flex-col justify-end p-8 text-white"
            style={{ background: `linear-gradient(135deg,${post.from},${post.to})`, borderRadius: '26px 26px 0 0' }}
          >
            <span className="mb-3 inline-block w-fit rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wide backdrop-blur">
              {post.category}
            </span>
            <h2 className="text-[24px] leading-snug">{post.title}</h2>
          </div>
          <div className="p-8">
            <div className="mb-6 flex items-center gap-4 text-xs font-semibold text-[#68687A]">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={13} strokeWidth={2} style={{ border: 'none' }} />
                {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} strokeWidth={2} style={{ border: 'none' }} />
                {post.readTime}
              </span>
            </div>
            {post.body.map((p, i) => (
              <p key={i} className="mb-4 text-[15px] leading-relaxed text-[#3E3B5C]">
                {p}
              </p>
            ))}
            <Link to="/contact" className="btn btn-ink w-full justify-center text-center">
              Talk to our team →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostCard({ post, onOpen, featured }: { post: Post; onOpen: (id: string) => void; featured?: boolean }) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <article
      ref={ref}
      className={`reveal flex cursor-pointer flex-col overflow-hidden rounded-[18px] border border-black/5 bg-white shadow-[0_10px_26px_-16px_rgba(10,10,15,.25)] transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_24px_46px_-20px_rgba(10,10,15,.32)] ${featured ? 'lg:flex-row' : ''}`}
      onClick={() => onOpen(post.id)}
    >
      <div
        className={`relative bg-cover bg-center ${featured ? 'h-[220px] lg:h-auto lg:w-2/5' : 'h-[150px]'}`}
        style={{
          backgroundImage: `linear-gradient(140deg,${post.from}cc,rgba(10,10,15,.3)), url('https://picsum.photos/seed/${post.imgSeed}/700/500')`,
        }}
      >
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-3 text-[11px] font-semibold text-[#9A9AA8]">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className={featured ? 'mb-3 text-[22px] leading-snug' : 'mb-2.5 text-[17px] leading-snug'}>{post.title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-[#54506E]">{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-(--violet)">
          Read more <ArrowRight size={15} strokeWidth={2.5} style={{ border: 'none' }} />
        </span>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [openPostId, setOpenPostId] = useState<string | null>(null);

  const sorted = useMemo(() => [...posts].sort((a, b) => (a.date < b.date ? 1 : -1)), []);
  const featured = sorted[0];
  const rest = sorted.slice(1).filter((p) => categoryFilter === 'All' || p.category === categoryFilter);
  const openPost = posts.find((p) => p.id === openPostId) ?? null;

  return (
    <>
      <Ticker />
      <Nav />

      <section className={SECTION_PAD} style={{ paddingBottom: 0 }}>
        <div className={`${WRAP} max-w-[780px]`}>
          <span className="tag t-violet">The BuzzPulse blog</span>
          <h1 className="mb-4.5 text-[clamp(34px,4.8vw,58px)]">
            Notes on <span className="grad-text">creator marketing</span> that actually works.
          </h1>
          <p className="max-w-[620px] text-lg leading-relaxed text-[#4A4670]">
            Strategy, ROI reporting and product updates from the team running influencer campaigns for brands,
            tourism boards and government bodies across India.
          </p>
        </div>
      </section>

      <section className={SECTION_PAD}>
        <div className={WRAP}>
          <PostCard post={featured} onOpen={setOpenPostId} featured />
        </div>
      </section>

      <section className={SECTION_PAD} style={{ background: '#F7F7FA' }}>
        <div className={WRAP}>
          <div className="shead">
            <span className="tag t-cyan">All posts</span>
            <h2>Filter by topic.</h2>
          </div>
          <div className="filters">
            {categories.map((c) => (
              <button key={c} className={`chip ${categoryFilter === c ? 'on' : ''}`} onClick={() => setCategoryFilter(c)}>
                {c}
              </button>
            ))}
          </div>
          {rest.length ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <PostCard key={p.id} post={p} onOpen={setOpenPostId} />
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-[#68687A]">No posts in this category yet.</p>
          )}
        </div>
      </section>

      <section className={SECTION_PAD}>
        <div className={`${WRAP} max-w-[640px] text-center`}>
          <span className="tag t-amber">Stay in the loop</span>
          <h2 className="mb-4 text-[clamp(28px,3.6vw,42px)]">New posts, straight to your inbox.</h2>
          <p className="mb-7 text-[15px] leading-relaxed text-[#54506E]">
            No spam, just what we're learning from live campaigns. Reach out and we'll add you to the list.
          </p>
          <Link to="/contact" className="btn btn-ink btn-lg">
            Subscribe via contact
          </Link>
        </div>
      </section>

      <section className="final-cta">
        <div className={`${WRAP} final-cta-in`}>
          <h2>Let&rsquo;s build something people talk about.</h2>
          <p>Tell us the objective. We&rsquo;ll come back with a campaign, a creator list and a number.</p>
          <div className="final-cta-actions">
            <Link to="/join/brand" className="btn btn-white btn-lg">
              Launch a campaign
            </Link>
            <Link to="/contact" className="btn btn-ink btn-lg">
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {openPost && <PostModal post={openPost} onClose={() => setOpenPostId(null)} />}
    </>
  );
}
