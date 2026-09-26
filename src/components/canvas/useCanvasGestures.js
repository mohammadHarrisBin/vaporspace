import { useEffect, useRef, useState } from 'react';
const clamp = value => Math.max(.1, Math.min(5, value));
export default function useCanvasGestures(boardRef, viewport, setViewport, selection, setSelection) {
  const [drawing, setDrawing] = useState(null);
  const [space, setSpace] = useState(false);
  const gesture = useRef(null), touches = useRef(null);
  const viewportRef = useRef(viewport); viewportRef.current = viewport;
  useEffect(() => {
    const down = e => { if (e.code === 'Space' && !['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)) { e.preventDefault(); setSpace(true); } };
    const up = e => { if (e.code === 'Space') setSpace(false); };
    window.addEventListener('keydown', down); window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, []);
  const local = e => { const r = boardRef.current.getBoundingClientRect(); return { x: e.clientX-r.left, y: e.clientY-r.top }; };
  const world = p => ({ x: (p.x-viewportRef.current.panX)/viewportRef.current.zoom, y: (p.y-viewportRef.current.panY)/viewportRef.current.zoom });
  const onPointerDown = e => {
    if (e.target.closest('[data-toolbar]') || e.target.closest('article')) return;
    if (e.button !== 0 && e.button !== 1) return;
    e.preventDefault(); e.currentTarget.setPointerCapture(e.pointerId);
    const p = local(e), pan = e.button === 1 || space || e.pointerType === 'touch';
    gesture.current = { kind: pan ? 'pan' : 'draw', start: p, view: { ...viewportRef.current }, origin: world(p) };
    if (!pan) { setSelection(null); setDrawing({ x: p.x, y: p.y, width: 0, height: 0 }); }
  };
  const onPointerMove = e => {
    const g = gesture.current; if (!g) return;
    const p = local(e);
    if (g.kind === 'pan') setViewport(v => ({ ...v, panX: g.view.panX+p.x-g.start.x, panY: g.view.panY+p.y-g.start.y }));
    else setDrawing({ x: Math.min(g.start.x,p.x), y: Math.min(g.start.y,p.y), width: Math.abs(p.x-g.start.x), height: Math.abs(p.y-g.start.y) });
  };
  const onPointerUp = e => {
    const g = gesture.current; if (!g) return;
    if (g.kind === 'draw') { const p = local(e), end = world(p); if (Math.abs(p.x-g.start.x)>40 && Math.abs(p.y-g.start.y)>40) setSelection({ x: Math.min(g.origin.x,end.x), y: Math.min(g.origin.y,end.y), width: Math.abs(end.x-g.origin.x), height: Math.abs(end.y-g.origin.y) }); setDrawing(null); }
    gesture.current = null;
  };
  const zoomAt = (x, y, factor) => setViewport(v => { const z = clamp(v.zoom*factor); return { zoom:z, panX:x-(x-v.panX)*z/v.zoom, panY:y-(y-v.panY)*z/v.zoom }; });
  const onWheel = e => { e.preventDefault(); const p=local(e); zoomAt(p.x,p.y,Math.exp(-e.deltaY*.001)); };
  const onTouchStart = e => { if(e.touches.length===2) { gesture.current=null; const a=e.touches[0],b=e.touches[1]; touches.current={ dist:Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY), zoom:viewportRef.current.zoom }; } };
  const onTouchMove = e => { if(e.touches.length===2 && touches.current) { e.preventDefault(); const a=e.touches[0],b=e.touches[1], p=local({clientX:(a.clientX+b.clientX)/2,clientY:(a.clientY+b.clientY)/2}); const z=clamp(touches.current.zoom*Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY)/touches.current.dist); setViewport(v=>({zoom:z,panX:p.x-(p.x-v.panX)*z/v.zoom,panY:p.y-(p.y-v.panY)*z/v.zoom})); } };
  return { drawing, space, onPointerDown, onPointerMove, onPointerUp, onWheel, onTouchStart, onTouchMove, zoomAt };
}