import React from "react";
import Link from "next/link";
import { Plus, Terminal, ExternalLink, Calendar, ArrowRight } from "lucide-react";
import { SAMPLE_PROJECT, SAMPLE_RUN } from "@/lib/sample-data";

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border-dim">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-content-primary tracking-tight">
            Target Projects
          </h1>
          <p className="text-xs text-content-muted mt-0.5">
            Registered MiniPay applications and inspection runs under review.
          </p>
        </div>

        <Link
          href="/projects/new"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-lime text-canvas-deep hover:bg-lime-light transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>New Target</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Active Project Card */}
        <div className="md:col-span-2 border border-border-dim rounded-lg p-5 bg-canvas-panel space-y-3.5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-canvas-deep text-content-secondary border border-border-dim">
                  {SAMPLE_PROJECT.submissionStage}
                </span>
                <span className="font-mono text-[11px] text-content-dim">
                  {SAMPLE_PROJECT.id}
                </span>
              </div>
              <h2 className="font-semibold text-base text-content-primary">
                <Link
                  href={`/projects/${SAMPLE_PROJECT.id}/runs/${SAMPLE_RUN.id}`}
                  className="hover:text-lime transition-colors"
                >
                  {SAMPLE_PROJECT.displayName}
                </Link>
              </h2>
            </div>

            <Link
              href={`/projects/${SAMPLE_PROJECT.id}/runs/${SAMPLE_RUN.id}`}
              className="p-1.5 rounded border border-border-dim text-content-muted hover:text-content-primary hover:bg-canvas-panel-hover transition-colors"
              title="Open Review Workspace"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-1 font-mono text-xs text-content-muted">
            <div>
              <span className="text-content-dim font-sans">URL: </span>
              <span className="text-content-secondary">{SAMPLE_PROJECT.applicationUrl}</span>
            </div>
            {SAMPLE_PROJECT.repoUrl && (
              <div>
                <span className="text-content-dim font-sans">Repo: </span>
                <span className="text-content-secondary">{SAMPLE_PROJECT.repoUrl}</span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-border-dim flex items-center justify-between text-xs text-content-muted">
            <span className="flex items-center gap-1.5 font-mono text-[11px]">
              <Calendar className="w-3 h-3 text-content-dim" />
              Latest State: <strong className="text-amber-300 font-semibold">{SAMPLE_RUN.state}</strong>
            </span>
            <Link
              href={`/projects/${SAMPLE_PROJECT.id}/runs/${SAMPLE_RUN.id}`}
              className="text-lime hover:underline text-xs font-semibold inline-flex items-center gap-1"
            >
              <span>Open Dossier</span>
              <ArrowRight className="w-3 h-3 stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* Local Runner Status Card */}
        <div className="border border-border-dim rounded-lg p-5 bg-canvas-panel/60 flex flex-col justify-between space-y-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-content-primary text-xs font-semibold">
              <Terminal className="w-3.5 h-3.5 text-lime" />
              <span>Runner Coordination</span>
            </div>
            <p className="text-xs text-content-muted leading-relaxed">
              Paid execution runs and quote authorizations execute via your local runner CLI on your computer.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/runner/pair"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-canvas-panel hover:bg-canvas-panel-hover text-content-secondary border border-border-dim transition-colors"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Pair Device</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
