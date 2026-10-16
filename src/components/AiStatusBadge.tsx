"use client";

import { useEffect, useState } from "react";
import { Sparkles, CheckCircle2, AlertCircle, RefreshCw, Cpu, ExternalLink } from "lucide-react";

interface HealthState {
  status: string;
  provider: string;
  model: string;
  connected: boolean;
  message: string;
  environment?: {
    AI_PROVIDER?: string;
    OLLAMA_BASE_URL?: string;
    OLLAMA_MODEL?: string;
    HOSTED_CONFIGURED?: boolean;
  };
}

export function AiStatusBadge() {
  const [health, setHealth] = useState<HealthState | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      setHealth(data);
    } catch {
      setHealth({
        status: "offline",
        provider: "unknown",
        model: "gemma3:4b",
        connected: false,
        message: "Failed to connect to local health endpoint.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const isConnected = health?.connected ?? false;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowDetails(!showDetails)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
          isConnected
            ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
            : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
        }`}
        title="Click for AI provider status and troubleshooting"
      >
        <span className="relative flex h-2 w-2">
          {isConnected && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isConnected ? "bg-emerald-500" : "bg-amber-500"
            }`}
          ></span>
        </span>
        <Cpu className="w-3.5 h-3.5" />
        <span className="font-semibold capitalize">
          {health ? `${health.provider}: ${health.model}` : "Checking AI Model..."}
        </span>
      </button>

      {/* Popover / Diagnostics Panel */}
      {showDetails && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDetails(false)}
          />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 p-4 bg-white rounded-xl shadow-xl border border-stone-200 z-50 text-stone-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B8502A]" />
                <span className="text-sm font-semibold text-stone-900">
                  Open-Weight AI Status
                </span>
              </div>
              <button
                type="button"
                onClick={fetchHealth}
                disabled={loading}
                className="text-stone-400 hover:text-stone-700 p-1 rounded-md"
                title="Refresh Status"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
                />
              </button>
            </div>

            <div className="mt-3 space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                {isConnected ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-medium text-stone-900">
                    {isConnected ? "Engine Active & Ready" : "Local Model Setup Recommended"}
                  </p>
                  <p className="text-stone-600 mt-0.5 leading-relaxed">
                    {health?.message}
                  </p>
                </div>
              </div>

              <div className="bg-stone-50 rounded-lg p-2.5 space-y-1.5 font-mono text-[11px] text-stone-600">
                <div className="flex justify-between">
                  <span className="text-stone-400">Provider:</span>
                  <span className="font-semibold text-stone-800 uppercase">
                    {health?.provider || "ollama"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Active Model:</span>
                  <span className="font-semibold text-stone-800">
                    {health?.model || "gemma3:4b"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Endpoint:</span>
                  <span className="truncate max-w-[180px]">
                    {health?.environment?.OLLAMA_BASE_URL || "http://127.0.0.1:11434"}
                  </span>
                </div>
              </div>

              {!isConnected && (
                <div className="bg-amber-50/80 border border-amber-200/80 rounded-lg p-2.5 text-stone-700 space-y-1.5">
                  <p className="font-semibold text-amber-900">How to run locally:</p>
                  <ol className="list-decimal list-inside space-y-1 text-stone-600">
                    <li>Open terminal and launch Ollama: <code className="bg-amber-100 px-1 py-0.5 rounded text-stone-900">ollama serve</code></li>
                    <li>Download vision model: <code className="bg-amber-100 px-1 py-0.5 rounded text-stone-900">ollama pull gemma3:4b</code></li>
                  </ol>
                  <p className="text-[10px] text-stone-500 pt-1">
                    Tip: You can also use Sample Mode in the studio anytime to explore pre-verified artisan listings without running inference!
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
