import { NextResponse } from "next/server";
import { getModelProvider } from "@/lib/ai";

export async function GET() {
  const provider = getModelProvider();
  const providerName = provider.name;

  try {
    const health = await provider.checkHealth();
    return NextResponse.json({
      status: "ok",
      provider: providerName,
      model: health.model,
      connected: health.ok,
      message: health.message,
      environment: {
        AI_PROVIDER: process.env.AI_PROVIDER || "ollama (default)",
        OLLAMA_BASE_URL: process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434",
        OLLAMA_MODEL: process.env.OLLAMA_MODEL || "gemma3:4b",
        HOSTED_CONFIGURED: Boolean(process.env.HOSTED_AI_API_KEY),
      },
    });
  } catch (err: any) {
    return NextResponse.json({
      status: "degraded",
      provider: providerName,
      connected: false,
      message: err.message || "Failed to check provider health",
    });
  }
}
