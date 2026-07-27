import { brands } from '../data';
import { WRAP } from '../styles';

export default function LogoStrip() {
  return (
    <div className="strip">
      <div className={`${WRAP} strip-in`}>
        {brands.map((b) => (
          <span key={b}>{b}</span>
        ))}
      </div>
    </div>
  );
}
