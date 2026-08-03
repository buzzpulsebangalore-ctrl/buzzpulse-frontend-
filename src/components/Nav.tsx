import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { WRAP } from '../styles';
import LoginModal from './LoginModal';
import { getCookie } from '../utils/cookies';

interface NavLink {
  id: string;
  label: string;
  desc?: string;
}

interface NavGroup {
  label: string;
  links: NavLink[];
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
    links: [
      { id: 'blog', label: 'Blog', desc: 'Strategy, ROI and product updates' },
      { id: 'guides', label: 'Guides', desc: 'Step-by-step how-tos for brands & creators' },
      { id: 'case-studies', label: 'Case Studies', desc: 'Real campaigns, real numbers' },
    ],
  },
];

function GroupLink({
  id,
  className,
  onNavigate,
  children,
}: {
  id: string;
  className: string;
  onNavigate: () => void;
  children: ReactNode;
}) {
  if (id === 'join') {
    return (
      <Link to="/join/creator" onClick={onNavigate} className={className}>
        {children}
      </Link>
    );
  }
  if (id === 'case-studies') {
    return (
      <Link to="/case-studies" onClick={onNavigate} className={className}>
        {children}
      </Link>
    );
  }
  if (id === 'blog' || id === 'guides') {
    return (
      <Link to={`/${id}`} onClick={onNavigate} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={`#${id}`} onClick={onNavigate} className={className}>
      {children}
    </a>
  );
}

export default function Nav() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null);
  const groupsRef = useRef<HTMLDivElement>(null);
  const loggedIn = !!getCookie('access_token');

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (groupsRef.current && !groupsRef.current.contains(e.target as Node)) setOpenGroup(null);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function goToDashboard() {
    const role = getCookie('role');
    navigate(role === 'ADMIN' ? '/admin' : '/creator');
  }

  function handleSignup() {
    setMenuOpen(false);
    if (loggedIn) goToDashboard();
    else navigate('/join');
  }

  function handleLoginOrDashboard() {
    setMenuOpen(false);
    if (loggedIn) goToDashboard();
    else setShowLogin(true);
  }

  return (
    <nav>
      <div className={`${WRAP} nav-in`}>
        <Link to="/" className="logo">
          <img src="/BP-logo-transparent.png" alt="BuzzPulse" className="logo-full" width={82} height={40} />
        </Link>
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
              {openGroup === g.label && (
                <div className="absolute left-1/2 top-[calc(100%+10px)] z-50 w-72 -translate-x-1/2 rounded-2xl border border-black/5 bg-white p-3 shadow-[0_24px_48px_-18px_rgba(10,10,15,.35)]">
                  {g.links.map((l) => (
                    <GroupLink
                      key={l.id}
                      id={l.id}
                      onNavigate={() => setOpenGroup(null)}
                      className="block rounded-xl px-4 py-3 transition-colors hover:bg-[#F3EFFF]"
                    >
                      <span className="block text-sm font-bold text-(--ink)">{l.label}</span>
                      {l.desc && <span className="mt-0.5 block text-xs text-[#68687A]">{l.desc}</span>}
                    </GroupLink>
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
          {navGroups.map((g) => {
            const isOpen = mobileOpenGroup === g.label;
            return (
              <div key={g.label} className="border-b border-black/[.06]">
                <button
                  type="button"
                  onClick={() => setMobileOpenGroup(isOpen ? null : g.label)}
                  className="flex w-full items-center justify-between py-3.5 text-left text-[15px] font-bold text-(--ink)"
                  aria-expanded={isOpen}
                >
                  {g.label}
                  <ChevronDown
                    size={16}
                    strokeWidth={2.5}
                    style={{ border: 'none' }}
                    className={`opacity-60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden pb-2">
                    {g.links.map((l) => (
                      <GroupLink
                        key={l.id}
                        id={l.id}
                        onNavigate={() => setMenuOpen(false)}
                        className="block rounded-lg px-1 py-2.5 text-sm font-semibold text-[#45454E]"
                      >
                        {l.label}
                      </GroupLink>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
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
