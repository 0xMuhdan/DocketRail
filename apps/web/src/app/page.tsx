import React from "react";
import Link from "next/link";
import {
  FolderCheck,
  Check,
  AlertCircle,
  HelpCircle,
  Minus,
  Layers,
  FileCode,
  Download,
  Terminal,
  Shield,
  Smartphone,
  ExternalLink,
} from "lucide-react";
import {
  SAMPLE_PROJECT,
  SAMPLE_RUN,
  SAMPLE_REQUIREMENTS,
  SAMPLE_ORIGINS,
  SAMPLE_CONTRACTS,
  SAMPLE_TRANSACTIONS,
} from "@/lib/sample-data";
import { StatusBadge } from "@/components/StatusBadge";
import { CostCard } from "@/components/CostCard";

export default function HomePage() {
  return (
    <div className="space-y-16 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO SECTION */}
      <section className="max-w-4xl mx-auto text-center space-y-5 pt-4">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          Turn your MiniPay app into a verified submission pack
        </h1>

        <p className="text-base sm:text-lg text-base-300 max-w-2xl mx-auto leading-relaxed">
          DocketRail runs bounded scans on your public deployment, builds your network origin inventory, verifies contract receipts on Celo, and outputs a traceable dossier for human review.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/projects/new"
            className="w-full sm:w-auto px-5 py-2.5 rounded-md font-medium text-sm bg-brand hover:bg-brand-hover text-white transition-colors"
          >
            Create Inspection Project
          </Link>
          <a
            href="#sample-pack"
            className="w-full sm:w-auto px-5 py-2.5 rounded-md font-medium text-sm bg-base-900 hover:bg-base-850 text-base-200 border border-base-800 transition-colors"
          >
            View Sample Dossier
          </a>
        </div>
      </section>

      {/* 2. ARCHITECTURAL BOUNDARIES MATRIX */}
      <section className="border border-base-800 rounded-lg bg-base-900/60 overflow-hidden">
        <div className="p-4 border-b border-base-800 bg-base-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-brand-light" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-base-200">
              Operational Boundaries & Guarantees
            </h2>
          </div>
          <span className="text-[11px] font-mono text-base-400">
            Hard Ceiling: $1.00 USD
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-base-800 text-xs text-base-300">
          <div className="p-4 space-y-1">
            <span className="font-semibold text-white block text-sm">Non-Custodial</span>
            <p className="text-base-400 leading-relaxed text-[11px]">
              No private keys on the web server. Paid transactions run through local runner CLI with explicit terminal prompt.
            </p>
          </div>

          <div className="p-4 space-y-1">
            <span className="font-semibold text-white block text-sm">360×640 Viewport</span>
            <p className="text-base-400 leading-relaxed text-[11px]">
              Playwright headless scans at standard mobile dimensions, detecting scroll overflow and open-in-MiniPay fallbacks.
            </p>
          </div>

          <div className="p-4 space-y-1">
            <span className="font-semibold text-white block text-sm">Safe Navigation</span>
            <p className="text-base-400 leading-relaxed text-[11px]">
              Max 3 flows and 10 pages. Bounded links only. Form submittals, external transactions, and unapproved domains blocked.
            </p>
          </div>

          <div className="p-4 space-y-1">
            <span className="font-semibold text-white block text-sm">Deterministic ZIP</span>
            <p className="text-base-400 leading-relaxed text-[11px]">
              Export dossier includes Markdown, CSV with formula injection defense, raw screenshots, and verified SHA-256 indices.
            </p>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SAMPLE DOSSIER EXPLORER */}
      <section id="sample-pack" className="space-y-4 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Sample Dossier Explorer
            </h2>
            <p className="text-xs text-base-400">
              Interactive preview of an assembled audit dossier (labelled illustration data).
            </p>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-base-900 border border-base-800 text-base-300">
            Target: celoswap-demo.example.com
          </span>
        </div>

        <div className="border border-base-800 rounded-lg bg-base-900/40 p-5 space-y-6">
          {/* Header Summary */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-base-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold text-brand-light">
                  RUN {SAMPLE_RUN.id}
                </span>
                <span className="text-[11px] font-mono uppercase px-1.5 py-0.2 rounded bg-base-850 text-base-300 border border-base-750">
                  {SAMPLE_RUN.mode}
                </span>
                <span className="text-[11px] font-mono text-amber-300/90 border border-amber-900/60 bg-amber-950/40 px-1.5 py-0.2 rounded">
                  {SAMPLE_RUN.state}
                </span>
              </div>
              <h3 className="font-semibold text-base text-white">
                {SAMPLE_PROJECT.displayName}
              </h3>
              <p className="text-xs font-mono text-base-400">
                Commit: {SAMPLE_RUN.sourceCommit} • Verified Pages: {SAMPLE_RUN.captureSummary.pagesChecked} • Screenshots: {SAMPLE_RUN.captureSummary.screenshotsTaken}
              </p>
            </div>

            <div className="w-full lg:w-72">
              <CostCard
                settledMicroUsd={SAMPLE_RUN.budget.settledMicroUsd}
                reservedMicroUsd={SAMPLE_RUN.budget.reservedMicroUsd}
              />
            </div>
          </div>

          {/* Canonical 4-Status Checklist Table */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <h4 className="font-semibold text-white">
                Readiness Evaluation Matrix ({SAMPLE_REQUIREMENTS.length} items)
              </h4>
              <span className="text-base-400 text-[11px]">
                Deterministic Rules Evaluated
              </span>
            </div>

            <div className="border border-base-800 rounded-md overflow-hidden bg-base-950">
              <table className="w-full text-left text-xs">
                <thead className="bg-base-900 border-b border-base-800 text-base-400 font-mono text-[11px]">
                  <tr>
                    <th className="p-3 w-40">Requirement</th>
                    <th className="p-3 w-44">Status</th>
                    <th className="p-3">Finding & Deterministic Rule</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-850">
                  {SAMPLE_REQUIREMENTS.map((req) => (
                    <tr key={req.id} className="hover:bg-base-900/40">
                      <td className="p-3 font-mono font-medium text-base-200 align-top">
                        {req.requirementId}
                      </td>
                      <td className="p-3 align-top">
                        <StatusBadge status={req.status} />
                      </td>
                      <td className="p-3 space-y-1 align-top">
                        <div className="text-white font-medium">{req.findingText}</div>
                        <div className="font-mono text-[11px] text-base-400">
                          Rule: <code>{req.deterministicRule}</code>
                        </div>
                        {req.ownerComment && (
                          <div className="text-[11px] text-amber-300/80 italic font-sans">
                            Owner note: &ldquo;{req.ownerComment}&rdquo;
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Network Origins & On-Chain Audit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="border border-base-800 rounded-md p-4 bg-base-950 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-brand-light" />
                  Observed Network Origins ({SAMPLE_ORIGINS.length})
                </span>
                <span className="text-[11px] font-mono text-base-400">Mandatory MiniPay List</span>
              </div>
              <div className="space-y-1.5 font-mono text-xs">
                {SAMPLE_ORIGINS.map((o, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded bg-base-900 border border-base-850 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-white block text-xs">{o.origin}</span>
                      <span className="text-[10px] text-base-400 font-sans">
                        Kind: {o.sourceKind} {o.sourceLocator && `(${o.sourceLocator})`}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-sans ${
                        o.confirmedByOwnerAt
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : "bg-amber-950 text-amber-300 border border-amber-800"
                      }`}
                    >
                      {o.confirmedByOwnerAt ? "Confirmed" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-base-800 rounded-md p-4 bg-base-950 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-brand-light" />
                  On-Chain Contracts & Receipts
                </span>
                <span className="text-[11px] font-mono text-base-400">Celo Mainnet (42220)</span>
              </div>
              <div className="space-y-2 text-xs">
                {SAMPLE_CONTRACTS.map((c, idx) => (
                  <div key={idx} className="p-2 rounded bg-base-900 border border-base-850 space-y-1">
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="text-base-300">Contract (cUSD Router)</span>
                      <span className="text-emerald-400 uppercase text-[10px] font-bold">Verified</span>
                    </div>
                    <code className="text-white block text-[11px] truncate font-mono">{c.address}</code>
                    <span className="text-[11px] text-base-400 block font-mono">
                      Methods: {c.methods.join(", ")}
                    </span>
                  </div>
                ))}

                {SAMPLE_TRANSACTIONS.map((tx, idx) => (
                  <div key={idx} className="p-2 rounded bg-base-900 border border-base-850 space-y-0.5">
                    <span className="text-[11px] text-base-400 font-mono block">Sample Tx Hash:</span>
                    <code className="text-white block text-[11px] truncate font-mono">{tx.txHash}</code>
                    <span className="text-[10px] text-emerald-400 font-mono block">
                      Receipt: SUCCESS • Block #{tx.blockNumber}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-3 border-t border-base-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-base-400">
            <span>
              Sample dossier ready. You can inspect live workspaces or run a fresh scan on your own application.
            </span>
            <Link
              href="/projects/new"
              className="px-3.5 py-1.5 rounded-md font-medium text-xs bg-brand hover:bg-brand-hover text-white transition-colors"
            >
              Start Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
