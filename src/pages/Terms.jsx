import React from 'react';
import SEO from '@/components/SEO';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title="Terms of Service | VaporSpace" description="VaporSpace Terms of Service: acceptable use, AI output ownership, no-refund policy for crypto credit top-ups, and liability terms." path="/terms" />
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2 font-heading">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: September 26, 2026</p>

        <div className="space-y-6 text-sm leading-relaxed text-foreground/80">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Acceptance of Terms</h2>
            <p>By using VaporSpace, you agree to these Terms of Service. If you do not agree, do not use the service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. "As-Is" Service & Limitation of Liability</h2>
            <p>VaporSpace is provided "as-is" without warranties of any kind, express or implied. AI-generated outputs (diagrams, database schemas, flowcharts, UI wireframes, code, and text) may contain errors or inaccuracies. You are responsible for reviewing and validating all output before relying on it.</p>
            <p className="mt-2">VaporSpace, its operators, and affiliates shall not be liable for any damages arising from the use of, or inability to use, the service or any AI-generated content.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. AI Output Ownership & Indemnification</h2>
            <p>You own the content you generate using VaporSpace. However, you are solely responsible for ensuring that your prompts and generated outputs do not infringe on the copyrights, trademarks, or intellectual property rights of any third party.</p>
            <p className="mt-2">You agree to indemnify and hold harmless VaporSpace from any claims arising from your use of the service or the content you generate.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. No Refund Policy</h2>
            <p>All credit purchases and top-ups (including crypto payments of 10 USDC or 15 USDC) are non-refundable once credits have been consumed. Unused credits remain in your account balance. We do not issue refunds for partially used credit balances or subscription periods.</p>
            <p className="mt-2">Crypto transactions are irreversible on the Solana blockchain. Ensure you verify the wallet address and amount before sending funds.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Acceptable Use Policy</h2>
            <p>You agree not to use VaporSpace to:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Generate illegal, harmful, or malicious content or code.</li>
              <li>Send spam or unsolicited communications.</li>
              <li>Infringe on intellectual property rights.</li>
              <li>Attempt to disrupt, overload, or gain unauthorized access to the service.</li>
              <li>Use the service for automated scraping or bulk data extraction.</li>
            </ul>
            <p className="mt-2">Violations may result in account termination without refund.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Account Termination</h2>
            <p>We reserve the right to suspend or terminate accounts that violate these terms. Upon termination, your access to the service and generated content may be revoked.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">7. Changes to Terms</h2>
            <p>We may update these terms periodically. Continued use of VaporSpace after changes constitutes acceptance of the revised terms.</p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <a href="/" className="text-sm text-primary hover:underline">← Back to VaporSpace</a>
        </div>
      </div>
    </div>
  );
}