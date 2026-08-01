import { useEffect, useMemo, useState } from 'react';
import { BadgeCheck } from 'lucide-react';
import { listPublicCreators, type PublicCreator } from '../api/creators';
import { getCreatorTier, placeholderCreators, type CreatorTier } from '../data';
import { formatFollowers, getInitials } from '../utils/format';
import { WRAP, SECTION_PAD } from '../styles';

const TIERS: (CreatorTier | 'All')[] = ['All', 'Nano', 'Micro', 'Macro'];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

const tierColors: Record<CreatorTier, string> = {
  Nano: 'bg-(--cyan)',
  Micro: 'bg-(--violet)',
  Macro: 'bg-(--hot)',
};

export default function TierWall() {
  const [creators, setCreators] = useState<PublicCreator[]>([]);
  const [active, setActive] = useState<CreatorTier | 'All'>('All');

  useEffect(() => {
    let cancelled = false;
    listPublicCreators(1)
      .then((res) => {
        if (!cancelled) setCreators(res.data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const pool = useMemo(() => {
    if (creators.length >= 8) return creators;
    const usedIds = new Set(creators.map((c) => c.id));
    return [...creators, ...placeholderCreators.filter((p) => !usedIds.has(p.id))];
  }, [creators]);

  const grouped = useMemo(() => {
    const byTier: Record<CreatorTier, PublicCreator[]> = { Nano: [], Micro: [], Macro: [] };
    pool.forEach((c) => byTier[getCreatorTier(c.followerCount)].push(c));
    return byTier;
  }, [pool]);

  const display = active === 'All' ? pool : grouped[active];
  const counts = { All: pool.length, Nano: grouped.Nano.length, Micro: grouped.Micro.length, Macro: grouped.Macro.length };

  return (
    <section id="tiers" className={SECTION_PAD}>
      <div className={WRAP}>
        <div className="shead">
          <span className="tag t-violet">The network</span>
          <h2>Creators for every tier &amp; budget.</h2>
          <p>
            From nano creators with hyper-loyal niches to macro names with mass reach — filter the wall by follower
            tier.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2.5">
          {TIERS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActive(t)}
              className={`flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5 ${
                active === t ? 'border-transparent bg-(--ink) text-white' : 'border-black/10 bg-white text-(--ink)'
              }`}
            >
              {t}
              <small className="font-semibold opacity-70">{counts[t]}</small>
            </button>
          ))}
        </div>

        {display.length === 0 ? (
          <p className="text-sm text-[#68687A]">No creators in this tier yet.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {display.slice(0, 16).map((c) => {
              const tier = getCreatorTier(c.followerCount);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => scrollTo('creators')}
                  className="text-center transition-transform hover:-translate-y-1"
                >
                  <div className="relative mb-2 aspect-square overflow-hidden rounded-2xl shadow-[0_10px_30px_-12px_rgba(10,10,15,.22)]">
                    {c.avatarUrl ? (
                      <img src={c.avatarUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
                    ) : (
                      <div className="display grid h-full w-full place-items-center bg-(--hot) text-white">
                        {getInitials(c.fullName)}
                      </div>
                    )}
                    <span
                      className={`absolute left-1.5 top-1.5 rounded-full ${tierColors[tier]} px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-white`}
                    >
                      {tier}
                    </span>
                    <span className="absolute bottom-1.5 right-1.5 grid h-4 w-4 place-items-center rounded-full border-2 border-white bg-(--cyan)">
                      <BadgeCheck size={10} color="#fff" style={{ border: 'none' }} />
                    </span>
                  </div>
                  <div className="truncate text-[13px] font-bold leading-tight">{c.fullName.split(' ')[0]}</div>
                  <div className="text-[11px] font-semibold text-[#68687A]">{formatFollowers(c.followerCount)} followers</div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
