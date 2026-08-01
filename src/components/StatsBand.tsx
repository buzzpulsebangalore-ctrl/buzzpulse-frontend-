import { WRAP, SECTION_PAD } from '../styles';

const stats = [
  { value: '12.4K', label: 'Creator profiles' },
  { value: '840M', label: 'Monthly reach' },
  { value: '28', label: 'States covered' },
  { value: '96%', label: 'Repeat clients' },
];

export default function StatsBand() {
  return (
    <section className={`bg-(--ink) text-center text-white ${SECTION_PAD}`}>
      <div className={`${WRAP} grid grid-cols-2 gap-8 md:grid-cols-4`}>
        {stats.map((s) => (
          <div key={s.label}>
            <b className="grad-text block text-[clamp(34px,5vw,54px)] font-black">{s.value}</b>
            <span className="text-[13px] font-semibold uppercase tracking-widest text-[#A9A5C9]">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
