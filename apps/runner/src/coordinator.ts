import { HEARTBEAT_INTERVAL_SECONDS } from "@docketrail/contracts";
import { executeScanner, evaluateRequirements } from "@docketrail/scanner";
import { loadRunnerSession } from "./journal.js";
import { promptUserForQuoteApproval, executeBuyPayment } from "./buy-wrapper.js";

export async function runCoordinatorLoop(): Promise<void> {
  const session = loadRunnerSession();
  if (!session || !session.token) {
    console.error(`\x1b[31m✖ No active runner session found. Please run 'docketrail-runner pair' first.\x1b[0m`);
    process.exit(1);
  }

  console.log(`\n========================================`);
  console.log(`  DocketRail Runner Coordinator Active`);
  console.log(`========================================`);
  console.log(`  Runner:    ${session.runnerName}`);
  console.log(`  Server:    ${session.apiUrl}`);
  console.log(`  Heartbeat: Every ${HEARTBEAT_INTERVAL_SECONDS} seconds\n`);
  console.log(`[coordinator] Polling for claimed jobs...`);

  // Periodic heartbeat timer
  const heartbeatTimer = setInterval(() => {
    // Ping heartbeat endpoint
  }, HEARTBEAT_INTERVAL_SECONDS * 1000);

  // Clean shutdown handling
  const shutdown = () => {
    clearInterval(heartbeatTimer);
    console.log(`\n[coordinator] Runner shutting down cleanly.`);
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  console.log(`[coordinator] Listening for dispatch signals. Press Ctrl+C to stop.`);
}

export async function runStandaloneLocalScan(targetUrl: string): Promise<void> {
  console.log(`\n======================================================`);
  console.log(`  DocketRail Standalone Local Scanner`);
  console.log(`======================================================`);
  console.log(`  Target URL: ${targetUrl}`);
  console.log(`  Mode:       LOCAL (No buy compute payments)\n`);

  const runId = crypto.randomUUID();
  const plan = {
    allowedOrigin: targetUrl,
    approvedExternalOrigins: [],
    flows: [
      {
        id: "flow-1",
        title: "Home & Responsive Scan",
        entryPath: "/",
        steps: [
          {
            id: "step-1",
            type: "navigate" as const,
            target: "/",
            label: "Open landing page",
            takeScreenshot: true,
          },
        ],
      },
    ],
    maximumPages: 10,
    maximumSteps: 15,
    viewport: { width: 360, height: 640 },
    digest: "0000000000000000000000000000000000000000000000000000000000000000",
  };

  try {
    console.log(`[scanner] Initializing mobile viewport (360×640)...`);
    const output = await executeScanner({
      plan,
      runId,
    });

    console.log(`[scanner] Evaluating canonical requirements...`);
    const results = evaluateRequirements(runId, output.observations);

    console.log(`\n[RESULTS SUMMARY]`);
    results.forEach((r) => {
      const color =
        r.status === "evidence_available"
          ? "\x1b[32m"
          : r.status === "needs_fix"
          ? "\x1b[31m"
          : "\x1b[33m";
      console.log(`  ${color}[${r.status.toUpperCase()}]\x1b[0m ${r.requirementId}: ${r.findingText}`);
    });

    console.log(`\nObserved Origins: ${output.originsList.join(", ") || "None"}`);
    console.log(`Screenshots Captured: ${Object.keys(output.screenshots).length}`);
    console.log(`\n\x1b[32m✔ Local scan completed successfully.\x1b[0m\n`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`\x1b[31m✖ Local scan failed: ${msg}\x1b[0m`);
  }
}
