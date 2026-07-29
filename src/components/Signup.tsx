import { Banknote, Plane, Building2, Target, type LucideIcon } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SignupForm from './SignupForm';
import { WRAP, SECTION_PAD } from '../styles';

interface Perk {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const perks: Perk[] = [
  { icon: Banknote, title: 'Paid in 7 days', desc: 'Flat rates agreed upfront. No chasing invoices, no revenue share.' },
  { icon: Plane, title: 'Fully funded trips', desc: 'Tourism board campaigns cover travel, stay and shoot costs.' },
  { icon: Building2, title: 'Government briefs', desc: 'Work on national programmes that reach millions of citizens.' },
  { icon: Target, title: 'Briefs that fit', desc: 'You only see campaigns matched to your niche and audience.' },
];

function Perk({ perk, index }: { perk: Perk; index: number }) {
  const ref = useScrollReveal<HTMLDivElement>();
  const Icon = perk.icon;
  return (
    <div ref={ref} className="perk reveal" style={{ transitionDelay: `${(index % 4) * 0.07}s` }}>
      <div className="pi">
        <Icon size={16} strokeWidth={2} style={{ border: 'none' }} />
      </div>
      <div>
        <b>{perk.title}</b>
        <span>{perk.desc}</span>
      </div>
    </div>
  );
}

export default function Signup() {
  return (
    <section className={`signup ${SECTION_PAD}`} id="join">
      <div className="blob b1" style={{ opacity: 0.2 }} />
      <div className={WRAP}>
        <div className="shead" style={{ marginBottom: 34, maxWidth: 'none' }}>
          <span className="tag t-amber">Creator sign-up</span>
          <h2>
            Get paid to tell
            <br />
            the story.
          </h2>
          <p style={{ maxWidth: 720 }}>
            Influencer, filmmaker, travel blogger, photographer? Join the network and collaborate with leading
            brands, tourism boards and government initiatives.
          </p>
        </div>

        <div className="su-grid">
          <div className="perks">
            {perks.map((p, i) => (
              <Perk key={p.title} perk={p} index={i} />
            ))}
          </div>

          <SignupForm />
        </div>
      </div>
    </section>
  );
}
