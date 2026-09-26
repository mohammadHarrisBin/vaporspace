import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

const SCENES = [
  { id: 'intro', duration: 5000, narration: 'VaporSpace. The infinite spatial AI canvas for system design.' },
  { id: 'problem', duration: 8000, narration: 'Designing systems means juggling five plus tools. But what if everything lived on one infinite canvas?' },
  { id: 'canvas', duration: 7000, narration: 'An infinite canvas with no boundaries. Pan and zoom across your entire architecture.' },
  { id: 'generation', duration: 12000, narration: 'Select a region. Type a prompt. AI builds it in real time. Your diagram is ready in seconds.' },
  { id: 'types', duration: 9000, narration: 'Eleven content types. Flowcharts, database diagrams, wireframes, landing pages, presentations, tech stacks, and more.' },
  { id: 'sharing', duration: 7000, narration: 'Share your workspace publicly. Others can like, clone, and explore your work.' },
  { id: 'student', duration: 7000, narration: 'I am a university student building VaporSpace to support myself through school.' },
  { id: 'cta', duration: 5000, narration: 'Try VaporSpace free at vaporspace dot world.' },
];

const TOTAL = SCENES.reduce((a, s) => a + s.duration, 0);

const TYPE_CARDS = [
  { icon: '◈', label: 'Flowcharts' },
  { icon: '▤', label: 'Database ERDs' },
  { icon: '▣', label: 'UI Wireframes' },
  { icon: '▦', label: 'Landing Pages' },
  { icon: '◧', label: 'Presentations' },
  { icon: '◆', label: 'Ad Creatives' },
  { icon: '⚡', label: 'Tech Stacks' },
  { icon: '#', label: 'Pseudocode' },
  { icon: '✧', label: 'Images' },
  { icon: '≡', label: 'Text Notes' },
  { icon: '▶', label: 'Video Ads' },
];

function Scene({ id, progress }) {
  if (id === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: 'easeOut' }} className="mb-4">
          <div className="w-20 h-20 rounded-2xl border-2 border-lime-400 flex items-center justify-center bg-lime-400/5 shadow-[0_0_40px_rgba(198,255,0,0.3)]">
            <span className="text-4xl font-bold text-lime-400 font-mono">V</span>
          </div>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-4xl sm:text-6xl font-bold text-white font-mono tracking-tight" style={{ textShadow: '0 0 30px rgba(198,255,0,0.4)' }}>VaporSpace</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} className="text-base sm:text-xl text-lime-400/80 font-mono mt-3 tracking-wider">Infinite spatial AI canvas for system design</motion.p>
      </div>
    );
  }
  if (id === 'problem') {
    const showSecond = progress > 0.4;
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <AnimatePresence mode="wait">
          {!showSecond ? (
            <motion.div key="first" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl sm:text-4xl font-bold text-white font-mono mb-6">Designing systems means juggling 5+ tools</h2>
              <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                {['Figma', 'Notion', 'Lucidchart', 'dbdiagram', 'Excalidraw', 'Miro'].map((tool, i) => (
                  <motion.div key={tool} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }} className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs font-mono text-white/40">{tool}</motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="second" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h2 className="text-2xl sm:text-4xl font-bold text-white font-mono mb-3">What if everything lived on</h2>
              <h2 className="text-3xl sm:text-5xl font-bold text-lime-400 font-mono" style={{ textShadow: '0 0 30px rgba(198,255,0,0.4)' }}>one infinite canvas?</h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
  if (id === 'canvas') {
    return (
      <div className="relative h-full overflow-hidden">
        <motion.div initial={{ scale: 1.5, x: -100, y: -50 }} animate={{ scale: 1.5, x: 100, y: 50 }} transition={{ duration: 7, ease: 'linear' }} className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(198,255,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(198,255,0,0.08) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-2xl sm:text-4xl font-bold text-white font-mono mb-2">An infinite canvas</motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-lg sm:text-2xl text-lime-400 font-mono">with no boundaries</motion.p>
          </div>
        </div>
      </div>
    );
  }
  if (id === 'generation') {
    const phase = progress < 0.25 ? 'select' : progress < 0.5 ? 'prompt' : progress < 0.7 ? 'building' : 'done';
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <div className="relative w-full max-w-lg h-64 rounded-xl border border-white/10 bg-black/40 overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(198,255,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(198,255,0,0.06) 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
          {phase === 'select' && (
            <motion.div initial={{ width: 0, height: 0 }} animate={{ width: 320, height: 180 }} transition={{ duration: 1.5, ease: 'easeOut' }} className="absolute top-8 left-8 border-2 border-dashed border-lime-400/60 bg-lime-400/5 rounded-lg">
              <span className="absolute -top-6 left-0 text-[10px] font-mono text-lime-400 bg-black/80 px-2 py-1 rounded">Select a region…</span>
            </motion.div>
          )}
          {phase === 'prompt' && (
            <>
              <div className="absolute top-8 left-8 border-2 border-dashed border-lime-400/60 bg-lime-400/5 rounded-lg" style={{ width: 320, height: 180 }} />
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/90 border border-lime-400/30 rounded-lg px-3 py-1.5">
                <span className="text-lime-400 text-xs">✦</span>
                <motion.span initial={{ width: 0 }} animate={{ width: 'auto' }} transition={{ duration: 2 }} className="text-xs font-mono text-white/80 whitespace-nowrap overflow-hidden">Design a user authentication flow</motion.span>
                <span className="w-0.5 h-3.5 bg-lime-400 animate-pulse" />
              </motion.div>
            </>
          )}
          {(phase === 'building' || phase === 'done') && (
            <>
              <div className="absolute top-8 left-8 border border-lime-400/30 bg-black/30 rounded-lg p-3" style={{ width: 320, height: 180 }}>
                <div className="flex items-center gap-1.5 mb-2"><div className="w-2 h-2 rounded-full bg-lime-400" /><span className="text-[9px] font-mono text-lime-400/60">FLOWCHART</span></div>
                <div className="space-y-1.5">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-2">
                    <div className="px-2 py-1 rounded bg-lime-400/10 border border-lime-400/30 text-[9px] font-mono text-lime-400">Start</div>
                    <div className="w-3 h-px bg-lime-400/30" />
                    <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-white/60">Enter credentials</div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="flex items-center gap-2 ml-4"><div className="w-3 h-px bg-lime-400/30" /><div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-white/60">Validate</div></motion.div>
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="flex items-center gap-2 ml-8"><div className="w-3 h-px bg-lime-400/30" /><div className="px-2 py-1 rounded bg-lime-400/10 border border-lime-400/30 text-[9px] font-mono text-lime-400">Generate token</div></motion.div>
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }} className="flex items-center gap-2 ml-12"><div className="w-3 h-px bg-lime-400/30" /><div className="px-2 py-1 rounded bg-lime-400/10 border border-lime-400/30 text-[9px] font-mono text-lime-400">Success ✓</div></motion.div>
                </div>
              </div>
              {phase === 'done' && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-3 right-3 text-[10px] font-mono text-lime-400/60">✓ Generated in 3.2s</motion.div>}
            </>
          )}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={phase} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="mt-4">
            {phase === 'select' && <p className="text-sm text-white/50 font-mono">1. Select a region on the canvas</p>}
            {phase === 'prompt' && <p className="text-sm text-white/50 font-mono">2. Type your prompt</p>}
            {phase === 'building' && <p className="text-sm text-lime-400/70 font-mono">3. AI builds it in real-time…</p>}
            {phase === 'done' && <p className="text-sm text-lime-400 font-mono">Done. Your diagram is ready.</p>}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
  if (id === 'types') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-2xl sm:text-4xl font-bold text-white font-mono mb-2">11 content types</motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-sm text-lime-400/70 font-mono mb-6">one infinite canvas</motion.p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-xl">
          {TYPE_CARDS.map((card, i) => (
            <motion.div key={card.label} initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 200 }} className="flex flex-col items-center gap-2 p-3 rounded-xl border border-white/10 bg-white/5">
              <span className="text-2xl text-lime-400">{card.icon}</span>
              <span className="text-[10px] font-mono text-white/60 text-center">{card.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }
  if (id === 'sharing') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-2xl sm:text-4xl font-bold text-white font-mono mb-6">Share your workspace publicly</motion.h2>
        <div className="flex items-center gap-6 sm:gap-10">
          {[{ label: 'Like', icon: '♥', count: '42' }, { label: 'Clone', icon: '⑂', count: '18' }, { label: 'Explore', icon: '◎', count: '100+' }].map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.3, type: 'spring', stiffness: 200 }} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-xl border border-lime-400/20 bg-lime-400/5 flex items-center justify-center"><span className="text-2xl text-lime-400">{item.icon}</span></div>
              <span className="text-xs font-mono text-white/60">{item.label}</span>
              <span className="text-sm font-mono font-bold text-lime-400">{item.count}</span>
            </motion.div>
          ))}
        </div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-sm text-white/40 font-mono mt-6">Others discover, like & clone your work</motion.p>
      </div>
    );
  }
  if (id === 'student') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-xl sm:text-3xl font-bold text-white font-mono mb-4">I'm a uni student building this</motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="text-lg sm:text-2xl text-white/50 font-mono mb-6">to support myself through school</motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.8 }} className="text-3xl mb-3">💚</motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="text-base text-lime-400/80 font-mono">Your support means the world</motion.p>
        </motion.div>
      </div>
    );
  }
  if (id === 'cta') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="mb-4">
          <div className="w-16 h-16 rounded-2xl border-2 border-lime-400 flex items-center justify-center bg-lime-400/5 shadow-[0_0_40px_rgba(198,255,0,0.3)] mx-auto">
            <span className="text-3xl font-bold text-lime-400 font-mono">V</span>
          </div>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-3xl sm:text-5xl font-bold text-white font-mono mb-3">Try VaporSpace free</motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-lg text-lime-400 font-mono" style={{ textShadow: '0 0 20px rgba(198,255,0,0.3)' }}>vaporspace.world</motion.p>
      </div>
    );
  }
  return null;
}

export default function ExplainerVideo() {
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);
  const [narrationOn, setNarrationOn] = useState(true);

  useEffect(() => {
    if (!window.speechSynthesis) return;
    if (!playing || finished || !narrationOn) { window.speechSynthesis.cancel(); return; }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(SCENES[scene].narration);
    u.rate = 1.05; u.pitch = 1.0; u.volume = 1.0;
    window.speechSynthesis.speak(u);
    return () => window.speechSynthesis.cancel();
  }, [scene, playing, finished, narrationOn]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  useEffect(() => {
    if (!playing || finished) return;
    const duration = SCENES[scene].duration;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);
      if (p >= 1) {
        clearInterval(timer);
        if (scene < SCENES.length - 1) { setScene(s => s + 1); setProgress(0); }
        else { setPlaying(false); setFinished(true); }
      }
    }, 50);
    return () => clearInterval(timer);
  }, [scene, playing, finished]);

  const replay = useCallback(() => { setScene(0); setProgress(0); setPlaying(true); setFinished(false); }, []);
  const toggle = useCallback(() => { if (finished) { replay(); return; } setPlaying(p => !p); }, [finished, replay]);

  const elapsedBefore = SCENES.slice(0, scene).reduce((a, s) => a + s.duration, 0);
  const totalElapsed = elapsedBefore + SCENES[scene].duration * progress;
  const totalPct = (totalElapsed / TOTAL) * 100;
  const currentSec = Math.floor(totalElapsed / 1000);
  const totalSec = Math.floor(TOTAL / 1000);
  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${narrationOn ? 'bg-lime-400 animate-pulse' : 'bg-white/20'}`} />
          <span className="text-[10px] font-mono font-bold tracking-wider text-white/60">EXPLAINER VIDEO · {fmt(totalSec)} · {narrationOn ? 'WITH NARRATION' : 'MUTED'}</span>
        </div>
        <button onClick={() => setNarrationOn(n => !n)} className="flex items-center gap-1.5 text-[10px] font-mono text-white/50 hover:text-lime-400 transition-colors">
          {narrationOn ? <Volume2 size={13} /> : <VolumeX size={13} />} {narrationOn ? 'SOUND ON' : 'MUTED'}
        </button>
      </div>
      <div className="relative aspect-video bg-[#0A0C10]">
        <AnimatePresence mode="wait">
          <motion.div key={SCENES[scene].id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0">
            <Scene id={SCENES[scene].id} progress={progress} />
          </motion.div>
        </AnimatePresence>
        {finished && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <button onClick={replay} className="flex items-center gap-2 rounded-full bg-lime-400 text-black px-6 py-3 font-bold font-mono text-sm hover:bg-lime-300 transition-colors">
              <RotateCcw size={16} /> Replay
            </button>
          </motion.div>
        )}
        <button onClick={toggle} className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/60 border border-white/10 text-white/60 hover:text-lime-400 transition-colors z-10">
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>
      <div className="flex items-center gap-3 px-4 py-2.5 border-t border-white/10 bg-white/5">
        <span className="text-[10px] font-mono text-white/40 tabular-nums">{fmt(currentSec)}</span>
        <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-lime-400 transition-all duration-75" style={{ width: `${totalPct}%` }} />
        </div>
        <span className="text-[10px] font-mono text-white/40 tabular-nums">{fmt(totalSec)}</span>
      </div>
    </div>
  );
}