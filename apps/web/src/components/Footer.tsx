import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-base-800 bg-base-950 mt-16 text-base-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
              <Logo type="full" height={20} />
            </Link>
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
          <div>
            Built for Celo Build with buy
          </div>
        </div>
      </div>
    </footer>
  );
}
