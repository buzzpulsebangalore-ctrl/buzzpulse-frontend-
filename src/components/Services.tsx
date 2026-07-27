import { Megaphone, Map, Landmark, PartyPopper, TrendingUp, Clapperboard, type LucideIcon } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { WRAP, SECTION_PAD } from '../styles';

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
  cls: string;
}

const services: Service[] = [
  { icon: Megaphone, title: 'Influencer Marketing', desc: 'Partner with verified creators across every category to amplify your campaign and reach highly engaged audiences.', cls: 's1' },
  { icon: Map, title: 'Destination & Tourism', desc: 'Help states, tourism boards, hotels and heritage sites attract travellers through immersive digital campaigns.', cls: 's2' },
  { icon: Landmark, title: 'Government Campaigns', desc: 'Public awareness initiatives and flagship national programmes that educate, engage and inspire citizens.', cls: 's3' },
  { icon: PartyPopper, title: 'Event Management', desc: 'Festivals, product launches, exhibitions, conferences, college fests and destination activations.', cls: 's4' },
  { icon: TrendingUp, title: 'Digital Marketing', desc: 'Performance marketing, content strategy, social media management and online reputation management.', cls: 's5' },
  { icon: Clapperboard, title: 'Video Production', desc: 'Documentaries, tourism films, corporate videos, aerial cinematography and promotional campaigns.', cls: 's6' },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useScrollReveal<HTMLDivElement>();
  const Icon = service.icon;
  return (
    <div ref={ref} className={`svc ${service.cls} reveal`} style={{ transitionDelay: `${(index % 4) * 0.07}s` }}>
      <div className="ico">
        <Icon size={34} strokeWidth={1.8} style={{ border: 'none' }} />
      </div>
      <div>
        <h3>{service.title}</h3>
        <p>{service.desc}</p>
      </div>
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
        <div className="svc-grid">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
