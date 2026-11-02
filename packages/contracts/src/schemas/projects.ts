import { z } from "zod";
import { SubmissionStageEnum } from "../enums.js";
import {
  MAX_URL_LENGTH,
  MAX_OWNER_DESCRIPTION_LENGTH,
  MAX_REVIEWER_INSTRUCTION_LENGTH,
} from "../constants.js";

/**
 * Validates HTTPS application URLs, disallowing localhost, credentials in URL, and non-HTTPS.
 */
export const HttpsUrlSchema = z
  .string()
  .max(MAX_URL_LENGTH)
  .url()
  .refine(
    (val) => {
      try {
        const url = new URL(val);
        return (
          url.protocol === "https:" &&
          url.hostname !== "localhost" &&
          url.hostname !== "127.0.0.1" &&
          !url.username &&
          !url.password
        );
      } catch {
        return false;
      }
    },
    {
      message:
        "Must be a valid public HTTPS URL without credentials or localhost",
    }
  );

export const GitHubRepoUrlSchema = z
  .string()
  .max(MAX_URL_LENGTH)
  .url()
  .refine(
    (val) => {
      try {
        const url = new URL(val);
        return (
          url.hostname === "github.com" &&
          url.pathname.split("/").filter(Boolean).length >= 2
        );
      } catch {
        return false;
      }
    },
    { message: "Must be a valid GitHub repository URL (e.g. https://github.com/owner/repo)" }
  )
  .optional();

export const CreateProjectInputSchema = z.object({
  displayName: z.string().min(1).max(100),
  applicationUrl: HttpsUrlSchema,
  repoUrl: GitHubRepoUrlSchema,
  repoSubdir: z.string().max(255).optional(),
  submissionStage: SubmissionStageEnum,
  authorizationConsent: z.literal(true, {
    errorMap: () => ({
      message: "You must confirm you have authorization to inspect this target",
    }),
  }),
});
export type CreateProjectInput = z.infer<typeof CreateProjectInputSchema>;

export const UpdateProjectInputSchema = z.object({
  displayName: z.string().min(1).max(100).optional(),
  repoSubdir: z.string().max(255).optional(),
  submissionStage: SubmissionStageEnum.optional(),
  reviewerInstructions: z
    .string()
    .max(MAX_REVIEWER_INSTRUCTION_LENGTH)
    .optional(),
});
export type UpdateProjectInput = z.infer<typeof UpdateProjectInputSchema>;

export const MetadataFieldWithProvenanceSchema = z.object({
  value: z.string().max(MAX_OWNER_DESCRIPTION_LENGTH),
  source: z.string().max(255),
  confirmedByOwner: z.boolean().default(false),
});
export type MetadataFieldWithProvenance = z.infer<
  typeof MetadataFieldWithProvenanceSchema
>;

export const ProjectMetadataSchema = z.object({
  appName: MetadataFieldWithProvenanceSchema.optional(),
  description: MetadataFieldWithProvenanceSchema.optional(),
  category: MetadataFieldWithProvenanceSchema.optional(),
  contactEmail: MetadataFieldWithProvenanceSchema.optional(),
  supportUrl: MetadataFieldWithProvenanceSchema.optional(),
  termsUrl: MetadataFieldWithProvenanceSchema.optional(),
  privacyUrl: MetadataFieldWithProvenanceSchema.optional(),
  iconUrl: MetadataFieldWithProvenanceSchema.optional(),
});
export type ProjectMetadata = z.infer<typeof ProjectMetadataSchema>;
