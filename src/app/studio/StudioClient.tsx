"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StudioForm } from "@/components/StudioForm";
import { ListingResults } from "@/components/ListingResults";
import { ListingInput, ListingOutput } from "@/lib/types/listing";
import { SAMPLE_PRODUCTS } from "@/lib/data/sample-products";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

const DEFAULT_INPUT: ListingInput = {
  imageDataUrl: "",
  productName: "",
  category: "Home and Kitchen",
  knownFeatures: "",
  targetAudience: "",
  price: "",
  brandName: "",
  tone: "Friendly",
  primaryLanguage: "English",
  translationLanguages: ["Hindi"],
};

export function StudioClient() {
  const searchParams = useSearchParams();
  const sampleParam = searchParams.get("sample");

  const [input, setInput] = useState<ListingInput>(DEFAULT_INPUT);
  const [listing, setListing] = useState<ListingOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSampleActive, setIsSampleActive] = useState(false);

  // Load sample helper
  const handleLoadSample = useCallback(() => {
    const sample = SAMPLE_PRODUCTS[0];
    setInput(sample.input);
    setListing(sample.output);
    setIsSampleActive(true);
    setError(null);
  }, []);

  // Check URL query param on mount
  useEffect(() => {
    if (sampleParam) {
      handleLoadSample();
    }
  }, [sampleParam, handleLoadSample]);

  // Handle Form Submission (Real AI inference)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.imageDataUrl) {
      setError("Please upload a product photo before generating.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsSampleActive(false);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(
          json.error || json.details || `Model request failed with status ${response.status}`
        );
      }

      setListing(json.data);
    } catch (err: any) {
      console.error("[Listing Studio Error]", err);
      setError(err.message || "An error occurred while generating the listing.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setInput(DEFAULT_INPUT);
    setListing(null);
    setError(null);
    setIsSampleActive(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Header Breadcrumb & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 transition-colors shadow-2xs"
              title="Return to Home"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                  Listing Studio
                </h1>
                <span className="text-[11px] font-semibold bg-[#FDF4F0] text-[#B8502A] px-2.5 py-0.5 rounded-full border border-[#F4CBBF]">
                  Open-Weight Vision
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Generate verified e-commerce copy, social hooks, and Hindi translations from product photos.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLoadSample}
              disabled={isLoading}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                isSampleActive
                  ? "bg-amber-100 border-amber-300 text-amber-900 shadow-xs"
                  : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50 shadow-2xs"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{isSampleActive ? "Sample Active (Brass Diya)" : "Load Sample Listing"}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Input Form (5 cols on lg) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs sticky lg:top-24">
            <StudioForm
              input={input}
              onChangeInput={setInput}
              onSubmit={handleSubmit}
              onReset={handleReset}
              onLoadSample={handleLoadSample}
              isLoading={isLoading}
              isSampleActive={isSampleActive}
            />
          </div>

          {/* Right Column: Results & Previews (7 cols on lg) */}
          <div className="lg:col-span-7">
            <ListingResults
              listing={listing}
              onUpdateListing={setListing}
              isLoading={isLoading}
              error={error}
              imageDataUrl={input.imageDataUrl}
              price={input.price}
              brandName={input.brandName}
              isSample={isSampleActive}
              onClearSample={handleReset}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
