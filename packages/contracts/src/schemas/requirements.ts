import { z } from "zod";
import {
  RequirementStatusEnum,
  ApplicabilityEnum,
  RequirementAuthorityEnum,
  CaptureMethodEnum,
} from "../enums.js";

export const RequirementCatalogItemSchema = z.object({
  requirementId: z.string().min(1).max(50),
  title: z.string().min(1).max(200),
  description: z.string().max(2000),
  sourceId: z.string().max(20), // e.g. S07, S08
  sourceUrl: z.string().url(),
  authority: RequirementAuthorityEnum,
  applicabilityRule: z.string().max(500),
  expectedEvidenceMethods: z.array(CaptureMethodEnum),
});
export type RequirementCatalogItem = z.infer<
  typeof RequirementCatalogItemSchema
>;

export const RequirementResultSchema = z.object({
  id: z.string().uuid().optional(),
  runId: z.string().uuid(),
  requirementId: z.string().min(1).max(50),
  applicability: ApplicabilityEnum,
  status: RequirementStatusEnum,
  findingText: z.string().max(2000),
  deterministicRule: z.string().max(255),
  evidenceIds: z.array(z.string().uuid()).default([]),
  ownerComment: z.string().max(1000).nullable().optional(),
  reviewedAt: z.string().datetime().nullable().optional(),
});
export type RequirementResult = z.infer<typeof RequirementResultSchema>;

export const UpdateOwnerReviewInputSchema = z.object({
  requirementId: z.string().min(1).max(50),
  applicability: ApplicabilityEnum.optional(),
  ownerComment: z.string().max(1000).optional(),
  dismissReason: z.string().max(500).optional(),
});
export type UpdateOwnerReviewInput = z.infer<
  typeof UpdateOwnerReviewInputSchema
>;
