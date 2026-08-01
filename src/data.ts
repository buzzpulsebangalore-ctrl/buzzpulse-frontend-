import type { PublicCreator } from './api/creators';

export const tickWords: string[] = [
  'Influencer Marketing',
  'Destination Branding',
  'Government Campaigns',
  'Event Management',
  'Video Production',
  'Drone Cinematography',
  'CSR Campaigns',
  'Public Relations',
];

export const brands: string[] = [
  'Ministry of Tourism',
  'Kerala Tourism',
  'IndiGo',
  'Taj Hotels',
  'NITI Aayog',
  'Zomato',
  'Karnataka Tourism',
];

const nichePalette = ['--hot', '--violet', '--amber', '--cyan'];

export function getNicheColorVar(niche: string): string {
  let hash = 0;
  for (let i = 0; i < niche.length; i++) hash = (hash * 31 + niche.charCodeAt(i)) >>> 0;
  return nichePalette[hash % nichePalette.length];
}

export const placeholderCreators: PublicCreator[] = [
  { id: 'placeholder-1', fullName: 'Ananya Rao', handle: '@ananya.wanders', platform: 'INSTAGRAM', niches: ['Travel'], followerCount: 842000, avatarUrl: null, engagementRate: 7.4, campaignsCount: 12 },
  { id: 'placeholder-2', fullName: 'Rehan Mirza', handle: '@rehanshoots', platform: 'INSTAGRAM', niches: ['Photography'], followerCount: 318000, avatarUrl: null, engagementRate: 9.1, campaignsCount: 8 },
  { id: 'placeholder-3', fullName: 'Priya Nambiar', handle: '@priyaeats', platform: 'INSTAGRAM', niches: ['Food'], followerCount: 1200000, avatarUrl: null, engagementRate: 6.2, campaignsCount: 21 },
  { id: 'placeholder-4', fullName: 'Vikram Sethi', handle: '@vik.builds', platform: 'YOUTUBE', niches: ['Tech'], followerCount: 465000, avatarUrl: null, engagementRate: 5.8, campaignsCount: 14 },
  { id: 'placeholder-5', fullName: 'Meera Joshi', handle: '@meerastyles', platform: 'INSTAGRAM', niches: ['Fashion'], followerCount: 980000, avatarUrl: null, engagementRate: 8.3, campaignsCount: 19 },
  { id: 'placeholder-6', fullName: 'Arjun Kaul', handle: '@arjunflies', platform: 'INSTAGRAM', niches: ['Travel'], followerCount: 2100000, avatarUrl: null, engagementRate: 6.9, campaignsCount: 27 },
  { id: 'placeholder-7', fullName: 'Sana Qureshi', handle: '@sanawellness', platform: 'INSTAGRAM', niches: ['Fitness'], followerCount: 274000, avatarUrl: null, engagementRate: 11.2, campaignsCount: 9 },
  { id: 'placeholder-8', fullName: 'Dev Menon', handle: '@devfilms', platform: 'YOUTUBE', niches: ['Film'], followerCount: 611000, avatarUrl: null, engagementRate: 7.7, campaignsCount: 16 },
];

export const signupNiches: string[] = [
  'Travel', 'Food', 'Fashion', 'Tech', 'Fitness', 'Photography', 'Film', 'Comedy', 'Education', 'Lifestyle',
];

export type CreatorTier = 'Nano' | 'Micro' | 'Macro';

export function getCreatorTier(followerCount: number): CreatorTier {
  if (followerCount < 10_000) return 'Nano';
  if (followerCount < 100_000) return 'Micro';
  return 'Macro';
}

export interface BrandHiring {
  name: string;
  category: string;
  color: string;
}

export const brandsHiring: BrandHiring[] = [
  { name: 'Mamaearth', category: 'Beauty & personal care', color: '#4CAF50' },
  { name: 'boAt', category: 'Audio & wearables', color: '#E23B3B' },
  { name: 'Nykaa', category: 'Beauty retail', color: '#E91E8C' },
  { name: 'SUGAR Cosmetics', category: 'Cosmetics', color: '#212121' },
  { name: 'Wakefit', category: 'Sleep & furniture', color: '#FF7A00' },
  { name: 'Lenskart', category: 'Eyewear', color: '#2F6FED' },
  { name: 'Licious', category: 'Food & meat delivery', color: '#C62828' },
  { name: 'Plum', category: 'Clean beauty', color: '#00897B' },
  { name: 'MCaffeine', category: 'Skincare', color: '#3E2723' },
  { name: 'WOW Skin Science', category: 'Skincare', color: '#43A047' },
  { name: 'Myntra', category: 'Fashion ecommerce', color: '#FF3F6C' },
  { name: 'Ajio', category: 'Fashion ecommerce', color: '#2D2A4A' },
  { name: 'Zomato', category: 'Food delivery', color: '#EF4F5F' },
  { name: 'Swiggy', category: 'Food delivery', color: '#FC8019' },
  { name: 'Bewakoof', category: 'Apparel', color: '#00B7C2' },
  { name: 'The Souled Store', category: 'Apparel', color: '#1A1A1A' },
  { name: 'Cred', category: 'Fintech', color: '#111111' },
  { name: 'Groww', category: 'Fintech', color: '#00D09C' },
  { name: 'Noise', category: 'Wearables', color: '#E23B3B' },
  { name: 'Sirona', category: 'Personal care', color: '#7B1FA2' },
  { name: 'Beardo', category: "Men's grooming", color: '#5D4037' },
  { name: 'The Man Company', category: "Men's grooming", color: '#263238' },
  { name: 'Minimalist', category: 'Skincare', color: '#455A64' },
];

export interface AiShowcaseVideo {
  brand: string;
  category: string;
  color: string;
  caption: string;
  duration: string;
  avatarSeed: number;
}

export const aiShowcaseVideos: AiShowcaseVideo[] = [
  { brand: 'GlowLuxe', category: 'Makeup', color: '#FF962D', caption: 'This matte lipstick lasts all day — swipe once, done.', duration: '0:18', avatarSeed: 45 },
  { brand: 'NovaPhone', category: 'Mobile', color: '#2F6FED', caption: '108MP camera, 2-day battery. Your next upgrade.', duration: '0:22', avatarSeed: 11 },
  { brand: 'PureSkin', category: 'Skincare', color: '#0B3FA8', caption: '3 drops of vitamin C serum, glass skin in 2 weeks.', duration: '0:15', avatarSeed: 44 },
  { brand: 'CrispBite', category: 'Food', color: '#FF7A00', caption: "Baked, not fried — the snack you won't feel guilty about.", duration: '0:20', avatarSeed: 47 },
  { brand: 'AeroFit', category: 'Fitness', color: '#FFB066', caption: 'These runners feel like clouds. 5K felt like 2.', duration: '0:24', avatarSeed: 53 },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatarSeed: number;
}

export const testimonials: Testimonial[] = [
  {
    quote: 'We shortlisted verified creators for our tourism campaign in an afternoon instead of weeks of DMs and spreadsheets.',
    name: 'Meghna Iyer',
    role: 'Marketing Lead, D2C brand',
    avatarSeed: 9,
  },
  {
    quote: "Every profile is manually vetted, so we stopped worrying about inflated follower counts before we'd even booked anyone.",
    name: 'Rahul Bose',
    role: 'Growth Manager, FMCG brand',
    avatarSeed: 14,
  },
  {
    quote: 'Ran a multi-state tourism activation end to end — creator outreach, booking requests, approvals — all from one place.',
    name: 'Divya Nair',
    role: 'Campaign Director, Tourism board',
    avatarSeed: 24,
  },
];

export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: 'How do I book a creator?',
    a: "Browse the Creator Network, filter by niche, and hit \"Book\" on any profile. Fill in your contact details and we'll pass your request straight to the creator — no account required.",
  },
  {
    q: 'How are creators vetted?',
    a: "Every application is manually reviewed by our team — audience quality, engagement authenticity and brand safety — before a creator's profile goes live and becomes bookable.",
  },
  {
    q: 'Is there a fee to join as a creator?',
    a: 'No. Creator sign-up is free. You apply once, we review your profile, and once approved you can be booked directly by brands, tourism boards and government campaigns.',
  },
  {
    q: 'What happens after I submit a booking request?',
    a: "Your request lands in our team's queue alongside the creator's. Once accepted, we'll follow up by email or phone within 48 hours to confirm details.",
  },
  {
    q: 'Which platforms do creators cover?',
    a: 'Instagram, YouTube, LinkedIn and X, across every major Indian city and state — filterable by niche, platform and follower tier.',
  },
];


export interface CreatorProfile {
  fullName: string;
  email: string;
  city: string;
  platform: string;
  handle: string;
  followerCount: string;
  niches: string[];
  bio: string;
  joinedOn: string;
}

export const mockCreatorProfile: CreatorProfile = {
  fullName: 'Ananya Rao',
  email: 'ananya.rao@email.com',
  city: 'Bengaluru',
  platform: 'INSTAGRAM',
  handle: '@ananya.wanders',
  followerCount: '842K',
  niches: ['Travel', 'Photography'],
  bio: 'Travel storyteller documenting India one state at a time.',
  joinedOn: '2026-01-14',
};
