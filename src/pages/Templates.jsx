import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import PublicNav from '@/components/landing/PublicNav';
import PublicFooter from '@/components/landing/PublicFooter';
import { useInitTheme } from '@/hooks/useInitTheme';
import { TEMPLATES } from '@/components/canvas/templateData';
import { ArrowRight } from 'lucide-react';

export default function Templates() {
  useInitTheme();
  const navigate = useNavigate();
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Engineering', 'Marketing'];
  const filtered = category === 'All' ? TEMPLATES : TEMPLATES.filter(t => t.category === category);

  const applyTemplate = (template) => {
    const { icon, ...serializable } = template;
    localStorage.setItem('pendingTemplate', JSON.stringify(serializable));
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title="VaporSpace Templates | Pre-built Canvas Configurations" description="Start fast with pre-built VaporSpace canvas templates for startup architecture, product launches, database design, go-to-market strategy, and more." path="/templates" />
      <PublicNav />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Start from a template</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pre-built canvas configurations for common use cases. One click and you're ready to build.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${category === cat ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:text-foreground'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(tpl => {
              const Icon = tpl.icon;
              return (
                <div key={tpl.id} className="rounded-xl border border-border bg-card p-6 flex flex-col hover:border-primary/30 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground mb-2">{tpl.category}</span>
                  <h3 className="text-lg font-bold mb-2">{tpl.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{tpl.description}</p>
                  <button
                    onClick={() => applyTemplate(tpl)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Use Template <ArrowRight size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}