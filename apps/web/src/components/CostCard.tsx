import React from "react";
import { DollarSign, ShieldAlert } from "lucide-react";

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
    <div className="bg-forest-900/90 border border-forest-700/60 rounded-xl p-4 shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-forest-200">
              Budget Ledger (US$1 Hard Ceiling)
            </h4>
            <p className="text-xs text-forest-300/80">x402 Atomic Spend Meter</p>
          </div>
        </div>
        <span className="text-xs font-medium px-2 py-0.5 rounded bg-forest-950 text-forest-200 border border-forest-800">
          Max: $1.00
        </span>
      </div>

      <div className="w-full bg-forest-950 rounded-full h-2.5 mb-3 overflow-hidden border border-forest-800">
        <div
          className="bg-lime-500 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${percentUsed}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="bg-forest-950/70 p-2 rounded border border-forest-800/80">
          <span className="text-forest-400 block mb-0.5">Settled</span>
          <span className="font-semibold text-white">${settledUsd}</span>
        </div>
        <div className="bg-forest-950/70 p-2 rounded border border-forest-800/80">
          <span className="text-amber-400 block mb-0.5">Reserved</span>
          <span className="font-semibold text-amber-200">${reservedUsd}</span>
        </div>
        <div className="bg-forest-950/70 p-2 rounded border border-forest-800/80">
          <span className="text-emerald-400 block mb-0.5">Remaining</span>
          <span className="font-semibold text-emerald-200">${remainingUsd}</span>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-forest-800/60 flex items-center gap-1.5 text-[11px] text-forest-300/80">
        <ShieldAlert className="w-3.5 h-3.5 text-lime-400 shrink-0" />
        <span>Strict fail-closed: No automated retry on uncertain settlement.</span>
      </div>
    </div>
  );
}
