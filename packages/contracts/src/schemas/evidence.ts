import { z } from "zod";
import { CaptureMethodEnum } from "../enums.js";
import { MAX_SCREENSHOT_BYTES } from "../constants.js";
import { ViewportSchema } from "./plans.js";

export const EvidenceItemSchema = z.object({
  id: z.string().uuid(),
  ownerId: z.string().uuid(),
  runId: z.string().uuid(),
  captureMethod: CaptureMethodEnum,
  capturedAt: z.string().datetime(),
  sanitizedUrl: z.string().url(),
  stepId: z.string().uuid().nullable().optional(),
  environment: z.string().max(100),
  viewport: ViewportSchema.nullable().optional(),
  storagePath: z.string().max(500).nullable().optional(),
  sha256: z.string().length(64).nullable().optional(),
  bytes: z.number().int().max(MAX_SCREENSHOT_BYTES).nullable().optional(),
  mimeType: z.string().max(100).nullable().optional(),
  verificationState: z.string().max(50).default("unverified"),
  sourceLocator: z.string().max(500).nullable().optional(),
});
export type EvidenceItem = z.infer<typeof EvidenceItemSchema>;

export const NetworkOriginSchema = z.object({
  id: z.string().uuid().optional(),
  runId: z.string().uuid(),
  origin: z.string().max(255),
  sourceKind: z.enum(["browser", "source_code", "owner_declaration"]),
  sourceLocator: z.string().max(500).optional(),
  resourceType: z.string().max(50).optional(),
  observedAt: z.string().datetime().optional(),
  confirmedByOwnerAt: z.string().datetime().nullable().optional(),
});
export type NetworkOrigin = z.infer<typeof NetworkOriginSchema>;

export const ContractEvidenceSchema = z.object({
  id: z.string().uuid().optional(),
  projectRevisionId: z.string().uuid(),
  chainId: z.number().int().positive(),
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid 20-byte EVM address"),
  methods: z.array(z.string()).default([]),
  ownerConfirmed: z.boolean().default(false),
  sourceVerificationStatus: z.enum(["verified", "unverified", "unresolved"]).default("unresolved"),
  verificationSourceUrl: z.string().url().nullable().optional(),
  verificationCheckedAt: z.string().datetime().nullable().optional(),
});
export type ContractEvidence = z.infer<typeof ContractEvidenceSchema>;

export const TransactionEvidenceSchema = z.object({
  id: z.string().uuid().optional(),
  runId: z.string().uuid(),
  chainId: z.number().int().positive(),
  txHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/, "Invalid 32-byte EVM transaction hash"),
  claimedContract: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  claimedMethod: z.string().max(100).optional(),
  suppliedBy: z.enum(["owner", "rpc_observed"]).default("owner"),
  receiptStatus: z.enum(["success", "reverted", "unresolved"]).default("unresolved"),
  observedTo: z.string().regex(/^0x[a-fA-F0-9]{40}$/).nullable().optional(),
  blockNumber: z.number().int().positive().nullable().optional(),
  checkedAt: z.string().datetime().optional(),
  consistencyNotes: z.string().max(1000).optional(),
});
export type TransactionEvidence = z.infer<typeof TransactionEvidenceSchema>;

export const DeviceEvidenceInputSchema = z.object({
  testerName: z.string().min(1).max(100),
  testDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format must be YYYY-MM-DD"),
  minipayVersion: z.string().max(50).optional(),
  network: z.string().max(50).default("Celo Mainnet"),
  stepTested: z.string().min(1).max(200),
  fileName: z.string().min(1).max(100),
  mimeType: z.enum(["image/png", "image/jpeg"]),
  fileBytes: z.number().int().max(MAX_SCREENSHOT_BYTES),
});
export type DeviceEvidenceInput = z.infer<typeof DeviceEvidenceInputSchema>;
