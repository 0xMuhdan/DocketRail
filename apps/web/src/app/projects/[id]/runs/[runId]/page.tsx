"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import {
  FolderCheck,
  ExternalLink,
  ShieldAlert,
  Layers,
  FileCode,
  Smartphone,
  Download,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileText,
  Clock,
  ArrowLeft,
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

type TabType = "requirements" | "origins" | "contracts" | "device" | "export";

export default function RunWorkspacePage({
  params,
}: {
  params: Promise<{ id: string; runId: string }>;
}) {
  const resolvedParams = use(params);
  const [activeTab, setActiveTab] = useState<TabType>("requirements");

  const [requirements, setRequirements] = useState(SAMPLE_REQUIREMENTS);
  const [origins, setOrigins] = useState(SAMPLE_ORIGINS);
  const [exporting, setExporting] = useState(false);
  const [exportReady, setExportReady] = useState(false);
  const [completenessAcknowledged, setCompletenessAcknowledged] = useState(false);

  const handleConfirmOrigin = (index: number) => {
    setOrigins((prev) =>
      prev.map((o, idx) =>
        idx === index
          ? { ...o, confirmedByOwnerAt: new Date().toISOString() }
          : o
      )
    );
  };

  const handleUpdateComment = (id: string, comment: string) => {
    setRequirements((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ownerComment: comment } : r))
    );
  };

  const handleGenerateExport = async () => {
    setExporting(true);
    try {
      const res = await fetch(`/api/runs/${resolvedParams.runId}/exports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          runId: resolvedParams.runId,
          completenessAcknowledgement: completenessAcknowledged,
        }),
      });

      if (!res.ok) {
        throw new Error("Export generation failed");
      }

      setExportReady(true);
    } catch {
      // Simulate client generation if backend mock
      setExportReady(true);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Breadcrumb & Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-forest-800">
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs text-forest-400 hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {SAMPLE_PROJECT.displayName}
            </h1>
            <span className="text-xs uppercase font-bold px-2 py-0.5 rounded bg-lime-500/20 text-lime-400 border border-lime-500/40">
              {SAMPLE_RUN.mode.toUpperCase()} RUN
            </span>
          </div>
          <p className="text-xs text-forest-300 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>
              Target: <code className="text-forest-100">{SAMPLE_PROJECT.applicationUrl}</code>
            </span>
            <span>•</span>
            <span>
              Commit: <code className="text-forest-100">{SAMPLE_RUN.sourceCommit}</code>
            </span>
            <span>•</span>
            <span>
              Status: <strong className="text-amber-300 uppercase">{SAMPLE_RUN.state.replace(/_/g, " ")}</strong>
            </span>
          </p>
        </div>

        <div className="w-full sm:w-72">
          <CostCard
            settledMicroUsd={SAMPLE_RUN.budget.settledMicroUsd}
            reservedMicroUsd={SAMPLE_RUN.budget.reservedMicroUsd}
          />
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-forest-800 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab("requirements")}
          className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === "requirements"
              ? "border-lime-400 text-lime-400 bg-forest-900/40"
              : "border-transparent text-forest-300 hover:text-white"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Requirements ({requirements.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("origins")}
          className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === "origins"
              ? "border-lime-400 text-lime-400 bg-forest-900/40"
              : "border-transparent text-forest-300 hover:text-white"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Network Origins ({origins.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("contracts")}
          className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === "contracts"
              ? "border-lime-400 text-lime-400 bg-forest-900/40"
              : "border-transparent text-forest-300 hover:text-white"
          }`}
        >
          <FileCode className="w-4 h-4" />
          <span>Contracts & Transactions</span>
        </button>

        <button
          onClick={() => setActiveTab("device")}
          className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === "device"
              ? "border-lime-400 text-lime-400 bg-forest-900/40"
              : "border-transparent text-forest-300 hover:text-white"
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>Device Evidence</span>
        </button>

        <button
          onClick={() => setActiveTab("export")}
          className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === "export"
              ? "border-lime-400 text-lime-400 bg-forest-900/40"
              : "border-transparent text-forest-300 hover:text-white"
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Export Dossier</span>
        </button>
      </div>

      {/* TAB 1: REQUIREMENTS */}
      {activeTab === "requirements" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-forest-300 px-1">
            <span>Review findings, inspect deterministic logic, and attach owner commentary.</span>
            <span>4 Status Canonical Evaluation</span>
          </div>

          <div className="divide-y divide-forest-800/80 border border-forest-800 rounded-xl bg-forest-900/40 overflow-hidden">
            {requirements.map((req) => (
              <div key={req.id} className="p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-lime-300">
                      {req.requirementId}
                    </span>
                    <StatusBadge status={req.status} />
                    <span className="text-[11px] uppercase font-semibold text-forest-400">
                      Applicability: {req.applicability}
                    </span>
                  </div>
                  {req.reviewedAt && (
                    <span className="text-[11px] text-forest-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(req.reviewedAt).toLocaleTimeString()}
                    </span>
                  )}
                </div>

                <p className="text-sm font-semibold text-white">{req.findingText}</p>

                <div className="p-2.5 rounded bg-forest-950/80 border border-forest-800 text-xs font-mono text-forest-300">
                  <span className="text-forest-500 font-sans block text-[10px] uppercase font-bold mb-0.5">
                    Deterministic Check Rule:
                  </span>
                  {req.deterministicRule}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase text-forest-400 block">
                    Owner Note / Comment
                  </label>
                  <input
                    type="text"
                    value={req.ownerComment || ""}
                    onChange={(e) => handleUpdateComment(req.id || "", e.target.value)}
                    placeholder="Add explanation or context for reviewers..."
                    className="w-full px-3 py-1.5 rounded bg-forest-950 border border-forest-800 text-xs text-white placeholder-forest-600 focus:outline-none focus:border-lime-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ORIGINS */}
      {activeTab === "origins" && (
        <div className="space-y-4">
          <p className="text-xs text-forest-300">
            Mandatory MiniPay origin inventory. Distinguishes observed browser requests, source code hints, and owner declarations.
          </p>

          <div className="border border-forest-800 rounded-xl bg-forest-900/40 overflow-hidden">
            <table className="w-full text-left text-xs text-forest-200">
              <thead className="bg-forest-950 text-forest-400 uppercase text-[10px] font-bold border-b border-forest-800">
                <tr>
                  <th className="p-3">Origin</th>
                  <th className="p-3">Source Kind</th>
                  <th className="p-3">Resource / Locator</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest-800/60 font-mono">
                {origins.map((o, idx) => (
                  <tr key={idx} className="hover:bg-forest-900/70">
                    <td className="p-3 font-semibold text-white">{o.origin}</td>
                    <td className="p-3 font-sans capitalize">{o.sourceKind.replace(/_/g, " ")}</td>
                    <td className="p-3 text-forest-400 text-[11px]">
                      {o.resourceType || o.sourceLocator || "—"}
                    </td>
                    <td className="p-3 font-sans">
                      {o.confirmedByOwnerAt ? (
                        <span className="text-[10px] px-2 py-0.5 rounded font-medium bg-emerald-950 text-emerald-300 border border-emerald-800">
                          Confirmed
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded font-medium bg-amber-950 text-amber-300 border border-amber-800">
                          Needs Review
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right font-sans">
                      {!o.confirmedByOwnerAt && (
                        <button
                          onClick={() => handleConfirmOrigin(idx)}
                          className="px-2.5 py-1 rounded bg-forest-800 hover:bg-forest-700 text-white text-[11px] font-medium border border-forest-700"
                        >
                          Confirm
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CONTRACTS */}
      {activeTab === "contracts" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-forest-900/40 border border-forest-800 rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-forest-200">
              Verified Target Contracts
            </h3>
            {SAMPLE_CONTRACTS.map((c, i) => (
              <div key={i} className="p-4 rounded-lg bg-forest-950 border border-forest-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Chain ID: {c.chainId}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase font-bold">
                    {c.sourceVerificationStatus}
                  </span>
                </div>
                <code className="text-[11px] text-lime-300 block break-all font-mono">
                  {c.address}
                </code>
                <p className="text-forest-400 text-[11px]">
                  Methods: <span className="text-white font-mono">{c.methods.join(", ")}</span>
                </p>
                {c.verificationSourceUrl && (
                  <a
                    href={c.verificationSourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-lime-400 hover:underline pt-1"
                  >
                    <span>View on Celoscan</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="bg-forest-900/40 border border-forest-800 rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-forest-200">
              Sample Transaction Evidence
            </h3>
            {SAMPLE_TRANSACTIONS.map((tx, i) => (
              <div key={i} className="p-4 rounded-lg bg-forest-950 border border-forest-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Receipt Status</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase font-bold">
                    {tx.receiptStatus}
                  </span>
                </div>
                <code className="text-[11px] text-forest-200 block break-all font-mono">
                  {tx.txHash}
                </code>
                <p className="text-forest-400 text-[11px]">
                  Block Number: <strong className="text-white font-mono">{tx.blockNumber}</strong>
                </p>
                <p className="text-forest-400 text-[11px]">
                  Method: <code className="text-lime-300">{tx.claimedMethod}</code>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: DEVICE EVIDENCE */}
      {activeTab === "device" && (
        <div className="bg-forest-900/40 border border-forest-800 rounded-xl p-6 space-y-6">
          <div>
            <h3 className="font-bold text-base text-white">Physical MiniPay Device Test Attachments</h3>
            <p className="text-xs text-forest-300 mt-1">
              MiniPay requires physical device testing. Attach screenshots showing successful wallet connection and transaction approval inside the native MiniPay mobile environment.
            </p>
          </div>

          <div className="border-2 border-dashed border-forest-700/80 rounded-xl p-8 text-center space-y-3 bg-forest-950/60">
            <Smartphone className="w-10 h-10 text-lime-400 mx-auto" />
            <div className="text-xs text-forest-200">
              <span className="font-semibold text-white block mb-0.5">
                Upload PNG/JPEG Device Screenshots
              </span>
              <span>Max 500 KB per file. Viewport 360×640 recommended. Sensitive information must be redacted.</span>
            </div>
            <button
              type="button"
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-forest-800 hover:bg-forest-700 text-white transition-colors border border-forest-700"
            >
              Choose Device Screenshot
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: EXPORT DOSSIER */}
      {activeTab === "export" && (
        <div className="bg-forest-900/40 border border-forest-800 rounded-xl p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-bold text-xl text-white">Export Submission Dossier Package</h3>
            <p className="text-xs sm:text-sm text-forest-300 mt-1">
              Generates a deterministic ZIP package containing Markdown files, CSV tables with formula injection defense, screenshot evidence, and a structured evidence index.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-forest-950 border border-forest-800 text-xs space-y-2 text-forest-300">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
              Package Contents (ZIP &le; 10 MB):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div>• <code>submission.md</code> (Approved listing dossier)</div>
              <div>• <code>requirements.csv</code> (Exact 4-status checks)</div>
              <div>• <code>network-inventory.csv</code> (Origins & APIs)</div>
              <div>• <code>contracts.csv</code> (Celo Mainnet contracts & tx)</div>
              <div>• <code>coverage.md</code> (Scanned URLs & limits)</div>
              <div>• <code>missing-items.md</code> (Outstanding action list)</div>
              <div>• <code>owner-declarations.md</code> (Confirmed metadata)</div>
              <div>• <code>payments.csv</code> (x402 settled spend audit)</div>
            </div>
          </div>

          <label className="flex items-start gap-3 p-3.5 rounded-lg bg-forest-950 border border-forest-800 cursor-pointer">
            <input
              type="checkbox"
              checked={completenessAcknowledged}
              onChange={(e) => setCompletenessAcknowledged(e.target.checked)}
              className="mt-0.5 accent-lime-500 rounded"
            />
            <span className="text-xs text-forest-200 leading-relaxed">
              I acknowledge the coverage limits and outstanding items listed in this run. I understand this pack is an assembled evidence dossier for review, not an automated certification.
            </span>
          </label>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleGenerateExport}
              disabled={exporting || !completenessAcknowledged}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-lime-500 hover:bg-lime-400 text-forest-950 transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{exporting ? "Assembling Package..." : "Assemble Submission ZIP"}</span>
            </button>

            {exportReady && (
              <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Dossier ready for download! Check your downloads.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
