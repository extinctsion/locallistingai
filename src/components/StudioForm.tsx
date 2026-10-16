"use client";

import {
  Sparkles,
  RotateCcw,
  Tag,
  DollarSign,
  Building,
  Users,
  Compass,
  FileCheck2,
} from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import { ListingInput, ProductCategory, WritingTone } from "@/lib/types/listing";
import { CATEGORIES, TONES } from "@/lib/validation/listing-schema";

interface StudioFormProps {
  input: ListingInput;
  onChangeInput: (newInput: ListingInput) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  onLoadSample: () => void;
  isLoading: boolean;
  isSampleActive?: boolean;
}

export function StudioForm({
  input,
  onChangeInput,
  onSubmit,
  onReset,
  onLoadSample,
  isLoading,
  isSampleActive,
}: StudioFormProps) {
  const updateField = <K extends keyof ListingInput>(field: K, value: ListingInput[K]) => {
    onChangeInput({
      ...input,
      [field]: value,
    });
  };

  const handleTranslationToggle = (lang: string) => {
    const current = [...input.translationLanguages];
    const index = current.indexOf(lang);
    if (index > -1) {
      if (current.length > 1) {
        current.splice(index, 1);
      }
    } else {
      current.push(lang);
    }
    updateField("translationLanguages", current);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Top action row */}
      <div className="flex items-center justify-between pb-1 border-b border-stone-200">
        <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-[#B8502A]" />
          <span>Product Studio Input</span>
        </h2>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onLoadSample}
            disabled={isLoading}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 cursor-pointer ${
              isSampleActive
                ? "bg-amber-100/70 border-amber-300 text-amber-900"
                : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50 shadow-2xs"
            }`}
            title="Load sample brass diya listing to test the UI immediately"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Load Sample</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            disabled={isLoading}
            className="text-xs font-medium text-stone-500 hover:text-stone-800 p-1 rounded-md transition-colors cursor-pointer"
            title="Reset All Fields"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 1. Image Upload Dropzone */}
      <ImageUploader
        imageDataUrl={input.imageDataUrl}
        onChange={(dataUrl) => updateField("imageDataUrl", dataUrl)}
        disabled={isLoading}
      />

      {/* 2. Product Name & Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 uppercase tracking-wide">
            Product Title / Name
          </label>
          <input
            type="text"
            value={input.productName || ""}
            onChange={(e) => updateField("productName", e.target.value)}
            disabled={isLoading}
            placeholder="e.g. Pure Brass Oil Lamp"
            className="w-full text-xs font-medium text-stone-900 bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#B8502A]/20 focus:border-[#B8502A] transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 uppercase tracking-wide flex items-center justify-between">
            <span>Category <span className="text-[#B8502A]">*</span></span>
          </label>
          <select
            value={input.category}
            onChange={(e) => updateField("category", e.target.value as ProductCategory)}
            disabled={isLoading}
            className="w-full text-xs font-medium text-stone-900 bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#B8502A]/20 focus:border-[#B8502A] transition-all cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Known Product Features & Notes */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-stone-700 uppercase tracking-wide flex items-center gap-1">
            <FileCheck2 className="w-3.5 h-3.5 text-stone-400" />
            <span>Confirmed Seller Facts</span>
          </label>
          <span className="text-[11px] text-stone-400">Optional</span>
        </div>
        <textarea
          rows={3}
          value={input.knownFeatures || ""}
          onChange={(e) => updateField("knownFeatures", e.target.value)}
          disabled={isLoading}
          placeholder="e.g., Solid cast brass, antique gold patina, floral petal engravings, 5-wick design. (The AI will NOT invent materials you haven't confirmed)."
          className="w-full text-xs text-stone-800 bg-white border border-stone-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#B8502A]/20 focus:border-[#B8502A] transition-all leading-relaxed"
        />
        <p className="text-[10px] text-stone-500 leading-normal">
          Strict Safeguard: Any facts not stated here or clearly visible in the photo will be flagged under &quot;Missing Details&quot; instead of being hallucinated.
        </p>
      </div>

      {/* 4. Brand Name & Price */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 uppercase tracking-wide flex items-center gap-1">
            <Building className="w-3.5 h-3.5 text-stone-400" />
            <span>Brand / Shop Name</span>
            <span className="text-[10px] text-stone-400 font-normal lowercase">(optional)</span>
          </label>
          <input
            type="text"
            value={input.brandName || ""}
            onChange={(e) => updateField("brandName", e.target.value)}
            disabled={isLoading}
            placeholder="e.g. Mitti & Co."
            className="w-full text-xs font-medium text-stone-900 bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#B8502A]/20 focus:border-[#B8502A]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 uppercase tracking-wide flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-stone-400" />
            <span>Listing Price</span>
            <span className="text-[10px] text-stone-400 font-normal lowercase">(optional)</span>
          </label>
          <input
            type="text"
            value={input.price || ""}
            onChange={(e) => updateField("price", e.target.value)}
            disabled={isLoading}
            placeholder="e.g. ₹1,249"
            className="w-full text-xs font-medium text-stone-900 bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#B8502A]/20 focus:border-[#B8502A]"
          />
        </div>
      </div>

      {/* 5. Target Customer & Occasion */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-stone-700 uppercase tracking-wide flex items-center gap-1">
          <Users className="w-3.5 h-3.5 text-stone-400" />
          <span>Target Audience / Occasion</span>
          <span className="text-[10px] text-stone-400 font-normal lowercase">(optional)</span>
        </label>
        <input
          type="text"
          value={input.targetAudience || ""}
          onChange={(e) => updateField("targetAudience", e.target.value)}
          disabled={isLoading}
          placeholder="e.g. Diwali festive gifts, temple decor, spiritual celebrations"
          className="w-full text-xs font-medium text-stone-900 bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#B8502A]/20 focus:border-[#B8502A]"
        />
      </div>

      {/* 6. Writing Tone Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-stone-700 uppercase tracking-wide">
          Writing Tone
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {TONES.map((t) => {
            const isSelected = input.tone === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => updateField("tone", t as WritingTone)}
                disabled={isLoading}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                  isSelected
                    ? "bg-[#FDF4F0] border-[#B8502A] text-[#B8502A] shadow-2xs font-bold"
                    : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* 7. Multilingual Configuration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 uppercase tracking-wide">
            Primary Language
          </label>
          <select
            value={input.primaryLanguage}
            onChange={(e) => updateField("primaryLanguage", e.target.value)}
            disabled={isLoading}
            className="w-full text-xs font-medium text-stone-900 bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#B8502A]"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi (हिंदी)</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 uppercase tracking-wide">
            Also Translate Into
          </label>
          <div className="flex gap-2">
            {["Hindi", "English"].map((lang) => {
              if (lang.toLowerCase() === input.primaryLanguage.toLowerCase()) return null;
              const isSelected = input.translationLanguages.includes(lang);
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => handleTranslationToggle(lang)}
                  disabled={isLoading}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#FDF4F0] border-[#B8502A] text-[#B8502A]"
                      : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  {lang === "Hindi" ? "Hindi (हिंदी)" : "English"}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Primary Submit CTA */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading || !input.imageDataUrl}
          className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
            isLoading || !input.imageDataUrl
              ? "bg-stone-300 cursor-not-allowed text-stone-500 shadow-none"
              : "bg-[#B8502A] hover:bg-[#9E4322] active:scale-[0.99]"
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
              <span>Generating with Open-Weight Vision AI...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Listing</span>
            </>
          )}
        </button>
        {!input.imageDataUrl && (
          <p className="text-[11px] text-stone-400 text-center mt-1.5">
            Please upload a product photo above to enable generation
          </p>
        )}
      </div>
    </form>
  );
}
