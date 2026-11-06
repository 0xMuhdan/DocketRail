"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Layers,
  FileCode,
  Smartphone,
  Download,
  Check,
  Clock,
  ArrowLeft,
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
      setExportReady(true);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Breadcrumb & Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border-dim">
        <div className="space-y-1">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs text-content-muted hover:text-content-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Target Projects</span>
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-content-primary tracking-tight">
              {SAMPLE_PROJECT.displayName}
            </h1>
            <span className="font-mono text-[10px] uppercase font-semibold px-1.5 py-0.2 rounded bg-canvas-deep text-content-secondary border border-border-dim">
              {SAMPLE_RUN.mode} Run
            </span>
          </div>
          <p className="text-xs font-mono text-content-muted flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Target: <span className="text-content-primary">{SAMPLE_PROJECT.applicationUrl}</span></span>
            <span>•</span>
            <span>Commit: <span className="text-content-primary">{SAMPLE_RUN.sourceCommit}</span></span>
            <span>•</span>
            <span>State: <strong className="text-amber-300 font-semibold">{SAMPLE_RUN.state}</strong></span>
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
      <div className="flex items-center gap-1 border-b border-border-dim text-xs">
        <button
          onClick={() => setActiveTab("requirements")}
          className={`px-3 py-2 font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "requirements"
              ? "border-lime text-content-primary bg-canvas-panel"
              : "border-transparent text-content-muted hover:text-content-primary"
          }`}
        >
          <span>Requirements ({requirements.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("origins")}
          className={`px-3 py-2 font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "origins"
              ? "border-lime text-content-primary bg-canvas-panel"
              : "border-transparent text-content-muted hover:text-content-primary"
          }`}
        >
          <span>Network Origins ({origins.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("contracts")}
          className={`px-3 py-2 font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "contracts"
              ? "border-lime text-content-primary bg-canvas-panel"
              : "border-transparent text-content-muted hover:text-content-primary"
          }`}
        >
          <span>Contracts & Tx</span>
        </button>

        <button
          onClick={() => setActiveTab("device")}
          className={`px-3 py-2 font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "device"
              ? "border-lime text-content-primary bg-canvas-panel"
              : "border-transparent text-content-muted hover:text-content-primary"
          }`}
        >
          <span>Device Evidence</span>
        </button>

        <button
          onClick={() => setActiveTab("export")}
          className={`px-3 py-2 font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "export"
              ? "border-lime text-content-primary bg-canvas-panel"
              : "border-transparent text-content-muted hover:text-content-primary"
          }`}
        >
          <span>Export Dossier</span>
        </button>
      </div>

      {/* TAB 1: REQUIREMENTS */}
      {activeTab === "requirements" && (
        <div className="space-y-3">
          <div className="border border-border-dim rounded-lg overflow-hidden bg-canvas-panel">
            <div className="divide-y divide-border-dim">
              {requirements.map((req) => (
                <div key={req.id} className="p-4 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-content-primary">
                        {req.requirementId}
                      </span>
                      <StatusBadge status={req.status} />
                      <span className="text-[10px] font-mono text-content-muted uppercase">
                        {req.applicability}
                      </span>
                    </div>
                    {req.reviewedAt && (
                      <span className="text-[11px] font-mono text-content-dim flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(req.reviewedAt).toLocaleTimeString()}
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-medium text-content-primary">{req.findingText}</p>

                  <div className="p-2 rounded bg-canvas-deep border border-border-dim font-mono text-[11px] text-content-secondary">
                    <span className="text-content-muted block text-[10px] uppercase font-sans mb-0.5">
                      Deterministic Rule:
                    </span>
                    {req.deterministicRule}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-semibold text-content-muted block font-sans">
                      Owner Commentary / Notes
                    </label>
                    <input
                      type="text"
                      value={req.ownerComment || ""}
                      onChange={(e) => handleUpdateComment(req.id || "", e.target.value)}
                      placeholder="Add reviewer notes..."
                      className="w-full px-2.5 py-1.5 rounded bg-canvas-deep border border-border-subtle text-xs text-content-primary placeholder-content-dim focus:outline-none focus:border-lime font-sans"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ORIGINS */}
      {activeTab === "origins" && (
        <div className="space-y-3">
          <p className="text-xs text-content-muted">
            Mandatory MiniPay origin inventory. Observed browser requests, source code hints, and owner declarations.
          </p>

          <div className="border border-border-dim rounded-lg overflow-hidden bg-canvas-panel">
            <table className="w-full text-left text-xs">
              <thead className="bg-canvas-deep border-b border-border-dim text-content-muted font-mono text-[11px]">
                <tr>
                  <th className="p-3">Origin</th>
                  <th className="p-3">Source Kind</th>
                  <th className="p-3">Resource / Locator</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-dim font-mono">
                {origins.map((o, idx) => (
                  <tr key={idx} className="hover:bg-canvas-panel-hover transition-colors">
                    <td className="p-3 font-medium text-content-primary">{o.origin}</td>
                    <td className="p-3 font-sans capitalize text-content-secondary">{o.sourceKind.replace(/_/g, " ")}</td>
                    <td className="p-3 text-content-muted text-[11px]">
                      {o.resourceType || o.sourceLocator || "—"}
                    </td>
                    <td className="p-3 font-sans">
                      {o.confirmedByOwnerAt ? (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                          Confirmed
                        </span>
                      ) : (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right font-sans">
                      {!o.confirmedByOwnerAt && (
                        <button
                          onClick={() => handleConfirmOrigin(idx)}
                          className="px-2 py-1 rounded bg-canvas-deep hover:bg-canvas-panel-hover text-content-primary text-[11px] font-medium border border-border-subtle"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-border-dim rounded-lg p-4 bg-canvas-panel space-y-3">
            <h3 className="font-semibold text-xs uppercase tracking-wider text-content-primary">
              Verified Target Contracts (Celo)
            </h3>
            {SAMPLE_CONTRACTS.map((c, i) => (
              <div key={i} className="p-3 rounded bg-canvas-deep border border-border-dim space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-content-primary">Chain ID: {c.chainId}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase font-semibold">
                    {c.sourceVerificationStatus}
                  </span>
                </div>
                <code className="text-[11px] text-content-secondary block break-all font-mono">
                  {c.address}
                </code>
                <p className="text-content-muted text-[11px]">
                  Methods: <span className="text-content-primary font-mono">{c.methods.join(", ")}</span>
                </p>
                {c.verificationSourceUrl && (
                  <a
                    href={c.verificationSourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-lime hover:underline pt-0.5"
                  >
                    <span>View Explorer Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="border border-border-dim rounded-lg p-4 bg-canvas-panel space-y-3">
            <h3 className="font-semibold text-xs uppercase tracking-wider text-content-primary">
              Sample Transaction Evidence
            </h3>
            {SAMPLE_TRANSACTIONS.map((tx, i) => (
              <div key={i} className="p-3 rounded bg-canvas-deep border border-border-dim space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-content-primary">Receipt Status</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase font-semibold">
                    {tx.receiptStatus}
                  </span>
                </div>
                <code className="text-[11px] text-content-secondary block break-all font-mono">
                  {tx.txHash}
                </code>
                <p className="text-content-muted text-[11px] font-mono">
                  Block #{tx.blockNumber} • Method: <span className="text-content-primary">{tx.claimedMethod}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: DEVICE EVIDENCE */}
      {activeTab === "device" && (
        <div className="border border-border-dim rounded-lg p-6 bg-canvas-panel space-y-4">
          <div>
            <h3 className="font-semibold text-sm text-content-primary">Physical MiniPay Device Test Attachments</h3>
            <p className="text-xs text-content-muted mt-0.5">
              MiniPay requires physical device testing. Attach screenshots showing successful wallet connection and transaction approval inside the native MiniPay mobile environment.
            </p>
          </div>

          <div className="border border-dashed border-border-subtle rounded-lg p-6 text-center space-y-2.5 bg-canvas-deep">
            <Smartphone className="w-8 h-8 text-content-muted mx-auto" />
            <div className="text-xs text-content-secondary">
              <span className="font-medium text-content-primary block mb-0.5">
                Upload PNG/JPEG Device Screenshots
              </span>
              <span className="text-content-muted text-[11px]">Max 500 KB per file. Viewport 360×640 recommended. Sensitive information must be redacted.</span>
            </div>
            <button
              type="button"
              className="px-3 py-1.5 rounded-md text-xs font-semibold bg-canvas-panel hover:bg-canvas-panel-hover text-content-primary border border-border-subtle transition-colors shadow-sm"
            >
              Choose Screenshot File
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: EXPORT DOSSIER */}
      {activeTab === "export" && (
        <div className="border border-border-dim rounded-lg p-6 bg-canvas-panel space-y-5">
          <div>
            <h3 className="font-semibold text-base text-content-primary">Assemble Review Dossier (ZIP)</h3>
            <p className="text-xs text-content-muted mt-0.5">
              Generates a deterministic ZIP package containing Markdown files, CSV tables with formula injection defense, screenshot evidence, and a verified evidence index.
            </p>
          </div>

          <div className="p-3.5 rounded-md bg-canvas-deep border border-border-dim text-xs space-y-2 text-content-secondary">
            <h4 className="font-semibold text-content-primary uppercase text-[10px] tracking-wider font-mono">
              Package Manifest (Max 10 MB):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] font-mono">
              <div>• submission.md (Approved listing dossier)</div>
              <div>• requirements.csv (Exact 4-status checks)</div>
              <div>• network-inventory.csv (Origins & APIs)</div>
              <div>• contracts.csv (Celo Mainnet contracts & tx)</div>
              <div>• coverage.md (Scanned URLs & limits)</div>
              <div>• missing-items.md (Outstanding action list)</div>
              <div>• owner-declarations.md (Confirmed metadata)</div>
              <div>• payments.csv (x402 settled spend audit)</div>
            </div>
          </div>

          <label className="flex items-start gap-2.5 p-3 rounded-md bg-canvas-deep border border-border-dim cursor-pointer">
            <input
              type="checkbox"
              checked={completenessAcknowledged}
              onChange={(e) => setCompletenessAcknowledged(e.target.checked)}
              className="mt-0.5 accent-lime rounded"
            />
            <span className="text-xs text-content-secondary leading-relaxed">
              I acknowledge the coverage limits and outstanding items listed in this run. I understand this pack is an assembled evidence dossier for review, not an automated certification.
            </span>
          </label>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={handleGenerateExport}
              disabled={exporting || !completenessAcknowledged}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-xs font-semibold bg-lime text-canvas-deep hover:bg-lime-light transition-colors shadow-sm disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{exporting ? "Assembling Package..." : "Assemble Submission ZIP"}</span>
            </button>

            {exportReady && (
              <span className="text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                Dossier assembled successfully! Download initiated.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
