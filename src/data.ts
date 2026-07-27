export interface Creator {
  name: string;
  handle: string;
  niche: string;
  followers: string;
  engagement: string;
  campaigns: string;
  avatarId: number;
  colorVar: string;
}

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

export const creators: Creator[] = [
  { name: 'Ananya Rao', handle: '@ananya.wanders', niche: 'Travel', followers: '842K', engagement: '7.4%', campaigns: '12', avatarId: 32, colorVar: '--hot' },
  { name: 'Rehan Mirza', handle: '@rehanshoots', niche: 'Photography', followers: '318K', engagement: '9.1%', campaigns: '8', avatarId: 12, colorVar: '--violet' },
  { name: 'Priya Nambiar', handle: '@priyaeats', niche: 'Food', followers: '1.2M', engagement: '6.2%', campaigns: '21', avatarId: 47, colorVar: '--amber' },
  { name: 'Vikram Sethi', handle: '@vik.builds', niche: 'Tech', followers: '465K', engagement: '5.8%', campaigns: '14', avatarId: 11, colorVar: '--cyan' },
  { name: 'Meera Joshi', handle: '@meerastyles', niche: 'Fashion', followers: '980K', engagement: '8.3%', campaigns: '19', avatarId: 45, colorVar: '--hot' },
  { name: 'Arjun Kaul', handle: '@arjunflies', niche: 'Travel', followers: '2.1M', engagement: '6.9%', campaigns: '27', avatarId: 15, colorVar: '--violet' },
  { name: 'Sana Qureshi', handle: '@sanawellness', niche: 'Wellness', followers: '274K', engagement: '11.2%', campaigns: '9', avatarId: 44, colorVar: '--cyan' },
  { name: 'Dev Menon', handle: '@devfilms', niche: 'Film', followers: '611K', engagement: '7.7%', campaigns: '16', avatarId: 60, colorVar: '--amber' },
];

export const niches: string[] = ['All', 'Travel', 'Food', 'Fashion', 'Tech', 'Photography', 'Wellness', 'Film'];

export const nicheColorMap: Record<string, string> = {
  Travel: '--violet',
  Food: '--amber',
  Fashion: '--hot',
  Tech: '--cyan',
  Photography: '--violet',
  Wellness: '--cyan',
  Film: '--amber',
};

export const signupNiches: string[] = [
  'Travel', 'Food', 'Fashion', 'Tech', 'Fitness', 'Photography', 'Film', 'Comedy', 'Education', 'Lifestyle',
];
