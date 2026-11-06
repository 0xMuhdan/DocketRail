import React from "react";
import type { RequirementStatus } from "@docketrail/contracts";
import { Check, AlertTriangle, HelpCircle, Minus } from "lucide-react";

interface StatusBadgeProps {
  status: RequirementStatus;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  switch (status) {
    case "evidence_available":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 ${className}`}
        >
          <Check className="w-3 h-3 text-emerald-400 stroke-[2.5]" />
          <span>evidence_available</span>
        </span>
      );
    case "needs_fix":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-rose-950/80 text-rose-300 border border-rose-800/80 ${className}`}
        >
          <AlertTriangle className="w-3 h-3 text-rose-400 stroke-[2.5]" />
          <span>needs_fix</span>
        </span>
      );
    case "needs_owner_confirmation":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-amber-950/80 text-amber-300 border border-amber-800/80 ${className}`}
        >
          <HelpCircle className="w-3 h-3 text-amber-400 stroke-[2.5]" />
          <span>needs_confirmation</span>
        </span>
      );
    case "not_checked":
    default:
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-canvas-panel text-content-secondary border border-border-subtle ${className}`}
        >
          <Minus className="w-3 h-3 text-content-muted stroke-[2.5]" />
          <span>not_checked</span>
        </span>
      );
  }
}
