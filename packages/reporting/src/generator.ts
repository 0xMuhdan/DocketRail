import JSZip from "jszip";
import { MAX_EXPORT_ZIP_BYTES } from "@docketrail/contracts";
import type {
  ProjectMetadata,
  RunPlan,
  CaptureSummary,
  RequirementResult,
  NetworkOrigin,
  ContractEvidence,
  TransactionEvidence,
  EvidenceItem,
  DeviceEvidenceInput,
} from "@docketrail/contracts";

import { generateSubmissionMarkdown } from "./markdown/submission.js";
import { generateCoverageMarkdown } from "./markdown/coverage.js";
import { generateMissingItemsMarkdown } from "./markdown/missing-items.js";
import { generateOwnerDeclarationsMarkdown } from "./markdown/owner-declarations.js";
import { generateRequirementsCsv } from "./tables/requirements.js";
import { generateNetworkInventoryCsv } from "./tables/network-inventory.js";
import { generateContractsCsv } from "./tables/contracts.js";
import { generatePaymentsCsv, type PaymentRecord } from "./tables/payments.js";
import { generateEvidenceIndexJson } from "./index-json.js";

export interface PackageGenerationInput {
  projectName: string;
  projectId: string;
  runId: string;
  mode: string;
  applicationUrl: string;
  repoUrl?: string | null;
  sourceCommit?: string | null;
  submissionStage: string;
  startedAt?: string | null;
  endedAt?: string | null;
  failureCode?: string | null;
  confirmedBy?: string | null;
  confirmedAt?: string | null;

  metadata: ProjectMetadata;
  plan?: RunPlan | null;
  summary?: CaptureSummary | null;
  results: RequirementResult[];
  origins: NetworkOrigin[];
  contracts: ContractEvidence[];
  transactions: TransactionEvidence[];
  payments: PaymentRecord[];
  evidenceItems: EvidenceItem[];
  deviceEvidence?: DeviceEvidenceInput[];

  /**
   * Optional screenshot binary buffers keyed by filename (e.g. "step-1-360x640.png")
   */
  screenshots?: Record<string, Uint8Array>;
  deviceScreenshots?: Record<string, Uint8Array>;
}

export interface GeneratedPackageResult {
  zipBuffer: Uint8Array;
  byteLength: number;
  evidenceIndexHash: string;
  fileManifest: string[];
}

export async function generateSubmissionPackage(
  input: PackageGenerationInput
): Promise<GeneratedPackageResult> {
  const zip = new JSZip();
  const fileManifest: string[] = [];
  const nowUtc = new Date().toISOString();

  // 1. submission.md
  const submissionMd = generateSubmissionMarkdown({
    projectName: input.projectName,
    applicationUrl: input.applicationUrl,
    repoUrl: input.repoUrl,
    submissionStage: input.submissionStage,
    metadata: input.metadata,
    runId: input.runId,
    generatedAt: nowUtc,
  });
  zip.file("submission.md", submissionMd);
  fileManifest.push("submission.md");

  // 2. coverage.md
  const coverageMd = generateCoverageMarkdown({
    runId: input.runId,
    mode: input.mode,
    startedAt: input.startedAt,
    endedAt: input.endedAt,
    sourceCommit: input.sourceCommit,
    applicationUrl: input.applicationUrl,
    plan: input.plan,
    summary: input.summary,
    failureCode: input.failureCode,
  });
  zip.file("coverage.md", coverageMd);
  fileManifest.push("coverage.md");

  // 3. missing-items.md
  const missingItemsMd = generateMissingItemsMarkdown({
    runId: input.runId,
    results: input.results,
  });
  zip.file("missing-items.md", missingItemsMd);
  fileManifest.push("missing-items.md");

  // 4. owner-declarations.md
  const ownerDeclarationsMd = generateOwnerDeclarationsMarkdown({
    runId: input.runId,
    confirmedBy: input.confirmedBy,
    confirmedAt: input.confirmedAt,
    metadata: input.metadata,
    deviceEvidence: input.deviceEvidence,
  });
  zip.file("owner-declarations.md", ownerDeclarationsMd);
  fileManifest.push("owner-declarations.md");

  // 5. requirements.csv
  const requirementsCsv = generateRequirementsCsv(input.results);
  zip.file("requirements.csv", requirementsCsv);
  fileManifest.push("requirements.csv");

  // 6. network-inventory.csv
  const networkInventoryCsv = generateNetworkInventoryCsv(input.origins);
  zip.file("network-inventory.csv", networkInventoryCsv);
  fileManifest.push("network-inventory.csv");

  // 7. contracts.csv
  const contractsCsv = generateContractsCsv(input.contracts, input.transactions);
  zip.file("contracts.csv", contractsCsv);
  fileManifest.push("contracts.csv");

  // 8. payments.csv
  const paymentsCsv = generatePaymentsCsv(input.payments);
  zip.file("payments.csv", paymentsCsv);
  fileManifest.push("payments.csv");

  // 9. evidence-index.json
  const evidenceIndexJson = generateEvidenceIndexJson({
    version: "1.0.0",
    generator: "DocketRail",
    runId: input.runId,
    projectId: input.projectId,
    assembledAt: nowUtc,
    totalEvidenceCount: input.evidenceItems.length,
    items: input.evidenceItems,
  });
  zip.file("evidence-index.json", evidenceIndexJson);
  fileManifest.push("evidence-index.json");

  // Compute SHA-256 of the canonical evidence-index.json
  const encoder = new TextEncoder();
  const indexBytes = encoder.encode(evidenceIndexJson);
  const hashBuffer = await crypto.subtle.digest("SHA-256", indexBytes);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const evidenceIndexHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  // 10. Screenshots folder
  if (input.screenshots) {
    const screenshotFolder = zip.folder("screenshots");
    if (screenshotFolder) {
      for (const [name, buf] of Object.entries(input.screenshots)) {
        // Sanitize path against traversal
        const cleanName = name.replace(/[^a-zA-Z0-9_.-]/g, "_");
        screenshotFolder.file(cleanName, buf);
        fileManifest.push(`screenshots/${cleanName}`);
      }
    }
  }

  // 11. Device Evidence folder
  if (input.deviceScreenshots) {
    const deviceFolder = zip.folder("device-evidence");
    if (deviceFolder) {
      for (const [name, buf] of Object.entries(input.deviceScreenshots)) {
        const cleanName = name.replace(/[^a-zA-Z0-9_.-]/g, "_");
        deviceFolder.file(cleanName, buf);
        fileManifest.push(`device-evidence/${cleanName}`);
      }
    }
  }

  // Generate ZIP Uint8Array
  const zipBuffer = await zip.generateAsync({
    type: "uint8array",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });

  if (zipBuffer.byteLength > MAX_EXPORT_ZIP_BYTES) {
    throw new Error(
      `EXPORT_PACKAGE_TOO_LARGE: Generated ZIP is ${zipBuffer.byteLength} bytes, exceeding maximum limit of ${MAX_EXPORT_ZIP_BYTES} bytes (10 MB).`
    );
  }

  return {
    zipBuffer,
    byteLength: zipBuffer.byteLength,
    evidenceIndexHash,
    fileManifest: fileManifest.sort(),
  };
}
