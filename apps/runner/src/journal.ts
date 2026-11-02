import fs from "node:fs";
import path from "node:path";
import os from "node:os";

export interface RunnerSession {
  runnerId?: string;
  runnerName: string;
  fingerprint: string;
  token?: string;
  tokenExpiresAt?: string;
  apiUrl: string;
}

export interface JournalAttempt {
  attemptId: string;
  runId: string;
  purpose: string;
  providerId: string;
  quotedAtomic: string;
  state: string;
  txHash?: string | null;
  timestamp: string;
}

const RUNNER_DIR = path.join(os.homedir(), ".docketrail");
const SESSION_FILE = path.join(RUNNER_DIR, "runner-session.json");
const JOURNAL_FILE = path.join(RUNNER_DIR, "runner-journal.json");

export function ensureRunnerDir(): void {
  if (!fs.existsSync(RUNNER_DIR)) {
    fs.mkdirSync(RUNNER_DIR, { recursive: true, mode: 0o700 });
  }
}

export function loadRunnerSession(): RunnerSession | null {
  ensureRunnerDir();
  if (!fs.existsSync(SESSION_FILE)) {
    return null;
  }
  try {
    const raw = fs.readFileSync(SESSION_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveRunnerSession(session: RunnerSession): void {
  ensureRunnerDir();
  fs.writeFileSync(SESSION_FILE, JSON.stringify(session, null, 2), {
    mode: 0o600,
  });
}

export function appendJournalAttempt(attempt: JournalAttempt): void {
  ensureRunnerDir();
  let entries: JournalAttempt[] = [];
  if (fs.existsSync(JOURNAL_FILE)) {
    try {
      entries = JSON.parse(fs.readFileSync(JOURNAL_FILE, "utf8"));
    } catch {
      entries = [];
    }
  }

  // Update or append
  const existingIdx = entries.findIndex((e) => e.attemptId === attempt.attemptId);
  if (existingIdx >= 0) {
    entries[existingIdx] = attempt;
  } else {
    entries.push(attempt);
  }

  fs.writeFileSync(JOURNAL_FILE, JSON.stringify(entries, null, 2), {
    mode: 0o600,
  });
}

export function loadJournalAttempts(): JournalAttempt[] {
  ensureRunnerDir();
  if (!fs.existsSync(JOURNAL_FILE)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(JOURNAL_FILE, "utf8"));
  } catch {
    return [];
  }
}
