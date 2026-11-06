import React from "react";
import Link from "next/link";
import { Terminal, Plus, ShieldCheck } from "lucide-react";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-canvas/90 backdrop-blur-md border-b border-border-dim">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-7">
          <Link
            href="/"
            className="flex items-center gap-3 text-content-primary hover:opacity-95 transition-opacity focus-visible:rounded"
          >
            <Logo type="full" height={22} priority />
            <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-content-muted border border-border-subtle px-1.5 py-0.5 rounded bg-canvas-panel">
              <ShieldCheck className="w-3 h-3 text-lime" />
              Audit Console
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-xs">
            <Link
              href="/#sample-pack"
              className="px-2.5 py-1.5 rounded text-content-secondary hover:text-content-primary hover:bg-canvas-panel transition-colors"
            >
              Sample Dossier
            </Link>
            <Link
              href="/#pipeline-3d"
              className="px-2.5 py-1.5 rounded text-content-secondary hover:text-content-primary hover:bg-canvas-panel transition-colors"
            >
              Execution Pipeline
            </Link>
            <Link
              href="/projects"
              className="px-2.5 py-1.5 rounded text-content-secondary hover:text-content-primary hover:bg-canvas-panel transition-colors"
            >
              Workspace
            </Link>
            <Link
              href="/runner/pair"
              className="px-2.5 py-1.5 rounded text-content-secondary hover:text-content-primary hover:bg-canvas-panel transition-colors flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5 text-content-muted" />
              Pair Runner
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/projects/new"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-lime text-canvas-deep hover:bg-lime-light transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>New Target</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
