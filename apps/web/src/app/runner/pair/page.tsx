"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, Shield, Check, AlertCircle, ArrowLeft } from "lucide-react";
import { PairingApproveInputSchema } from "@docketrail/contracts";
import { Logo } from "@/components/Logo";

export default function RunnerPairPage() {
  const [userCode, setUserCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleApprove = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const cleanCode = userCode.trim().toUpperCase();
    const validation = PairingApproveInputSchema.safeParse({ userCode: cleanCode });
    if (!validation.success) {
      setError("Please enter a valid 8-character verification code.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/runner/pairings/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userCode: cleanCode }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to pair runner device. Please verify the code.");
      }

      setSuccess(true);
      setUserCode("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Pairing failed";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-xs text-base-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Projects</span>
      </Link>

      <div className="space-y-3">
        <Logo type="icon" height={36} />
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Pair Runner Device
          </h1>
          <p className="text-xs text-base-400 mt-0.5">
            Enter the 8-character verification code displayed in your terminal after running <code className="text-base-200">docketrail-runner pair</code>.
          </p>
        </div>
      </div>

      {success && (
        <div className="p-3.5 rounded-md bg-emerald-950 border border-emerald-800 text-emerald-200 text-xs flex items-start gap-2.5">
          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-semibold block text-white">Runner Authorized</span>
            <span>Your runner process is paired for the next 24 hours. Return to your terminal to observe coordinator state.</span>
          </div>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-md bg-rose-950 border border-rose-800 text-rose-200 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleApprove} className="border border-base-800 rounded-lg p-5 sm:p-6 bg-base-900/60 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-base-200 block">
            Verification Code
          </label>
          <input
            type="text"
            required
            maxLength={8}
            value={userCode}
            onChange={(e) => setUserCode(e.target.value.toUpperCase())}
            placeholder="ABCD-1234"
            className="w-full text-center font-mono text-xl tracking-wider font-semibold px-4 py-2.5 rounded-md bg-base-950 border border-base-750 text-white placeholder-base-700 focus:outline-none focus:border-brand-light uppercase"
          />
        </div>

        <button
          type="submit"
          disabled={submitting || userCode.length < 8}
          className="w-full py-2.5 rounded-md font-medium text-xs bg-brand hover:bg-brand-hover text-white transition-colors disabled:opacity-50"
        >
          {submitting ? "Verifying..." : "Authorize Runner"}
        </button>

        <div className="p-3 rounded-md bg-base-950 border border-base-850 text-[11px] text-base-400 space-y-1">
          <div className="flex items-center gap-1.5 font-medium text-base-300">
            <Shield className="w-3 h-3 text-base-400" />
            <span>Non-Custodial Architecture</span>
          </div>
          <p className="leading-relaxed">
            This pairing authenticates your runner to poll claimed jobs and signed upload capabilities. It does not transfer or expose private keys to the web server.
          </p>
        </div>
      </form>
    </div>
  );
}
