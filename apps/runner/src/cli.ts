#!/usr/bin/env node
import { Command } from "commander";
import { initiatePairing } from "./pairing.js";
import { runCoordinatorLoop, runStandaloneLocalScan } from "./coordinator.js";
import { loadRunnerSession, loadJournalAttempts } from "./journal.js";

const program = new Command();

program
  .name("docketrail-runner")
  .description("DocketRail local developer coordinator and buy execution runner")
  .version("0.1.0");

program
  .command("pair")
  .description("Pair this local runner process with your DocketRail web control plane")
  .option("-u, --url <apiUrl>", "DocketRail API URL", "http://localhost:3000")
  .option("-n, --name <runnerName>", "Display name for this runner")
  .action(async (options) => {
    await initiatePairing(options.url, options.name);
  });

program
  .command("start")
  .description("Start the background execution coordinator loop to claim and process jobs")
  .action(async () => {
    await runCoordinatorLoop();
  });

program
  .command("scan-local")
  .description("Execute a local inspection scan against a target URL without buy payments")
  .argument("<targetUrl>", "HTTPS application URL to inspect")
  .action(async (targetUrl) => {
    await runStandaloneLocalScan(targetUrl);
  });

program
  .command("status")
  .description("View current runner pairing session and local purchase attempt journal")
  .action(() => {
    const session = loadRunnerSession();
    const attempts = loadJournalAttempts();

    console.log(`\n========================================`);
    console.log(`  DocketRail Runner Status`);
    console.log(`========================================`);
    if (session) {
      console.log(`  Runner Name: ${session.runnerName}`);
      console.log(`  Fingerprint: ${session.fingerprint}`);
      console.log(`  API URL:     ${session.apiUrl}`);
      console.log(`  Status:      \x1b[32mActive Session\x1b[0m`);
    } else {
      console.log(`  Status:      \x1b[33mNot Paired (Run 'docketrail-runner pair')\x1b[0m`);
    }

    console.log(`\n  Logged Attempts (${attempts.length}):`);
    if (attempts.length === 0) {
      console.log(`    (No purchase attempts logged yet)`);
    } else {
      attempts.slice(-5).forEach((a) => {
        console.log(`    • [${a.state.toUpperCase()}] ${a.purpose} (${a.providerId}) - ${a.timestamp}`);
      });
    }
    console.log(`\n`);
  });

program.parse(process.argv);
