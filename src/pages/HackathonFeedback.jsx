import React from 'react';
import SEO from '@/components/SEO';
import { Image } from '@/components/ui/image';
import { CheckCircle2, AlertTriangle, Clock, Code2, KeyRound, Video, Mic, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TOOLS = [
  {
    name: 'Nebius Token Factory',
    icon: '🔑',
    usedFor: 'Provisioning API credentials and managing authentication tokens for the VaporSpace backend service layer.',
    workedWell: 'Straightforward token issuance flow — once authenticated, the token was immediately usable for downstream API calls with no extra configuration.',
    needsWork: 'The token lifecycle management UI could be more intuitive. Auto-refresh and rotation indicators would reduce manual monitoring.',
    onboarding: 'Zero to hello world took about 15 minutes. The initial setup steps were clear, though finding the right scope permissions required a doc dive.',
    wouldBuildAgain: true,
    reason: 'Reliable, fast token provisioning with minimal friction. It just works once configured.',
  },
  {
    name: 'Nebius AI Cloud',
    icon: '☁️',
    usedFor: 'Powering the LLM-driven content generation engine — flowcharts, database schemas, landing pages, presentations, and architecture notes.',
    workedWell: 'Low-latency inference, structured JSON output support, and excellent uptime. The spatial canvas AI assistant relies on it for every generation request.',
    needsWork: 'Rate limiting feedback could be more granular — a 429 with a retry-after header would let the UI show precise wait times instead of generic error messages.',
    onboarding: 'Zero to hello world was impressively fast. The SDK integrated cleanly with our React/Vite frontend. Docs covered the common paths well.',
    wouldBuildAgain: true,
    reason: 'Performance and reliability are top-tier. The structured output feature alone saved us from building a custom JSON parser layer.',
  },
  {
    name: 'NVIDIA Model (via Nebius)',
    icon: '🧠',
    usedFor: 'Complex reasoning for multi-type content generation — turning a single user prompt into coordinated diagrams, schemas, wireframes, and slide decks simultaneously.',
    workedWell: 'Strong instruction following and coherent multi-format output. The model understood spatial canvas context and produced content that fit together as a cohesive workspace.',
    needsWork: 'Occasional verbosity in intermediate reasoning steps that we had to trim for UI responsiveness. Temperature tuning for creative vs. structured tasks needed manual experimentation.',
    onboarding: 'Plugged into the Nebius AI Cloud endpoint — no separate SDK needed. Model selection and parameter passing were well-documented.',
    wouldBuildAgain: true,
    reason: 'Quality of multi-format generation is unmatched for this use case. A single prompt producing a full workspace of diagrams and docs is the core value prop of VaporSpace.',
  },
];

const TIPS = [
  {
    icon: Rocket,
    title: 'Name your project like a human',
    desc: 'VaporSpace — not "spatial-canvas-ai-v2". Memorable, meaningful, and tied to what the app actually does.',
  },
  {
    icon: KeyRound,
    title: 'Hide your API keys',
    desc: 'Never put API keys directly in code. Use environment variables, add .env to .gitignore, and check your repo before submitting.',
  },
  {
    icon: Code2,
    title: 'Make required tools impossible to miss',
    desc: 'Name Nebius Token Factory, AI Cloud, and your NVIDIA model in the project description, Built With section, and demo video — with audio.',
  },
  {
    icon: Video,
    title: 'Treat your video like a pitch',
    desc: '3 minutes: lead with the problem, show the solution working, tell judges who it\'s for and how it uses Nebius + NVIDIA.',
  },
  {
    icon: Mic,
    title: 'Call out tools with audio',
    desc: 'Don\'t just show a logo — say it out loud. "We use Nebius AI Cloud with NVIDIA models for every generation" lands harder than a passing mention.',
  },
];

const SCREENSHOTS = [
  {
    src: 'https://media.base44.com/images/public/6ab798703b59b4a0b372ea66/8c54711b6_image.png',
    caption: 'VaporSpace canvas — AI-generated flowcharts, ERDs, notes, and pitch decks on an infinite spatial workspace',
  },
  {
    src: 'https://media.base44.com/images/public/6ab798703b59b4a0b372ea66/f22ce4663_image.png',
    caption: 'Presentation card with presenter mode — full-screen slide navigation powered by Nebius AI Cloud',
  },
  {
    src: 'https://media.base44.com/images/public/6ab798703b59b4a0b372ea66/e81d7078a_image.png',
    caption: 'Slide design system — numbered badges, structured bullets, and the VaporSpace obsidian-and-lime aesthetic',
  },
];

export default function HackathonFeedback() {
  return (
    <>
      <SEO
        title="VaporSpace × Nebius × NVIDIA | Hackathon Submission"
        description="How VaporSpace uses Nebius Token Factory, AI Cloud, and NVIDIA models to power an infinite spatial AI canvas. Tool feedback, what worked, and what we'd improve."
        path="/hackathon"
      />
      <div className="min-h-screen bg-[#0a0c10] text-white">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(rgba(198,255,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(198,255,0,0.15) 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6 py-16 sm:py-24">
            <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-1.5 text-xs font-mono text-lime-400 mb-6">
              <Clock size={12} /> Submissions close Friday, October 30 · 10:00 AM PT
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
              Vapor<span className="text-lime-400">Space</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mb-8">
              An infinite spatial canvas for architects and planners — powered by <span className="text-lime-400 font-semibold">Nebius Token Factory</span>, <span className="text-lime-400 font-semibold">Nebius AI Cloud</span>, and <span className="text-lime-400 font-semibold">NVIDIA models</span>.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/app" className="inline-flex items-center gap-2 rounded-lg bg-lime-400 px-6 py-3 text-sm font-bold text-[#0a0c10] hover:bg-lime-300 transition-colors">
                Launch App <ArrowRight size={16} />
              </Link>
              <a href="#feedback" className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white/80 hover:border-white/40 transition-colors">
                Tool Feedback
              </a>
            </div>
          </div>
        </section>

        {/* Built With */}
        <section className="border-b border-white/10">
          <div className="max-w-5xl mx-auto px-6 py-12">
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-lime-400 mb-6">Built With</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {TOOLS.map(tool => (
                <div key={tool.name} className="rounded-xl border border-white/10 bg-white/5 p-6 hover:border-lime-400/30 transition-colors">
                  <div className="text-3xl mb-3">{tool.icon}</div>
                  <h3 className="font-bold text-white mb-1">{tool.name}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{tool.usedFor}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tool Feedback */}
        <section id="feedback" className="border-b border-white/10">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Tool Feedback</h2>
            <p className="text-white/50 text-sm mb-10">Every tool we used — what worked, what didn't, and whether we'd build with it again.</p>

            <div className="space-y-6">
              {TOOLS.map((tool, i) => (
                <div key={tool.name} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                  <div className="flex items-center gap-4 px-6 py-5 border-b border-white/10 bg-white/5">
                    <span className="text-2xl">{tool.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-white">{tool.name}</h3>
                      <p className="text-xs text-white/40 mt-0.5">{tool.usedFor}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${tool.wouldBuildAgain ? 'bg-lime-400/15 text-lime-400' : 'bg-red-500/15 text-red-400'}`}>
                      {tool.wouldBuildAgain ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                      {tool.wouldBuildAgain ? 'Would build again' : 'Would not'}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-px bg-white/5">
                    <div className="bg-[#0a0c10] p-5">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-lime-400 mb-2">✓ Worked Well</div>
                      <p className="text-sm text-white/70 leading-relaxed">{tool.workedWell}</p>
                    </div>
                    <div className="bg-[#0a0c10] p-5">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 mb-2">⚠ Needs Work</div>
                      <p className="text-sm text-white/70 leading-relaxed">{tool.needsWork}</p>
                    </div>
                    <div className="bg-[#0a0c10] p-5">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-2">🚀 Onboarding (0 → Hello World)</div>
                      <p className="text-sm text-white/70 leading-relaxed">{tool.onboarding}</p>
                    </div>
                    <div className="bg-[#0a0c10] p-5">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-2">💬 Why we'd build again</div>
                      <p className="text-sm text-white/70 leading-relaxed">{tool.reason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Submission Tips */}
        <section className="border-b border-white/10">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Submission Tips</h2>
            <p className="text-white/50 text-sm mb-10">A stronger submission checklist.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TIPS.map((tip, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-lime-400/20 transition-colors">
                  <tip.icon size={20} className="text-lime-400 mb-3" />
                  <h3 className="font-semibold text-white text-sm mb-2">{tip.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Screenshots */}
        <section className="border-b border-white/10">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Screenshots</h2>
            <p className="text-white/50 text-sm mb-10">VaporSpace in action — every card below was generated from a single user prompt via Nebius AI Cloud + NVIDIA models.</p>
            <div className="space-y-6">
              {SCREENSHOTS.map((shot, i) => (
                <figure key={i} className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
                  <Image
                    src={shot.src}
                    alt={shot.caption}
                    fittingType="fit"
                    className="w-full max-h-[500px] object-contain bg-[#111418]"
                  />
                  <figcaption className="px-5 py-3 text-xs text-white/50 border-t border-white/10">{shot.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="max-w-5xl mx-auto px-6 py-16 text-center">
            <Rocket size={32} className="text-lime-400 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to explore the workspace?</h2>
            <p className="text-white/50 text-sm mb-8 max-w-md mx-auto">Launch VaporSpace and generate your first AI-powered architecture in seconds.</p>
            <Link to="/app" className="inline-flex items-center gap-2 rounded-lg bg-lime-400 px-8 py-3.5 text-sm font-bold text-[#0a0c10] hover:bg-lime-300 transition-colors">
              Launch VaporSpace <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <footer className="border-t border-white/10 px-6 py-6 text-center">
          <p className="text-xs text-white/30 font-mono">© {new Date().getFullYear()} VaporSpace · Built with Nebius + NVIDIA for the hackathon</p>
        </footer>
      </div>
    </>
  );
}