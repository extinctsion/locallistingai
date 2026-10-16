"use client";

import Link from "next/link";
import { Sparkles, ShoppingBag, ArrowRight } from "lucide-react";
import { AiStatusBadge } from "./AiStatusBadge";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-[#E6E0D4] bg-[#FAF8F5]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[#1C1917] hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-[#B8502A] flex items-center justify-center text-white shadow-xs">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-[#1C1917]">
                LocalListing<span className="text-[#B8502A]">.ai</span>
              </span>
              <span className="hidden md:inline-flex items-center text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-[#EBE6DC] text-[#57534E]">
                Open-Weight AI
              </span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-[#57534E]">
            <Link
              href="/#how-it-works"
              className="hover:text-[#1C1917] transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#features"
              className="hover:text-[#1C1917] transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#open-weight"
              className="hover:text-[#1C1917] transition-colors"
            >
              Why Open-Weight?
            </Link>
            <Link
              href="/studio?sample=brass-diya"
              className="hover:text-[#B8502A] transition-colors inline-flex items-center gap-1 text-[#B8502A]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sample Mode</span>
            </Link>
          </nav>
        </div>

        {/* Right action area */}
        <div className="flex items-center gap-3">
          <AiStatusBadge />

          <Link
            href="/studio"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-[#B8502A] text-white hover:bg-[#9E4322] transition-colors shadow-xs"
          >
            <span>Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
