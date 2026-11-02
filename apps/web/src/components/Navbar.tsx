import React from "react";
import Link from "next/link";
import { FolderCheck, Terminal, Compass, PlusCircle } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-forest-950/90 border-b border-forest-800/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-lime-400 to-forest-600 flex items-center justify-center text-forest-950 shadow-md group-hover:scale-105 transition-transform">
              <FolderCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-lime-300 transition-colors">
                DocketRail
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-medium tracking-wide uppercase px-1.5 py-0.5 rounded bg-forest-900 text-forest-300 border border-forest-700">
                MiniPay Pack
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/#sample-pack"
              className="px-3 py-1.5 rounded-md text-sm font-medium text-forest-200 hover:text-white hover:bg-forest-900 transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-lime-400" />
              Explore Sample Pack
            </Link>
            <Link
              href="/projects"
              className="px-3 py-1.5 rounded-md text-sm font-medium text-forest-200 hover:text-white hover:bg-forest-900 transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/runner/pair"
              className="px-3 py-1.5 rounded-md text-sm font-medium text-forest-200 hover:text-white hover:bg-forest-900 transition-colors flex items-center gap-1.5"
            >
              <Terminal className="w-4 h-4 text-forest-400" />
              Pair Runner
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/projects/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium bg-lime-500 hover:bg-lime-400 text-forest-950 shadow-sm transition-all hover:shadow-lime-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Project</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
