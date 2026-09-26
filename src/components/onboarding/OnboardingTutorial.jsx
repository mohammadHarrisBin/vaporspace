import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { ONBOARDING_STEPS } from './onboardingSteps';

export default function OnboardingTutorial({ onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [rect, setRect] = useState(null);

  const step = ONBOARDING_STEPS[stepIndex];
  const isLast = stepIndex === ONBOARDING_STEPS.length - 1;
  const isCenter = !step.target;

  useEffect(() => {
    if (isCenter) { setRect(null); return; }
    const update = () => {
      const el = document.querySelector(step.target);
      setRect(el ? el.getBoundingClientRect() : null);
    };
    update();
    const id = setInterval(update, 200);
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      clearInterval(id);
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [stepIndex, isCenter, step.target]);

  const next = useCallback(() => {
    if (isLast) onComplete();
    else setStepIndex(i => i + 1);
  }, [isLast, onComplete]);

  const skipAll = useCallback(() => onComplete(), [onComplete]);
  const centered = isCenter || !rect;

  let tooltipStyle = {};
  if (!centered && rect) {
    const w = 320;
    const estHeight = 240;
    const showBelow = rect.top < window.innerHeight / 2;
    const targetCenter = rect.left + rect.width / 2;
    let top = showBelow ? rect.bottom + 16 : undefined;
    let bottom = !showBelow ? window.innerHeight - rect.top + 16 : undefined;
    if (top != null && top + estHeight > window.innerHeight - 16) {
      top = Math.max(16, window.innerHeight - estHeight - 16);
    }
    if (bottom != null && window.innerHeight - bottom - estHeight < 16) {
      bottom = Math.max(16, window.innerHeight - estHeight - 16);
    }
    tooltipStyle = {
      position: 'absolute',
      width: w,
      top,
      bottom,
      left: Math.max(16, Math.min(targetCenter - w / 2, window.innerWidth - w - 16)),
    };
  }

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-label="Onboarding tutorial">
      {rect && !isCenter ? (
        <>
          <div className="absolute bg-black/82 pointer-events-auto" style={{ top: 0, left: 0, right: 0, height: Math.max(0, rect.top) }} />
          <div className="absolute bg-black/82 pointer-events-auto" style={{ top: rect.bottom, left: 0, right: 0, bottom: 0 }} />
          <div className="absolute bg-black/82 pointer-events-auto" style={{ top: rect.top, left: 0, width: Math.max(0, rect.left), height: rect.height }} />
          <div className="absolute bg-black/82 pointer-events-auto" style={{ top: rect.top, left: rect.right, right: 0, height: rect.height }} />
          <div className="absolute rounded-lg ring-2 ring-primary pointer-events-none transition-all duration-300" style={{ top: rect.top - 4, left: rect.left - 4, width: rect.width + 8, height: rect.height + 8 }} />
        </>
      ) : (
        <div className="absolute inset-0 bg-black/82 backdrop-blur-sm pointer-events-auto" onClick={skipAll} />
      )}

      <div
        className={`absolute z-10 pointer-events-auto ${centered ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''}`}
        style={centered ? { width: 420 } : tooltipStyle}
      >
        <div className="rounded-xl border border-border bg-card p-5 shadow-2xl">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-base font-bold text-foreground">{step.title}</h3>
            <button onClick={skipAll} className="text-muted-foreground hover:text-foreground shrink-0" aria-label="Skip all">
              <X size={16} />
            </button>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{step.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground">{stepIndex + 1} / {ONBOARDING_STEPS.length}</span>
            <div className="flex items-center gap-2">
              {!isLast && (
                <button onClick={skipAll} className="text-xs font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 transition-colors">
                  Skip all
                </button>
              )}
              <button
                onClick={next}
                className="inline-flex items-center gap-1 rounded-lg bg-primary text-primary-foreground px-4 py-1.5 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {isLast ? 'Start building' : 'Next'}
                {!isLast && <ChevronRight size={14} />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {ONBOARDING_STEPS.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all ${i === stepIndex ? 'w-6 bg-primary' : 'w-1.5 bg-border'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}