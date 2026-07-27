import { BadgeCheck } from 'lucide-react';
import type { Creator } from '../data';
import { nicheColorMap } from '../data';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface Props {
  creator: Creator;
  index: number;
  onBook: (creator: Creator) => void;
}

export default function CreatorCard({ creator, index, onBook }: Props) {
  const ref = useScrollReveal<HTMLElement>();
  const nicheColorVar = nicheColorMap[creator.niche];

  return (
    <article
      ref={ref}
      className="ccard reveal"
      style={{ transitionDelay: `${(index % 4) * 0.07}s` }}
    >
      <div className="cc-cover" style={{ background: `linear-gradient(120deg, var(${creator.colorVar}), var(--violet))` }} />
      <div className="cc-top">
        <img className="cc-av" src={`https://i.pravatar.cc/160?img=${creator.avatarId}`} alt={creator.name} />
      </div>
      <div className="cc-body">
        <div className="cc-name">
          {creator.name}{' '}
          <BadgeCheck size={16} className="verif" color="var(--cyan)" fill="var(--ink)" style={{ border: 'none' }} />
        </div>
        <div className="cc-handle">{creator.handle}</div>
        <span
          className="cc-niche"
          style={{
            background: `color-mix(in srgb, var(${nicheColorVar}) 16%, white)`,
            color: `var(${nicheColorVar})`,
          }}
        >
          {creator.niche}
        </span>
        <div className="cc-nums">
          <div>
            <b>{creator.followers}</b>
            <span>Followers</span>
          </div>
          <div>
            <b>{creator.engagement}</b>
            <span>Engage</span>
          </div>
          <div>
            <b>{creator.campaigns}</b>
            <span>Campaigns</span>
          </div>
        </div>
        <button className="cc-btn" onClick={() => onBook(creator)}>
          Book {creator.name.split(' ')[0]}
        </button>
      </div>
    </article>
  );
}
