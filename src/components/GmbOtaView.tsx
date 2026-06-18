import React, { useState } from 'react';
import { 
  Sparkles, Star, MessageSquare, PhoneCall, Compass, Globe, 
  Check, RefreshCw, AlertCircle, TrendingUp, DollarSign, Percent, ShieldCheck 
} from 'lucide-react';
import { GmbReview, Hotel } from '../types';

interface GmbOtaViewProps {
  reviews: GmbReview[];
  onAddReply: (id: string, text: string) => void;
  hotels: Hotel[];
  selectedHotelId: string;
}

export default function GmbOtaView({ reviews, onAddReply, hotels, selectedHotelId }: GmbOtaViewProps) {
  const [activeTab, setActiveTab] = useState<'gmb_reviews' | 'ota_performance'>('gmb_reviews');
  const currentHotel = hotels.find(h => h.id === selectedHotelId) || hotels[0];
  
  // GMB Review reply generator states
  const [generatingForId, setGeneratingForId] = useState<string | null>(null);
  const [customReplyTexts, setCustomReplyTexts] = useState<Record<string, string>>({});
  const [selectedReviewTone, setSelectedReviewTone] = useState('warm, gracious, apologetic if needed');

  // GMB Analytics overview stats
  const gmbCalls = 248;
  const gmbDirections = 762;
  const gmbClicks = 1194;

  // OTA Metrics static calculations
  const otaComparisonData = [
    { name: 'Booking.com', rev: currentHotel.monthlyRevenue * 0.22, occupancy: 18, commission: 15, key: 'booking' },
    { name: 'Expedia', rev: currentHotel.monthlyRevenue * 0.10, occupancy: 8, commission: 18, key: 'expedia' },
    { name: 'Agoda', rev: currentHotel.monthlyRevenue * 0.08, occupancy: 7, commission: 17, key: 'agoda' },
    { name: 'Airbnb / Villas', rev: currentHotel.monthlyRevenue * 0.12, occupancy: 10, commission: 6, key: 'airbnb' },
    { name: 'MakeMyTrip / Goibibo', rev: currentHotel.monthlyRevenue * 0.06, occupancy: 5, commission: 16, key: 'mmt' },
  ];

  const totalOtaRevenue = otaComparisonData.reduce((acc, curr) => acc + curr.rev, 0);
  const totalCommissionLost = otaComparisonData.reduce((acc, curr) => acc + (curr.rev * (curr.commission / 100)), 0);

  const formatCurrency = (v: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);
  };

  // Triggers Gemini API reply generator server route
  const generateGmbReply = async (review: GmbReview) => {
    setGeneratingForId(review.id);
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'reply_generator',
          hotelName: currentHotel.name,
          reviewAuthor: review.author,
          reviewText: review.text,
          starRating: review.rating,
          tone: selectedReviewTone
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Server error');
      }

      setCustomReplyTexts(prev => ({ ...prev, [review.id]: data.output }));
    } catch (err) {
      console.error(err);
      // Handcrafted luxury fallback copy
      const fallbackReply = `Dear ${review.author},\n\nThank you so much for taking the time to share your feedback about your stay at ${currentHotel.name}. We are truly delighted that you enjoyed your experience with us.\n\nOur team strives to deliver absolute world-class boutique hospitality, and your kind words serve as great encouragement. We look forward to welcoming you back for another peaceful wellness retreat soon.\n\nWarmest regards,\n\nGeneral Manager,\n${currentHotel.name}`;
      setCustomReplyTexts(prev => ({ ...prev, [review.id]: fallbackReply }));
    } finally {
      setGeneratingForId(null);
    }
  };

  const handlePublishReply = (reviewId: string) => {
    const textOfReply = customReplyTexts[reviewId];
    if (!textOfReply) return;
    onAddReply(reviewId, textOfReply);
  };

  return (
    <div id="gmb-ota-view" className="space-y-6">
      
      {/* Sub tabs header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Channel Revenue & GMB Management</h1>
          <p className="text-sm text-gray-500">Respond to travelers instantly and manage OTA leakage to maximize direct GOP.</p>
        </div>

        <div className="flex bg-white rounded-lg border border-gray-100 p-1 font-sans text-xs">
          <button
            onClick={() => setActiveTab('gmb_reviews')}
            className={`px-4 py-2 font-bold rounded-lg transition ${activeTab === 'gmb_reviews' ? 'bg-[#B04285] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Google Business Profile
          </button>
          <button
            onClick={() => setActiveTab('ota_performance')}
            className={`px-4 py-2 font-bold rounded-lg transition ${activeTab === 'ota_performance' ? 'bg-[#B04285] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            OTA Leakage Comparative
          </button>
        </div>
      </div>

      {activeTab === 'gmb_reviews' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Reviews list module */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest font-mono">Google Business Reviews Feed</h3>
                <p className="text-xs text-gray-500">Live feed synced with GMB API endpoints</p>
              </div>

              {/* Tone selectors */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <span>AI Tone:</span>
                <select
                  value={selectedReviewTone}
                  onChange={(e) => setSelectedReviewTone(e.target.value)}
                  className="bg-gray-50 border border-gray-150 p-1 rounded font-semibold text-gray-700 text-xs focus:outline-none focus:ring-1 focus:ring-[#B04285]"
                >
                  <option value="warm, gracious, apologizing if issues occurred">Elegant & Gracious</option>
                  <option value="highly professional, brief, transactional beauty">Professional & Direct</option>
                  <option value="approachable, joyous, welcoming, casual">Personal & Joyous</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r.id} className="bg-white rounded-xl border border-gray-150 p-5 shadow-xs space-y-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-pink-50 text-[#B04285] font-bold text-xs flex items-center justify-center font-sans">
                        {r.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-950">{r.author}</h4>
                        <span className="text-[10px] text-gray-400 font-mono">Synced on {r.date}</span>
                      </div>
                    </div>

                    {/* Star ratings */}
                    <div className="flex gap-0.5 text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-gray-700 leading-normal italic bg-slate-50 p-3 rounded-lg">
                    "{r.text}"
                  </p>

                  {/* AI Generated Draft active */}
                  {customReplyTexts[r.id] && !r.replyText && (
                    <div className="bg-rose-950/90 text-white rounded-lg p-4 border border-rose-900/50 space-y-3">
                      <div className="flex items-center justify-between text-[10px] text-pink-300 font-semibold tracking-wide border-b border-rose-900/40 pb-2">
                        <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> PROPOSED GM RESPONSE (AI REPLICATED)</span>
                        <span className="font-mono">GEMINI-3.5-FLASH</span>
                      </div>
                      
                      <textarea
                        rows={5}
                        className="w-full bg-slate-900/60 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 font-sans focus:outline-none focus:ring-1 focus:ring-[#B04285]"
                        value={customReplyTexts[r.id]}
                        onChange={(e) => {
                          const text = e.target.value;
                          setCustomReplyTexts(prev => ({ ...prev, [r.id]: text }));
                        }}
                      />

                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => handlePublishReply(r.id)}
                          className="bg-[#BDCD30] text-gray-900 font-bold px-3 py-1.5 rounded text-xs hover:bg-[#BDCD30] transition flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" /> Publish reply to Google
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Already has response */}
                  {r.replyText ? (
                    <div className="bg-emerald-50/70 border border-emerald-100 rounded-lg p-4 space-y-1.5 ml-4">
                      <div className="flex justify-between items-center text-[10px] text-emerald-800 font-semibold uppercase font-mono">
                        <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Published Live Response</span>
                        <span>{r.repliedDate || 'Just Now'}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                        "{r.replyText}"
                      </p>
                    </div>
                  ) : (
                    !customReplyTexts[r.id] && (
                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => generateGmbReply(r)}
                          disabled={generatingForId === r.id}
                          className="bg-gray-900 text-[#BDCD30] hover:bg-slate-800 text-[10px] font-bold px-3 py-1.5 rounded transition flex items-center gap-1"
                        >
                          {generatingForId === r.id ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              Drafting with Gemini AI...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3.5 h-3.5" />
                              Generate reply with Gemini AI
                            </>
                          )}
                        </button>
                      </div>
                    )
                  )}

                </div>
              ))}
            </div>
          </div>

          {/* GMB Analytics parameters sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs space-y-5">
              <div>
                <h3 className="text-sm font-bold text-gray-900">GMB Impression Analytics</h3>
                <p className="text-xs text-gray-500">Monthly organic listing metrics</p>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-red-50/50 rounded-lg border border-red-105/50 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-red-500" />
                    <span className="text-gray-600">Local Call Clicks</span>
                  </div>
                  <span className="font-bold font-mono text-gray-900">{gmbCalls} Calls</span>
                </div>

                <div className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-105/50 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-indigo-500" />
                    <span className="text-gray-600">Directions Inquiries</span>
                  </div>
                  <span className="font-bold font-mono text-gray-900">{gmbDirections} Maps</span>
                </div>

                <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-105/50 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-500" />
                    <span className="text-gray-600">Website Conversions</span>
                  </div>
                  <span className="font-bold font-mono text-gray-900">{gmbClicks} Sessions</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 p-3 rounded-lg font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  <span>+18.4% Impression reach since last month</span>
                </div>
              </div>
            </div>

            {/* AI Assistant summary tip */}
            <div className="bg-gradient-to-br from-pink-500 to-purple-800 text-white p-5 rounded-xl space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#BDCD30]">Bespoke Channel Strategist Tip</h4>
              <p className="text-[11px] leading-relaxed opacity-90">
                Google rates hotels with active 100% review response rates higher in local bento-map searches. Use our Gemini-powered response replicator to resolve guest issues within 4 hours.
              </p>
            </div>
          </div>

        </div>
      )}

      {activeTab === 'ota_performance' && (
        <div className="space-y-6">
          {/* Main cards statistics */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider">Total OTA Occupancy Contribution</p>
              <h3 className="text-3xl font-black text-gray-950 font-mono mt-1">48%</h3>
              <p className="text-xs text-gray-500 mt-2">remaining 52% sourced via direct direct channels</p>
            </div>
            
            <div>
              <p className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider">Total Revenue Sourced via OTAs</p>
              <h3 className="text-3xl font-black text-[#B04285] font-mono mt-1">{formatCurrency(totalOtaRevenue)}</h3>
              <p className="text-xs text-gray-500 mt-2">commission value represents leakage margins</p>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider">Estimated Revenue Leakage (comms)</p>
              <h3 className="text-3xl font-black text-red-600 font-mono mt-1">{formatCurrency(totalCommissionLost)}</h3>
              <p className="text-xs text-gray-500 mt-2">average OTA commission: 14.4% this month</p>
            </div>
          </div>

          {/* Comparative grid list table */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs space-y-4">
            <div>
              <h3 className="text-md font-bold text-gray-900">Platform Performance Comparison matrix</h3>
              <p className="text-xs text-gray-500">Benchmark ADR and fee structures across major intermediaries</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-xs text-gray-400 font-mono uppercase">
                    <th className="pb-3">Online OTA Intermediary</th>
                    <th className="pb-3 font-mono">Channel Revenue Sourced</th>
                    <th className="pb-3 text-center">Occupancy contribution</th>
                    <th className="pb-3 text-center">Commission Fee</th>
                    <th className="pb-3 text-right">Commission Loss</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {otaComparisonData.map((ota) => {
                    const lossValue = ota.rev * (ota.commission / 100);
                    return (
                      <tr key={ota.key} className="text-xs hover:bg-gray-50 transition">
                        <td className="py-4 font-bold text-gray-900 flex items-center gap-2">
                          <Globe className="w-4 h-4 text-sky-500" />
                          {ota.name}
                        </td>
                        <td className="py-4 font-mono font-semibold text-gray-950">
                          {formatCurrency(ota.rev)}
                        </td>
                        <td className="py-4 text-center font-mono">
                          {ota.occupancy}% Rooms Checked
                        </td>
                        <td className="py-4 text-center font-bold font-mono text-red-600">
                          {ota.commission}% Fee
                        </td>
                        <td className="py-4 text-right font-bold font-mono text-gray-900">
                          {formatCurrency(lossValue)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
