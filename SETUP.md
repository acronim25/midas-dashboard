# Midas Mission Control - Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
cd dashboard
npm install
```

### 2. Set Up Environment Variables
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### 3. Initialize Convex
```bash
npx convex dev
```

### 4. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000

## File System Integration

The dashboard reads from `~/.openclaw/workspace/` by default. Ensure this path exists and contains:

```
~/.openclaw/workspace/
├── IDENTITY.md
├── MEMORY.md
├── state/
│   ├── servers.json
│   ├── crons.json
│   └── revenue.json
├── content/
│   └── queue.md
└── agents/
    └── registry.json
```

## Building for Production

```bash
npm run build
npm start
```

## Troubleshooting

### Issue: API routes return 500
**Fix:** Check that `OPENCLAW_WORKSPACE` path exists and is readable.

### Issue: Convex connection fails
**Fix:** Ensure `NEXT_PUBLIC_CONVEX_URL` is set correctly and Convex dev server is running.

### Issue: Dark mode not working
**Fix:** The app is dark mode only. Check that `className="dark"` is on html element.

## Features Overview

| Feature | Status | Notes |
|---------|--------|-------|
| Home Dashboard | ✅ Complete | Auto-refresh every 15s |
| Operations | ✅ Complete | 3 tabs with full functionality |
| Chat | ✅ Complete | Sessions, messaging, voice ready |
| Agents | 🚧 Placeholder | Ready for registry integration |
| Content | 🚧 Placeholder | Kanban structure ready |
| Comms | 🚧 Placeholder | Framework ready |
| Knowledge | 🚧 Placeholder | Search framework ready |
| Code | 🚧 Placeholder | Git integration ready |

## Next Steps

1. Connect Convex real-time subscriptions
2. Implement agent detail views
3. Add content kanban with drag-and-drop
4. Integrate Discord/Telegram APIs
5. Add knowledge search with vector DB

---

Built for Alex & Diana 🏆
