import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import PublicNav from '@/components/landing/PublicNav';
import PublicFooter from '@/components/landing/PublicFooter';
import { useInitTheme } from '@/hooks/useInitTheme';
import ProductHuntBadge from '@/components/ProductHuntBadge';
import { Sparkles, Zap, Layers, Palette, Download, Moon, ArrowRight, MousePointer2, Check } from 'lucide-react';

const FEATURES = [
  { icon: Sparkles, title: 'Infinite Spatial Canvas', desc: 'Pan, zoom, and arrange your work on an endless canvas. No boundaries, no limits.' },
  { icon: Zap, title: 'AI-Powered Generation', desc: 'Describe what you need — the AI generates diagrams, databases, wireframes, and more.' },
  { icon: Layers, title: '10+ Content Types', desc: 'Flowcharts, ERDs, UI wireframes, landing pages, presentations, ad creatives, tech stacks, and more.' },
  { icon: Palette, title: 'Demo & Live Modes', desc: 'Try everything free in Demo mode. Switch to Live mode for real AI generation.' },
  { icon: Download, title: 'Export & Import', desc: 'Back up your entire workspace as JSON. Import and restore anytime.' },
  { icon: Moon, title: 'Dark & Light Themes', desc: 'Work in your preferred mode. Your preference saves automatically.' },
];

const STEPS = [
  { icon: MousePointer2, title: 'Drag to select', desc: 'Click and drag on the infinite canvas to select a region where you want content.' },
  { icon: Sparkles, title: 'Choose what to generate', desc: 'Pick from flowcharts, databases, wireframes, landing pages, and more — or describe it in the AI chat.' },
  { icon: Check, title: 'AI creates it on your canvas', desc: 'VaporSpace generates the content directly onto your canvas. Resize, move, and arrange freely.' },
];

function HeroVisual() {
  return (
    <div className="relative w-full aspect-[16/10] rounded-xl border border-border bg-card overflow-hidden shadow-2xl">
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(hsl(var(--border) / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.4) 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
      }} />
      <div className="absolute top-[10%] left-[8%] w-[28%] rounded-lg border border-border bg-background/90 p-3 shadow-lg">
        <div className="flex items-center gap-1.5 mb-2"><div className="w-2 h-2 rounded-full bg-primary" /><div className="h-2 w-2/3 rounded bg-foreground/20" /></div>
        <div className="space-y-1.5"><div className="h-1.5 w-full rounded bg-foreground/10" /><div className="h-1.5 w-4/5 rounded bg-foreground/10" /><div className="h-1.5 w-3/5 rounded bg-foreground/10" /></div>
      </div>
      <div className="absolute top-[15%] right-[10%] w-[30%] rounded-lg border border-border bg-background/90 p-3 shadow-lg">
        <div className="flex items-center gap-1.5 mb-2"><div className="w-2 h-2 rounded bg-primary" /><div className="h-2 w-1/2 rounded bg-foreground/20" /></div>
        <div className="grid grid-cols-2 gap-1.5"><div className="h-8 rounded bg-foreground/5" /><div className="h-8 rounded bg-foreground/5" /><div className="h-8 rounded bg-foreground/5" /><div className="h-8 rounded bg-foreground/5" /></div>
      </div>
      <div className="absolute bottom-[12%] left-[20%] w-[35%] rounded-lg border border-border bg-background/90 p-3 shadow-lg">
        <div className="flex items-center gap-1.5 mb-2"><div className="w-2 h-2 rounded bg-primary" /><div className="h-2 w-3/5 rounded bg-foreground/20" /></div>
        <div className="flex items-end gap-1 h-12"><div className="w-2 rounded-t bg-primary/30 h-[40%]" /><div className="w-2 rounded-t bg-primary/50 h-[60%]" /><div className="w-2 rounded-t bg-primary/40 h-[50%]" /><div className="w-2 rounded-t bg-primary/60 h-[75%]" /><div className="w-2 rounded-t bg-primary/50 h-[55%]" /><div className="w-2 rounded-t bg-primary/70 h-[85%]" /><div className="w-2 rounded-t bg-primary h-[100%]" /></div>
      </div>
      <div className="absolute bottom-[18%] right-[15%] w-[25%] rounded-lg border border-border bg-background/90 p-3 shadow-lg">
        <div className="flex items-center gap-1.5 mb-2"><div className="w-2 h-2 rounded bg-primary" /><div className="h-2 w-1/2 rounded bg-foreground/20" /></div>
        <div className="space-y-1">
          {[1, 2, 3].map(i => <div key={i} className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-primary/20" /><div className="h-1.5 flex-1 rounded bg-foreground/10" /></div>)}
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  useInitTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title="VaporSpace | Infinite Spatial AI Canvas for System Architecture" description="VaporSpace is an infinite spatial AI canvas for designing system architectures, database ERDs, flowcharts, UI wireframes, and tech stacks. Generate diagrams, landing pages, presentations, and video ads with AI." path="/" />
      <PublicNav />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-mono text-muted-foreground mb-6">
            <Sparkles size={12} className="text-primary" /> AI-powered spatial workspace
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
            Design your next big thing on an <span className="text-primary">infinite AI canvas</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            VaporSpace turns ideas into architectures, databases, wireframes, and marketing assets — all on one spatial workspace powered by AI.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/register" className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors">
              Start Building Free <ArrowRight size={16} />
            </Link>
            <Link to="/templates" className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium hover:bg-card transition-colors">
              Browse Templates
            </Link>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-16">
          <HeroVisual />
        </div>
      </section>

      <section className="py-20 px-4 border-t border-border bg-card/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Everything you need to plan and build</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(f => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <h3 className="text-base font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <div className="text-xs font-mono text-primary mb-2">STEP {i + 1}</div>
                  <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <div className="text-3xl mb-3">👋</div>
            <h2 className="text-xl font-bold mb-3">I'm a uni student building this</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Hey! I built VaporSpace to support myself through university and help others plan and build their ideas. If you find it useful, your support means the world — it helps me keep studying, building, and making this better for everyone. Thank you! 💚
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link to="/pricing" className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors">
                Support the project <ArrowRight size={14} />
              </Link>
              <Link to="/explore" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-card transition-colors">
                Explore community workspaces
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 border-t border-border bg-card/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to build something great?</h2>
          <p className="text-lg text-muted-foreground mb-8">Start free in Demo mode. Upgrade to Live AI when you're ready.</p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/register" className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors">
              Get Started Free <ArrowRight size={16} />
            </Link>
            <Link to="/pricing" className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium hover:bg-card transition-colors">
              View Pricing
            </Link>
          </div>
          <div className="mt-8">
            <ProductHuntBadge />
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}