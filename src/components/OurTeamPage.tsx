import { Link } from 'react-router-dom';
import Ticker from './Ticker';
import Nav from './Nav';
import Footer from './Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { WRAP, SECTION_PAD } from '../styles';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatarSeed: number;
}

const team: TeamMember[] = [
  { name: 'Rohan Mehta', role: 'Founder & CEO', bio: 'Ten years in performance marketing before starting BuzzPulse.', avatarSeed: 31 },
  { name: 'Kavya Reddy', role: 'Co-founder & CTO', bio: 'Builds the matching and fraud-detection systems behind every search.', avatarSeed: 47 },
  { name: 'Ishaan Kapoor', role: 'Head of Partnerships', bio: 'Runs relationships with brands, agencies and government bodies.', avatarSeed: 52 },
  { name: 'Neha Agarwal', role: 'Head of Creator Success', bio: 'Reviews creator applications and handles every booking request.', avatarSeed: 25 },
  { name: 'Vikram Das', role: 'Lead Designer', bio: 'Shapes the product experience for both brands and creators.', avatarSeed: 13 },
  { name: 'Simran Chawla', role: 'Head of Growth', bio: 'Leads brand acquisition and the reporting dashboard roadmap.', avatarSeed: 40 },
];

function TeamCard({ m, index }: { m: TeamMember; index: number }) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal rounded-[20px] border border-black/5 bg-white/85 backdrop-blur-md p-6 text-center shadow-[0_10px_30px_-12px_rgba(10,10,15,.15)]"
      style={{ transitionDelay: `${(index % 3) * 0.07}s` }}
    >
      <img
        src={`https://i.pravatar.cc/160?img=${m.avatarSeed}`}
        alt={m.name}
        className="mx-auto mb-4 h-20 w-20 rounded-full object-cover"
        loading="lazy"
      />
      <h3 className="text-base font-bold">{m.name}</h3>
      <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-(--violet)">{m.role}</span>
      <p className="text-sm leading-relaxed text-[#54506E]">{m.bio}</p>
    </div>
  );
}

export default function OurTeamPage() {
  return (
    <>
      <Ticker />
      <Nav />

      <section className={SECTION_PAD}>
        <div className={`${WRAP} max-w-[820px]`}>
          <span className="tag t-violet">Our Team</span>
          <h1 className="mb-6 text-[clamp(34px,5vw,58px)]">
            The people behind
            <br />
            <span className="grad-text">BuzzPulse.</span>
          </h1>
          <p className="text-lg leading-relaxed text-[#34343C]">
            A small team based in Bengaluru, India — still reading every creator application and every booking
            request ourselves.
          </p>
        </div>
      </section>

      <section className={SECTION_PAD} style={{ background: '#F7F7FA' }}>
        <div className={WRAP}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <TeamCard key={m.name} m={m} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className={SECTION_PAD}>
        <div className={`${WRAP} max-w-[640px] text-center`}>
          <span className="tag t-amber">We&rsquo;re hiring</span>
          <h2 className="mb-4 text-[clamp(28px,3.6vw,42px)]">Want to help build this?</h2>
          <p className="mb-7 text-[15px] leading-relaxed text-[#54506E]">
            We&rsquo;re a small team growing fast. Take a look at open roles, or apply as a creator if that&rsquo;s
            more your speed.
          </p>
          <Link to="/careers" className="btn btn-ink btn-lg">
            View careers
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
