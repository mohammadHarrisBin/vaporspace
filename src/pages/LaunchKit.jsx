import React, { useState } from 'react';
import { Check, Copy, Rocket, Trophy, Newspaper, MessageCircle, Instagram, Facebook } from 'lucide-react';
import SEO from '@/components/SEO';
import ExplainerVideo from '@/components/marketing/ExplainerVideo';
import GallerySlides from '@/components/marketing/GallerySlides';
import ProductHuntBadge from '@/components/ProductHuntBadge';

const TABS = [
  { key: 'producthunt', label: 'Product Hunt', icon: Rocket },
  { key: 'devpost', label: 'Devpost', icon: Trophy },
  { key: 'hackernews', label: 'Hacker News', icon: Newspaper },
  { key: 'reddit', label: 'Reddit', icon: MessageCircle },
  { key: 'instagram', label: 'Instagram', icon: Instagram },
  { key: 'facebook', label: 'Facebook Ads', icon: Facebook },
];

function CopyBlock({ label, content }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="group relative">
      {label && <div className="text-[10px] uppercase tracking-[.2em] text-lime-400/60 font-mono font-bold mb-2">{label}</div>}
      <div className="relative rounded-xl border border-white/10 bg-black/40 p-4 pr-12 hover:border-lime-400/30 transition-colors">
        <p className="text-sm text-white/80 whitespace-pre-wrap leading-relaxed">{content}</p>
        <button onClick={copy} className="absolute top-3 right-3 p-2 rounded-lg border border-white/10 bg-white/5 text-white/40 hover:text-lime-400 hover:border-lime-400/30 transition-colors">
          {copied ? <Check size={15} className="text-lime-400" /> : <Copy size={15} />}
        </button>
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return <h3 className="text-lg font-bold text-white mb-4 font-mono tracking-tight">{children}</h3>;
}

function PlatformHero({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-lime-400/20 bg-lime-400/5">
        <Icon className="text-lime-400" size={22} />
      </div>
      <div>
        <h2 className="text-xl font-bold text-white font-mono">{title}</h2>
        <p className="text-xs text-white/40">{subtitle}</p>
      </div>
    </div>
  );
}

const CONTENT = {
  producthunt: (
    <div className="space-y-5">
      <PlatformHero icon={Rocket} title="Product Hunt" subtitle="Launch day assets — tagline, description & maker's comment" />
      <CopyBlock label="Tagline (60 chars max)" content={`Infinite AI canvas for system design & architecture`} />
      <CopyBlock label="Short description (260 chars)" content={`VaporSpace is an infinite spatial workspace where you design and organize flowcharts, database ERDs, UI wireframes, landing pages, presentations & tech stacks — all powered by AI. Pan, zoom & share your workspace publicly for others to discover and clone.`} />
      <CopyBlock label="Maker's First Comment" content={`Hey Product Hunt! 👋

I'm a uni student who built VaporSpace to support myself through school. It started as a tool to help me plan my own projects — I needed a way to visually map out system architectures, database schemas, and UI ideas on one infinite canvas.

Now it has:
• AI-powered generation for 11 content types (flowcharts, ERDs, wireframes, landing pages, presentations, tech stacks, pseudocode & more)
• Infinite panning & zooming canvas
• Workspace sharing with like & clone
• Explore page for community templates
• Demo mode (free) and Live mode (AI-powered)
• Light/dark themes

I'd love your feedback and ideas! 💚`} />
      <CopyBlock label="Gallery Image Captions" content={`Image 1: "Drag to select a region, type a prompt, and watch AI build your diagram in real-time"

Image 2: "11 content types: flowcharts, ERDs, wireframes, landing pages, presentations, tech stacks & more"

Image 3: "Share your workspace publicly — others can like, clone & explore"

Image 4: "Infinite canvas with smooth pan & zoom — your ideas have no boundaries"`} />
      <CopyBlock label="Topics / Tags" content={`#AI #ProductDesign #DeveloperTools #NoCode #SystemDesign #Architecture #Canvas #Productivity`} />
    </div>
  ),
  devpost: (
    <div className="space-y-5">
      <PlatformHero icon={Trophy} title="Devpost Hackathon" subtitle="Full submission copy — ready to paste" />
      <CopyBlock label="Project Name" content={`VaporSpace — Infinite Spatial AI Canvas for System Architects`} />
      <CopyBlock label="Short Description" content={`An infinite spatial workspace where architects and planners generate and organize diagrams, databases, UI wireframes, and tech stacks using AI or manual inputs — with community sharing, cloning, and collaboration.`} />
      <CopyBlock label="Full Description" content={`VaporSpace reimagines how developers, architects, and planners design and organize their ideas. Instead of scattered documents and static tools, VaporSpace provides an infinite spatial canvas where you can generate, arrange, and connect visual artifacts — flowcharts, database ERDs, UI wireframes, landing pages, presentations, tech stacks, and pseudocode — all in one unlimited workspace.

WHAT IT DOES
• AI Generation: Select a region on the canvas, type a prompt, and watch as VaporSpace generates content in place — whether it's a database schema, a flowchart, a UI wireframe, or a tech stack recommendation.
• 11 Content Types: Flowcharts, database ERDs, text notes, UI wireframes, images, landing pages, presentations, ad creatives, video ads, tech stacks, and pseudocode.
• Infinite Canvas: Pan and zoom across an unlimited workspace. Your ideas have no boundaries.
• Manual & AI Modes: Generate with AI prompts or create content manually — no credits required for manual creation.
• Workspace Sharing: Share your workspace publicly for others to discover, like, and clone as a template.
• Explore Page: Browse community-shared workspaces, filter by popularity, and fork templates.
• Demo & Live Modes: Try everything free in Demo mode (mock responses), or switch to Live mode for real AI generation.

HOW WE BUILT IT
• Frontend: React + Tailwind CSS with a custom obsidian/lime design system
• Backend: Base44 (auth, database, row-level security, storage, AI integrations)
• AI: InvokeLLM for content generation, GenerateImage for visuals, GenerateVideo for ads
• Canvas: Custom screen-to-world coordinate engine for infinite panning & zooming
• Realtime: Entity subscriptions for live updates

CHALLENGES WE RAN INTO
• Building a smooth infinite canvas engine with screen-to-world coordinate math
• Managing pointer events across draggable cards, pannable canvas, and UI overlays
• Balancing AI generation costs with a free-tier friendly credit system

ACCOMPLISHMENTS
• 11 content types generated from a single prompt
• Full workspace sharing & cloning system
• Beautiful, responsive design that works on mobile & desktop
• Zero-cost Demo mode so anyone can try before paying

WHAT'S NEXT
• Real-time multiplayer collaboration
• AI agent that proactively suggests improvements
• Template marketplace
• Export to Figma & Notion`} />
      <CopyBlock label="Tech Stack" content={`Frontend: React, Tailwind CSS, Vite, Framer Motion, ReactQuill, Recharts, React Leaflet
Backend: Base44 (Auth, Database, RLS, Storage, AI Integrations)
AI: InvokeLLM, GenerateImage, GenerateVideo, TranscribeAudio
Design: Custom Obsidian/Lime design system, Geist Sans typography`} />
      <CopyBlock label="Video Script (30s)" content={`[0-5s] "This is VaporSpace — an infinite canvas for designing systems"

[5-15s] "Select a region, type a prompt, and watch AI generate flowcharts, database schemas, wireframes, and tech stacks in real-time"

[15-25s] "Pan and zoom across your workspace. Share publicly. Others can like and clone your work"

[25-30s] "VaporSpace — your ideas, infinite. Try it free at vaporspace.world"`} />
    </div>
  ),
  hackernews: (
    <div className="space-y-5">
      <PlatformHero icon={Newspaper} title="Hacker News" subtitle="Show HN post — title & body" />
      <CopyBlock label="Title" content={`Show HN: VaporSpace – Infinite spatial AI canvas for system design`} />
      <CopyBlock label="Body" content={`Hi HN,

I built VaporSpace, an infinite spatial workspace where you can generate and organize flowcharts, database ERDs, UI wireframes, landing pages, presentations, and tech stacks using AI.

The idea: instead of scattered docs and static tools, everything lives on one infinite canvas. You select a region, type a prompt, and the content generates in place. You can pan and zoom freely, arrange things spatially, and share your workspace publicly for others to discover, like, and clone.

Key features:
- 11 content types (flowcharts, ERDs, wireframes, landing pages, tech stacks, pseudocode, etc.)
- AI generation via LLM + image/video generation
- Demo mode (free, mocked) and Live mode (real AI)
- Workspace sharing with fork/like tracking
- Built with React + Base44

I'm a uni student building this to support myself through school. Would love feedback on the UX, the canvas interaction model, and what content types would be most useful.

Try it: https://vaporspace.world

Thanks!`} />
    </div>
  ),
  reddit: (
    <div className="space-y-5">
      <PlatformHero icon={MessageCircle} title="Reddit" subtitle="Ready-to-post content for multiple subreddits" />
      <CopyBlock label="r/SideProject — Title" content={`After months of building, I launched VaporSpace — an infinite AI canvas for designing system architectures, ERDs & wireframes`} />
      <CopyBlock label="r/SideProject — Body" content={`Hey everyone! I'm a uni student and I've been building VaporSpace, an infinite spatial workspace where you can:

• Generate flowcharts, database ERDs, UI wireframes, landing pages, and tech stacks with AI
• Pan and zoom across an unlimited canvas
• Share your workspace publicly for others to discover, like, and clone
• Use Demo mode (free) or Live mode (real AI generation)

It started as a tool to help me plan my own projects, and it grew into something I think other developers and architects might find useful.

Try it free: https://vaporspace.world

I'd love your feedback! 💚`} />
      <CopyBlock label="r/webdev — Title" content={`Built an infinite canvas tool for visualizing system architecture with AI generation`} />
      <CopyBlock label="r/webdev — Body" content={`I built VaporSpace — a spatial workspace where you can generate and organize diagrams, database schemas, wireframes, and tech stacks on an infinite canvas.

The canvas engine uses screen-to-world coordinate math for smooth panning and zooming. You select a region, type a prompt, and the AI generates the content in place. There are 11 content types including flowcharts, ERDs, UI wireframes, landing pages, presentations, and pseudocode.

It also has a sharing system where you can publish your workspace and others can like and clone it as a template.

Built with React, Tailwind CSS, and Base44. Demo mode is completely free.

Would love feedback on the interaction model and what content types you'd find useful!

https://vaporspace.world`} />
      <CopyBlock label="r/startups — Title" content={`I'm a uni student who built a spatial design tool to support myself through school`} />
      <CopyBlock label="r/startups — Body" content={`Hey r/startups,

I built VaporSpace (https://vaporspace.world) — an infinite spatial canvas where you can generate flowcharts, database ERDs, UI wireframes, and tech stacks using AI.

I'm a university student and I'm building this to support myself through school. The tool lets you:

- Design system architectures on an infinite canvas
- Generate 11 content types with AI prompts
- Share workspaces publicly with like & clone
- Browse community templates

I have a freemium model: Demo mode is free (mocked responses), Live mode uses real AI with a credit system. Users can earn free credits by watching ads or top up with crypto.

I'd love any advice on:
1. How to get early users
2. Pricing strategy (currently crypto-based, no payment processor)
3. Whether the infinite canvas approach resonates

Thanks for reading! 💚`} />
      <CopyBlock label="r/InternetIsBeautiful — Title" content={`VaporSpace — an infinite canvas where AI generates your system architecture diagrams in real-time`} />
    </div>
  ),
  instagram: (
    <div className="space-y-5">
      <PlatformHero icon={Instagram} title="Instagram" subtitle="Captions & post ideas — screenshot-ready" />
      <CopyBlock label="Post 1 — Caption" content={`What if your system architecture lived on an infinite canvas? 🧠∞

VaporSpace lets you generate flowcharts, database ERDs, UI wireframes, and tech stacks with AI — all on one unlimited spatial workspace.

Select a region → type a prompt → watch it build in real-time.

Link in bio to try it free 💚

#webdev #systemdesign #softwarearchitecture #developer #coding #tech #startup #indiedev #productdesign #uidesign #database #flowchart #wireframe #techstack #ai #spatialcomputing #buildinpublic`} />
      <CopyBlock label="Post 2 — Caption" content={`11 content types. One infinite canvas. Zero limits. 🚀

Flowcharts · Database ERDs · UI Wireframes · Landing Pages · Presentations · Tech Stacks · Pseudocode · Ad Creatives · Images · Videos · Notes

Pan, zoom, generate, share. Your workspace has no boundaries.

Try VaporSpace free → link in bio 💚

#developer #softwareengineering #systemdesign #architecture #ai #canvas #productivity #startuplife #indiehacker #buildinpublic #webdev #uidesign #database #flowchart`} />
      <CopyBlock label="Post 3 — Caption" content={`I'm a uni student building this to support myself 🎓

VaporSpace started as a tool to plan my own projects. Now it's an infinite AI canvas where anyone can design, generate, and share system architectures.

If you find it useful, your support means the world 💚

#studentdeveloper #buildinpublic #indiedev #startup #webdev #softwaredevelopment #ai #productdesign #systemdesign #coding #developerlife #university #sidehustle #passionproject`} />
      <CopyBlock label="Story Ideas" content={`Story 1: Screen recording of selecting a region → typing a prompt → watching a flowchart generate in real-time. Text overlay: "This is how you design systems now."

Story 2: Zoom out from a busy canvas to reveal dozens of organized cards. Text overlay: "Your ideas have no boundaries."

Story 3: Before/after — empty canvas → fully designed architecture in 60 seconds. Text overlay: "60 seconds with AI."

Story 4: The Explore page showing shared workspaces. Text overlay: "Share. Like. Clone. Discover."`} />
    </div>
  ),
  facebook: (
    <div className="space-y-5">
      <PlatformHero icon={Facebook} title="Facebook Ads" subtitle="Ad copy variations & targeting — ready to use" />
      <CopyBlock label="Ad 1 — Primary Text" content={`Stop juggling 5 different tools to design your system architecture.

VaporSpace puts everything on ONE infinite canvas:
✅ Flowcharts
✅ Database ERDs
✅ UI Wireframes
✅ Tech Stack recommendations
✅ Landing pages & presentations

All generated by AI from a simple prompt.

Try it FREE → vaporspace.world`} />
      <CopyBlock label="Ad 1 — Headline" content={`Your system architecture on an infinite AI canvas`} />
      <CopyBlock label="Ad 1 — Description" content={`Generate flowcharts, ERDs & wireframes with AI. Free to start.`} />
      <CopyBlock label="Ad 2 — Primary Text" content={`What if you could design your entire system architecture by just describing it?

That's VaporSpace — an infinite canvas where AI generates your flowcharts, database schemas, UI wireframes, and tech stacks in real-time.

No more starting from blank pages. Just select, prompt, and build.

Free Demo mode → vaporspace.world`} />
      <CopyBlock label="Ad 2 — Headline" content={`Describe it. AI builds it. Infinite canvas.`} />
      <CopyBlock label="Ad 3 — Primary Text" content={`I'm a university student who built an AI design tool to support myself through school 🎓

VaporSpace is an infinite spatial canvas where you can:
• Generate 11 types of content with AI
• Design system architectures, ERDs & wireframes
• Share your workspace publicly
• Clone community templates

If you're a developer, architect, or planner — this is for you.

Try it free: vaporspace.world 💚`} />
      <CopyBlock label="Ad 3 — Headline" content={`Built by a student. Made for builders.`} />
      <CopyBlock label="Targeting Suggestions" content={`Interests: Software Development, System Design, Web Development, UI/UX Design, Database Management, Software Architecture, Agile, DevOps

Job Titles: Software Engineer, Full-Stack Developer, System Architect, Product Manager, UX Designer, DevOps Engineer, Tech Lead

Age: 18-45

Behaviors: Engaged shoppers, Technology early adopters

Custom Audiences: Lookalike of website visitors, People who engaged with social media pages`} />
    </div>
  ),
};

export default function LaunchKit() {
  const [tab, setTab] = useState('producthunt');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0C10' }}>
      <SEO title="VaporSpace | Launch Kit" description="Marketing assets for VaporSpace launch" path="/launch-kit" />
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/5 px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-[.2em] text-lime-400">CONFIDENTIAL · LAUNCH KIT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 font-mono tracking-tight">
            VaporSpace <span className="text-lime-400">Launch Kit</span>
          </h1>
          <p className="text-sm text-white/50 max-w-xl mx-auto leading-relaxed">
            Everything you need to launch — copy-paste ready content for Product Hunt, Devpost, Hacker News, Reddit, Instagram & Facebook. Just screenshot and post.
          </p>
        </div>

        {/* Gallery */}
        <div className="mb-10">
          <GallerySlides />
        </div>

        {/* Video */}
        <div className="mb-10">
          <ExplainerVideo />
          <a href="#gallery-download" onClick={(e) => { e.preventDefault(); document.querySelector('[data-download-btn]')?.click(); }} className="mt-3 mx-auto flex items-center gap-2 rounded-lg border border-lime-400/30 bg-lime-400/10 px-4 py-2.5 text-xs font-mono font-bold text-lime-400 hover:bg-lime-400/20 transition-colors w-fit">
            ⬆️ Click here to download the video + images as ZIP
          </a>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-mono font-semibold transition-all ${tab === t.key ? 'bg-lime-400 text-black' : 'border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/20'}`}
              >
                <Icon size={14} /> {t.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-8">
          {CONTENT[tab]}
        </div>

        <div className="flex flex-col items-center gap-3 mt-8">
          <ProductHuntBadge />
          <p className="text-[10px] font-mono text-white/20">
            🔒 This page is unlisted — only you know the URL. Not linked from the app.
          </p>
        </div>
      </div>
    </div>
  );
}