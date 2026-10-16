import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Sparkles,
  ArrowRight,
  Eye,
  ShieldCheck,
  Globe2,
  MessageSquare,
  Cpu,
  Layers,
  Terminal,
  FileCheck2,
  CheckCircle2,
} from "lucide-react";
import { SAMPLE_PRODUCTS } from "@/lib/data/sample-products";

export default function HomePage() {
  const sample = SAMPLE_PRODUCTS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[#E6E0D4] overflow-hidden">
          {/* Subtle warm ambient lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#F4F1EA]/60 to-transparent pointer-events-none -z-10"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              {/* Challenge & Audience Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-stone-200 shadow-2xs text-stone-700 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#B8502A]"></span>
                <span>Hacktoberfest 2026: Side Hustle Challenge</span>
                <span className="text-stone-300">•</span>
                <span className="text-[#B8502A]">Gemma 3 & Ollama</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
                From product photo to ready-to-publish listing.
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
                Small business owners, Instagram sellers, home bakers, and boutique artisans can turn raw product photos into high-converting descriptions, search keywords, WhatsApp sales pitches, and verified Hindi translations in seconds.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  href="/studio"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#B8502A] text-white hover:bg-[#9E4322] shadow-md transition-all active:scale-[0.99]"
                >
                  <span>Create a Listing</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/studio?sample=brass-diya"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-white text-stone-800 hover:bg-stone-50 border border-stone-200 shadow-xs transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Try Sample Diya Listing</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-stone-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Zero invented claims
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-[#B8502A]" />
                  English & Hindi native
                </span>
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-stone-700" />
                  100% Open-weight model
                </span>
              </div>
            </div>

            {/* PRODUCT PREVIEW SHOWCASE */}
            <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
              <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
                <div className="bg-stone-100/70 px-4 sm:px-6 py-3 border-b border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
                    <span className="ml-2 text-xs font-mono font-medium text-stone-500">
                      locallisting-studio-preview.app
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold bg-[#FDF4F0] text-[#B8502A] px-2.5 py-0.5 rounded-md border border-[#F4CBBF]">
                    Verified Gemma 3 Output
                  </span>
                </div>

                <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Photo Column */}
                  <div className="md:col-span-5 bg-[#FAF8F5] rounded-2xl p-4 flex items-center justify-center border border-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={sample.input.imageDataUrl}
                      alt={sample.name}
                      className="max-h-72 w-auto object-contain rounded-xl"
                    />
                  </div>

                  {/* Generated Details Preview */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#B8502A]">
                          Home and Kitchen • KalaKriti Brassworks
                        </span>
                        <span className="text-xs font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded-md">
                          ₹1,249
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-stone-900 leading-snug">
                        {sample.output.title}
                      </h3>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                      {sample.output.description}
                    </p>

                    {/* Hindi Translation Highlight */}
                    <div className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-200/80 space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-stone-700">
                        <span className="flex items-center gap-1.5">
                          <Globe2 className="w-3.5 h-3.5 text-[#B8502A]" />
                          Hindi Listing Translation (हिंदी):
                        </span>
                        <span className="text-[10px] text-stone-400">Devanagari</span>
                      </div>
                      <p className="text-xs font-medium text-stone-800 line-clamp-1">
                        {sample.output.translations.Hindi.title}
                      </p>
                    </div>

                    {/* Safeguard Alert Preview */}
                    <div className="bg-amber-50/90 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Factual Guardrail:</span> {sample.output.missingDetails[0]}
                      </div>
                    </div>

                    <div className="pt-1 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {sample.output.keywords.slice(0, 3).map((kw, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-medium bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>

                      <Link
                        href="/studio?sample=brass-diya"
                        className="text-xs font-bold text-[#B8502A] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Open in Studio</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-16 sm:py-24 border-b border-[#E6E0D4] bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-2xl mx-auto text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8502A]">
                Streamlined Workflow
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                From photo to publish in 3 simple steps
              </h2>
              <p className="text-sm text-stone-600">
                Designed specifically for Instagram sellers, boutique owners, and handmade creators who want to spend less time typing and more time fulfilling orders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-stone-200 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#FDF4F0] border border-[#F4CBBF] flex items-center justify-center font-bold text-sm text-[#B8502A]">
                  01
                </div>
                <h3 className="text-lg font-bold text-stone-900">
                  Drop Your Product Photo
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Upload a photo taken on your smartphone. The vision model analyzes visible textures, colors, shapes, and finishes without relying on manual tagging.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-stone-200 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#FDF4F0] border border-[#F4CBBF] flex items-center justify-center font-bold text-sm text-[#B8502A]">
                  02
                </div>
                <h3 className="text-lg font-bold text-stone-900">
                  Set Your Brand Tone
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Choose your category, tone (Friendly, Premium, Minimal, etc.), price, and any confirmed seller notes. The model incorporates only verified facts.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-stone-200 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#FDF4F0] border border-[#F4CBBF] flex items-center justify-center font-bold text-sm text-[#B8502A]">
                  03
                </div>
                <h3 className="text-lg font-bold text-stone-900">
                  Copy &amp; Sell Everywhere
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  1-click copy your marketplace description, Instagram caption with hashtags, WhatsApp sales pitch, and authentic Hindi translation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CORE FEATURES SECTION */}
        <section id="features" className="py-16 sm:py-24 border-b border-[#E6E0D4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-2xl mx-auto text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8502A]">
                Built for Small Indian Businesses
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                Practical tools for everyday commerce
              </h2>
              <p className="text-sm text-stone-600">
                A creative studio built around real small business workflows, not generic marketing buzzwords.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-stone-900">
                  Factual Guardrails
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Strict prompt engineering ensures the AI never guesses dimensions, materials (e.g. pure silk or solid brass), or certifications unless confirmed.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Globe2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-stone-900">
                  English &amp; Hindi Translations
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Connect with buyers across regions. Get culturally natural Devanagari Hindi listings alongside Indian English without robotic machine translation.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-stone-900">
                  WhatsApp Direct Pitches
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Pre-formatted with markdown bolding and bullet points tailored for quick WhatsApp Business chat sharing, quotation requests, and customer inquiries.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-stone-900">
                  Live Storefront Preview
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Inspect your listing as a realistic online e-commerce card with interactive buy actions before publishing to Shopify, Amazon, or Instagram shops.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY OPEN-WEIGHT AI SECTION */}
        <section id="open-weight" className="py-16 sm:py-24 bg-white border-b border-[#E6E0D4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#FAF8F5] rounded-3xl border border-stone-200 p-8 sm:p-12 space-y-8">
              <div className="max-w-2xl space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B8502A] flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  <span>Open Innovation &amp; Data Sovereignty</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  Why Open-Weight AI Matters for Small Sellers
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Unlike closed proprietary APIs that charge per token and send private product sketches or recipes to centralized servers, LocalListing AI runs on open-weight models like Google&apos;s Gemma 3.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-2">
                  <div className="text-sm font-bold text-stone-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Zero Per-Token Tax
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Sellers can generate hundreds of listings and translations without accumulating costly cloud API bills. Runs directly on your device with Ollama.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-2">
                  <div className="text-sm font-bold text-stone-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Confidential Product Designs
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Unreleased jewelry molds, handmade couture sketches, and proprietary food jar labels never leave your workstation when running local inference.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-2">
                  <div className="text-sm font-bold text-stone-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    No Vendor Lock-In
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Easily switch between Gemma 3 4B, 12B, or 27B variants, or use compatible open-weight hosted endpoints on Render without changing code.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-stone-100 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-700">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#B8502A]" />
                  <span>Tested locally with <strong>Gemma 3 4B Vision</strong> on Ollama v0.33</span>
                </div>
                <Link
                  href="/studio"
                  className="px-4 py-2 bg-[#1C1917] hover:bg-stone-800 text-white rounded-lg font-semibold transition-colors"
                >
                  Launch Studio Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="py-16 sm:py-20 text-center">
          <div className="max-w-3xl mx-auto px-4 space-y-5">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Ready to generate ready-to-sell product listings?
            </h2>
            <p className="text-sm text-stone-600 max-w-xl mx-auto">
              Start building your product catalog today. No registration or credit card required.
            </p>
            <div className="pt-2">
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#B8502A] text-white hover:bg-[#9E4322] shadow-md transition-all active:scale-[0.99]"
              >
                <span>Launch Listing Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
