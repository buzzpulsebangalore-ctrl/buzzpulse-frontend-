import { useState } from 'react';
import { creators, niches, type Creator } from '../data';
import CreatorCard from './CreatorCard';
import BookingModal from './BookingModal';
import { WRAP, SECTION_PAD } from '../styles';

export default function Creators() {
  const [active, setActive] = useState('All');
  const [booking, setBooking] = useState<Creator | null>(null);
  const filtered = active === 'All' ? creators : creators.filter((c) => c.niche === active);

  return (
    <section id="creators" className={SECTION_PAD}>
      <div className={WRAP}>
        <div className="shead">
          <span className="tag t-pink">The Creator Network</span>
          <h2>Verified creators. Real audiences.</h2>
          <p>
            Every profile is manually vetted — audience quality, engagement authenticity, brand safety. Filter by
            niche and book directly.
          </p>
        </div>

        <div className="filters">
          {niches.map((n) => (
            <button key={n} className={`chip ${active === n ? 'on' : ''}`} onClick={() => setActive(n)}>
              {n}
            </button>
          ))}
        </div>

        <div className="cgrid">
          {filtered.map((c, i) => (
            <CreatorCard key={c.handle} creator={c} index={i} onBook={setBooking} />
          ))}
        </div>
      </div>

      {booking && <BookingModal creator={booking} onClose={() => setBooking(null)} />}
    </section>
  );
}
