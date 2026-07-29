import { BadgeCheck } from 'lucide-react';
import type { PublicCreator } from '../api/creators';
import { getNicheColorVar } from '../data';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { formatFollowers, getInitials } from '../utils/format';

interface Props {
  creator: PublicCreator;
  index: number;
  onBook: (creator: PublicCreator) => void;
  bookingDisabled?: boolean;
}

export default function CreatorCard({ creator, index, onBook, bookingDisabled }: Props) {
  const ref = useScrollReveal<HTMLElement>();
  const niche = creator.niches[0] ?? 'Creator';
  const nicheColorVar = getNicheColorVar(niche);
  const firstName = creator.fullName.split(' ')[0];

  return (
    <article
      ref={ref}
      className="ccard reveal"
      style={{ transitionDelay: `${(index % 4) * 0.07}s` }}
    >
      <div className="cc-cover" style={{ background: `linear-gradient(120deg, var(${nicheColorVar}), var(--violet))` }} />
      <div className="cc-top">
        {creator.avatarUrl ? (
          <img className="cc-av" src={creator.avatarUrl} alt={creator.fullName} />
        ) : (
          <div className="cc-av cc-av-fallback">{getInitials(creator.fullName)}</div>
        )}
      </div>
      <div className="cc-body">
        <div className="cc-name">
          {creator.fullName}{' '}
          <BadgeCheck size={16} className="verif" color="#fff" fill="var(--cyan)" style={{ border: 'none' }} />
        </div>
        <div className="cc-handle">{creator.handle}</div>
        <span
          className="cc-niche"
          style={{
            background: `color-mix(in srgb, var(${nicheColorVar}) 16%, white)`,
            color: `var(${nicheColorVar})`,
          }}
        >
          {niche}
        </span>
        <div className="cc-nums">
          <div>
            <b>{formatFollowers(creator.followerCount)}</b>
            <span>Followers</span>
          </div>
          <div>
            <b>{Number(creator.engagementRate.toFixed(1))}%</b>
            <span>Engage</span>
          </div>
          <div>
            <b>{creator.campaignsCount}</b>
            <span>Campaigns</span>
          </div>
        </div>
        <button className="cc-btn" onClick={() => onBook(creator)} disabled={bookingDisabled}>
          Book {firstName}
        </button>
      </div>
    </article>
  );
}
