import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import SEO from '@/components/SEO';
import { Heart, GitFork, Search, ArrowLeft, Loader2 } from 'lucide-react';

const FILTERS = [
  { key: 'popular', label: 'Popular', sort: '-like_count' },
  { key: 'forked', label: 'Most Forked', sort: '-fork_count' },
  { key: 'recent', label: 'Recent', sort: '-created_date' },
];

export default function Explore() {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('popular');
  const [search, setSearch] = useState('');
  const [liked, setLiked] = useState(new Set(JSON.parse(localStorage.getItem('likedWorkspaces') || '[]')));
  const [cloning, setCloning] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const sort = FILTERS.find(f => f.key === filter)?.sort || '-like_count';
        const records = await base44.entities.SharedWorkspaces.filter({ visibility: 'public' }, sort, 100);
        setWorkspaces(records);
      } catch { }
      finally { setLoading(false); }
    };
    load();
  }, [filter]);

  const toggleLike = async (ws) => {
    const isLiked = liked.has(ws.id);
    const newLiked = new Set(liked);
    if (isLiked) {
      newLiked.delete(ws.id);
      await base44.entities.SharedWorkspaces.update(ws.id, { like_count: Math.max(0, (ws.like_count || 0) - 1) });
    } else {
      newLiked.add(ws.id);
      await base44.entities.SharedWorkspaces.update(ws.id, { like_count: (ws.like_count || 0) + 1 });
    }
    setLiked(newLiked);
    localStorage.setItem('likedWorkspaces', JSON.stringify([...newLiked]));
    setWorkspaces(prev => prev.map(w => w.id === ws.id ? { ...w, like_count: isLiked ? Math.max(0, (w.like_count || 0) - 1) : (w.like_count || 0) + 1 } : w));
  };

  const cloneWorkspace = async (ws) => {
    setCloning(ws.id);
    try {
      const me = await base44.auth.me();
      const created = await base44.entities.Canvases.create({ user_id: me.id, title: `${ws.title} (clone)`, viewport_state: { zoom: 0.8, panX: 40, panY: 40 } });
      const elementsData = typeof ws.elements_data === 'string' ? JSON.parse(ws.elements_data || '[]') : (ws.elements_data || []);
      if (elementsData.length) {
        await base44.entities.CanvasElements.bulkCreate(elementsData.map(el => ({ ...el, canvas_id: created.id })));
      }
      await base44.entities.SharedWorkspaces.update(ws.id, { fork_count: (ws.fork_count || 0) + 1 });
      window.location.href = '/app';
    } catch (e) {
      alert('Could not clone workspace: ' + (e.message || 'Unknown error'));
    } finally {
      setCloning(null);
    }
  };

  const filtered = workspaces.filter(ws =>
    !search || ws.title?.toLowerCase().includes(search.toLowerCase()) || ws.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title="VaporSpace | Explore Shared Workspaces" description="Browse, like, and clone shared workspaces from the VaporSpace community." path="/explore" />
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl px-4 py-3 flex items-center gap-4">
        <Link to="/app" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0">
          <ArrowLeft size={16} /> Back to app
        </Link>
        <h1 className="text-lg font-bold font-mono">Explore Workspaces</h1>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search workspaces…" className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary/40" />
          </div>
          <div className="flex gap-2">
            {FILTERS.map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)} className={`rounded-lg px-4 py-2.5 text-xs font-mono font-semibold transition-colors ${filter === f.key ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:text-foreground'}`}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-muted-foreground" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-sm">No shared workspaces found yet.</p>
            <p className="text-xs mt-1">Be the first to share yours from the app!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(ws => (
              <div key={ws.id} className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-colors flex flex-col">
                <h3 className="text-sm font-bold text-foreground mb-2">{ws.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">{ws.description || 'No description provided.'}</p>
                {ws.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {ws.tags.slice(0, 5).map((tag, i) => (
                      <span key={i} className="text-[10px] rounded border border-border px-1.5 py-0.5 text-muted-foreground font-mono">{tag}</span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                    <button onClick={() => toggleLike(ws)} className={`flex items-center gap-1 transition-colors ${liked.has(ws.id) ? 'text-primary' : 'hover:text-foreground'}`}>
                      <Heart size={14} fill={liked.has(ws.id) ? 'currentColor' : 'none'} /> {ws.like_count || 0}
                    </button>
                    <span className="flex items-center gap-1">
                      <GitFork size={14} /> {ws.fork_count || 0}
                    </span>
                  </div>
                  <button onClick={() => cloneWorkspace(ws)} disabled={cloning === ws.id} className="rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-xs font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center gap-1.5">
                    {cloning === ws.id ? <Loader2 size={12} className="animate-spin" /> : <GitFork size={12} />} Clone
                  </button>
                </div>
                <div className="text-[10px] text-muted-foreground font-mono mt-2">by {ws.author_name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}