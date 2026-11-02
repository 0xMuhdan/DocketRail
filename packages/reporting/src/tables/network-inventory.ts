import type { NetworkOrigin } from "@docketrail/contracts";
import { toCsvString } from "../csv.js";

const HEADERS = [
  "origin",
  "source_kind",
  "resource_type",
  "source_locator",
  "observed_at",
  "confirmed_by_owner_at",
];

export function generateNetworkInventoryCsv(origins: NetworkOrigin[]): string {
  const rows = origins.map((o) => [
    o.origin,
    o.sourceKind,
    o.resourceType ?? "",
    o.sourceLocator ?? "",
    o.observedAt ?? "",
    o.confirmedByOwnerAt ?? "",
  ]);

  return toCsvString(HEADERS, rows);
}
