import { GoogleGenAI } from '@google/genai';
import { WorkSnapshot, SessionNote, EndReflections } from './types.js';

interface GenerateSnapshotInput {
  projectId: string;
  projectName: string;
  task: string;
  goal: string;
  notes: SessionNote[];
  reflections?: EndReflections;
}

export class AIService {
  private geminiClient: GoogleGenAI | null = null;
  private apiKey: string | null = null;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || null;
    if (this.apiKey) {
      try {
        this.geminiClient = new GoogleGenAI({ apiKey: this.apiKey });
      } catch (err) {
        console.warn('Could not initialize GoogleGenAI client with provided key:', err);
      }
    }
  }

  public setApiKey(key: string) {
    this.apiKey = key;
    if (key && key.trim().length > 0) {
      this.geminiClient = new GoogleGenAI({ apiKey: key.trim() });
    } else {
      this.geminiClient = null;
    }
  }

  public isGeminiActive(): boolean {
    return !!this.geminiClient;
  }

  public async generateWorkSnapshot(input: GenerateSnapshotInput): Promise<Omit<WorkSnapshot, 'id' | 'sessionId' | 'timestamp'>> {
    // If Gemini client is active, attempt to generate with Gemini
    if (this.geminiClient) {
      try {
        const result = await this.generateWithGemini(input);
        if (result) return result;
      } catch (err) {
        console.warn('Gemini generation failed or timed out, falling back to deterministic engine:', err);
      }
    }

    // High quality deterministic fallback
    return this.generateDeterministicSnapshot(input);
  }

  private async generateWithGemini(input: GenerateSnapshotInput): Promise<Omit<WorkSnapshot, 'id' | 'sessionId' | 'timestamp'> | null> {
    if (!this.geminiClient) return null;

    const notesSummary = input.notes.map(n => `- [${n.timestamp.split('T')[1]?.slice(0, 5) || ''}] ${n.text}`).join('\n');
    const userReflections = [
      input.reflections?.accomplished ? `What accomplished: ${input.reflections.accomplished}` : '',
      input.reflections?.stoppedWhy ? `What stopped you / why: ${input.reflections.stoppedWhy}` : '',
      input.reflections?.rememberNote ? `Important to remember: ${input.reflections.rememberNote}` : '',
      input.reflections?.rawNotes ? `Raw thoughts: ${input.reflections.rawNotes}` : ''
    ].filter(Boolean).join('\n');

    const prompt = `You are ThreadBack's AI Work Continuity Engine.
Your mission is to transform messy, raw work notes and session reflections into a crisp, hyper-focused Work Continuity Snapshot so the developer/creator never restarts from zero.

PROJECT: ${input.projectName}
CURRENT TASK: ${input.task}
SESSION GOAL: ${input.goal}

SESSION NOTES:
${notesSummary || '(No live notes recorded)'}

END OF SESSION REFLECTIONS:
${userReflections || '(No extra reflections recorded)'}

REQUIREMENTS:
Distill the session into structured JSON answering:
1. What was done / completed? (Crisp, bullet or short sentence, no fluff)
2. What key decision was made? (Architecture, library, pattern, or choice made during work)
3. What blocker or reason stopped the session? (e.g., 401 error, API rate limit, waiting on PR, bedtime)
4. What is the likely cause of the blocker? (optional brief explanation)
5. What is the single recommended NEXT ACTION to resume with 0 cognitive friction? (Clear, active verb command)
6. What is the concise context summary? (1-2 sentences maximum explaining current state)

Return ONLY valid JSON matching this schema:
{
  "completed": "string (1-2 bullet points or concise sentence)",
  "decision": "string (concise decision)",
  "blocker": "string (clear blocker or stopping point)",
  "blockerCause": "string (brief diagnostic or reason)",
  "nextAction": "string (imperative action to take immediately when resuming)",
  "context": "string (1-2 sentence context snapshot)",
  "tags": ["string", "string"]
}`;

    try {
      const response = await this.geminiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text);
        return {
          projectId: input.projectId,
          projectName: input.projectName,
          task: input.task,
          goal: input.goal,
          completed: parsed.completed || 'Completed task milestones',
          decision: parsed.decision || 'Proceed with modular implementation',
          blocker: parsed.blocker || 'Session paused for next milestone',
          blockerCause: parsed.blockerCause,
          context: parsed.context || `Paused work on ${input.task}.`,
          nextAction: parsed.nextAction || `Resume ${input.task} next steps.`,
          tags: parsed.tags || [input.projectName.toLowerCase(), 'work-memory']
        };
      }
    } catch (e) {
      console.warn('Gemini parse error:', e);
    }

    return null;
  }

  private generateDeterministicSnapshot(input: GenerateSnapshotInput): Omit<WorkSnapshot, 'id' | 'sessionId' | 'timestamp'> {
    const allNoteTexts = [
      ...input.notes.map(n => n.text),
      input.reflections?.accomplished || '',
      input.reflections?.stoppedWhy || '',
      input.reflections?.rememberNote || '',
      input.reflections?.rawNotes || ''
    ].filter(Boolean);

    const combinedText = allNoteTexts.join(' \n ');
    const lower = combinedText.toLowerCase();

    // 1. Determine Completed Items
    let completed = '';
    if (input.reflections?.accomplished && input.reflections.accomplished.trim().length > 3) {
      completed = input.reflections.accomplished.trim();
    } else {
      const completedNotes = input.notes.filter(n => 
        n.text.toLowerCase().startsWith('finished') || 
        n.text.toLowerCase().startsWith('completed') || 
        n.text.toLowerCase().startsWith('built') ||
        n.text.toLowerCase().startsWith('done') ||
        n.text.toLowerCase().includes('works') ||
        n.text.toLowerCase().includes('ready')
      );

      if (completedNotes.length > 0) {
        completed = completedNotes.map(n => n.text).join('; ');
      } else if (input.notes.length > 0) {
        completed = input.notes[0].text;
      } else {
        completed = `Progress made on ${input.task} (${input.goal || 'core milestone'})`;
      }
    }

    // 2. Determine Decision
    let decision = 'Standardized implementation approach';
    if (lower.includes('zod')) {
      decision = 'Use Zod for robust form schema validation';
    } else if (lower.includes('jwt') || lower.includes('token') || lower.includes('bearer')) {
      decision = 'Enforce stateless JWT token bearer authentication';
    } else if (lower.includes('tailwind') || lower.includes('css') || lower.includes('ui')) {
      decision = 'Adopt clean dark neon design system';
    } else if (lower.includes('sqlite') || lower.includes('postgres') || lower.includes('db')) {
      decision = 'Keep repository data layer decoupled from storage engine';
    } else if (lower.includes('decided') || lower.includes('chose') || lower.includes('using') || lower.includes('switched')) {
      const match = allNoteTexts.find(t => /decided|chose|using|switched|picked/i.test(t));
      if (match) decision = match;
    }

    // 3. Determine Blocker & Cause
    let blocker = 'Session concluded at checkpoint';
    let blockerCause: string | undefined = undefined;

    if (input.reflections?.stoppedWhy && input.reflections.stoppedWhy.trim().length > 3) {
      blocker = input.reflections.stoppedWhy.trim();
    } else if (lower.includes('401') || lower.includes('auth') || lower.includes('unauthorized')) {
      blocker = '401 Authentication Error';
      blockerCause = 'JWT token header validation failing on protected endpoints';
    } else if (lower.includes('403') || lower.includes('forbidden')) {
      blocker = '403 Forbidden Permission Issue';
      blockerCause = 'Role-based access control restriction';
    } else if (lower.includes('cors')) {
      blocker = 'CORS Preflight Policy Failure';
      blockerCause = 'Cross-origin headers missing in server response';
    } else if (lower.includes('timeout') || lower.includes('500') || lower.includes('error')) {
      const errorNote = allNoteTexts.find(t => /error|timeout|500|failed|bug|broken/i.test(t));
      blocker = errorNote || 'API response error during integration';
      blockerCause = 'Unhandled exception in downstream service';
    } else if (lower.includes('pdf')) {
      blocker = 'PDF token generation stream issue';
      blockerCause = 'Buffer serialization in backend handler';
    }

    // 4. Formulate Next Action
    let nextAction = `Continue next implementation phase for ${input.task}`;
    if (blocker.includes('401') || lower.includes('401') || lower.includes('jwt')) {
      nextAction = 'Fix JWT authentication middleware and reconnect the POST endpoint';
    } else if (blocker.includes('CORS') || lower.includes('cors')) {
      nextAction = 'Configure Express CORS origin whitelist and verify preflight requests';
    } else if (blocker.includes('PDF') || lower.includes('pdf')) {
      nextAction = 'Implement downloadable token PDF buffer generator and test client stream';
    } else if (lower.includes('endpoint') || lower.includes('api') || lower.includes('post')) {
      nextAction = `Connect frontend client with backend ${input.task} API routes`;
    } else if (input.reflections?.rememberNote) {
      nextAction = `Resume: ${input.reflections.rememberNote}`;
    }

    // 5. Context Summary
    const context = `Worked on ${input.projectName} (${input.task}). Finished ${completed}. Blocked by ${blocker}. Ready to ${nextAction.toLowerCase()}.`;

    return {
      projectId: input.projectId,
      projectName: input.projectName,
      task: input.task,
      goal: input.goal,
      completed,
      decision,
      blocker,
      blockerCause,
      context,
      nextAction,
      tags: [input.projectName.toLowerCase(), 'work-snapshot', blocker.includes('401') ? 'auth' : 'in-progress']
    };
  }
}
