import React from "react";
import Link from "next/link";
import { FolderCheck, Terminal, Plus } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-base-950/95 border-b border-base-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 text-white hover:text-base-100 transition-colors">
            <div className="w-7 h-7 rounded bg-brand flex items-center justify-center text-white font-bold text-xs">
              <FolderCheck className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-white">
              DocketRail
            </span>
            <span className="text-[11px] font-mono text-base-400 border border-base-800 px-1.5 py-0.5 rounded bg-base-900">
              MiniPay Audit
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-xs">
            <Link
              href="/#sample-pack"
              className="px-2.5 py-1.5 rounded text-base-300 hover:text-white hover:bg-base-900 transition-colors"
            >
              Sample Dossier
            </Link>
            <Link
              href="/projects"
              className="px-2.5 py-1.5 rounded text-base-300 hover:text-white hover:bg-base-900 transition-colors"
            >
              Workspace
            </Link>
            <Link
              href="/runner/pair"
              className="px-2.5 py-1.5 rounded text-base-300 hover:text-white hover:bg-base-900 transition-colors flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5 text-base-400" />
              Pair Runner
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/projects/new"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-brand hover:bg-brand-hover text-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
