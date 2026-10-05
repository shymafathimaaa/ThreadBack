import { Project, WorkSession, WorkSnapshot, UserSettings, InsightsData, SessionNote } from '../types';

const API_BASE = '/api';
const STORAGE_KEY = 'threadback_app_data_v1';

export const INITIAL_DEMO_DATA = {
  settings: {
    userName: 'Developer',
    role: 'Full-Stack Engineer',
    aiProvider: 'gemini' as const,
    geminiApiKeyConfigured: false,
    theme: 'dark' as const,
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
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      tags: ['peoplehub', 'auth', 'frontend'],
      whileYouWereAway: {
        detected: true,
        headline: 'Teammate resolved JWT auth in PR #42',
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
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // Yesterday
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
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // Yesterday
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
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
      tags: ['agrismart', 'iot', 'analytics']
    }
  ] as WorkSnapshot[],
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
      status: 'completed' as const,
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
      status: 'completed' as const,
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
        { id: 'n8', text: 'Integrated deck.gl layers for road defect visualization', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 37).toISOString(), category: 'progress' },
        { id: 'n9', text: 'BBox query returning empty results due to lat/lng inversion', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36.2).toISOString(), category: 'blocker' }
      ],
      status: 'completed' as const,
      startTime: new Date(Date.now() - 1000 * 60 * 60 * 38).toISOString(),
      endTime: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
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
      status: 'completed' as const,
      startTime: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
      endTime: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      durationSeconds: 7200,
      snapshotId: 'snap-agrismart-1'
    }
  ] as WorkSession[],
  projects: [
    {
      id: 'proj-peoplehub',
      name: 'PeopleHub',
      description: 'Human Resource Management System',
      goal: 'Build employee create/edit forms, validation, and backend integration',
      currentTask: 'Employee Management',
      progress: 72,
      status: 'active' as const,
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
      status: 'active' as const,
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
      status: 'active' as const,
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
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
      status: 'active' as const,
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      color: '#10B981',
      tags: ['Smart Agriculture', 'IoT', 'Analytics'],
      activeSessionId: null
    }
  ] as Project[]
};

// Local storage helper
function getLocalData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.projects && parsed.projects.length >= 4) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('localStorage error:', e);
  }
  // Initialize seed in localStorage
  setLocalData(INITIAL_DEMO_DATA);
  return JSON.parse(JSON.stringify(INITIAL_DEMO_DATA));
}

function setLocalData(data: any) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('localStorage save error:', e);
  }
}

export const api = {
  // Projects
  async getProjects(): Promise<Project[]> {
    try {
      const res = await fetch(`${API_BASE}/projects`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const local = getLocalData();
          local.projects = data;
          setLocalData(local);
          return data;
        }
      }
    } catch (e) {
      // fallback to local
    }
    const local = getLocalData();
    return local.projects.map((p: Project) => {
      const lastSnap = (local.snapshots || [])
        .filter((s: WorkSnapshot) => s.projectId === p.id)
        .sort((a: WorkSnapshot, b: WorkSnapshot) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
      return { ...p, lastSnapshot: lastSnap };
    });
  },

  async getProject(id: string): Promise<Project> {
    try {
      const res = await fetch(`${API_BASE}/projects/${id}`);
      if (res.ok) return res.json();
    } catch (e) {}

    const local = getLocalData();
    const proj = local.projects.find((p: Project) => p.id === id);
    if (!proj) throw new Error('Project not found');
    const lastSnap = (local.snapshots || []).find((s: WorkSnapshot) => s.projectId === id);
    const sessions = (local.sessions || []).filter((s: WorkSession) => s.projectId === id);
    const memories = (local.snapshots || []).filter((s: WorkSnapshot) => s.projectId === id);
    return { ...proj, lastSnapshot: lastSnap, sessions, memories };
  },

  async createProject(data: { name: string; description: string; goal: string; color?: string; tags?: string[] }): Promise<Project> {
    try {
      const res = await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const proj = await res.json();
        const local = getLocalData();
        local.projects.unshift(proj);
        setLocalData(local);
        return proj;
      }
    } catch (e) {}

    const local = getLocalData();
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name: data.name.trim(),
      description: data.description.trim(),
      goal: data.goal.trim(),
      currentTask: data.goal.trim() ? `Initial setup for ${data.name}` : 'Project kickoff',
      progress: 5,
      status: 'active',
      lastActive: new Date().toISOString(),
      color: data.color || '#A855F7',
      tags: data.tags || ['Project'],
      activeSessionId: null
    };
    local.projects.unshift(newProj);
    setLocalData(local);
    return newProj;
  },

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return res.json();
    } catch (e) {}

    const local = getLocalData();
    const idx = local.projects.findIndex((p: Project) => p.id === id);
    if (idx !== -1) {
      local.projects[idx] = { ...local.projects[idx], ...data, lastActive: new Date().toISOString() };
      setLocalData(local);
      return local.projects[idx];
    }
    throw new Error('Project not found');
  },

  async deleteProject(id: string): Promise<{ success: boolean; id: string }> {
    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE' });
      if (res.ok) return res.json();
    } catch (e) {}

    const local = getLocalData();
    local.projects = local.projects.filter((p: Project) => p.id !== id);
    setLocalData(local);
    return { success: true, id };
  },

  // Sessions
  async getSessions(projectId?: string): Promise<WorkSession[]> {
    try {
      const url = projectId ? `${API_BASE}/sessions?projectId=${projectId}` : `${API_BASE}/sessions`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {}

    const local = getLocalData();
    if (projectId) {
      return (local.sessions || []).filter((s: WorkSession) => s.projectId === projectId);
    }
    return (local.sessions || []).sort((a: WorkSession, b: WorkSession) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
  },

  async getActiveSession(): Promise<WorkSession | null> {
    try {
      const res = await fetch(`${API_BASE}/sessions/active`);
      if (res.ok) return res.json();
    } catch (e) {}

    const local = getLocalData();
    return (local.sessions || []).find((s: WorkSession) => s.status === 'active') || null;
  },

  async startSession(data: { projectId: string; task: string; goal: string; notes?: string }): Promise<WorkSession> {
    try {
      const res = await fetch(`${API_BASE}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const sess = await res.json();
        const local = getLocalData();
        local.sessions.unshift(sess);
        setLocalData(local);
        return sess;
      }
    } catch (e) {}

    const local = getLocalData();
    // End active
    local.sessions.forEach((s: WorkSession) => {
      if (s.status === 'active') {
        s.status = 'completed';
        s.endTime = new Date().toISOString();
      }
    });

    const project = local.projects.find((p: Project) => p.id === data.projectId);
    const projectName = project ? project.name : 'PeopleHub';

    const session: WorkSession = {
      id: `sess-${Date.now()}`,
      projectId: data.projectId,
      projectName,
      task: data.task,
      goal: data.goal,
      notes: data.notes ? [{
        id: `note-${Date.now()}`,
        text: data.notes,
        timestamp: new Date().toISOString(),
        category: 'general'
      }] : [],
      status: 'active',
      startTime: new Date().toISOString()
    };

    local.sessions.unshift(session);
    if (project) {
      project.currentTask = data.task;
      project.activeSessionId = session.id;
      project.lastActive = new Date().toISOString();
    }
    setLocalData(local);
    return session;
  },

  async getSession(id: string): Promise<WorkSession> {
    try {
      const res = await fetch(`${API_BASE}/sessions/${id}`);
      if (res.ok) return res.json();
    } catch (e) {}

    const local = getLocalData();
    const sess = local.sessions.find((s: WorkSession) => s.id === id);
    if (!sess) throw new Error('Session not found');
    return sess;
  },

  async addSessionNote(sessionId: string, text: string, category?: string): Promise<SessionNote> {
    try {
      const res = await fetch(`${API_BASE}/sessions/${sessionId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, category })
      });
      if (res.ok) return res.json();
    } catch (e) {}

    const local = getLocalData();
    const sess = local.sessions.find((s: WorkSession) => s.id === sessionId);
    if (!sess) throw new Error('Session not found');

    const newNote: SessionNote = {
      id: `note-${Date.now()}`,
      text: text.trim(),
      timestamp: new Date().toISOString(),
      category: (category as any) || (text.toLowerCase().includes('decision') ? 'decision' : text.toLowerCase().includes('error') || text.toLowerCase().includes('401') ? 'blocker' : 'progress')
    };
    sess.notes.push(newNote);
    setLocalData(local);
    return newNote;
  },

  async endSession(sessionId: string, reflections: { accomplished?: string; stoppedWhy?: string; rememberNote?: string; rawNotes?: string }): Promise<{ session: WorkSession; snapshot: WorkSnapshot }> {
    try {
      const res = await fetch(`${API_BASE}/sessions/${sessionId}/end`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reflections)
      });
      if (res.ok) {
        const result = await res.json();
        const local = getLocalData();
        local.snapshots.unshift(result.snapshot);
        const sIdx = local.sessions.findIndex((s: WorkSession) => s.id === sessionId);
        if (sIdx !== -1) local.sessions[sIdx] = result.session;
        setLocalData(local);
        return result;
      }
    } catch (e) {}

    // Deterministic client-side synthesis
    const local = getLocalData();
    const sess = local.sessions.find((s: WorkSession) => s.id === sessionId);
    if (!sess) throw new Error('Session not found');

    const endTime = new Date().toISOString();
    sess.status = 'completed';
    sess.endTime = endTime;
    sess.durationSeconds = Math.max(60, Math.floor((new Date(endTime).getTime() - new Date(sess.startTime).getTime()) / 1000));
    sess.reflections = reflections;

    const allNotes = [...sess.notes.map((n: SessionNote) => n.text), reflections.accomplished, reflections.stoppedWhy, reflections.rememberNote].filter(Boolean).join(' ');
    const lower = allNotes.toLowerCase();

    let completed = reflections.accomplished || (sess.notes[0]?.text || `Worked on ${sess.task}`);
    let decision = 'Standardized implementation approach';
    if (lower.includes('zod')) decision = 'Use Zod for form validation';
    else if (lower.includes('jwt') || lower.includes('auth')) decision = 'Inspect JWT middleware headers';

    let blocker = reflections.stoppedWhy || 'Paused at milestone';
    let blockerCause = undefined;
    if (lower.includes('401') || lower.includes('auth')) {
      blocker = '401 authentication error';
      blockerCause = 'Possible JWT authentication middleware issue';
    }

    let nextAction = `Continue next implementation phase for ${sess.task}`;
    if (blocker.includes('401') || lower.includes('401') || lower.includes('jwt')) {
      nextAction = 'Inspect JWT middleware and reconnect the employee POST endpoint';
    } else if (reflections.rememberNote) {
      nextAction = reflections.rememberNote;
    }

    const context = `Connecting the employee form to the backend. ${completed}. Blocker: ${blocker}.`;

    const snapshot: WorkSnapshot = {
      id: `snap-${Date.now()}`,
      sessionId: sess.id,
      projectId: sess.projectId,
      projectName: sess.projectName,
      task: sess.task,
      goal: sess.goal,
      completed,
      decision,
      blocker,
      blockerCause,
      context,
      nextAction,
      timestamp: endTime,
      tags: [sess.projectName.toLowerCase(), 'work-snapshot']
    };

    sess.snapshotId = snapshot.id;
    local.snapshots.unshift(snapshot);

    const proj = local.projects.find((p: Project) => p.id === sess.projectId);
    if (proj) {
      proj.activeSessionId = null;
      proj.lastActive = endTime;
      proj.currentTask = sess.task;
      proj.progress = Math.min(100, (proj.progress || 50) + 4);
    }

    setLocalData(local);
    return { session: sess, snapshot };
  },

  // Memories
  async getMemories(projectId?: string): Promise<WorkSnapshot[]> {
    try {
      const url = projectId ? `${API_BASE}/memories?projectId=${projectId}` : `${API_BASE}/memories`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {}

    const local = getLocalData();
    if (projectId) {
      return (local.snapshots || []).filter((s: WorkSnapshot) => s.projectId === projectId);
    }
    return (local.snapshots || []).sort((a: WorkSnapshot, b: WorkSnapshot) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },

  async getRecentMemory(): Promise<WorkSnapshot | null> {
    try {
      const res = await fetch(`${API_BASE}/memories/recent`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.projectName) return data;
      }
    } catch (e) {}

    const local = getLocalData();
    return (local.snapshots || [])[0] || null;
  },

  async getMemory(id: string): Promise<WorkSnapshot> {
    try {
      const res = await fetch(`${API_BASE}/memories/${id}`);
      if (res.ok) return res.json();
    } catch (e) {}

    const local = getLocalData();
    const snap = (local.snapshots || []).find((s: WorkSnapshot) => s.id === id);
    if (!snap) throw new Error('Memory not found');
    return snap;
  },

  // Insights
  async getInsights(): Promise<InsightsData> {
    try {
      const res = await fetch(`${API_BASE}/insights`);
      if (res.ok) return res.json();
    } catch (e) {}

    return {
      mostActiveProject: { name: 'PeopleHub', sessionCount: 5, minutes: 210 },
      mostCommonBlocker: {
        issue: '401 Authentication Error',
        occurrences: 4,
        category: 'Auth / Security'
      },
      averageSessionDurationMinutes: 45,
      projectsRecentlyResumed: 4,
      workSessionsCompleted: 8,
      totalFocusHours: 8.5,
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
  },

  // Settings
  async getSettings(): Promise<UserSettings> {
    try {
      const res = await fetch(`${API_BASE}/settings`);
      if (res.ok) return res.json();
    } catch (e) {}

    const local = getLocalData();
    return local.settings || INITIAL_DEMO_DATA.settings;
  },

  async updateSettings(data: Partial<UserSettings> & { geminiApiKey?: string }): Promise<UserSettings> {
    try {
      const res = await fetch(`${API_BASE}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return res.json();
    } catch (e) {}

    const local = getLocalData();
    local.settings = { ...local.settings, ...data };
    setLocalData(local);
    return local.settings;
  },

  async resetDemo(): Promise<{ success: boolean; message: string }> {
    try {
      await fetch(`${API_BASE}/demo/reset`, { method: 'POST' });
    } catch (e) {}

    setLocalData(INITIAL_DEMO_DATA);
    return { success: true, message: 'Reset to demo state successfully' };
  }
};
