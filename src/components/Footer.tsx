import { WRAP } from '../styles';

export default function Footer() {
  return (
    <footer>
      <div className={WRAP}>
        <div className="fgrid">
          <div className="fbrand">
            <div className="logo" style={{ color: '#fff' }}>
              <img src="/logo-icon-dark.png" alt="" className="logo-mark" width={34} height={28} />
              THE BUZZ PULSE
            </div>
            <p>India's integrated platform for influencer marketing, destination branding and strategic public engagement.</p>
            <p className="mono" style={{ color: 'var(--amber)', fontSize: 13 }}>
              info@thebuzzpulse.com
            </p>
          </div>
          <div>
            <h4>Platform</h4>
            <ul>
              <li>
                <a href="#creators">Creator Network</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#process">Process</a>
              </li>
              <li>
                <a href="#join">Become a Creator</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Sectors</h4>
            <ul>
              <li>
                <a href="#">Government</a>
              </li>
              <li>
                <a href="#">Tourism Boards</a>
              </li>
              <li>
                <a href="#">Hospitality</a>
              </li>
              <li>
                <a href="#">Startups & FMCG</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Portfolio</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="fbot">
          <span>&#169; 2026 The Buzz Pulse. Creating Buzz. Driving Impact.</span>
          <span className="mono">www.thebuzzpulse.com</span>
          <a href="/admin" className="mono">Admin</a>
        </div>
      </div>
    </footer>
  );
}
