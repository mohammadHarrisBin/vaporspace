export function generateClaudeCodePrompt(canvasData) {
  const { title } = canvasData.canvas;
  const elements = canvasData.elements || [];

  let markdown = `# Software Requirement Document & System Architecture: ${title.toUpperCase()}\n\n`;
  markdown += `You are an expert full-stack developer. Build a complete, production-ready full-stack application based on the following spatial system specifications:\n\n`;

  elements.forEach((el, idx) => {
    const { type, payload } = el;
    if (!payload) return;

    markdown += `--- \n## Component ${idx + 1}: [${type.toUpperCase()}] - ${payload.title || 'Untitled'}\n\n`;

    switch (type) {
      case 'ui_wireframe':
      case 'landing_page':
        if (payload.html) {
          markdown += `### HTML/UI Blueprint:\n\`\`\`html\n${payload.html}\n\`\`\`\n\n`;
        }
        break;

      case 'flowchart':
        if (payload.mermaid) {
          markdown += `### Business Logic & User Flow (Mermaid):\n\`\`\`mermaid\n${payload.mermaid}\n\`\`\`\n\n`;
        }
        if (payload.steps) {
          markdown += `**Execution Steps:**\n${payload.steps.map(s => `- ${s}`).join('\n')}\n\n`;
        }
        break;

      case 'tech_stack':
        if (payload.categories) {
          markdown += `### Required Tech Stack:\n`;
          payload.categories.forEach(cat => {
            markdown += `- **${cat.name}:** ${cat.items.join(', ')}\n`;
          });
          markdown += `\n`;
        }
        break;

      case 'database_erd':
        if (payload.tables) {
          markdown += `### Database Schema & Tables:\n`;
          payload.tables.forEach(table => {
            markdown += `#### Table: \`${table.name}\`\n`;
            markdown += `| Field Name | Type | Key |\n| --- | --- | --- |\n`;
            table.fields.forEach(field => {
              markdown += `| ${field[0]} | ${field[1]} | ${field[2] || '-'} |\n`;
            });
            markdown += `\n`;
          });
        }
        break;

      case 'text_note':
        if (payload.text) {
          markdown += `### System Requirements & Notes:\n${payload.text}\n\n`;
        }
        break;

      case 'ad_creative':
        if (payload.headline) {
          markdown += `### Marketing & Value Proposition:\n`;
          markdown += `- **Headline:** ${payload.headline}\n`;
          markdown += `- **Body:** ${payload.body}\n`;
          markdown += `- **CTA:** ${payload.cta}\n\n`;
        }
        break;

      case 'pseudocode':
        if (payload.code) {
          markdown += `### Algorithm / Pseudocode:\n\`\`\`\n${payload.code}\n\`\`\`\n\n`;
        }
        break;

      case 'presentation':
        if (payload.slides) {
          markdown += `### Presentation Slides:\n`;
          payload.slides.forEach((slide, i) => {
            markdown += `#### Slide ${i + 1}: ${slide.title}\n`;
            (slide.bullets || []).forEach(b => { markdown += `- ${b}\n`; });
            markdown += `\n`;
          });
        }
        break;

      default:
        markdown += `\`\`\`json\n${JSON.stringify(payload, null, 2)}\n\`\`\`\n\n`;
    }
  });

  markdown += `\n### Instructions for Claude Code:\n`;
  markdown += `1. Initialize the project directory structure based on the tech stack above.\n`;
  markdown += `2. Set up the database schema according to the ERD table specs.\n`;
  markdown += `3. Implement the frontend layout using Next.js/Tailwind matching the HTML wireframes.\n`;
  markdown += `4. Implement the core workflows defined in the flowchart logic.\n`;

  return markdown;
}