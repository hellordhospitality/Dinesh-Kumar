import React, { useState } from 'react';
import { 
  Sparkles, FileText, Download, Check, ShieldCheck, 
  CreditCard, RefreshCw, Layers, ToggleLeft, ToggleRight, 
  Image, Palette, User, Building2, HelpCircle 
} from 'lucide-react';
import { Hotel, Integration } from '../types';

interface ReportsViewProps {
  hotels: Hotel[];
  selectedHotelId: string;
  integrations: Integration[];
  onToggleIntegration: (id: string) => void;
}

export default function ReportsView({ hotels, selectedHotelId, integrations, onToggleIntegration }: ReportsViewProps) {
  const [activeTab, setActiveTab] = useState<'reporting' | 'subscriptions' | 'integrations'>('reporting');
  const currentHotel = hotels.find(h => h.id === selectedHotelId) || hotels[0];

  // Report Generator parameters
  const [reportMonth, setReportMonth] = useState('June 2026');
  const [agencyName, setAgencyName] = useState('RD Hospitality Marketing Agency');
  const [primaryBrandColor, setPrimaryBrandColor] = useState('#B04285');
  const [includeCrmLeads, setIncludeCrmLeads] = useState(true);
  const [includeSocialKpis, setIncludeSocialKpis] = useState(true);
  const [includeOtaData, setIncludeOtaData] = useState(true);

  // Status triggers
  const [isCompilingReport, setIsCompilingReport] = useState(false);
  const [compiledReportData, setCompiledReportData] = useState<any | null>(null);
  const [isExporting, setIsExporting] = useState<string | null>(null);

  // Subscription plan parameters
  const [selectedPlanId, setSelectedPlanId] = useState('growth');
  const [paymentGateway, setPaymentGateway] = useState<'stripe' | 'razorpay'>('stripe');
  const [processingSubscription, setProcessingSubscription] = useState(false);
  const [subscriptionLoggedMsg, setSubscriptionLoggedMsg] = useState<string | null>(null);

  const subscriptionPlans = [
    {
      id: 'starter',
      name: 'Starter Tier',
      price: '$99/mo',
      niche: '1 Boutique Hotel / Homestay',
      features: ['Core CRM pipeline', 'Google Business responder', 'Monthly basic PDF exports'],
      status: 'Available'
    },
    {
      id: 'growth',
      name: 'Growth Engine',
      price: '$249/mo',
      niche: 'Up to 5 hotels / Resorts',
      features: ['Full CRM + WhatsApp automation', 'Gemini AI Copywriter', 'White-label Reports', 'PMS Integration'],
      status: 'Active Plan'
    },
    {
      id: 'agency',
      name: 'Marketing Agency Suite',
      price: '$599/mo',
      niche: 'Unlimited hotels & teams',
      features: ['All Starter & Growth tools', 'Priority API bandwidth', 'Google Ads ROAS dashboard', 'Stripe/Razorpay automation billing'],
      status: 'Available'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Custom',
      price: 'Custom',
      niche: 'Global hotel chains & custom setups',
      features: ['All Agency resources', 'Dedicated success rep', 'Bespoke custom ML model parameters', 'Self-hosted data logs'],
      status: 'Contact Us'
    }
  ];

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCompilingReport(true);
    setCompiledReportData(null);

    setTimeout(() => {
      setIsCompilingReport(false);
      setCompiledReportData({
        title: `${currentHotel.name} - Performance Summary`,
        month: reportMonth,
        agency: agencyName,
        metrics: {
          revenue: currentHotel.monthlyRevenue,
          occupancy: currentHotel.occupancy,
          adr: currentHotel.adr,
          revpar: currentHotel.revpar,
          leadsGenerated: 148,
          conversionRate: '28.2%',
          commissionSaved: 4850
        }
      });
    }, 1800);
  };

  const triggerExportSimulator = (type: 'pdf' | 'excel') => {
    setIsExporting(type);
    setTimeout(() => {
      setIsExporting(null);
      alert(`Report successfully parsed and exported as RD-Marketing-${currentHotel.name.replace(/\s+/g, '-')}-${type.toUpperCase()}-v4.1`);
    }, 1500);
  };

  const handleProcessSubscription = (planId: string) => {
    setProcessingSubscription(true);
    setSubscriptionLoggedMsg(null);
    setTimeout(() => {
      setProcessingSubscription(false);
      setSelectedPlanId(planId);
      setSubscriptionLoggedMsg(`Successfully subscribed via ${paymentGateway === 'stripe' ? 'Stripe Checkout API' : 'Razorpay Secure Webhook'}. Invoice dispatched to owner inbox.`);
    }, 1500);
  };

  const formatCurrency = (v: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);
  };

  return (
    <div id="reports-view-container" className="space-y-6">
      
      {/* Sub headers navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight font-sans">Reports, Billing & Core Links</h1>
          <p className="text-sm text-gray-500 font-sans">Customize client monthly data cards, modify hotel SaaS billing plans, and connect channel PMS sync.</p>
        </div>

        <div className="flex bg-white rounded-lg border border-gray-100 p-1 font-sans text-xs">
          <button
            onClick={() => setActiveTab('reporting')}
            className={`px-4 py-2 font-bold rounded-lg transition ${activeTab === 'reporting' ? 'bg-[#B04285] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            White Label Builder
          </button>
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`px-4 py-2 font-bold rounded-lg transition ${activeTab === 'subscriptions' ? 'bg-[#B04285] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            SaaS Plan Billing
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`px-4 py-2 font-bold rounded-lg transition ${activeTab === 'integrations' ? 'bg-[#B04285] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Core Integrations
          </button>
        </div>
      </div>

      {activeTab === 'reporting' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          
          {/* Whitelabel settings panels */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs lg:col-span-2 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-gray-950 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-[#B04285]" /> Client Report customizer
              </h3>
              <p className="text-xs text-gray-400 font-sans">Brand reports with your agency logos and custom accents.</p>
            </div>

            <form onSubmit={handleGenerateReport} className="space-y-4 pt-1.5 font-sans">
              <div>
                <label htmlFor="agency-title" className="block text-xs font-semibold text-gray-600 mb-1">Agency Brand Name *</label>
                <input
                  id="agency-title"
                  type="text"
                  required
                  className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#B04285] focus:outline-none"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="brand-hex" className="block text-xs font-semibold text-gray-600 mb-1">Accent Brand Hex</label>
                  <input
                    id="brand-hex"
                    type="color"
                    className="w-full h-8 border border-gray-200 rounded-lg p-0.5 focus:outline-none"
                    value={primaryBrandColor}
                    onChange={(e) => setPrimaryBrandColor(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="report-cycle" className="block text-xs font-semibold text-gray-600 mb-1">Reporting Cycle</label>
                  <select
                    id="report-cycle"
                    className="w-full border border-gray-200 rounded-lg p-2 text-xs bg-white focus:ring-[#B04285]"
                    value={reportMonth}
                    onChange={(e) => setReportMonth(e.target.value)}
                  >
                    <option value="June 2026">June 2026 (Active month)</option>
                    <option value="May 2026">May 2026 (Past month)</option>
                    <option value="Q2 2026 Forecast">Q2 2026 Forecast summary</option>
                  </select>
                </div>
              </div>

              {/* Inclusions switches */}
              <div className="space-y-2 border-t border-gray-100 pt-3">
                <span className="text-xs font-bold text-gray-700 block">Report parameters inclusions:</span>
                
                <div className="flex items-center gap-2 py-0.5">
                  <input
                    id="chk-crm"
                    type="checkbox"
                    className="rounded border-gray-300 text-[#B04285]"
                    checked={includeCrmLeads}
                    onChange={(e) => setIncludeCrmLeads(e.target.checked)}
                  />
                  <label htmlFor="chk-crm" className="text-xs text-gray-600 font-medium select-none">Include CRM leads, pipeline & guest valuation stats</label>
                </div>

                <div className="flex items-center gap-2 py-0.5">
                  <input
                    id="chk-social"
                    type="checkbox"
                    className="rounded border-gray-300 text-[#B04285]"
                    checked={includeSocialKpis}
                    onChange={(e) => setIncludeSocialKpis(e.target.checked)}
                  />
                  <label htmlFor="chk-social" className="text-xs text-gray-600 font-medium select-none">Include Social scheduling, impressions & GMB actions</label>
                </div>

                <div className="flex items-center gap-2 py-0.5">
                  <input
                    id="chk-ota"
                    type="checkbox"
                    className="rounded border-gray-300 text-[#B04285]"
                    checked={includeOtaData}
                    onChange={(e) => setIncludeOtaData(e.target.checked)}
                  />
                  <label htmlFor="chk-ota" className="text-xs text-gray-600 font-medium select-none">Include OTA performance tracking and commission losses</label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isCompilingReport}
                className="w-full bg-[#B04285] text-white py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer hover:bg-opacity-95"
              >
                {isCompilingReport ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Compiling secure sheets...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 cursor-pointer" />
                    Compile Custom Report Sheet
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Compiled report view preview simulator */}
          <div className="bg-slate-900 rounded-xl p-6 lg:col-span-3 flex flex-col justify-between border border-gray-800 text-gray-200 min-h-[420px] font-sans">
            
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-800 text-[10px] text-gray-500 font-mono">
                <span>📑 BRANDED EXPORT WORKSPACE PREVIEW</span>
                <span className="font-bold text-[#BDCD30] uppercase">White-Label active</span>
              </div>

              {compiledReportData ? (
                <div className="mt-5 space-y-6 animate-fade-in">
                  
                  {/* Agency simulated header banner */}
                  <div className="p-4 bg-slate-950 rounded-lg border-l-4 flex justify-between items-center" style={{ borderLeftColor: primaryBrandColor }}>
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 font-mono">{compiledReportData.agency.toUpperCase()}</h4>
                      <h2 className="text-sm font-bold text-slate-100 mt-1">{compiledReportData.title}</h2>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-pink-300 font-bold px-2.5 py-1 rounded font-mono">
                      {compiledReportData.month} Summary
                    </span>
                  </div>

                  {/* Core KPI metrics cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-1">
                    <div className="bg-slate-900/40 p-3 rounded border border-gray-800">
                      <span className="text-[9px] text-gray-500 block uppercase font-mono">Monthly Revenue</span>
                      <span className="text-sm font-bold font-mono text-gray-100 mt-1">{formatCurrency(compiledReportData.metrics.revenue)}</span>
                    </div>
                    <div className="bg-slate-900/40 p-3 rounded border border-gray-800">
                      <span className="text-[9px] text-gray-500 block uppercase font-mono">Occupancy</span>
                      <span className="text-sm font-bold font-mono text-emerald-500 mt-1">{compiledReportData.metrics.occupancy}%</span>
                    </div>
                    <div className="bg-slate-900/40 p-3 rounded border border-gray-800">
                      <span className="text-[9px] text-gray-500 block uppercase font-mono">ADR Yield</span>
                      <span className="text-sm font-bold font-mono text-gray-100 mt-1">{formatCurrency(compiledReportData.metrics.adr)}</span>
                    </div>
                    <div className="bg-slate-900/40 p-3 rounded border border-gray-800">
                      <span className="text-[9px] text-gray-500 block uppercase font-mono">Commission Saved</span>
                      <span className="text-sm font-bold font-mono text-[#BDCD30] mt-1">{formatCurrency(compiledReportData.metrics.commissionSaved)}</span>
                    </div>
                  </div>

                  {/* Inclusions reports summaries checklist lists */}
                  <div className="space-y-2 border-t border-gray-800 pt-4 text-xs font-sans">
                    <p className="font-bold text-slate-400">Section details compiled:</p>
                    
                    <div className="space-y-1.5 text-[11px] text-gray-400">
                      {includeCrmLeads && <p className="flex items-center gap-1.5">✅ Sourced leads database, pipeline forecast trajectories, guest histories.</p>}
                      {includeSocialKpis && <p className="flex items-center gap-1.5">✅ Instagram scheduled drafts logs, directions metrics, GMB reviews responses.</p>}
                      {includeOtaData && <p className="flex items-center gap-1.5">✅ Sourced OTA platform revenues comparison sheet, booking.com leakage fees.</p>}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="text-center py-20 text-slate-500">
                  <FileText className="w-12 h-12 text-[#B04285]/20 mx-auto mb-3 animate-pulse" />
                  <p className="text-sm font-semibold text-slate-400">No active client reports loaded</p>
                  <p className="text-xs text-slate-600 mt-1">Configure parameters on the left and compile white-label sheets to unlock instant downloads.</p>
                </div>
              )}
            </div>

            {/* Action buttons download */}
            {compiledReportData && (
              <div className="flex gap-3 pt-4 border-t border-gray-800 mt-6 animate-fade-in text-xs font-bold font-sans">
                <button
                  onClick={() => triggerExportSimulator('pdf')}
                  disabled={isExporting !== null}
                  className="flex-1 bg-white hover:bg-opacity-90 text-gray-950 py-2 rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                >
                  {isExporting === 'pdf' ? <RefreshCw className="animate-spin w-4 h-4 text-slate-800" /> : <Download className="w-4 h-4 text-[#B04285]" />}
                  PDF Document format
                </button>
                <button
                  onClick={() => triggerExportSimulator('excel')}
                  disabled={isExporting !== null}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                >
                  {isExporting === 'excel' ? <RefreshCw className="animate-spin w-4 h-4 text-slate-100" /> : <Download className="w-4 h-4 text-[#BDCD30]" />}
                  Excel / CSV Spreadsheet
                </button>
              </div>
            )}

          </div>

        </div>
      )}

      {activeTab === 'subscriptions' && (
        <div className="space-y-6">
          
          {/* Billing parameters configuration */}
          <div className="bg-white p-5 rounded-full border border-gray-105 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between px-6 gap-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#B04285]" />
              <span className="text-xs font-bold text-gray-600">Select active payment processor:</span>
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="stripe-gw-radio" className="flex items-center gap-1 cursor-pointer text-xs font-bold">
                <input
                  id="stripe-gw-radio"
                  type="radio"
                  name="processor_select"
                  checked={paymentGateway === 'stripe'}
                  onChange={() => setPaymentGateway('stripe')}
                />
                Stripe Payments Checkout
              </label>
              
              <label htmlFor="razorpay-gw-radio" className="flex items-center gap-1 cursor-pointer text-xs font-bold">
                <input
                  id="razorpay-gw-radio"
                  type="radio"
                  name="processor_select"
                  checked={paymentGateway === 'razorpay'}
                  onChange={() => setPaymentGateway('razorpay')}
                />
                Razorpay India Webhook
              </label>
            </div>
          </div>

          {/* Table plans list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subscriptionPlans.map((plan) => {
              const worksAsCurrent = selectedPlanId === plan.id;
              
              return (
                <div key={plan.id} className={`bg-white rounded-xl border p-5 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative ${
                  worksAsCurrent ? 'border-2 border-[#B04285] ring-4 ring-pink-50/50 scale-102' : 'border-gray-200'
                }`}>
                  
                  {worksAsCurrent && (
                    <div className="absolute top-0 right-4 transform -translate-y-1/2">
                      <span className="bg-[#B04285] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-xs">
                        ACTIVE PLAN
                      </span>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 font-sans">{plan.name}</h4>
                      <p className="text-[10px] text-gray-400 mt-1 font-sans">{plan.niche}</p>
                    </div>

                    <div className="py-2">
                      <span className="text-2xl font-black font-mono text-gray-950">{plan.price}</span>
                      {plan.price !== 'Custom' && <span className="text-xs text-gray-500 font-mono"> / billed monthly</span>}
                    </div>

                    <ul className="space-y-2.5 text-xs text-slate-600 border-t border-gray-100 pt-4 font-sans">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 leading-normal">
                          <Check className="w-3.5 h-3.5 text-[#BDCD30] shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleProcessSubscription(plan.id)}
                      disabled={worksAsCurrent || processingSubscription}
                      className={`w-full py-2 rounded-lg text-xs font-bold font-sans transition cursor-pointer ${
                        worksAsCurrent 
                          ? 'bg-slate-100 text-slate-500 cursor-default' 
                          : 'bg-gray-900 text-white hover:bg-[#B04285]'
                      }`}
                    >
                      {processingSubscription ? 'Updating subscription API...' : worksAsCurrent ? 'Default Config Active' : `Subscribe via ${paymentGateway === 'stripe' ? 'Stripe' : 'Razorpay'}`}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Subscription confirmation status logs */}
          {subscriptionLoggedMsg && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800 animate-fade-in">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{subscriptionLoggedMsg}</span>
            </div>
          )}

        </div>
      )}

      {activeTab === 'integrations' && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs space-y-6">
          <div>
            <h3 className="text-md font-bold text-gray-900">Hospitality Property management & CRM system integrations</h3>
            <p className="text-xs text-gray-500">Sync rates, reservations, and contacts instantly. Zero-knowledge authentication keys stored securely.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {integrations.map((item) => {
              return (
                <div key={item.id} className="bg-gray-50 rounded-xl border border-gray-200 p-5 flex flex-col justify-between hover:shadow-md transition">
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase font-bold text-gray-400 font-mono tracking-wider">
                        {item.category.replace('_', ' ')}
                      </span>
                      
                      <span className={`w-2.5 h-2.5 rounded-full ${item.connected ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                    </div>

                    <h4 className="text-sm font-bold text-gray-900">{item.name}</h4>
                    <p className="text-xs text-gray-500 leading-normal font-sans">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-gray-200 flex justify-between items-center text-xs">
                    <span className="text-[10px] text-gray-400 font-mono">
                      {item.connected ? 'Connected' : 'Disconnected'}
                    </span>

                    <button
                      onClick={() => onToggleIntegration(item.id)}
                      className={`text-[10px] font-bold px-2.5 py-1.5 rounded transition font-sans cursor-pointer ${
                        item.connected ? 'bg-red-50 text-red-700 hover:bg-red-100' : 'bg-[#B04285] text-white hover:bg-opacity-95'
                      }`}
                    >
                      {item.connected ? 'Disconnect' : 'Connect Channel'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
