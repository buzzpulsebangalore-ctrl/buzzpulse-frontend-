import { brands } from '../data';
import { WRAP } from '../styles';

export default function LogoStrip() {
  return (
    <div className="bg-(--ink) py-8">
      <div className={`${WRAP} flex flex-wrap items-center justify-between gap-6`}>
        {brands.map((b) => (
          <span key={b} className="display text-base text-white/55 transition-colors hover:text-white">
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
