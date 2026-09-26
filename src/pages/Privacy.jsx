import React from 'react';
import SEO from '@/components/SEO';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title="Privacy Policy | VaporSpace" description="VaporSpace Privacy Policy: how we collect, use, and protect your data including account info, canvas data, and crypto payment records." path="/privacy" />
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2 font-heading">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: September 26, 2026</p>

        <div className="space-y-6 text-sm leading-relaxed text-foreground/80">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Data We Collect</h2>
            <p>VaporSpace collects the following personal data when you use our service:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li><strong>Account data:</strong> Email address and authentication tokens.</li>
              <li><strong>Usage data:</strong> IP address, browser type, and session information.</li>
              <li><strong>Canvas data:</strong> Prompt inputs, generated outputs (diagrams, code, text), and workspace state.</li>
              <li><strong>Payment data:</strong> Solana wallet addresses and transaction hashes for crypto top-ups. We do not collect private wallet keys.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. Third-Party Data Sharing</h2>
            <p>To provide AI-powered generation, your prompt inputs are sent to third-party AI inference providers for processing. Generated outputs are returned to you and stored in your workspace.</p>
            <p className="mt-2">Crypto payments are recorded on the public Solana blockchain. Your wallet address and transaction hash are publicly visible on-chain. We do not share your email or canvas data with payment processors.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Data Retention</h2>
            <p>Your canvas data and account information are retained for as long as your account is active. You may request deletion of your account and all associated data at any time by contacting us. Transaction hashes remain permanently on the Solana blockchain and cannot be deleted by us.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Your Rights</h2>
            <p>Under GDPR (EU) and CCPA (California), you have the right to access, export, or delete your personal data. To exercise these rights, contact us through the app.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Cookies</h2>
            <p>We use essential cookies and local storage to keep you logged in and save your canvas state (zoom, pan position). See our <a href="/cookies" className="text-primary underline">Cookie Policy</a> for details.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Contact</h2>
            <p>For privacy questions or data requests, reach out through the VaporSpace app.</p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <a href="/" className="text-sm text-primary hover:underline">← Back to VaporSpace</a>
        </div>
      </div>
    </div>
  );
}