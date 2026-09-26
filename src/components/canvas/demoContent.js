export const GENERATORS = [
  { type: 'flowchart', label: 'Flowchart & Diagrams', cost: 2, icon: '◈' },
  { type: 'database_erd', label: 'Database Schema / ERD', cost: 2, icon: '▤' },
  { type: 'text_note', label: 'Text & Notes', cost: 1, icon: '≡' },
  { type: 'ui_wireframe', label: 'UI Wireframes', cost: 3, icon: '▣' },
  { type: 'image', label: 'Image / Logo Design', cost: 5, icon: '✧' },
  { type: 'landing_page', label: 'Landing Page', cost: 4, icon: '▦' },
  { type: 'presentation', label: 'Presentation', cost: 4, icon: '◧' },
  { type: 'ad_creative', label: 'Ad Creative', cost: 3, icon: '◆' },
  { type: 'video_ad', label: 'Video Ad', cost: 50, icon: '▶' },
  { type: 'tech_stack', label: 'Tech Stack', cost: 2, icon: '⚡' },
  { type: 'pseudocode', label: 'Pseudocode', cost: 2, icon: '#' },
];

export const demoPayload = {
  flowchart: {
    title: 'Request lifecycle',
    mermaid: 'flowchart LR\n  A[Client] --> B[API Gateway]\n  B --> C{Authorize}\n  C -->|Allowed| D[Service]\n  D --> E[(Database)]',
    steps: ['Client', 'API Gateway', 'Authorize', 'Service', 'Database'],
  },
  database_erd: {
    title: 'Core data model',
    tables: [
      { name: 'projects', fields: [['id', 'uuid', 'PK'], ['owner_id', 'uuid', 'FK'], ['name', 'varchar', ''], ['created_at', 'timestamp', '']] },
      { name: 'tasks', fields: [['id', 'uuid', 'PK'], ['project_id', 'uuid', 'FK'], ['status', 'varchar', ''], ['due_date', 'date', '']] },
    ],
  },
  text_note: {
    title: 'Architecture notes',
    text: '### System overview\nA modular project-planning platform with clear service boundaries.\n\n- **Frontend:** responsive spatial workspace\n- **API:** authenticated endpoints\n- **Storage:** relational data model',
  },
  ui_wireframe: { title: 'Workspace wireframe' },
  image: { title: 'Image concept', text: 'A visual direction for a connected software workspace' },
  landing_page: {
    title: 'Landing page',
    html: '<section style="padding:40px 20px;text-align:center;font-family:system-ui"><h1 style="font-size:28px;margin:0 0 8px">Build the Future</h1><p style="color:#64748b;margin:0 0 24px">A modern platform for modern teams.</p><button style="background:#0f172a;color:#fff;border:none;padding:12px 28px;border-radius:8px;font-size:14px;cursor:pointer">Get Started</button></section>',
  },
  presentation: {
    title: 'Product pitch',
    slides: [
      { title: 'The Problem', bullets: ['Manual workflows waste time', 'Teams lack visibility'] },
      { title: 'Our Solution', bullets: ['Automated pipeline', 'Real-time dashboard'] },
      { title: 'Market', bullets: ['$2B TAM', 'Growing 15% YoY'] },
      { title: 'Next Steps', bullets: ['Ship MVP', 'Onboard pilot users'] },
    ],
  },
  ad_creative: {
    title: 'Ad campaign',
    headline: 'Ship faster with VaporSpace',
    body: 'The spatial workspace that turns ideas into architecture. Generate diagrams, databases, and designs in seconds.',
    cta: 'Start free →',
    targeting: 'Product managers and tech leads at early-stage startups',
  },
  video_ad: { title: 'Video ad concept', text: 'A 6-second cinematic product showcase video' },
  tech_stack: {
    title: 'Recommended tech stack',
    categories: [
      { name: 'Frontend', items: ['React', 'Tailwind CSS', 'Vite'] },
      { name: 'Backend', items: ['Node.js', 'Express', 'REST API'] },
      { name: 'Database', items: ['PostgreSQL', 'Redis'] },
      { name: 'DevOps', items: ['Docker', 'GitHub Actions', 'Vercel'] },
    ],
  },
  pseudocode: {
    title: 'User authentication flow',
    code: 'function authenticate(username, password):\n  user = database.findUser(username)\n  if user is None:\n    return "User not found"\n  if not verifyPassword(password, user.hash):\n    return "Invalid password"\n  token = generateToken(user.id)\n  return token',
    language: 'python',
  },
};

export const starterElements = [
  { type: 'flowchart', x_pos: 90, y_pos: 90, width: 520, height: 200, z_index: 1, payload: demoPayload.flowchart },
  { type: 'database_erd', x_pos: 680, y_pos: 90, width: 430, height: 230, z_index: 2, payload: demoPayload.database_erd },
  { type: 'text_note', x_pos: 90, y_pos: 330, width: 390, height: 200, z_index: 3, payload: demoPayload.text_note },
];