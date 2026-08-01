import { useEffect, useRef, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { WRAP } from '../styles';
import LoginModal from './LoginModal';
import { getCookie } from '../utils/cookies';

function goToDashboard() {
  const role = getCookie('role');
  window.location.assign(role === 'ADMIN' ? '/admin' : '/creator');
}

function hrefFor(id: string) {
  return id === 'join' ? '/join/creator' : `#${id}`;
}

interface NavLink {
  id: string;
  label: string;
  desc?: string;
}

interface NavColumn {
  title: string;
  links: NavLink[];
}

interface NavGroup {
  label: string;
  links?: NavLink[];
  columns?: NavColumn[];
}

const navGroups: NavGroup[] = [
  {
    label: 'Platform',
    links: [
      { id: 'creators', label: 'Creator Network', desc: 'Verified creators, filter & book' },
      { id: 'ai-engine', label: 'AI Engine', desc: 'Search, match score & fraud detection' },
      { id: 'features', label: 'Platform Features', desc: 'Discovery to reporting, one workspace' },
    ],
  },
  {
    label: 'Solutions',
    links: [
      { id: 'services', label: 'What We Do', desc: 'Six ways we build the buzz' },
      { id: 'process', label: 'Our Process', desc: 'Discover, design, deliver, drive' },
      { id: 'ai-content', label: 'AI Content Showcase', desc: 'Sample AI-generated brand spots' },
    ],
  },
  {
    label: 'Creators',
    links: [
      { id: 'tiers', label: 'Creator Tiers', desc: 'Nano, micro and macro' },
      { id: 'join', label: 'Become a Creator', desc: 'Apply in about 90 seconds' },
      { id: 'brands', label: 'Brands Hiring Now', desc: 'Live demand from top brands' },
    ],
  },
  {
    label: 'Resources',
    columns: [
      {
        title: 'Learn',
        links: [
          { id: 'blog', label: 'Blog' },
          { id: 'academy', label: 'Academy' },
          { id: 'guides', label: 'Guides' },
          { id: 'webinars', label: 'Webinars' },
        ],
      },
      {
        title: 'Proof',
        links: [
          { id: 'case-studies', label: 'Case Studies' },
          { id: 'reports', label: 'Reports' },
          { id: 'roi-calculator', label: 'ROI Calculator' },
          { id: 'api-docs', label: 'API Docs' },
        ],
      },
    ],
  },
];

const mobileLinks: NavLink[] = navGroups.flatMap((g) => g.links ?? g.columns?.flatMap((c) => c.links) ?? []);

export default function Nav() {
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const groupsRef = useRef<HTMLDivElement>(null);
  const loggedIn = !!getCookie('access_token');

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (groupsRef.current && !groupsRef.current.contains(e.target as Node)) setOpenGroup(null);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function handleSignup() {
    setMenuOpen(false);
    if (loggedIn) goToDashboard();
    else window.location.assign('/join');
  }

  function handleLoginOrDashboard() {
    setMenuOpen(false);
    if (loggedIn) goToDashboard();
    else setShowLogin(true);
  }

  return (
    <nav>
      <div className={`${WRAP} nav-in`}>
        <div className="logo">
          <img src="/BP-logo-transparent.png" alt="BuzzPulse" className="logo-full" width={82} height={40} />
        </div>
        <div className="nav-links" ref={groupsRef}>
          {navGroups.map((g) => (
            <div key={g.label} className="relative">
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-(--ink) rounded-lg hover:bg-[#F3EFFF] transition-colors"
                onClick={() => setOpenGroup((o) => (o === g.label ? null : g.label))}
                aria-expanded={openGroup === g.label}
              >
                {g.label}
                <ChevronDown
                  size={13}
                  strokeWidth={2.5}
                  style={{ border: 'none' }}
                  className={`opacity-60 transition-transform duration-200 ${openGroup === g.label ? 'rotate-180' : ''}`}
                />
              </button>
              {openGroup === g.label && g.links && (
                <div className="absolute left-1/2 top-[calc(100%+10px)] z-50 w-72 -translate-x-1/2 rounded-2xl border border-black/5 bg-white p-3 shadow-[0_24px_48px_-18px_rgba(10,10,15,.35)]">
                  {g.links.map((l) => (
                    <a
                      key={l.id}
                      href={hrefFor(l.id)}
                      onClick={() => setOpenGroup(null)}
                      className="block rounded-xl px-4 py-3 transition-colors hover:bg-[#F3EFFF]"
                    >
                      <span className="block text-sm font-bold text-(--ink)">{l.label}</span>
                      {l.desc && <span className="mt-0.5 block text-xs text-[#68687A]">{l.desc}</span>}
                    </a>
                  ))}
                </div>
              )}
              {openGroup === g.label && g.columns && (
                <div className="absolute left-1/2 top-[calc(100%+10px)] z-50 flex w-[420px] -translate-x-1/2 gap-2 rounded-2xl border border-black/5 bg-white p-4 shadow-[0_24px_48px_-18px_rgba(10,10,15,.35)]">
                  {g.columns.map((col) => (
                    <div key={col.title} className="flex-1">
                      <span className="mb-1 block px-3 text-[11px] font-bold uppercase tracking-widest text-[#9A9AA8]">
                        {col.title}
                      </span>
                      {col.links.map((l) => (
                        <a
                          key={l.id}
                          href={hrefFor(l.id)}
                          onClick={() => setOpenGroup(null)}
                          className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-(--ink) transition-colors hover:bg-[#F3EFFF]"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="nav-actions">
          <button className="btn" onClick={handleSignup}>
            Signup
          </button>
          <button className="btn" onClick={handleLoginOrDashboard}>
            {loggedIn ? 'Dashboard' : 'Login'}
          </button>
        </div>
        <button
          className="menu-btn"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? (
            <X size={24} strokeWidth={2} style={{ border: 'none' }} />
          ) : (
            <Menu size={24} strokeWidth={2} style={{ border: 'none' }} />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className={`${WRAP} nav-mobile`}>
          {mobileLinks.map((l) => (
            <a key={l.id} href={hrefFor(l.id)} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <div className="nav-mobile-actions">
            <button className="btn btn-ghost" onClick={handleSignup}>
              Signup
            </button>
            <button className="btn btn-ink" onClick={handleLoginOrDashboard}>
              {loggedIn ? 'Dashboard' : 'Login'}
            </button>
          </div>
        </div>
      )}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </nav>
  );
}
