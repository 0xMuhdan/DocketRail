import React from "react";
import { Coins, Lock, ShieldCheck } from "lucide-react";

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
    <div className="bg-canvas-panel border border-border-dim rounded-lg p-3.5 space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-content-primary font-semibold">
          <Coins className="w-3.5 h-3.5 text-lime" />
          <span>x402 Atomic Spend Meter</span>
        </div>
        <span className="font-mono text-[11px] text-content-muted border border-border-dim px-1.5 py-0.2 rounded bg-canvas-deep">
          Hard Cap: $1.00 USD
        </span>
      </div>

      <div className="w-full bg-canvas-deep rounded-full h-1.5 overflow-hidden border border-border-dim">
        <div
          className="bg-lime h-1.5 transition-all duration-300"
          style={{ width: `${Math.max(4, percentUsed)}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-1.5 text-center text-xs font-mono">
        <div className="bg-canvas-deep p-1.5 rounded border border-border-dim">
          <span className="text-[10px] text-content-muted block font-sans">Settled</span>
          <span className="text-content-primary font-medium">${settledUsd}</span>
        </div>
        <div className="bg-canvas-deep p-1.5 rounded border border-border-dim">
          <span className="text-[10px] text-amber-400 block font-sans">Reserved</span>
          <span className="text-amber-200 font-medium">${reservedUsd}</span>
        </div>
        <div className="bg-canvas-deep p-1.5 rounded border border-border-dim">
          <span className="text-[10px] text-emerald-400 block font-sans">Remaining</span>
          <span className="text-emerald-200 font-medium">${remainingUsd}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-content-muted pt-1 border-t border-border-dim">
        <Lock className="w-3 h-3 text-content-dim shrink-0" />
        <span>Fail-closed: Uncertain settlement locks further calls automatically</span>
      </div>
    </div>
  );
}
