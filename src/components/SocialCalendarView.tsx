import React, { useState } from 'react';
import { SocialPost, ContentStatus, PlatformType, ContentType } from '../types';
import { 
  Calendar as CalendarIcon, Grid, List, Sparkles, Check, 
  Send, AlertCircle, RefreshCw, Plus, Clock, Globe, HelpCircle 
} from 'lucide-react';

interface SocialCalendarViewProps {
  posts: SocialPost[];
  onAddPost: (post: Omit<SocialPost, 'id'>) => void;
  onUpdatePostStatus: (id: string, status: ContentStatus) => void;
  onDeletePost: (id: string) => void;
}

export default function SocialCalendarView({ posts, onAddPost, onUpdatePostStatus, onDeletePost }: SocialCalendarViewProps) {
  const [viewType, setViewType] = useState<'calendar' | 'list'>('calendar');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  
  // Create Post states
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<ContentType>('post');
  const [platform, setPlatform] = useState<PlatformType>('instagram');
  const [scheduledDate, setScheduledDate] = useState('2026-06-25');
  const [scheduledTime, setScheduledTime] = useState('14:00');
  const [designerNotes, setDesignerNotes] = useState('');

  const platforms: { id: PlatformType; name: string; color: string }[] = [
    { id: 'instagram', name: 'Instagram', color: 'bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white' },
    { id: 'facebook', name: 'Facebook', color: 'bg-blue-600 text-white' },
    { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-700 text-white' },
    { id: 'twitter', name: 'Twitter (X)', color: 'bg-black text-white' },
    { id: 'pinterest', name: 'Pinterest', color: 'bg-red-600 text-white' },
    { id: 'gmb', name: 'Google Business', color: 'bg-sky-600 text-white' },
  ];

  const contentTypes: { id: ContentType; name: string }[] = [
    { id: 'post', name: 'Static Post' },
    { id: 'reel', name: 'Reel / Short Video' },
    { id: 'story', name: 'Instagram Story' },
    { id: 'gmb', name: 'GMB Local Post' },
    { id: 'blog', name: 'SEO Travel Blog' },
  ];

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    onAddPost({
      platform,
      title,
      content,
      type,
      scheduledDate,
      scheduledTime,
      status: 'draft',
      designerNotes
    });

    setTitle('');
    setContent('');
    setDesignerNotes('');
    setShowAddModal(false);
  };

  const filteredPosts = posts.filter(p => filterPlatform === 'all' || p.platform === filterPlatform);

  // Mock Days of June 2026 Grid mapping
  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div id="social-calendar-view" className="space-y-6">
      
      {/* Header operations */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Social Media Content Hub</h1>
          <p className="text-sm text-gray-500">Plan and automate marketing schedules across active brand channels.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white">
            <button
              onClick={() => setViewType('calendar')}
              className={`p-1.5 rounded-md transition ${viewType === 'calendar' ? 'bg-[#B04285] text-white' : 'text-gray-500 hover:text-gray-900'}`}
              title="Calendar grid view"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewType('list')}
              className={`p-1.5 rounded-md transition ${viewType === 'list' ? 'bg-[#B04285] text-white' : 'text-gray-500 hover:text-gray-900'}`}
              title="Content List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(!showAddModal)}
            className="bg-[#B04285] text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-opacity-95 transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Draft Content Card
          </button>
        </div>
      </div>

      {/* Filter and selector */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-600">Filter Platform:</span>
          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg p-2 font-medium"
          >
            <option value="all">All Channels</option>
            <option value="instagram">Instagram Only</option>
            <option value="facebook">Facebook Only</option>
            <option value="linkedin">LinkedIn Only</option>
            <option value="twitter">Twitter (X) Only</option>
            <option value="gmb">Google Business Profile</option>
          </select>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span> Draft</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span> Pending Review</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> Approved</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span> Published & Live</span>
        </div>
      </div>

      {/* Draft modal toggle form */}
      {showAddModal && (
        <form onSubmit={handlePostSubmit} className="bg-white rounded-xl border border-pink-100 p-6 shadow-md transition-all">
          <h3 className="text-sm font-bold text-[#B04285] uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Schedule New Publisher Post
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="post-title" className="block text-xs font-semibold text-gray-600 mb-1">Post / Campaign Title *</label>
              <input
                id="post-title"
                type="text"
                required
                className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#B04285] focus:outline-none"
                placeholder="Monsoon Spa Retreat Carousel"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="platform-selector" className="block text-xs font-semibold text-gray-600 mb-1">Platform Channel</label>
              <select
                id="platform-selector"
                className="w-full border border-gray-200 rounded-lg p-2 text-xs bg-white focus:ring-[#B04285]"
                value={platform}
                onChange={(e) => setPlatform(e.target.value as PlatformType)}
              >
                {platforms.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="content-type-selector" className="block text-xs font-semibold text-gray-600 mb-1">Content Classification</label>
              <select
                id="content-type-selector"
                className="w-full border border-gray-200 rounded-lg p-2 text-xs bg-white focus:ring-[#B04285]"
                value={type}
                onChange={(e) => setType(e.target.value as ContentType)}
              >
                {contentTypes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className="md:col-span-3">
              <label htmlFor="caption-textarea" className="block text-xs font-semibold text-gray-600 mb-1">Caption / Article Body Content *</label>
              <textarea
                id="caption-textarea"
                rows={4}
                required
                className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#B04285] focus:outline-none"
                placeholder="Escape the ordinary. Check into Amber Woods and indulge in signature treatments designed entirely for your recovery..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="pub-date" className="block text-xs font-semibold text-gray-600 mb-1">Publication Date</label>
              <input
                id="pub-date"
                type="date"
                className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#B04285]"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="pub-time" className="block text-xs font-semibold text-gray-600 mb-1">Publication Time (24h)</label>
              <input
                id="pub-time"
                type="time"
                className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#B04285]"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="graphics-instructions" className="block text-xs font-semibold text-gray-600 mb-1">Designer instructions / Media URL</label>
              <input
                id="graphics-instructions"
                type="text"
                className="w-full border border-gray-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#B04285]"
                placeholder="E.g. use deep gold sunset banner graphic"
                value={designerNotes}
                onChange={(e) => setDesignerNotes(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="submit"
              className="bg-[#B04285] text-white font-bold px-4 py-2 rounded-lg text-xs"
            >
              Add to Draft Schedule
            </button>
          </div>
        </form>
      )}

      {/* View switching */}
      {viewType === 'calendar' ? (
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider font-mono">June 2026 planning grid</h3>
            <span className="text-xs text-gray-400">Total Scheduled: {filteredPosts.length} posts</span>
          </div>

          <div className="grid grid-cols-7 gap-2 min-w-[700px]">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className="text-center text-xs font-bold text-gray-400 py-1 font-mono uppercase bg-gray-50 rounded">
                {d}
              </div>
            ))}

            {/* Days with dynamic scheduled posts mapping */}
            {calendarDays.map((day) => {
              const formattedDayStr = `2026-06-${day.toString().padStart(2, '0')}`;
              const dayPosts = filteredPosts.filter(p => p.scheduledDate === formattedDayStr);

              return (
                <div key={day} className="bg-slate-50/55 rounded-lg p-2 min-h-[90px] border border-gray-100/60 hover:bg-slate-50 transition-colors">
                  <div className="text-[10px] font-bold text-gray-400 font-mono">{day}</div>
                  
                  <div className="space-y-1.5 mt-1.5">
                    {dayPosts.map((post) => (
                      <div 
                        key={post.id} 
                        className={`text-[9px] p-1.5 rounded border leading-tight font-sans cursor-pointer truncate ${
                          post.status === 'draft' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                          post.status === 'review' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          post.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          'bg-purple-50 text-purple-700 border-purple-200'
                        }`}
                        title={`${post.title}\nStatus: ${post.status}\nTime: ${post.scheduledTime}`}
                      >
                        <span className="font-bold uppercase text-[8px] mr-1">
                          {post.platform.slice(0, 3)}
                        </span>
                        {post.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* List queue showing full content and action controls */
        <div className="space-y-4">
          {filteredPosts.map((post) => {
            const matchedPlatform = platforms.find(p => p.id === post.platform);
            return (
              <div key={post.id} className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${matchedPlatform?.color || 'bg-gray-100 text-gray-800'}`}>
                      {post.platform}
                    </span>
                    <span className="text-gray-400 font-mono text-[10px] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.scheduledDate} @ {post.scheduledTime}
                    </span>
                    <span className="text-xs text-gray-500 font-bold px-1.5 py-0.5 bg-gray-100 rounded">
                      {post.type.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900">{post.title}</h3>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </p>

                  {post.designerNotes && (
                    <div className="text-[10px] text-gray-400 bg-slate-50 p-2 rounded border border-gray-100">
                      🎨 <span className="font-semibold text-gray-500">Asset Guidelines:</span> "{post.designerNotes}"
                    </div>
                  )}
                </div>

                {/* Workflow approvals controls */}
                <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100 shrink-0">
                  <div className="text-right">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      post.status === 'review' ? 'bg-blue-100 text-blue-800' :
                      post.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {post.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Flow buttons */}
                  <div className="flex flex-wrap gap-1.5">
                    {post.status === 'draft' && (
                      <button
                        onClick={() => onUpdatePostStatus(post.id, 'review')}
                        className="bg-blue-50 text-blue-700 hover:bg-blue-100 text-[10px] font-bold px-2 py-1 rounded transition cursor-pointer"
                      >
                        Submit for Review
                      </button>
                    )}
                    {post.status === 'review' && (
                      <button
                        onClick={() => onUpdatePostStatus(post.id, 'approved')}
                        className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[10px] font-bold px-2 py-1 rounded transition flex items-center gap-0.5 cursor-pointer"
                      >
                        <Check className="w-3 h-3" /> Approve Post
                      </button>
                    )}
                    {post.status === 'approved' && (
                      <button
                        onClick={() => onUpdatePostStatus(post.id, 'published')}
                        className="bg-purple-50 text-purple-700 hover:bg-purple-100 text-[10px] font-bold px-2 py-1 rounded transition flex items-center gap-0.5 cursor-pointer"
                      >
                        <Send className="w-3 h-3" /> Push to Live
                      </button>
                    )}
                    {post.status === 'published' && (
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                        <Check className="w-4.5 h-4.5" /> Published Sync Completed
                      </span>
                    )}

                    <button
                      onClick={() => onDeletePost(post.id)}
                      className="text-gray-300 hover:text-red-500 text-[10px] p-1 rounded hover:bg-red-50 transition cursor-pointer"
                      title="Delete Content Schedule"
                    >
                      Remove
                    </button>
                  </div>
                </div>

              </div>
            );
          })}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200 text-gray-500">
              <CalendarIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-semibold">No content scheduled for this channel yet</p>
              <button 
                onClick={() => setShowAddModal(true)}
                className="mt-3 text-xs text-[#B04285] font-semibold underline hover:no-underline"
              >
                Add the first draft content
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
