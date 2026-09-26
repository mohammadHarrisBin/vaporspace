import React, { useState } from 'react';
import { Grip, X, RefreshCw, Send, Play } from 'lucide-react';
import ElementContent from './ElementContent';
import RichTextEditor, { markdownToHtml } from './RichTextEditor';
import PresenterMode from './PresenterMode';

const TYPE_LABELS = {
  image: 'Image',
  ui_wireframe: 'UI Wireframe',
  flowchart: 'Flowchart',
  database_erd: 'Database',
  text_note: 'Notes',
  landing_page: 'Landing Page',
  presentation: 'Presentation',
  ad_creative: 'Ad Creative',
  tech_stack: 'Tech Stack',
  pseudocode: 'Pseudocode',
  video_ad: 'Video Ad',
};

export default function CanvasCard({ element, onMove, onEdit, onDelete, onRegenerate, onResize, busy }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const [showRegen, setShowRegen] = useState(false);
  const [regenInput, setRegenInput] = useState('');
  const [presenting, setPresenting] = useState(false);

  const onPointerDown = e => {
    if (e.button !== 0 || e.target.closest('button, details, iframe, textarea, input, .resize-handle, .ql-editor, .ql-toolbar, .rich-text-editor')) return;
    e.stopPropagation();
    e.preventDefault();
    const card = e.currentTarget;
    const startX = e.clientX, startY = e.clientY;
    const x = element.x_pos, y = element.y_pos;
    const canvas = card.closest('[data-canvas]');
    const zoom = Number(canvas?.dataset.zoom || 1);
    const move = event => {
      event.preventDefault();
      card.style.left = `${x + (event.clientX - startX) / zoom}px`;
      card.style.top = `${y + (event.clientY - startY) / zoom}px`;
    };
    const up = event => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      if (Math.abs(event.clientX - startX) + Math.abs(event.clientY - startY) > 2) {
        onMove(element.id, x + (event.clientX - startX) / zoom, y + (event.clientY - startY) / zoom);
      }
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up, { once: true });
  };

  const onResizeStart = e => {
    e.stopPropagation();
    e.preventDefault();
    const card = e.currentTarget.closest('article');
    const startX = e.clientX, startY = e.clientY;
    const startW = element.width, startH = element.height;
    const canvas = card.closest('[data-canvas]');
    const zoom = Number(canvas?.dataset.zoom || 1);
    const resize = event => {
      event.preventDefault();
      const w = Math.max(200, startW + (event.clientX - startX) / zoom);
      const h = Math.max(160, startH + (event.clientY - startY) / zoom);
      card.style.width = `${w}px`;
      card.style.height = `${h}px`;
    };
    const up = event => {
      window.removeEventListener('pointermove', resize);
      window.removeEventListener('pointerup', up);
      const w = Math.max(200, startW + (event.clientX - startX) / zoom);
      const h = Math.max(160, startH + (event.clientY - startY) / zoom);
      if (onResize && Math.abs(event.clientX - startX) + Math.abs(event.clientY - startY) > 2) {
        onResize(element.id, w, h);
      }
    };
    window.addEventListener('pointermove', resize);
    window.addEventListener('pointerup', up, { once: true });
  };

  const startEdit = e => {
    if (element.type !== 'text_note') return;
    e.stopPropagation();
    setEditText(markdownToHtml(element.payload?.text || ''));
    setEditing(true);
  };

  const saveEdit = () => {
    setEditing(false);
    if (editText !== (element.payload?.text || '')) {
      onEdit(element.id, { text: editText });
    }
  };

  const submitRegen = (e) => {
    e.stopPropagation();
    if (regenInput.trim() && !busy) {
      onRegenerate(element.id, element.type, element.payload?.title || '', regenInput.trim());
      setRegenInput('');
      setShowRegen(false);
    }
  };

  return (
    <article
      onPointerDown={onPointerDown}
      style={{ left: element.x_pos, top: element.y_pos, width: element.width, height: element.height, zIndex: element.z_index || 1 }}
      className="absolute flex flex-col rounded-lg border border-border bg-card/95 shadow-[0_12px_40px_rgba(0,0,0,.25)] backdrop-blur-xl overflow-hidden select-none"
    >
      <header className="flex items-center gap-2 px-4 py-3 border-b border-border cursor-grab active:cursor-grabbing">
        <Grip size={12} className="text-muted-foreground shrink-0" />
        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
        <span className="text-[9px] font-mono uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded px-1.5 py-0.5 shrink-0">{TYPE_LABELS[element.type] || element.type}</span>
        <h3 className="text-xs font-semibold text-foreground flex-1 truncate font-mono">{element.payload?.title || element.type}</h3>
        {element.type === 'presentation' && (
          <button title="Present slides" onClick={(e) => { e.stopPropagation(); setPresenting(true); }} className="p-1 text-muted-foreground hover:text-primary transition-colors">
            <Play size={13} />
          </button>
        )}
        <button title="Regenerate with improvements" onClick={(e) => { e.stopPropagation(); setShowRegen(!showRegen); }} disabled={busy} className="p-1 text-muted-foreground hover:text-primary disabled:opacity-50 transition-colors">
          <RefreshCw size={13} className={busy ? 'animate-spin' : ''} />
        </button>
        <button aria-label="Delete element" onClick={() => onDelete(element.id)} className="p-1 text-muted-foreground hover:text-destructive transition-colors">
          <X size={14} />
        </button>
      </header>
      {showRegen && (
        <div className="px-4 py-2.5 border-b border-border flex items-center gap-2">
          <input
            value={regenInput}
            onChange={e => setRegenInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') submitRegen(e); if (e.key === 'Escape') setShowRegen(false); }}
            onClick={e => e.stopPropagation()}
            placeholder="How to improve this…"
            className="flex-1 bg-background border border-border rounded-md px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-primary/40 font-mono placeholder:text-muted-foreground"
          />
          <button onClick={submitRegen} disabled={busy} className="p-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors">
            <Send size={12} />
          </button>
        </div>
      )}
      <div className="px-4 py-3 flex-1 overflow-y-auto" onDoubleClick={element.type === 'text_note' ? startEdit : undefined}>
        {editing && element.type === 'text_note' ? (
          <RichTextEditor
            defaultValue={editText}
            onChange={setEditText}
            onBlur={saveEdit}
          />
        ) : (
          <ElementContent element={element} />
        )}
      </div>
      <div
        onPointerDown={onResizeStart}
        className="resize-handle absolute bottom-0 right-0 w-5 h-5 cursor-se-resize flex items-end justify-end p-0.5 hover:bg-primary/10 transition-colors"
      >
        <svg width="8" height="8" viewBox="0 0 8 8" className="text-muted-foreground/50">
          <path d="M8 0L0 8M8 4L4 8" stroke="currentColor" strokeWidth="1.2" fill="none" />
        </svg>
      </div>
      {presenting && element.type === 'presentation' && (
        <PresenterMode slides={element.payload?.slides || []} title={element.payload?.title} onClose={() => setPresenting(false)} />
      )}
    </article>
  );
}