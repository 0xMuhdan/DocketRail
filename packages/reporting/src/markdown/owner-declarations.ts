import type { ProjectMetadata, DeviceEvidenceInput } from "@docketrail/contracts";

export interface OwnerDeclarationsDocInput {
  runId: string;
  confirmedBy?: string | null;
  confirmedAt?: string | null;
  metadata: ProjectMetadata;
  deviceEvidence?: DeviceEvidenceInput[];
}

export function generateOwnerDeclarationsMarkdown(
  input: OwnerDeclarationsDocInput
): string {
  const metadataEntries = Object.entries(input.metadata).filter(
    ([, field]) => field && field.confirmedByOwner
  );

  const metaList =
    metadataEntries.length > 0
      ? metadataEntries
          .map(([key, field]) => `- **${key}**: "${field!.value}" (Source: \`${field!.source}\`)`)
          .join("\n")
      : "_No metadata items marked as confirmed by owner._";

  const deviceList =
    input.deviceEvidence && input.deviceEvidence.length > 0
      ? input.deviceEvidence
          .map(
            (dev, i) =>
              `${i + 1}. **${dev.fileName}**
   - Tester: \`${dev.testerName}\`
   - Test Date: \`${dev.testDate}\`
   - Network: \`${dev.network}\`
   - MiniPay Version: \`${dev.minipayVersion || "Unspecified"}\`
   - Step Tested: "${dev.stepTested}"`
          )
          .join("\n")
      : "_No physical device test attachments supplied._";

  return `# Owner Declarations

All statements in this document were explicitly verified and confirmed by the project owner. They are recorded with timestamped audit provenance.

- **Run ID**: \`${input.runId}\`
- **Confirmed By (User ID)**: \`${input.confirmedBy ?? "Anonymous / Unspecified"}\`
- **Confirmation Timestamp**: \`${input.confirmedAt ?? "Pending"}\`

---

## 1. Confirmed Project Metadata
${metaList}

## 2. Owner-Supplied Device Test Evidence
${deviceList}

> **Audit Provenance**: These declarations represent representations by the application developer. DocketRail does not forge cryptographic signatures or attest to third-party claims.
`;
}
