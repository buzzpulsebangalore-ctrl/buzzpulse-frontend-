import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { listPublicCreators, type PublicCreator } from '../api/creators';
import CreatorCard from './CreatorCard';
import BookingModal from './BookingModal';
import { WRAP, SECTION_PAD } from '../styles';
import { placeholderCreators } from '../data';

const PAGE_SIZE = 8;

export default function Creators() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [active, setActive] = useState('All');
  const [booking, setBooking] = useState<PublicCreator | null>(null);
  const [pageCreators, setPageCreators] = useState<PublicCreator[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setLoadError('');
      try {
        const res = await listPublicCreators(page);
        if (cancelled) return;
        setPageCreators(res.data);
        setTotalPages(Math.max(1, res.meta.totalPages));
        setActive('All');
      } catch (err) {
        console.error('Failed to load creators:', err);
        if (!cancelled) setLoadError("Couldn't load creators right now. Please try again shortly.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [page]);

  const niches = useMemo(() => {
    const set = new Set<string>();
    pageCreators.forEach((c) => c.niches.forEach((n) => set.add(n)));
    return ['All', ...Array.from(set).sort()];
  }, [pageCreators]);

  const filtered = active === 'All' ? pageCreators : pageCreators.filter((c) => c.niches.includes(active));

  const placeholderIds = useMemo(() => new Set(placeholderCreators.map((p) => p.id)), []);

  const display = useMemo(() => {
    if (!loading) return filtered;
    const pool = active === 'All' ? placeholderCreators : placeholderCreators.filter((p) => p.niches.includes(active));
    return pool.slice(0, PAGE_SIZE);
  }, [filtered, active, loading]);

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

        {niches.length > 1 && (
          <div className="filters">
            {niches.map((n) => (
              <button key={n} className={`chip ${active === n ? 'on' : ''}`} onClick={() => setActive(n)}>
                {n}
              </button>
            ))}
          </div>
        )}

        <div className="cgrid">
          {display.map((c, i) => (
            <CreatorCard key={c.id} creator={c} index={i} onBook={setBooking} bookingDisabled={placeholderIds.has(c.id)} />
          ))}
        </div>

        {!loading && !loadError && totalPages > 1 && (
          <div className="creator-pager">
            <button
              type="button"
              className="pager-btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} strokeWidth={2} style={{ border: 'none' }} />
              Back
            </button>
            <span className="pager-info">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              className="pager-btn"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              aria-label="Next page"
            >
              Forward
              <ChevronRight size={18} strokeWidth={2} style={{ border: 'none' }} />
            </button>
          </div>
        )}
      </div>

      {booking && <BookingModal creator={booking} onClose={() => setBooking(null)} />}
    </section>
  );
}
