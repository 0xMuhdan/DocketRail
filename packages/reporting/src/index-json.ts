import type { EvidenceItem } from "@docketrail/contracts";

export interface EvidenceIndexPayload {
  version: "1.0.0";
  generator: "DocketRail";
  runId: string;
  projectId: string;
  assembledAt: string;
  totalEvidenceCount: number;
  items: EvidenceItem[];
}

export function generateEvidenceIndexJson(payload: EvidenceIndexPayload): string {
  // Sort items deterministically by ID
  const sortedItems = [...payload.items].sort((a, b) => a.id.localeCompare(b.id));

  const sortedPayload: EvidenceIndexPayload = {
    ...payload,
    totalEvidenceCount: sortedItems.length,
    items: sortedItems,
  };

  return JSON.stringify(sortedPayload, null, 2);
}
