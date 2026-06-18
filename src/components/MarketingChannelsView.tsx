import React, { useState } from 'react';
import { 
  Sparkles, MessageSquare, Send, Check, Users, RefreshCw, 
  Megaphone, ShieldCheck, DollarSign, Plus, Eye, TrendingUp, HelpCircle 
} from 'lucide-react';
import { InfluencerCampaign, MarketingCampaign, Hotel } from '../types';

interface MarketingChannelsViewProps {
  influencerCampaigns: InfluencerCampaign[];
  onUpdateInfluencerStatus: (id: string, status: InfluencerCampaign['status']) => void;
  onAddInfluencerCampaign: (c: Omit<InfluencerCampaign, 'id'>) => void;
  marketingCampaigns: MarketingCampaign[];
  onAddMarketingCampaign: (c: Omit<MarketingCampaign, 'id' | 'dateCreated'>) => void;
  hotels: Hotel[];
  selectedHotelId: string;
}

export default function MarketingChannelsView({ 
  influencerCampaigns, onUpdateInfluencerStatus, onAddInfluencerCampaign,
  marketingCampaigns, onAddMarketingCampaign, hotels, selectedHotelId 
}: MarketingChannelsViewProps) {
  const [activeTab, setActiveTab] = useState<'whatsapp_campaigns' | 'influencer_db' | 'paid_ads'>('whatsapp_campaigns');
  const currentHotel = hotels.find(h => h.id === selectedHotelId) || hotels[0];

  // Forms states
  const [waName, setWaName] = useState('');
  const [waMessage, setWaMessage] = useState('');
  const [audienceGroup, setAudienceGroup] = useState('All Past Guests');
  const [isDeployingBroadcast, setIsDeployingBroadcast] = useState(false);

  // Influencer scout states
  const [showScoutForm, setShowScoutForm] = useState(false);
  const [infName, setInfName] = useState('');
  const [infPlatform, setInfPlatform] = useState<'Instagram' | 'TikTok' | 'YouTube' | 'Travel Blog'>('Instagram');
  const [infFollowers, setInfFollowers] = useState('125000');
  const [infEngagement, setInfEngagement] = useState('4.8');
  const [infStayDates, setInfStayDates] = useState('25 Jun - 28 Jun');
  const [infDeliverables, setInfDeliverables] = useState('3 Reels, 2 Stories, 1 Grid post tagging Bali Luxury resort');

  // WhatsApp live chats mock simulator
  const [activeChatIndex, setActiveChatIndex] = useState(0);
  const [chatInputValue, setChatInputValue] = useState('');
  const [chatConversations, setChatConversations] = useState([
    {
      guestName: 'Keanu Reeves',
      phone: '+1 (310) 902-1845',
      history: [
        { sender: 'guest', text: 'Hi, are check-outs strictly at 11am? I have a late afternoon flight back to LA.' },
        { sender: 'agent', text: 'Good morning Keanu! Yes, standard is 11 AM, but as a member, we can certainly grant you a late check-out. We can lock in 2:00 PM for you with our compliments.' },
        { sender: 'guest', text: 'That is incredibly helpful. Thank you so much for arranging this.' }
      ],
      segment: 'Loyalist Elite'
    },
    {
      guestName: 'Scarlett Johansson',
      phone: '+44 7911 123456',
      history: [
        { sender: 'guest', text: 'Could you recommend if the Ocean view suites have private access pool gates?' },
        { sender: 'agent', text: 'Hello Scarlett! Yes, our Delux Ocean Suites are styled with private ladders that step directly down into the saltwater lagoon pool system.' }
      ],
      segment: 'Hot Lead'
    }
  ]);

  const handleCreateBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waName || !waMessage) return;

    setIsDeployingBroadcast(true);
    setTimeout(() => {
      onAddMarketingCampaign({
        type: 'whatsapp',
        name: waName,
        status: 'running',
        sentCount: 184,
        opens: 178, // Over 95% open rate is typical for WhatsApp
        clicks: 82,
        spend: 18, // minimal costs
        leadsGenerated: 14,
        revenueGenerated: 2400,
        roas: 133
      });

      setWaName('');
      setWaMessage('');
      setIsDeployingBroadcast(false);
      setActiveTab('whatsapp_campaigns');
    }, 1500);
  };

  const handleScoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!infName) return;

    onAddInfluencerCampaign({
      name: infName,
      platform: infPlatform,
      followers: Number(infFollowers) || 50000,
      engagementRate: Number(infEngagement) || 3.2,
      status: 'applied',
      stayDates: infStayDates,
      deliverables: infDeliverables,
      roiEstimate: 'Estimated 4.2x ROI'
    });

    setInfName('');
    setShowScoutForm(false);
  };

  const handleSendChat = (chatIndex: number) => {
    if (!chatInputValue.trim()) return;
    
    setChatConversations(prev => {
      const updated = [...prev];
      updated[chatIndex].history.push({
        sender: 'agent',
        text: chatInputValue.trim()
      });
      return updated;
    });

    setChatInputValue('');
  };

  return (
    <div id="marketing-channels-view" className="space-y-6">
      
      {/* Sub menu selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Direct & Performance Media Tracks</h1>
          <p className="text-sm text-gray-500">Formulate instant broadcast alerts, track influencer stayed content, and view ads performance.</p>
        </div>

        <div className="flex bg-white rounded-lg border border-gray-100 p-1 font-sans text-xs">
          <button
            onClick={() => setActiveTab('whatsapp_campaigns')}
            className={`px-4 py-2 font-bold rounded-lg transition ${activeTab === 'whatsapp_campaigns' ? 'bg-[#B04285] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            WhatsApp CRM & Broadcasts
          </button>
          <button
            onClick={() => setActiveTab('influencer_db')}
            className={`px-4 py-2 font-bold rounded-lg transition ${activeTab === 'influencer_db' ? 'bg-[#B04285] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Influencer scouting DB
          </button>
          <button
            onClick={() => setActiveTab('paid_ads')}
            className={`px-4 py-2 font-bold rounded-lg transition ${activeTab === 'paid_ads' ? 'bg-[#B04285] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Meta & Google Ads Roi
          </button>
        </div>
      </div>

      {activeTab === 'whatsapp_campaigns' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Create Broadcast form column */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-gray-950 uppercase tracking-widest font-mono flex items-center gap-1">
              <Megaphone className="w-4 h-4 text-[#B04285]" /> Trigger WhatsApp Broadcast
            </h3>
            <p className="text-xs text-gray-500">Broadcast pre-approved promotional messages with automated direct links.</p>

            <form onSubmit={handleCreateBroadcast} className="space-y-4 pt-1">
              <div>
                <label htmlFor="broadcast-tag" className="block text-xs font-semibold text-gray-600 mb-1">Broadcast Tag Name *</label>
                <input
                  id="broadcast-tag"
                  type="text"
                  required
                  className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#B04285] focus:outline-none"
                  placeholder="E.g. Monsoon Special offer Bali"
                  value={waName}
                  onChange={(e) => setWaName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="segment-selector" className="block text-xs font-semibold text-gray-600 mb-1">Select Guest Segment</label>
                <select
                  id="segment-selector"
                  className="w-full border border-gray-200 rounded-lg p-2 text-xs bg-white focus:ring-[#B04285]"
                  value={audienceGroup}
                  onChange={(e) => setAudienceGroup(e.target.value)}
                >
                  <option value="All Past Guests">All Past Guests (1,480 contacts)</option>
                  <option value="Elite Tier Only">Elite VIP Tier Members (182 contacts)</option>
                  <option value="Hot Offline Leads">Unconverted Inbound inquiries (48 contacts)</option>
                </select>
              </div>

              <div>
                <label htmlFor="whatsapp-template-text" className="block text-xs font-semibold text-gray-600 mb-1">WhatsApp message template *</label>
                <textarea
                  id="whatsapp-template-text"
                  rows={4}
                  required
                  className="w-full border border-gray-200 text-xs rounded-lg p-2 focus:ring-1 focus:ring-[#B04285] focus:outline-none"
                  placeholder="Hey {GuestName}! Escape Ubud winter rains in style. Book 2 nights this weekend and claim our chef's Table dinner setup absolutely free."
                  value={waMessage}
                  onChange={(e) => setWaMessage(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={isDeployingBroadcast}
                className="w-full bg-[#B04285] text-white py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer hover:bg-opacity-95"
              >
                {isDeployingBroadcast ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Sending API Broadcast sequences...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 cursor-pointer" />
                    Launch WhatsApp Broadcast
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Chat simulator on WhatsApp */}
          <div className="bg-white rounded-xl border border-gray-150 p-6 shadow-xs lg:col-span-2 flex flex-col justify-between min-h-[480px]">
            
            {/* Header info */}
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-150">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest font-mono">WhatsApp Guest CRM Chatbox</h3>
                  <p className="text-[10px] text-gray-500">Live conversation stream synced via Business APIs</p>
                </div>
                <div className="flex bg-gray-50 rounded p-1 font-mono text-[10px] gap-2">
                  <span className="text-emerald-600 bg-emerald-50 px-1.5 rounded uppercase font-bold">API Online</span>
                </div>
              </div>

              {/* Guest channels switcher */}
              <div className="flex gap-2 py-3 border-b border-gray-100 overflow-x-auto">
                {chatConversations.map((chat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveChatIndex(idx)}
                    className={`px-3 py-2 rounded-lg text-xs text-left shrink-0 transition ${
                      activeChatIndex === idx ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-gray-50 text-gray-600 border border-transparent'
                    }`}
                  >
                    <div className="font-bold">{chat.guestName}</div>
                    <div className="text-[9px] text-gray-400">{chat.segment}</div>
                  </button>
                ))}
              </div>

              {/* Message history */}
              <div className="space-y-3.5 my-4 max-h-[220px] overflow-y-auto pr-2">
                {chatConversations[activeChatIndex].history.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-xl max-w-sm text-xs leading-relaxed ${
                      msg.sender === 'agent' 
                        ? 'bg-[#B04285] text-white rounded-tr-none' 
                        : 'bg-slate-100 text-slate-800 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input message form sender */}
            <div className="flex gap-2 pt-3 border-t border-gray-150">
              <input
                type="text"
                className="flex-1 border border-gray-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                placeholder={`Type fallback response to ${chatConversations[activeChatIndex].guestName}...`}
                value={chatInputValue}
                onChange={(e) => setChatInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat(activeChatIndex)}
              />
              <button
                onClick={() => handleSendChat(activeChatIndex)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3 rounded-lg text-xs transition"
              >
                Send
              </button>
            </div>

          </div>

        </div>
      )}

      {activeTab === 'influencer_db' && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs space-y-6 animate-fade-in">
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-md font-bold text-gray-900">Influencer scout network database</h3>
              <p className="text-xs text-gray-500">Manage creator stay applications, deliverables matching, and estimated media ROI</p>
            </div>

            <button
              onClick={() => setShowScoutForm(!showScoutForm)}
              className="bg-[#B04285] text-white text-xs font-semibold px-4 py-2 rounded-lg"
            >
              Log New Scout
            </button>
          </div>

          {/* Scouting input form */}
          {showScoutForm && (
            <form onSubmit={handleScoutSubmit} className="bg-gray-50 p-5 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Creator Name *</label>
                <input
                  type="text"
                  required
                  className="w-full bg-white border border-gray-200 rounded-lg p-2 text-xs focus:outline-none"
                  placeholder="Jack Splat travel blogger"
                  value={infName}
                  onChange={(e) => setInfName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Creator Platform</label>
                <select
                  className="w-full bg-white border border-gray-200 rounded-lg p-2 text-xs"
                  value={infPlatform}
                  onChange={(e) => setInfPlatform(e.target.value as any)}
                >
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Travel Blog">Travel Blog</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Followers Count</label>
                <input
                  type="number"
                  className="w-full bg-white border border-gray-200 rounded-lg p-2 text-xs"
                  placeholder="75000"
                  value={infFollowers}
                  onChange={(e) => setInfFollowers(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Engagement %</label>
                <input
                  type="text"
                  className="w-full bg-white border border-gray-200 rounded-lg p-2 text-xs"
                  placeholder="4.2"
                  value={infEngagement}
                  onChange={(e) => setInfEngagement(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Stay Dates Proposed</label>
                <input
                  type="text"
                  className="w-full bg-white border border-gray-200 rounded-lg p-2 text-xs"
                  placeholder="Oct 10 - Oct 12"
                  value={infStayDates}
                  onChange={(e) => setInfStayDates(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Stay Deliverables Checklist</label>
                <input
                  type="text"
                  className="w-full bg-white border border-gray-200 rounded-lg p-2 text-xs"
                  placeholder="3 Reels, daily story tags"
                  value={infDeliverables}
                  onChange={(e) => setInfDeliverables(e.target.value)}
                />
              </div>

              <div className="md:col-span-3 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#BDCD30] text-gray-900 border border-[#BDCD30] font-bold px-4 py-2 rounded text-xs cursor-pointer"
                >
                  Confirm Scout Profile
                </button>
              </div>
            </form>
          )}

          {/* Database Grid list cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {influencerCampaigns.map((creator) => (
              <div key={creator.id} className="bg-gray-50 rounded-xl border border-gray-200 p-5 flex flex-col justify-between hover:shadow-md transition">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{creator.name}</h4>
                      <span className="text-[10px] text-gray-400 font-mono tracking-tight capitalize">
                        Platform: {creator.platform}
                      </span>
                    </div>

                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      creator.status === 'completed' ? 'bg-purple-100 text-purple-700' :
                      creator.status === 'staying' ? 'bg-emerald-100 text-emerald-700' :
                      creator.status === 'approved' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-yellow-105 text-yellow-700'
                    }`}>
                      {creator.status}
                    </span>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-100 p-3 text-xs space-y-1.5 font-mono">
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-sans">Reach Followers:</span>
                      <span className="font-bold text-gray-900">{(creator.followers / 1000).toFixed(0)}K Fans</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-sans">Engagement:</span>
                      <span className="font-bold text-[#B04285]">{creator.engagementRate}% Rate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-450 font-sans">Stay Dates:</span>
                      <span className="font-bold text-gray-700">{creator.stayDates}</span>
                    </div>
                  </div>

                  <div className="text-xs space-y-1">
                    <span className="font-bold text-gray-700 block">Deliverables Checklist:</span>
                    <p className="text-gray-600 text-[11px] leading-relaxed italic bg-slate-50 p-2.5 rounded border border-gray-150">
                      "{creator.deliverables}"
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center text-xs">
                  <span className="text-gray-400 font-mono text-[10px]">{creator.roiEstimate}</span>
                  
                  <div className="flex gap-1.5">
                    {creator.status === 'applied' && (
                      <button
                        onClick={() => onUpdateInfluencerStatus(creator.id, 'approved')}
                        className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-2 py-1 rounded text-[10px] font-bold cursor-pointer"
                      >
                        Approve Stay
                      </button>
                    )}
                    {creator.status === 'approved' && (
                      <button
                        onClick={() => onUpdateInfluencerStatus(creator.id, 'staying')}
                        className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-2 py-1 rounded text-[10px] font-bold cursor-pointer"
                      >
                        Check-in Stay
                      </button>
                    )}
                    {creator.status === 'staying' && (
                      <button
                        onClick={() => onUpdateInfluencerStatus(creator.id, 'completed')}
                        className="bg-purple-50 text-purple-700 hover:bg-purple-150 px-2 py-1 rounded text-[10px] font-bold cursor-pointer"
                      >
                        Log Deliverables Completed
                      </button>
                    )}
                    {creator.status === 'completed' && (
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center">
                        <Check className="w-3.5 h-3.5" /> Media Indexed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {activeTab === 'paid_ads' && (
        <div className="space-y-6">
          
          {/* Ad Networks KPIs split layouts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Meta Adwords dashboard */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 font-mono uppercase tracking-widest text-[#B04285]">
                    Meta Advertising Suite
                  </h3>
                  <p className="text-xs text-gray-500">Facebook feed & Instagram slider reels</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  🔥 Active
                </span>
              </div>

              {/* Meta Dials parameters */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <span className="text-[10px] font-mono text-gray-500 block uppercase">Spend Sourced</span>
                  <span className="text-xl font-bold font-mono text-gray-950 mt-1">$4,820</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <span className="text-[10px] font-mono text-gray-500 block uppercase">Return On Ad Spend (ROAS)</span>
                  <span className="text-xl font-bold font-mono text-emerald-600 mt-1 flex items-center gap-0.5">
                    5.2x <TrendingUp className="w-4 h-4" />
                  </span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <span className="text-[10px] font-mono text-gray-500 block uppercase">Conversion rate (bookings)</span>
                  <span className="text-xl font-bold font-mono text-gray-950 mt-1">4.2%</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <span className="text-[10px] font-mono text-gray-500 block uppercase">Avg Cost Per Lead (CPL)</span>
                  <span className="text-xl font-bold font-mono text-slate-800 mt-1">$12.50</span>
                </div>
              </div>
            </div>

            {/* Google adwords dashboard */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 font-mono uppercase tracking-widest text-sky-600">
                    Google Adwords PPC
                  </h3>
                  <p className="text-xs text-gray-500">Local search intent & package landing pages</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  🔥 Active
                </span>
              </div>

              {/* Google Dials parameters */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <span className="text-[10px] font-mono text-gray-500 block uppercase">Spend Sourced</span>
                  <span className="text-xl font-bold font-mono text-gray-950 mt-1">$3,450</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <span className="text-[10px] font-mono text-gray-500 block uppercase">Return On Ad Spend (ROAS)</span>
                  <span className="text-xl font-bold font-mono text-emerald-600 mt-1 flex items-center gap-0.5">
                    4.1x <TrendingUp className="w-4 h-4" />
                  </span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <span className="text-[10px] font-mono text-gray-500 block uppercase">Conversion rate (bookings)</span>
                  <span className="text-xl font-bold font-mono text-gray-950 mt-1">3.8%</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <span className="text-[10px] font-mono text-gray-500 block uppercase">Avg Cost Per Lead (CPL)</span>
                  <span className="text-xl font-bold font-mono text-slate-800 mt-1">$15.20</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
