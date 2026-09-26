import { base44 } from '@/api/base44Client';

export async function generateLiveContent(type, prompt) {
  const userPrompt = prompt || `a ${type.replace('_', ' ')} for a software project`;

  if (type === 'image') {
    const result = await base44.integrations.Core.GenerateImage({
      prompt: `Professional design for: ${userPrompt}. Modern, clean, minimal.`,
    });
    return { title: prompt || 'Generated image', imageUrl: result.url, text: prompt || 'Generated concept' };
  }

  if (type === 'database_erd') {
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Generate a realistic database schema for: "${userPrompt}". Return JSON with "title" and "tables" (array of {name, fields: [[name, type, tag], ...]} where tag is "PK", "FK", or ""). 2-3 tables, 3-5 fields each.`,
      response_json_schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          tables: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                fields: { type: 'array', items: { type: 'array', items: { type: 'string' } } },
              },
            },
          },
        },
      },
    });
    return {
      title: result.title || userPrompt,
      tables: (result.tables || []).map(t => ({ name: t.name, fields: t.fields || [] })),
    };
  }

  if (type === 'flowchart') {
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Create a software flowchart for: "${userPrompt}". Return JSON with "title", "mermaid" (valid Mermaid.js flowchart syntax, starts with "flowchart"), and "steps" (array of short step names in order, max 6).`,
      response_json_schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          mermaid: { type: 'string' },
          steps: { type: 'array', items: { type: 'string' } },
        },
      },
    });
    return {
      title: result.title || userPrompt,
      mermaid: result.mermaid || 'flowchart TD\n  A[Start] --> B[End]',
      steps: result.steps || ['Start', 'End'],
    };
  }

  if (type === 'ui_wireframe') {
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Generate a minimal HTML wireframe for: "${userPrompt}". Return JSON with "title" and "html" (raw HTML fragment, no html/body tags, with inline styles, clean monochrome, under 800 chars).`,
      response_json_schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          html: { type: 'string' },
        },
      },
    });
    return {
      title: result.title || userPrompt,
      html: result.html || '<div style="padding:20px;font-family:sans-serif">Wireframe placeholder</div>',
    };
  }

  if (type === 'landing_page') {
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Generate a simple, modern landing page in HTML with inline CSS for: "${userPrompt}". Return JSON with "title" and "html" (complete HTML fragment with inline styles, hero section with headline, subtext, CTA button, and a features section. Clean, modern, responsive. Under 1500 chars).`,
      response_json_schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          html: { type: 'string' },
        },
      },
    });
    return {
      title: result.title || userPrompt,
      html: result.html || '<section style="padding:40px;text-align:center;font-family:system-ui"><h1 style="font-size:28px">Welcome</h1><p style="color:#64748b">Get started today.</p><button style="background:#0f172a;color:#fff;border:none;padding:12px 28px;border-radius:8px">Learn more</button></section>',
    };
  }

  if (type === 'presentation') {
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Create a concise presentation for: "${userPrompt}". Return JSON with "title" and "slides" (array of objects with "title" and "bullets" array of strings, 4-6 slides).`,
      response_json_schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          slides: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                bullets: { type: 'array', items: { type: 'string' } },
              },
            },
          },
        },
      },
    });
    return {
      title: result.title || userPrompt,
      slides: (result.slides || []).map(s => ({ title: s.title, bullets: s.bullets || [] })),
    };
  }

  if (type === 'ad_creative') {
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Create ad creative copy for: "${userPrompt}". Return JSON with "title", "headline" (catchy ad headline), "body" (1-2 sentence body copy), "cta" (call to action), and "targeting" (target audience description).`,
      response_json_schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          headline: { type: 'string' },
          body: { type: 'string' },
          cta: { type: 'string' },
          targeting: { type: 'string' },
        },
      },
    });
    return {
      title: result.title || userPrompt,
      headline: result.headline || userPrompt,
      body: result.body || '',
      cta: result.cta || 'Learn more',
      targeting: result.targeting || '',
    };
  }

  if (type === 'video_ad') {
    const result = await base44.integrations.Core.GenerateVideo({
      prompt: `Create a professional 6-second video advertisement for: ${userPrompt}. Modern, cinematic, engaging, product showcase style.`,
      aspect_ratio: '16:9',
      duration: 6,
      generate_audio: false,
    });
    return { title: prompt || 'Video ad', videoUrl: result.url, text: prompt || 'Generated video ad' };
  }

  if (type === 'tech_stack') {
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Recommend a complete tech stack for building: "${userPrompt}". Return JSON with "title" and "categories" (array of {name, items: [string, ...]}). Include categories like Frontend, Backend, Database, DevOps/Infrastructure, and any others relevant. 3-5 items per category. Use standard technology names only (e.g. "React", "Node.js", "PostgreSQL", "Docker", "Tailwind CSS", "Vite", "Express", "Redis", "GitHub Actions", "Vercel", "TypeScript", "Python", "Django", "MongoDB", "GraphQL", "Kubernetes", "AWS", "Firebase", "Stripe", "Next.js"). Do NOT include descriptions — just the technology name.`,
      response_json_schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          categories: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                items: { type: 'array', items: { type: 'string' } },
              },
            },
          },
        },
      },
    });
    return {
      title: result.title || userPrompt,
      categories: (result.categories || []).map(c => ({ name: c.name, items: c.items || [] })),
    };
  }

  if (type === 'pseudocode') {
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Write well-structured pseudocode for: "${userPrompt}". Return JSON with "title", "code", and "language".

CRITICAL FORMATTING RULES for "code":
- Use real newline characters (\\n) between every statement
- Use 2-space indentation for nested blocks (if/else, for, while, function body)
- Each statement must be on its own line
- Add a blank line between logical sections
- Example of correct formatting:
function authenticate(username, password):
  user = database.findUser(username)
  if user is None:
    return "User not found"
  if not verifyPassword(password, user.hash):
    return "Invalid password"
  token = generateToken(user.id)
  return token

Use plain English programming constructs: function, if, else, for, while, return. The "language" field should be the style used (e.g. "python", "javascript", "generic").`,
      response_json_schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          code: { type: 'string' },
          language: { type: 'string' },
        },
      },
    });
    return {
      title: result.title || userPrompt,
      code: result.code || '',
      language: result.language || 'generic',
    };
  }

  // text_note
  const result = await base44.integrations.Core.InvokeLLM({
    prompt: `Write concise architecture notes as markdown for: "${userPrompt}". Return JSON with "title" and "text" (markdown with a heading and 3-4 bullet points).`,
    response_json_schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        text: { type: 'string' },
      },
    },
  });
  return {
    title: result.title || userPrompt,
    text: result.text || `### ${userPrompt}\n\n- Overview\n- Key components\n- Notes`,
  };
}