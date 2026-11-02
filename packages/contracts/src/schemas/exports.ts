import { z } from "zod";
import { ExportStateEnum } from "../enums.js";

export const RequestExportInputSchema = z.object({
  runId: z.string().uuid(),
  completenessAcknowledgement: z.boolean(),
  notes: z.string().max(1000).optional(),
});
export type RequestExportInput = z.infer<typeof RequestExportInputSchema>;

export const ExportPackageMetadataSchema = z.object({
  id: z.string().uuid(),
  runId: z.string().uuid(),
  projectRevisionId: z.string().uuid(),
  state: ExportStateEnum,
  ownerReviewedAt: z.string().datetime(),
  completenessNote: z.string(),
  evidenceIndexHash: z.string().length(64),
  storagePath: z.string().nullable().optional(),
  downloadUrl: z.string().url().nullable().optional(),
  downloadExpiresAt: z.string().datetime().nullable().optional(),
  createdAt: z.string().datetime(),
});
export type ExportPackageMetadata = z.infer<
  typeof ExportPackageMetadataSchema
>;

export const CreateShareSnapshotInputSchema = z.object({
  exportId: z.string().uuid(),
  expiryDays: z.number().int().min(1).max(30).default(7),
});
export type CreateShareSnapshotInput = z.infer<
  typeof CreateShareSnapshotInputSchema
>;

export const ShareSnapshotResponseSchema = z.object({
  shareId: z.string().uuid(),
  exportId: z.string().uuid(),
  publicUrl: z.string().url(),
  expiresAt: z.string().datetime(),
});
export type ShareSnapshotResponse = z.infer<
  typeof ShareSnapshotResponseSchema
>;
