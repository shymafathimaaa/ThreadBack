# THREADBACK

> **“Never restart from zero.”**

ThreadBack is an AI-powered work continuity system built for developers, hackathon teams, students, and researchers.

Traditional productivity apps remember **what** you need to do.
**ThreadBack remembers *why* you were doing it, exactly where you stopped, and what to do next.**

---

## 🚀 Key Features

### 1. The Hero Experience: Welcome Back Briefing
When you return to ThreadBack after hours or days away, you are greeted with a Work Continuity card:
- **Project & Task:** Exactly what you were working on.
- **✓ Completed:** What milestones were finished before pausing.
- **◆ Key Decisions:** Technical or architectural decisions made during work (e.g. *“Use Zod for schema validation”*).
- **⚠ Blocker:** The stopping point or obstacle (e.g. *“401 Authentication Error”*).
- **While You Were Away:** Diff detection (e.g. *“Alex merged PR #42 fixing JWT auth middleware”*).
- **→ Recommended Next Action:** Single clear imperative step with a prominent **[ Continue Work → ]** action.

### 2. Live Focus Session & Micro-Logging
- Distraction-free active session timer.
- Real-time logging of progress, architectural decisions, and errors with one click.

### 3. AI Work Continuity Snapshot Synthesis
- Structured AI analysis when ending a session.
- Powered by **Google Gemini** with an intelligent **deterministic fallback** engine so the application never breaks even without an API key.

### 4. Work Memory Archive
- Searchable chronological repository of past work snapshots.
- Filter by project, blocker taxonomy, and instant resume triggers.

### 5. Work Continuity Insights
- Context switching recovery velocity, focus time breakdown, and blocker analysis.

### 6. Connected Work Sources & Privacy-First Architecture
- Integrations for GitHub PR sync, VS Code extension, and Calendar.
- **Privacy Guarantee:** ThreadBack only uses work information you choose to share or connect.

---

## 🛠️ Architecture & Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS (Dark Charcoal & Controlled Neon Theme), Lucide Icons, Canvas Confetti.
- **Backend:** Node.js, Express, TypeScript REST API.
- **AI Engine:** Google Gemini GenAI SDK (`@google/genai`) + Built-in deterministic fallback engine.
- **Persistence:** Local JSON data store with instant reset support.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install
(cd server && npm install)
(cd client && npm install)

# 2. Run both backend and frontend concurrently
npm run dev
```

- **Client:** `http://localhost:5173`
- **API Server:** `http://localhost:3001`

---

## 🎯 Hackathon 2-Minute Demo Flow

1. Open **`http://localhost:5173`** — see the greeting and the **Welcome Back** card for **PeopleHub**.
2. Notice the **While you were away** update and **Recommended Next Action**.
3. Click **[ Continue Work → ]** to start a work session on PeopleHub.
4. Add quick notes:
   - *"Finished employee form UI and validation"*
   - *"POST /api/employees returns 401 Unauthorized"*
5. Click **[ End Session ]** → fill in quick reflections → click **[ Generate Work Memory ]**.
6. Watch the AI State Reconstruction animation create the new **AI Work Snapshot**.
7. Return to the **Dashboard** — see your new snapshot immediately powering the **Welcome Back** hero!
