import React, { useEffect, useState, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import SEO from '@/components/SEO';
import CanvasHeader from '@/components/canvas/CanvasHeader';
import CanvasBoard from '@/components/canvas/CanvasBoard';
import TopUpModal from '@/components/canvas/TopUpModal';
import AdRewardModal from '@/components/canvas/AdRewardModal';
import OnboardingTutorial from '@/components/onboarding/OnboardingTutorial';
import ManualContentModal from '@/components/canvas/ManualContentModal';
import ShareModal from '@/components/canvas/ShareModal';
import ChatSidebar from '@/components/canvas/ChatSidebar';
import { demoPayload, starterElements } from '@/components/canvas/demoContent';
import { generateLiveContent } from '@/lib/generateContent';
import { generateClaudeCodePrompt } from '@/lib/generateClaudeCodePrompt';
import { useTheme } from '@/hooks/useTheme';
import ProductHuntBadge from '@/components/ProductHuntBadge';

const initialView = { zoom: 0.8, panX: 40, panY: 40 };
const COSTS = { text_note: 1, flowchart: 2, database_erd: 2, ui_wireframe: 3, image: 5, landing_page: 4, presentation: 4, ad_creative: 3, video_ad: 50, tech_stack: 2, pseudocode: 2 };

export default function Home() {
  const [user, setUser] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [canvases, setCanvases] = useState([]);
  const [title, setTitle] = useState('My Amazing Workspace');
  const [elements, setElements] = useState([]);
  const [viewport, setViewport] = useState(initialView);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('demo');
  const [balance, setBalance] = useState(50);
  const [planTier, setPlanTier] = useState('free');
  const [actualRole, setActualRole] = useState('user');
  const [testRole, setTestRole] = useState(null);
  const [showTopUp, setShowTopUp] = useState(false);
  const [showAdReward, setShowAdReward] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [manualType, setManualType] = useState(null);
  const [manualSelection, setManualSelection] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);
  const fileInputRef = useRef(null);
  const { theme, toggle: toggleTheme } = useTheme();
  const isAdmin = actualRole === 'admin';
  const effectiveRole = testRole || actualRole;
  const effIsAdmin = effectiveRole === 'admin';

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const me = await base44.auth.me();
        if (!active) return;
        const initBalance = me.credit_balance ?? 50;
        const initMode = me.mode_preference || 'demo';
        const initPlan = me.plan_tier || 'free';
        setUser(me);
        setBalance(initBalance);
        setMode(initMode);
        setPlanTier(initPlan);
        setActualRole(me.role || 'user');

        if (me.credit_balance == null) {
          await base44.auth.updateMe({ credit_balance: 50, plan_tier: 'free', mode_preference: 'demo' });
        }

        if (active) setShowOnboarding(!me.onboarding_completed);

        let records = await base44.entities.Canvases.filter({ user_id: me.id }, '-created_date', 100);

        const pendingJson = localStorage.getItem('pendingTemplate');
        if (pendingJson) {
          localStorage.removeItem('pendingTemplate');
          const tpl = JSON.parse(pendingJson);
          const created = await base44.entities.Canvases.create({ user_id: me.id, title: tpl.name, viewport_state: initialView });
          const tplElements = await base44.entities.CanvasElements.bulkCreate(tpl.elements.map(el => ({ ...el, canvas_id: created.id })));
          if (active) {
            setCanvases([created, ...records]);
            setCanvas(created); setTitle(created.title); setViewport(initialView); setElements(tplElements);
            setTimeout(() => { if (active) fitView(tplElements); }, 50);
          }
          if (active) setLoading(false);
          return;
        }

        if (active) setCanvases(records);
        let current = records[0];
        let loadedElements = [];
        if (!current) {
          current = await base44.entities.Canvases.create({ user_id: me.id, title: 'My Amazing Workspace', viewport_state: initialView });
          const samples = await base44.entities.CanvasElements.bulkCreate(
            starterElements.map(item => ({ ...item, canvas_id: current.id }))
          );
          loadedElements = samples;
          if (active) setElements(samples);
        } else {
          const items = await base44.entities.CanvasElements.filter({ canvas_id: current.id }, 'z_index', 500);
          loadedElements = items;
          if (active) setElements(items);
        }
        if (active) {
          setCanvas(current);
          setTitle(current.title);
          setViewport(current.viewport_state || initialView);
          if (loadedElements.length) {
            setTimeout(() => { if (active) fitView(loadedElements); }, 50);
          }
        }
      } catch (e) {
        if (active) setError(e.message || 'Could not open your workspace.');
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!canvas) return;
    const timer = setTimeout(() => {
      base44.entities.Canvases.update(canvas.id, { viewport_state: viewport }).catch(() => {});
    }, 750);
    return () => clearTimeout(timer);
  }, [viewport, canvas?.id]);

  const fitView = (elementsList) => {
    if (!elementsList?.length) return;
    const chatWidth = window.innerWidth >= 640 && chatOpen ? 320 : 0;
    const vw = window.innerWidth - chatWidth;
    const vh = window.innerHeight - 100;
    const minX = Math.min(...elementsList.map(e => e.x_pos));
    const minY = Math.min(...elementsList.map(e => e.y_pos));
    const maxX = Math.max(...elementsList.map(e => e.x_pos + e.width));
    const maxY = Math.max(...elementsList.map(e => e.y_pos + e.height));
    const padding = 80;
    const zoom = Math.min(
      (vw - padding * 2) / (maxX - minX),
      (vh - padding * 2) / (maxY - minY),
      1.2
    );
    setViewport({
      zoom,
      panX: vw / 2 - ((minX + maxX) / 2) * zoom,
      panY: vh / 2 - ((minY + maxY) / 2) * zoom,
    });
  };

  const saveTitle = async (newTitle) => {
    const t = (newTitle ?? '').trim();
    if (!canvas || !t || t === canvas.title) return;
    try {
      const updated = await base44.entities.Canvases.update(canvas.id, { title: t });
      setCanvas(updated);
      setTitle(updated.title);
      setCanvases(prev => prev.map(c => c.id === updated.id ? updated : c));
    } catch (e) { setError(e.message); }
  };

  const selectCanvas = async (id) => {
    const target = canvases.find(c => c.id === id);
    if (!target) return;
    setCanvas(target);
    setTitle(target.title);
    setViewport(target.viewport_state || initialView);
    try {
      const items = await base44.entities.CanvasElements.filter({ canvas_id: id }, 'z_index', 500);
      setElements(items);
    } catch { setElements([]); }
  };

  const createCanvas = async (name) => {
    try {
      const created = await base44.entities.Canvases.create({ user_id: user.id, title: name, viewport_state: initialView });
      setCanvases(prev => [created, ...prev]);
      setCanvas(created);
      setTitle(created.title);
      setViewport(initialView);
      setElements([]);
    } catch (e) { setError(e.message); }
  };

  const deleteCanvas = async (id) => {
    try {
      await base44.entities.CanvasElements.deleteMany({ canvas_id: id });
      await base44.entities.Canvases.delete(id);
      const remaining = canvases.filter(c => c.id !== id);
      setCanvases(remaining);
      if (canvas?.id === id) {
        if (remaining.length > 0) {
          await selectCanvas(remaining[0].id);
        } else {
          const created = await base44.entities.Canvases.create({ user_id: user.id, title: 'My Amazing Workspace', viewport_state: initialView });
          setCanvases([created]);
          setCanvas(created);
          setTitle(created.title);
          setViewport(initialView);
          setElements([]);
        }
      }
    } catch (e) { setError(e.message); }
  };

  const handleShare = async (shareData) => {
    try {
      const elementsData = elements.map(e => ({
        type: e.type, x_pos: e.x_pos, y_pos: e.y_pos, width: e.width, height: e.height, z_index: e.z_index, payload: e.payload,
      }));
      await base44.entities.SharedWorkspaces.create({
        title: shareData.title || title,
        description: shareData.description || '',
        author_name: user?.full_name || user?.email || 'Anonymous',
        canvas_title: title,
        visibility: shareData.visibility || 'public',
        elements_data: JSON.stringify(elementsData),
        tags: shareData.tags || [],
        fork_count: 0,
        like_count: 0,
      });
      setShowShare(false);
      setError('Workspace shared! View it in Explore.');
    } catch (e) {
      setError(e.message || 'Could not share workspace.');
    }
  };

  const handleManualChoose = (type, selection) => {
    setManualType(type);
    setManualSelection(selection);
  };

  const handleManualSubmit = async (payload) => {
    const sel = manualSelection;
    const type = manualType;
    setManualType(null);
    setManualSelection(null);
    if (!canvas || !sel) return;
    try {
      const element = await base44.entities.CanvasElements.create({
        canvas_id: canvas.id,
        type,
        x_pos: sel.x,
        y_pos: sel.y,
        width: Math.max(sel.width, type === 'database_erd' || type === 'landing_page' ? 390 : 260),
        height: Math.max(sel.height, type === 'presentation' || type === 'video_ad' ? 260 : 180),
        z_index: elements.length + 1,
        payload,
      });
      setElements(items => [...items, element]);
    } catch (e) {
      setError(e.message || 'Could not create element.');
    }
  };

  const handleGenerate = async (type, prompt, selection) => {
    if (type === 'video_ad' && !effIsAdmin && mode === 'live' && balance < 500) {
      setError('Video generation requires at least 500 credits.');
      setShowTopUp(true);
      return;
    }
    const cost = (mode === 'live' && !effIsAdmin) ? (COSTS[type] || 1) : 0;
    if (mode === 'live' && !effIsAdmin && balance < cost) {
      setShowTopUp(true);
      return;
    }
    setBusy(true);
    setError('');
    try {
      let payload;
      if (mode === 'live') {
        payload = await generateLiveContent(type, prompt);
      } else {
        payload = { ...demoPayload[type], title: prompt || demoPayload[type].title };
      }
      const element = await base44.entities.CanvasElements.create({
        canvas_id: canvas.id,
        type,
        x_pos: selection.x,
        y_pos: selection.y,
        width: Math.max(selection.width, type === 'database_erd' || type === 'landing_page' ? 390 : 260),
        height: Math.max(selection.height, type === 'presentation' || type === 'video_ad' ? 260 : 180),
        z_index: elements.length + 1,
        payload,
      });
      setElements(items => [...items, element]);
      if (mode === 'live' && !effIsAdmin) {
        const newBalance = balance - cost;
        setBalance(newBalance);
        try { await base44.auth.updateMe({ credit_balance: newBalance }); } catch {}
      }
    } catch (e) {
      setError(e.message || 'Generation failed. Try again.');
    } finally {
      setBusy(false);
    }
  };

  const handleRegenerate = async (id, type, originalPrompt, improvement) => {
    const cost = (mode === 'live' && !effIsAdmin) ? (COSTS[type] || 1) : 0;
    if (mode === 'live' && !effIsAdmin && balance < cost) { setShowTopUp(true); return; }
    setBusy(true);
    setError('');
    try {
      const combinedPrompt = improvement ? `${originalPrompt} — Improvement: ${improvement}` : originalPrompt;
      let payload;
      if (mode === 'live') {
        payload = await generateLiveContent(type, combinedPrompt);
      } else {
        payload = { ...demoPayload[type], title: combinedPrompt };
      }
      const updated = await base44.entities.CanvasElements.update(id, { payload });
      setElements(items => items.map(e => e.id === id ? updated : e));
      if (mode === 'live' && !effIsAdmin) {
        const newBalance = balance - cost;
        setBalance(newBalance);
        try { await base44.auth.updateMe({ credit_balance: newBalance }); } catch {}
      }
    } catch (e) {
      setError(e.message || 'Regeneration failed.');
    } finally {
      setBusy(false);
    }
  };

  const handleChatGenerate = async (types, prompt) => {
    setBusy(true);
    setError('');
    const list = Array.isArray(types) ? types : [types];
    const cols = Math.min(list.length, 2);
    const colWidth = 300, rowHeight = 180, gap = 48;
    const startX = 120 + (elements.length % 3) * 60;
    const startY = 120 + (elements.length % 3) * 60;
    let currentBalance = balance;
    const positions = [];
    for (let i = 0; i < list.length; i++) {
      const type = list[i];
      if (type === 'video_ad' && !effIsAdmin && mode === 'live' && currentBalance < 500) {
        setError('Video generation requires at least 500 credits.');
        setShowTopUp(true);
        break;
      }
      const cost = (mode === 'live' && !effIsAdmin) ? (COSTS[type] || 1) : 0;
      if (mode === 'live' && !effIsAdmin && currentBalance < cost) { setShowTopUp(true); break; }
      const col = i % cols, row = Math.floor(i / cols);
      const w = Math.max(colWidth, type === 'database_erd' || type === 'landing_page' ? 390 : 260);
      const h = Math.max(rowHeight, type === 'presentation' || type === 'video_ad' ? 260 : 180);
      try {
        let payload;
        if (mode === 'live') {
          payload = await generateLiveContent(type, prompt);
        } else {
          payload = { ...demoPayload[type], title: prompt || demoPayload[type]?.title || prompt };
        }
        const element = await base44.entities.CanvasElements.create({
          canvas_id: canvas.id,
          type,
          x_pos: startX + col * (colWidth + gap),
          y_pos: startY + row * (rowHeight + gap),
          width: w,
          height: h,
          z_index: elements.length + i + 1,
          payload,
        });
        setElements(items => [...items, element]);
        positions.push({ x: element.x_pos, y: element.y_pos, width: w, height: h });
        if (mode === 'live' && !effIsAdmin) currentBalance -= cost;
      } catch (e) {
        setError(e.message || 'Generation failed.');
      }
    }
    if (mode === 'live' && !effIsAdmin) {
      setBalance(currentBalance);
      try { await base44.auth.updateMe({ credit_balance: currentBalance }); } catch {}
    }
    setBusy(false);
    return positions;
  };

  const handleChatMessage = async () => {
    if (mode !== 'live' || effIsAdmin) return true;
    if (balance < 1) { setShowTopUp(true); return false; }
    const newBalance = balance - 1;
    setBalance(newBalance);
    try { await base44.auth.updateMe({ credit_balance: newBalance }); } catch {}
    return true;
  };

  const handleLocate = (positions) => {
    if (!positions?.length) return;
    const minX = Math.min(...positions.map(p => p.x));
    const minY = Math.min(...positions.map(p => p.y));
    const maxX = Math.max(...positions.map(p => p.x + (p.width || 300)));
    const maxY = Math.max(...positions.map(p => p.y + (p.height || 250)));
    const chatWidth = window.innerWidth >= 640 && chatOpen ? 320 : 0;
    const vw = window.innerWidth - chatWidth;
    const vh = window.innerHeight - 100;
    const padding = 80;
    const zoom = Math.min(
      (vw - padding * 2) / (maxX - minX),
      (vh - padding * 2) / (maxY - minY),
      1.2
    );
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    setViewport({
      zoom,
      panX: vw / 2 - centerX * zoom,
      panY: vh / 2 - centerY * zoom,
    });
  };

  const move = async (id, x_pos, y_pos) => {
    setElements(items => items.map(item => (item.id === id ? { ...item, x_pos, y_pos } : item)));
    try { await base44.entities.CanvasElements.update(id, { x_pos, y_pos }); } catch (e) { setError(e.message); }
  };

  const resize = async (id, width, height) => {
    setElements(items => items.map(item => (item.id === id ? { ...item, width, height } : item)));
    try { await base44.entities.CanvasElements.update(id, { width, height }); } catch (e) { setError(e.message); }
  };

  const edit = async (id, payloadUpdate) => {
    const element = elements.find(e => e.id === id);
    if (!element) return;
    const updatedPayload = { ...element.payload, ...payloadUpdate };
    setElements(items => items.map(item => (item.id === id ? { ...item, payload: updatedPayload } : item)));
    try { await base44.entities.CanvasElements.update(id, { payload: updatedPayload }); } catch (e) { setError(e.message); }
  };

  const remove = async (id) => {
    try {
      await base44.entities.CanvasElements.delete(id);
      setElements(items => items.filter(item => item.id !== id));
    } catch (e) { setError(e.message); }
  };

  const handleModeToggle = async (newMode) => {
    setMode(newMode);
    try { await base44.auth.updateMe({ mode_preference: newMode }); } catch {}
  };

  const handleResetCredits = () => {
    setError('');
  };

  const handlePurchase = async (plan, txHash) => {
    const newBalance = plan === 'topup' ? balance + 500 : balance + 1000;
    setBalance(newBalance);
    if (plan === 'pro') setPlanTier('pro');
    try { await base44.auth.updateMe({ credit_balance: newBalance, plan_tier: plan === 'pro' ? 'pro' : planTier, last_tx_hash: txHash }); } catch {}
    setShowTopUp(false);
  };

  const handleAdReward = async (credits) => {
    const newBalance = balance + credits;
    setBalance(newBalance);
    try { await base44.auth.updateMe({ credit_balance: newBalance }); } catch {}
  };

  const handleOnboardingComplete = async () => {
    setShowOnboarding(false);
    try { await base44.auth.updateMe({ onboarding_completed: true }); } catch {}
  };

  const handleExportPRD = () => {
    const data = {
      canvas: { title, viewport_state: viewport },
      elements: elements.map(e => ({
        type: e.type, payload: e.payload,
      })),
    };
    const prompt = generateClaudeCodePrompt(data);
    navigator.clipboard.writeText(prompt).then(() => {
      setError('PRD copied to clipboard — paste into Claude Code, Cursor, or v0.');
    }).catch(() => {
      setError('Could not copy to clipboard.');
    });
  };

  const handleExport = () => {
    const data = {
      canvas: { title, viewport_state: viewport },
      elements: elements.map(e => ({
        type: e.type, x_pos: e.x_pos, y_pos: e.y_pos, width: e.width, height: e.height, z_index: e.z_index, payload: e.payload,
      })),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(title || 'workspace').replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (data.elements?.length) {
        await base44.entities.CanvasElements.deleteMany({ canvas_id: canvas.id });
        const newElements = await base44.entities.CanvasElements.bulkCreate(
          data.elements.map(el => ({ ...el, canvas_id: canvas.id }))
        );
        setElements(newElements);
      }
      if (data.canvas?.viewport_state) setViewport(data.canvas.viewport_state);
      setError('');
    } catch (err) {
      setError(err.message || 'Import failed.');
    }
    e.target.value = '';
  };

  if (loading) return <div className="h-screen bg-background text-muted-foreground flex items-center justify-center"><div className="animate-pulse text-sm">Opening VaporSpace…</div></div>;
  if (error && !canvas) return <div className="h-screen bg-background text-foreground flex items-center justify-center p-8 text-sm">{error}</div>;

  return (
    <div className="h-[100dvh] flex flex-col bg-background text-foreground overflow-hidden">
      <SEO title="VaporSpace | Infinite Spatial AI Canvas & System Architect" description="Design system architectures, database ERDs, flowcharts, UI wireframes, and tech stacks on an infinite spatial AI canvas. Generate diagrams, landing pages, presentations, and video ads with AI." path="/" />
      <CanvasHeader
        canvases={canvases}
        canvas={canvas}
        saveTitle={saveTitle}
        onSelectCanvas={selectCanvas}
        onCreateCanvas={createCanvas}
        onDeleteCanvas={deleteCanvas}
        zoom={viewport.zoom}
        setZoom={zoom => setViewport(v => ({ ...v, zoom: Math.max(.1, Math.min(5, zoom)) }))}
        resetView={() => setViewport(initialView)}
        balance={balance}
        mode={mode}
        onModeToggle={handleModeToggle}
        onResetCredits={handleResetCredits}
        onTopUp={() => setShowTopUp(true)}
        onLogout={() => base44.auth.logout('/login')}
        theme={theme}
        onToggleTheme={toggleTheme}
        chatOpen={chatOpen}
        onToggleChat={() => setChatOpen(!chatOpen)}
        isAdmin={isAdmin}
        effectiveRole={effectiveRole}
        onRoleChange={setTestRole}
        onShare={() => setShowShare(true)}
        onExport={handleExport}
        onExportPRD={handleExportPRD}
        onImport={() => fileInputRef.current?.click()}
        onAdReward={() => setShowAdReward(true)}
      />
      <input type="file" accept=".json" ref={fileInputRef} className="hidden" onChange={handleImport} />
      {error && (
        <div role="alert" className="absolute z-50 top-20 left-1/2 -translate-x-1/2 rounded-lg bg-destructive/20 border border-destructive/40 text-destructive text-xs px-4 py-2 cursor-pointer" onClick={() => setError('')}>
          {error} · Tap to dismiss
        </div>
      )}
      <div className="flex flex-1 overflow-hidden">
        <CanvasBoard
          elements={elements}
          viewport={viewport}
          setViewport={setViewport}
          onGenerate={handleGenerate}
          onManualChoose={handleManualChoose}
          onRegenerate={handleRegenerate}
          onMove={move}
          onEdit={edit}
          onDelete={remove}
          onResize={resize}
          busy={busy}
          mode={mode}
        />
        <ChatSidebar
          open={chatOpen}
          onToggle={() => setChatOpen(!chatOpen)}
          onGenerate={handleChatGenerate}
          onChatMessage={handleChatMessage}
          onLocate={handleLocate}
          busy={busy}
          mode={mode}
          isAdmin={effIsAdmin}
        />
      </div>
      <TopUpModal
        open={showTopUp}
        onClose={() => setShowTopUp(false)}
        mode={mode}
        onPurchase={handlePurchase}
        onAdReward={() => { setShowTopUp(false); setShowAdReward(true); }}
      />
      <AdRewardModal
        open={showAdReward}
        onClose={() => setShowAdReward(false)}
        onReward={handleAdReward}
      />
      <ShareModal
        open={showShare}
        onClose={() => setShowShare(false)}
        onShare={handleShare}
        defaultTitle={title}
      />
      {manualType && (
        <ManualContentModal
          type={manualType}
          onClose={() => { setManualType(null); setManualSelection(null); }}
          onSubmit={handleManualSubmit}
        />
      )}
      {showOnboarding && <OnboardingTutorial onComplete={handleOnboardingComplete} />}
      <footer className="shrink-0 border-t border-border bg-background/95 px-4 py-2 flex items-center justify-center gap-4 text-[10px] font-mono text-muted-foreground">
        <span>© {new Date().getFullYear()} VaporSpace</span>
        <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
        <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
        <a href="/cookies" className="hover:text-foreground transition-colors">Cookies</a>
        <ProductHuntBadge size="small" />
      </footer>
    </div>
  );
}