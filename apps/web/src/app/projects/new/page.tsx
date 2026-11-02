"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldAlert, CheckCircle2, AlertCircle } from "lucide-react";
import { CreateProjectInputSchema } from "@docketrail/contracts";

export default function NewProjectPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [applicationUrl, setApplicationUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [repoSubdir, setRepoSubdir] = useState("");
  const [submissionStage, setSubmissionStage] = useState<"intake" | "readiness">("readiness");
  const [authorizationConsent, setAuthorizationConsent] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = CreateProjectInputSchema.safeParse({
      displayName,
      applicationUrl,
      repoUrl: repoUrl || undefined,
      repoSubdir: repoSubdir || undefined,
      submissionStage,
      authorizationConsent,
    });

    if (!validation.success) {
      setError(validation.error.errors[0]?.message || "Invalid input data");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `Failed to create project (HTTP ${res.status})`);
      }

      const created = await res.json();
      router.push(`/projects/${created.id}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(msg);
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-xs font-medium text-forest-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Projects</span>
      </Link>

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Register Target Project
        </h1>
        <p className="text-sm text-forest-300 mt-1">
          Specify the public HTTPS deployment of your MiniPay app to begin evidence inspection.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-forest-900/60 border border-forest-800 rounded-xl p-6 sm:p-8">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-forest-200 block">
            Project Display Name *
          </label>
          <input
            type="text"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="e.g. CeloSwap Mini App"
            className="w-full px-3.5 py-2.5 rounded-lg bg-forest-950 border border-forest-700/80 text-white placeholder-forest-500 text-sm focus:outline-none focus:border-lime-400"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-forest-200 block">
            Application URL (HTTPS) *
          </label>
          <input
            type="url"
            required
            value={applicationUrl}
            onChange={(e) => setApplicationUrl(e.target.value)}
            placeholder="https://app.example.com"
            className="w-full px-3.5 py-2.5 rounded-lg bg-forest-950 border border-forest-700/80 text-white placeholder-forest-500 text-sm focus:outline-none focus:border-lime-400"
          />
          <span className="text-[11px] text-forest-400 block">
            Must be a public HTTPS endpoint. Localhost, private IPs, or credentials in URL are prohibited.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-forest-200 block">
              GitHub Repository (Optional)
            </label>
            <input
              type="url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/owner/repo"
              className="w-full px-3.5 py-2.5 rounded-lg bg-forest-950 border border-forest-700/80 text-white placeholder-forest-500 text-sm focus:outline-none focus:border-lime-400"
            />
            <span className="text-[11px] text-forest-400 block">
              Used for read-only metadata hint inspection (no private repo tokens).
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-forest-200 block">
              Monorepo Subdirectory
            </label>
            <input
              type="text"
              value={repoSubdir}
              onChange={(e) => setRepoSubdir(e.target.value)}
              placeholder="e.g. apps/minipay"
              className="w-full px-3.5 py-2.5 rounded-lg bg-forest-950 border border-forest-700/80 text-white placeholder-forest-500 text-sm focus:outline-none focus:border-lime-400"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-forest-200 block">
            Submission Stage *
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSubmissionStage("intake")}
              className={`p-3 rounded-lg border text-left text-xs transition-colors ${
                submissionStage === "intake"
                  ? "bg-lime-500/10 border-lime-400 text-white"
                  : "bg-forest-950 border-forest-800 text-forest-300 hover:border-forest-700"
              }`}
            >
              <span className="font-bold block mb-0.5">Intake</span>
              <span className="text-[11px] text-forest-400">Initial basic review & checklist</span>
            </button>

            <button
              type="button"
              onClick={() => setSubmissionStage("readiness")}
              className={`p-3 rounded-lg border text-left text-xs transition-colors ${
                submissionStage === "readiness"
                  ? "bg-lime-500/10 border-lime-400 text-white"
                  : "bg-forest-950 border-forest-800 text-forest-300 hover:border-forest-700"
              }`}
            >
              <span className="font-bold block mb-0.5">Readiness</span>
              <span className="text-[11px] text-forest-400">Full pre-submission compliance audit</span>
            </button>
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-3 p-3.5 rounded-lg bg-forest-950 border border-forest-800 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={authorizationConsent}
              onChange={(e) => setAuthorizationConsent(e.target.checked)}
              className="mt-0.5 accent-lime-500 rounded"
            />
            <span className="text-xs text-forest-200 leading-relaxed">
              I certify that I am the owner or authorized developer of this application and grant DocketRail permission to inspect endpoints, origins, and assets.
            </span>
          </label>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-lg font-semibold text-sm bg-lime-500 hover:bg-lime-400 text-forest-950 transition-all disabled:opacity-50"
          >
            {submitting ? "Registering..." : "Create Project & Generate Plan"}
          </button>
        </div>
      </form>
    </div>
  );
}
