import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Project, WorkSession, WorkSnapshot, UserSettings, InsightsData, SessionNote } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

export interface AppData {
  projects: Project[];
  sessions: WorkSession[];
  snapshots: WorkSnapshot[];
  settings: UserSettings;
}

export const SEED_DATA: AppData = {
  settings: {
    userName: 'Developer',
    role: 'Full-Stack Engineer',
    aiProvider: 'gemini',
    geminiApiKeyConfigured: false,
    theme: 'dark',
    autoSnapshot: true,
    connectedSources: {
      github: { connected: true, status: 'Active (repo: ThreadBack)' },
      vscode: { connected: true, status: 'Active extension' },
      calendar: { connected: false, status: 'Available' }
    },
    privacyStrict: true
  },
  snapshots: [
    {
      id: 'snap-peoplehub-1',
      sessionId: 'sess-peoplehub-1',
      projectId: 'proj-peoplehub',
      projectName: 'PeopleHub',
      task: 'Employee Management',
      goal: 'Build employee form UI and connect to POST endpoint',
      completed: 'Employee form UI and validation',
      decision: 'Use Zod for form validation',
      blocker: '401 authentication error',
      blockerCause: 'Possible JWT authentication middleware issue',
      context: 'Connecting the employee form to the backend. Form UI and Zod validation completed, but POST endpoint returns 401 unauthenticated.',
      nextAction: 'Fix JWT authentication and reconnect the POST endpoint',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      tags: ['peoplehub', 'auth', 'frontend'],
      whileYouWereAway: {
        detected: true,
        headline: 'Teammate resolved JWT auth headers in PR #42',
        details: 'Alex pushed updated bearer token validation and CORS middleware to develop branch.',
        updatedNextAction: 'Fix JWT authentication and reconnect the POST endpoint'
      }
    },
    {
      id: 'snap-fishflow-1',
      sessionId: 'sess-fishflow-1',
      projectId: 'proj-fishflow',
      projectName: 'FishFlow',
      task: 'Digital token generation',
      goal: 'Implement tokenized pickup verification & batch tally',
      completed: 'Fish selection cards and token generation protocol',
      decision: 'Use token-based pickup verification system',
      blocker: 'PDF token stream encoding',
      blockerCause: 'Binary buffer serialization timeout',
      context: 'Smart fish market token pickup pipeline. Token payload structure defined, completing client token download.',
      nextAction: 'Implement downloadable token PDF buffer generator and verify client stream',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      tags: ['fishflow', 'logistics', 'tokens']
    },
    {
      id: 'snap-roadlens-1',
      sessionId: 'sess-roadlens-1',
      projectId: 'proj-roadlens',
      projectName: 'RoadLens',
      task: 'Incident reporting workflow',
      goal: 'Deliver municipal incident dispatch pipeline',
      completed: 'Mapbox layer integration and GeoJSON parser',
      decision: 'Use MapLibre GL with deck.gl for smooth 60fps rendering',
      blocker: 'GeoJSON coordinate inversion on bounding box query',
      blockerCause: 'Latitude and longitude swapped in spatial query worker',
      context: 'AI-powered road issue reporting platform. Map viewport operational, fixing incident coordinate bbox query.',
      nextAction: 'Normalize lat/lng coordinates in spatial query worker',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      tags: ['roadlens', 'cv', 'maps']
    },
    {
      id: 'snap-agrismart-1',
      sessionId: 'sess-agrismart-1',
      projectId: 'proj-agrismart',
      projectName: 'AgriSmart',
      task: 'Crop administration dashboard',
      goal: 'Stream sensor telemetry into precision agriculture analytics',
      completed: 'MQTT broker subscriber and threshold alert notifications',
      decision: 'Use WebSocket broadcast with 500ms debounce rate',
      blocker: 'Sensor field calibration pending',
      blockerCause: 'Staging simulation complete',
      context: 'AI-powered smart office for agriculture administration. Telemetry ingest pipeline active.',
      nextAction: 'Calibrate moisture sensor threshold triggers on live field telemetry',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      tags: ['agrismart', 'iot', 'analytics']
    }
  ],
  sessions: [
    {
      id: 'sess-peoplehub-1',
      projectId: 'proj-peoplehub',
      projectName: 'PeopleHub',
      task: 'Employee Management',
      goal: 'Build employee form UI and connect to POST endpoint',
      notes: [
        { id: 'n1', text: 'Finished the employee form UI.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.8).toISOString(), category: 'progress' },
        { id: 'n2', text: 'Added form validation.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5).toISOString(), category: 'progress' },
        { id: 'n3', text: 'POST request is returning a 401.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.3).toISOString(), category: 'blocker' },
        { id: 'n4', text: 'I suspect the JWT middleware.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.2).toISOString(), category: 'decision' },
        { id: 'n5', text: 'Need to fix authentication before connecting the form.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.0).toISOString(), category: 'progress' }
      ],
      status: 'completed',
      startTime: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      endTime: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      durationSeconds: 3600,
      reflections: {
        accomplished: 'Employee form UI and validation schemas',
        stoppedWhy: '401 authentication error on POST /api/employees',
        rememberNote: 'Inspect JWT middleware and reconnect the employee POST endpoint'
      },
      snapshotId: 'snap-peoplehub-1'
    },
    {
      id: 'sess-fishflow-1',
      projectId: 'proj-fishflow',
      projectName: 'FishFlow',
      task: 'Digital token generation',
      goal: 'Implement tokenized pickup verification & batch tally',
      notes: [
        { id: 'n6', text: 'Built fish species picker and live weight calculator', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(), category: 'progress' },
        { id: 'n7', text: 'Selected token verification over SMS OTP for offline marina usage', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.5).toISOString(), category: 'decision' }
      ],
      status: 'completed',
      startTime: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
      endTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      durationSeconds: 7200,
      snapshotId: 'snap-fishflow-1'
    },
    {
      id: 'sess-roadlens-1',
      projectId: 'proj-roadlens',
      projectName: 'RoadLens',
      task: 'Incident reporting workflow',
      goal: 'Deliver municipal incident dispatch pipeline',
      notes: [
        { id: 'n8', text: 'Integrated deck.gl layers for road defect visualization', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(), category: 'progress' },
        { id: 'n9', text: 'BBox query returning empty results due to lat/lng inversion', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.2).toISOString(), category: 'blocker' }
      ],
      status: 'completed',
      startTime: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
      endTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      durationSeconds: 7200,
      snapshotId: 'snap-roadlens-1'
    },
    {
      id: 'sess-agrismart-1',
      projectId: 'proj-agrismart',
      projectName: 'AgriSmart',
      task: 'Crop administration dashboard',
      goal: 'Stream sensor telemetry into precision agriculture analytics',
      notes: [
        { id: 'n10', text: 'Configured MQTT telemetry listener', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 49).toISOString(), category: 'progress' }
      ],
      status: 'completed',
      startTime: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
      endTime: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      durationSeconds: 7200,
      snapshotId: 'snap-agrismart-1'
    }
  ],
  projects: [
    {
      id: 'proj-peoplehub',
      name: 'PeopleHub',
      description: 'Human Resource Management System',
      goal: 'Build employee create/edit forms, validation, and backend integration',
      currentTask: 'Employee Management',
      progress: 72,
      status: 'active',
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      color: '#A855F7',
      tags: ['HR System', 'React', 'Node.js'],
      activeSessionId: null
    },
    {
      id: 'proj-fishflow',
      name: 'FishFlow',
      description: 'Smart fish market token and pickup system',
      goal: 'Streamline dockside fish batch handover with verifiable tokens',
      currentTask: 'Digital token generation',
      progress: 58,
      status: 'active',
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      color: '#06B6D4',
      tags: ['Supply Chain', 'TypeScript', 'Tokens'],
      activeSessionId: null
    },
    {
      id: 'proj-roadlens',
      name: 'RoadLens',
      description: 'AI-powered road issue reporting and accountability platform',
      goal: 'Deliver municipal dashboard with automated road repair priorities',
      currentTask: 'Incident reporting workflow',
      progress: 64,
      status: 'active',
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      color: '#EC4899',
      tags: ['Computer Vision', 'GeoSpatial', 'Civil'],
      activeSessionId: null
    },
    {
      id: 'proj-agrismart',
      name: 'AgriSmart',
      description: 'AI-powered smart office for agriculture administration',
      goal: 'Deploy autonomous drip irrigation scheduler with predictive triggers',
      currentTask: 'Crop administration dashboard',
      progress: 46,
      status: 'active',
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      color: '#10B981',
      tags: ['Smart Agriculture', 'IoT', 'Analytics'],
      activeSessionId: null
    }
  ]
};

export class DataStore {
  private data: AppData;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): AppData {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        if (parsed && parsed.projects && parsed.projects.length >= 4) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Could not read store.json, using seed defaults:', err);
    }

    this.saveToFile(SEED_DATA);
    return JSON.parse(JSON.stringify(SEED_DATA));
  }

  private saveToFile(data: AppData) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to save store.json:', err);
    }
  }

  private persist() {
    this.saveToFile(this.data);
  }

  public resetToDemo(): AppData {
    this.data = JSON.parse(JSON.stringify(SEED_DATA));
    this.persist();
    return this.data;
  }

  public getProjects(): Project[] {
    return this.data.projects.map(p => {
      const lastSnap = this.data.snapshots
        .filter(s => s.projectId === p.id)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
      return {
        ...p,
        lastSnapshot: lastSnap
      };
    });
  }

  public getProject(id: string): Project | undefined {
    const project = this.data.projects.find(p => p.id === id);
    if (!project) return undefined;
    const lastSnap = this.data.snapshots
      .filter(s => s.projectId === project.id)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
    return {
      ...project,
      lastSnapshot: lastSnap
    };
  }

  public createProject(input: { name: string; description: string; goal: string; color?: string; tags?: string[] }): Project {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: input.name.trim(),
      description: input.description.trim(),
      goal: input.goal.trim(),
      currentTask: input.goal.trim() ? `Initial setup for ${input.name}` : 'Project kickoff',
      progress: 5,
      status: 'active',
      lastActive: new Date().toISOString(),
      color: input.color || '#A855F7',
      tags: input.tags || ['Project'],
      activeSessionId: null
    };
    this.data.projects.unshift(newProject);
    this.persist();
    return newProject;
  }

  public updateProject(id: string, updates: Partial<Project>): Project | undefined {
    const idx = this.data.projects.findIndex(p => p.id === id);
    if (idx === -1) return undefined;
    this.data.projects[idx] = {
      ...this.data.projects[idx],
      ...updates,
      lastActive: new Date().toISOString()
    };
    this.persist();
    return this.data.projects[idx];
  }

  public deleteProject(id: string): boolean {
    const initialLen = this.data.projects.length;
    this.data.projects = this.data.projects.filter(p => p.id !== id);
    if (this.data.projects.length !== initialLen) {
      this.persist();
      return true;
    }
    return false;
  }

  public getSessions(projectId?: string): WorkSession[] {
    if (projectId) {
      return this.data.sessions.filter(s => s.projectId === projectId);
    }
    return [...this.data.sessions].sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
  }

  public getSession(id: string): WorkSession | undefined {
    return this.data.sessions.find(s => s.id === id);
  }

  public getActiveSession(): WorkSession | undefined {
    return this.data.sessions.find(s => s.status === 'active');
  }

  public startSession(input: { projectId: string; task: string; goal: string; notes?: string }): WorkSession {
    this.data.sessions.forEach(s => {
      if (s.status === 'active') {
        s.status = 'completed';
        s.endTime = new Date().toISOString();
      }
    });

    const project = this.getProject(input.projectId);
    const projectName = project ? project.name : 'PeopleHub';

    const session: WorkSession = {
      id: `sess-${Date.now()}`,
      projectId: input.projectId,
      projectName,
      task: input.task,
      goal: input.goal,
      notes: input.notes ? [{
        id: `note-${Date.now()}`,
        text: input.notes,
        timestamp: new Date().toISOString(),
        category: 'general'
      }] : [],
      status: 'active',
      startTime: new Date().toISOString()
    };

    this.data.sessions.unshift(session);

    if (project) {
      this.updateProject(project.id, {
        currentTask: input.task,
        activeSessionId: session.id,
        lastActive: new Date().toISOString()
      });
    }

    this.persist();
    return session;
  }

  public addSessionNote(sessionId: string, text: string, category?: 'progress' | 'decision' | 'blocker' | 'general'): SessionNote | undefined {
    const session = this.getSession(sessionId);
    if (!session) return undefined;
    const newNote: SessionNote = {
      id: `note-${Date.now()}`,
      text: text.trim(),
      timestamp: new Date().toISOString(),
      category: category || (text.toLowerCase().includes('decision') ? 'decision' : text.toLowerCase().includes('error') || text.toLowerCase().includes('block') || text.toLowerCase().includes('401') ? 'blocker' : 'progress')
    };
    session.notes.push(newNote);
    this.persist();
    return newNote;
  }

  public endSession(sessionId: string, reflections?: { accomplished?: string; stoppedWhy?: string; rememberNote?: string; rawNotes?: string }): WorkSession | undefined {
    const session = this.getSession(sessionId);
    if (!session) return undefined;

    const endTime = new Date().toISOString();
    const durationSeconds = Math.max(60, Math.floor((new Date(endTime).getTime() - new Date(session.startTime).getTime()) / 1000));

    session.status = 'completed';
    session.endTime = endTime;
    session.durationSeconds = durationSeconds;
    session.reflections = reflections;

    const project = this.getProject(session.projectId);
    if (project) {
      this.updateProject(project.id, {
        activeSessionId: null,
        lastActive: endTime,
        progress: Math.min(100, (project.progress || 50) + 4)
      });
    }

    this.persist();
    return session;
  }

  public createSnapshot(snapshotData: Omit<WorkSnapshot, 'id' | 'timestamp'>): WorkSnapshot {
    const newSnapshot: WorkSnapshot = {
      ...snapshotData,
      id: `snap-${Date.now()}`,
      timestamp: new Date().toISOString()
    };

    this.data.snapshots.unshift(newSnapshot);

    const session = this.getSession(snapshotData.sessionId);
    if (session) {
      session.snapshotId = newSnapshot.id;
    }

    const project = this.getProject(snapshotData.projectId);
    if (project) {
      this.updateProject(project.id, {
        currentTask: snapshotData.task,
        lastActive: newSnapshot.timestamp
      });
    }

    this.persist();
    return newSnapshot;
  }

  public getSnapshots(projectId?: string): WorkSnapshot[] {
    if (projectId) {
      return this.data.snapshots.filter(s => s.projectId === projectId);
    }
    return [...this.data.snapshots].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  public getSnapshot(id: string): WorkSnapshot | undefined {
    return this.data.snapshots.find(s => s.id === id);
  }

  public getMostRecentSnapshot(): WorkSnapshot | undefined {
    return this.getSnapshots()[0];
  }

  public getSettings(): UserSettings {
    return this.data.settings;
  }

  public updateSettings(settings: Partial<UserSettings>): UserSettings {
    this.data.settings = {
      ...this.data.settings,
      ...settings
    };
    this.persist();
    return this.data.settings;
  }

  public getInsights(): InsightsData {
    const totalSessions = this.data.sessions.filter(s => s.status === 'completed').length;
    const totalDurationSec = this.data.sessions
      .filter(s => s.status === 'completed')
      .reduce((sum, s) => sum + (s.durationSeconds || 1800), 0);
    
    const avgMins = totalSessions > 0 ? Math.round(totalDurationSec / (totalSessions * 60)) : 45;

    const projectCounts: Record<string, { count: number; name: string; seconds: number }> = {};
    this.data.sessions.forEach(s => {
      if (!projectCounts[s.projectId]) {
        projectCounts[s.projectId] = { count: 0, name: s.projectName, seconds: 0 };
      }
      projectCounts[s.projectId].count += 1;
      projectCounts[s.projectId].seconds += (s.durationSeconds || 1800);
    });

    let topProject = { name: 'PeopleHub', sessionCount: 5, minutes: 210 };
    let maxCount = 0;
    Object.values(projectCounts).forEach(p => {
      if (p.count > maxCount) {
        maxCount = p.count;
        topProject = { name: p.name, sessionCount: p.count, minutes: Math.round(p.seconds / 60) };
      }
    });

    return {
      mostActiveProject: topProject,
      mostCommonBlocker: {
        issue: '401 Authentication Error',
        occurrences: 4,
        category: 'Auth / Security'
      },
      averageSessionDurationMinutes: avgMins || 45,
      projectsRecentlyResumed: 4,
      workSessionsCompleted: Math.max(8, totalSessions),
      totalFocusHours: Number(((totalDurationSec || 28800) / 3600).toFixed(1)),
      continuityScore: 98,
      weeklyVelocity: [
        { day: 'Mon', minutes: 120, sessions: 3 },
        { day: 'Tue', minutes: 180, sessions: 4 },
        { day: 'Wed', minutes: 90, sessions: 2 },
        { day: 'Thu', minutes: 210, sessions: 5 },
        { day: 'Fri', minutes: 150, sessions: 3 },
        { day: 'Sat', minutes: 80, sessions: 2 },
        { day: 'Sun', minutes: 140, sessions: 3 }
      ]
    };
  }
}

export const store = new DataStore();
