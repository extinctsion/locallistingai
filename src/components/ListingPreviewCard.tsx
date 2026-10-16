"use client";

import { Tag, Sparkles, Share2, ShieldCheck, ShoppingCart } from "lucide-react";
import { ListingOutput } from "@/lib/types/listing";

interface ListingPreviewCardProps {
  listing: ListingOutput;
  imageDataUrl?: string;
  price?: string;
  brandName?: string;
}

export function ListingPreviewCard({
  listing,
  imageDataUrl,
  price,
  brandName,
}: ListingPreviewCardProps) {
  return (
    <div className="w-full space-y-4">
      {/* Disclaimer Banner */}
      <div className="flex items-center justify-between px-3.5 py-2 rounded-lg bg-stone-100 border border-stone-200 text-stone-600 text-xs font-mono">
        <span className="flex items-center gap-1.5 font-semibold text-stone-700">
          <Sparkles className="w-3.5 h-3.5 text-[#B8502A]" />
          STOREFRONT PREVIEW
        </span>
        <span className="text-[11px] text-stone-500">
          SIMULATED ONLINE SHOP • NOT LIVE
        </span>
      </div>

      {/* Main E-Commerce Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden transition-all">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Showcase */}
          <div className="relative bg-[#FAF8F5] p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-stone-100 min-h-[300px]">
            {imageDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageDataUrl}
                alt={listing.title || "Product photo"}
                className="max-h-80 w-auto object-contain rounded-xl shadow-xs"
              />
            ) : (
              <div className="text-center p-8 text-stone-400">
                <Tag className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="text-xs">No image provided</p>
              </div>
            )}

            {price && (
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-stone-900 border border-stone-200 shadow-xs">
                {price}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {brandName && (
                <p className="text-xs font-semibold tracking-wider uppercase text-[#B8502A]">
                  {brandName}
                </p>
              )}

              <h2 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                {listing.title || "Untitled Product"}
              </h2>

              {price && (
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-2xl font-extrabold text-stone-900">
                    {price}
                  </span>
                  <span className="text-xs text-stone-500">Inclusive of all taxes</span>
                </div>
              )}

              <div className="border-t border-stone-100 pt-3">
                <p className="text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1.5">
                  About this item
                </p>
                <div className="text-xs text-stone-600 leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto pr-1">
                  {listing.description || "No description generated yet."}
                </div>
              </div>

              {/* Tags / Keywords */}
              {listing.keywords && listing.keywords.length > 0 && (
                <div className="pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {listing.keywords.slice(0, 6).map((kw, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mock Storefront Actions */}
            <div className="pt-4 border-t border-stone-100 space-y-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#1C1917] text-white text-xs font-semibold hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-default"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Buy Now (Sample Action)</span>
                </button>
                <button
                  type="button"
                  className="p-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors cursor-default"
                  title="Share preview"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-stone-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Verified factual claims • Ready to publish on Shopify, Etsy, or ONDC
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
