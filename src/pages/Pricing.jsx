import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import SEO from '@/components/SEO';
import PublicNav from '@/components/landing/PublicNav';
import PublicFooter from '@/components/landing/PublicFooter';
import { useInitTheme } from '@/hooks/useInitTheme';
import { Check, Zap, Crown, Users, ChevronDown } from 'lucide-react';

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'Explore all features with mock content in Demo mode.',
    icon: Zap,
    cta: 'Start Free',
    href: '/register',
    features: ['Demo mode with mock content', 'All 10+ content types', '1 workspace', 'Earn credits via ads (3/day)', 'Dark & light themes', 'Export & import'],
  },
  {
    name: 'Pro',
    price: '$15',
    period: '/ month',
    desc: 'Real AI generation with 1,000 credits monthly.',
    icon: Crown,
    cta: 'Start Pro',
    href: '/register',
    highlight: true,
    features: ['Everything in Free', 'Live AI mode', '1,000 credits / month', 'Unlimited workspaces', 'All generators unlocked', 'Priority processing', 'Video ad generation'],
  },
  {
    name: 'Team',
    price: '$49',
    period: '/ month',
    desc: 'For teams that need shared workspaces and more.',
    icon: Users,
    cta: 'Coming Soon',
    href: null,
    features: ['Everything in Pro', '3,000 credits / month', 'Shared workspaces', 'Team collaboration', 'Priority support', 'Admin controls'],
  },
];

const FAQ = [
  { q: 'How does payment work?', a: 'We accept USDC on the Solana network. Send payment to our wallet address, submit the transaction hash in the app, and credits are added to your account — no credit card required.' },
  { q: 'Can I try before I buy?', a: 'Yes! Demo mode is completely free and lets you explore all features with mock content. You can also earn free credits by watching short ads.' },
  { q: 'How do credits work?', a: 'Live mode uses credits for each AI generation. Different content types cost different amounts — from 1 credit for text notes to 50 credits for video ads.' },
  { q: 'Can I get free credits?', a: 'Yes! Watch short ads to earn 3 free credits per video, up to 3 times per day. That\'s up to 9 free credits daily.' },
  { q: 'What happens when I run out of credits?', a: 'You can top up anytime with crypto, or switch back to Demo mode to keep working with mock content. Your canvases are always saved.' },
];

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left">
        <span className="text-sm font-medium text-foreground">{item.q}</span>
        <ChevronDown size={16} className={`text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="pb-4 text-sm text-muted-foreground leading-relaxed">{item.a}</p>}
    </div>
  );
}

export default function Pricing() {
  useInitTheme();
  const [authed, setAuthed] = useState(false);
  useEffect(() => { base44AuthCheck(); }, []);
  const base44AuthCheck = async () => {
    try { setAuthed(await base44.auth.isAuthenticated()); } catch {}
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title="VaporSpace Pricing | Free, Pro & Team Plans" description="VaporSpace pricing: Start free with Demo mode, upgrade to Pro for $15/mo with 1,000 AI credits, or get Team plans. Pay with USDC crypto." path="/pricing" />
      <PublicNav />

      <section className="pt-32 pb-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-lg text-muted-foreground">Start free. Upgrade when you need real AI power. Pay with crypto — no credit card required.</p>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map(plan => {
            const Icon = plan.icon;
            return (
              <div key={plan.name} className={`rounded-xl border p-6 flex flex-col ${plan.highlight ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
                {plan.highlight && <div className="text-xs font-mono text-primary mb-2">MOST POPULAR</div>}
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold tabular-nums">{plan.price}</span>
                  <span className="text-sm text-muted-foreground ml-1">{plan.period}</span>
                </div>
                {plan.href ? (
                  <Link to={authed ? '/app' : plan.href} className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors mb-6">
                    {plan.cta}
                  </Link>
                ) : (
                  <div className="inline-flex items-center justify-center rounded-lg border border-dashed border-border px-4 py-2.5 text-sm font-medium text-muted-foreground mb-6">{plan.cta}</div>
                )}
                <ul className="space-y-2.5">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check size={15} className="text-primary shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-20 px-4 border-t border-border bg-card/50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently asked questions</h2>
          {FAQ.map(item => <FaqItem key={item.q} item={item} />)}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}