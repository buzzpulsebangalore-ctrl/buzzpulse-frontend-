import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { WRAP } from '../styles';
import GeneralInquiryModal from './GeneralInquiryModal';

const seoGroups: Record<string, string[]> = {
  'Fashion & Beauty': [
    'Fashion Influencers', 'Black Fashion Influencers', 'Sustainable Fashion Influencers', 'Beautiful Instagram Models',
    'Skincare Influencers', 'Indian Beauty Influencers', 'Indian Makeup Influencers', 'Curly Hair Influencers',
    'Cosmetic Influencers', 'Makeup Artist', 'Hair Influencers', 'Lifestyle Influencers', 'Shoe Influencers',
    'Jewellery Influencers', 'Beard Models', 'Indian Actress', 'Male Instagram Models', 'Male Fashion Influencers',
    'Male Models With Long Hair', 'Delhi Fashion Influencers', 'Mumbai Fashion Influencers',
  ],
  'Entertainment & Creators': [
    'Cinema Influencers', 'Movie Influencers', 'Music Influencers', 'Meme Pages on Instagram', 'Indian Stand Up Comedians',
    'Comedy Influencers', 'Dance Influencers', 'Indian Choreographers', 'Journalist Influencers', 'Art Influencers',
    'Gardening Influencers', 'Family Influencers', 'Instagram Influencers', 'Fishing Influencers', 'Amazon Influencers',
    'Animal Influencers', 'Cloud Influencers', 'Young Influencers', 'Knowledge Management Influencers', 'Richest Influencers',
    'Bengali Models', 'Entrepreneur Influencers', 'Nano Influencers', 'Indian Instagram Models', 'Political Influencers',
    'Management Influencers', 'Luxury Influencers', 'Book Influencers', 'Comic Book Influencers', 'Real Estate Influencers',
    'Most Followed Asian', 'Instagram Punjabi Models', 'Instagram Bikini Models', 'Global Instagram Influencers',
    'Most Followed Influencers', 'Gen Z Influencers', 'Retail Influencers', 'Spiritual Leaders', 'Millennial Influencers',
    'Macro Influencers', 'Dating Influencers', 'Famous Painters', 'Indian Actors', 'Women Influencers',
    'Digital Influencers in Bangalore', 'Indian Teenage Influencers',
  ],
  'Tech & Gaming': [
    'Tech Coding Influencers', 'Cybersecurity Influencers', 'Digital Marketing Influencers', 'Crypto Influencers',
    'Artificial Intelligence Influencers', 'Mumbai Tech Influencers',
  ],
  'Travel & Food': [
    'Healthy Food Influencers', 'Travel Influencers', 'Food Influencers', 'Coffee Influencers', 'Cooking Influencers',
    'Motorcycle Influencers', 'Vegan Influencers', 'Female Travel Influencers', 'Kolkata Food Influencers',
    'Delhi Food Influencers', 'Pune Food Influencers', 'Hyderabad Food Influencers', 'Bangalore Food Influencers',
    'Jaipur Food Influencers', 'Mumbai Food Influencers', 'Couple Travel Influencers', 'Mumbai Travel Influencers',
  ],
  'Fitness & Sports': [
    'Golf Influencers', 'Mental Health Influencers', 'Health Influencers', 'Yoga Influencers', 'Running Influencers',
    'Bodybuilding Influencers', 'Fitness Influencers', 'Male Fitness Models', 'Fitness Influencers in Bangalore',
    'Indian Female Bodybuilders', 'Mumbai Fitness Influencers',
  ],
  'Finance & Ecommerce': ['Finance Influencers Youtube', 'Finance Influencer Instagram', 'Ecommerce Influencers'],
  'Parenting & Pets': ['Cat Influencers', 'Dog Influencers', 'Mommy Influencers', 'Kolkata Mom Influencers', 'Mumbai Mom Influencers'],
  'Location-wise Influencers': [
    'Delhi Influencers', 'Delhi Lifestyle Influencers', 'Haryana Influencers', 'Himachal Pradesh Influencers',
    'Jammu Kashmir Influencers', 'Punjab Influencers', 'Amritsar Influencers', 'Bareilly Influencers', 'Lucknow Influencers',
    'Dehradun Influencers', 'Kanpur Influencers', 'Faridabad Influencers', 'Shimla Influencers', 'Varanasi Influencers',
    'Noida Influencers', 'Moradabad Influencers', 'Meerut Influencers', 'Prayagraj Influencers', 'Ghaziabad Influencers',
    'Mathura Influencers', 'Gorakhpur Influencers', 'Jhansi Influencers', 'Uttarakhand Influencers', 'Uttar Pradesh Influencers',
    'Gurugram Influencers', 'Guntur Influencers', 'Kerala Influencers', 'Puducherry Influencers', 'Telangana Influencers',
    'South Indian Influencers', 'Tamil Nadu Influencers', 'Andhra Pradesh Influencers', 'Karnataka Influencers',
    'Chennai Influencers', 'Coimbatore Influencers', 'Erode Influencers', 'South Indian Actors', 'Madurai Influencers',
    'Salem Influencers', 'Thanjavur Influencers', 'Thiruvananthapuram Influencers', 'Tirunelveli Influencers',
    'Tiruvannamalai Influencers', 'Vellore Influencers', 'Kochi Influencers', 'Kollam Influencers', 'Thrissur Influencers',
    'Kannur Influencers', 'Mangaluru Influencers', 'Mysuru Influencers', 'Hubballi Dharwad Influencers',
    'Kalaburagi Influencers', 'Belagavi Influencers', 'Vijayapura Influencers', 'Karnal Influencers', 'Kakinada Influencers',
    'Kozhikode Influencers', 'Rajamahendravaram Influencers', 'Vijayawada Influencers', 'Visakhapatnam Influencers',
    'Warangal Influencers', 'Hyderabad Influencers', 'Assam Influencers', 'Arunachal Pradesh Influencers',
    'Manipur Influencers', 'Meghalaya Influencers', 'Mizoram Influencers', 'Nagaland Influencers', 'Sikkim Influencers',
    'Tripura Influencers', 'Odisha Influencers', 'West Bengal Influencers', 'Bihar Influencers', 'Jharkhand Influencers',
    'Guwahati Influencers', 'Bhubaneswar Influencers', 'Cuttack Influencers', 'Rourkela Influencers', 'Dhanbad Influencers',
    'Ranchi Influencers', 'Jamshedpur Influencers', 'Asansol Influencers', 'Siliguri Influencers', 'Kolkata Influencers',
    'Durgapur Influencers', 'Madhya Pradesh Influencers', 'Chhattisgarh Influencers', 'Bhopal Influencers',
    'Gwalior Influencers', 'Indore Influencers', 'Jabalpur Influencers', 'Bilaspur Influencers', 'Bhilai Influencers',
    'Raipur Influencers', 'Srinagar Influencers', 'Jalandhar Influencers', 'Ludhiana Influencers', 'Chandigarh Influencers',
    'Hamirpur Influencers', 'Agra Influencers', 'Rajasthan Influencers', 'Aurangabad Influencers', 'Nagpur Influencers',
    'Ujjain Influencers', 'Pune Influencers', 'Tiruchirappalli Influencers', 'Jamnagar Influencers', 'Goa Influencers',
    'Nashik Influencers', 'Mumbai Beauty Influencers', 'Vadodara Influencers', 'Bangalore Beauty Influencers',
    'Bhavnagar Influencers', 'Ahmedabad Influencers', 'Bokaro Steel City Influencers', 'Patna Influencers',
    'Bhiwandi Influencers', 'Rajkot Influencers', 'Ajmer Influencers', 'Solapur Influencers', 'Malappuram Influencers',
    'Vasai Virar Influencers', 'Jodhpur Influencers', 'Sangli Influencers', 'Kolhapur Influencers', 'Nanded Influencers',
    'Anand Influencers', 'Kurnool Influencers', 'Firozabad Influencers', 'Ratlam Influencers', 'Bikaner Influencers',
    'Maharashtra Influencers', 'Mumbai Influencers', 'Bangalore Influencers', 'Aligarh Influencers', 'Gujarat Influencers',
    'Surat Influencers', 'Jalgaon Influencers', 'Amravati Influencers', 'Marathi Influencers', 'Jaipur Influencers',
    'Nellore Influencers',
  ],
};

function SeoChip({ label, onSelect }: { label: string; onSelect: (label: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(label)}
      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#8D89AC] transition-colors hover:bg-(--violet) hover:text-white"
    >
      {label}
    </button>
  );
}

function SeoDirectory() {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<string | null>(null);

  return (
    <div className="mb-6 border-t border-white/10">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-4"
        aria-expanded={open}
      >
        <h4 className="text-left">Browse influencers by category, city &amp; niche</h4>
        <span className="flex items-center gap-1.5 text-[13px] font-bold text-[#A9A5C9]">
          Explore directory
          <ChevronDown size={16} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} style={{ border: 'none' }} />
        </span>
      </button>
      <div className={`grid transition-[grid-template-rows] duration-500 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="columns-1 gap-8 pb-4 sm:columns-2 lg:columns-3">
            {Object.entries(seoGroups)
              .filter(([group]) => group !== 'Location-wise Influencers')
              .map(([group, rawLinks]) => {
                const links = [...new Set(rawLinks)];
                return (
                  <div key={group} className="mb-4 break-inside-avoid-column border-t border-white/5 pt-3">
                    <h5 className="mb-2 text-sm font-bold text-white">
                      {group} <span className="font-medium text-[#6E6A93]">&middot; {links.length}</span>
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {links.map((label) => (
                        <SeoChip key={label} label={label} onSelect={setTopic} />
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>

          {(() => {
            const cityLinks = [...new Set(seoGroups['Location-wise Influencers'])];
            return (
              <div className="border-t border-white/5 pb-4 pt-3">
                <h5 className="mb-2 text-sm font-bold text-white">
                  Location-wise Influencers <span className="font-medium text-[#6E6A93]">&middot; {cityLinks.length}</span>
                </h5>
                <div className="flex flex-wrap gap-2">
                  {cityLinks.map((label) => (
                    <SeoChip key={label} label={label} onSelect={setTopic} />
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {topic && <GeneralInquiryModal topic={topic} onClose={() => setTopic(null)} />}
    </div>
  );
}

export default function Footer() {
  return (
    <footer>
      <div className={WRAP}>
        <div className="fgrid">
          <div className="fbrand">
            <div className="logo" style={{ color: '#fff' }}>
              <img
                src="/BP-logo-transparent.png"
                alt="BuzzPulse"
                className="logo-full"
                width={82}
                height={40}
                style={{ filter: 'brightness(0) invert(1)' }}
              />
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
                <Link to="/#creators">Creator Network</Link>
              </li>
              <li>
                <Link to="/#services">Services</Link>
              </li>
              <li>
                <Link to="/#process">Process</Link>
              </li>
              <li>
                <Link to="/join/creator">Become a Creator</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Solutions</h4>
            <ul>
              <li>
                <Link to="/#services">What We Do</Link>
              </li>
              <li>
                <Link to="/#process">Our Process</Link>
              </li>
              <li>
                <Link to="/#ai-content">AI Content Showcase</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        <SeoDirectory />

        <div className="fbot">
          <span>&#169; 2026 The Buzz Pulse. Creating Buzz. Driving Impact.</span>
        </div>
      </div>
    </footer>
  );
}
