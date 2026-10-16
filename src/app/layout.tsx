import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "LocalListing AI | Product Listing Studio for Small Sellers",
  description:
    "Turn product photos into verified listings, social captions, WhatsApp sales pitches, and Hindi translations using open-weight vision AI.",
  keywords: [
    "small business",
    "listing generator",
    "Instagram seller",
    "open-weight AI",
    "Gemma 3",
    "Ollama",
    "WhatsApp selling",
    "Hindi translations",
  ],
  authors: [{ name: "LocalListing AI Team" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-[#FAF8F5] text-[#1C1917] selection:bg-[#B8502A]/15 selection:text-[#B8502A]">
        {children}
      </body>
    </html>
  );
}
