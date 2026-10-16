"use client";

import { useState } from "react";
import {
  Sparkles,
  AlertTriangle,
  FileText,
  Tag,
  Share2,
  MessageSquare,
  Globe,
  CheckSquare,
  Eye,
  Sliders,
  Download,
  Check,
  CheckCircle2,
} from "lucide-react";
import { ListingOutput } from "@/lib/types/listing";
import { CopyButton } from "./CopyButton";
import { ListingPreviewCard } from "./ListingPreviewCard";
import { WhatsAppPreview } from "./WhatsAppPreview";

interface ListingResultsProps {
  listing: ListingOutput | null;
  onUpdateListing: (updated: ListingOutput) => void;
  isLoading: boolean;
  error: string | null;
  imageDataUrl?: string;
  price?: string;
  brandName?: string;
  isSample?: boolean;
  onClearSample?: () => void;
  onRegenerateField?: (fieldKey: string) => void;
}

export function ListingResults({
  listing,
  onUpdateListing,
  isLoading,
  error,
  imageDataUrl,
  price,
  brandName,
  isSample,
  onClearSample,
}: ListingResultsProps) {
  const [activeTab, setActiveTab] = useState<"editor" | "storefront" | "whatsapp">("editor");
  const [activeTranslationLang, setActiveTranslationLang] = useState<string>("Hindi");
  const [copiedAll, setCopiedAll] = useState(false);
  const [checkedMissing, setCheckedMissing] = useState<Record<number, boolean>>({});

  // Field change handlers
  const handleTitleChange = (val: string) => {
    if (!listing) return;
    onUpdateListing({ ...listing, title: val });
  };

  const handleDescChange = (val: string) => {
    if (!listing) return;
    onUpdateListing({ ...listing, description: val });
  };

  const handleSocialChange = (val: string) => {
    if (!listing) return;
    onUpdateListing({ ...listing, socialCaption: val });
  };

  const handleWhatsAppChange = (val: string) => {
    if (!listing) return;
    onUpdateListing({ ...listing, whatsappMessage: val });
  };

  const handleKeywordsChange = (val: string) => {
    if (!listing) return;
    const keywords = val
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);
    onUpdateListing({ ...listing, keywords });
  };

  const handleTranslationFieldChange = (
    lang: string,
    field: "title" | "description" | "socialCaption",
    val: string
  ) => {
    if (!listing) return;
    const currentTranslation = listing.translations[lang] || {
      language: lang,
      title: "",
      description: "",
      socialCaption: "",
    };
    onUpdateListing({
      ...listing,
      translations: {
        ...listing.translations,
        [lang]: {
          ...currentTranslation,
          [field]: val,
        },
      },
    });
  };

  const handleToggleMissing = (index: number) => {
    setCheckedMissing((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleCopyAll = async () => {
    if (!listing) return;
    const summary = [
      `TITLE:`,
      listing.title,
      ``,
      `PRICE: ${price || "N/A"}`,
      `BRAND: ${brandName || "N/A"}`,
      ``,
      `DESCRIPTION:`,
      listing.description,
      ``,
      `KEYWORDS:`,
      listing.keywords.join(", "),
      ``,
      `SOCIAL CAPTION:`,
      listing.socialCaption,
      ``,
      `WHATSAPP MESSAGE:`,
      listing.whatsappMessage,
      ``,
      `UNVERIFIED ITEMS TO CONFIRM:`,
      listing.missingDetails.map((m) => `• ${m}`).join("\n"),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(summary);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleExportJson = () => {
    if (!listing) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(listing, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `locallisting-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="h-full min-h-[450px] bg-white rounded-2xl border border-stone-200 p-8 flex flex-col items-center justify-center text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-[#FDF4F0] border border-[#F4CBBF] flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-[#B8502A] animate-pulse" />
          </div>
          <div className="absolute -inset-1 rounded-2xl border-2 border-[#B8502A]/30 animate-spin border-t-transparent"></div>
        </div>
        <div className="space-y-1.5 max-w-sm">
          <h3 className="text-base font-bold text-stone-900">
            Analyzing Product Image with Open-Weight AI
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Examining visible materials, verifying seller facts, avoiding hallucinations, and drafting multi-channel copy & Hindi translations...
          </p>
        </div>
        <div className="w-48 bg-stone-100 h-1.5 rounded-full overflow-hidden">
          <div className="bg-[#B8502A] h-full w-2/3 animate-pulse"></div>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="h-full min-h-[400px] bg-white rounded-2xl border border-red-200 p-8 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <div className="space-y-2 max-w-md">
          <h3 className="text-base font-bold text-red-900">
            Generation Failed
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed bg-red-50/50 p-3 rounded-xl border border-red-100 font-mono text-left">
            {error}
          </p>
        </div>
        <div className="text-xs text-stone-500 max-w-sm">
          Tip: Ensure Ollama is running (`ollama serve`) and the model is pulled (`ollama pull gemma3:4b`), or check your configured AI provider.
        </div>
      </div>
    );
  }

  // 3. Empty State (no listing yet)
  if (!listing) {
    return (
      <div className="h-full min-h-[450px] bg-white rounded-2xl border border-dashed border-stone-300 p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-[#F4F1EA] text-[#B8502A] flex items-center justify-center">
          <FileText className="w-7 h-7" />
        </div>
        <div className="space-y-1.5 max-w-sm">
          <h3 className="text-base font-bold text-stone-900">
            Your Listing Studio Canvas
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Upload your product photo on the left and select your tone. Your verified titles, descriptions, keywords, social captions, and Hindi translations will appear here.
          </p>
        </div>
        <div className="pt-2">
          <p className="text-[11px] text-stone-400">
            Need an instant preview? Click <strong>&quot;Load Sample&quot;</strong> in the top bar to inspect a verified artisan listing.
          </p>
        </div>
      </div>
    );
  }

  const translationKeys = Object.keys(listing.translations || {});

  return (
    <div className="space-y-4">
      {/* Sample Badge Notice if in Sample Mode */}
      {isSample && (
        <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Sample Preview Mode</strong> — Demonstrating verified output structure generated with Gemma 3 Vision.
            </span>
          </div>
          {onClearSample && (
            <button
              type="button"
              onClick={onClearSample}
              className="text-amber-800 font-semibold hover:underline text-[11px] ml-2 shrink-0 cursor-pointer"
            >
              Start New Listing
            </button>
          )}
        </div>
      )}

      {/* Studio Header Toolbar & View Switcher */}
      <div className="bg-white rounded-xl border border-stone-200 p-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        {/* View Switcher Tabs */}
        <div className="flex items-center p-1 bg-stone-100 rounded-lg text-xs font-semibold text-stone-600">
          <button
            type="button"
            onClick={() => setActiveTab("editor")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === "editor"
                ? "bg-white text-stone-900 shadow-xs font-bold"
                : "hover:text-stone-900"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Studio Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("storefront")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === "storefront"
                ? "bg-white text-stone-900 shadow-xs font-bold"
                : "hover:text-stone-900"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Storefront Preview</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("whatsapp")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === "whatsapp"
                ? "bg-white text-stone-900 shadow-xs font-bold"
                : "hover:text-stone-900"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Chat</span>
          </button>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyAll}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              copiedAll
                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                : "bg-white text-stone-700 hover:bg-stone-50 border-stone-200 shadow-xs"
            }`}
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied All!</span>
              </>
            ) : (
              <>
                <FileText className="w-3.5 h-3.5 text-stone-500" />
                <span>Copy All Listing Content</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleExportJson}
            className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600 transition-colors cursor-pointer"
            title="Download Listing as JSON"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* TAB 1: STOREFRONT PREVIEW */}
      {activeTab === "storefront" && (
        <ListingPreviewCard
          listing={listing}
          imageDataUrl={imageDataUrl}
          price={price}
          brandName={brandName}
        />
      )}

      {/* TAB 2: WHATSAPP SIMULATION */}
      {activeTab === "whatsapp" && (
        <WhatsAppPreview
          message={listing.whatsappMessage}
          brandName={brandName}
        />
      )}

      {/* TAB 3: STUDIO EDITOR */}
      {activeTab === "editor" && (
        <div className="space-y-4">
          {/* Missing Details Safeguard Alert Banner */}
          {listing.missingDetails && listing.missingDetails.length > 0 && (
            <div className="bg-[#FEFCE8] border border-[#FEF08A] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    Factual Safeguards: Confirm Unverified Attributes
                  </h4>
                  <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                    To prevent hallucinated claims and consumer disputes, the open-weight model flagged these details as unconfirmed by photo or input. Please verify before publishing:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {listing.missingDetails.map((detail, idx) => {
                  const isChecked = checkedMissing[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => handleToggleMissing(idx)}
                      className={`flex items-start gap-2 p-2.5 rounded-xl border transition-all cursor-pointer text-xs ${
                        isChecked
                          ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                          : "bg-white/80 border-amber-200 text-stone-800 hover:bg-white"
                      }`}
                    >
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <CheckSquare className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 opacity-60" />
                      )}
                      <span className={isChecked ? "line-through text-stone-500" : ""}>
                        {detail}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 1. Title Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#B8502A]" />
                <span>Product Title</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-stone-400">
                  {listing.title.length} characters
                </span>
                <CopyButton textToCopy={listing.title} label="Copy Title" />
              </div>
            </div>
            <input
              type="text"
              value={listing.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full text-sm font-semibold text-stone-900 bg-stone-50/50 hover:bg-stone-50 focus:bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#B8502A]/20 focus:border-[#B8502A] transition-all"
              placeholder="Product title"
            />
          </div>

          {/* 2. Description Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#B8502A]" />
                <span>Product Description</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-stone-400">
                  {listing.description.split(/\s+/).filter(Boolean).length} words
                </span>
                <CopyButton textToCopy={listing.description} label="Copy Description" />
              </div>
            </div>
            <textarea
              rows={4}
              value={listing.description}
              onChange={(e) => handleDescChange(e.target.value)}
              className="w-full text-xs sm:text-sm text-stone-800 bg-stone-50/50 hover:bg-stone-50 focus:bg-white border border-stone-200 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-[#B8502A]/20 focus:border-[#B8502A] transition-all leading-relaxed"
              placeholder="Product description..."
            />
          </div>

          {/* 3. Keywords & Search Tags */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#B8502A]" />
                <span>Search Keywords ({listing.keywords.length})</span>
              </label>
              <div className="flex items-center gap-1.5">
                <CopyButton
                  textToCopy={listing.keywords.join(", ")}
                  label="Copy as Comma-Separated"
                />
                <CopyButton
                  textToCopy={listing.keywords.map((k) => `#${k.replace(/\s+/g, "")}`).join(" ")}
                  label="Copy as Hashtags"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 p-2.5 bg-stone-50 rounded-xl border border-stone-200">
              {listing.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-lg bg-white text-stone-800 border border-stone-200 shadow-2xs"
                >
                  {kw}
                </span>
              ))}
            </div>
            <div className="pt-1">
              <input
                type="text"
                value={listing.keywords.join(", ")}
                onChange={(e) => handleKeywordsChange(e.target.value)}
                className="w-full text-xs text-stone-600 bg-transparent border border-dashed border-stone-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#B8502A]"
                placeholder="Edit comma-separated keywords..."
                title="Edit comma-separated keywords"
              />
            </div>
          </div>

          {/* 4. Social Media Caption */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-[#B8502A]" />
                <span>Instagram / Facebook Caption</span>
              </label>
              <CopyButton textToCopy={listing.socialCaption} label="Copy Caption" />
            </div>
            <textarea
              rows={4}
              value={listing.socialCaption}
              onChange={(e) => handleSocialChange(e.target.value)}
              className="w-full text-xs sm:text-sm text-stone-800 bg-stone-50/50 hover:bg-stone-50 focus:bg-white border border-stone-200 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-[#B8502A]/20 focus:border-[#B8502A] transition-all leading-relaxed"
              placeholder="Instagram caption with hashtags..."
            />
          </div>

          {/* 5. WhatsApp Sales Message */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Sales Pitch</span>
              </label>
              <CopyButton textToCopy={listing.whatsappMessage} label="Copy WhatsApp Message" />
            </div>
            <textarea
              rows={4}
              value={listing.whatsappMessage}
              onChange={(e) => handleWhatsAppChange(e.target.value)}
              className="w-full text-xs sm:text-sm font-mono text-stone-800 bg-stone-50/50 hover:bg-stone-50 focus:bg-white border border-stone-200 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all leading-relaxed"
              placeholder="Formatted WhatsApp pitch with *bold* headers..."
            />
          </div>

          {/* 6. Multilingual Translations */}
          {translationKeys.length > 0 && (
            <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#B8502A]" />
                  <span>Multilingual Translations</span>
                </label>
                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg">
                  {translationKeys.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setActiveTranslationLang(lang)}
                      className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                        activeTranslationLang === lang
                          ? "bg-white text-stone-900 shadow-xs"
                          : "text-stone-600 hover:text-stone-900"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {listing.translations[activeTranslationLang] && (
                <div className="space-y-3 pt-1 border-t border-stone-100">
                  {/* Translated Title */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-stone-600">
                        Title ({activeTranslationLang})
                      </span>
                      <CopyButton
                        textToCopy={listing.translations[activeTranslationLang].title}
                        size="sm"
                      />
                    </div>
                    <input
                      type="text"
                      value={listing.translations[activeTranslationLang].title}
                      onChange={(e) =>
                        handleTranslationFieldChange(
                          activeTranslationLang,
                          "title",
                          e.target.value
                        )
                      }
                      className="w-full text-xs font-medium text-stone-900 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#B8502A]"
                    />
                  </div>

                  {/* Translated Description */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-stone-600">
                        Description ({activeTranslationLang})
                      </span>
                      <CopyButton
                        textToCopy={listing.translations[activeTranslationLang].description}
                        size="sm"
                      />
                    </div>
                    <textarea
                      rows={3}
                      value={listing.translations[activeTranslationLang].description}
                      onChange={(e) =>
                        handleTranslationFieldChange(
                          activeTranslationLang,
                          "description",
                          e.target.value
                        )
                      }
                      className="w-full text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-lg p-2.5 focus:outline-none focus:border-[#B8502A] leading-relaxed"
                    />
                  </div>

                  {/* Translated Social Caption */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-stone-600">
                        Social Caption ({activeTranslationLang})
                      </span>
                      <CopyButton
                        textToCopy={listing.translations[activeTranslationLang].socialCaption}
                        size="sm"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={listing.translations[activeTranslationLang].socialCaption}
                      onChange={(e) =>
                        handleTranslationFieldChange(
                          activeTranslationLang,
                          "socialCaption",
                          e.target.value
                        )
                      }
                      className="w-full text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-lg p-2.5 focus:outline-none focus:border-[#B8502A]"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
