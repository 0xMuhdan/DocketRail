import type {
  RequirementResult,
  NetworkOrigin,
  ContractEvidence,
  TransactionEvidence,
  ProjectMetadata,
  RunPlan,
} from "@docketrail/contracts";

export const SAMPLE_PROJECT = {
  id: "sample-proj-101",
  displayName: "Celo CeloSwap Mini App (Sample)",
  applicationUrl: "https://celoswap-demo.example.com",
  repoUrl: "https://github.com/example/celoswap-miniapp",
  submissionStage: "readiness",
  createdAt: "2026-11-01T12:00:00Z",
};

export const SAMPLE_METADATA: ProjectMetadata = {
  appName: {
    value: "CeloSwap Mini",
    source: "manifest.json",
    confirmedByOwner: true,
  },
  description: {
    value: "Swap stablecoins on Celo inside MiniPay instantly with low gas.",
    source: "package.json",
    confirmedByOwner: true,
  },
  category: {
    value: "DeFi / Payments",
    source: "owner_declaration",
    confirmedByOwner: true,
  },
  contactEmail: {
    value: "builder@celoswap.example.com",
    source: "README.md",
    confirmedByOwner: true,
  },
  supportUrl: {
    value: "https://celoswap-demo.example.com/help",
    source: "browser_observed",
    confirmedByOwner: true,
  },
  termsUrl: {
    value: "https://celoswap-demo.example.com/terms",
    source: "browser_observed",
    confirmedByOwner: true,
  },
  privacyUrl: {
    value: "https://celoswap-demo.example.com/privacy",
    source: "browser_observed",
    confirmedByOwner: true,
  },
  iconUrl: {
    value: "https://celoswap-demo.example.com/icon-512.png",
    source: "manifest.json",
    confirmedByOwner: true,
  },
};

export const SAMPLE_RUN = {
  id: "sample-run-202",
  projectId: "sample-proj-101",
  mode: "mainnet",
  state: "needs_owner_review",
  planRevision: 1,
  startedAt: "2026-11-01T14:10:00Z",
  endedAt: "2026-11-01T14:18:22Z",
  sourceCommit: "7b89f01e23a",
  fence: 1,
  captureSummary: {
    pagesChecked: 4,
    screenshotsTaken: 4,
    originsObserved: 3,
    errorsEncountered: 0,
    truncated: false,
  },
  budget: {
    totalCapMicroUsd: 1_000_000,
    settledMicroUsd: 87_011,
    reservedMicroUsd: 0,
    externalExpenseMicroUsd: 0,
    remainingMicroUsd: 912_989,
  },
};

export const SAMPLE_PLAN: RunPlan = {
  allowedOrigin: "https://celoswap-demo.example.com",
  approvedExternalOrigins: ["https://api.celoswap.example.com"],
  flows: [
    {
      id: "flow-1",
      title: "Home & Swap Screen",
      entryPath: "/",
      steps: [
        {
          id: "step-1-1",
          type: "navigate",
          target: "/",
          label: "Open landing",
          takeScreenshot: true,
        },
        {
          id: "step-1-2",
          type: "read-text",
          target: "#swap-card",
          label: "Verify swap form elements",
          takeScreenshot: false,
        },
      ],
    },
    {
      id: "flow-2",
      title: "Support & Legal Navigation",
      entryPath: "/help",
      steps: [
        {
          id: "step-2-1",
          type: "navigate",
          target: "/help",
          label: "Open help center",
          takeScreenshot: true,
        },
        {
          id: "step-2-2",
          type: "check-link",
          target: "/terms",
          label: "Verify terms link",
          takeScreenshot: false,
        },
      ],
    },
  ],
  maximumPages: 10,
  maximumSteps: 15,
  viewport: { width: 360, height: 640 },
  digest: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
};

export const SAMPLE_REQUIREMENTS: RequirementResult[] = [
  {
    id: "res-1",
    runId: "sample-run-202",
    requirementId: "REQ-HTTPS-ONLY",
    applicability: "applicable",
    status: "evidence_available",
    findingText: "Target app served exclusively over valid HTTPS TLS 1.3.",
    deterministicRule: "protocol === 'https:' && !insecureContent",
    evidenceIds: ["ev-01"],
    reviewedAt: "2026-11-01T14:15:00Z",
  },
  {
    id: "res-2",
    runId: "sample-run-202",
    requirementId: "REQ-VIEWPORT-RESPONSIVE",
    applicability: "applicable",
    status: "evidence_available",
    findingText: "Rendered clean without horizontal overflow (scrollWidth === 360px).",
    deterministicRule: "body.scrollWidth <= viewport.width",
    evidenceIds: ["ev-02"],
    reviewedAt: "2026-11-01T14:15:30Z",
  },
  {
    id: "res-3",
    runId: "sample-run-202",
    requirementId: "REQ-SUPPORT-LEGAL-LINKS",
    applicability: "applicable",
    status: "evidence_available",
    findingText: "Help and Privacy endpoints responded with HTTP 200.",
    deterministicRule: "links.every(status === 200)",
    evidenceIds: ["ev-03"],
    reviewedAt: "2026-11-01T14:16:00Z",
  },
  {
    id: "res-4",
    runId: "sample-run-202",
    requirementId: "REQ-ORIGIN-INVENTORY",
    applicability: "applicable",
    status: "needs_owner_confirmation",
    findingText: "External API 'https://analytics.example.net' was detected in source code but not invoked at runtime.",
    deterministicRule: "source_references.diff(runtime_origins)",
    evidenceIds: ["ev-04"],
    ownerComment: "Analytics SDK is disabled inside MiniPay user agent.",
    reviewedAt: "2026-11-01T14:17:00Z",
  },
  {
    id: "res-5",
    runId: "sample-run-202",
    requirementId: "REQ-NO-CONSOLE-CRITICAL-ERRORS",
    applicability: "applicable",
    status: "evidence_available",
    findingText: "Zero unhandled runtime exceptions or 4xx/5xx script bundle failures.",
    deterministicRule: "console.errors.filter(severity === 'fatal').length === 0",
    evidenceIds: ["ev-05"],
    reviewedAt: "2026-11-01T14:17:15Z",
  },
  {
    id: "res-6",
    runId: "sample-run-202",
    requirementId: "REQ-CHAIN-ID-CELO",
    applicability: "applicable",
    status: "evidence_available",
    findingText: "Contract router points to Celo Mainnet (42220).",
    deterministicRule: "rpc_chain_id === 42220",
    evidenceIds: ["ev-06"],
    reviewedAt: "2026-11-01T14:17:30Z",
  },
  {
    id: "res-7",
    runId: "sample-run-202",
    requirementId: "REQ-WALLET-PHYSICAL-TESTED",
    applicability: "applicable",
    status: "needs_fix",
    findingText: "Physical device MiniPay test screenshots not yet attached. Automated browser observed open-in-MiniPay banner.",
    deterministicRule: "owner_attachments.filter(kind === 'device_evidence').length === 0",
    evidenceIds: ["ev-07"],
    ownerComment: "Pending physical Android test pass.",
    reviewedAt: "2026-11-01T14:18:00Z",
  },
];

export const SAMPLE_ORIGINS: NetworkOrigin[] = [
  {
    runId: "sample-run-202",
    origin: "https://celoswap-demo.example.com",
    sourceKind: "browser",
    resourceType: "document",
    observedAt: "2026-11-01T14:12:00Z",
    confirmedByOwnerAt: "2026-11-01T14:18:00Z",
  },
  {
    runId: "sample-run-202",
    origin: "https://api.celoswap.example.com",
    sourceKind: "browser",
    resourceType: "fetch",
    observedAt: "2026-11-01T14:12:05Z",
    confirmedByOwnerAt: "2026-11-01T14:18:00Z",
  },
  {
    runId: "sample-run-202",
    origin: "https://analytics.example.net",
    sourceKind: "source_code",
    sourceLocator: "src/utils/telemetry.ts:14",
    confirmedByOwnerAt: null,
  },
];

export const SAMPLE_CONTRACTS: ContractEvidence[] = [
  {
    projectRevisionId: "sample-rev-1",
    chainId: 42220,
    address: "0x765DE816845861e75A25fCA122bb6898B8B1282a", // cUSD on Celo
    methods: ["transfer", "approve", "transferFrom"],
    ownerConfirmed: true,
    sourceVerificationStatus: "verified",
    verificationSourceUrl: "https://celoscan.io/address/0x765DE816845861e75A25fCA122bb6898B8B1282a#code",
    verificationCheckedAt: "2026-11-01T14:17:00Z",
  },
];

export const SAMPLE_TRANSACTIONS: TransactionEvidence[] = [
  {
    runId: "sample-run-202",
    chainId: 42220,
    txHash: "0x3a4b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    claimedContract: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
    claimedMethod: "transfer",
    suppliedBy: "owner",
    receiptStatus: "success",
    observedTo: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
    blockNumber: 28491023,
    checkedAt: "2026-11-01T14:17:30Z",
    consistencyNotes: "Receipt confirmed on Celo Mainnet Block 28491023",
  },
];
