import React from "react";
import type { RequirementStatus } from "@docketrail/contracts";
import { Check, AlertCircle, HelpCircle, Minus } from "lucide-react";

interface StatusBadgeProps {
  status: RequirementStatus;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  switch (status) {
    case "evidence_available":
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-950 text-emerald-300 border border-emerald-800 ${className}`}
        >
          <Check className="w-3 h-3 text-emerald-400 stroke-[2.5]" />
          Evidence Available
        </span>
      );
    case "needs_fix":
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-rose-950 text-rose-300 border border-rose-800 ${className}`}
        >
          <AlertCircle className="w-3 h-3 text-rose-400 stroke-[2.5]" />
          Needs Fix
        </span>
      );
    case "needs_owner_confirmation":
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-950 text-amber-300 border border-amber-800 ${className}`}
        >
          <HelpCircle className="w-3 h-3 text-amber-400 stroke-[2.5]" />
          Needs Confirmation
        </span>
      );
    case "not_checked":
    default:
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-base-900 text-base-300 border border-base-700 ${className}`}
        >
          <Minus className="w-3 h-3 text-base-400 stroke-[2.5]" />
          Not Checked
        </span>
      );
  }
}
