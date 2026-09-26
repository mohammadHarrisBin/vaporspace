import React, { useRef, useState, useEffect } from 'react';
import { MousePointer2, Hand } from 'lucide-react';
import CanvasCard from './CanvasCard';
import SelectionToolbar from './SelectionToolbar';
import useCanvasGestures from './useCanvasGestures';

export default function CanvasBoard({ elements, viewport, setViewport, onGenerate, onManualChoose, onRegenerate, onMove, onEdit, onDelete, onResize, busy, mode }) {
  const boardRef = useRef(null);
  const [selection, setSelection] = useState(null);
  const [size, setSize] = useState({ width: 1000, height: 700 });
  const gestures = useCanvasGestures(boardRef, viewport, setViewport, selection, setSelection);

  useEffect(() => {
    const obs = new ResizeObserver(entries => setSize({ width: entries[0].contentRect.width, height: entries[0].contentRect.height }));
    if (boardRef.current) obs.observe(boardRef.current);
    return () => obs.disconnect();
  }, []);

  const choose = async (type, prompt) => {
    if (!selection) return;
    await onGenerate(type, prompt, selection);
    setSelection(null);
  };

  const manualChoose = (type) => {
    if (!selection) return;
    onManualChoose(type, selection);
    setSelection(null);
  };

  return (
    <main
      data-tour="canvas"
      ref={boardRef}
      onPointerDown={gestures.onPointerDown}
      onPointerMove={gestures.onPointerMove}
      onPointerUp={gestures.onPointerUp}
      onPointerCancel={gestures.onPointerUp}
      onWheel={gestures.onWheel}
      onTouchStart={gestures.onTouchStart}
      onTouchMove={gestures.onTouchMove}
      className={`relative flex-1 overflow-hidden touch-none ${gestures.space ? 'cursor-grab active:cursor-grabbing' : 'cursor-crosshair'}`}
      style={{
        backgroundColor: 'hsl(var(--background))',
        backgroundImage: `linear-gradient(hsl(var(--border) / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.4) 1px, transparent 1px), linear-gradient(hsl(var(--border) / 0.15) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.15) 1px, transparent 1px)`,
        backgroundSize: `${112 * viewport.zoom}px ${112 * viewport.zoom}px, ${112 * viewport.zoom}px ${112 * viewport.zoom}px, ${28 * viewport.zoom}px ${28 * viewport.zoom}px, ${28 * viewport.zoom}px ${28 * viewport.zoom}px`,
        backgroundPosition: `${viewport.panX}px ${viewport.panY}px`,
      }}
    >
      <div className="absolute top-5 left-5 z-10 pointer-events-none rounded-lg border border-border bg-card/85 px-4 py-2.5 text-xs text-muted-foreground backdrop-blur-xl font-mono">
        <div className="flex items-center gap-2 text-foreground/90">
          <MousePointer2 size={13} className="text-primary" /> Drag to select a region
        </div>
        <div className="mt-1 flex items-center gap-2">
          <Hand size={12} /> <span className="hidden sm:inline">Space + drag to pan · Scroll to zoom</span><span className="sm:hidden">Pinch to zoom · Drag to pan</span>
        </div>
      </div>

      <div
        data-canvas
        data-zoom={viewport.zoom}
        className="absolute top-0 left-0 origin-top-left"
        style={{ transform: `translate(${viewport.panX}px, ${viewport.panY}px) scale(${viewport.zoom})` }}
      >
        {elements.map(element => (
          <CanvasCard key={element.id} element={element} onMove={onMove} onEdit={onEdit} onDelete={onDelete} onRegenerate={onRegenerate} onResize={onResize} busy={busy} />
        ))}

        {selection && (
          <div className="absolute border border-primary/70 bg-primary/5 pointer-events-none" style={{ left: selection.x, top: selection.y, width: selection.width, height: selection.height }} />
        )}

        {busy && selection && (
          <div className="absolute pointer-events-none rounded-lg border border-border bg-card/80 animate-pulse" style={{ left: selection.x, top: selection.y, width: selection.width, height: selection.height }}>
            <div className="m-5 h-4 w-1/2 rounded bg-foreground/10" />
            <div className="m-5 h-3 w-3/4 rounded bg-foreground/10" />
          </div>
        )}
      </div>

      {gestures.drawing && (
        <div className="absolute pointer-events-none border border-dashed border-primary/60 bg-primary/10" style={{ left: gestures.drawing.x, top: gestures.drawing.y, width: gestures.drawing.width, height: gestures.drawing.height }}>
          <span className="absolute -top-7 left-0 whitespace-nowrap rounded bg-primary px-2 py-1 text-[11px] font-bold text-primary-foreground tabular-nums font-mono">
            {Math.round(gestures.drawing.width)} × {Math.round(gestures.drawing.height)} px
          </span>
        </div>
      )}

      {selection && !busy && (
        <div data-toolbar>
          <SelectionToolbar selection={selection} viewport={viewport} size={size} onChoose={choose} onManualChoose={manualChoose} onClose={() => setSelection(null)} busy={busy} />
        </div>
      )}

      <div className={`absolute bottom-5 left-5 pointer-events-none rounded-full border px-3 py-1.5 text-[11px] flex items-center gap-1.5 font-mono ${mode === 'demo' ? 'border-primary/20 bg-primary/10 text-primary' : 'border-foreground/20 bg-foreground/5 text-foreground/60'}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${mode === 'demo' ? 'bg-primary' : 'bg-foreground/40'}`} />
        {mode === 'demo' ? 'Demo mode · mock responses' : 'Live mode · AI powered'}
      </div>
    </main>
  );
}