"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, ShieldCheck, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { PairingApproveInputSchema } from "@docketrail/contracts";

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
    <div className="max-w-xl mx-auto px-4 py-10 space-y-8">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-xs font-medium text-forest-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Projects</span>
      </Link>

      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-forest-900 border border-forest-700 flex items-center justify-center text-lime-400 mx-auto shadow-md">
          <Terminal className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Pair Local Runner Device
        </h1>
        <p className="text-xs sm:text-sm text-forest-300 max-w-sm mx-auto">
          Enter the 8-character verification code displayed in your local runner terminal.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-200 text-xs flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Runner Successfully Paired!</span>
            <span>Your runner process can now coordinate execution runs for your projects. Return to your terminal to observe status.</span>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-700 text-rose-200 text-xs flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleApprove} className="bg-forest-900/60 border border-forest-800 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="space-y-2 text-center">
          <label className="text-xs font-semibold uppercase tracking-wider text-forest-200 block">
            Verification Code
          </label>
          <input
            type="text"
            required
            maxLength={8}
            value={userCode}
            onChange={(e) => setUserCode(e.target.value.toUpperCase())}
            placeholder="ABCD-1234"
            className="w-full text-center font-mono text-2xl tracking-widest font-bold px-4 py-3 rounded-lg bg-forest-950 border border-forest-700 text-lime-300 placeholder-forest-700 focus:outline-none focus:border-lime-400 uppercase"
          />
        </div>

        <button
          type="submit"
          disabled={submitting || userCode.length < 8}
          className="w-full py-3 rounded-lg font-semibold text-sm bg-lime-500 hover:bg-lime-400 text-forest-950 transition-all disabled:opacity-50"
        >
          {submitting ? "Verifying..." : "Authorize Runner"}
        </button>

        <div className="p-3.5 rounded-lg bg-forest-950/80 border border-forest-800 text-[11px] text-forest-400 space-y-1.5">
          <div className="flex items-center gap-1.5 font-medium text-forest-300">
            <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
            <span>Security & Custody Guarantee:</span>
          </div>
          <p>
            Pairing grants your runner permission to read job plans for your projects. It does <strong>not</strong> grant the web application access to your local private keys or wallet funds.
          </p>
        </div>
      </form>
    </div>
  );
}
