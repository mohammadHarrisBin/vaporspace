import React, { useState, useRef, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { PanelRightClose, Send, Sparkles, Loader2, CheckCircle2, Paperclip, X } from 'lucide-react';
import { Image } from '@/components/ui/image';

const LOGO_URL = 'https://media.base44.com/images/public/6ab798703b59b4a0b372ea66/2c0f691d5_generated_e237616f.png';

const CONTENT_OPTIONS = [
  { type: 'image', label: 'Logo / Image', icon: '✧' },
  { type: 'ui_wireframe', label: 'UI Mockup', icon: '▣' },
  { type: 'flowchart', label: 'Flowchart', icon: '◈' },
  { type: 'database_erd', label: 'Database', icon: '▤' },
  { type: 'text_note', label: 'Notes', icon: '≡' },
  { type: 'landing_page', label: 'Landing Page', icon: '▦' },
  { type: 'presentation', label: 'Presentation', icon: '◧' },
  { type: 'ad_creative', label: 'Ad Creative', icon: '◆' },
  { type: 'tech_stack', label: 'Tech Stack', icon: '⚡' },
  { type: 'pseudocode', label: 'Pseudocode', icon: '#' },
  { type: 'video_ad', label: 'Video Ad', icon: '▶' },
];

function formatTime(ts) {
  if (!ts) return '';
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatSidebar({ open, onToggle, onGenerate, onChatMessage, onLocate, busy, mode, isAdmin }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hey! I can help you build out your workspace. Tell me what you want to create — e.g. "build me a company" or "create a fitness app".', ts: Date.now() },
  ]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [thinking, setThinking] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, suggestions, thinking]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await base44.integrations.Core.UploadPublicFile({ file });
      setAttachedFile({ name: file.name, url: result.file_url });
    } catch {
      setMessages(m => [...m, { role: 'assistant', text: 'Failed to upload file. Please try again.', ts: Date.now() }]);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const send = async () => {
    if ((!input.trim() && !attachedFile) || thinking) return;
    const userMsg = input.trim() || `Uploaded file: ${attachedFile?.name}`;

    if (mode === 'live' && !isAdmin && onChatMessage) {
      const ok = await onChatMessage();
      if (!ok) {
        setMessages(m => [...m,
          { role: 'user', text: userMsg, ts: Date.now() },
          { role: 'assistant', text: 'You need credits to use the AI chat in live mode. Top up your balance or switch to demo mode.', ts: Date.now() },
        ]);
        setInput('');
        setAttachedFile(null);
        return;
      }
    }

    setMessages(m => [...m, { role: 'user', text: userMsg, ts: Date.now() }]);
    setInput('');
    const fileContext = attachedFile;
    setAttachedFile(null);
    setThinking(true);
    setSuggestions([]);
    setSelected(new Set());

    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `The user said: "${userMsg}". You are an AI assistant in a spatial canvas workspace called VaporSpace. Suggest which content types to generate for this request. Available types: image (logos/visuals), ui_wireframe (UI mockups), flowchart (process flows), database_erd (database schemas), text_note (architecture notes), landing_page (HTML landing pages), presentation (slide decks), ad_creative (ad copy and creatives), tech_stack (technology stack recommendations), pseudocode (algorithm pseudocode), video_ad (video advertisements, requires 500 credits). Return JSON with "message" (your response to the user, friendly and concise) and "suggestions" (array of type strings from the available types, pick 2-5 relevant ones).`,
        file_urls: fileContext ? [fileContext.url] : undefined,
        response_json_schema: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            suggestions: { type: 'array', items: { type: 'string' } },
          },
        },
      });

      setMessages(m => [...m, { role: 'assistant', text: result.message, ts: Date.now() }]);
      setSuggestions(result.suggestions || []);
      setSelected(new Set(result.suggestions || []));
    } catch {
      setMessages(m => [...m, { role: 'assistant', text: 'Sorry, I had trouble processing that. Try again?', ts: Date.now() }]);
    } finally {
      setThinking(false);
    }
  };

  const toggle = (type) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const generate = async () => {
    if (selected.size === 0 || busy) return;
    const prompt = input || messages.filter(m => m.role === 'user').pop()?.text || 'Generated content';
    setSuggestions([]);
    setSelected(new Set());
    const positions = await onGenerate(Array.from(selected), prompt);
    if (positions?.length) {
      setMessages(m => [...m, { role: 'assistant', text: `✓ Completed! Generated ${positions.length} item${positions.length !== 1 ? 's' : ''} on your canvas. ${positions.length > 1 ? "I've centered the view on them." : "I've centered the view on it."}`, ts: Date.now() }]);
      onLocate?.(positions);
    }
  };

  if (!open) {
    return (
      <button
        onClick={onToggle}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-30 rounded-l-lg border border-r-0 border-border bg-card px-2 py-4 text-muted-foreground hover:text-primary transition-colors"
        title="Open AI chat"
      >
        <Sparkles size={18} />
      </button>
    );
  }

  return (
    <>
      <div className="sm:hidden fixed inset-0 bg-black/50 z-40" onClick={onToggle} />
      <aside className="fixed sm:relative inset-y-0 right-0 sm:inset-auto w-full sm:w-72 md:w-80 z-50 sm:z-auto shrink-0 border-l border-border bg-card flex flex-col h-full">
        <header className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2 min-w-0">
            <Image src={LOGO_URL} alt="VaporSpace" className="w-6 h-6 rounded shrink-0" fittingType="fill" />
            <span className="text-sm font-semibold text-foreground truncate">AI Assistant</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0 ${mode === 'live' ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'}`}>{isAdmin ? 'admin' : mode}</span>
          </div>
          <button onClick={onToggle} className="text-muted-foreground hover:text-foreground shrink-0" title="Close chat">
            <PanelRightClose size={18} />
          </button>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
              <span className="text-[10px] text-muted-foreground font-mono mb-0.5 px-1">
                {m.role === 'user' ? 'You' : 'AI'} · {formatTime(m.ts)}
              </span>
              <div className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${m.role === 'user' ? 'bg-primary text-primary-foreground' : m.text.startsWith('✓') ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-secondary text-secondary-foreground'}`}>
                {m.text.startsWith('✓') && <CheckCircle2 size={12} className="inline mr-1 -mt-0.5" />}
                {m.text}
              </div>
            </div>
          ))}
          {thinking && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 size={12} className="animate-spin" /> Thinking…
            </div>
          )}
          {suggestions.length > 0 && (
            <div className="space-y-2 pt-2">
              <p className="text-[11px] text-muted-foreground font-mono">Select what to generate:</p>
              <div className="grid grid-cols-2 gap-2">
                {CONTENT_OPTIONS.map(opt => (
                  <button
                    key={opt.type}
                    onClick={() => toggle(opt.type)}
                    className={`flex items-center gap-1.5 rounded-md border px-2.5 py-2 text-xs transition-colors ${selected.has(opt.type) ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background text-muted-foreground hover:text-foreground'}`}
                  >
                    <span>{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
              <button
                onClick={generate}
                disabled={selected.size === 0 || busy}
                className="w-full mt-2 rounded-md bg-primary text-primary-foreground py-2 text-xs font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-1.5"
              >
                {busy ? <><Loader2 size={12} className="animate-spin" /> Generating…</> : <><Send size={12} /> Generate {selected.size} item{selected.size !== 1 ? 's' : ''}</>}
              </button>
            </div>
          )}
        </div>

        <div className="border-t border-border p-3">
          {attachedFile && (
            <div className="mb-2 flex items-center gap-2 rounded-md border border-border bg-secondary px-2.5 py-1.5 text-xs">
              <Paperclip size={12} className="text-muted-foreground shrink-0" />
              <span className="truncate flex-1 text-foreground">{attachedFile.name}</span>
              <button onClick={() => setAttachedFile(null)} className="text-muted-foreground hover:text-destructive shrink-0">
                <X size={12} />
              </button>
            </div>
          )}
          <div className="flex gap-2">
            <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileUpload} />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors shrink-0"
              title="Attach file"
            >
              {uploading ? <Loader2 size={14} className="animate-spin" /> : <Paperclip size={14} />}
            </button>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') send(); }}
              placeholder="Describe what to build…"
              className="flex-1 min-w-0 bg-background border border-border rounded-md px-3 py-2 text-xs text-foreground outline-none focus:border-primary/40 placeholder:text-muted-foreground"
            />
            <button
              onClick={send}
              disabled={thinking || (!input.trim() && !attachedFile)}
              className="rounded-md bg-primary text-primary-foreground p-2 hover:bg-primary/90 disabled:opacity-50 transition-colors shrink-0"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}