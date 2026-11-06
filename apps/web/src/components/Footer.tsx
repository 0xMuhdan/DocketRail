import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border-dim bg-canvas-deep mt-20 text-content-muted text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
              <Logo type="full" height={20} priority={false} />
            </Link>
            <p className="text-content-muted text-xs max-w-xl">
              Autonomous evidence collection workspace for developers preparing MiniPay submission dossiers. Bounded scanning, deterministic origin extraction, and missing-item tracking.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono">
            <Link href="/#sample-pack" className="text-content-secondary hover:text-content-primary transition-colors">
              Sample Pack
            </Link>
            <Link href="/projects" className="text-content-secondary hover:text-content-primary transition-colors">
              Workspace
            </Link>
            <Link href="/runner/pair" className="text-content-secondary hover:text-content-primary transition-colors">
              Pair Runner
            </Link>
            <a
              href="https://github.com/0xMuhdan/DocketRail"
              target="_blank"
              rel="noreferrer"
              className="text-content-secondary hover:text-content-primary transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="pt-4 border-t border-border-dim flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-content-dim font-mono">
          <div>
            Built for Celo Build with buy • Agents on Open Rails
          </div>
          <div>
            Non-custodial x402 integration
          </div>
        </div>
      </div>
    </footer>
  );
}
