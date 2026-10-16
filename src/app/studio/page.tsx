import { Suspense } from "react";
import { Metadata } from "next";
import { StudioClient } from "./StudioClient";

export const metadata: Metadata = {
  title: "Listing Studio | LocalListing AI",
  description:
    "Upload a product photo and generate structured titles, descriptions, WhatsApp sales messages, and Hindi translations using open-weight vision AI.",
};

export default function StudioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-[#B8502A] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs text-stone-500 font-medium">
              Initializing Listing Studio...
            </p>
          </div>
        </div>
      }
    >
      <StudioClient />
    </Suspense>
  );
}
