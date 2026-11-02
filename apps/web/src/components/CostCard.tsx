import React from "react";
import { DollarSign, Shield } from "lucide-react";

interface CostCardProps {
  settledMicroUsd: number;
  reservedMicroUsd: number;
  totalCapMicroUsd?: number;
}

export function CostCard({
  settledMicroUsd,
  reservedMicroUsd,
  totalCapMicroUsd = 1_000_000,
}: CostCardProps) {
  const settledUsd = (settledMicroUsd / 1_000_000).toFixed(4);
  const reservedUsd = (reservedMicroUsd / 1_000_000).toFixed(4);
  const remainingMicroUsd = Math.max(0, totalCapMicroUsd - settledMicroUsd - reservedMicroUsd);
  const remainingUsd = (remainingMicroUsd / 1_000_000).toFixed(4);

  const percentUsed = Math.min(
    100,
    ((settledMicroUsd + reservedMicroUsd) / totalCapMicroUsd) * 100
  );

  return (
    <div className="bg-base-900 border border-base-800 rounded-lg p-3.5 space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-base-200 font-semibold">
          <DollarSign className="w-3.5 h-3.5 text-brand-light" />
          <span>x402 Budget Ledger</span>
        </div>
        <span className="font-mono text-[11px] text-base-400">
          Cap: $1.00 USD
        </span>
      </div>

      <div className="w-full bg-base-950 rounded h-1.5 overflow-hidden border border-base-800">
        <div
          className="bg-brand-light h-1.5 transition-all duration-300"
          style={{ width: `${percentUsed}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-1.5 text-center text-xs font-mono">
        <div className="bg-base-950 p-1.5 rounded border border-base-800">
          <span className="text-[10px] text-base-400 block font-sans">Settled</span>
          <span className="text-white font-medium">${settledUsd}</span>
        </div>
        <div className="bg-base-950 p-1.5 rounded border border-base-800">
          <span className="text-[10px] text-amber-400/90 block font-sans">Reserved</span>
          <span className="text-amber-200 font-medium">${reservedUsd}</span>
        </div>
        <div className="bg-base-950 p-1.5 rounded border border-base-800">
          <span className="text-[10px] text-emerald-400/90 block font-sans">Remaining</span>
          <span className="text-emerald-200 font-medium">${remainingUsd}</span>
        </div>
      </div>

      <div className="flex items-center gap-1 text-[11px] text-base-400 pt-0.5 border-t border-base-800/80">
        <Shield className="w-3 h-3 text-base-400 shrink-0" />
        <span>Atomic locks: Fail-closed on ambiguous settlement</span>
      </div>
    </div>
  );
}
