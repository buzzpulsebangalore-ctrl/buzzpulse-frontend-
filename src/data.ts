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
