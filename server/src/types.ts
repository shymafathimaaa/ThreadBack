export interface SessionNote {
  id: string;
  text: string;
  timestamp: string;
  category?: 'progress' | 'decision' | 'blocker' | 'general';
}

export interface EndReflections {
  accomplished?: string;
  stoppedWhy?: string;
  rememberNote?: string;
  rawNotes?: string;
}

export interface WorkSnapshot {
  id: string;
  sessionId: string;
  projectId: string;
  projectName: string;
  task: string;
  goal: string;
  completed: string;
  decision: string;
  blocker: string;
  blockerCause?: string;
  context: string;
  nextAction: string;
  timestamp: string;
  tags?: string[];
  whileYouWereAway?: {
    detected: boolean;
    headline?: string;
    details?: string;
    updatedNextAction?: string;
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  goal: string;
  currentTask: string;
  progress: number; // 0 - 100
  status: 'active' | 'paused' | 'completed';
  lastActive: string;
  color?: string; // hex or tailwind accent
  tags?: string[];
  activeSessionId?: string | null;
  lastSnapshot?: WorkSnapshot;
}

export interface WorkSession {
  id: string;
  projectId: string;
  projectName: string;
  task: string;
  goal: string;
  notes: SessionNote[];
  status: 'active' | 'completed' | 'discarded';
  startTime: string;
  endTime?: string;
  durationSeconds?: number;
  reflections?: EndReflections;
  snapshotId?: string;
}

export interface UserSettings {
  userName: string;
  role: string;
  aiProvider: 'gemini' | 'demo';
  geminiApiKeyConfigured: boolean;
  theme: 'dark';
  autoSnapshot: boolean;
  connectedSources: {
    github: { connected: boolean; status: string };
    vscode: { connected: boolean; status: string };
    calendar: { connected: boolean; status: string };
  };
  privacyStrict: boolean;
}

export interface InsightsData {
  mostActiveProject: { name: string; sessionCount: number; minutes: number };
  mostCommonBlocker: { issue: string; occurrences: number; category: string };
  averageSessionDurationMinutes: number;
  projectsRecentlyResumed: number;
  workSessionsCompleted: number;
  totalFocusHours: number;
  continuityScore: number; // e.g., 94%
  weeklyVelocity: Array<{ day: string; minutes: number; sessions: number }>;
}
