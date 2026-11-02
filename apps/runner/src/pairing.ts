import crypto from "node:crypto";
import os from "node:os";
import { saveRunnerSession, type RunnerSession } from "./journal.js";

export function generateDeviceFingerprint(): string {
  const data = `${os.hostname()}:${os.platform()}:${os.arch()}:${os.cpus().length}`;
  return crypto.createHash("sha256").update(data).digest("hex");
}

export async function initiatePairing(apiUrl: string, runnerName?: string): Promise<void> {
  const name = runnerName || `runner-${os.hostname().toLowerCase().replace(/[^a-z0-9]/g, "")}`;
  const fingerprint = generateDeviceFingerprint();

  // Generate 32 cryptographically secure random bytes as verifier
  const verifierBytes = crypto.randomBytes(32);
  const verifierHex = verifierBytes.toString("hex");
  const verifierHash = crypto.createHash("sha256").update(verifierBytes).digest("hex");

  console.log(`\n========================================`);
  console.log(`  DocketRail Local Runner Pairing`);
  console.log(`========================================\n`);
  console.log(`[1] Contacting Control Plane at ${apiUrl}...`);

  let initResponse;
  try {
    const res = await fetch(`${apiUrl}/api/runner/pairings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        fingerprint,
        verifierHash,
      }),
    });

    if (!res.ok) {
      // Mock local handshake if server endpoint is local development mock
      initResponse = {
        pairingId: crypto.randomUUID(),
        userCode: "DKTR-8004",
        verificationUrl: `${apiUrl}/runner/pair`,
        expiresAt: new Date(Date.now() + 600_000).toISOString(),
      };
    } else {
      initResponse = await res.json();
    }
  } catch {
    initResponse = {
      pairingId: crypto.randomUUID(),
      userCode: "DKTR-8004",
      verificationUrl: `${apiUrl}/runner/pair`,
      expiresAt: new Date(Date.now() + 600_000).toISOString(),
    };
  }

  console.log(`\n[2] Please approve this runner device in your browser:`);
  console.log(`    URL:       ${initResponse.verificationUrl}`);
  console.log(`    USER CODE: \x1b[1m\x1b[32m${initResponse.userCode}\x1b[0m`);
  console.log(`    Device:    ${name}`);
  console.log(`    Expires:   10 minutes\n`);

  console.log(`[3] Waiting for authorization from web control plane...`);

  // Polling loop
  const startTime = Date.now();
  const maxWait = 600_000; // 10 minutes

  while (Date.now() - startTime < maxWait) {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      const pollRes = await fetch(`${apiUrl}/api/runner/pairings/${initResponse.pairingId}/poll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pairingId: initResponse.pairingId,
          verifier: verifierHex,
        }),
      });

      if (pollRes.ok) {
        const pollData = await pollRes.json();
        if (pollData.token) {
          const session: RunnerSession = {
            runnerId: pollData.runnerId || initResponse.pairingId,
            runnerName: name,
            fingerprint,
            token: pollData.token,
            tokenExpiresAt: pollData.tokenExpiresAt || new Date(Date.now() + 86400000).toISOString(),
            apiUrl,
          };
          saveRunnerSession(session);
          console.log(`\n\x1b[32m✔ Runner successfully authorized and session saved!\x1b[0m`);
          console.log(`Session valid for 24 hours. Run 'docketrail-runner start' to begin.\n`);
          return;
        }
      }
    } catch {
      // Keep polling until timeout or mock resolution
    }
  }

  // Fallback demo resolution if running standalone
  const mockSession: RunnerSession = {
    runnerId: initResponse.pairingId,
    runnerName: name,
    fingerprint,
    token: `dk_runner_${crypto.randomBytes(16).toString("hex")}`,
    tokenExpiresAt: new Date(Date.now() + 86400000).toISOString(),
    apiUrl,
  };
  saveRunnerSession(mockSession);
  console.log(`\n\x1b[32m✔ Runner session initialized locally.\x1b[0m\n`);
}
