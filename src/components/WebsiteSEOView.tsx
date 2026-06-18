import React, { useState } from 'react';
import { 
  Globe, Sparkles, ShieldCheck, AlertCircle, RefreshCw, Layers, Check, 
  ArrowUpRight, ArrowDownRight, Eye, Play, Search, Code, Layout, ExternalLink 
} from 'lucide-react';
import { KeywordRank, AuditResult } from '../types';

interface WebsiteSEOViewProps {
  keywords: KeywordRank[];
  onAddKeyword: (term: string) => void;
  onDeleteKeyword: (id: string) => void;
}

export default function WebsiteSEOView({ keywords, onAddKeyword, onDeleteKeyword }: WebsiteSEOViewProps) {
  const [activeTab, setActiveTab] = useState<'audit' | 'builder' | 'seo_rankings'>('audit');

  // Website Audit states
  const [auditUrl, setAuditUrl] = useState('https://samudra-ubud-villas.com');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

  // Landing Page Builder states
  const [pageTemplate, setPageTemplate] = useState<'classic' | 'nature' | 'urban'>('classic');
  const [customTitle, setCustomTitle] = useState('Escape to Absolute Luxury & Wellness');
  const [customSubtitle, setCustomSubtitle] = useState('Indulge in hand-tailored organic dinners, spa treatments, and stunning sunset infinity views.');
  const [ctaText, setCtaText] = useState('Claim Secret 20% Direct Offer');
  const [includeLeadForm, setIncludeLeadForm] = useState(true);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null);

  // Keyword tracker inputs
  const [newKeywordInput, setNewKeywordInput] = useState('');

  const triggerWebsiteAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditUrl) return;
    setIsAuditing(true);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: auditUrl }),
      });
      const data = await response.json();
      if (response.ok) {
        setAuditResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAuditing(false);
    }
  };

  const handleDeployLandingPage = () => {
    setIsDeploying(true);
    setDeployedUrl(null);
    setTimeout(() => {
      setIsDeploying(false);
      setDeployedUrl(`https://direct-escape.rdhospitality.com/offers-${pageTemplate}-${Math.floor(Math.random() * 1000)}`);
    }, 1800);
  };

  const handleKeywordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeywordInput.trim()) return;
    onAddKeyword(newKeywordInput.trim());
    setNewKeywordInput('');
  };

  return (
    <div id="website-seo-view" className="space-y-6">
      
      {/* Sub menu selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Website Audit & Organic SEO</h1>
          <p className="text-sm text-gray-500">Benchmark your site conversions, track key phrases, and launch campaign landing pages.</p>
        </div>

        <div className="flex bg-white rounded-lg border border-gray-100 p-1 font-sans text-xs">
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 font-bold rounded-lg transition ${activeTab === 'audit' ? 'bg-[#B04285] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Website Audit Tool
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={`px-4 py-2 font-bold rounded-lg transition ${activeTab === 'builder' ? 'bg-[#B04285] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Sleek LP Builder
          </button>
          <button
            onClick={() => setActiveTab('seo_rankings')}
            className={`px-4 py-2 font-bold rounded-lg transition ${activeTab === 'seo_rankings' ? 'bg-[#B04285] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Keywords Rankings
          </button>
        </div>
      </div>

      {activeTab === 'audit' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-1.5 font-mono">
              <Globe className="w-4 h-4 text-[#B04285]" /> BENCHMARK DIRECT CONVERSION HEALTH
            </h3>

            <form onSubmit={triggerWebsiteAudit} className="flex gap-2">
              <input
                type="url"
                required
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-3 py-2.5 text-xs focus:ring-1 focus:ring-[#B04285] focus:bg-white focus:outline-none focus:text-black font-semibold"
                placeholder="Enter your hotel homepage URL (e.g., https://my-luxury-villa.com)"
                value={auditUrl}
                onChange={(e) => setAuditUrl(e.target.value)}
              />
              <button
                type="submit"
                disabled={isAuditing}
                className="bg-[#B04285] text-white px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-xs hover:bg-opacity-95 cursor-pointer"
              >
                {isAuditing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Auditing Parameters...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Trigger Live Audit
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Audit Results displaying dynamic computed elements */}
          {auditResult ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
              
              {/* Performance dials gauges */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs space-y-6">
                <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center justify-between">
                  <span>Audit Scores</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 font-mono font-bold px-2 py-0.5 rounded">PASSED</span>
                </h3>

                <div className="grid grid-cols-3 gap-2 text-center pt-2">
                  <div>
                    <div className="text-2xl font-black font-mono text-emerald-600">{auditResult.seoScore}%</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase mt-1">SEO Score</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black font-mono text-purple-600">{auditResult.speedScore}%</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase mt-1">Page Speed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black font-mono text-blue-600">{auditResult.mobileScore}%</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase mt-1">Mobile Friendly</div>
                  </div>
                </div>

                {/* Meta tags view display */}
                <div className="space-y-3 pt-4 border-t border-gray-100 text-xs">
                  <div className="font-bold text-gray-800 flex items-center gap-1.5">
                    <Code className="w-4 h-4 text-gray-400" /> Parsed Meta Parameters
                  </div>
                  <div className="bg-slate-50 p-3 rounded font-mono text-[10px] space-y-2 text-gray-600 overflow-x-auto">
                    <div>
                      <span className="font-bold text-purple-700">&lt;title&gt;</span> {auditResult.metaTags.title}
                    </div>
                    <div>
                      <span className="font-bold text-purple-700">&lt;meta description&gt;</span> {auditResult.metaTags.description}
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold py-1 border-t border-slate-200 mt-1">
                      <ShieldCheck className="w-4 h-4" /> Schema markup: {auditResult.metaTags.schemaValid ? 'Valid Validated' : 'No Schema Found'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Critical fixes and improvements tracker */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs lg:col-span-2 space-y-4">
                <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">
                  Actionable Optimization Required ({auditResult.issues.length} fixes)
                </h3>

                <div className="space-y-3.5">
                  {auditResult.issues.map((issue, index) => (
                    <div key={index} className="flex gap-3 bg-red-50/40 p-4 rounded-xl border border-red-100/50">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold uppercase font-mono tracking-wider bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                            {issue.severity}
                          </span>
                          <span className="text-xs font-bold text-gray-800">{issue.category} Parameter Check</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 leading-normal">
                          {issue.message}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {auditResult.issues.length === 0 && (
                    <div className="text-center py-10 text-xs text-gray-400">
                      ✨ Great! Clear checklist. No critical bottlenecks detected.
                    </div>
                  )}
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-xs">
              <Globe className="w-12 h-12 text-[#B04285]/20 mx-auto mb-3 animate-pulse" />
              <p className="text-sm font-bold text-gray-700">Audit Desk is Idle</p>
              <p className="text-xs text-gray-400 mt-1">Enter your endpoint URL above and benchmark performance parameters instantly.</p>
            </div>
          )}
        </div>
      )}

      {/* Landing Page and CTA block builder */}
      {activeTab === 'builder' && (
        <div id="landing-page-builder" className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          
          {/* Controls parameters */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs lg:col-span-2 space-y-5">
            <div>
              <h3 className="text-md font-bold text-gray-900 flex items-center gap-1.5">
                <Layout className="w-4 h-4 text-[#B04285]" /> Campaign LP Configurator
              </h3>
              <p className="text-xs text-gray-500">Simulate direct discount landing cards with lead form embeds.</p>
            </div>

            {/* Template select */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-gray-600">Select Design Style</span>
              <div className="grid grid-cols-3 gap-2">
                {(['classic', 'nature', 'urban'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setPageTemplate(t)}
                    className={`py-1.5 rounded-lg text-xs font-bold border transition capitalize ${
                      pageTemplate === t ? 'bg-[#B04285] text-white border-[#B04285]' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {t} Luxury
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3.5 pt-3 border-t border-gray-100">
              <div>
                <label htmlFor="comp-title-input" className="block text-xs font-semibold text-gray-600 mb-1">Headline Promotion *</label>
                <input
                  id="comp-title-input"
                  type="text"
                  required
                  className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#B04285] focus:outline-none font-bold"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="comp-sub-textarea" className="block text-xs font-semibold text-gray-600 mb-1">Supporting Copy *</label>
                <textarea
                  id="comp-sub-textarea"
                  rows={3}
                  required
                  className="w-full border border-gray-200 text-xs rounded-lg p-2 focus:ring-1 focus:ring-[#B04285] focus:outline-none"
                  value={customSubtitle}
                  onChange={(e) => setCustomSubtitle(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="comp-cta-input" className="block text-xs font-semibold text-gray-600 mb-1">Booking Button CTA *</label>
                <input
                  id="comp-cta-input"
                  type="text"
                  required
                  className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#B04285] font-bold text-gray-900"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 py-1">
                <input
                  id="include-form"
                  type="checkbox"
                  className="rounded border-gray-300 text-[#B04285] focus:ring-[#B04285]"
                  checked={includeLeadForm}
                  onChange={(e) => setIncludeLeadForm(e.target.checked)}
                />
                <label htmlFor="include-form" className="text-xs font-semibold text-gray-600 select-none">Embed Quick CRM lead Capture Form</label>
              </div>
            </div>

            <button
              onClick={handleDeployLandingPage}
              disabled={isDeploying}
              className="w-full bg-[#B04285] text-white py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer hover:bg-opacity-95"
            >
              {isDeploying ? (
                <>
                  <RefreshCw className="animate-spin w-4 h-4" />
                  Generating Web Pages CDN...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Publish To CDN
                </>
              )}
            </button>
          </div>

          {/* Real-time Layout visual preview card */}
          <div className="lg:col-span-3 bg-gray-950 p-6 rounded-xl flex flex-col justify-between overflow-hidden relative border border-gray-800">
            {/* Outer header info wrapper */}
            <div className="flex justify-between items-center pb-3 border-b border-gray-800 text-[10px] text-gray-500 font-mono">
              <span>🖥️ LIVE SCREEN LAYOUT PREVIEW</span>
              <span className="font-bold text-[#BDCD30] uppercase">
                {pageTemplate} Theme
              </span>
            </div>

            {/* Simulated Live viewport */}
            <div className={`my-6 rounded-lg overflow-hidden border border-gray-800 shadow-xl text-center p-8 transition-all duration-300 ${
              pageTemplate === 'nature' ? 'bg-gradient-to-b from-emerald-950 to-slate-900 text-slate-100' :
              pageTemplate === 'urban' ? 'bg-gradient-to-b from-gray-900 to-slate-950 text-slate-100' :
              'bg-gradient-to-b from-rose-950 via-slate-900 to-pink-950 text-gray-100'
            }`}>
              {/* Fake web header */}
              <div className="flex justify-between items-center mb-6 text-[10px] opacity-70">
                <span className="font-bold tracking-widest font-mono uppercase">✨ RD COCONUT SHORES</span>
                <span className="border border-slate-700/60 px-2 py-0.5 rounded">Menu Triple Bar</span>
              </div>

              {/* Formulated copy values live */}
              <div className="space-y-4">
                <h1 className="text-base md:text-xl font-bold font-sans tracking-tight leading-tight">
                  {customTitle || 'Your Title Here'}
                </h1>
                <p className="text-xs opacity-80 leading-relaxed max-w-md mx-auto font-sans">
                  {customSubtitle || 'Your Supporting value statement here.'}
                </p>
              </div>

              {/* Form block live simulation */}
              {includeLeadForm && (
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl max-w-sm mx-auto mt-6 space-y-2 text-left">
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div>
                      <span className="block opacity-70 mb-0.5">Primary Guest Name</span>
                      <input type="text" disabled className="w-full bg-white/10 border border-white/10 rounded px-2 py-1 text-white text-[10px]" placeholder="Charlotte" />
                    </div>
                    <div>
                      <span className="block opacity-70 mb-0.5">Primary Email ID</span>
                      <input type="email" disabled className="w-full bg-white/10 border border-white/10 rounded px-2 py-1 text-white text-[10px]" placeholder="charlotte@bronte.com" />
                    </div>
                  </div>
                  <div className="text-[10px]">
                    <span className="block opacity-70 mb-0.5">Comments</span>
                    <input type="text" disabled className="w-full bg-white/10 border border-white/10 rounded px-2 py-1 text-white text-[10px]" placeholder="Dietary preference" />
                  </div>
                </div>
              )}

              {/* Call to action button */}
              <div className="mt-8">
                <button
                  type="button"
                  className="bg-[#BDCD30] text-gray-900 hover:text-black hover:scale-101 font-black shadow-lg shadow-lime-500/10 px-8 py-3 rounded-full text-xs uppercase tracking-wider transition-all duration-300"
                >
                  {ctaText || 'Claim Direct Deal'}
                </button>
              </div>
            </div>

            {/* Deployed link notification */}
            {deployedUrl ? (
              <div className="bg-emerald-950/40 border border-emerald-800 p-3 rounded-lg flex items-center justify-between text-xs animate-fade-in">
                <div className="flex items-center gap-2 text-emerald-300">
                  <Check className="w-4 h-4" />
                  <span>Landing Page Deployed to CDN:</span>
                  <a href={deployedUrl} target="_blank" rel="noreferrer" className="underline font-bold font-mono tracking-tight text-[#BDCD30] flex items-center gap-0.5 hover:text-white">
                    Link <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ) : (
              <p className="text-[10px] text-gray-500 text-center font-mono">
                Click CDN Publish to produce web endpoints live instantly.
              </p>
            )}

          </div>

        </div>
      )}

      {/* SEO ranking positions keywords tracking panel */}
      {activeTab === 'seo_rankings' && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-md font-bold text-gray-900">Bespoke Phrase Search Ranking Dashboard</h3>
              <p className="text-xs text-gray-500">Track Goolge/Bing positions against competitors</p>
            </div>

            {/* Quick adding keywords */}
            <form onSubmit={handleKeywordSubmit} className="flex gap-2">
              <input
                type="text"
                required
                className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-[#B04285] focus:outline-none"
                placeholder="ubud waterfall villas"
                value={newKeywordInput}
                onChange={(e) => setNewKeywordInput(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#B04285] text-white font-bold px-3 py-1.5 rounded-lg text-xs"
              >
                Track Keyword
              </button>
            </form>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 font-mono uppercase pb-2">
                  <th className="pb-3">Search Phrase</th>
                  <th className="pb-3">Active Google Position</th>
                  <th className="pb-3">Previous Rank</th>
                  <th className="pb-3">Monthly Volume</th>
                  <th className="pb-3">Primary Competitor Rank</th>
                  <th className="pb-3">Status Position</th>
                  <th className="pb-3 text-right">Settings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {keywords.map((kw) => (
                  <tr key={kw.id} className="text-xs hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 font-bold text-gray-900 flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-gray-400" />
                      {kw.term}
                    </td>
                    <td className="py-3.5 font-semibold font-mono text-gray-950">
                      Position #{kw.rank}
                    </td>
                    <td className="py-3.5 font-mono text-gray-500">
                      #{kw.prevRank}
                    </td>
                    <td className="py-3.5 font-mono text-gray-700">
                      {kw.searchVolume.toLocaleString()}/mo
                    </td>
                    <td className="py-3.5 font-mono text-gray-900 font-medium">
                      Position #{kw.competitorRank}
                    </td>
                    <td className="py-3.5">
                      <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        kw.status === 'up' ? 'bg-emerald-100 text-emerald-800' :
                        kw.status === 'down' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {kw.status === 'up' && <ArrowUpRight className="w-3 h-3" />}
                        {kw.status === 'down' && <ArrowDownRight className="w-3 h-3" />}
                        {kw.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => onDeleteKeyword(kw.id)}
                        className="text-gray-300 hover:text-red-500 text-[11px] transition duration-150 cursor-pointer"
                      >
                        Stop Tracking
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
