export type UserRole = 'super_admin' | 'agency_admin' | 'hotel_owner' | 'marketing_manager' | 'sales_team';

export interface Hotel {
  id: string;
  name: string;
  location: string;
  type: 'Resort' | 'Villa' | 'Boutique Hotel' | 'Luxury Camp' | 'Business Hotel';
  occupancy: number; // percentage
  monthlyRevenue: number;
  adr: number; // Average Daily Rate
  revpar: number; // Revenue Per Available Room
  activeCampaigns: number;
}

export type LeadStage = 'new' | 'contacted' | 'proposal_sent' | 'negotiation' | 'confirmed' | 'lost';

export interface Lead {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  source: 'Website' | 'WhatsApp Direct' | 'Direct Call' | 'Instagram DM' | 'GMB Profile' | 'Referral';
  amount: number;
  stage: LeadStage;
  date: string;
  notes: string;
  assignedTo: string;
  nights: number;
  roomType: string;
}

export interface GuestProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  stayCount: number;
  preferences: string;
  lastStay: string;
  type: 'repeat' | 'first_time';
  totalSpend: number;
  tier: 'Elite' | 'Gold' | 'Silver' | 'Member';
}

export type ContentStatus = 'draft' | 'review' | 'approved' | 'published';
export type PlatformType = 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'pinterest' | 'gmb';
export type ContentType = 'post' | 'reel' | 'story' | 'gmb' | 'blog';

export interface SocialPost {
  id: string;
  platform: PlatformType;
  title: string;
  content: string;
  type: ContentType;
  scheduledDate: string;
  scheduledTime: string;
  status: ContentStatus;
  mediaUrl?: string;
  designerNotes?: string;
  approvalComment?: string;
}

export interface GmbReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  replyText?: string;
  repliedDate?: string;
  source: string;
}

export interface KeywordRank {
  id: string;
  term: string;
  rank: number;
  prevRank: number;
  searchVolume: number;
  competitorRank: number;
  status: 'up' | 'down' | 'stable';
}

export interface InfluencerCampaign {
  id: string;
  name: string;
  platform: 'Instagram' | 'TikTok' | 'YouTube' | 'Travel Blog';
  followers: number;
  engagementRate: number;
  status: 'applied' | 'approved' | 'staying' | 'completed' | 'declined';
  stayDates: string;
  deliverables: string;
  roiEstimate: string;
}

export interface MarketingCampaign {
  id: string;
  type: 'whatsapp' | 'email' | 'meta_ads' | 'google_ads';
  name: string;
  status: 'draft' | 'scheduled' | 'running' | 'completed';
  sentCount?: number;
  opens?: number;
  clicks?: number;
  spend?: number;
  leadsGenerated?: number;
  revenueGenerated?: number;
  roas?: number;
  dateCreated: string;
}

export interface Integration {
  id: string;
  name: string;
  category: 'social' | 'analytics' | 'communications' | 'hotel_systems';
  description: string;
  connected: boolean;
  requiresKey: boolean;
  apiKeyName?: string;
}

export interface AuditResult {
  url: string;
  seoScore: number;
  speedScore: number;
  mobileScore: number;
  issues: { category: 'SEO' | 'Performance' | 'Mobile' | 'Links'; message: string; severity: 'critical' | 'warning' | 'info' }[];
  metaTags: { title: string; description: string; ogImage: string; schemaValid: boolean };
}
