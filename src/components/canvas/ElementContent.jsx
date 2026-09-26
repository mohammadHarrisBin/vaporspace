import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Image } from '@/components/ui/image';
import TechIcon from '@/components/TechIcon';
import PseudocodeBlock from '@/components/canvas/PseudocodeBlock';

const md = {
  h1: p => <h1 className="text-base font-bold text-foreground mb-2" {...p} />,
  h2: p => <h2 className="text-sm font-bold text-foreground mb-2" {...p} />,
  h3: p => <h3 className="text-sm font-semibold text-foreground mb-1" {...p} />,
  p: p => <p className="text-xs text-muted-foreground mb-2 leading-relaxed" {...p} />,
  li: p => <li className="text-xs text-muted-foreground ml-4 list-disc" {...p} />,
  ul: p => <ul className="space-y-1 mb-2" {...p} />,
  strong: p => <strong className="font-semibold text-foreground" {...p} />,
};

export default function ElementContent({ element }) {
  const [collapsed, setCollapsed] = useState({});
  const { type, payload = {} } = element;

  if (type === 'database_erd') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(payload.tables || []).map(table => (
          <div key={table.name} className="overflow-hidden rounded-md border border-border bg-background">
            <button onClick={() => setCollapsed(s => ({ ...s, [table.name]: !s[table.name] }))} className="w-full flex justify-between items-center px-3 py-2.5 text-left text-sm font-semibold text-foreground bg-secondary">
              <span>▤ &nbsp;{table.name}</span>
              <span className="text-muted-foreground font-mono">{collapsed[table.name] ? '+' : '−'}</span>
            </button>
            {!collapsed[table.name] && (
              <div className="divide-y divide-border">
                {table.fields.map(([name, kind, tag]) => (
                  <div key={name} className="flex items-center gap-2 px-3 py-2 text-xs">
                    <span className="text-foreground/80 flex-1 truncate font-mono">{name}</span>
                    <span className="text-muted-foreground font-mono">{kind}</span>
                    {tag && <span className="text-[10px] text-primary border border-primary/30 rounded px-1 font-mono">{tag}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (type === 'text_note') {
    const text = payload.text || '';
    const isHtml = /<\w/.test(text);
    if (isHtml) {
      return (
        <div className="text-sm leading-relaxed [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_h1]:font-bold [&_h1]:mb-1 [&_h2]:font-bold [&_h2]:mb-1 [&_h3]:font-semibold [&_strong]:font-semibold [&_a]:text-primary [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-2 [&_blockquote]:italic [&_pre]:bg-background [&_pre]:p-2 [&_pre]:rounded text-foreground" dangerouslySetInnerHTML={{ __html: text }} />
      );
    }
    return (
      <div className="text-sm leading-relaxed space-y-2">
        <ReactMarkdown components={md}>{text}</ReactMarkdown>
      </div>
    );
  }

  if (type === 'flowchart') {
    return (
      <div>
        <div className="flex flex-wrap gap-2 items-center mt-3">
          {(payload.steps || []).map((step, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="text-primary text-xs">→</span>}
              <span className="border border-border bg-secondary text-foreground/90 rounded-md px-3 py-1.5 text-xs font-mono">{step}</span>
            </React.Fragment>
          ))}
        </div>
        <details className="mt-4 text-xs text-muted-foreground">
          <summary className="cursor-pointer hover:text-foreground font-mono">View Mermaid source</summary>
          <pre className="mt-2 whitespace-pre-wrap rounded-md bg-background p-3 text-primary/80 font-mono text-[10px]">{payload.mermaid}</pre>
        </details>
      </div>
    );
  }

  if (type === 'ui_wireframe') {
    return (
      <iframe
        title="Isolated workspace wireframe"
        sandbox=""
        className="w-full h-full rounded-md border border-border bg-white pointer-events-none"
        srcDoc={payload.html ? `<html><body style="font-family:system-ui;margin:0;background:#f4f6fa;color:#192438;padding:20px">${payload.html}</body></html>` : '<html><body style="font-family:system-ui;margin:0;background:#f4f6fa;color:#192438"><header style="background:white;padding:14px 22px;border-bottom:1px solid #e5e7eb;font-weight:bold">Workspace <span style="float:right;color:#64748b">Search · Profile</span></header><main style="padding:20px"><h2 style="margin:0 0 12px">Projects</h2><section style="display:flex;gap:12px"><article style="background:white;border:1px solid #e5e7eb;border-radius:9px;padding:15px;flex:1">Overview<br><small>12 active tasks</small></article><article style="background:white;border:1px solid #e5e7eb;border-radius:9px;padding:15px;flex:1">Activity<br><small>3 updates today</small></article></section></main></body></html>'}
      />
    );
  }

  if (type === 'landing_page') {
    return (
      <iframe
        title="Landing page preview"
        sandbox=""
        className="w-full h-full rounded-md border border-border bg-white pointer-events-none"
        srcDoc={payload.html ? `<html><body style="font-family:system-ui;margin:0">${payload.html}</body></html>` : '<html><body style="font-family:system-ui;margin:0;padding:20px"><h1>Landing page</h1></body></html>'}
      />
    );
  }

  if (type === 'presentation') {
    return (
      <div className="space-y-2.5 h-full overflow-y-auto pr-1">
        {(payload.slides || []).map((slide, i) => (
          <div key={i} className="rounded-md border border-border bg-background p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono text-primary border border-primary/30 rounded px-1">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-xs font-semibold text-foreground">{slide.title}</span>
            </div>
            <ul className="space-y-1">
              {(slide.bullets || []).map((b, j) => (
                <li key={j} className="text-xs text-muted-foreground ml-4 list-disc">{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'ad_creative') {
    return (
      <div className="space-y-3">
        <div className="rounded-md border border-border bg-secondary p-3">
          <div className="text-[10px] text-muted-foreground font-mono mb-1">HEADLINE</div>
          <div className="text-sm font-bold text-foreground">{payload.headline}</div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{payload.body}</p>
        <div className="inline-block rounded-md bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold">{payload.cta}</div>
        {payload.targeting && (
          <div className="text-[10px] text-muted-foreground font-mono border-t border-border pt-2">
            Targeting: {payload.targeting}
          </div>
        )}
      </div>
    );
  }

  if (type === 'video_ad') {
    return (
      <div className="space-y-2">
        {payload.videoUrl ? (
          <video src={payload.videoUrl} controls className="w-full rounded-md border border-border" />
        ) : (
          <div className="h-full rounded-md border border-border bg-gradient-to-br from-secondary to-background flex flex-col items-center justify-center text-center p-4">
            <span className="text-3xl">▶</span>
            <span className="mt-2 text-xs text-muted-foreground">{payload.text || 'Video ad preview'}</span>
          </div>
        )}
      </div>
    );
  }

  if (type === 'tech_stack') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(payload.categories || []).map((cat, i) => (
          <div key={i} className="rounded-md border border-border bg-background p-3">
            <div className="text-xs font-semibold text-primary font-mono mb-2">{cat.name}</div>
            <div className="flex flex-wrap gap-1.5">
              {cat.items.map((item, j) => (
                <span key={j} className="inline-flex items-center gap-1.5 text-[11px] border border-border rounded px-2 py-0.5 text-foreground/80 font-mono">
                  <TechIcon name={item} size={14} />{item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'pseudocode') {
    return (
      <PseudocodeBlock code={payload.code} language={payload.language} />
    );
  }

  if (payload.imageUrl) {
    return (
      <Image src={payload.imageUrl} alt={payload.title || 'Generated image'} className="w-full h-full rounded-md" fittingType="fill" />
    );
  }
  return (
    <div className="h-full rounded-md border border-border bg-gradient-to-br from-secondary via-background to-background flex flex-col items-center justify-center text-center p-4">
      <span className="text-5xl font-black tracking-tighter text-foreground">V<span className="text-primary">.</span></span>
      <span className="mt-2 text-xs text-muted-foreground">{payload.text}</span>
    </div>
  );
}