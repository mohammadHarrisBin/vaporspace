import React, { useState } from 'react';
import { X, Copy, Check, Zap, Crown, Send, Wallet, Gift } from 'lucide-react';

// ⚠️ Replace with your own Solana wallet address
const SOLANA_WALLET = '8QhVqfeyx5ofxFwcQTkjsWB42GLzDNVr5EbvUxpKgUin';
const NETWORK = 'Solana';
const TOKEN = 'USDC';

const PLANS = {
  topup: { label: 'Credit Top-up', amount: 10, credits: 500, icon: Zap, tier: 'free' },
  pro: { label: 'Pro Plan / month', amount: 15, credits: 1000, icon: Crown, tier: 'pro', priority: true },
};

export default function TopUpModal({ open, onClose, onPurchase, onAdReward }) {
  const [selectedPlan, setSelectedPlan] = useState('topup');
  const [txHash, setTxHash] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const plan = PLANS[selectedPlan];
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=${SOLANA_WALLET}`;

  const copyAddress = () => {
    navigator.clipboard.writeText(SOLANA_WALLET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const confirmPayment = () => {
    if (!txHash.trim() || submitting) return;
    setSubmitting(true);
    setTimeout(() => {
      onPurchase(selectedPlan, txHash.trim());
      setTxHash('');
      setSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-foreground">Top up with crypto</h2>
            <p className="text-sm text-muted-foreground mt-1 font-mono">Pay with {TOKEN} on {NETWORK}</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {Object.entries(PLANS).map(([key, p]) => {
            const Icon = p.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedPlan(key)}
                className={`text-left rounded-lg border p-4 transition-colors ${selectedPlan === key ? 'border-primary bg-primary/5' : 'border-border bg-background hover:border-foreground/20'}`}
              >
                <Icon size={16} className={selectedPlan === key ? 'text-primary' : 'text-muted-foreground'} />
                <div className="text-lg font-bold text-foreground mt-2 tabular-nums">{p.amount} {TOKEN}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{p.label}</div>
                <div className="text-xs text-primary mt-2 font-mono">{p.priority ? `${p.credits.toLocaleString()} Credits / mo` : `+${p.credits} credits`}</div>
                {p.priority && <div className="text-[10px] text-muted-foreground mt-1 font-mono">Priority processing</div>}
              </button>
            );
          })}
        </div>

        <div className="rounded-lg border border-border bg-background p-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <img src={qrUrl} alt="Wallet QR code" className="w-[100px] h-[100px] rounded-md" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5 font-mono">
                <Wallet size={12} /> Send {plan.amount} {TOKEN} to:
              </div>
              <div className="text-xs font-mono text-foreground break-all leading-relaxed">{SOLANA_WALLET}</div>
              <button
                onClick={copyAddress}
                className="mt-2 inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-mono"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? 'Copied' : 'Copy address'}
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-2 font-mono">
            Submit your transaction hash to confirm
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={txHash}
              onChange={e => setTxHash(e.target.value)}
              placeholder="Paste transaction hash…"
              className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground outline-none focus:border-primary/40 font-mono placeholder:text-muted-foreground"
            />
            <button
              onClick={confirmPayment}
              disabled={!txHash.trim() || submitting}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {submitting ? <span className="animate-pulse">Confirming…</span> : (<><Send size={14} /> Confirm</>)}
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 font-mono">
            Credits are added after submission. TX hash is saved to your account for verification.
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <button
            onClick={onAdReward}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
          >
            <Gift size={16} /> Watch Ad for +3 Free Credits
          </button>
          <p className="text-[10px] text-muted-foreground mt-1.5 font-mono text-center">No payment required — just watch a short ad</p>
        </div>
      </div>
    </div>
  );
}