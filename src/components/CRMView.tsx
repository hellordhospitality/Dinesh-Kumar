import React, { useState } from 'react';
import { Lead, GuestProfile, LeadStage } from '../types';
import { 
  Users, UserPlus, Search, ArrowRight, DollarSign, Phone, Mail, 
  Tag, Calendar, Plus, ChevronRight, RefreshCw, Star, Trash2 
} from 'lucide-react';

interface CRMViewProps {
  leads: Lead[];
  guests: GuestProfile[];
  onAddLead: (lead: Omit<Lead, 'id' | 'date'>) => void;
  onUpdateLeadStage: (id: string, stage: LeadStage) => void;
  onDeleteLead: (id: string) => void;
}

export default function CRMView({ leads, guests, onAddLead, onUpdateLeadStage, onDeleteLead }: CRMViewProps) {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'guests' | 'all_leads'>('pipeline');
  const [searchQuery, setSearchQuery] = useState('');
  
  // New inquiry modal state or toggle form
  const [showAddForm, setShowAddForm] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [source, setSource] = useState<Lead['source']>('Website');
  const [amount, setAmount] = useState('1200');
  const [nights, setNights] = useState('3');
  const [roomType, setRoomType] = useState('Ocean Suite');
  const [notes, setNotes] = useState('');
  const [assignedTo, setAssignedTo] = useState('Rohan Kumar');

  const pipelineStages: { id: LeadStage; label: string; color: string; hoverBorder: string }[] = [
    { id: 'new', label: 'New Inquiry', color: 'border-t-4 border-t-sky-400 bg-sky-50/40', hoverBorder: 'hover:-translate-y-1' },
    { id: 'contacted', label: 'Contacted', color: 'border-t-4 border-t-indigo-400 bg-indigo-50/40', hoverBorder: 'hover:-translate-y-1' },
    { id: 'proposal_sent', label: 'Proposal Sent', color: 'border-t-4 border-t-amber-400 bg-amber-50/40', hoverBorder: 'hover:-translate-y-1' },
    { id: 'negotiation', label: 'Negotiation', color: 'border-t-4 border-t-purple-400 bg-purple-50/40', hoverBorder: 'hover:-translate-y-1' },
    { id: 'confirmed', label: 'Confirmed (Paid)', color: 'border-t-4 border-t-emerald-500 bg-emerald-50/40', hoverBorder: 'hover:-translate-y-1' },
    { id: 'lost', label: 'Lost / Canceled', color: 'border-t-4 border-t-red-400 bg-red-50/40', hoverBorder: 'hover:-translate-y-1' },
  ];

  // Filter lists based on lookup
  const filteredGuests = guests.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.phone.includes(searchQuery)
  );

  const filteredLeads = leads.filter(l =>
    l.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.roomType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !email || !phone) return;
    
    onAddLead({
      guestName,
      email,
      phone,
      source,
      amount: Number(amount) || 500,
      stage: 'new',
      nights: Number(nights) || 2,
      roomType,
      notes,
      assignedTo
    });

    // Reset Form
    setGuestName('');
    setEmail('');
    setPhone('');
    setAmount('1200');
    setNights('3');
    setRoomType('Ocean Suite');
    setNotes('');
    setShowAddForm(false);
  };

  return (
    <div id="crm-view-container" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Hotel CRM & Guest Pipeline</h1>
          <p className="text-sm text-gray-500">Track bespoke bookings from inquiry to keys in hand.</p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-[#B04285] text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-opacity-95 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <UserPlus className="w-4 h-4" />
            {showAddForm ? "Close Form" : "Process New Inquiry"}
          </button>
        </div>
      </div>

      {/* Conditional Inquiry Form Block */}
      {showAddForm && (
        <form onSubmit={handleCreateLeadSubmit} className="bg-white rounded-xl border border-pink-100 p-6 shadow-md transition-all duration-300">
          <h3 className="text-sm font-bold text-[#B04285] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Capture New Inbound Booking Inquiry
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="guest-name-input" className="block text-xs font-semibold text-gray-600 mb-1">Guest Primary Name *</label>
              <input
                id="guest-name-input"
                type="text"
                required
                className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#B04285] focus:outline-none"
                placeholder="Charlotte Bronte"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="guest-email-input" className="block text-xs font-semibold text-gray-600 mb-1">Email Address *</label>
              <input
                id="guest-email-input"
                type="email"
                required
                className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#B04285] focus:outline-none"
                placeholder="charlotte@bronte.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="guest-phone-input" className="block text-xs font-semibold text-gray-600 mb-1">WhatsApp / Contact Phone *</label>
              <input
                id="guest-phone-input"
                type="tel"
                required
                className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#B04285] focus:outline-none"
                placeholder="+1 (415) 390-1980"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="lead-source-select" className="block text-xs font-semibold text-gray-600 mb-1">Lead Capture Source</label>
              <select
                id="lead-source-select"
                className="w-full border border-gray-200 rounded-lg p-2 text-xs bg-white focus:ring-1 focus:ring-[#B04285]"
                value={source}
                onChange={(e) => setSource(e.target.value as Lead['source'])}
              >
                <option value="Website">Website Form Submission</option>
                <option value="WhatsApp Direct">WhatsApp Direct Chat</option>
                <option value="Direct Call">Direct Call Desk</option>
                <option value="Instagram DM">Instagram DM Campaign</option>
                <option value="GMB Profile">GMB Quick Call</option>
              </select>
            </div>
            <div>
              <label htmlFor="package-valuation-input" className="block text-xs font-semibold text-gray-600 mb-1">Package Valuation (USD)</label>
              <input
                id="package-valuation-input"
                type="number"
                className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#B04285]"
                placeholder="1500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="nights-count-input" className="block text-xs font-semibold text-gray-600 mb-1">Planned Stay (Nights)</label>
              <input
                id="nights-count-input"
                type="number"
                className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#B04285]"
                placeholder="3"
                value={nights}
                onChange={(e) => setNights(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="room-category-select" className="block text-xs font-semibold text-gray-600 mb-1">Selected Room Category</label>
              <select
                id="room-category-select"
                className="w-full border border-gray-200 rounded-lg p-2 text-xs bg-white focus:ring-1 focus:ring-[#B04285]"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option value="Presidential Suite">Presidential Suite</option>
                <option value="Ocean Suite">Deluxe Ocean Suite</option>
                <option value="Garden Plunge Pool Villa">Garden Plunge Pool Villa</option>
                <option value="Rustic Safari Camp">Rustic Safari Luxury Camp</option>
                <option value="Standard Executive">Standard Executive Penthouse</option>
              </select>
            </div>
            <div>
              <label htmlFor="assigned-manager-select" className="block text-xs font-semibold text-gray-600 mb-1">Assigned Sales Agent</label>
              <select
                id="assigned-manager-select"
                className="w-full border border-gray-200 rounded-lg p-2 text-xs bg-white focus:ring-1 focus:ring-[#B04285]"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              >
                <option value="Rohan Kumar">Rohan Kumar (Senior Conversion)</option>
                <option value="Anita Desai">Anita Desai (Luxury Relations)</option>
                <option value="Michael Scott">Michael Scott (Regional Sales)</option>
              </select>
            </div>
            <div>
              <label htmlFor="inquiry-notes-input" className="block text-xs font-semibold text-gray-600 mb-1">Inquiry Context / Notes (Optional)</label>
              <input
                id="inquiry-notes-input"
                type="text"
                className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#B04285]"
                placeholder="Needs gluten-free breakfast, anniversary setup"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="bg-[#BDCD30] text-gray-900 border border-[#BDCD30] hover:text-black hover:bg-opacity-95 font-bold px-5 py-2 rounded-lg text-xs tracking-wide cursor-pointer"
            >
              Confirm and Log Pipeline
            </button>
          </div>
        </form>
      )}

      {/* Navigation Sub-Tabs & Filtering */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => { setActiveTab('pipeline'); setSearchQuery(''); }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
              activeTab === 'pipeline' ? 'bg-[#B04285] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            Sales Pipeline board
          </button>
          <button
            onClick={() => { setActiveTab('all_leads'); setSearchQuery(''); }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
              activeTab === 'all_leads' ? 'bg-[#B04285] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            Leads Directory
          </button>
          <button
            onClick={() => { setActiveTab('guests'); setSearchQuery(''); }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
              activeTab === 'guests' ? 'bg-[#B04285] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            Synced Guest Profiles
          </button>
        </div>

        {/* Search layout */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#B04285] focus:bg-white"
            placeholder={activeTab === 'guests' ? "Search profiles by name or tier..." : "Search leads by room, source..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'pipeline' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start overflow-x-auto pb-4">
          {pipelineStages.map((stage) => {
            const stageLeads = leads.filter(l => l.stage === stage.id);
            const totalVal = stageLeads.reduce((acc, current) => acc + current.amount, 0);

            return (
              <div 
                key={stage.id} 
                className={`rounded-xl border border-gray-100 p-3 flex flex-col min-h-[500px] ${stage.color}`}
              >
                {/* Header info */}
                <div className="mb-3 flex justify-between items-center">
                  <h4 className="text-xs font-bold text-gray-800 tracking-tight">{stage.label}</h4>
                  <span className="text-[10px] bg-white font-bold font-mono px-2 py-0.5 rounded-full border border-gray-200">
                    {stageLeads.length}
                  </span>
                </div>
                
                {/* Stage aggregate money */}
                <div className="text-[11px] font-mono text-gray-500 font-medium pb-2 border-b border-gray-100 mb-3 flex items-center justify-between">
                  <span>Forecast Value:</span>
                  <span className="font-bold text-gray-900">${totalVal.toLocaleString()}</span>
                </div>

                {/* Sub Cards List */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {stageLeads.map((lead) => (
                    <div 
                      key={lead.id} 
                      className={`bg-white rounded-lg border border-gray-100 p-3 shadow-xs hover:shadow-md transition-all duration-200 ${stage.hoverBorder} group relative`}
                    >
                      {/* Interactive Drag triggers simulated */}
                      <div className="flex justify-between items-start gap-1">
                        <span className="text-xs font-bold text-gray-900 leading-tight group-hover:text-[#B04285]">
                          {lead.guestName}
                        </span>
                        
                        <div className="flex gap-1">
                          <button 
                            onClick={() => onDeleteLead(lead.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                            title="Remove Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Stay info */}
                      <p className="text-[10px] text-gray-500 mt-1 font-mono">
                        {lead.nights} nights | {lead.roomType}
                      </p>

                      <div className="mt-2 text-xs font-bold text-gray-900 flex justify-between items-center">
                        <span className="font-mono text-[#B04285]">${lead.amount}</span>
                        <span className="text-[9px] bg-slate-50 text-gray-500 px-1.5 py-0.5 rounded uppercase font-medium">
                          {lead.source}
                        </span>
                      </div>

                      {/* Notes line */}
                      {lead.notes && (
                        <div className="text-[9px] text-gray-400 mt-2 bg-gray-50 p-1 rounded-sm line-clamp-2">
                          "{lead.notes}"
                        </div>
                      )}

                      {/* Fast Mover controls */}
                      <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[9px] text-gray-400 font-mono">Rep: {lead.assignedTo.split(' ')[0]}</span>
                        
                        <div className="flex gap-1">
                          {pipelineStages.filter(s => s.id !== lead.stage).slice(0, 2).map((s) => (
                            <button
                              key={s.id}
                              onClick={() => onUpdateLeadStage(lead.id, s.id)}
                              className="text-[9px] bg-gray-100 text-gray-700 hover:bg-[#B04285] hover:text-white px-1.5 py-0.5 rounded font-medium transition duration-150 cursor-pointer"
                              title={`Move to ${s.label}`}
                            >
                              {s.id === 'confirmed' ? 'Confirm' : s.id === 'lost' ? 'Lost' : s.label.split(' ')[0]}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {stageLeads.length === 0 && (
                    <div className="text-center py-8 text-[11px] text-gray-400 border border-dashed border-gray-200 rounded-lg">
                      No leads present
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'all_leads' && (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono">
                  <th className="p-4">Guest Name</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4 font-mono">Valuation</th>
                  <th className="p-4">Requirements</th>
                  <th className="p-4">Rep Assigned</th>
                  <th className="p-4">Pipeline Stage</th>
                  <th className="p-4 text-center">Update Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="text-xs hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-gray-900">{lead.guestName}</div>
                      <div className="text-[10px] text-gray-400">Captured on {lead.date}</div>
                    </td>
                    <td className="p-4 space-y-0.5">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        {lead.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        {lead.phone}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold font-mono text-gray-900">${lead.amount}</div>
                      <div className="text-[10px] text-gray-500 font-mono">{lead.nights} nights ({lead.roomType})</div>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-700 max-w-xs truncate" title={lead.notes}>
                        {lead.notes || <span className="text-gray-400 italic">No notes captured</span>}
                      </div>
                      <span className="inline-block mt-1 bg-pink-50 text-[#B04285] px-2 py-0.5 rounded text-[10px] font-semibold">
                        {lead.source}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-gray-700">
                      {lead.assignedTo}
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        lead.stage === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                        lead.stage === 'lost' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {lead.stage.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden text-[11px]">
                        <select
                          value={lead.stage}
                          onChange={(e) => onUpdateLeadStage(lead.id, e.target.value as LeadStage)}
                          className="bg-white border-0 py-1 px-2 text-xs focus:ring-0 cursor-pointer"
                        >
                          <option value="new">New Inquiry</option>
                          <option value="contacted">Contacted</option>
                          <option value="proposal_sent">Proposal Sent</option>
                          <option value="negotiation">Negotiation</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="lost">Lost</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'guests' && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-md font-bold text-gray-900">Registered Synced Guest Database</h3>
              <p className="text-xs text-gray-500 text-slate-500">Global hotel CRM guest log history</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500">Elite Tier Count:</span>
              <span className="text-xs font-bold bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg">
                🏆 {guests.filter(g => g.tier === 'Elite').length} Active VIPs
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGuests.map((guest) => (
              <div 
                key={guest.id} 
                className="bg-gray-50/50 rounded-xl border border-gray-200 p-5 flex flex-col justify-between hover:shadow-md transition duration-200 group relative"
              >
                {/* Tier indicator */}
                <div className="absolute top-4 right-4">
                  <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg ${
                    guest.tier === 'Elite' ? 'bg-orange-100 text-orange-700' :
                    guest.tier === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                    guest.tier === 'Silver' ? 'bg-slate-100 text-slate-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {guest.tier} Member
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-pink-100 text-[#B04285] font-bold text-xs flex items-center justify-center font-sans">
                      {guest.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{guest.name}</h4>
                      <p className="text-[10px] text-gray-400">Guest ID: #{guest.id}</p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-600 space-y-1 pt-1">
                    <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gray-400" /> {guest.email}</p>
                    <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-400" /> {guest.phone}</p>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-100 p-3 text-xs space-y-1.5 mt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Stays History:</span>
                      <span className="font-bold font-mono text-gray-900">{guest.stayCount} times</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Spend:</span>
                      <span className="font-bold font-mono text-emerald-600">${guest.totalSpend.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Check-out:</span>
                      <span className="font-bold font-mono text-gray-700">{guest.lastStay}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200/60 text-xs">
                  <span className="font-semibold text-gray-700">Preferences:</span>
                  <p className="text-gray-600 mt-1 italic text-[11px] leading-relaxed">
                    "{guest.preferences}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
