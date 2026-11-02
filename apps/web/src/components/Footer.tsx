import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-forest-950 border-t border-forest-900 mt-20 text-forest-300 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-base text-white">DocketRail</span>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-forest-900 text-lime-400 border border-forest-700">
                Baseline Nov 2026
              </span>
            </div>
            <p className="text-forest-400 max-w-sm mb-3">
              Your app. Your evidence. Ready for review. Assembling verifiable submission dossiers for MiniPay applications with traceable evidence and missing item tracking.
            </p>
            <div className="flex items-center gap-1.5 text-forest-400">
              <ShieldCheck className="w-4 h-4 text-lime-400" />
              <span>Non-custodial architecture — no private keys on server.</span>
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-2 uppercase text-[11px] tracking-wider">
              Governance & Budget Limits
            </h5>
            <ul className="space-y-1.5 text-forest-400">
              <li>• Hard spend ceiling: US$1.00 total across experiment</li>
              <li>• Max single run compute budget: US$0.12</li>
              <li>• Safe scanner: viewport 360×640 bounded navigation</li>
              <li>• Deterministic exports: Markdown, CSV, and JSON</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-2 uppercase text-[11px] tracking-wider">
              Legal & Hackathon Track
            </h5>
            <p className="text-forest-400 mb-2">
              Track: <em>Build with buy, Agents on Open Rails</em>.
            </p>
            <p className="text-forest-500 text-[11px]">
              Disclaimer: &ldquo;Ready for review&rdquo; denotes human review readiness. DocketRail does not provide automated listing approvals, endorsements, or legal certificates.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-forest-900/80 flex flex-col sm:flex-row items-center justify-between text-forest-500 text-[11px]">
          <span>© 2026 DocketRail • Builder: Mahdun</span>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <Link href="/#sample-pack" className="hover:text-forest-300">
              Sample Pack
            </Link>
            <Link href="/projects" className="hover:text-forest-300">
              Workspace
            </Link>
            <Link href="/runner/pair" className="hover:text-forest-300">
              Runner Pairing
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
