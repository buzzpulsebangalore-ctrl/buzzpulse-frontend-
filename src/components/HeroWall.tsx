import { BadgeCheck } from 'lucide-react';
import { placeholderCreators } from '../data';
import { formatFollowers } from '../utils/format';
import type { PublicCreator } from '../api/creators';

const SPEEDS = [42, 50, 46];

function WallCard({ creator, avatarSeed, live }: { creator: PublicCreator; avatarSeed: number; live: boolean }) {
  return (
    <div className="flex-none overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_10px_30px_-12px_rgba(10,10,15,.22)]">
      <div
        className="relative h-32 bg-cover bg-center"
        style={{ backgroundImage: `url(https://picsum.photos/seed/${creator.id}-${avatarSeed}/360/260)` }}
      >
        {live && (
          <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-(--hot) px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide text-white">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-white" />
            Live
          </span>
        )}
        <span className="absolute right-2 top-2 rounded-full bg-black/80 px-2 py-1 font-mono text-[10px] font-bold text-white">
          AI <b className="text-(--coral)">{90 + (avatarSeed % 9)}%</b>
        </span>
      </div>
      <div className="p-3">
        <div className="mb-2.5 flex items-center gap-2">
          <img
            src={`https://i.pravatar.cc/80?img=${avatarSeed}`}
            alt=""
            className="h-8 w-8 flex-none rounded-full object-cover"
            loading="lazy"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1 text-[13px] font-bold leading-tight">
              {creator.fullName.split(' ')[0]}
              <BadgeCheck size={13} color="#fff" fill="var(--cyan)" style={{ border: 'none', flex: 'none' }} />
            </div>
            <div className="truncate text-[11px] font-semibold text-[#68687A]">{creator.handle}</div>
          </div>
        </div>
        <span className="mb-2.5 inline-block rounded-full bg-[#F3EFFF] px-2.5 py-1 text-[10px] font-bold text-(--violet)">
          {creator.niches[0]}
        </span>
        <div className="flex justify-between border-t border-dashed border-black/10 pt-2.5">
          <div className="text-center">
            <b className="block text-xs font-extrabold">{formatFollowers(creator.followerCount)}</b>
            <span className="text-[9px] font-semibold uppercase tracking-wide text-[#9793B4]">Followers</span>
          </div>
          <div className="text-center">
            <b className="block text-xs font-extrabold">{Number(creator.engagementRate.toFixed(1))}%</b>
            <span className="text-[9px] font-semibold uppercase tracking-wide text-[#9793B4]">Engage</span>
          </div>
          <div className="text-center">
            <b className="block text-xs font-extrabold">{creator.campaignsCount}</b>
            <span className="text-[9px] font-semibold uppercase tracking-wide text-[#9793B4]">Campaigns</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const floatChips = [
  { value: '95%', label: 'Audience authenticity', pos: 'left-2.5 top-2.5', color: '' },
  { value: '4.9★', label: 'Avg. brand rating', pos: 'right-2.5 top-2.5', color: '' },
  { value: '+18%', label: 'Engagement lift', pos: 'bottom-2.5 left-2.5', color: 'text-[#0F9E6E]' },
  { value: '6.2x', label: 'Campaign ROI', pos: 'bottom-2.5 right-2.5', color: 'text-[#0F9E6E]' },
];

export default function HeroWall() {
  const columns = Array.from({ length: 3 }, (_, ci) => {
    const items = Array.from({ length: 4 }, (_, k) => placeholderCreators[(ci * 4 + k) % placeholderCreators.length]);
    return { items, speed: SPEEDS[ci], delay: -(ci * 7) };
  });

  return (
    <div
      className="hero-wall relative h-[380px] overflow-hidden rounded-3xl sm:h-[480px] lg:h-[600px]"
      style={{
        WebkitMaskImage: 'linear-gradient(180deg,transparent,#000 12%,#000 88%,transparent)',
        maskImage: 'linear-gradient(180deg,transparent,#000 12%,#000 88%,transparent)',
      }}
    >
      <div className="grid h-full grid-cols-3 gap-3 px-1">
        {columns.map((col, ci) => (
          <div
            key={ci}
            className="hero-wall-col flex flex-col gap-3"
            style={{ animationDuration: `${col.speed}s`, animationDelay: `${col.delay}s` }}
          >
            {[...col.items, ...col.items].map((c, i) => (
              <WallCard
                key={`${ci}-${i}`}
                creator={c}
                avatarSeed={((ci * 8 + i) % 70) + 1}
                live={(ci + i) % 3 === 0}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        {floatChips.map((f) => (
          <div
            key={f.label}
            className={`absolute ${f.pos} rounded-2xl border border-white/90 bg-white/90 px-4 py-3 shadow-[0_14px_30px_-14px_rgba(10,10,15,.4)] backdrop-blur`}
          >
            <b className={`block text-xl font-extrabold ${f.color}`}>{f.value}</b>
            <span className="text-[11px] font-bold text-[#68687A]">{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
