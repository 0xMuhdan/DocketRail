import React from "react";
import Link from "next/link";
import { FolderCheck, PlusCircle, ExternalLink, Calendar, Terminal } from "lucide-react";
import { SAMPLE_PROJECT, SAMPLE_RUN } from "@/lib/sample-data";

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-forest-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Projects Workspace
          </h1>
          <p className="text-sm text-forest-300 mt-1">
            Manage your MiniPay target applications, evidence runs, and submission packs.
          </p>
        </div>

        <Link
          href="/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-lime-500 hover:bg-lime-400 text-forest-950 transition-colors shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Project</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sample / Active Project Card */}
        <div className="bg-forest-900/60 border border-forest-800 rounded-xl p-5 hover:border-forest-700 transition-all space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-lime-500/20 text-lime-400 border border-lime-500/40">
                  {SAMPLE_PROJECT.submissionStage.toUpperCase()}
                </span>
                <span className="text-[10px] font-medium text-forest-400">
                  ID: {SAMPLE_PROJECT.id}
                </span>
              </div>
              <h3 className="font-bold text-lg text-white">
                <Link
                  href={`/projects/${SAMPLE_PROJECT.id}/runs/${SAMPLE_RUN.id}`}
                  className="hover:text-lime-300 transition-colors"
                >
                  {SAMPLE_PROJECT.displayName}
                </Link>
              </h3>
            </div>

            <Link
              href={`/projects/${SAMPLE_PROJECT.id}/runs/${SAMPLE_RUN.id}`}
              className="p-2 rounded-lg bg-forest-800 hover:bg-forest-700 text-forest-200 transition-colors"
              title="Open Workspace"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-1.5 text-xs text-forest-300">
            <div className="flex items-center gap-2">
              <span className="text-forest-400 font-medium">Target URL:</span>
              <code className="text-forest-100">{SAMPLE_PROJECT.applicationUrl}</code>
            </div>
            {SAMPLE_PROJECT.repoUrl && (
              <div className="flex items-center gap-2">
                <span className="text-forest-400 font-medium">Repository:</span>
                <code className="text-forest-100">{SAMPLE_PROJECT.repoUrl}</code>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-forest-800/80 flex items-center justify-between text-xs text-forest-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Run State: <strong className="text-amber-300 uppercase">{SAMPLE_RUN.state.replace(/_/g, " ")}</strong>
            </span>
            <Link
              href={`/projects/${SAMPLE_PROJECT.id}/runs/${SAMPLE_RUN.id}`}
              className="text-lime-400 hover:underline font-medium"
            >
              View Findings →
            </Link>
          </div>
        </div>

        {/* Local Runner Connection Helper */}
        <div className="bg-forest-900/30 border border-forest-800/60 border-dashed rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-forest-200">
              <Terminal className="w-5 h-5 text-lime-400" />
              <h3 className="font-bold text-base text-white">Pair Runner Device</h3>
            </div>
            <p className="text-xs text-forest-300 leading-relaxed">
              Paid execution runs on Celo mainnet compute and local scanner coordination require a paired runner process running in your development environment.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/runner/pair"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-forest-800 hover:bg-forest-700 text-white transition-colors border border-forest-700"
            >
              <span>Pair a New Runner</span>
              <Terminal className="w-3.5 h-3.5 text-forest-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
