import { useScrollReveal } from '../hooks/useScrollReveal';
import { testimonials, type Testimonial } from '../data';
import { WRAP, SECTION_PAD } from '../styles';

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal rounded-[20px] border border-black/5 bg-white p-7 shadow-[0_14px_30px_-14px_rgba(255,150,45,.35)]"
      style={{ transitionDelay: `${(index % 3) * 0.07}s` }}
    >
      <p className="mb-5 text-[15px] leading-relaxed text-[#2C2950]">&ldquo;{t.quote}&rdquo;</p>
      <div className="flex items-center gap-2.5">
        <img
          src={`https://i.pravatar.cc/80?img=${t.avatarSeed}`}
          alt=""
          className="h-10 w-10 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <b className="block text-sm">{t.name}</b>
          <span className="text-xs text-[#68687A]">{t.role}</span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className={SECTION_PAD}>
      <div className={WRAP}>
        <div className="shead">
          <span className="tag t-amber">Success stories</span>
          <h2>Loved by growth teams.</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
