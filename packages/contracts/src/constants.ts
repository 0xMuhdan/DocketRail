/**
 * DocketRail Hard Limits & Architectural Constants
 * As specified in docs/prd.md, docs/arsitektur.md, and docs/anggaran-dan-pembayaran.md
 */

// Budget Limits (in micro-USD: 1 USD = 1,000,000 micro-USD)
export const TOTAL_BUDGET_MICRO_USD = 1_000_000; // Hard ceiling: US$1.00 total
export const MAX_RUN_BUDGET_MICRO_USD = 120_000; // US$0.12 maximum per run
export const SERVICE_ENVELOPE_MICRO_USD = 600_000; // US$0.60 for buy services
export const REGISTRATION_ENVELOPE_MICRO_USD = 200_000; // US$0.20 for ERC-8004 + funding
export const UNALLOCATED_RESERVE_MICRO_USD = 200_000; // US$0.20 unallocated safety reserve

// Byte and Size Limits
export const MAX_SCREENSHOT_BYTES = 500_000; // 500 KB per screenshot
export const MAX_EXPORT_ZIP_BYTES = 10_000_000; // 10 MB per export ZIP
export const MAX_FACTS_PAYLOAD_BYTES = 131_072; // 128 KiB per facts batch
export const MAX_SOURCE_FILE_BYTES = 131_072; // 128 KiB per analyzed source file
export const MAX_SOURCE_TOTAL_BYTES = 2_097_152; // 2 MiB total across all selected source files
export const MAX_AUDIT_DETAIL_BYTES = 4_096; // 4 KiB per audit safe_details

// Collection Constraints
export const MAX_SOURCE_FILES_COUNT = 40;
export const MAX_FLOWS_COUNT = 3;
export const MAX_STEPS_PER_FLOW = 5;
export const MAX_TOTAL_STEPS = 15;
export const MAX_PAGES_COUNT = 10;
export const MAX_SCREENSHOTS_COUNT = 8;
export const MAX_DEVICE_EVIDENCE_COUNT = 8;
export const MAX_CONTRACTS_COUNT = 5;
export const MAX_SAMPLE_TX_COUNT = 10;
export const MAX_INFERENCE_REQUESTS_PER_RUN = 3;
export const MAX_REQUEST_METADATA_COUNT = 500;

// Input String Lengths
export const MAX_URL_LENGTH = 2048;
export const MAX_OWNER_DESCRIPTION_LENGTH = 2000;
export const MAX_REVIEWER_INSTRUCTION_LENGTH = 4000;

// Bucket Names
export const BUCKET_EVIDENCE = "docketrail-evidence";
export const BUCKET_EXPORTS = "docketrail-exports";

// Leases and Timeouts (Seconds and Minutes)
export const COORDINATION_LEASE_SECONDS = 90;
export const HEARTBEAT_INTERVAL_SECONDS = 15;
export const MAX_RUN_EXECUTION_MINUTES = 20;
export const MAX_RUN_WAIT_MINUTES = 30;
export const PROVIDER_LEASE_SECONDS = 3600; // 1 hour provider lease
export const PAIRING_TTL_SECONDS = 600; // 10 minutes pairing challenge TTL
export const RUNNER_TOKEN_TTL_HOURS = 24;
export const SCAN_CONFIG_TTL_MINUTES = 30;
export const SIGNED_UPLOAD_TTL_HOURS = 2;
export const SHARE_DEFAULT_EXPIRY_DAYS = 7;
export const TERMINAL_APPROVAL_TTL_SECONDS = 120; // 2 minutes local approval TTL

// Scanner Navigation Timeouts (Seconds)
export const NAVIGATION_TIMEOUT_SECONDS = 30;
export const STEP_TIMEOUT_SECONDS = 15;
export const SCREENSHOT_TIMEOUT_SECONDS = 10;
export const SETTLE_TIME_SECONDS = 2;

// Network & Chain Constants
export const CELO_MAINNET_CHAIN_ID = 42220;
export const DEFAULT_VIEWPORT = { width: 360, height: 640 } as const;
