import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PresenterMode({ slides, title, onClose }) {
  const [current, setCurrent] = useState(0);
  const slide = slides?.[current];

  useEffect(() => {
    const handler = e => {
      if (e.key === 'ArrowRight' || e.key === ' ') setCurrent(c => Math.min(c + 1, (slides?.length || 1) - 1));
      if (e.key === 'ArrowLeft') setCurrent(c => Math.max(c - 1, 0));
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [slides?.length, onClose]);

  if (!slide) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0c10] flex flex-col">
      <header className="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b border-white/10">
        <span className="text-white/60 text-xs sm:text-sm font-mono truncate">{title || 'Presentation'}</span>
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <span className="text-white/40 text-xs sm:text-sm font-mono tabular-nums">{current + 1} / {slides.length}</span>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors"><X size={22} /></button>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-4 sm:py-6 overflow-y-auto">
        <div className="w-full max-w-3xl">
          <div className="text-white/40 text-[10px] sm:text-xs font-mono mb-2">Slide {current + 1}</div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">{slide.title}</h2>
          <ul className="space-y-2 sm:space-y-3">
            {(slide.bullets || []).map((b, i) => (
              <li key={i} className="text-sm sm:text-lg md:text-xl text-white/80 flex items-start gap-2 sm:gap-3">
                <span className="text-primary mt-0.5 sm:mt-1 shrink-0">▸</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-t border-white/10">
        <button
          onClick={() => setCurrent(c => Math.max(c - 1, 0))}
          disabled={current === 0}
          className="text-white/60 hover:text-white disabled:opacity-30 transition-colors flex items-center gap-2 text-sm"
        >
          <ChevronLeft size={20} /> Prev
        </button>
        <div className="flex gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-primary' : 'bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrent(c => Math.min(c + 1, slides.length - 1))}
          disabled={current === slides.length - 1}
          className="text-white/60 hover:text-white disabled:opacity-30 transition-colors flex items-center gap-2 text-sm"
        >
          Next <ChevronRight size={20} />
        </button>
      </footer>
    </div>
  );
}