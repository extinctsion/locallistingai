import { ValidatedListingInput, ValidatedListingOutput } from "../validation/listing-schema";

export interface ProviderGenerationResult {
  listing: ValidatedListingOutput;
  provider: string;
  model: string;
  durationMs: number;
}

export interface ModelProvider {
  name: string;
  generateListing(input: ValidatedListingInput): Promise<ProviderGenerationResult>;
  checkHealth(): Promise<{ ok: boolean; message: string; model: string }>;
}

/**
 * Extracts raw base64 string from data URL
 */
export function extractRawBase64(dataUrl: string): { base64: string; mimeType: string } {
  const matches = dataUrl.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
  if (!matches || matches.length < 3) {
    throw new Error("Invalid image data URL format");
  }
  return {
    mimeType: matches[1],
    base64: matches[2],
  };
}
