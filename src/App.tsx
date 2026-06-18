import React, { useState } from 'react';
import { 
  Building, LayoutDashboard, HeartHandshake, Calendar, Sparkles, 
  Globe, Radio, MessageSquare, FileSpreadsheet, Bell, Menu, X, 
  MapPin, CheckCircle, ShieldAlert, Award, ChevronDown, Check, Trash2 
} from 'lucide-react';

import { 
  Hotel, Lead, GuestProfile, SocialPost, GmbReview, 
  KeywordRank, InfluencerCampaign, MarketingCampaign, Integration, LeadStage, ContentStatus 
} from './types';

// Importing views
import RoleSelector from './components/RoleSelector';
import DashboardView from './components/DashboardView';
import CRMView from './components/CRMView';
import SocialCalendarView from './components/SocialCalendarView';
import AIGeneratorView from './components/AIGeneratorView';
import WebsiteSEOView from './components/WebsiteSEOView';
import GmbOtaView from './components/GmbOtaView';
import MarketingChannelsView from './components/MarketingChannelsView';
import ReportsView from './components/ReportsView';

export default function App() {
  // Global active user setup states
  const [activeRole, setActiveRole] = useState<'super_admin' | 'agency_admin' | 'hotel_owner' | 'marketing_manager' | 'sales_team'>('agency_admin');
  const [selectedHotelId, setSelectedHotelId] = useState<string>('samudra');
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Custom Notification manager state
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: '1', type: 'lead', title: 'New Booking Inquiry', msg: 'Sarah Jenkins requested Ocean Suite for 4 nights via GMB.', read: false, time: '10 mins ago' },
    { id: '2', type: 'social', title: 'Approval Required', msg: 'Instagram Monsoon Reel drafted by marketing needs review.', read: false, time: '1 hr ago' },
    { id: '3', type: 'booking', title: 'Direct Booking checkout', msg: 'Payment secured for Villa #3 early-bird offer.', read: true, time: '4 hrs ago' },
  ]);

  // --- MOCK DATABASE AND PERSISTENCE STATES ---
  
  const [hotels, setHotels] = useState<Hotel[]>([
    { id: 'samudra', name: 'Samudra Luxury Ubud Resort', location: 'Bali, Indonesia', type: 'Resort', occupancy: 82, monthlyRevenue: 124500, adr: 340, revpar: 278, activeCampaigns: 4 },
    { id: 'amber', name: 'Amber Woods Boutique Villa', location: 'Coorg, India', type: 'Boutique Hotel', occupancy: 68, monthlyRevenue: 48900, adr: 210, revpar: 142, activeCampaigns: 2 },
    { id: 'glamping', name: 'The Wild Glamping Canyon Camp', location: 'Jaisalmer, India', type: 'Luxury Camp', occupancy: 54, monthlyRevenue: 32600, adr: 180, revpar: 97, activeCampaigns: 1 },
    { id: 'sanskrit', name: 'Sanskrit Palace Estate', location: 'Jaipur, India', type: 'Business Hotel', occupancy: 76, monthlyRevenue: 64200, adr: 155, revpar: 117, activeCampaigns: 3 },
  ]);

  const [leads, setLeads] = useState<Lead[]>([
    { id: 'lead_1', guestName: 'Alexander Wright', email: 'alex@wright.com', phone: '+1 (415) 302-1840', source: 'Website', amount: 1560, stage: 'new', date: '2026-06-15', notes: 'Anniversary celebration. Requesting top-tier ocean suite if available.', assignedTo: 'Rohan Kumar', nights: 3, roomType: 'Ocean Suite' },
    { id: 'lead_2', guestName: 'Sarah Jenkins', email: 'sarah@jenkins.com', phone: '+44 7911 391204', source: 'WhatsApp Direct', amount: 2400, stage: 'proposal_sent', date: '2026-06-17', notes: 'Wants yoga deck access and gluten-free breakfast sequence details.', assignedTo: 'Anita Desai', nights: 5, roomType: 'Garden Plunge Pool Villa' },
    { id: 'lead_3', guestName: 'Vikram Malhotra', email: 'vikram@malhotra.in', phone: '+91 98200 12345', source: 'Direct Call', amount: 950, stage: 'negotiation', date: '2026-06-16', notes: 'Corporate booking. Needs airport pick-up and late check-out scheduling.', assignedTo: 'Rohan Kumar', nights: 2, roomType: 'Standard Executive' },
    { id: 'lead_4', guestName: 'Emma Watson', email: 'emma@watson.co.uk', phone: '+44 7888 555111', source: 'Instagram DM', amount: 3220, stage: 'confirmed', date: '2026-06-14', notes: 'Private pool suite. VIP requirements. An elite luxury influencer stay setup.', assignedTo: 'Anita Desai', nights: 4, roomType: 'Presidential Suite' },
  ]);

  const [guests, setGuests] = useState<GuestProfile[]>([
    { id: 'g_1', name: 'David Beckham', email: 'david@beckham.com', phone: '+44 7911 902189', stayCount: 8, preferences: 'Extra feather pillows, organic local dark roasts in-suite, private sunset table reservations, strictly luxury spa preferences.', lastStay: 'May 12, 2026', type: 'repeat', totalSpend: 18450, tier: 'Elite' },
    { id: 'g_2', name: 'Zendaya Coleman', email: 'zendaya@specter.com', phone: '+1 (213) 480-1920', stayCount: 3, preferences: 'Needs high speed Wi-Fi for casting, requests personal butler and complete gluten-free high-touch catering items.', lastStay: 'Apr 25, 2026', type: 'repeat', totalSpend: 9200, tier: 'Gold' },
    { id: 'g_3', name: 'Robert Downey Jr.', email: 'robert@downey.com', phone: '+1 (310) 505-1845', stayCount: 1, preferences: 'Ocean pavilion villas, early morning gym bookings, private local organic tea guides, zero-interruption service privacy.', lastStay: 'Feb 10, 2026', type: 'first_time', totalSpend: 5500, tier: 'Silver' },
  ]);

  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([
    { id: 'post_1', platform: 'instagram', title: 'Monsoon Sunset spritzer teaser', content: 'Escape Ubud monsoon rain in style. Book our lagoon villas and claim complimentary twilight gin-tasting at our sunset pavilion. Link in bio 🌴🍹', type: 'reel', scheduledDate: '2026-06-21', scheduledTime: '17:30', status: 'approved', designerNotes: 'Layer over slow cinematic motion of pool raindrops', approvalComment: 'Approved for Sunday' },
    { id: 'post_2', platform: 'gmb', title: 'Farm-To-Table garden launch', content: 'We are thrilled to launch organic Sanskrit kitchen gardens starting next Thursday. Experience fresh microgreens and artisan herbal infusions harvested within feet of your cottage plate. Open for local reservations.', type: 'gmb', scheduledDate: '2026-06-25', scheduledTime: '11:00', status: 'review', designerNotes: 'High-res close-up raw vegetables slider' },
    { id: 'post_3', platform: 'facebook', title: 'Amber Woods Monsoon early-bird discount offer', content: 'Unlock early-bird monsoon wellness retreats in the heart of Coorg coffee mountains. Stay 3 nights, receive a complimentary gourmet local spices farm-tour and signature spa therapies. Click Book Now for direct savings.', type: 'post', scheduledDate: '2026-06-23', scheduledTime: '14:00', status: 'draft', designerNotes: 'Warm mist valley coffee estates landscape graphics' },
  ]);

  const [keywords, setKeywords] = useState<KeywordRank[]>([
    { id: 'kw_1', term: 'luxury bali private pool villa', rank: 4, prevRank: 7, searchVolume: 5400, competitorRank: 2, status: 'up' },
    { id: 'kw_2', term: 'ubud organic wellness resort', rank: 2, prevRank: 2, searchVolume: 2900, competitorRank: 6, status: 'stable' },
    { id: 'kw_3', term: 'mountain view boutique villa coorg', rank: 8, prevRank: 12, searchVolume: 1200, competitorRank: 5, status: 'up' },
    { id: 'kw_4', term: 'luxury glamping camp jaisalmer', rank: 11, prevRank: 9, searchVolume: 850, competitorRank: 4, status: 'down' },
  ]);

  const [influencerCampaigns, setInfluencerCampaigns] = useState<InfluencerCampaign[]>([
    { id: 'cre_1', name: 'Theresa May Travel Blogger', platform: 'Instagram', followers: 185000, engagementRate: 4.5, status: 'staying', stayDates: '15 Jun - 18 Jun', deliverables: '3 Reels with custom geolocation tags, 1 full blog guide to Bali retreat', roiEstimate: 'Estimated 5.2x ROI' },
    { id: 'cre_2', name: 'Zack King Visuals creator', platform: 'TikTok', followers: 450000, engagementRate: 3.8, status: 'approved', stayDates: '22 Jun - 24 Jun', deliverables: '2 transition Reels spotlighting pool plunge, 3 IG custom stories', roiEstimate: 'Estimated 6.8x ROI' },
    { id: 'cre_3', name: 'Lily Watson Wellness guide', platform: 'Instagram', followers: 65000, engagementRate: 6.2, status: 'completed', stayDates: '10 May - 12 May', deliverables: '1 IG story takeover, 1 Grid photo, post tagging @samudra_ubud', roiEstimate: 'Indexed - 4.1x ROI' },
  ]);

  const [marketingCampaigns, setMarketingCampaigns] = useState<MarketingCampaign[]>([
    { id: 'cmp_1', type: 'whatsapp', name: 'Ubud Rain Solace alert', status: 'completed', sentCount: 154, opens: 148, clicks: 68, spend: 12, leadsGenerated: 9, revenueGenerated: 1820, roas: 151, dateCreated: '2026-06-05' },
    { id: 'cmp_2', type: 'meta_ads', name: 'Coorg coffee mist monsoon slider', status: 'running', spend: 850, leadsGenerated: 42, revenueGenerated: 4800, roas: 5.6, dateCreated: '2026-06-10' },
  ]);

  const [integrations, setIntegrations] = useState<Integration[]>([
    { id: 'ig_insta', name: 'Instagram Creator API', category: 'social', description: 'Schedule stories & reels automatically from Social publisher panels.', connected: true, requiresKey: true, apiKeyName: 'IG_ACCESS_TOKEN' },
    { id: 'ig_gmb', name: 'Google Business Business SDK', category: 'social', description: 'Respond to customer local searches, reviews, and track directions calls.', connected: true, requiresKey: true, apiKeyName: 'GCP_GOOGLE_CRM_KEY' },
    { id: 'ig_g_analytics', name: 'Google Analytics GA4', category: 'analytics', description: 'Track referral, website visit flows, conversion actions from landing pages.', connected: true, requiresKey: true, apiKeyName: 'GA4_TRACKING_ID' },
    { id: 'ig_wa_api', name: 'WhatsApp Business Cloud API', category: 'communications', description: 'Dispatch bulk marketing cascades and handle inbound chats live.', connected: true, requiresKey: true, apiKeyName: 'WA_SYSTEM_TOKEN' },
    { id: 'ig_pms', name: 'Opera / HMS Integration Router', category: 'hotel_systems', description: 'Sync room occupancy, guest tiers catalog, ADR records from hotel servers.', connected: false, requiresKey: true, apiKeyName: 'HMS_PMS_ROUTER' },
  ]);

  const [gmbReviews, setGmbReviews] = useState<GmbReview[]>([
    { id: 'rev_1', author: 'Clara Oswald', rating: 5, text: 'We booked the private lagoon plunge pool villa for our honeymoon. The service was absolutely impeccable. Every morning, butler arrived with fresh passion fruit juices in hand and local orchid setups. Highly recommended!', date: '21 May, 2026', source: 'Google Local' },
    { id: 'rev_2', author: 'Markus Vance', rating: 3, text: 'The mountain mist landscape view of Coorg is truly spiritual, and food tastes amazing. However, the pool bar hot tub heating was off during cold evening drizzle.', date: '18 May, 2026', source: 'Tripadvisor Sync' },
  ]);

  // --- STATE ACCESS FUNCTIONS / CONTROLLERS ---

  const handleAddLead = (newLeadData: Omit<Lead, 'id' | 'date'>) => {
    const fresh: Lead = {
      ...newLeadData,
      id: `lead_${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setLeads(prev => [fresh, ...prev]);
    
    // Auto notify
    const notifyFresh = {
      id: `${Date.now()}`,
      type: 'lead',
      title: 'Inbound CRM Lead Captured',
      msg: `${fresh.guestName} requested booking via ${fresh.source}`,
      read: false,
      time: 'Just Now'
    };
    setNotifications(prev => [notifyFresh, ...prev]);
  };

  const handleUpdateLeadStage = (id: string, stage: LeadStage) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, stage } : l));
  };

  const handleDeleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  const handleAddPost = (newPostData: Omit<SocialPost, 'id'>) => {
    const fresh: SocialPost = {
      ...newPostData,
      id: `post_${Date.now()}`
    };
    setSocialPosts(prev => [fresh, ...prev]);
  };

  const handleUpdatePostStatus = (id: string, status: ContentStatus) => {
    setSocialPosts(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const handleDeletePost = (id: string) => {
    setSocialPosts(prev => prev.filter(p => p.id !== id));
  };

  const handleAddKeyword = (term: string) => {
    const fresh: KeywordRank = {
      id: `kw_${Date.now()}`,
      term,
      rank: 24, // initial rank placeholder
      prevRank: 24,
      searchVolume: 1100,
      competitorRank: 12,
      status: 'stable'
    };
    setKeywords(prev => [...prev, fresh]);
  };

  const handleDeleteKeyword = (id: string) => {
    setKeywords(prev => prev.filter(k => k.id !== id));
  };

  const handleAddGmbReply = (reviewId: string, text: string) => {
    setGmbReviews(prev => prev.map(r => r.id === reviewId ? { 
      ...r, 
      replyText: text, 
      repliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
    } : r));
  };

  const handleUpdateInfluencerStatus = (id: string, status: InfluencerCampaign['status']) => {
    setInfluencerCampaigns(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  const handleAddInfluencerCampaign = (freshCampaign: Omit<InfluencerCampaign, 'id'>) => {
    const fresh: InfluencerCampaign = {
      ...freshCampaign,
      id: `cre_${Date.now()}`
    };
    setInfluencerCampaigns(prev => [...prev, fresh]);
  };

  const handleAddMarketingCampaign = (freshCampaign: Omit<MarketingCampaign, 'id' | 'dateCreated'>) => {
    const fresh: MarketingCampaign = {
      ...freshCampaign,
      id: `cmp_${Date.now()}`,
      dateCreated: new Date().toISOString().split('T')[0]
    };
    setMarketingCampaigns(prev => [fresh, ...prev]);
  };

  const handleToggleIntegration = (id: string) => {
    setIntegrations(prev => prev.map(item => item.id === id ? { ...item, connected: !item.connected } : item));
  };

  const handleClearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Views List maps
  const viewOptions = [
    { id: 'dashboard', name: 'Revenue & Yields', icon: LayoutDashboard, roles: ['super_admin', 'agency_admin', 'hotel_owner'] },
    { id: 'crm', name: 'CRM & Guest Pipeline', icon: HeartHandshake, roles: ['super_admin', 'agency_admin', 'sales_team'] },
    { id: 'social', name: 'Social Publisher Hub', icon: Calendar, roles: ['super_admin', 'agency_admin', 'marketing_manager'] },
    { id: 'ai_copywriter', name: 'Gemini AI Copywriter', icon: Sparkles, roles: ['super_admin', 'agency_admin', 'marketing_manager'] },
    { id: 'website_seo', name: 'SEO & Landing Pages', icon: Globe, roles: ['super_admin', 'agency_admin', 'marketing_manager'] },
    { id: 'gmb_ota', name: 'GMB & OTAs manager', icon: Radio, roles: ['super_admin', 'agency_admin', 'marketing_manager'] },
    { id: 'channels', name: 'WhatsApp & Influencer', icon: MessageSquare, roles: ['super_admin', 'agency_admin', 'marketing_manager'] },
    { id: 'reports', name: 'White-Label & Billing', icon: FileSpreadsheet, roles: ['super_admin', 'agency_admin', 'hotel_owner'] },
  ];

  // Filters navigation views based on currently active switcher role
  const allowedViews = viewOptions.filter(vo => vo.roles.includes(activeRole));
  
  // Ensure we fall back to foremost allowed view if the activeRole switch breaks the view constraints
  const activeViewObj = allowedViews.find(vo => vo.id === currentView) || allowedViews[0];
  const activeViewChecked = activeViewObj ? activeViewObj.id : 'dashboard';

  return (
    <div id="full-workspace" className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans select-none antialiased text-gray-800">
      
      {/* 1. Sleek luxury Sidebar navigation */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-[#1F2937] text-gray-100 h-full border-r border-gray-800 relative z-25">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#B04285] rounded-xl text-white">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-widest font-sans text-rose-50/90 leading-tight">RD HOSPITALITY</h1>
              <span className="text-[9px] text-[#BDCD30] font-mono tracking-wider font-extrabold uppercase">Growth OS Suite</span>
            </div>
          </div>
        </div>

        {/* Dynamic Nav lists */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {allowedViews.map((item) => {
            const Icon = item.icon;
            const isSelected = activeViewChecked === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition duration-150 text-left ${
                  isSelected 
                    ? 'bg-[#B04285] text-white' 
                    : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Sidebar bottom signature */}
        <div className="p-5 border-t border-gray-800 text-[10px] text-gray-500 font-mono flex items-center justify-between">
          <span>SaaS System Active</span>
          <span className="text-emerald-500 font-bold uppercase text-[9px] tracking-wide">SECURE SSL</span>
        </div>
      </aside>

      {/* 2. Primary layout body viewport */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Full core Workspace Header panel */}
        <header className="bg-white border-b border-gray-100 h-16 flex items-center justify-between px-6 shrink-0 relative z-20">
          
          <div className="flex items-center gap-3">
            {/* Mobile nav activator button */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Title / active label */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-wider text-rose-800 bg-rose-50 px-2.5 py-1 rounded-full uppercase">
                {activeViewObj ? activeViewObj.name : 'Workspace'}
              </span>
            </div>
          </div>

          {/* Right layout user desk controls */}
          <div className="flex items-center gap-4 relative">
            
            {/* Notifications panel toggle */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-500 hover:bg-gray-50 rounded-full relative cursor-pointer"
              >
                <Bell className="w-5 h-5" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl border border-gray-150 shadow-xl z-50 p-4 shrink-0 overflow-hidden text-xs">
                  <div className="flex justify-between items-center pb-2.5 border-b border-gray-100 mb-3 font-semibold text-gray-800">
                    <span>Notifications Queue</span>
                    <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-bold">
                      {notifications.filter(n => !n.read).length} Unread
                    </span>
                  </div>

                  <div className="space-y-3.5 max-h-[250px] overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="flex gap-2.5 pb-2.5 border-b border-gray-50 last:border-0 relative group">
                        
                        <div className={`p-1.5 rounded-md mt-0.5 shrink-0 ${
                          n.type === 'lead' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-[#B04285]'
                        }`}>
                          {n.type === 'lead' ? <CheckCircle className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                        </div>

                        <div className="space-y-0.5 flex-1 pr-4">
                          <h4 className="font-bold text-gray-900 leading-tight">{n.title}</h4>
                          <p className="text-[11px] text-gray-600 leading-relaxed">{n.msg}</p>
                          <span className="block text-[9px] text-gray-400 font-mono">{n.time}</span>
                        </div>

                        <button 
                          onClick={() => handleClearNotification(n.id)}
                          className="absolute right-0 top-0 text-gray-300 hover:text-red-500 transition-colors pt-1 cursor-pointer"
                          title="Dismiss"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                    {notifications.length === 0 && (
                      <p className="text-center py-6 text-gray-400 italic">No alerts in queue</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile brand info */}
            <div className="hidden sm:flex items-center gap-3 border-l border-gray-200 pl-4">
              <div className="w-8 h-8 rounded-full bg-[#B04285] text-white flex items-center justify-center font-bold text-xs uppercase tracking-wider font-sans">
                76
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-gray-900 tracking-tight leading-normal">7611dinesh</span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase">{activeRole.replace('_', ' ')}</span>
              </div>
            </div>

          </div>
        </header>

        {/* Dynamic Roles Configurator Workspace Sub-header */}
        <RoleSelector currentRole={activeRole} onChangeRole={setActiveRole} />

        {/* 3. Main interactive scroll viewport */}
        <main className="flex-1 p-6 overflow-y-auto scrollbar-thin">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {activeViewChecked === 'dashboard' && (
              <DashboardView 
                hotels={hotels} 
                selectedHotelId={selectedHotelId} 
                onSelectHotel={setSelectedHotelId} 
                leads={leads}
              />
            )}
            {activeViewChecked === 'crm' && (
              <CRMView 
                leads={leads}
                guests={guests}
                onAddLead={handleAddLead}
                onUpdateLeadStage={handleUpdateLeadStage}
                onDeleteLead={handleDeleteLead}
              />
            )}
            {activeViewChecked === 'social' && (
              <SocialCalendarView 
                posts={socialPosts}
                onAddPost={handleAddPost}
                onUpdatePostStatus={handleUpdatePostStatus}
                onDeletePost={handleDeletePost}
              />
            )}
            {activeViewChecked === 'ai_copywriter' && (
              <AIGeneratorView 
                hotels={hotels}
                selectedHotelId={selectedHotelId}
              />
            )}
            {activeViewChecked === 'website_seo' && (
              <WebsiteSEOView 
                keywords={keywords}
                onAddKeyword={handleAddKeyword}
                onDeleteKeyword={handleDeleteKeyword}
              />
            )}
            {activeViewChecked === 'gmb_ota' && (
              <GmbOtaView 
                reviews={gmbReviews}
                onAddReply={handleAddGmbReply}
                hotels={hotels}
                selectedHotelId={selectedHotelId}
              />
            )}
            {activeViewChecked === 'channels' && (
              <MarketingChannelsView 
                influencerCampaigns={influencerCampaigns}
                onUpdateInfluencerStatus={handleUpdateInfluencerStatus}
                onAddInfluencerCampaign={handleAddInfluencerCampaign}
                marketingCampaigns={marketingCampaigns}
                onAddMarketingCampaign={handleAddMarketingCampaign}
                hotels={hotels}
                selectedHotelId={selectedHotelId}
              />
            )}
            {activeViewChecked === 'reports' && (
              <ReportsView 
                hotels={hotels}
                selectedHotelId={selectedHotelId}
                integrations={integrations}
                onToggleIntegration={handleToggleIntegration}
              />
            )}
          </div>
        </main>
      </div>

      {/* --- MOBILE NAVIGATION DRAWER SIDEBAR --- */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-canvas" className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex lg:hidden">
          <div className="bg-[#1F2937] text-gray-100 w-64 p-6 flex flex-col justify-between h-full relative border-r border-[#1F2937]">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-[#B04285] rounded-lg">
                    <Building className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-100">RD Growth</span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 hover:bg-slate-800 rounded-md"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Allowed navigation links elements */}
              <div className="space-y-1 py-6 flex flex-col">
                {allowedViews.map((item) => {
                  const Icon = item.icon;
                  const isSelected = activeViewChecked === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentView(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide text-left transition duration-150 ${
                        isSelected 
                          ? 'bg-[#B04285] text-white' 
                          : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="text-[9px] text-[#BDCD30] font-mono tracking-wider font-extrabold text-center">
              RD HOSPITALITY CO. LTD
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
