import { Layers, Rocket, Database, Box, TrendingUp, Megaphone } from 'lucide-react';
import { demoPayload } from './demoContent';

export const TEMPLATES = [
  {
    id: 'startup-arch',
    name: 'Startup Architecture',
    description: 'Map out your startup\'s system architecture with flowcharts, data models, and tech stack.',
    category: 'Engineering',
    icon: Layers,
    elements: [
      { type: 'flowchart', x_pos: 80, y_pos: 80, width: 520, height: 310, z_index: 1, payload: demoPayload.flowchart },
      { type: 'database_erd', x_pos: 680, y_pos: 120, width: 430, height: 390, z_index: 2, payload: demoPayload.database_erd },
      { type: 'tech_stack', x_pos: 150, y_pos: 460, width: 430, height: 280, z_index: 3, payload: demoPayload.tech_stack },
    ],
  },
  {
    id: 'product-launch',
    name: 'Product Launch Plan',
    description: 'Plan your product launch with landing pages, pitch decks, and ad creatives.',
    category: 'Marketing',
    icon: Rocket,
    elements: [
      { type: 'landing_page', x_pos: 80, y_pos: 80, width: 420, height: 350, z_index: 1, payload: demoPayload.landing_page },
      { type: 'presentation', x_pos: 560, y_pos: 100, width: 400, height: 340, z_index: 2, payload: demoPayload.presentation },
      { type: 'ad_creative', x_pos: 200, y_pos: 480, width: 400, height: 260, z_index: 3, payload: demoPayload.ad_creative },
    ],
  },
  {
    id: 'database-sprint',
    name: 'Database Design Sprint',
    description: 'Design your database schema with ERDs, flowcharts, and architecture notes.',
    category: 'Engineering',
    icon: Database,
    elements: [
      { type: 'database_erd', x_pos: 80, y_pos: 80, width: 460, height: 400, z_index: 1, payload: demoPayload.database_erd },
      { type: 'flowchart', x_pos: 600, y_pos: 100, width: 480, height: 300, z_index: 2, payload: demoPayload.flowchart },
      { type: 'text_note', x_pos: 200, y_pos: 530, width: 400, height: 250, z_index: 3, payload: demoPayload.text_note },
    ],
  },
  {
    id: 'full-stack-blueprint',
    name: 'Full-Stack Blueprint',
    description: 'Complete system design with architecture flow, data model, tech stack, and notes.',
    category: 'Engineering',
    icon: Box,
    elements: [
      { type: 'flowchart', x_pos: 80, y_pos: 60, width: 500, height: 280, z_index: 1, payload: demoPayload.flowchart },
      { type: 'database_erd', x_pos: 640, y_pos: 60, width: 440, height: 380, z_index: 2, payload: demoPayload.database_erd },
      { type: 'tech_stack', x_pos: 80, y_pos: 400, width: 460, height: 280, z_index: 3, payload: demoPayload.tech_stack },
      { type: 'text_note', x_pos: 600, y_pos: 490, width: 400, height: 220, z_index: 4, payload: demoPayload.text_note },
    ],
  },
  {
    id: 'gtm-strategy',
    name: 'Go-to-Market Strategy',
    description: 'Plan your go-to-market with ad creatives, landing pages, and pitch presentations.',
    category: 'Marketing',
    icon: TrendingUp,
    elements: [
      { type: 'ad_creative', x_pos: 80, y_pos: 80, width: 400, height: 260, z_index: 1, payload: demoPayload.ad_creative },
      { type: 'landing_page', x_pos: 540, y_pos: 80, width: 420, height: 350, z_index: 2, payload: demoPayload.landing_page },
      { type: 'presentation', x_pos: 180, y_pos: 400, width: 420, height: 340, z_index: 3, payload: demoPayload.presentation },
    ],
  },
  {
    id: 'brand-campaign',
    name: 'Brand Campaign Kit',
    description: 'Launch a brand campaign with ad creatives, video concepts, and landing pages.',
    category: 'Marketing',
    icon: Megaphone,
    elements: [
      { type: 'ad_creative', x_pos: 80, y_pos: 80, width: 400, height: 260, z_index: 1, payload: demoPayload.ad_creative },
      { type: 'video_ad', x_pos: 540, y_pos: 80, width: 380, height: 320, z_index: 2, payload: demoPayload.video_ad },
      { type: 'landing_page', x_pos: 180, y_pos: 420, width: 420, height: 350, z_index: 3, payload: demoPayload.landing_page },
    ],
  },
];