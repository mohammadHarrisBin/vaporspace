import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

const TYPE_LABELS = {
  text_note: 'Text Note',
  flowchart: 'Flowchart',
  database_erd: 'Database Schema',
  ui_wireframe: 'UI Wireframe',
  landing_page: 'Landing Page',
  presentation: 'Presentation',
  ad_creative: 'Ad Creative',
  tech_stack: 'Tech Stack',
  image: 'Image',
  video_ad: 'Video Ad',
  pseudocode: 'Pseudocode',
};

const inputCls = 'w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40 font-mono';
const labelCls = 'block text-[10px] uppercase tracking-wider text-muted-foreground font-mono mb-1.5';

export default function ManualContentModal({ type, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [steps, setSteps] = useState('');
  const [mermaid, setMermaid] = useState('');
  const [html, setHtml] = useState('');
  const [tables, setTables] = useState([{ name: '', fields: [{ name: '', kind: '', tag: '' }] }]);
  const [slides, setSlides] = useState([{ title: '', bullets: '' }]);
  const [headline, setHeadline] = useState('');
  const [body, setBody] = useState('');
  const [cta, setCta] = useState('');
  const [targeting, setTargeting] = useState('');
  const [categories, setCategories] = useState([{ name: '', items: '' }]);
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = () => {
    const payload = { title: title.trim() || TYPE_LABELS[type] || type };

    if (type === 'text_note') payload.text = text;
    if (type === 'flowchart') {
      payload.steps = steps.split('\n').map(s => s.trim()).filter(Boolean);
      payload.mermaid = mermaid.trim();
    }
    if (type === 'database_erd') {
      payload.tables = tables.filter(t => t.name.trim()).map(t => ({
        name: t.name.trim(),
        fields: t.fields.filter(f => f.name.trim()).map(f => [f.name.trim(), f.kind.trim(), f.tag.trim()]),
      }));
    }
    if (type === 'ui_wireframe' || type === 'landing_page') payload.html = html;
    if (type === 'presentation') {
      payload.slides = slides.filter(s => s.title.trim()).map(s => ({
        title: s.title.trim(),
        bullets: s.bullets.split('\n').map(b => b.trim()).filter(Boolean),
      }));
    }
    if (type === 'ad_creative') {
      payload.headline = headline;
      payload.body = body;
      payload.cta = cta;
      payload.targeting = targeting;
    }
    if (type === 'tech_stack') {
      payload.categories = categories.filter(c => c.name.trim()).map(c => ({
        name: c.name.trim(),
        items: c.items.split(',').map(i => i.trim()).filter(Boolean),
      }));
    }
    if (type === 'image') { payload.imageUrl = imageUrl; payload.text = title; }
    if (type === 'video_ad') { payload.videoUrl = videoUrl; payload.text = title; }
    if (type === 'pseudocode') payload.code = code;

    onSubmit(payload);
  };

  const updateTable = (ti, patch) => setTables(ts => ts.map((t, i) => i === ti ? { ...t, ...patch } : t));
  const updateField = (ti, fi, patch) => setTables(ts => ts.map((t, i) => i === ti ? { ...t, fields: t.fields.map((f, j) => j === fi ? { ...f, ...patch } : f) } : t));
  const updateSlide = (si, patch) => setSlides(ss => ss.map((s, i) => i === si ? { ...s, ...patch } : s));
  const updateCategory = (ci, patch) => setCategories(cs => cs.map((c, i) => i === ci ? { ...c, ...patch } : c));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-lg max-h-[85vh] flex flex-col rounded-xl border border-border bg-card shadow-2xl" onClick={e => e.stopPropagation()}>
        <header className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <h2 className="text-sm font-bold font-mono text-foreground">Create {TYPE_LABELS[type]} manually</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
        </header>

        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className={labelCls}>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter a title…" className={inputCls} autoFocus />
          </div>

          {type === 'text_note' && (
            <div>
              <label className={labelCls}>Content (Markdown supported)</label>
              <textarea value={text} onChange={e => setText(e.target.value)} rows={8} placeholder={'### Heading\n\n- Point one\n- Point two'} className={`${inputCls} resize-y`} />
            </div>
          )}

          {type === 'flowchart' && (
            <>
              <div>
                <label className={labelCls}>Steps (one per line)</label>
                <textarea value={steps} onChange={e => setSteps(e.target.value)} rows={5} placeholder={'Client\nAPI Gateway\nAuthorize\nService\nDatabase'} className={`${inputCls} resize-y`} />
              </div>
              <div>
                <label className={labelCls}>Mermaid source (optional)</label>
                <textarea value={mermaid} onChange={e => setMermaid(e.target.value)} rows={4} placeholder={'flowchart LR\nA --> B'} className={`${inputCls} resize-y`} />
              </div>
            </>
          )}

          {type === 'database_erd' && (
            <div className="space-y-3">
              {tables.map((t, ti) => (
                <div key={ti} className="rounded-md border border-border p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <input value={t.name} onChange={e => updateTable(ti, { name: e.target.value })} placeholder="Table name" className={`${inputCls} flex-1`} />
                    {tables.length > 1 && <button onClick={() => setTables(ts => ts.filter((_, i) => i !== ti))} className="text-muted-foreground hover:text-destructive shrink-0"><Trash2 size={14} /></button>}
                  </div>
                  {t.fields.map((f, fi) => (
                    <div key={fi} className="flex gap-2">
                      <input value={f.name} onChange={e => updateField(ti, fi, { name: e.target.value })} placeholder="field" className={`${inputCls} flex-1 text-xs`} />
                      <input value={f.kind} onChange={e => updateField(ti, fi, { kind: e.target.value })} placeholder="type" className={`${inputCls} w-24 text-xs`} />
                      <input value={f.tag} onChange={e => updateField(ti, fi, { tag: e.target.value })} placeholder="PK/FK" className={`${inputCls} w-16 text-xs`} />
                      {t.fields.length > 1 && <button onClick={() => updateTable(ti, { fields: t.fields.filter((_, j) => j !== fi) })} className="text-muted-foreground hover:text-destructive shrink-0"><Trash2 size={12} /></button>}
                    </div>
                  ))}
                  <button onClick={() => updateTable(ti, { fields: [...t.fields, { name: '', kind: '', tag: '' }] })} className="text-xs text-primary hover:underline font-mono">+ Add field</button>
                </div>
              ))}
              <button onClick={() => setTables(ts => [...ts, { name: '', fields: [{ name: '', kind: '', tag: '' }] }])} className="text-xs text-primary hover:underline font-mono">+ Add table</button>
            </div>
          )}

          {(type === 'ui_wireframe' || type === 'landing_page') && (
            <div>
              <label className={labelCls}>HTML content</label>
              <textarea value={html} onChange={e => setHtml(e.target.value)} rows={10} placeholder={"<section style='padding:20px'>…</section>"} className={`${inputCls} resize-y text-xs`} />
            </div>
          )}

          {type === 'presentation' && (
            <div className="space-y-3">
              {slides.map((s, si) => (
                <div key={si} className="rounded-md border border-border p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <input value={s.title} onChange={e => updateSlide(si, { title: e.target.value })} placeholder="Slide title" className={`${inputCls} flex-1`} />
                    {slides.length > 1 && <button onClick={() => setSlides(ss => ss.filter((_, i) => i !== si))} className="text-muted-foreground hover:text-destructive shrink-0"><Trash2 size={14} /></button>}
                  </div>
                  <textarea value={s.bullets} onChange={e => updateSlide(si, { bullets: e.target.value })} rows={3} placeholder="One bullet per line" className={`${inputCls} resize-y text-xs`} />
                </div>
              ))}
              <button onClick={() => setSlides(ss => [...ss, { title: '', bullets: '' }])} className="text-xs text-primary hover:underline font-mono">+ Add slide</button>
            </div>
          )}

          {type === 'ad_creative' && (
            <>
              <div><label className={labelCls}>Headline</label><input value={headline} onChange={e => setHeadline(e.target.value)} placeholder="Catchy headline…" className={inputCls} /></div>
              <div><label className={labelCls}>Body copy</label><textarea value={body} onChange={e => setBody(e.target.value)} rows={3} placeholder="Ad body text…" className={`${inputCls} resize-y`} /></div>
              <div><label className={labelCls}>Call to action</label><input value={cta} onChange={e => setCta(e.target.value)} placeholder="Start free →" className={inputCls} /></div>
              <div><label className={labelCls}>Targeting (optional)</label><input value={targeting} onChange={e => setTargeting(e.target.value)} placeholder="Target audience…" className={inputCls} /></div>
            </>
          )}

          {type === 'tech_stack' && (
            <div className="space-y-3">
              {categories.map((c, ci) => (
                <div key={ci} className="rounded-md border border-border p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <input value={c.name} onChange={e => updateCategory(ci, { name: e.target.value })} placeholder="Category name (e.g. Frontend)" className={`${inputCls} flex-1`} />
                    {categories.length > 1 && <button onClick={() => setCategories(cs => cs.filter((_, i) => i !== ci))} className="text-muted-foreground hover:text-destructive shrink-0"><Trash2 size={14} /></button>}
                  </div>
                  <input value={c.items} onChange={e => updateCategory(ci, { items: e.target.value })} placeholder="Comma-separated items (React, Tailwind, Vite)" className={`${inputCls} text-xs`} />
                </div>
              ))}
              <button onClick={() => setCategories(cs => [...cs, { name: '', items: '' }])} className="text-xs text-primary hover:underline font-mono">+ Add category</button>
            </div>
          )}

          {type === 'image' && (
            <div><label className={labelCls}>Image URL</label><input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://…" className={inputCls} /></div>
          )}

          {type === 'video_ad' && (
            <div><label className={labelCls}>Video URL</label><input value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="https://…" className={inputCls} /></div>
          )}

          {type === 'pseudocode' && (
            <div>
              <label className={labelCls}>Pseudocode</label>
              <textarea value={code} onChange={e => setCode(e.target.value)} rows={10} placeholder={'function authenticate(username, password):\n  user = findUser(username)\n  if not user:\n    return error\n  ...'} className={`${inputCls} resize-y text-xs`} />
            </div>
          )}
        </div>

        <footer className="flex items-center justify-end gap-2 px-5 py-4 border-t border-border shrink-0">
          <button onClick={onClose} className="rounded-md border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
          <button onClick={handleSubmit} className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors">Create</button>
        </footer>
      </div>
    </div>
  );
}