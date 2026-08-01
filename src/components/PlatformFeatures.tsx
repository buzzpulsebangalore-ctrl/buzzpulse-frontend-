import { Search, Users, Rocket, FileText, BarChart3, ShieldCheck, type LucideIcon } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { WRAP, SECTION_PAD } from '../styles';

interface Feature {
  icon: LucideIcon;
  color: string;
  title: string;
  desc: string;
}

const features: Feature[] = [
  { icon: Search, color: '--hot', title: 'AI Discovery', desc: 'Search verified creators by plain-language intent, not keywords.' },
  { icon: Users, color: '--violet', title: 'Creator CRM', desc: 'Track every creator relationship, note and past collaboration in one place.' },
  { icon: Rocket, color: '--cyan', title: 'Campaign Manager', desc: 'Briefs, approvals, deliverables and milestones on one timeline.' },
  { icon: FileText, color: '--amber', title: 'Contracts & Payments', desc: 'E-sign contracts and pay creators — invoices handled automatically.' },
  { icon: BarChart3, color: '--violet', title: 'Live Reporting', desc: 'Real-time reach, engagement and ROI dashboards you can export.' },
  { icon: ShieldCheck, color: '--hot', title: 'Brand Safety', desc: 'Fake-follower and brand-risk scoring on every single profile.' },
];

function FeatureCard({ f, index }: { f: Feature; index: number }) {
  const ref = useScrollReveal<HTMLDivElement>();
  const Icon = f.icon;
  return (
    <div
      ref={ref}
      className="reveal rounded-[20px] border border-black/5 bg-white p-6 shadow-[0_10px_30px_-12px_rgba(10,10,15,.15)] transition-transform hover:-translate-y-1.5"
      style={{ transitionDelay: `${(index % 3) * 0.07}s` }}
    >
      <div
        className="mb-4 grid h-14 w-14 place-items-center rounded-2xl text-white"
        style={{ background: `linear-gradient(135deg, var(${f.color}), var(--violet))` }}
      >
        <Icon size={24} strokeWidth={1.8} style={{ border: 'none' }} />
      </div>
      <h3 className="mb-2 text-[19px] font-bold">{f.title}</h3>
      <p className="text-sm leading-relaxed text-[#5A5680]">{f.desc}</p>
    </div>
  );
}

export default function PlatformFeatures() {
  return (
    <section id="features" className={SECTION_PAD} style={{ background: '#FBF8FF' }}>
      <div className={WRAP}>
        <div className="shead">
          <span className="tag t-violet">The platform</span>
          <h2>One workspace, campaign to payout.</h2>
          <p>Discovery, CRM, briefs, deliverables, payments and reporting — no more spreadsheets and DMs.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FeatureCard key={f.title} f={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
