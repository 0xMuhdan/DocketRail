"use client";

import React, { useState } from "react";
import {
  Globe,
  Terminal,
  Cpu,
  Layers,
  FileCheck2,
  Coins,
  CheckCircle2,
  Rotate3d,
  ArrowRight,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

interface PipelineStage {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  x402Service?: string;
  costEstimate?: string;
  badge: string;
  description: string;
  inputs: string[];
  outputs: string[];
  judgingCategory: "Use Case (40%)" | "Integration Depth (35%)" | "Demand Created (25%)";
  color: string;
}

const STAGES: PipelineStage[] = [
  {
    id: 1,
    icon: Globe,
    title: "1. Ingestion & Plan",
    subtitle: "Public Endpoint & Routes Parsing",
    badge: "Control Plane",
    description:
      "Developer enters their public HTTPS MiniPay app URL. DocketRail parses routes and proposes a safe, bounded navigation plan (max 3 flows, 10 pages, 360×640 mobile viewport) without executing arbitrary user code.",
    inputs: ["Public HTTPS Endpoint", "GitHub Repository (optional)", "Submission Stage (Intake / Readiness)"],
    outputs: ["Bounded Run Plan (max 15 steps)", "Normalized Plan Digest (SHA-256)", "Applicability Rules Matrix"],
    judgingCategory: "Use Case (40%)",
    color: "#38bdf8",
  },
  {
    id: 2,
    icon: Terminal,
    title: "2. Pairing & Consent",
    subtitle: "Local Keychain & x402 Approval",
    badge: "Non-Custodial",
    description:
      "Runner pairs with web control plane via an 8-character verification code. Before any x402 paid call executes, the runner prompts the developer in terminal with the exact quote, token, and a 2-minute timeout. No private keys ever leave the local machine.",
    inputs: ["Local 32-byte Verifier Hash", "Provider x402 Quote", "Terminal Interactive Prompt [y/N]"],
    outputs: ["Atomic Budget Reservation ($1.00 hard cap)", "Signed Dispatch Capability", "Local Attempt Journal"],
    judgingCategory: "Use Case (40%)",
    color: "#34d399",
  },
  {
    id: 3,
    icon: Cpu,
    title: "3. Ephemeral Buy VM",
    subtitle: "order-compute Debian Sandbox",
    x402Service: "usebuy.ai/google/vm (x402)",
    costEstimate: "$0.067011 USD / lease",
    badge: "x402 Core Compute",
    description:
      "Consumes Celo Buy x402 gateway to order a short-lived Debian VM. A trusted, immutable scanner bundle runs headless Playwright in strict sandbox mode behind an SSRF firewall blocking private and cloud metadata networks.",
    inputs: ["4 KiB Bootstrap Payload", "Scan Config Capability Token", "Fenced Execution Lease"],
    outputs: ["360×640 PNG Viewport Captures", "Runtime Network Request Intercepts", "Console Diagnostic Traces"],
    judgingCategory: "Integration Depth (35%)",
    color: "#b6c961",
  },
  {
    id: 4,
    icon: Layers,
    title: "4. Multi-Agent Synthesis",
    subtitle: "Chainstack RPC & Cencori LLM",
    x402Service: "gateway.usebuy.ai (Cencori & Chainstack)",
    costEstimate: "$0.01 Cencori + $0.01 RPC",
    badge: "x402 AI & RPC",
    description:
      "Discovers and catalogs external network origins. Calls Chainstack Celo RPC on-chain to verify smart contracts and receipts on Celo Mainnet (42220). Cencori LLM generates structured finding text strictly anchored to deterministic facts.",
    inputs: ["Observed Network Endpoints", "Celo Contract & Tx Hashes", "Raw Evaluator Metrics"],
    outputs: ["8 Canonical Requirement Results", "Verified Celo Mainnet Receipts", "Confirmed Network Origins Inventory"],
    judgingCategory: "Demand Created (25%)",
    color: "#facc15",
  },
  {
    id: 5,
    icon: FileCheck2,
    title: "5. Submission Pack",
    subtitle: "Deterministic Offline ZIP",
    badge: "Final Deliverable",
    description:
      "Assembles human-confirmed listing metadata, CSV tables with formula injection defense, an actionable missing-items list, and a tamper-evident SHA-256 evidence index into an offline-ready ZIP dossier (≤ 10 MB) ready for MiniPay reviewers.",
    inputs: ["Owner Declarations", "Physical Device Attachments", "Verified Evidence Artifacts"],
    outputs: ["submission.md", "requirements.csv", "network-inventory.csv", "missing-items.md", "evidence-index.json"],
    judgingCategory: "Use Case (40%)",
    color: "#22d3ee",
  },
];

export function PipelineDiagram3D() {
  const [selectedStage, setSelectedStage] = useState<number>(3);
  const [is3DView, setIs3DView] = useState<boolean>(true);

  const active = STAGES.find((s) => s.id === selectedStage) || STAGES[0];
  const ActiveIcon = active.icon;

  return (
    <div id="pipeline-3d" className="space-y-6 scroll-mt-20">
      {/* Header with 3D Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-lime border border-lime-border bg-lime-surface px-1.5 py-0.5 rounded">
              Interactive 3D Pipeline
            </span>
            <span className="text-xs text-content-muted font-mono">
              Click any stage to inspect execution details
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-content-primary tracking-tight mt-1">
            End-to-End Autonomous Audit Pipeline
          </h3>
        </div>

        <button
          type="button"
          onClick={() => setIs3DView(!is3DView)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium bg-canvas-panel hover:bg-canvas-panel-hover text-content-secondary border border-border-dim transition-colors self-start sm:self-auto shrink-0"
        >
          <Rotate3d className="w-3.5 h-3.5 text-lime" />
          <span>{is3DView ? "Switch to Flat View" : "Switch to 3D Isometric View"}</span>
        </button>
      </div>

      {/* 3D Rail Track Stage Canvas */}
      <div className="relative border border-border-dim rounded-xl bg-canvas-deep p-6 sm:p-8 overflow-hidden min-h-[380px] flex flex-col justify-center">
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="rail-grid" width="36" height="36" patternUnits="userSpaceOnUse">
                <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#b6c961" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rail-grid)" />
          </svg>
        </div>

        {/* 3D Perspective Stage Container */}
        <div
          className={`relative z-10 transition-all duration-700 ease-out ${
            is3DView
              ? "[transform:perspective(1100px)_rotateX(18deg)_rotateY(-1deg)] py-4"
              : "py-2"
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Central Connecting Rail Bar */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-sky-500/30 via-lime/50 to-cyan-500/30 -translate-y-1/2 rounded-full z-0" />

          {/* Isometric Pipeline Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 relative z-10">
            {STAGES.map((stage) => {
              const isSelected = stage.id === selectedStage;
              const StageIcon = stage.icon;

              return (
                <div
                  key={stage.id}
                  onClick={() => setSelectedStage(stage.id)}
                  style={{
                    transform: is3DView
                      ? isSelected
                        ? "translateZ(30px) translateY(-8px)"
                        : "translateZ(0px)"
                      : "none",
                    transformStyle: "preserve-3d",
                  }}
                  className={`group cursor-pointer rounded-lg p-3.5 transition-all duration-300 border text-left flex flex-col justify-between min-h-[170px] relative ${
                    isSelected
                      ? "bg-canvas-panel border-lime ring-1 ring-lime/50 shadow-lg"
                      : "bg-canvas-panel/60 border-border-dim hover:border-border-subtle hover:bg-canvas-panel"
                  }`}
                >
                  {/* Top Badge & Number */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider"
                      style={{
                        backgroundColor: `${stage.color}15`,
                        color: stage.color,
                        border: `1px solid ${stage.color}35`,
                      }}
                    >
                      {stage.badge}
                    </span>
                    <span className="font-mono text-[11px] text-content-dim font-bold">
                      0{stage.id}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-1.5 my-auto">
                    <div
                      className="w-7 h-7 rounded flex items-center justify-center mb-1 transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: `${stage.color}18`,
                        color: stage.color,
                      }}
                    >
                      <StageIcon className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <h4 className="font-bold text-content-primary text-xs leading-snug">
                      {stage.title}
                    </h4>
                    <p className="text-[11px] text-content-muted line-clamp-2 leading-relaxed font-sans">
                      {stage.subtitle}
                    </p>
                  </div>

                  {/* Bottom x402 badge if applicable */}
                  <div className="mt-2.5 pt-2 border-t border-border-dim flex items-center justify-between text-[10px]">
                    {stage.x402Service ? (
                      <span className="font-mono text-amber-300 font-semibold flex items-center gap-1">
                        <Coins className="w-3 h-3 text-amber-400 shrink-0" />
                        <span>x402 Call</span>
                      </span>
                    ) : (
                      <span className="text-content-dim font-sans">Deterministic</span>
                    )}
                    <span
                      className={`w-2 h-2 rounded-full transition-colors ${
                        isSelected ? "bg-lime" : "bg-border-subtle"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Stage Detail Panel */}
      <div className="border border-border-dim rounded-lg bg-canvas-panel p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border-dim">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-lime">
                STAGE {active.id} OF 5
              </span>
              <span
                className="font-mono text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-wider"
                style={{
                  backgroundColor: `${active.color}18`,
                  color: active.color,
                  border: `1px solid ${active.color}40`,
                }}
              >
                {active.badge}
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-content-primary tracking-tight flex items-center gap-2">
              <ActiveIcon className="w-4 h-4 text-lime shrink-0" />
              <span>{active.title}: {active.subtitle}</span>
            </h4>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] uppercase font-semibold text-content-muted block font-mono">
              Judging Rubric Target:
            </span>
            <span className="text-xs font-semibold text-content-primary px-2 py-0.5 rounded bg-canvas-elevated border border-border-subtle inline-block mt-0.5">
              {active.judgingCategory}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
          {active.description}
        </p>

        {active.x402Service && (
          <div className="p-3 rounded bg-canvas-deep border border-border-dim font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-content-muted block text-[10px] uppercase font-sans font-semibold">
                Consumed x402 Service & Method:
              </span>
              <span className="text-amber-300 font-bold">{active.x402Service}</span>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-content-muted block text-[10px] uppercase font-sans font-semibold">
                Verified Spend:
              </span>
              <span className="text-emerald-400 font-bold">{active.costEstimate}</span>
            </div>
          </div>
        )}

        {/* Inbound vs Outbound Data Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="p-3 rounded bg-canvas-deep border border-border-dim space-y-1.5 text-xs">
            <span className="text-[11px] uppercase font-semibold text-content-muted block font-mono">
              Inbound Data Flow:
            </span>
            <ul className="space-y-1 text-content-secondary font-mono text-[11px]">
              {active.inputs.map((inp, idx) => (
                <li key={idx} className="flex items-center gap-1.5 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-border-highlight shrink-0" />
                  <span>{inp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 rounded bg-canvas-deep border border-border-dim space-y-1.5 text-xs">
            <span className="text-[11px] uppercase font-semibold text-lime block font-mono">
              Traceable Deliverables Generated:
            </span>
            <ul className="space-y-1 text-content-primary text-[11px]">
              {active.outputs.map((out, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-lime shrink-0" />
                  <span>{out}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
