import { z } from "zod";
import {
  PaymentStateEnum,
  PaymentServiceResultEnum,
  LedgerEntryTypeEnum,
} from "../enums.js";
import {
  TOTAL_BUDGET_MICRO_USD,
  MAX_RUN_BUDGET_MICRO_USD,
  CELO_MAINNET_CHAIN_ID,
} from "../constants.js";

export const PurchaseAttemptQuoteSchema = z.object({
  runId: z.string().uuid(),
  purpose: z.string().min(1).max(100), // e.g. "order_compute_vm", "cencori_completion"
  providerId: z.string().min(1).max(100), // e.g. "usebuy_google_vm", "cencori"
  canonicalMethod: z.string().max(10), // e.g. "POST"
  canonicalUrl: z.string().url(),
  requestBodySha256: z.string().length(64),
  tokenAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  decimals: z.number().int().min(0).max(18),
  quotedAtomic: z.string().regex(/^\d+$/, "Atomic amount must be integer string"),
  approvedMaxAtomic: z.string().regex(/^\d+$/),
  reservedMicroUsd: z.number().int().positive().max(MAX_RUN_BUDGET_MICRO_USD),
});
export type PurchaseAttemptQuote = z.infer<typeof PurchaseAttemptQuoteSchema>;

export const PurchaseAttemptDispatchSchema = z.object({
  attemptId: z.string().uuid(),
  consentAt: z.string().datetime(),
  digest: z.string().length(64), // Verification digest agreed in terminal
});
export type PurchaseAttemptDispatch = z.infer<
  typeof PurchaseAttemptDispatchSchema
>;

export const PurchaseAttemptResultSchema = z.object({
  attemptId: z.string().uuid(),
  state: PaymentStateEnum,
  serviceResult: PaymentServiceResultEnum.optional(),
  txHash: z
    .string()
    .regex(/^0x[a-fA-F0-9]{64}$/)
    .nullable()
    .optional(),
  chainId: z.number().int().default(CELO_MAINNET_CHAIN_ID),
  sanitizedReceiptMetadata: z.record(z.unknown()).default({}),
  settledMicroUsd: z.number().int().nonnegative().optional(),
  uncertaintyReason: z.string().max(500).optional(),
});
export type PurchaseAttemptResult = z.infer<typeof PurchaseAttemptResultSchema>;

export const BudgetLedgerEntrySchema = z.object({
  entryId: z.string().uuid().optional(),
  attemptId: z.string().uuid().nullable().optional(),
  externalExpenseId: z.string().uuid().nullable().optional(),
  type: LedgerEntryTypeEnum,
  microUsd: z.number().int(),
  actor: z.string().max(100),
  createdAt: z.string().datetime().optional(),
});
export type BudgetLedgerEntry = z.infer<typeof BudgetLedgerEntrySchema>;

export const BudgetSummarySchema = z.object({
  totalCapMicroUsd: z.number().int().default(TOTAL_BUDGET_MICRO_USD),
  settledMicroUsd: z.number().int().nonnegative(),
  reservedMicroUsd: z.number().int().nonnegative(),
  externalExpenseMicroUsd: z.number().int().nonnegative(),
  remainingMicroUsd: z.number().int(),
});
export type BudgetSummary = z.infer<typeof BudgetSummarySchema>;
