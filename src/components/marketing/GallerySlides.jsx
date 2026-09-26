import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Camera, Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-lg border border-lime-400 flex items-center justify-center bg-lime-400/5">
        <span className="text-sm font-bold text-lime-400 font-mono">V</span>
      </div>
      <span className="text-xs font-bold text-white tracking-[.2em] font-mono">VAPORSPACE</span>
    </div>
  );
}

function Slide1() {
  return (
    <div className="relative w-full h-full bg-[#0A0C10] flex flex-col p-8 sm:p-12">
      <Logo />
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-1 leading-tight">Design systems on an</h2>
        <h2 className="text-2xl sm:text-4xl font-bold text-lime-400 mb-6 leading-tight" style={{ textShadow: '0 0 30px rgba(198,255,0,0.3)' }}>infinite AI canvas</h2>
        <div className="relative w-full max-w-xl h-44 rounded-xl border border-white/10 overflow-hidden bg-black/40">
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(198,255,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(198,255,0,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="absolute top-3 left-4 w-28 h-20 rounded-lg border border-lime-400/30 bg-lime-400/5 p-2">
            <div className="text-[7px] font-mono text-lime-400 mb-1">FLOWCHART</div>
            <div className="flex items-center gap-1"><div className="w-8 h-3 rounded bg-lime-400/20" /><div className="w-px h-3 bg-lime-400/30" /><div className="w-8 h-3 rounded bg-white/10" /></div>
          </div>
          <div className="absolute top-6 right-6 w-28 h-20 rounded-lg border border-white/15 bg-white/5 p-2">
            <div className="text-[7px] font-mono text-white/40 mb-1">DATABASE ERD</div>
            <div className="space-y-0.5"><div className="w-full h-2 rounded bg-white/10" /><div className="w-3/4 h-2 rounded bg-white/10" /><div className="w-2/3 h-2 rounded bg-white/10" /></div>
          </div>
          <div className="absolute bottom-3 left-1/3 w-28 h-20 rounded-lg border border-white/15 bg-white/5 p-2">
            <div className="text-[7px] font-mono text-white/40 mb-1">UI WIREFRAME</div>
            <div className="flex gap-1"><div className="w-6 h-3 rounded bg-white/10" /><div className="flex-1 space-y-0.5"><div className="h-1.5 rounded bg-white/10" /><div className="h-1.5 rounded bg-white/10" /></div></div>
          </div>
        </div>
      </div>
      <p className="text-center text-[10px] font-mono text-white/30">vaporspace.world</p>
    </div>
  );
}

function Slide2() {
  return (
    <div className="relative w-full h-full bg-[#0A0C10] flex flex-col p-8 sm:p-12">
      <Logo />
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-1 leading-tight">Select a region. Type a prompt.</h2>
        <h2 className="text-2xl sm:text-4xl font-bold text-lime-400 mb-6 leading-tight" style={{ textShadow: '0 0 30px rgba(198,255,0,0.3)' }}>AI builds it.</h2>
        <div className="relative w-full max-w-xl h-44 rounded-xl border border-white/10 overflow-hidden bg-black/40">
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(198,255,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(198,255,0,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/90 border border-lime-400/30 rounded-lg px-3 py-1.5">
            <span className="text-lime-400 text-[10px]">✦</span>
            <span className="text-[10px] font-mono text-white/80">Design a user authentication flow</span>
          </div>
          <div className="absolute top-12 left-8 w-44 h-24 border-2 border-dashed border-lime-400/60 bg-lime-400/5 rounded-lg p-2">
            <div className="text-[7px] font-mono text-lime-400 mb-1.5">FLOWCHART</div>
            <div className="space-y-1">
              <div className="flex items-center gap-1"><div className="px-1.5 py-0.5 rounded bg-lime-400/15 border border-lime-400/30 text-[7px] font-mono text-lime-400">Start</div><div className="w-3 h-px bg-lime-400/40" /><div className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-[7px] font-mono text-white/60">Login</div></div>
              <div className="flex items-center gap-1 ml-3"><div className="w-3 h-px bg-lime-400/40" /><div className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-[7px] font-mono text-white/60">Validate</div></div>
              <div className="flex items-center gap-1 ml-6"><div className="w-3 h-px bg-lime-400/40" /><div className="px-1.5 py-0.5 rounded bg-lime-400/15 border border-lime-400/30 text-[7px] font-mono text-lime-400">Token ✓</div></div>
            </div>
          </div>
          <div className="absolute bottom-3 right-4 text-[8px] font-mono text-lime-400/50">✓ Generated in 3.2s</div>
        </div>
      </div>
      <p className="text-center text-[10px] font-mono text-white/30">11 content types · AI-powered · Infinite canvas</p>
    </div>
  );
}

function Slide3() {
  const TYPES = [
    { icon: '◈', label: 'Flowcharts' }, { icon: '▤', label: 'Database ERDs' }, { icon: '▣', label: 'UI Wireframes' }, { icon: '▦', label: 'Landing Pages' },
    { icon: '◧', label: 'Presentations' }, { icon: '⚡', label: 'Tech Stacks' }, { icon: '#', label: 'Pseudocode' }, { icon: '◆', label: 'Ad Creatives' },
    { icon: '✧', label: 'Images' }, { icon: '≡', label: 'Text Notes' }, { icon: '▶', label: 'Video Ads' },
  ];
  return (
    <div className="relative w-full h-full bg-[#0A0C10] flex flex-col p-8 sm:p-12">
      <Logo />
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-1 leading-tight">11 content types.</h2>
        <h2 className="text-2xl sm:text-4xl font-bold text-lime-400 mb-6 leading-tight" style={{ textShadow: '0 0 30px rgba(198,255,0,0.3)' }}>One canvas.</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 max-w-lg">
          {TYPES.map((t) => (
            <div key={t.label} className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg border border-white/10 bg-white/[0.03]">
              <span className="text-lg text-lime-400">{t.icon}</span>
              <span className="text-[8px] font-mono text-white/50 text-center leading-tight">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-[10px] font-mono text-white/30">Generate with AI or create manually</p>
    </div>
  );
}

function Slide4() {
  return (
    <div className="relative w-full h-full bg-[#0A0C10] flex flex-col p-8 sm:p-12">
      <Logo />
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-1 leading-tight">Share your workspace.</h2>
        <h2 className="text-2xl sm:text-4xl font-bold text-lime-400 mb-6 leading-tight" style={{ textShadow: '0 0 30px rgba(198,255,0,0.3)' }}>Like. Clone. Explore.</h2>
        <div className="flex items-center gap-4 sm:gap-6 mb-4">
          {[{ label: 'Like', icon: '♥', count: '42' }, { label: 'Clone', icon: '⑂', count: '18' }, { label: 'Explore', icon: '◎', count: '100+' }].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 rounded-xl border border-lime-400/20 bg-lime-400/5 flex items-center justify-center"><span className="text-lg text-lime-400">{item.icon}</span></div>
              <span className="text-[9px] font-mono text-white/50">{item.label}</span>
              <span className="text-xs font-mono font-bold text-lime-400">{item.count}</span>
            </div>
          ))}
        </div>
        <p className="text-[11px] font-mono text-white/40">Others discover, like & clone your work</p>
      </div>
      <p className="text-center text-[10px] font-mono text-white/30">Community templates · Fork tracking</p>
    </div>
  );
}

function Slide5() {
  return (
    <div className="relative w-full h-full bg-[#0A0C10] flex flex-col p-8 sm:p-12">
      <Logo />
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-1 leading-tight">Built by a student.</h2>
        <h2 className="text-2xl sm:text-4xl font-bold text-lime-400 mb-6 leading-tight" style={{ textShadow: '0 0 30px rgba(198,255,0,0.3)' }}>Made for builders.</h2>
        <p className="text-sm text-white/50 max-w-md leading-relaxed mb-4">I'm a uni student building VaporSpace to support myself through school. If you find it useful, your support means the world.</p>
        <div className="text-2xl mb-3">💚</div>
        <p className="text-sm font-mono text-lime-400" style={{ textShadow: '0 0 20px rgba(198,255,0,0.2)' }}>vaporspace.world</p>
      </div>
      <p className="text-center text-[10px] font-mono text-white/30">Try it free · Demo mode available</p>
    </div>
  );
}

const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5];
const SLIDE_DURATIONS = [12000, 15000, 12000, 10000, 11000];

async function recordSlideshow(canvases, durations) {
  const canvas = document.createElement('canvas');
  canvas.width = 1270; canvas.height = 760;
  const ctx = canvas.getContext('2d');
  const stream = canvas.captureStream(30);
  const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ? 'video/webm;codecs=vp9' : 'video/webm';
  const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 5000000 });
  const chunks = [];
  return new Promise((resolve) => {
    recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
    recorder.onstop = () => resolve(new Blob(chunks, { type: 'video/webm' }));
    recorder.start();
    let i = 0;
    const drawNext = () => {
      if (i >= canvases.length) { setTimeout(() => recorder.stop(), 300); return; }
      ctx.fillStyle = '#0A0C10'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (canvases[i]) ctx.drawImage(canvases[i], 0, 0, canvas.width, canvas.height);
      setTimeout(() => { i++; drawNext(); }, durations[i] || 3000);
    };
    drawNext();
  });
}

export default function GallerySlides() {
  const [index, setIndex] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [status, setStatus] = useState('');
  const slideRef = useRef(null);
  const Current = SLIDES[index];

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const zip = new JSZip();
      const slideCanvases = [];
      for (let i = 0; i < SLIDES.length; i++) {
        setStatus(`Capturing slide ${i + 1} of ${SLIDES.length}…`);
        setIndex(i);
        await new Promise(r => setTimeout(r, 1200));
        if (slideRef.current) {
          const canvas = await html2canvas(slideRef.current, { backgroundColor: '#0A0C10', scale: 2, useCORS: true, logging: false });
          slideCanvases.push(canvas);
          const dataUrl = canvas.toDataURL('image/png');
          zip.file(`vaporspace-slide-${i + 1}.png`, dataUrl.split(',')[1], { base64: true });
        }
      }
      setStatus('Recording video…');
      const videoBlob = await recordSlideshow(slideCanvases, SLIDE_DURATIONS);
      zip.file('vaporspace-explainer.webm', videoBlob);
      setStatus('Packaging ZIP…');
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url; a.download = 'vaporspace-launch-assets.zip'; a.click();
      URL.revokeObjectURL(url);
      setStatus('');
    } catch (e) {
      console.error(e);
      setStatus('Download failed — try screenshotting slides manually');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Camera size={14} className="text-lime-400" />
          <span className="text-[10px] font-mono font-bold tracking-wider text-white/60">PRODUCT HUNT GALLERY · 5 SLIDES</span>
        </div>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-1.5 rounded-lg border border-lime-400/30 bg-lime-400/10 px-3 py-1.5 text-[10px] font-mono font-bold text-lime-400 hover:bg-lime-400/20 transition-colors disabled:opacity-50"
        >
          {downloading ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
          {downloading ? (status || 'Working…') : 'Download All (ZIP)'}
        </button>
      </div>
      <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <div ref={slideRef} className="aspect-[16/9]">
          <Current />
        </div>
        <button onClick={() => setIndex(i => (i - 1 + SLIDES.length) % SLIDES.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-black/90 hover:border-lime-400/40 transition-colors z-10">
          <ChevronLeft size={18} />
        </button>
        <button onClick={() => setIndex(i => (i + 1) % SLIDES.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-black/90 hover:border-lime-400/40 transition-colors z-10">
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-lime-400' : 'w-1.5 bg-white/20 hover:bg-white/40'}`} />
        ))}
      </div>
      <p className="text-center text-[10px] font-mono text-white/30 mt-3">
        Slide {index + 1} of {SLIDES.length} · ZIP includes 5 PNGs + 1min WebM video
      </p>
    </div>
  );
}