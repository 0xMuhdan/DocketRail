import React from "react";
import type { RequirementStatus } from "@docketrail/contracts";
import { CheckCircle2, AlertTriangle, HelpCircle, MinusCircle } from "lucide-react";

interface StatusBadgeProps {
  status: RequirementStatus;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  switch (status) {
    case "evidence_available":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 ${className}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          Evidence Available
        </span>
      );
    case "needs_fix":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-950/80 text-rose-300 border border-rose-700/60 ${className}`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          Needs Fix
        </span>
      );
    case "needs_owner_confirmation":
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-950/80 text-amber-300 border border-amber-700/60 ${className}`}
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          Needs Confirmation
        </span>
      );
    case "not_checked":
    default:
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-900/80 text-slate-300 border border-slate-700/60 ${className}`}
        >
          <MinusCircle className="w-3.5 h-3.5 text-slate-400" />
          Not Checked
        </span>
      );
  }
}
