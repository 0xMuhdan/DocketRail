import type { PurchaseAttemptResult, PurchaseAttemptQuote } from "@docketrail/contracts";
import { toCsvString } from "../csv.js";

export interface PaymentRecord {
  attemptId: string;
  purpose: string;
  providerId: string;
  tokenAddress: string;
  decimals: number;
  quotedAtomic: string;
  settledMicroUsd: number;
  state: string;
  txHash?: string | null;
  chainId: number;
}

const HEADERS = [
  "attempt_id",
  "purpose",
  "provider_id",
  "token_address",
  "decimals",
  "quoted_atomic",
  "settled_micro_usd",
  "payment_state",
  "tx_hash",
  "chain_id",
];

export function generatePaymentsCsv(payments: PaymentRecord[]): string {
  const rows = payments.map((p) => [
    p.attemptId,
    p.purpose,
    p.providerId,
    p.tokenAddress,
    p.decimals,
    p.quotedAtomic,
    p.settledMicroUsd,
    p.state,
    p.txHash ?? "",
    p.chainId,
  ]);

  return toCsvString(HEADERS, rows);
}
