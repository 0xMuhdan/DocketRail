import { z } from "zod";
import { RunModeEnum, RunStateEnum } from "../enums.js";

export const CreateRunInputSchema = z.object({
  projectId: z.string().uuid(),
  projectRevisionId: z.string().uuid(),
  mode: RunModeEnum,
  parentRunId: z.string().uuid().optional(), // For rechecks
});
export type CreateRunInput = z.infer<typeof CreateRunInputSchema>;

export const CaptureSummarySchema = z.object({
  pagesChecked: z.number().int().nonnegative().default(0),
  screenshotsTaken: z.number().int().nonnegative().default(0),
  originsObserved: z.number().int().nonnegative().default(0),
  errorsEncountered: z.number().int().nonnegative().default(0),
  truncated: z.boolean().default(false),
});
export type CaptureSummary = z.infer<typeof CaptureSummarySchema>;

export const RunResponseSchema = z.object({
  id: z.string().uuid(),
  ownerId: z.string().uuid(),
  projectId: z.string().uuid(),
  projectRevisionId: z.string().uuid(),
  parentRunId: z.string().uuid().nullable().optional(),
  mode: RunModeEnum,
  state: RunStateEnum,
  planRevision: z.number().int().positive(),
  planDigest: z.string().length(64).nullable().optional(),
  sourceCommit: z.string().nullable().optional(),
  runnerId: z.string().uuid().nullable().optional(),
  fence: z.number().int().nonnegative(),
  claimedAt: z.string().datetime().nullable().optional(),
  heartbeatAt: z.string().datetime().nullable().optional(),
  coordinationExpiresAt: z.string().datetime().nullable().optional(),
  startedAt: z.string().datetime().nullable().optional(),
  endedAt: z.string().datetime().nullable().optional(),
  stopRequestedAt: z.string().datetime().nullable().optional(),
  captureSummary: CaptureSummarySchema.nullable().optional(),
  failureCode: z.string().nullable().optional(),
});
export type RunResponse = z.infer<typeof RunResponseSchema>;
