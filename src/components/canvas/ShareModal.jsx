import React, { useState, useEffect } from 'react';
import { X, Globe, Lock } from 'lucide-react';

export default function ShareModal({ open, onClose, onShare, defaultTitle }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [visibility, setVisibility] = useState('public');

  useEffect(() => {
    if (open) {
      setTitle(defaultTitle || '');
      setDescription('');
      setTags('');
      setVisibility('public');
    }
  }, [open, defaultTitle]);

  if (!open) return null;

  const handleSubmit = () => {
    onShare({
      title: title.trim() || defaultTitle,
      description: description.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      visibility,
    });
  };

  const inputCls = 'w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40 font-mono';
  const labelCls = 'block text-[10px] uppercase tracking-wider text-muted-foreground font-mono mb-1.5';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl border border-border bg-card shadow-2xl" onClick={e => e.stopPropagation()}>
        <header className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-sm font-bold font-mono text-foreground">Share Workspace</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
        </header>
        <div className="p-5 space-y-4">
          <div>
            <label className={labelCls}>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder={defaultTitle || 'My workspace'} className={inputCls} autoFocus />
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="What's this workspace about?" className={`${inputCls} resize-y`} />
          </div>
          <div>
            <label className={labelCls}>Tags (comma-separated)</label>
            <input value={tags} onChange={e => setTags(e.target.value)} placeholder="react, architecture, startup" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Visibility</label>
            <div className="flex gap-2">
              <button onClick={() => setVisibility('public')} className={`flex-1 flex items-center justify-center gap-2 rounded-md py-2.5 text-xs font-mono font-semibold transition-colors ${visibility === 'public' ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:text-foreground'}`}>
                <Globe size={14} /> Public
              </button>
              <button onClick={() => setVisibility('private')} className={`flex-1 flex items-center justify-center gap-2 rounded-md py-2.5 text-xs font-mono font-semibold transition-colors ${visibility === 'private' ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:text-foreground'}`}>
                <Lock size={14} /> Private
              </button>
            </div>
          </div>
        </div>
        <footer className="flex items-center justify-end gap-2 px-5 py-4 border-t border-border">
          <button onClick={onClose} className="rounded-md border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
          <button onClick={handleSubmit} className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors">Share</button>
        </footer>
      </div>
    </div>
  );
}