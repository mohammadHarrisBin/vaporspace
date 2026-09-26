import React, { useState } from 'react';
import { X, CornerDownLeft } from 'lucide-react';
import { GENERATORS } from './demoContent';

export default function SelectionToolbar({ selection, viewport, size, onChoose, onManualChoose, onClose, busy }) {
  const [prompt, setPrompt] = useState('');
  const [manual, setManual] = useState(false);
  const right = (selection.x + selection.width) * viewport.zoom + viewport.panX;
  const top = selection.y * viewport.zoom + viewport.panY;
  const below = top < 340;

  const submitPrompt = () => {
    if (!prompt.trim() || busy) return;
    onChoose('text_note', prompt.trim());
    setPrompt('');
  };

  return (
    <div
      className="absolute z-30 w-[min(320px,calc(100vw-32px))] rounded-lg border border-border bg-card/95 shadow-2xl backdrop-blur-2xl p-2"
      style={{
        left: Math.max(12, Math.min(right - 320, size.width - 332)),
        top: below ? Math.max(12, top + selection.height * viewport.zoom + 10) : Math.min(top - 8, size.height - 12),
        transform: below ? 'none' : 'translateY(-100%)',
      }}
    >
      <div className="flex items-center justify-between px-2 py-1.5 text-xs text-muted-foreground font-mono">
        <span>{manual ? 'Create manually — free' : 'Generate in selection'}</span>
        <button onClick={onClose} className="hover:text-foreground" aria-label="Close selection">
          <X size={14} />
        </button>
      </div>

      <div className="flex gap-1 mb-2 px-1">
        <button onClick={() => setManual(false)} disabled={busy} className={`flex-1 rounded-md py-1.5 text-xs font-mono font-semibold transition-colors ${!manual ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground border border-border'}`}>AI</button>
        <button onClick={() => setManual(true)} disabled={busy} className={`flex-1 rounded-md py-1.5 text-xs font-mono font-semibold transition-colors ${manual ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground border border-border'}`}>Manual</button>
      </div>

      {!manual && (
        <div className="relative mb-2">
          <input
            type="text"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); submitPrompt(); } }}
            placeholder="Ask VaporSpace to generate…"
            disabled={busy}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40 font-mono"
          />
          {prompt.trim() && (
            <button onClick={submitPrompt} disabled={busy} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary" aria-label="Submit prompt">
              <CornerDownLeft size={15} />
            </button>
          )}
        </div>
      )}

      {GENERATORS.map(item => (
        <button
          key={item.type}
          disabled={busy}
          onClick={() => manual ? onManualChoose(item.type) : onChoose(item.type, prompt.trim())}
          className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm text-left text-foreground/80 hover:bg-secondary disabled:opacity-50 transition-colors"
        >
          <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary text-sm font-mono">{item.icon}</span>
          <span className="flex-1">{item.label}</span>
          {!manual && <span className="text-[10px] text-muted-foreground tabular-nums font-mono">{item.cost} cr</span>}
          {manual && <span className="text-[10px] text-primary tabular-nums font-mono">FREE</span>}
        </button>
      ))}
    </div>
  );
}