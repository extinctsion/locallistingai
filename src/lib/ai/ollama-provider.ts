import { ModelProvider, ProviderGenerationResult, extractRawBase64 } from "./provider";
import { ValidatedListingInput, ListingOutputSchema } from "../validation/listing-schema";
import { SYSTEM_PROMPT, buildUserPrompt, extractJsonFromResponse } from "./prompts";

export class OllamaProvider implements ModelProvider {
  name = "ollama";
  private baseUrl: string;
  private model: string;
  private timeoutMs: number;

  constructor() {
    this.baseUrl = (process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434").replace(/\/$/, "");
    this.model = process.env.OLLAMA_MODEL || "gemma3:4b";
    this.timeoutMs = parseInt(process.env.OLLAMA_TIMEOUT_MS || "120000", 10);
  }

  async checkHealth(): Promise<{ ok: boolean; message: string; model: string }> {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(`${this.baseUrl}/api/tags`, {
        signal: controller.signal,
      });
      clearTimeout(id);

      if (!res.ok) {
        return {
          ok: false,
          message: `Ollama returned HTTP ${res.status}: ${res.statusText}`,
          model: this.model,
        };
      }

      const data = await res.json();
      const models = Array.isArray(data.models) ? data.models.map((m: any) => m.name) : [];
      const hasModel = models.some((m: string) => m.toLowerCase().includes(this.model.toLowerCase()));

      if (!hasModel) {
        return {
          ok: false,
          message: `Ollama is running, but model "${this.model}" was not found. Run 'ollama pull ${this.model}'`,
          model: this.model,
        };
      }

      return {
        ok: true,
        message: `Connected to Ollama with model "${this.model}"`,
        model: this.model,
      };
    } catch (err: any) {
      if (err.name === "AbortError") {
        return {
          ok: false,
          message: `Connection to Ollama timed out at ${this.baseUrl}`,
          model: this.model,
        };
      }
      return {
        ok: false,
        message: `Ollama service unreachable at ${this.baseUrl}. Start Ollama with 'ollama serve'`,
        model: this.model,
      };
    }
  }

  async generateListing(input: ValidatedListingInput): Promise<ProviderGenerationResult> {
    const startTime = Date.now();
    const { base64 } = extractRawBase64(input.imageDataUrl);
    const userPromptText = buildUserPrompt(input);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const payload = {
        model: this.model,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: userPromptText,
            images: [base64],
          },
        ],
        stream: false,
        format: "json", // Instruct Ollama to output valid JSON
        options: {
          temperature: 0.2, // Low temperature for high factual accuracy
          top_p: 0.9,
        },
      };

      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timer);

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        if (response.status === 404) {
          throw new Error(
            `Model "${this.model}" is not installed in your Ollama instance. Please run:\n  ollama pull ${this.model}\nor specify a model you have installed using OLLAMA_MODEL in .env.local`
          );
        }
        throw new Error(
          `Ollama API error (HTTP ${response.status}): ${errorText || response.statusText}`
        );
      }

      const jsonResult = await response.json();
      const rawContent = jsonResult?.message?.content;

      if (!rawContent) {
        throw new Error("Ollama returned an empty response content.");
      }

      // Parse JSON from content (extracting code blocks or raw JSON)
      const parsed = extractJsonFromResponse(rawContent);

      // Validate against strict Zod schema
      const validatedListing = ListingOutputSchema.parse(parsed);

      return {
        listing: validatedListing,
        provider: "Ollama (Local)",
        model: this.model,
        durationMs: Date.now() - startTime,
      };
    } catch (err: any) {
      clearTimeout(timer);
      if (err.name === "AbortError") {
        throw new Error(
          `Ollama vision inference timed out after ${this.timeoutMs / 1000}s. Vision models can require higher VRAM/RAM.`
        );
      }
      if (err.cause?.code === "ECONNREFUSED" || err.message?.includes("fetch failed")) {
        throw new Error(
          `Could not connect to Ollama at ${this.baseUrl}. Please verify that the Ollama service is running (` +
            `run 'ollama serve' in your terminal).`
        );
      }
      throw err;
    }
  }
}
