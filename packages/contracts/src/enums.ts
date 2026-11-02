import { z } from "zod";

/**
 * Canonically defined status for each MiniPay readiness requirement.
 * Exactly 4 statuses as mandated by DocketRail PRD Section 8.
 */
export const RequirementStatusEnum = z.enum([
  "evidence_available",
  "needs_fix",
  "needs_owner_confirmation",
  "not_checked",
]);
export type RequirementStatus = z.infer<typeof RequirementStatusEnum>;

/**
 * Applicability of a requirement to a specific project.
 */
export const ApplicabilityEnum = z.enum([
  "applicable",
  "not_applicable",
  "unknown",
]);
export type Applicability = z.infer<typeof ApplicabilityEnum>;

/**
 * State machine for execution runs.
 */
export const RunStateEnum = z.enum([
  "draft",
  "awaiting_plan_approval",
  "queued",
  "running",
  "needs_owner_review",
  "exported",
  "partial",
  "failed",
  "stopped",
  "payment_uncertain",
]);
export type RunState = z.infer<typeof RunStateEnum>;

/**
 * Execution mode: local runner only vs paid mainnet compute.
 */
export const RunModeEnum = z.enum(["local", "mainnet"]);
export type RunMode = z.infer<typeof RunModeEnum>;

/**
 * State machine for x402 purchase attempts.
 */
export const PaymentStateEnum = z.enum([
  "quoted",
  "reserved",
  "approved",
  "dispatching",
  "settled",
  "uncertain",
  "confirmed_not_paid",
]);
export type PaymentState = z.infer<typeof PaymentStateEnum>;

/**
 * Outcome of the provider service behind a settled payment.
 */
export const PaymentServiceResultEnum = z.enum([
  "succeeded",
  "failed",
  "partial",
]);
export type PaymentServiceResult = z.infer<typeof PaymentServiceResultEnum>;

/**
 * Exact provenance/method of an evidence artifact.
 */
export const CaptureMethodEnum = z.enum([
  "browser_observed",
  "source_reference",
  "owner_supplied",
  "rpc_observed",
  "external_report",
]);
export type CaptureMethod = z.infer<typeof CaptureMethodEnum>;

/**
 * Stage of MiniPay submission.
 */
export const SubmissionStageEnum = z.enum(["intake", "readiness"]);
export type SubmissionStage = z.infer<typeof SubmissionStageEnum>;

/**
 * Ledger entry types for deterministic budget tracking.
 */
export const LedgerEntryTypeEnum = z.enum([
  "reserve",
  "settle",
  "release",
  "external_expense",
  "adjustment",
]);
export type LedgerEntryType = z.infer<typeof LedgerEntryTypeEnum>;

/**
 * Authority level for a catalog requirement rule.
 */
export const RequirementAuthorityEnum = z.enum([
  "primary_documentation",
  "official_reference",
  "owner_instruction",
]);
export type RequirementAuthority = z.infer<typeof RequirementAuthorityEnum>;

/**
 * State of export package assembly.
 */
export const ExportStateEnum = z.enum(["assembling", "ready", "failed"]);
export type ExportState = z.infer<typeof ExportStateEnum>;

/**
 * Types of safe scanner navigation steps.
 */
export const PlanStepTypeEnum = z.enum([
  "navigate",
  "click-safe-link",
  "read-text",
  "screenshot",
  "check-link",
]);
export type PlanStepType = z.infer<typeof PlanStepTypeEnum>;
