import { Search, Target, ShieldAlert, FileSignature, LineChart, MessagesSquare, type LucideIcon } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { WRAP, SECTION_PAD } from '../styles';

interface AiService {
  icon: LucideIcon;
  title: string;
  desc: string;
  cls: string;
}

const aiServices: AiService[] = [
  { icon: Search, title: 'AI Creator Search', desc: 'Describe your campaign in plain language — get a ranked shortlist in seconds.', cls: 's1' },
  { icon: Target, title: 'AI Match Score', desc: 'Fit score per creator from audience overlap, brand safety and past performance.', cls: 's2' },
  { icon: ShieldAlert, title: 'Fraud & Fake Follower Detection', desc: 'Flag bought followers and engagement pods before you spend a rupee.', cls: 's3' },
  { icon: FileSignature, title: 'AI Brief & Contract Generator', desc: 'Auto-draft content briefs, proposals and contracts from your goal.', cls: 's4' },
  { icon: LineChart, title: 'AI ROI Prediction', desc: 'Forecast reach, engagement and cost-per-result before launch.', cls: 's5' },
  { icon: MessagesSquare, title: 'AI Campaign Assistant', desc: 'A chat copilot that optimises live campaigns and writes your reports.', cls: 's6' },
];

function AiServiceCard({ service, index }: { service: AiService; index: number }) {
  const ref = useScrollReveal<HTMLDivElement>();
  const Icon = service.icon;
  return (
    <div ref={ref} className={`svc ${service.cls} reveal`} style={{ transitionDelay: `${(index % 4) * 0.07}s` }}>
      <div className="ico">
        <Icon size={30} strokeWidth={1.8} style={{ border: 'none' }} />
      </div>
      <div>
        <h3>{service.title}</h3>
        <p>{service.desc}</p>
      </div>
    </div>
  );
}

export default function AIServices() {
  return (
    <section id="ai-engine" className={SECTION_PAD}>
      <div className={WRAP}>
        <div className="shead">
          <span className="tag t-cyan">AI engine</span>
          <h2>The intelligence layer.</h2>
          <p>A stack of AI models working behind every search, brief and report.</p>
        </div>
        <div className="svc-grid">
          {aiServices.map((s, i) => (
            <AiServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
