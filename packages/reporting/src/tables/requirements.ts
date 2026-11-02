import type { RequirementResult } from "@docketrail/contracts";
import { toCsvString } from "../csv.js";

const HEADERS = [
  "requirement_id",
  "status",
  "applicability",
  "finding_text",
  "deterministic_rule",
  "evidence_ids",
  "owner_comment",
  "reviewed_at",
];

export function generateRequirementsCsv(results: RequirementResult[]): string {
  const rows = results.map((r) => [
    r.requirementId,
    r.status,
    r.applicability,
    r.findingText,
    r.deterministicRule,
    r.evidenceIds.join(";"),
    r.ownerComment ?? "",
    r.reviewedAt ?? "",
  ]);

  return toCsvString(HEADERS, rows);
}
