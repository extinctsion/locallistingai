"use client";

import { MessageSquare, Send, CheckCheck } from "lucide-react";
import { CopyButton } from "./CopyButton";

interface WhatsAppPreviewProps {
  message: string;
  brandName?: string;
}

export function WhatsAppPreview({ message, brandName }: WhatsAppPreviewProps) {
  // Format WhatsApp markdown: replace *word* with <strong>word</strong> for preview
  const formatWhatsAppText = (text: string) => {
    return text.split("\n").map((line, idx) => {
      // Replace *bold* with <strong>
      const parts = line.split(/(\*[^*]+\*)/g);
      return (
        <span key={idx} className="block min-h-[1.2em]">
          {parts.map((part, pIdx) => {
            if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
              return (
                <strong key={pIdx} className="font-bold text-stone-900">
                  {part.slice(1, -1)}
                </strong>
              );
            }
            return part;
          })}
        </span>
      );
    });
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold text-stone-700 uppercase tracking-wide">
            WhatsApp Sales Pitch Preview
          </span>
        </div>
        <CopyButton textToCopy={message} label="Copy WhatsApp Message" />
      </div>

      {/* Realistic WhatsApp Chat Device Frame */}
      <div className="bg-[#EFEAE2] rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        {/* WhatsApp Chat Header */}
        <div className="bg-[#075E54] text-white px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
              {brandName ? brandName.charAt(0).toUpperCase() : "S"}
            </div>
            <div>
              <p className="text-xs font-bold leading-tight">
                {brandName || "Your Store"}
              </p>
              <p className="text-[10px] text-emerald-200">Online • Business Account</p>
            </div>
          </div>
          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/80">
            WhatsApp Business
          </span>
        </div>

        {/* WhatsApp Chat Body */}
        <div className="p-4 sm:p-5 flex justify-end">
          <div className="max-w-[90%] sm:max-w-[85%] bg-[#DCF8C6] text-stone-800 rounded-xl rounded-tr-xs p-3.5 shadow-xs text-xs sm:text-[13px] leading-relaxed relative">
            <div className="text-stone-800 space-y-1">
              {formatWhatsAppText(message)}
            </div>
            <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-stone-500">
              <span>Just now</span>
              <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Mock Chat Footer */}
        <div className="bg-[#F0F2F5] px-3 py-2 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-400">
          <span>Type a message...</span>
          <div className="w-6 h-6 rounded-full bg-[#00A884] text-white flex items-center justify-center">
            <Send className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
