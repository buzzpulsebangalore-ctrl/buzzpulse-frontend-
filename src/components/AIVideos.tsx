import { useEffect, useState } from 'react';
import { X, Play } from 'lucide-react';
import { aiShowcaseVideos, type AiShowcaseVideo } from '../data';
import { WRAP, SECTION_PAD } from '../styles';

export default function AIVideos() {
  const [active, setActive] = useState<AiShowcaseVideo | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <section id="ai-content" className={`${SECTION_PAD} bg-[#F7F7FA]`}>
      <div className={WRAP}>
        <div className="shead">
          <span className="tag t-cyan">AI-generated content</span>
          <h2>AI creators, talking about brands.</h2>
          <p>
            Sample spots produced with AI avatars — makeup, mobiles, skincare, food and more. Fully
            brand-customisable, ready for Reels and Shorts. (Demo previews.)
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {aiShowcaseVideos.map((v) => (
            <button
              key={v.brand}
              type="button"
              onClick={() => setActive(v)}
              className="group relative aspect-[9/16] overflow-hidden rounded-2xl bg-black shadow-[0_10px_30px_-12px_rgba(10,10,15,.3)] transition-transform hover:-translate-y-1.5"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: `linear-gradient(140deg, ${v.color}cc, rgba(10,10,15,.4)), url(https://i.pravatar.cc/400?img=${v.avatarSeed})`,
                }}
              />
              <div className="absolute inset-0 bg-linear-to-b from-black/5 via-transparent to-black/80" />
              <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide text-(--ink) backdrop-blur">
                ✦ AI Avatar
              </span>
              <span className="absolute right-2 top-2 rounded-md bg-black/70 px-1.5 py-1 font-mono text-[10px] font-bold text-white">
                {v.duration}
              </span>
              <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-(--ink) shadow-[0_8px_20px_-6px_rgba(0,0,0,.4)] transition-transform group-hover:scale-110">
                <Play size={18} fill="currentColor" style={{ border: 'none', marginLeft: 2 }} />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-3 text-left text-white">
                <div className="mb-1.5 flex items-center gap-2">
                  <span
                    className="grid h-6 w-6 flex-none place-items-center rounded-md text-[11px] font-extrabold text-white"
                    style={{ background: v.color }}
                  >
                    {v.brand[0]}
                  </span>
                  <span className="text-[13px] font-extrabold leading-none">{v.brand}</span>
                </div>
                <p className="text-[11px] font-medium leading-snug opacity-90">{v.caption}</p>
                <span className="mt-1.5 inline-block rounded-full bg-white/20 px-2 py-1 text-[9px] font-bold uppercase tracking-wide backdrop-blur">
                  {v.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[200] grid place-items-center bg-[rgba(10,9,20,.82)] p-5 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="relative aspect-[9/16] w-[min(340px,90vw)] overflow-hidden rounded-[22px] bg-black shadow-[0_40px_90px_-30px_#000]"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute inset-0 bg-cover bg-center brightness-[.82]"
              style={{
                backgroundImage: `linear-gradient(140deg, ${active.color}cc, rgba(10,10,15,.4)), url(https://i.pravatar.cc/500?img=${active.avatarSeed})`,
              }}
            />
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white"
            >
              <X size={18} style={{ border: 'none' }} />
            </button>
            <div className="absolute left-3.5 right-14 top-3.5 text-[11px] font-semibold text-white/85">
              Demo preview — sample AI-generated spot
            </div>
            <div className="absolute inset-0 grid place-items-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-white/95 text-(--ink)">
                <Play size={24} fill="currentColor" style={{ border: 'none', marginLeft: 3 }} />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 text-white">
              <div className="mb-1.5 flex items-center gap-2">
                <span
                  className="grid h-6 w-6 place-items-center rounded-md text-[11px] font-extrabold"
                  style={{ background: active.color }}
                >
                  {active.brand[0]}
                </span>
                <span className="text-sm font-extrabold">{active.brand}</span>
                <span className="opacity-80">&middot; {active.category}</span>
              </div>
              <p className="text-[13px] leading-snug">{active.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
