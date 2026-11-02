import type { CaptureSummary, RunPlan } from "@docketrail/contracts";

export interface CoverageDocInput {
  runId: string;
  mode: string;
  startedAt?: string | null;
  endedAt?: string | null;
  sourceCommit?: string | null;
  applicationUrl: string;
  plan?: RunPlan | null;
  summary?: CaptureSummary | null;
  failureCode?: string | null;
}

export function generateCoverageMarkdown(input: CoverageDocInput): string {
  const pages = input.summary?.pagesChecked ?? 0;
  const screenshots = input.summary?.screenshotsTaken ?? 0;
  const origins = input.summary?.originsObserved ?? 0;
  const errors = input.summary?.errorsEncountered ?? 0;
  const truncated = input.summary?.truncated ? "Yes (Reached inspection limit)" : "No";

  const flowsList =
    input.plan?.flows && input.plan.flows.length > 0
      ? input.plan.flows
          .map(
            (flow, i) =>
              `${i + 1}. **${flow.title}** (Entry: \`${flow.entryPath}\`, ${flow.steps.length} steps)`
          )
          .join("\n")
      : "_No flows recorded in plan._";

  return `# Execution & Coverage Report

- **Run ID**: \`${input.runId}\`
- **Execution Mode**: \`${input.mode.toUpperCase()}\`
- **Target URL**: [${input.applicationUrl}](${input.applicationUrl})
- **Source Commit**: ${input.sourceCommit ? `\`${input.sourceCommit}\`` : "_N/A (Web-only inspection)_"}
- **Started At**: ${input.startedAt ?? "_Unknown_"}
- **Ended At**: ${input.endedAt ?? "_Unknown_"}
- **Status / Failure Code**: ${input.failureCode ? `\`${input.failureCode}\`` : "_Clean Completion_"}

---

## 1. Inspection Coverage Summary
- **Pages / Views Inspected**: ${pages}
- **Screenshots Captured**: ${screenshots}
- **Distinct Network Origins Observed**: ${origins}
- **Navigation / Network Errors**: ${errors}
- **Truncated Due To Bounds**: ${truncated}

## 2. Tested Navigation Flows
${flowsList}

## 3. Inspection Boundaries & Guarantees
- Scans are bounded to safe navigation (no form submittals, external transactions, or simulated wallet signing).
- Viewport tested: **360 × 640** (Standard mobile reference).
- External domains and links were tested for reachability without unbounded deep-crawling.
`;
}
