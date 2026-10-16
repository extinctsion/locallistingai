import { ModelProvider, ProviderGenerationResult } from "./provider";
import { ValidatedListingInput, ListingOutputSchema } from "../validation/listing-schema";
import { SYSTEM_PROMPT, buildUserPrompt, extractJsonFromResponse } from "./prompts";

export class HostedProvider implements ModelProvider {
  name = "hosted";
  private baseUrl: string;
  private apiKey: string;
  private model: string;
  private timeoutMs: number;

  constructor() {
    this.baseUrl = (
      process.env.HOSTED_AI_BASE_URL || "https://openrouter.ai/api/v1"
    ).replace(/\/$/, "");
    this.apiKey = process.env.HOSTED_AI_API_KEY || "";
    // Default to an open-weight vision model (Gemma 3 or Qwen 2.5 VL)
    this.model = process.env.HOSTED_AI_MODEL || "google/gemma-3-27b-it";
    this.timeoutMs = parseInt(process.env.HOSTED_AI_TIMEOUT_MS || "60000", 10);
  }

  async checkHealth(): Promise<{ ok: boolean; message: string; model: string }> {
    if (!this.apiKey) {
      return {
        ok: false,
        message: "HOSTED_AI_API_KEY is not configured in server environment.",
        model: this.model,
      };
    }

    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(`${this.baseUrl}/models`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
        signal: controller.signal,
      });
      clearTimeout(id);

      if (res.ok) {
        return {
          ok: true,
          message: `Connected to hosted provider at ${this.baseUrl} (${this.model})`,
          model: this.model,
        };
      }

      return {
        ok: false,
        message: `Hosted provider returned status ${res.status}: ${res.statusText}`,
        model: this.model,
      };
    } catch (err: any) {
      return {
        ok: false,
        message: `Hosted provider check failed: ${err.message}`,
        model: this.model,
      };
    }
  }

  async generateListing(input: ValidatedListingInput): Promise<ProviderGenerationResult> {
    if (!this.apiKey) {
      throw new Error(
        "HOSTED_AI_API_KEY is not configured in environment variables. To use hosted open-weight inference, set HOSTED_AI_API_KEY and HOSTED_AI_MODEL in .env.local"
      );
    }

    const startTime = Date.now();
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
            content: [
              {
                type: "text",
                text: userPromptText,
              },
              {
                type: "image_url",
                image_url: {
                  url: input.imageDataUrl, // full data:image/...;base64,...
                },
              },
            ],
          },
        ],
        temperature: 0.2,
        response_format: { type: "json_object" },
      };

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
          "HTTP-Referer": "https://locallistingai.render.com",
          "X-Title": "LocalListing AI",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timer);

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        throw new Error(
          `Hosted model provider error (${response.status}): ${errorText || response.statusText}`
        );
      }

      const jsonResult = await response.json();
      const rawContent = jsonResult?.choices?.[0]?.message?.content;

      if (!rawContent) {
        throw new Error("Hosted model provider returned empty content.");
      }

      const parsed = extractJsonFromResponse(rawContent);
      const validatedListing = ListingOutputSchema.parse(parsed);

      return {
        listing: validatedListing,
        provider: `Hosted Open-Weight (${new URL(this.baseUrl).hostname})`,
        model: this.model,
        durationMs: Date.now() - startTime,
      };
    } catch (err: any) {
      clearTimeout(timer);
      if (err.name === "AbortError") {
        throw new Error(`Hosted model inference timed out after ${this.timeoutMs / 1000}s`);
      }
      throw err;
    }
  }
}
