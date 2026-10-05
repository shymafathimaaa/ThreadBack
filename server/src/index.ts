import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { store } from './store.js';
import { AIService } from './ai.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const aiService = new AIService();

// ----------------------------------------------------
// Health Check & Status
// ----------------------------------------------------
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'ThreadBack Core Engine',
    geminiActive: aiService.isGeminiActive(),
    timestamp: new Date().toISOString()
  });
});

// ----------------------------------------------------
// Projects Endpoints
// ----------------------------------------------------
app.get('/api/projects', (req: Request, res: Response) => {
  try {
    const projects = store.getProjects();
    res.json(projects);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/projects', (req: Request, res: Response) => {
  try {
    const { name, description, goal, color, tags } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Project name is required' });
    }
    const project = store.createProject({
      name,
      description: description || '',
      goal: goal || '',
      color,
      tags
    });
    res.status(201).json(project);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/projects/:id', (req: Request, res: Response) => {
  try {
    const project = store.getProject(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    const sessions = store.getSessions(req.params.id);
    const memories = store.getSnapshots(req.params.id);
    res.json({
      ...project,
      sessions,
      memories
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/projects/:id', (req: Request, res: Response) => {
  try {
    const updated = store.updateProject(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/projects/:id', (req: Request, res: Response) => {
  try {
    const deleted = store.deleteProject(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ success: true, id: req.params.id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// Work Sessions Endpoints
// ----------------------------------------------------
app.get('/api/sessions', (req: Request, res: Response) => {
  try {
    const projectId = req.query.projectId as string | undefined;
    const sessions = store.getSessions(projectId);
    res.json(sessions);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/sessions/active', (req: Request, res: Response) => {
  try {
    const activeSession = store.getActiveSession();
    res.json(activeSession || null);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/sessions', (req: Request, res: Response) => {
  try {
    const { projectId, task, goal, notes } = req.body;
    if (!projectId || !task) {
      return res.status(400).json({ error: 'projectId and task are required' });
    }
    const session = store.startSession({
      projectId,
      task,
      goal: goal || '',
      notes
    });
    res.status(201).json(session);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/sessions/:id', (req: Request, res: Response) => {
  try {
    const session = store.getSession(req.params.id);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(session);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/sessions/:id/notes', (req: Request, res: Response) => {
  try {
    const { text, category } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Note text is required' });
    }
    const note = store.addSessionNote(req.params.id, text, category);
    if (!note) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.status(201).json(note);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/sessions/:id/end', async (req: Request, res: Response) => {
  try {
    const { accomplished, stoppedWhy, rememberNote, rawNotes } = req.body;
    const session = store.endSession(req.params.id, {
      accomplished,
      stoppedWhy,
      rememberNote,
      rawNotes
    });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Auto-generate AI snapshot
    const generated = await aiService.generateWorkSnapshot({
      projectId: session.projectId,
      projectName: session.projectName,
      task: session.task,
      goal: session.goal,
      notes: session.notes,
      reflections: session.reflections
    });

    const snapshot = store.createSnapshot({
      ...generated,
      sessionId: session.id
    });

    res.json({
      session,
      snapshot
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// AI Work Snapshot Direct Generation
// ----------------------------------------------------
app.post('/api/ai/work-snapshot', async (req: Request, res: Response) => {
  try {
    const { projectId, projectName, task, goal, notes, reflections, sessionId } = req.body;
    if (!task) {
      return res.status(400).json({ error: 'task name is required' });
    }

    const generated = await aiService.generateWorkSnapshot({
      projectId: projectId || 'demo-proj',
      projectName: projectName || 'Work Project',
      task,
      goal: goal || '',
      notes: notes || [],
      reflections
    });

    if (sessionId) {
      const savedSnapshot = store.createSnapshot({
        ...generated,
        sessionId
      });
      return res.json(savedSnapshot);
    }

    res.json(generated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// Work Memories / Snapshots Endpoints
// ----------------------------------------------------
app.get('/api/memories', (req: Request, res: Response) => {
  try {
    const projectId = req.query.projectId as string | undefined;
    const memories = store.getSnapshots(projectId);
    res.json(memories);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/memories/recent', (req: Request, res: Response) => {
  try {
    const recent = store.getMostRecentSnapshot();
    res.json(recent || null);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/memories/:id', (req: Request, res: Response) => {
  try {
    const memory = store.getSnapshot(req.params.id);
    if (!memory) {
      return res.status(404).json({ error: 'Work Memory not found' });
    }
    res.json(memory);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// Insights Endpoint
// ----------------------------------------------------
app.get('/api/insights', (req: Request, res: Response) => {
  try {
    const insights = store.getInsights();
    res.json(insights);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// Settings & Config Endpoints
// ----------------------------------------------------
app.get('/api/settings', (req: Request, res: Response) => {
  try {
    const settings = store.getSettings();
    res.json({
      ...settings,
      geminiApiKeyConfigured: aiService.isGeminiActive()
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/settings', (req: Request, res: Response) => {
  try {
    const { geminiApiKey, ...otherSettings } = req.body;
    if (geminiApiKey !== undefined) {
      aiService.setApiKey(geminiApiKey);
    }
    const updated = store.updateSettings({
      ...otherSettings,
      geminiApiKeyConfigured: aiService.isGeminiActive()
    });
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/demo/reset', (req: Request, res: Response) => {
  try {
    const data = store.resetToDemo();
    res.json({ success: true, message: 'Reset to demo state successfully', data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`⚡ ThreadBack Core Engine running on http://localhost:${PORT}`);
});
