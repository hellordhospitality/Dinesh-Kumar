import React, { useState } from 'react';
import { Sparkles, Copy, Calendar, AlertCircle, RefreshCw, Send, Check } from 'lucide-react';
import { Hotel } from '../types';

interface AIGeneratorViewProps {
  hotels: Hotel[];
  selectedHotelId: string;
}

export default function AIGeneratorView({ hotels, selectedHotelId }: AIGeneratorViewProps) {
  const currentHotel = hotels.find(h => h.id === selectedHotelId) || hotels[0];
  
  // Form parameters
  const [contentType, setContentType] = useState<'social' | 'blog' | 'gmb' | 'email' | 'whatsapp'>('social');
  const [hotelType, setHotelType] = useState<string>('Luxury Resort');
  const [topic, setTopic] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [platform, setPlatform] = useState<string>('instagram');
  const [tone, setTone] = useState<string>('luxurious and alluring');
  
  // Status states
  const [isLoading, setIsLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  // Pre-filled triggers to make it incredibly satisfying to use right out of the box
  const getPlaceholderText = () => {
    switch (contentType) {
      case 'social': return 'Sunset dinner by the infinity pavilion with complimentary hand-shaken passion fruit spritzers.';
      case 'blog': return 'The Ultimate 3-Day Wellness Itinerary for couples staying in Bali.';
      case 'gmb': return 'Our brand new organic farm-to-table lunch garden launch next Thursday.';
      case 'email': return 'Exclusive early spring package offering 20% discount on villa suites with spa butler included.';
      case 'whatsapp': return 'Urgent alert: Only 2 Deluxe villas left for this monsoon weekend at custom rates.';
    }
  };

  const generateAIContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorStatus(null);
    setCopied(false);

    const actualTopic = topic || getPlaceholderText();

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: contentType,
          hotelName: currentHotel.name,
          hotelType: hotelType,
          topic: actualTopic,
          keyword: keyword,
          platform: platform,
          tone: tone
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Server error generating response.');
      }

      setGeneratedText(data.output);
    } catch (err: any) {
      console.error(err);
      setErrorStatus(err.message || 'Check Server Console Logs');
      
      // Seed a beautifully written custom fallback so the app stays functional even without an immediate API key
      const fallbackTitle = contentType === 'social' ? '✨ INSPIRING CHRONICLES' : '📜 HOSPITALITY ARCHETYPE';
      setGeneratedText(`[DEMO PREVIEW - No active secret GEMINI_API_KEY detected in Settings]

Here is a handcrafted copy formulated by our local system matching your tone:

🌟 Topic: ${actualTopic || 'Bespoke hospitality experience'}
🏷️ Hotel: ${currentHotel.name} (${hotelType})
🎨 Tone: ${tone}

---

"Escape to the pristine sanctuary of ${currentHotel.name}. Here, luxury isn't merely observed—it is experienced. Let our dedicated team arrange signature sunset treatments curated precisely for your rejuvenation. 

✨ Special package include complimentary organic garden breakfast when booking direct this week. 

🔗 Select the link in our bio to book your keys to paradise today. ${keyword ? '#' + keyword.replace(/\s+/g, '') : '#luxurystay #travelguide #boutiqueresort'}"`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="ai-generator-view" className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      
      {/* Parameter Selection panel */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm lg:col-span-2 space-y-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#B04285]" />
            Hotel AI Copywriter
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Formulate high-conversion social copy, blogs, and notifications powered by Gemini 3.5.
          </p>
        </div>

        {/* Categories toggler */}
        <div className="grid grid-cols-5 gap-1.5 bg-gray-50 rounded-lg p-1">
          {(['social', 'blog', 'gmb', 'email', 'whatsapp'] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setContentType(t); setErrorStatus(null); }}
              className={`text-[10px] font-bold py-2 rounded-md capitalize transition ${
                contentType === t ? 'bg-[#B04285] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Options details fields Form */}
        <form onSubmit={generateAIContent} className="space-y-4">
          <div>
            <label htmlFor="target-hotel" className="block text-xs font-semibold text-gray-600 mb-1">Target Hotel</label>
            <input
              id="target-hotel"
              type="text"
              readOnly
              className="w-full bg-gray-50 border border-gray-100 rounded-lg p-2 text-xs font-semibold text-gray-700 capitalize focus:outline-none cursor-not-allowed"
              value={currentHotel.name}
            />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="hotel-niche" className="block text-xs font-semibold text-gray-600 mb-1">Hotel Niche Type</label>
              <input
                id="hotel-niche"
                type="text"
                className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#B04285] focus:outline-none"
                placeholder="E.g. Eco Lodge, Luxury Resort"
                value={hotelType}
                onChange={(e) => setHotelType(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="brand-tone" className="block text-xs font-semibold text-gray-600 mb-1">Tone of Voice</label>
              <input
                id="brand-tone"
                type="text"
                className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#B04285] focus:outline-none"
                placeholder="E.g. adventurous, sophisticated"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              />
            </div>
          </div>

          {contentType === 'social' && (
            <div>
              <label htmlFor="social-platform" className="block text-xs font-semibold text-gray-600 mb-1">Target Social Network</label>
              <select
                id="social-platform"
                className="w-full border border-gray-200 rounded-lg p-2 text-xs bg-white focus:ring-[#B04285]"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                <option value="instagram">Instagram Grid & Reels</option>
                <option value="facebook">Facebook Feed Update</option>
                <option value="pinterest">Pinterest Rich Pin</option>
                <option value="linkedin">LinkedIn Professional Story</option>
              </select>
            </div>
          )}

          <div>
            <label htmlFor="topic-focus" className="block text-xs font-semibold text-gray-600 mb-1">Topic / Promotion Focus Context</label>
            <textarea
              id="topic-focus"
              rows={3}
              className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#B04285] focus:outline-none"
              placeholder={getPlaceholderText()}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <p className="text-[10px] text-gray-400 mt-1">Leave empty to use recommended luxury package placeholder.</p>
          </div>

          <div>
            <label htmlFor="focus-keywords" className="block text-xs font-semibold text-gray-600 mb-1">SEO Keywords / Target Hashtags</label>
            <input
              id="focus-keywords"
              type="text"
              className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#B04285] focus:outline-none"
              placeholder="E.g. balivacation, travelwellness"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#B04285] text-white py-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer hover:bg-opacity-95"
          >
            {isLoading ? (
              <>
                <RefreshCw className="animate-spin w-4 h-4" />
                Formulating Creative Draft...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 cursor-pointer" />
                Generate Copywriting Sequence
              </>
            )}
          </button>
        </form>
      </div>

      {/* Output Panel visualizer */}
      <div className="bg-[#1F2937] text-gray-100 rounded-xl p-6 shadow-sm lg:col-span-3 flex flex-col justify-between min-h-[450px]">
        
        {/* Header toolbar */}
        <div>
          <div className="flex justify-between items-center pb-4 border-b border-gray-800">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#BDCD30] font-semibold">
              ✨ Graphene AI Model Engine Output
            </span>
            
            {generatedText && (
              <button
                onClick={copyToClipboard}
                className="text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Copy generated output"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Text'}
              </button>
            )}
          </div>

          {/* Core formulated output viewport */}
          <div className="mt-6 font-sans">
            {isLoading ? (
              <div className="space-y-4 py-8">
                <div className="h-4 bg-slate-800 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-slate-800 rounded animate-pulse w-5/6"></div>
                <div className="h-4 bg-slate-800 rounded animate-pulse w-2/3"></div>
                <div className="h-4 bg-slate-800 rounded animate-pulse w-full"></div>
                <p className="text-xs text-slate-400 font-mono italic text-center animate-bounce pt-4">
                  "Consulting hotel data, formatting headers, structuring SEO parameters..."
                </p>
              </div>
            ) : generatedText ? (
              <div className="whitespace-pre-line text-slate-200 text-xs md:text-sm leading-relaxed max-h-[400px] overflow-y-auto pr-2 bg-slate-900/50 p-4 rounded-lg border border-gray-800 font-sans">
                {generatedText}
              </div>
            ) : (
              <div className="text-center py-20 text-slate-500">
                <Sparkles className="w-12 h-12 text-[#B04285]/20 mx-auto mb-4" />
                <p className="text-sm font-semibold">Ready for creative automation</p>
                <p className="text-xs mt-1">Configure your parameters on the left and trigger the copywriting sequence.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer help notice */}
        {errorStatus && (
          <div className="bg-amber-950/40 border border-amber-800 p-3 rounded-lg flex items-center gap-2 mt-4">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
            <p className="text-[10px] text-amber-300 leading-normal">
              Notice: {errorStatus}. Local model backup automatically activated to ensure offline testing functionality.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}
