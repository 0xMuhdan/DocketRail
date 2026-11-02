import type { RequirementResult } from "@docketrail/contracts";

export interface MissingItemsDocInput {
  runId: string;
  results: RequirementResult[];
}

export function generateMissingItemsMarkdown(input: MissingItemsDocInput): string {
  const needsFix = input.results.filter((r) => r.status === "needs_fix");
  const needsConfirmation = input.results.filter(
    (r) => r.status === "needs_owner_confirmation"
  );
  const notChecked = input.results.filter((r) => r.status === "not_checked");

  const formatList = (items: RequirementResult[]) => {
    if (items.length === 0) {
      return "_None recorded._\n";
    }
    return items
      .map(
        (item) => `### [${item.requirementId}]
- **Status**: \`${item.status}\`
- **Applicability**: \`${item.applicability}\`
- **Finding**: ${item.findingText}
- **Deterministic Rule**: \`${item.deterministicRule}\`
${item.ownerComment ? `- **Owner Note**: _"${item.ownerComment}"_` : ""}
`
      )
      .join("\n");
  };

  return `# Outstanding & Missing Items

This list provides a prioritized actionable overview of requirements that either failed inspection, require developer confirmation, or could not be verified automatically.

---

## 1. Action Required: Needs Fix (\`${needsFix.length}\` items)
Issues that failed automated checks and must be resolved prior to submission:

${formatList(needsFix)}

## 2. Review Required: Needs Owner Confirmation (\`${needsConfirmation.length}\` items)
Items identified by source hints or metadata that require explicit verification by the project owner:

${formatList(needsConfirmation)}

## 3. Not Checked / Partial Coverage (\`${notChecked.length}\` items)
Requirements that could not be verified automatically (e.g. physical device wallet interactions, closed authentication flows):

${formatList(notChecked)}
`;
}
