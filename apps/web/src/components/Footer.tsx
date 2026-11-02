import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-base-800 bg-base-950 mt-16 text-base-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white text-sm">DocketRail</span>
            </div>
            <p className="text-base-400 text-xs max-w-xl">
              An evidence collection workspace for developers preparing MiniPay submission dossiers. Bounded scanning, deterministic origin extraction, and missing item tracking.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <Link href="/#sample-pack" className="hover:text-white transition-colors">
              Sample Pack
            </Link>
            <Link href="/projects" className="hover:text-white transition-colors">
              Workspace
            </Link>
            <Link href="/runner/pair" className="hover:text-white transition-colors">
              Pair Runner
            </Link>
            <a
              href="https://github.com/0xMuhdan/DocketRail"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors font-mono"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="pt-4 border-t border-base-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-base-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-base-300" />
            <span>Non-custodial: Private keys remain exclusively in local developer keychain.</span>
          </div>
          <div>
            Built for Celo Build with buy • Developer: Mahdun
          </div>
        </div>
      </div>
    </footer>
  );
}
