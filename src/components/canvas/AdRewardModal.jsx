import React, { useState, useEffect, useRef } from 'react';
import { X, Gift, Play, Check } from 'lucide-react';

const AD_DURATION = 15;
const REWARD_CREDITS = 3;
const DAILY_LIMIT = 3;
const STORAGE_KEY = 'vaporspace_ad_reward';

function getTodayCount() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const today = new Date().toDateString();
    if (data.date === today) return data.count || 0;
  } catch {}
  return 0;
}

function incrementTodayCount() {
  try {
    const today = new Date().toDateString();
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const count = data.date === today ? (data.count || 0) + 1 : 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count }));
    return count;
  } catch {}
  return 1;
}

export default function AdRewardModal({ open, onClose, onReward }) {
  const [timeLeft, setTimeLeft] = useState(AD_DURATION);
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [todayCount, setTodayCount] = useState(0);
  const adContainerRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setTimeLeft(AD_DURATION);
      setClaiming(false);
      setClaimed(false);
      return;
    }
    setTodayCount(getTodayCount());
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [open, timeLeft]);

  useEffect(() => {
    if (!open || !adContainerRef.current) return;
    adContainerRef.current.innerHTML = '';
    window.atOptions = {
      'key': 'e1a621493a5a5865a47869c294703ee3',
      'format': 'iframe',
      'height': 250,
      'width': 300,
      'params': {}
    };
    const script = document.createElement('script');
    script.src = 'https://www.highrevenueformat.com/e1a621493a5a5865a47869c294703ee3/invoke.js';
    script.async = true;
    adContainerRef.current.appendChild(script);
    return () => {
      if (adContainerRef.current) adContainerRef.current.innerHTML = '';
    };
  }, [open]);

  if (!open) return null;

  const remaining = DAILY_LIMIT - todayCount;
  const limitReached = remaining <= 0;

  const claim = () => {
    if (timeLeft > 0 || claiming || claimed || limitReached) return;
    setClaiming(true);
    setTimeout(() => {
      onReward(REWARD_CREDITS);
      const newCount = incrementTodayCount();
      setTodayCount(newCount);
      setClaimed(true);
      setClaiming(false);
      setTimeout(() => onClose(), 1500);
    }, 500);
  };

  const progress = ((AD_DURATION - timeLeft) / AD_DURATION) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={limitReached || (timeLeft <= 0 && !claiming) ? onClose : undefined}>
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Gift size={18} className="text-primary" />
            <h2 className="text-lg font-bold text-foreground">Earn Free Credits</h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="flex items-center justify-between mb-4 text-xs font-mono">
          <span className="text-muted-foreground">Daily limit: {Math.max(remaining, 0)}/{DAILY_LIMIT} remaining</span>
          <span className="text-primary">+{REWARD_CREDITS} cr / video</span>
        </div>

        {limitReached ? (
          <div className="rounded-lg border border-border bg-secondary p-8 text-center">
            <Check size={32} className="text-primary mx-auto mb-3" />
            <p className="text-sm font-semibold text-foreground mb-1">Daily limit reached</p>
            <p className="text-xs text-muted-foreground font-mono">You've earned {DAILY_LIMIT * REWARD_CREDITS} credits today. Come back tomorrow!</p>
          </div>
        ) : (
          <>
            <div className="relative w-full flex items-center justify-center rounded-lg border border-border bg-gradient-to-br from-secondary via-background to-secondary overflow-hidden mb-4" style={{ minHeight: '250px' }}>
              {timeLeft > 0 ? (
                <div ref={adContainerRef} className="w-[300px] h-[250px] flex items-center justify-center" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Check size={32} className="text-primary mb-2" />
                  <p className="text-xs text-primary font-mono">Ad complete!</p>
                </div>
              )}
              {timeLeft > 0 && (
                <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-mono px-2 py-1 rounded">
                  {timeLeft}s
                </div>
              )}
            </div>

            <div className="w-full h-1.5 bg-secondary rounded-full mb-4 overflow-hidden">
              <div className="h-full bg-primary transition-all duration-1000 ease-linear" style={{ width: `${progress}%` }} />
            </div>

            {timeLeft > 0 ? (
              <p className="text-center text-xs text-muted-foreground font-mono mb-4">
                Please watch the ad to unlock your credits: {timeLeft}s…
              </p>
            ) : (
              <p className="text-center text-xs text-primary font-mono mb-4">
                ✓ You've earned {REWARD_CREDITS} credits!
              </p>
            )}

            <button
              onClick={claim}
              disabled={timeLeft > 0 || claiming || claimed}
              className="w-full rounded-md bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {claimed ? (
                <><Check size={16} /> +{REWARD_CREDITS} Credits Added!</>
              ) : claiming ? (
                <span className="animate-pulse">Adding credits…</span>
              ) : timeLeft > 0 ? (
                <><Play size={14} /> Watch ad ({timeLeft}s)</>
              ) : (
                <><Gift size={16} /> Claim {REWARD_CREDITS} Credits</>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}