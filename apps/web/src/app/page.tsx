import React from "react";
import Link from "next/link";
import {
  FolderCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  MinusCircle,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  DollarSign,
  Smartphone,
  Layers,
  FileSpreadsheet,
  FileCode,
  Download,
} from "lucide-react";
import {
  SAMPLE_PROJECT,
  SAMPLE_METADATA,
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
    <div className="space-y-24 py-10">
      {/* 1. HERO SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-forest-900/90 text-lime-400 border border-forest-700/80 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <span>Build with buy • Agents on Open Rails</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Your app. Your evidence.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-forest-400">
            Ready for review.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-forest-200 max-w-2xl mx-auto leading-relaxed">
          Turn your MiniPay app into a verified submission pack with traceable evidence,
          deterministic origin inventories, and a clear list of what is missing.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/projects/new"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-lime-500 hover:bg-lime-400 text-forest-950 shadow-lg shadow-lime-500/10 transition-all hover:scale-[1.02]"
          >
            <span>Start Submission Dossier</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="#sample-pack"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-forest-900/80 hover:bg-forest-800 text-white border border-forest-700/80 transition-colors"
          >
            <span>Explore Sample Pack</span>
            <ExternalLink className="w-4 h-4 text-forest-400" />
          </a>
        </div>

        <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left text-xs text-forest-300">
          <div className="bg-forest-900/40 p-3 rounded-lg border border-forest-800/60">
            <span className="font-semibold text-white block mb-0.5">Non-Custodial</span>
            <span>No private keys or signer tokens stored on web server</span>
          </div>
          <div className="bg-forest-900/40 p-3 rounded-lg border border-forest-800/60">
            <span className="font-semibold text-white block mb-0.5">Hard Spend Cap</span>
            <span>US$1.00 hard limit with atomic x402 ledger locks</span>
          </div>
          <div className="bg-forest-900/40 p-3 rounded-lg border border-forest-800/60">
            <span className="font-semibold text-white block mb-0.5">360×640 Viewport</span>
            <span>Mobile reference scans with horizontal overflow checks</span>
          </div>
          <div className="bg-forest-900/40 p-3 rounded-lg border border-forest-800/60">
            <span className="font-semibold text-white block mb-0.5">Traceable Proof</span>
            <span>Every finding references timestamped evidence files</span>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xs uppercase font-bold tracking-widest text-lime-400 mb-2">
            Execution Flow
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            From URL to Offline-Ready Review Dossier
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-forest-900/60 border border-forest-800 rounded-xl p-5 relative">
            <div className="w-8 h-8 rounded-full bg-forest-800 flex items-center justify-center font-bold text-lime-400 mb-4 border border-forest-700">
              1
            </div>
            <h4 className="font-semibold text-white mb-2 text-base">Plan Proposal</h4>
            <p className="text-xs text-forest-300 leading-relaxed">
              Input your HTTPS application URL. DocketRail generates a bounded plan of max 3 flows and 10 pages for user review.
            </p>
          </div>

          <div className="bg-forest-900/60 border border-forest-800 rounded-xl p-5 relative">
            <div className="w-8 h-8 rounded-full bg-forest-800 flex items-center justify-center font-bold text-lime-400 mb-4 border border-forest-700">
              2
            </div>
            <h4 className="font-semibold text-white mb-2 text-base">Local Pairing</h4>
            <p className="text-xs text-forest-300 leading-relaxed">
              Pair your local runner with a human-readable verification code. Quotes and payments require explicit terminal consent.
            </p>
          </div>

          <div className="bg-forest-900/60 border border-forest-800 rounded-xl p-5 relative">
            <div className="w-8 h-8 rounded-full bg-forest-800 flex items-center justify-center font-bold text-lime-400 mb-4 border border-forest-700">
              3
            </div>
            <h4 className="font-semibold text-white mb-2 text-base">Evidence Collection</h4>
            <p className="text-xs text-forest-300 leading-relaxed">
              Playwright scanner runs in ephemeral VM. Collects 360×640 screenshots, runtime origins, and console diagnostics.
            </p>
          </div>

          <div className="bg-forest-900/60 border border-forest-800 rounded-xl p-5 relative">
            <div className="w-8 h-8 rounded-full bg-forest-800 flex items-center justify-center font-bold text-lime-400 mb-4 border border-forest-700">
              4
            </div>
            <h4 className="font-semibold text-white mb-2 text-base">Review & Export</h4>
            <p className="text-xs text-forest-300 leading-relaxed">
              Confirm metadata, attach mobile device evidence, and download deterministic ZIP with Markdown and safe CSV tables.
            </p>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SAMPLE PACK EXPLORER */}
      <section
        id="sample-pack"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 scroll-mt-20"
      >
        <div className="bg-forest-950 border-2 border-forest-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-lime-500 text-forest-950 text-[11px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
            Illustration Sample Pack
          </div>

          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8 pb-6 border-b border-forest-800/80">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <FolderCheck className="w-5 h-5 text-lime-400" />
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {SAMPLE_PROJECT.displayName}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-forest-300">
                Target URL: <code className="text-forest-100">{SAMPLE_PROJECT.applicationUrl}</code> • Commit: <code className="text-forest-100">{SAMPLE_RUN.sourceCommit}</code>
              </p>
            </div>

            <div className="w-full lg:w-72">
              <CostCard
                settledMicroUsd={SAMPLE_RUN.budget.settledMicroUsd}
                reservedMicroUsd={SAMPLE_RUN.budget.reservedMicroUsd}
              />
            </div>
          </div>

          {/* Requirements Checklist */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-forest-200">
                Canonical Requirements Checklist ({SAMPLE_REQUIREMENTS.length} Items)
              </h4>
              <span className="text-xs text-forest-400">Exact 4-status evaluation</span>
            </div>

            <div className="divide-y divide-forest-800/60 border border-forest-800/80 rounded-xl bg-forest-900/40 overflow-hidden">
              {SAMPLE_REQUIREMENTS.map((req) => (
                <div
                  key={req.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-forest-900/70 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-lime-300">
                        {req.requirementId}
                      </span>
                      <StatusBadge status={req.status} />
                    </div>
                    <p className="text-sm text-white font-medium">{req.findingText}</p>
                    <p className="text-xs text-forest-400">
                      Rule: <code className="text-forest-300">{req.deterministicRule}</code>
                      {req.ownerComment && (
                        <span className="block mt-0.5 text-amber-300/90 italic">
                          &ldquo;{req.ownerComment}&rdquo;
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Network Origins & Contracts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Origins */}
            <div className="bg-forest-900/40 border border-forest-800/80 rounded-xl p-4">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-forest-200 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-lime-400" />
                Network Origins Inventory ({SAMPLE_ORIGINS.length})
              </h5>
              <div className="space-y-2">
                {SAMPLE_ORIGINS.map((o, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded bg-forest-950/70 border border-forest-800/60 text-xs flex items-center justify-between"
                  >
                    <div>
                      <span className="font-mono font-medium text-white block">{o.origin}</span>
                      <span className="text-[11px] text-forest-400">
                        Source: {o.sourceKind} {o.sourceLocator && `(${o.sourceLocator})`}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                        o.confirmedByOwnerAt
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : "bg-amber-950 text-amber-300 border border-amber-800"
                      }`}
                    >
                      {o.confirmedByOwnerAt ? "Confirmed" : "Needs Review"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contracts */}
            <div className="bg-forest-900/40 border border-forest-800/80 rounded-xl p-4">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-forest-200 mb-3 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-lime-400" />
                On-Chain Contracts & Transactions
              </h5>
              <div className="space-y-2">
                {SAMPLE_CONTRACTS.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded bg-forest-950/70 border border-forest-800/60 text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-white">Chain ID: {c.chainId} (Celo Mainnet)</span>
                      <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.5 rounded">
                        Verified
                      </span>
                    </div>
                    <code className="text-[11px] text-forest-200 block truncate">{c.address}</code>
                    <span className="text-[11px] text-forest-400 block mt-1">
                      Methods: {c.methods.join(", ")}
                    </span>
                  </div>
                ))}

                {SAMPLE_TRANSACTIONS.map((tx, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded bg-forest-950/70 border border-forest-800/60 text-xs"
                  >
                    <span className="text-forest-400 block text-[11px]">Sample Tx Hash:</span>
                    <code className="text-[11px] text-forest-200 block truncate">{tx.txHash}</code>
                    <span className="text-[11px] text-emerald-300 block mt-1">
                      Receipt: {tx.receiptStatus.toUpperCase()} (Block {tx.blockNumber})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-forest-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-forest-400">
              This sample pack is an illustration dataset. Running new analyses requires runner pairing and quote approval.
            </span>
            <Link
              href="/projects/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-lime-500 hover:bg-lime-400 text-forest-950 transition-colors shrink-0"
            >
              <span>Build Real Pack for Your App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
