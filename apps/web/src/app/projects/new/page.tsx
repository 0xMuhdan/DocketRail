"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { CreateProjectInputSchema } from "@docketrail/contracts";
import { Logo } from "@/components/Logo";

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
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-xs text-content-muted hover:text-content-primary transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Projects</span>
      </Link>

      <div className="space-y-3">
        <Logo type="icon" height={36} priority />
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-content-primary tracking-tight">
            Register Inspection Target
          </h1>
          <p className="text-xs text-content-muted mt-0.5">
            Specify your public HTTPS application to generate a bounded inspection plan.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-md bg-rose-950/80 border border-rose-800 text-rose-200 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 border border-border-dim rounded-lg p-5 sm:p-6 bg-canvas-panel">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-content-primary block">
            Project Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="e.g. CeloSwap Mini App"
            className="w-full px-3 py-2 rounded-md bg-canvas-deep border border-border-subtle text-content-primary placeholder-content-dim text-xs focus:outline-none focus:border-lime"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-content-primary block">
            Application URL (HTTPS) <span className="text-rose-400">*</span>
          </label>
          <input
            type="url"
            required
            value={applicationUrl}
            onChange={(e) => setApplicationUrl(e.target.value)}
            placeholder="https://app.example.com"
            className="w-full px-3 py-2 rounded-md bg-canvas-deep border border-border-subtle text-content-primary placeholder-content-dim text-xs font-mono focus:outline-none focus:border-lime"
          />
          <span className="text-[11px] text-content-muted block font-sans">
            Must be a public HTTPS endpoint. Localhost, private IPs, or credentials in URL are rejected by the SSRF firewall.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-content-primary block">
              GitHub Repository (Optional)
            </label>
            <input
              type="url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/owner/repo"
              className="w-full px-3 py-2 rounded-md bg-canvas-deep border border-border-subtle text-content-primary placeholder-content-dim text-xs font-mono focus:outline-none focus:border-lime"
            />
            <span className="text-[11px] text-content-muted block font-sans">
              Read-only inspection for package.json and legal URLs.
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-content-primary block">
              Monorepo Subdirectory
            </label>
            <input
              type="text"
              value={repoSubdir}
              onChange={(e) => setRepoSubdir(e.target.value)}
              placeholder="e.g. apps/web"
              className="w-full px-3 py-2 rounded-md bg-canvas-deep border border-border-subtle text-content-primary placeholder-content-dim text-xs font-mono focus:outline-none focus:border-lime"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-content-primary block">
            Submission Stage <span className="text-rose-400">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSubmissionStage("intake")}
              className={`p-3 rounded-md border text-left text-xs transition-colors ${
                submissionStage === "intake"
                  ? "bg-lime-surface border-lime-border text-content-primary ring-1 ring-lime/40"
                  : "bg-canvas-deep border-border-dim text-content-muted hover:border-border-subtle"
              }`}
            >
              <span className="font-semibold block mb-0.5 text-content-primary">Intake Stage</span>
              <span className="text-[11px] text-content-muted">Initial basic review & listing checklist</span>
            </button>

            <button
              type="button"
              onClick={() => setSubmissionStage("readiness")}
              className={`p-3 rounded-md border text-left text-xs transition-colors ${
                submissionStage === "readiness"
                  ? "bg-lime-surface border-lime-border text-content-primary ring-1 ring-lime/40"
                  : "bg-canvas-deep border-border-dim text-content-muted hover:border-border-subtle"
              }`}
            >
              <span className="font-semibold block mb-0.5 text-content-primary">Readiness Audit</span>
              <span className="text-[11px] text-content-muted">Full pre-submission compliance dossier</span>
            </button>
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-2.5 p-3 rounded-md bg-canvas-deep border border-border-dim cursor-pointer">
            <input
              type="checkbox"
              required
              checked={authorizationConsent}
              onChange={(e) => setAuthorizationConsent(e.target.checked)}
              className="mt-0.5 accent-lime rounded"
            />
            <span className="text-xs text-content-secondary leading-relaxed">
              I certify that I am the owner or authorized developer of this application and grant DocketRail permission to inspect endpoints, origins, and assets.
            </span>
          </label>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 rounded-md font-semibold text-xs bg-lime text-canvas-deep hover:bg-lime-light transition-colors shadow-sm disabled:opacity-50"
          >
            {submitting ? "Registering Target..." : "Create Project & Generate Plan"}
          </button>
        </div>
      </form>
    </div>
  );
}
