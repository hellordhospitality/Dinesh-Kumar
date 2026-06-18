import React, { useState } from 'react';
import { Hotel, Lead } from '../types';
import { 
  DollarSign, Percent, TrendingUp, Users, Calendar, ArrowUpRight, 
  ArrowDownRight, Building2, MapPin, Sparkles, MessageSquare, PhoneCall, Globe 
} from 'lucide-react';

interface DashboardViewProps {
  hotels: Hotel[];
  selectedHotelId: string;
  onSelectHotel: (id: string) => void;
  leads: Lead[];
}

export default function DashboardView({ hotels, selectedHotelId, onSelectHotel, leads }: DashboardViewProps) {
  const currentHotel = hotels.find(h => h.id === selectedHotelId) || hotels[0];
  
  // Quick dynamic targets based on hotel stats
  const totalLeads = leads.length;
  const activeLeads = leads.filter(l => l.stage !== 'confirmed' && l.stage !== 'lost').length;
  const directBookingRatio = 42; // Percentage of direct bookings

  // SVG Chart Animation helper state
  const [hoveredDataPoint, setHoveredDataPoint] = useState<{ month: string; val: number; index: number } | null>(null);

  // Booking details distribution
  const bookingSources = [
    { label: 'Direct Site', val: currentHotel.monthlyRevenue * 0.42, pct: 42, color: 'bg-[#B04285]', textClr: 'text-[#B04285]' },
    { label: 'WhatsApp Inquiries', val: currentHotel.monthlyRevenue * 0.18, pct: 18, color: 'bg-[#BDCD30]', textClr: 'text-[#BDCD30]' },
    { label: 'Booking.com', val: currentHotel.monthlyRevenue * 0.22, pct: 22, color: 'bg-blue-500', textClr: 'text-blue-500' },
    { label: 'Expedia / Agoda', val: currentHotel.monthlyRevenue * 0.18, pct: 18, color: 'bg-indigo-500', textClr: 'text-indigo-500' },
  ];

  // Static high accuracy sample monthly revenue points for beautiful custom SVG graph mapping
  const monthlyTimeline = [
    { month: 'Jan', revenue: Math.round(currentHotel.monthlyRevenue * 0.85), occupancy: currentHotel.occupancy - 8 },
    { month: 'Feb', revenue: Math.round(currentHotel.monthlyRevenue * 0.90), occupancy: currentHotel.occupancy - 4 },
    { month: 'Mar', revenue: Math.round(currentHotel.monthlyRevenue * 1.05), occupancy: currentHotel.occupancy + 2 },
    { month: 'Apr', revenue: Math.round(currentHotel.monthlyRevenue * 0.95), occupancy: currentHotel.occupancy - 2 },
    { month: 'May', revenue: Math.round(currentHotel.monthlyRevenue * 1.15), occupancy: currentHotel.occupancy + 7 },
    { month: 'Jun', revenue: Math.round(currentHotel.monthlyRevenue * 1.25), occupancy: currentHotel.occupancy + 12 },
  ];

  // Format currencies
  const formatCurrency = (v: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);
  };

  return (
    <div id="dashboard-view" className="space-y-6">
      {/* Top Banner & selector */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 font-mono tracking-widest uppercase mb-1">
            <Building2 className="w-3.5 h-3.5 text-[#B04285]" />
            Hotel Selection
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            {currentHotel.name}
            <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {currentHotel.location}
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="hotel-selector" className="text-xs font-semibold text-gray-600 block sm:inline">Active Property:</label>
          <select
            id="hotel-selector"
            value={selectedHotelId}
            onChange={(e) => onSelectHotel(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-1 focus:ring-[#B04285] focus:outline-none p-2.5 font-medium min-w-[200px]"
          >
            {hotels.map(h => (
              <option key={h.id} value={h.id}>{h.name} ({h.type})</option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#B04285]"></div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2 font-mono">{formatCurrency(currentHotel.monthlyRevenue)}</h3>
            </div>
            <div className="p-2.5 bg-pink-50 text-[#B04285] rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 text-xs font-medium">
            <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +14.2%
            </span>
            <span className="text-gray-400">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-lime-500"></div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Occupancy Rate</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2 font-mono">{currentHotel.occupancy}%</h3>
            </div>
            <div className="p-2.5 bg-lime-50 text-lime-700 rounded-lg">
              <Percent className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 text-xs font-medium">
            <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +4.8%
            </span>
            <span className="text-gray-400">vs local market avg</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">ADR (Avg Daily Rate)</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2 font-mono">{formatCurrency(currentHotel.adr)}</h3>
            </div>
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 text-xs font-medium">
            <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +8.5%
            </span>
            <span className="text-gray-400">direct booking tier lift</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#BDCD30]"></div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">RevPAR (Yield KPI)</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2 font-mono">{formatCurrency(currentHotel.revpar)}</h3>
            </div>
            <div className="p-2.5 bg-yellow-50 text-[#BDCD30] rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 text-xs font-medium">
            <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +12.1%
            </span>
            <span className="text-gray-400">YoY Growth trend</span>
          </div>
        </div>
      </div>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SVG Live Interactive Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-md font-bold text-gray-900">Revenue & Occupancy Growth Timeline</h3>
              <p className="text-xs text-gray-500">6-Month historical billing and guest check-in trajectory</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#B04285] inline-block"></span>Revenue</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#BDCD30] inline-block"></span>Occupancy %</span>
            </div>
          </div>

          {/* Render beautifully styled premium SVG */}
          <div className="relative h-64 w-full">
            <svg viewBox="0 0 500 200" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B04285" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#B04285" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="occGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#BDCD30" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#BDCD30" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3" />

              {/* Area path for Revenue */}
              <path
                d={`M 10 180 
                    L 10 ${180 - (monthlyTimeline[0].revenue / 1000)} 
                    L 100 ${180 - (monthlyTimeline[1].revenue / 1000)} 
                    L 190 ${180 - (monthlyTimeline[2].revenue / 1000)} 
                    L 280 ${180 - (monthlyTimeline[3].revenue / 1000)} 
                    L 370 ${180 - (monthlyTimeline[4].revenue / 1000)} 
                    L 460 ${180 - (monthlyTimeline[5].revenue / 1000)} 
                    L 460 180 Z`}
                fill="url(#revGrad)"
              />

              {/* Line path for Revenue */}
              <path
                d={`M 10 ${180 - (monthlyTimeline[0].revenue / 1000)} 
                    L 100 ${180 - (monthlyTimeline[1].revenue / 1000)} 
                    L 190 ${180 - (monthlyTimeline[2].revenue / 1000)} 
                    L 280 ${180 - (monthlyTimeline[3].revenue / 1000)} 
                    L 370 ${180 - (monthlyTimeline[4].revenue / 1000)} 
                    L 460 ${180 - (monthlyTimeline[5].revenue / 1000)}`}
                fill="none"
                stroke="#B04285"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Line path for Occupancy */}
              <path
                d={`M 10 ${180 - (monthlyTimeline[0].occupancy * 1.5)} 
                    L 100 ${180 - (monthlyTimeline[1].occupancy * 1.5)} 
                    L 190 ${180 - (monthlyTimeline[2].occupancy * 1.5)} 
                    L 280 ${180 - (monthlyTimeline[3].occupancy * 1.5)} 
                    L 370 ${180 - (monthlyTimeline[4].occupancy * 1.5)} 
                    L 460 ${180 - (monthlyTimeline[5].occupancy * 1.5)}`}
                fill="none"
                stroke="#BDCD30"
                strokeWidth="2"
                strokeDasharray="4"
                strokeLinecap="round"
              />

              {/* Circle nodes for Interaction */}
              {monthlyTimeline.map((pt, idx) => {
                const cx = 10 + idx * 90;
                const cyRev = 180 - (pt.revenue / 1000);
                const cyOcc = 180 - (pt.occupancy * 1.5);
                return (
                  <g key={idx} className="cursor-pointer">
                    <circle
                      cx={cx}
                      cy={cyRev}
                      r="5"
                      fill="#B04285"
                      stroke="#white"
                      strokeWidth="2"
                      onMouseEnter={() => setHoveredDataPoint({ month: pt.month, val: pt.revenue, index: idx })}
                      onMouseLeave={() => setHoveredDataPoint(null)}
                    />
                    <circle
                      cx={cx}
                      cy={cyOcc}
                      r="4"
                      fill="#BDCD30"
                      stroke="#white"
                      strokeWidth="1.5"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Hover tooltip for custom SVG points */}
            {hoveredDataPoint && (
              <div 
                className="absolute bg-gray-900 text-white text-xs p-2.5 rounded shadow-lg pointer-events-none z-10 font-mono"
                style={{ 
                  left: `${hoveredDataPoint.index * 16}%`, 
                  top: '10%' 
                }}
              >
                <div className="font-bold text-pink-300">{hoveredDataPoint.month} Forecast</div>
                <div>Revenue: {formatCurrency(hoveredDataPoint.val)}</div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-6 text-center text-xs text-gray-500 font-medium font-mono pt-2 border-t border-gray-100">
            {monthlyTimeline.map((pt, idx) => <div key={idx}>{pt.month}</div>)}
          </div>
        </div>

        {/* Booking Source Share Pie/Progress breakdown */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs">
          <h3 className="text-md font-bold text-gray-900 mb-1">Booking Revenue Distribution</h3>
          <p className="text-xs text-gray-500 mb-5">Direct conversions vs external OTA travel platforms</p>

          <div className="space-y-4">
            {bookingSources.map((bs, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-gray-700">
                  <span className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${bs.color}`}></span>
                    {bs.label}
                  </span>
                  <span className="font-mono">{formatCurrency(bs.val)} ({bs.pct}%)</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${bs.color} transition-all duration-1000 rounded-full`}
                    style={{ width: `${bs.pct}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick direct metrics strategy box */}
          <div className="mt-6 p-4 bg-pink-50/50 rounded-xl border border-pink-100/50 flex gap-3">
            <Sparkles className="w-5 h-5 text-[#B04285] shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-[#B04285]">DIRECT DISPATCH POTENTIAL</h4>
              <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">
                By adjusting Google Business & WhatsApp parameters, you have saved <span className="font-bold text-[#B04285]">$4,850</span> in commission leakage this month.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mini-Inquiry CRM Status and recent performance indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Performance highlights column */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs lg:col-span-1">
          <h3 className="text-md font-bold text-gray-900 mb-3 flex items-center gap-1.5">
            <Users className="text-[#B04285] w-4 h-4" /> Guest Database Highlights
          </h3>
          <p className="text-xs text-gray-500 mb-4">Core profiles synced via local channel managers</p>
          
          <div className="divide-y divide-gray-100">
            <div className="py-2.5 flex justify-between text-xs">
              <span className="text-gray-600">Total Synced CRM Guests</span>
              <span className="font-bold font-mono">1,480 Profiles</span>
            </div>
            <div className="py-2.5 flex justify-between text-xs">
              <span className="text-gray-600">Repeat Loyalist Guests</span>
              <span className="font-bold font-mono text-emerald-600">32% Rate</span>
            </div>
            <div className="py-2.5 flex justify-between text-xs">
              <span className="text-gray-600">Average Stay Nights</span>
              <span className="font-bold font-mono">3.4 Nights</span>
            </div>
            <div className="py-2.5 flex justify-between text-xs">
              <span className="text-gray-600">Active Campaign Conversions</span>
              <span className="font-bold font-mono">189 bookings</span>
            </div>
          </div>
        </div>

        {/* Live leads pipeline snapshot */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-bold text-gray-900">CRM Leads Pipelines (Inbound Streams)</h3>
            <span className="text-xs text-[#B04285] font-semibold bg-pink-50 px-2 py-1 rounded">
              {activeLeads} active requests
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 font-mono">
                  <th className="pb-2">GUEST</th>
                  <th className="pb-2">SOURCE</th>
                  <th className="pb-2">STAY SPEC</th>
                  <th className="pb-2">VALUATION</th>
                  <th className="pb-2">STAGE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {leads.slice(0, 4).map((l) => (
                  <tr key={l.id} className="text-xs hover:bg-gray-50/50 transition">
                    <td className="py-3 font-semibold text-gray-900">
                      <div>{l.guestName}</div>
                      <div className="text-[10px] text-gray-400 font-normal">{l.email}</div>
                    </td>
                    <td className="py-3">
                      <span className="flex items-center gap-1">
                        {l.source === 'WhatsApp Direct' && <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />}
                        {l.source === 'Website' && <Globe className="w-3.5 h-3.5 text-blue-500" />}
                        {l.source !== 'WhatsApp Direct' && l.source !== 'Website' && <PhoneCall className="w-3.5 h-3.5 text-gray-400" />}
                        {l.source}
                      </span>
                    </td>
                    <td className="py-3 font-mono">
                      {l.nights} nights ({l.roomType})
                    </td>
                    <td className="py-3 font-bold font-mono text-gray-950">
                      {formatCurrency(l.amount)}
                    </td>
                    <td className="py-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        l.stage === 'new' ? 'bg-blue-100 text-blue-700' :
                        l.stage === 'proposal_sent' ? 'bg-amber-100 text-amber-700' :
                        l.stage === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {l.stage.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
