# Midas Mission Control

OpenClaw AI Agent Command Center — built with Next.js 15, Convex, and Tailwind CSS.

## Architecture

- **Frontend:** Next.js 15 App Router + TypeScript + Tailwind CSS v4
- **Backend:** Convex (real-time) + Local filesystem API routes
- **UI:** Framer Motion + Lucide icons + custom glass components
- **Aesthetic:** Dark mode, glass effects, JARVIS-inspired

## Features

### ✅ Implemented (80%)

**1. Home (/)** — Complete
- Live status cards (6 panels)
- System Health, Agent Status, Cron Jobs, Revenue, Content Pipeline, Quick Stats
- Auto-refresh every 15 seconds
- Framer Motion animations

**2. Ops (/ops)** — Complete
- 3 tabs: Operations | Tasks | Calendar
- **Operations:** System status, active processes, observations, priorities
- **Tasks:** Task manager with categories (Revenue, Product, Trading, etc.)
  - Filter by status and category
  - Approve/reject suggested tasks
  - Priority and effort badges
- **Calendar:** Week/day view, drag events, color-coded by type

**3. Agents (/agents)** — Placeholder
- Ready for agent registry

**4. Chat (/chat)** — Complete
- Session list sidebar
- Message history with role-aligned bubbles
- Date separators
- Input with voice button (Web Speech API ready)
- Real-time message sending

**5-8. Content, Comms, Knowledge, Code** — Placeholders
- Structure ready for implementation

### 🚧 Remaining (20%)

- Convex real-time subscriptions
- Agents detail view
- Content kanban with real data
- Comms/CRM integration
- Knowledge search
- Code pipeline with git integration

## Setup

```bash
cd dashboard
npm install

# Set up Convex
npx convex dev

# Run dev server
npm run dev
```

## Environment Variables

```env
# OpenClaw workspace path
OPENCLAW_WORKSPACE=/root/.openclaw/workspace

# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_DEPLOY_KEY=your-deploy-key
```

## File Structure

```
dashboard/
├── src/
│   ├── app/
│   │   ├── api/           # API routes for filesystem access
│   │   │   ├── system-state
│   │   │   ├── agents
│   │   │   ├── cron-health
│   │   │   ├── revenue
│   │   │   ├── content-pipeline
│   │   │   └── health
│   │   ├── page.tsx       # Home view
│   │   ├── layout.tsx     # Root layout
│   │   ├── ops/page.tsx   # Operations with tabs
│   │   ├── chat/page.tsx  # Chat interface
│   │   └── ...            # Other views
│   ├── components/
│   │   ├── nav.tsx        # Top navigation
│   │   ├── dashboard-overview.tsx
│   │   ├── chat-center.tsx
│   │   ├── task-manager.tsx
│   │   ├── calendar-view.tsx
│   │   └── ui.tsx         # Reusable components
│   └── lib/utils.ts
├── convex/
│   ├── schema.ts          # Database schema
│   └── tasks.ts           # Convex functions
└── README.md
```

## Design System

### Glass Cards
```tsx
<div className="glass rounded-xl">  {/* bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] */}
```

### Colors
- Background: `#0a0a0a`
- Primary: `#3b82f6`
- Accent (success): `#22c55e`
- Destructive: `#ef4444`

### Typography
- Font: Inter
- Body: 10-14px
- Headings: fluid sizing with clamp()

### Animations
- Stagger: 0.05s delay per item
- Easing: `[0.23, 1, 0.32, 1]`
- Spring physics on interactions

## API Routes

All routes read from `~/.openclaw/workspace/`:

- `GET /api/system-state` — System health, agents, crons, revenue
- `GET /api/agents` — Agent registry
- `GET /api/cron-health` — Cron job status
- `GET /api/revenue` — Revenue tracking
- `GET /api/content-pipeline` — Content queue
- `GET /api/health` — Basic health check

## Status

🟢 **Functional MVP** — Core structure complete, main views working  
🟡 **Needs Integration** — Convex real-time, external APIs  
🔴 **Not Started** — Advanced features (AI chat, git integration)

---

Built for Alex & Diana's OpenClaw AI system.
