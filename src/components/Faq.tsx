import { useState } from 'react';
import { Plus } from 'lucide-react';
import { faqs } from '../data';
import { WRAP, SECTION_PAD } from '../styles';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className={SECTION_PAD} style={{ background: '#FBF8FF' }}>
      <div className={WRAP}>
        <div className="shead mx-auto text-center">
          <span className="tag t-violet">FAQ</span>
          <h2>Questions, answered.</h2>
        </div>
        <div className="mx-auto max-w-[760px]">
          {faqs.map((f, i) => {
            const open = openIndex === i;
            return (
              <div key={f.q} className="mb-3 overflow-hidden rounded-2xl border border-black/5 bg-white">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-bold"
                  aria-expanded={open}
                >
                  {f.q}
                  <Plus
                    size={22}
                    className={`flex-none transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
                    style={{ border: 'none' }}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-[#5A5680]">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
