import React from 'react';
import SEO from '@/components/SEO';

export default function Cookies() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title="Cookie Policy | VaporSpace" description="VaporSpace Cookie Policy: essential cookies and local storage for authentication, canvas state, and theme preference. No third-party tracking." path="/cookies" />
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2 font-heading">Cookie Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: September 26, 2026</p>

        <div className="space-y-6 text-sm leading-relaxed text-foreground/80">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. What We Use</h2>
            <p>VaporSpace uses essential cookies and browser local storage to provide core functionality. We do not use advertising or third-party tracking cookies.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. Essential Storage</h2>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li><strong>Authentication tokens:</strong> Keep you logged in across page reloads.</li>
              <li><strong>Canvas state:</strong> Save your zoom level and pan position so your workspace opens where you left off.</li>
              <li><strong>Theme preference:</strong> Remember your light/dark mode selection.</li>
              <li><strong>Cookie consent:</strong> Remember that you've accepted this policy.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Managing Cookies</h2>
            <p>You can clear cookies and local storage at any time through your browser settings. Note that clearing authentication tokens will log you out. Clearing canvas state will reset your viewport to default.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. No Tracking Cookies</h2>
            <p>We do not use Google Analytics, Facebook Pixel, or any third-party advertising or tracking cookies. Your browsing within VaporSpace is not shared with advertising networks.</p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <a href="/" className="text-sm text-primary hover:underline">← Back to VaporSpace</a>
        </div>
      </div>
    </div>
  );
}