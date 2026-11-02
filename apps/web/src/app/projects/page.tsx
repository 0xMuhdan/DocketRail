import React from "react";
import Link from "next/link";
import { Plus, Terminal, ExternalLink, Calendar } from "lucide-react";
import { SAMPLE_PROJECT, SAMPLE_RUN } from "@/lib/sample-data";

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-base-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Target Projects
          </h1>
          <p className="text-xs text-base-400 mt-0.5">
            Registered MiniPay applications and inspection runs under review.
          </p>
        </div>

        <Link
          href="/projects/new"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-brand hover:bg-brand-hover text-white transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Target</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Active Project Card */}
        <div className="md:col-span-2 border border-base-800 rounded-lg p-4 bg-base-900/60 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-base-800 text-base-300 border border-base-700">
                  {SAMPLE_PROJECT.submissionStage}
                </span>
                <span className="font-mono text-[11px] text-base-400">
                  {SAMPLE_PROJECT.id}
                </span>
              </div>
              <h2 className="font-semibold text-base text-white">
                <Link
                  href={`/projects/${SAMPLE_PROJECT.id}/runs/${SAMPLE_RUN.id}`}
                  className="hover:text-base-200 transition-colors"
                >
                  {SAMPLE_PROJECT.displayName}
                </Link>
              </h2>
            </div>

            <Link
              href={`/projects/${SAMPLE_PROJECT.id}/runs/${SAMPLE_RUN.id}`}
              className="p-1.5 rounded border border-base-800 text-base-400 hover:text-white hover:bg-base-850 transition-colors"
              title="Open Review Workspace"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-1 font-mono text-xs text-base-400">
            <div>
              <span className="text-base-500 font-sans">URL: </span>
              <span className="text-base-200">{SAMPLE_PROJECT.applicationUrl}</span>
            </div>
            {SAMPLE_PROJECT.repoUrl && (
              <div>
                <span className="text-base-500 font-sans">Repo: </span>
                <span className="text-base-200">{SAMPLE_PROJECT.repoUrl}</span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-base-850 flex items-center justify-between text-xs text-base-400">
            <span className="flex items-center gap-1.5 font-mono text-[11px]">
              <Calendar className="w-3 h-3 text-base-500" />
              Latest State: <strong className="text-amber-300 font-semibold">{SAMPLE_RUN.state}</strong>
            </span>
            <Link
              href={`/projects/${SAMPLE_PROJECT.id}/runs/${SAMPLE_RUN.id}`}
              className="text-brand-light hover:underline text-xs font-medium"
            >
              Open Dossier →
            </Link>
          </div>
        </div>

        {/* Local Runner Status Card */}
        <div className="border border-base-800 rounded-lg p-4 bg-base-900/30 flex flex-col justify-between space-y-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-white text-xs font-semibold">
              <Terminal className="w-3.5 h-3.5 text-base-400" />
              <span>Runner Coordination</span>
            </div>
            <p className="text-xs text-base-400 leading-relaxed">
              Paid execution runs and quote authorizations execute via your local runner CLI on your computer.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/runner/pair"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-base-850 hover:bg-base-800 text-base-200 border border-base-750 transition-colors"
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
