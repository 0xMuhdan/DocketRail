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
  Cpu,
  Coins,
  TrendingUp,
  Clock,
  Sparkles,
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
import { Logo } from "@/components/Logo";
import { PipelineDiagram3D } from "@/components/PipelineDiagram3D";

export default function HomePage() {
  return (
    <div className="space-y-20 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO SECTION */}
      <section className="max-w-4xl mx-auto text-center space-y-5 pt-4">
        <div className="flex justify-center mb-1">
          <Logo type="icon" height={52} />
        </div>
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
            Explore Sample Dossier
          </a>
        </div>
      </section>

      {/* 2. THE SOLUTION & PROBLEM SOLVED (40% Use Case Quality) */}
      <section className="border border-base-800 rounded-xl bg-base-900/60 p-6 sm:p-8 space-y-6">
        <div className="max-w-3xl space-y-2">
          <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-brand-light border border-brand/40 bg-brand-surface px-1.5 py-0.5 rounded">
            The Problem & The Solution We Sell
          </span>
          <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
            MiniPay Developers Spend Days Manually Auditing Guidelines. DocketRail Solves It in Minutes.
          </h2>
          <p className="text-xs sm:text-sm text-base-300 leading-relaxed">
            Building a functional mini-app on Celo is only half the battle. Getting accepted into the official MiniPay Directory requires painstaking manual preparation of technical evidence that frequently costs solo builders and teams 10 to 20 hours of tedious busywork.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {/* What costs them now */}
          <div className="border border-base-800 rounded-lg p-5 bg-base-950 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <h3 className="font-bold text-sm text-white">
                The Manual Burden Today (What It Costs Them)
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-base-400">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold shrink-0">✕</span>
                <span><strong>Network Origin Hunting:</strong> Opening browser devtools tab-by-tab to document every external API, WebSocket, and analytics endpoint required by MiniPay intake guidelines.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold shrink-0">✕</span>
                <span><strong>Manual Responsive QA:</strong> Taking screenshots at exact 360×640 viewports and checking for horizontal scroll overflow or clipped buttons.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold shrink-0">✕</span>
                <span><strong>Fragmented On-Chain Proofs:</strong> Searching block explorers for contract addresses, verified source code links, and successful transaction receipts.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold shrink-0">✕</span>
                <span><strong>High Rejection Risk:</strong> Rejections from subtle unhandled console errors or dead support/terms URLs that delay production launch by weeks.</span>
              </li>
            </ul>
          </div>

          {/* What changed with DocketRail */}
          <div className="border border-brand/40 rounded-lg p-5 bg-brand-surface/60 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-light" />
              <h3 className="font-bold text-sm text-white">
                What Changed with DocketRail (The Automated Solution)
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-base-300">
              <li className="flex items-start gap-2">
                <span className="text-brand-light font-bold shrink-0">✓</span>
                <span><strong>Automated Bounded Inspection:</strong> Headless Playwright runs in an ephemeral VM to trace all runtime network traffic and test viewports in parallel.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-light font-bold shrink-0">✓</span>
                <span><strong>Deterministic Evaluation:</strong> Evaluates 8 canonical MiniPay standards with zero hallucinations, outputting actionable missing-item lists.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-light font-bold shrink-0">✓</span>
                <span><strong>Offline-Ready Review Dossier:</strong> Generates a tamper-evident ZIP containing Markdown summaries, formula-injection-defended CSVs, and SHA-256 indices.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-light font-bold shrink-0">✓</span>
                <span><strong>Zero Crypto Complexity for Builders:</strong> The developer does NOT need to understand Celo gas, x402 protocol, or RPCs. They simply review the findings.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. 3D INTERACTIVE PIPELINE DIAGRAM */}
      <section>
        <PipelineDiagram3D />
      </section>

      {/* 4. HACKATHON JUDGING CRITERIA MATRIX */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-amber-300 border border-amber-500/30 bg-amber-950/40 px-2 py-0.5 rounded">
            Build with buy • Hackathon Alignment
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Engineered Specifically to Score Maximum Judging Rubric Points
          </h2>
          <p className="text-xs sm:text-sm text-base-400">
            How DocketRail maps directly to the official 40% / 35% / 25% evaluation criteria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Criteria 1: Use Case 40% */}
          <div className="border border-base-800 rounded-lg p-5 bg-base-900/60 space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950/60 border border-sky-800 px-2 py-0.5 rounded">
                  40% WEIGHT
                </span>
                <Clock className="w-4 h-4 text-sky-400" />
              </div>
              <h3 className="font-bold text-base text-white">
                Use Case Quality & Problem Solved
              </h3>
              <p className="text-xs text-base-300 leading-relaxed">
                Solves a concrete, painful task that MiniPay developers do today. Replaces 10–20 hours of manual auditing with a deterministic pipeline.
              </p>
            </div>

            <div className="pt-3 border-t border-base-800 text-[11px] text-base-400 space-y-1 font-mono">
              <div>• <strong>Real User:</strong> MiniPay App Builders</div>
              <div>• <strong>What Changed:</strong> Days of QA → Minutes</div>
              <div>• <strong>No Crypto Burden:</strong> x402 handled in bg</div>
              <div>• <strong>Deliverable:</strong> Tamper-evident ZIP pack</div>
            </div>
          </div>

          {/* Criteria 2: Integration Depth 35% */}
          <div className="border border-base-800 rounded-lg p-5 bg-base-900/60 space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                  35% WEIGHT
                </span>
                <Cpu className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="font-bold text-base text-white">
                Depth of the Integration
              </h3>
              <p className="text-xs text-base-300 leading-relaxed">
                Core product consumes 3 distinct x402 services via Celo Buy client. Verified paid calls on Celo Mainnet (Chain ID 42220) drive real user flows.
              </p>
            </div>

            <div className="pt-3 border-t border-base-800 text-[11px] text-base-400 space-y-1 font-mono">
              <div>• <strong>x402 VM:</strong> usebuy.ai/google/vm</div>
              <div>• <strong>x402 RPC:</strong> Chainstack Celo batch</div>
              <div>• <strong>x402 LLM:</strong> Cencori synthesis</div>
              <div>• <strong>Strict Budget:</strong> $1.00 hard atomic cap</div>
            </div>
          </div>

          {/* Criteria 3: Demand Created 25% */}
          <div className="border border-base-800 rounded-lg p-5 bg-base-900/60 space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded">
                  25% WEIGHT
                </span>
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="font-bold text-base text-white">
                Demand Created for Agents
              </h3>
              <p className="text-xs text-base-300 leading-relaxed">
                Every MiniPay submission audit creates recurring paid counterparties and on-chain transactions on Celo Mainnet for the compute and AI agents consumed.
              </p>
            </div>

            <div className="pt-3 border-t border-base-800 text-[11px] text-base-400 space-y-1 font-mono">
              <div>• <strong>New Counterparties:</strong> MiniPay builders</div>
              <div>• <strong>Recurring Volume:</strong> Per-audit paid calls</div>
              <div>• <strong>On-Chain Proofs:</strong> Verifiable tx receipts</div>
              <div>• <strong>Sustainable:</strong> $0.08–$0.12 per full run</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ARCHITECTURAL BOUNDARIES MATRIX */}
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

      {/* 6. INTERACTIVE SAMPLE DOSSIER EXPLORER */}
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
              Start Inspection Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
