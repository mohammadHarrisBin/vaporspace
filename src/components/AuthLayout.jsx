import React from "react";
import { Image } from "@/components/ui/image";

export default function AuthLayout({ title, subtitle, footer, children }) {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left: Canvas preview (desktop only) */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 border-r border-border relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <Image src="https://media.base44.com/images/public/6ab798703b59b4a0b372ea66/2c0f691d5_generated_e237616f.png" alt="VaporSpace" className="w-9 h-9 rounded-lg shrink-0" fittingType="fill" />
          <div>
            <div className="text-foreground font-bold text-lg">VaporSpace</div>
            <div className="text-xs text-muted-foreground">The Infinite Spatial Intelligence Engine</div>
          </div>
        </div>
        {/* Floating mock cards */}
        <div className="relative z-10 space-y-4 max-w-md">
          <div className="rounded-2xl border border-border bg-card/90 backdrop-blur-xl p-5 shadow-2xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm font-semibold text-foreground">Request lifecycle</span>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {["Client", "API", "Auth", "Service", "DB"].map((step, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="text-muted-foreground">→</span>}
                  <span className="border border-border bg-secondary text-foreground/80 rounded-lg px-3 py-1.5 text-xs">{step}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card/90 backdrop-blur-xl p-5 shadow-2xl ml-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-muted-foreground" />
              <span className="text-sm font-semibold text-foreground">Architecture notes</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">A modular project-planning platform with clear service boundaries and authenticated endpoints.</p>
          </div>
        </div>
        <div className="relative z-10 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Drag to select · Generate architecture in any region
        </div>
      </div>
      {/* Right: Auth form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <Image src="https://media.base44.com/images/public/6ab798703b59b4a0b372ea66/2c0f691d5_generated_e237616f.png" alt="VaporSpace" className="w-10 h-10 rounded-lg shrink-0" fittingType="fill" />
            <div className="text-foreground font-bold text-xl">VaporSpace</div>
          </div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
            {subtitle && <p className="text-muted-foreground mt-2 text-sm">{subtitle}</p>}
          </div>
          <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">{children}</div>
          {footer && <p className="text-center text-sm text-muted-foreground mt-6">{footer}</p>}
        </div>
      </div>
    </div>
  );
}