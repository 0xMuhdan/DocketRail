import { z } from "zod";
import { MAX_FACTS_PAYLOAD_BYTES } from "../constants.js";

export const PairingInitInputSchema = z.object({
  name: z.string().min(1).max(100),
  fingerprint: z.string().length(64), // SHA-256 hex fingerprint of runner environment
  verifierHash: z.string().length(64), // SHA-256 hex of runner 32-byte verifier
});
export type PairingInitInput = z.infer<typeof PairingInitInputSchema>;

export const PairingInitResponseSchema = z.object({
  pairingId: z.string().uuid(),
  userCode: z.string().length(8), // Human-friendly verification code
  verificationUrl: z.string().url(),
  expiresAt: z.string().datetime(),
});
export type PairingInitResponse = z.infer<typeof PairingInitResponseSchema>;

export const PairingApproveInputSchema = z.object({
  userCode: z.string().min(8).max(12),
});
export type PairingApproveInput = z.infer<typeof PairingApproveInputSchema>;

export const PairingPollInputSchema = z.object({
  pairingId: z.string().uuid(),
  verifier: z.string().length(64), // Original 32-byte verifier hex
});
export type PairingPollInput = z.infer<typeof PairingPollInputSchema>;

export const RunnerClaimInputSchema = z.object({
  runId: z.string().uuid(),
});
export type RunnerClaimInput = z.infer<typeof RunnerClaimInputSchema>;

export const RunnerHeartbeatInputSchema = z.object({
  runId: z.string().uuid(),
  fence: z.number().int().nonnegative(),
});
export type RunnerHeartbeatInput = z.infer<typeof RunnerHeartbeatInputSchema>;

export const RunnerFactsBatchInputSchema = z.object({
  runId: z.string().uuid(),
  fence: z.number().int().nonnegative(),
  eventId: z.string().uuid(), // For idempotency & deduplication
  facts: z.array(z.record(z.unknown())).refine(
    (val) => {
      const bytes = new TextEncoder().encode(JSON.stringify(val)).length;
      return bytes <= MAX_FACTS_PAYLOAD_BYTES;
    },
    { message: `Facts batch must not exceed ${MAX_FACTS_PAYLOAD_BYTES} bytes (128 KiB)` }
  ),
});
export type RunnerFactsBatchInput = z.infer<typeof RunnerFactsBatchInputSchema>;

export const UploadSlotRequestSchema = z.object({
  fileName: z.string().min(1).max(255),
  mimeType: z.enum(["image/png", "image/jpeg", "application/json", "text/plain"]),
  expectedBytes: z.number().int().positive().max(500_000),
});
export type UploadSlotRequest = z.infer<typeof UploadSlotRequestSchema>;

export const RequestUploadSlotsInputSchema = z.object({
  runId: z.string().uuid(),
  fence: z.number().int().nonnegative(),
  slots: z.array(UploadSlotRequestSchema).min(1).max(20),
});
export type RequestUploadSlotsInput = z.infer<typeof RequestUploadSlotsInputSchema>;

export const UploadSlotResponseSchema = z.object({
  fileName: z.string(),
  storagePath: z.string(),
  signedUploadUrl: z.string().url(),
  expiresAt: z.string().datetime(),
});
export type UploadSlotResponse = z.infer<typeof UploadSlotResponseSchema>;
