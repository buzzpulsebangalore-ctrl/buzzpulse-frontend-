import { Compass, PenTool, Rocket, LineChart, type LucideIcon } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { WRAP, SECTION_PAD } from '../styles';

interface Step {
  n: string;
  icon: LucideIcon;
  title: string;
  desc: string;
}

const steps: Step[] = [
  { n: '01', icon: Compass, title: 'Discover', desc: 'We map your objective, your audience and the story only you can tell.' },
  { n: '02', icon: PenTool, title: 'Design', desc: 'Creative concepts, creator shortlists and a campaign architecture built to travel.' },
  { n: '03', icon: Rocket, title: 'Deliver', desc: 'Execution across every state — shoots, posts, events, press, all on one timeline.' },
  { n: '04', icon: LineChart, title: 'Drive', desc: 'Live dashboards, weekly optimisation and a reach report you can take to the board.' },
];

function StepCard({ step, index }: { step: Step; index: number }) {
  const ref = useScrollReveal<HTMLDivElement>();
  const Icon = step.icon;
  return (
    <div ref={ref} className="step reveal" style={{ transitionDelay: `${(index % 4) * 0.07}s` }}>
      <span className="step-num-bg">{step.n}</span>
      <div className="step-badge">
        <Icon size={22} strokeWidth={2} style={{ border: 'none' }} />
      </div>
      <div className="step-n">STAGE {step.n}</div>
      <h3>{step.title}</h3>
      <p>{step.desc}</p>
    </div>
  );
}

export default function Process() {
  return (
    <section id="process" className={SECTION_PAD}>
      <div className={WRAP}>
        <div className="shead">
          <span className="tag t-cyan">How it runs</span>
          <h2>Discover. Design. Deliver. Drive.</h2>
          <p>The order matters — every stage feeds the next, and the last one loops back into the first.</p>
        </div>
        <div className="proc">
          {steps.map((s, i) => (
            <StepCard key={s.title} step={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
