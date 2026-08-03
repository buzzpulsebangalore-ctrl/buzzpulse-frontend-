import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import Ticker from './Ticker';
import Nav from './Nav';
import Footer from './Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { WRAP, SECTION_PAD } from '../styles';

interface Guide {
  id: string;
  title: string;
  category: string;
  audience: string;
  summary: string;
  steps: string[];
  from: string;
  to: string;
}

const guides: Guide[] = [
  {
    id: 'first-campaign',
    title: 'Launching your first campaign on BuzzPulse',
    category: 'Getting Started',
    audience: 'Brands',
    summary: 'From objective to a live creator shortlist in five steps — what to have ready before you start.',
    steps: [
      'Define one measurable objective (installs, sales, awareness) and a rough budget range before searching for creators.',
      'Use AI Creator Search to filter by niche, platform, audience geography and minimum fit score.',
      'Shortlist 15-20% more creators than you plan to book — some will decline or be mid-campaign already.',
      'Send briefs through the platform so approvals, deadlines and content stay in one thread per creator.',
      'Set up UTM links or promo codes for every creator before content goes live, not after.',
    ],
    from: '#2F6FED',
    to: '#0B3FA8',
  },
  {
    id: 'writing-briefs',
    title: 'Writing a creator brief that gets on-brand content',
    category: 'Campaign Strategy',
    audience: 'Brands',
    summary: 'The exact structure to use so creators hit your key messages without losing their own voice.',
    steps: [
      'State the business objective in one sentence at the top of the brief.',
      'List three must-hit talking points — no more, or creators start losing the plot.',
      'List what to avoid explicitly: claims, competitors, tone, banned words.',
      'Attach one reference asset (a past post, a moodboard) instead of a long style guide.',
      'Leave format and hook to the creator — cap approval rounds at two before publish.',
    ],
    from: '#FF7A00',
    to: '#FF962D',
  },
  {
    id: 'reading-fit-score',
    title: 'How to read a creator\'s fit score and fraud flags',
    category: 'Creator Vetting',
    audience: 'Brands',
    summary: 'What the numbers on a creator profile actually mean before you commit budget.',
    steps: [
      'Fit score blends category match, audience overlap and engagement authenticity — treat under 60 as a pass unless the creator has a strong direct reason to fit.',
      'A fraud flag does not always mean reject outright — check whether it is a follower-authenticity flag or an engagement-pod flag, they carry different risk.',
      'Cross-check engagement consistency across the last 15-20 posts rather than judging off one viral outlier.',
      'For high-budget bookings, request a short discovery call before final sign-off — verified profiles still benefit from a direct conversation.',
    ],
    from: '#123A8F',
    to: '#2F6FED',
  },
  {
    id: 'creator-onboarding',
    title: 'Getting approved as a creator on BuzzPulse',
    category: 'Getting Started',
    audience: 'Creators',
    summary: 'What our review team actually checks before a profile goes live, and how to speed it up.',
    steps: [
      'Connect your primary platform account so audience and engagement data can be verified automatically.',
      'Fill in niche and content categories accurately — mismatched tagging is the top reason for slow brand match rates.',
      'Add 3-5 of your best past brand collaborations if you have them; it speeds up manual review meaningfully.',
      'Keep your rate card realistic for your tier — reviewers flag rates that are far outside tier norms for a second look.',
      'Most applications are reviewed within 2-3 business days by an actual person, not an algorithm.',
    ],
    from: '#FF962D',
    to: '#2F6FED',
  },
  {
    id: 'pricing-yourself',
    title: 'Pricing yourself fairly as a nano or micro creator',
    category: 'Creator Vetting',
    audience: 'Creators',
    summary: 'A practical framework for setting rates that brands accept without you underselling your audience.',
    steps: [
      'Start from a base rate per 1,000 engaged followers for your platform and format, not total follower count.',
      'Adjust upward for usage rights, exclusivity periods and whitelisting/paid amplification requests.',
      'Charge a flat add-on for content requiring travel, product shipping delays, or same-week turnaround.',
      'Never discount to match a brand\'s stated budget on the first offer — counter once with a scope adjustment instead.',
    ],
    from: '#FF7A00',
    to: '#123A8F',
  },
  {
    id: 'gov-campaign-setup',
    title: 'Structuring a multi-district government awareness campaign',
    category: 'Government & Tourism',
    audience: 'Government & Tourism',
    summary: 'How to plan creator coverage, approvals and compliance across multiple regions without losing weeks.',
    steps: [
      'Map required approvals per stakeholder (department, district authority) before creator outreach begins, not after.',
      'Brief every creator on non-negotiable compliance language up front — what cannot be claimed, not just what should be said.',
      'Prioritise regional creators with strong local trust over national reach for intent-to-visit or civic-action objectives.',
      'Build a two-week approval buffer into the timeline versus a comparable brand campaign.',
      'Report on view-through and stated intent via post-campaign surveys alongside standard reach metrics.',
    ],
    from: '#0B3FA8',
    to: '#2F6FED',
  },
];

const categories = ['All', ...Array.from(new Set(guides.map((g) => g.category)))];

function GuideModal({ guide, onClose }: { guide: Guide; onClose: () => void }) {
  return (
    <div className="modal-overlay modal-overlay-top" onClick={onClose}>
      <div
        className="modal-card relative flex flex-col"
        style={{ maxWidth: 680, padding: 0, maxHeight: '75vh', overflow: 'hidden' }}
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
            style={{ background: `linear-gradient(135deg,${guide.from},${guide.to})`, borderRadius: '26px 26px 0 0' }}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wide backdrop-blur">
                {guide.category}
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wide backdrop-blur">
                {guide.audience}
              </span>
            </div>
            <h2 className="text-[24px] leading-snug">{guide.title}</h2>
          </div>
          <div className="p-8">
            <p className="mb-6 text-[15px] leading-relaxed text-[#3E3B5C]">{guide.summary}</p>
            <div className="mb-2 flex flex-col gap-3.5">
              {guide.steps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle2
                    size={19}
                    strokeWidth={2}
                    className="mt-0.5 flex-none text-(--violet)"
                    style={{ border: 'none' }}
                  />
                  <p className="text-sm leading-relaxed text-[#3E3B5C]">{step}</p>
                </div>
              ))}
            </div>
            <Link to="/contact" className="btn btn-ink mt-6 w-full justify-center text-center">
              Get help applying this →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function GuideCard({ guide, onOpen }: { guide: Guide; onOpen: (id: string) => void }) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <article
      ref={ref}
      className="reveal flex cursor-pointer flex-col rounded-[18px] border border-black/5 bg-white p-6 shadow-[0_10px_26px_-16px_rgba(10,10,15,.25)] transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_24px_46px_-20px_rgba(10,10,15,.32)]"
      onClick={() => onOpen(guide.id)}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className="rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white"
          style={{ background: guide.from }}
        >
          {guide.category}
        </span>
        <span className="rounded-full bg-[#F3EFFF] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-(--violet)">
          {guide.audience}
        </span>
      </div>
      <h3 className="mb-2.5 text-[17px] leading-snug">{guide.title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-[#54506E]">{guide.summary}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-(--violet)">
        Read guide <ArrowRight size={15} strokeWidth={2.5} style={{ border: 'none' }} />
      </span>
    </article>
  );
}

export default function GuidesPage() {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [openGuideId, setOpenGuideId] = useState<string | null>(null);

  const filtered = useMemo(
    () => guides.filter((g) => categoryFilter === 'All' || g.category === categoryFilter),
    [categoryFilter],
  );
  const openGuide = guides.find((g) => g.id === openGuideId) ?? null;

  return (
    <>
      <Ticker />
      <Nav />

      <section className={SECTION_PAD} style={{ paddingBottom: 0 }}>
        <div className={`${WRAP} max-w-[780px]`}>
          <span className="tag t-cyan">Guides</span>
          <h1 className="mb-4.5 text-[clamp(34px,4.8vw,58px)]">
            Practical <span className="grad-text">how-to guides</span> for brands and creators.
          </h1>
          <p className="max-w-[620px] text-lg leading-relaxed text-[#4A4670]">
            Short, step-by-step guides drawn from real campaigns — no fluff, just what to do next.
          </p>
        </div>
      </section>

      <section className={SECTION_PAD}>
        <div className={WRAP}>
          <div className="filters">
            {categories.map((c) => (
              <button key={c} className={`chip ${categoryFilter === c ? 'on' : ''}`} onClick={() => setCategoryFilter(c)}>
                {c}
              </button>
            ))}
          </div>
          {filtered.length ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((g) => (
                <GuideCard key={g.id} guide={g} onOpen={setOpenGuideId} />
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-[#68687A]">No guides in this category yet.</p>
          )}
        </div>
      </section>

      <section className={SECTION_PAD} style={{ background: '#F7F7FA' }}>
        <div className={`${WRAP} max-w-[640px] text-center`}>
          <span className="tag t-amber">Need something specific?</span>
          <h2 className="mb-4 text-[clamp(28px,3.6vw,42px)]">Ask us and we&rsquo;ll walk you through it.</h2>
          <p className="mb-7 text-[15px] leading-relaxed text-[#54506E]">
            If your situation doesn&rsquo;t match a guide above, a real person on our team can walk you through it
            directly.
          </p>
          <Link to="/contact" className="btn btn-ink btn-lg">
            Contact the team
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
            <Link to="/join/creator" className="btn btn-ink btn-lg">
              Join as a creator
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {openGuide && <GuideModal guide={openGuide} onClose={() => setOpenGuideId(null)} />}
    </>
  );
}
