import { z } from "zod";
import { PlanStepTypeEnum } from "../enums.js";
import {
  MAX_STEPS_PER_FLOW,
  MAX_FLOWS_COUNT,
  MAX_PAGES_COUNT,
  MAX_TOTAL_STEPS,
  DEFAULT_VIEWPORT,
} from "../constants.js";

export const ViewportSchema = z.object({
  width: z.number().int().min(320).max(1920).default(DEFAULT_VIEWPORT.width),
  height: z.number().int().min(480).max(1080).default(DEFAULT_VIEWPORT.height),
});
export type Viewport = z.infer<typeof ViewportSchema>;

export const PlanStepSchema = z.object({
  id: z.string().uuid(),
  type: PlanStepTypeEnum,
  target: z.string().min(1).max(500),
  label: z.string().max(200),
  takeScreenshot: z.boolean().default(false),
});
export type PlanStep = z.infer<typeof PlanStepSchema>;

export const PlanFlowSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(100),
  entryPath: z.string().min(1).max(500),
  steps: z.array(PlanStepSchema).max(MAX_STEPS_PER_FLOW),
});
export type PlanFlow = z.infer<typeof PlanFlowSchema>;

export const RunPlanSchema = z
  .object({
    allowedOrigin: z.string().url(),
    approvedExternalOrigins: z.array(z.string()).default([]),
    flows: z.array(PlanFlowSchema).min(1).max(MAX_FLOWS_COUNT),
    maximumPages: z.number().int().min(1).max(MAX_PAGES_COUNT).default(MAX_PAGES_COUNT),
    maximumSteps: z.number().int().min(1).max(MAX_TOTAL_STEPS).default(MAX_TOTAL_STEPS),
    viewport: ViewportSchema.default(DEFAULT_VIEWPORT),
    digest: z.string().length(64), // SHA-256 hex digest of the normalized plan
  })
  .refine(
    (plan) => {
      const totalSteps = plan.flows.reduce(
        (sum, flow) => sum + flow.steps.length,
        0
      );
      return totalSteps <= MAX_TOTAL_STEPS;
    },
    {
      message: `Total steps across all flows must not exceed ${MAX_TOTAL_STEPS}`,
    }
  );
export type RunPlan = z.infer<typeof RunPlanSchema>;

export const ApprovePlanInputSchema = z.object({
  planRevision: z.number().int().positive(),
  digest: z.string().length(64),
});
export type ApprovePlanInput = z.infer<typeof ApprovePlanInputSchema>;
