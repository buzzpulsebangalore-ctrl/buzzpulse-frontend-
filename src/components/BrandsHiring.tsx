import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { brandsHiring } from '../data';
import { WRAP, SECTION_PAD } from '../styles';

function initialsOf(name: string) {
  return name
    .replace(/[^A-Za-z ]/g, '')
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

function BrandTile({
  name,
  category,
  color,
  index,
}: {
  name: string;
  category: string;
  color: string;
  index: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal relative rounded-2xl border border-black/5 bg-white px-4 py-6 text-center shadow-[0_4px_16px_-6px_rgba(10,10,15,.12)] transition-transform hover:-translate-y-1 hover:shadow-[0_14px_28px_-12px_rgba(10,10,15,.22)]"
      style={{ transitionDelay: `${(index % 6) * 0.05}s` }}
    >
      <span className="absolute right-2.5 top-2.5 h-2 w-2 animate-ping rounded-full bg-(--cyan)" />
      <div
        className="display mx-auto mb-3 grid h-14 w-14 place-items-center rounded-xl text-lg text-white"
        style={{ background: color }}
      >
        {initialsOf(name)}
      </div>
      <div className="mb-0.5 text-sm font-bold leading-tight">{name}</div>
      <div className="text-[11px] font-semibold text-[#68687A]">{category}</div>
    </div>
  );
}

export default function BrandsHiring() {
  return (
    <section id="brands" className={SECTION_PAD}>
      <div className={WRAP}>
        <div className="shead">
          <span className="tag t-amber">Live demand</span>
          <h2>These brands are hiring creators.</h2>
          <p>
            Leading companies actively run creator campaigns right now. Don&rsquo;t miss the opportunity — get
            discovered by the brands in your niche.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {brandsHiring.map((b, i) => (
            <BrandTile key={b.name} name={b.name} category={b.category} color={b.color} index={i} />
          ))}
        </div>
        <div className="mt-9 text-center">
          <Link to="/join/creator" className="btn btn-ink btn-lg">
            Join as a creator — get matched
          </Link>
        </div>
      </div>
    </section>
  );
}
