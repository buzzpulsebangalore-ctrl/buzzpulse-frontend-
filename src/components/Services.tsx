import { Link } from 'react-router-dom';
import { Handshake, Clapperboard, Bot, Share2, TrendingUp, Repeat, type LucideIcon } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { WRAP, SECTION_PAD } from '../styles';

interface Solution {
  icon: LucideIcon;
  title: string;
  desc: string;
  gradient: string;
}

const solutions: Solution[] = [
  {
    icon: Handshake,
    title: 'Influencer Collaboration',
    desc: 'Partner with Nano, Micro and Macro creators who authentically connect with your audience — selected for values alignment, genuine engagement and impactful storytelling.',
    gradient: 'from-(--hot) to-(--violet)',
  },
  {
    icon: Clapperboard,
    title: 'UGC Content Creation',
    desc: 'High-quality, authentic user-generated video that reflects your brand — built to drive engagement and improve ROAS on your performance campaigns.',
    gradient: 'from-(--violet) to-(--cyan)',
  },
  {
    icon: Bot,
    title: 'AI-Generated Influencer Content',
    desc: 'Promote your products with high-performing videos featuring AI avatars, built to your brand’s requirements. Perfect for social media and audience education.',
    gradient: 'from-(--cyan) to-(--amber)',
  },
  {
    icon: Share2,
    title: 'Social Media Management',
    desc: 'Content creation, posting and scheduling, community engagement, and monitoring of both your brand and your competitors — handled end to end.',
    gradient: 'from-(--amber) to-(--hot)',
  },
  {
    icon: TrendingUp,
    title: 'Performance Marketing',
    desc: 'Performance-based campaigns targeted at specific business goals, engineered for consistent results, sales growth and a better cost-per-result.',
    gradient: 'from-(--violet) to-(--amber)',
  },
  {
    icon: Repeat,
    title: 'Barter Collaboration',
    desc: 'Big impact without the big budget — Nano and Micro creators promote your products in exchange for free offerings, maximising results while keeping costs low.',
    gradient: 'from-(--hot) to-(--amber)',
  },
];

function SolutionCard({ solution, index }: { solution: Solution; index: number }) {
  const ref = useScrollReveal<HTMLDivElement>();
  const Icon = solution.icon;
  return (
    <div
      ref={ref}
      className="reveal group relative overflow-hidden rounded-[20px] border border-black/5 bg-white p-7 shadow-[0_10px_30px_-12px_rgba(10,10,15,.15)] transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_24px_46px_-20px_rgba(10,10,15,.28)]"
      style={{ transitionDelay: `${(index % 4) * 0.07}s` }}
    >
      <div className={`mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br ${solution.gradient} text-white`}>
        <Icon size={24} strokeWidth={1.8} style={{ border: 'none' }} />
      </div>
      <h3 className="mb-2.5 text-[19px] font-bold tracking-tight">{solution.title}</h3>
      <p className="text-sm leading-relaxed text-[#54506E]">{solution.desc}</p>
      <Link
        to="/join/creator"
        className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-(--violet) transition-all group-hover:gap-2.5"
      >
        Learn more →
      </Link>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className={SECTION_PAD} style={{ background: '#F7F7FA' }}>
      <div className={WRAP}>
        <div className="shead">
          <span className="tag t-violet">What we do</span>
          <h2>Six ways we build the buzz.</h2>
          <p>
            From a single creator collaboration to a nationwide government awareness campaign — one team, end to
            end.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <SolutionCard key={s.title} solution={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
