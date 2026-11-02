import type { ContractEvidence, TransactionEvidence } from "@docketrail/contracts";
import { toCsvString } from "../csv.js";

const HEADERS = [
  "type",
  "chain_id",
  "address_or_hash",
  "methods_or_claimed",
  "verification_or_receipt_status",
  "owner_confirmed",
  "notes_or_source",
];

export function generateContractsCsv(
  contracts: ContractEvidence[],
  transactions: TransactionEvidence[]
): string {
  const contractRows = contracts.map((c) => [
    "contract",
    c.chainId,
    c.address,
    c.methods.join(";"),
    c.sourceVerificationStatus,
    c.ownerConfirmed ? "true" : "false",
    c.verificationSourceUrl ?? "",
  ]);

  const txRows = transactions.map((t) => [
    "transaction",
    t.chainId,
    t.txHash,
    `${t.claimedContract || ""}#${t.claimedMethod || ""}`,
    t.receiptStatus,
    t.suppliedBy === "owner" ? "true" : "false",
    t.consistencyNotes ?? "",
  ]);

  return toCsvString(HEADERS, [...contractRows, ...txRows]);
}
