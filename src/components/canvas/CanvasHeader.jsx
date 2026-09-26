import React from 'react';
import { Plus, Minus, Crosshair, LogOut, Sun, Moon, MessageSquare, Download, Upload, Shield, Gift, ShieldCheck, Share2, Globe, FileCode2 } from 'lucide-react';
import Logo from '@/components/Logo';
import WorkspaceSwitcher from './WorkspaceSwitcher';

export default function CanvasHeader({ canvases, canvas, saveTitle, onSelectCanvas, onCreateCanvas, onDeleteCanvas, zoom, setZoom, resetView, balance, mode, onModeToggle, onTopUp, onLogout, theme, onToggleTheme, chatOpen, onToggleChat, isAdmin, onExport, onImport, onAdReward, effectiveRole, onRoleChange, onShare, onExportPRD }) {
  return (
    <header className="z-40 relative flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 md:px-7 py-2.5 sm:py-3 border-b border-border bg-background/95 backdrop-blur-xl">
      <div className="flex items-center gap-3 min-w-0">
        <Logo className="w-9 h-9" />
        <div className="min-w-0" data-tour="workspace">
          <div className="text-[10px] uppercase tracking-[.26em] text-primary font-bold font-mono">VAPORSPACE</div>
          <WorkspaceSwitcher
            canvases={canvases}
            currentCanvas={canvas}
            onSelect={onSelectCanvas}
            onCreate={onCreateCanvas}
            onRename={saveTitle}
            onDelete={onDeleteCanvas}
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto sm:overflow-visible">
        <div data-tour="mode" className="flex items-center rounded-lg border border-border bg-card p-0.5">
          <button
            onClick={() => onModeToggle('demo')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold font-mono tracking-wider transition-colors ${mode === 'demo' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            DEMO
          </button>
          <button
            onClick={() => onModeToggle('live')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold font-mono tracking-wider transition-colors ${mode === 'live' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            LIVE
          </button>
        </div>

        {effectiveRole === 'admin' ? (
          <span data-tour="credits" className="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-mono font-bold text-primary">
            <Shield size={12} /> ADMIN
          </span>
        ) : mode === 'demo' ? (
          <span data-tour="credits" className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-mono text-foreground/70">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Free
          </span>
        ) : (
          <button
            data-tour="credits"
            onClick={onTopUp}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-mono text-foreground/70 hover:text-foreground transition-colors"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${balance > 0 ? 'bg-primary' : 'bg-destructive'}`} />
            <span className="tabular-nums font-medium">{balance}</span>
            <span className="text-muted-foreground">cr</span>
          </button>
        )}

        {effectiveRole !== 'admin' && (
          <button title="Watch ad for +3 free credits" onClick={onAdReward} className="p-2.5 rounded-lg border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 transition-colors">
            <Gift size={15} />
          </button>
        )}

        {isAdmin && (
          <div className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-dashed border-primary/40 bg-primary/5 px-2.5 py-1.5 text-xs font-mono">
            <ShieldCheck size={12} className="text-primary" />
            <span className="text-[10px] text-muted-foreground">TEST:</span>
            <select
              value={effectiveRole}
              onChange={e => onRoleChange(e.target.value)}
              className="bg-transparent outline-none cursor-pointer text-xs font-mono text-foreground/70 font-medium"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        )}

        <div className="flex items-center border border-border bg-card rounded-lg">
          <button data-tour="share" title="Share workspace" onClick={onShare} className="p-2.5 text-primary hover:bg-primary/10 transition-colors border-r border-border">
            <Share2 size={15} />
          </button>
          <a href="/explore" title="Explore shared workspaces" className="p-2.5 text-muted-foreground hover:text-foreground transition-colors border-r border-border">
            <Globe size={15} />
          </a>
          <button data-tour="export" title="Export workspace" onClick={onExport} className="hidden sm:block p-2.5 text-muted-foreground hover:text-foreground transition-colors border-r border-border">
            <Download size={15} />
          </button>
          <button title="Import workspace" onClick={onImport} className="hidden sm:block p-2.5 text-muted-foreground hover:text-foreground transition-colors border-r border-border">
            <Upload size={15} />
          </button>
          <button title="Export as PRD for Claude Code / Cursor" onClick={onExportPRD} className="p-2.5 text-primary hover:bg-primary/10 transition-colors">
            <FileCode2 size={15} />
          </button>
        </div>

        <div className="hidden sm:flex items-center border border-border bg-card rounded-lg">
          <button title="Zoom out" onClick={() => setZoom(zoom / 1.25)} className="p-2.5 text-muted-foreground hover:text-foreground transition-colors">
            <Minus size={15} />
          </button>
          <span className="text-xs w-11 text-center tabular-nums font-mono text-foreground/60">{Math.round(zoom * 100)}%</span>
          <button title="Zoom in" onClick={() => setZoom(zoom * 1.25)} className="p-2.5 text-muted-foreground hover:text-foreground transition-colors">
            <Plus size={15} />
          </button>
        </div>

        <button title="Reset view" onClick={resetView} className="hidden sm:block p-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors">
          <Crosshair size={16} />
        </button>
        <button data-tour="theme" title="Toggle theme" onClick={onToggleTheme} className="hidden sm:block p-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors">
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button data-tour="chat" title={chatOpen ? 'Close chat' : 'Open AI chat'} onClick={onToggleChat} className={`p-2.5 rounded-lg border transition-colors ${chatOpen ? 'border-primary text-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}>
          <MessageSquare size={16} />
        </button>
        <button title="Sign out" onClick={onLogout} className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors">
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}