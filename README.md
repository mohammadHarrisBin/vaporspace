```markdown
# VaporSpace 🌌

VaporSpace is an infinite spatial AI canvas for system architecture and instant UI blueprinting. It turns high-level prompts into 11 visual canvas nodes, including flowcharts, database ERDs, UI wireframes, tech stacks, and executable PRD prompts.

Live Demo: https://vaporspace.world

---

## 🛠️ Built With & Nebius / NVIDIA Integration

VaporSpace relies on **Nebius AI Cloud** and **NVIDIA** models to power real-time spatial generation:

- **Inference Engine:** Powered by **Nebius Token Factory** for low-latency API inference.
- **AI Model:** **NVIDIA Nemotron / Llama 3.1 70B Instruct**, generating structured JSON schemas for flowcharts (Mermaid.js), database ERDs, tech stacks, and React wireframes.
- **Why Nebius & NVIDIA:** Nebius Token Factory provides high-throughput, low time-to-first-token (TTFT) streaming, allowing spatial canvas nodes to render instantly without lagging the browser canvas state.

---

## 🚀 Setup & Local Development Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/mohammadHarrisBin/vaporspace.git](https://github.com/mohammadHarrisBin/vaporspace.git)
   cd vaporspace

```

2. Install dependencies:
```bash
npm install

```


3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
VITE_NEBIUS_API_KEY=your_nebius_token_factory_api_key
VITE_NEBIUS_API_URL=[https://api.tokenfactory.nebius.com/v1](https://api.tokenfactory.nebius.com/v1)

```


4. Run the development server:
```bash
npm run dev

```


5. Open `http://localhost:5173` in your browser.

---

## 📜 License

This project is licensed under the [MIT License](https://www.google.com/search?q=LICENSE&utm_source=gemini).

```

```
