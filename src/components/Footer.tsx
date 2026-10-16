import Link from "next/link";
import { ShoppingBag, Shield, Terminal, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#E6E0D4] bg-[#F4F1EA] text-[#57534E] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#B8502A] flex items-center justify-center text-white">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-sm text-[#1C1917]">
                LocalListing<span className="text-[#B8502A]">.ai</span>
              </span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Open-weight vision AI studio for boutique owners, home bakers, and Indian Instagram sellers.
            </p>
            <div className="flex items-center gap-2 text-stone-500 pt-1">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero data retention • Local vision inference</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px]">
              Studio & Tools
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/studio" className="hover:text-stone-900 transition-colors">
                  Create New Listing
                </Link>
              </li>
              <li>
                <Link href="/studio?sample=brass-diya" className="hover:text-stone-900 transition-colors">
                  Sample: Antique Brass Diya
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-stone-900 transition-colors">
                  Listing Workflow
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-stone-900 transition-colors">
                  Multilingual & WhatsApp Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px]">
              Open-Weight AI
            </h4>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="https://ollama.com/library/gemma3"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-stone-900 transition-colors"
                >
                  Gemma 3 Vision Model
                </a>
              </li>
              <li>
                <a
                  href="https://ollama.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-stone-900 transition-colors inline-flex items-center gap-1"
                >
                  <Terminal className="w-3 h-3" />
                  <span>Ollama Local Runtime</span>
                </a>
              </li>
              <li>
                <Link href="/#open-weight" className="hover:text-stone-900 transition-colors">
                  Factual Safeguards Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px]">
              Hacktoberfest 2026
            </h4>
            <p className="text-stone-600 leading-relaxed">
              Built for <strong>Hacktoberfest 2026 Open-Source AI Challenge</strong> (Week 2: Side Hustle).
            </p>
            <div className="pt-2">
              <a
                href="https://github.com/adiro/locallistingai"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-200/70 hover:bg-stone-300 text-stone-800 font-medium transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E6E0D4] flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500">
          <p>© 2026 LocalListing AI. Released under MIT Open Source License.</p>
          <p className="flex items-center gap-1">
            Empowering small businesses with open-source AI <Heart className="w-3 h-3 text-[#B8502A] fill-[#B8502A]" />
          </p>
        </div>
      </div>
    </footer>
  );
}
