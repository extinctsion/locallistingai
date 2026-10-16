"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  className?: string;
  size?: "sm" | "md";
}

export function CopyButton({
  textToCopy,
  label,
  className = "",
  size = "sm",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const isSmall = size === "sm";

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={label ? `Copy ${label}` : "Copy to clipboard"}
      className={`inline-flex items-center gap-1.5 font-medium transition-all duration-150 rounded-lg cursor-pointer ${
        copied
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
          : "bg-white text-stone-700 hover:text-stone-900 hover:bg-stone-50 border border-stone-200 shadow-xs"
      } ${isSmall ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm"} ${className}`}
    >
      {copied ? (
        <>
          <Check className={`${isSmall ? "w-3.5 h-3.5" : "w-4 h-4"} text-emerald-600`} />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className={`${isSmall ? "w-3.5 h-3.5" : "w-4 h-4"} text-stone-500`} />
          <span>{label || "Copy"}</span>
        </>
      )}
    </button>
  );
}
