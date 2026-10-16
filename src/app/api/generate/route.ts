import { NextRequest, NextResponse } from "next/server";
import { ListingInputSchema } from "@/lib/validation/listing-schema";
import { getModelProvider } from "@/lib/ai";
import { ZodError } from "zod";

export const maxDuration = 120; // 2 minutes for local vision model inference

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    let body: any;

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      body = await req.json();
    } else if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const imageFile = formData.get("image") as File | null;

      let imageDataUrl = "";
      if (imageFile) {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const mime = imageFile.type || "image/jpeg";
        imageDataUrl = `data:${mime};base64,${buffer.toString("base64")}`;
      } else {
        imageDataUrl = (formData.get("imageDataUrl") as string) || "";
      }

      const translationLangsRaw = formData.get("translationLanguages");
      let translationLanguages: string[] = ["Hindi"];
      if (translationLangsRaw) {
        try {
          translationLanguages = JSON.parse(translationLangsRaw as string);
        } catch {
          translationLanguages = [(translationLangsRaw as string).trim()];
        }
      }

      body = {
        imageDataUrl,
        productName: (formData.get("productName") as string) || "",
        category: (formData.get("category") as string) || "Other",
        knownFeatures: (formData.get("knownFeatures") as string) || "",
        targetAudience: (formData.get("targetAudience") as string) || "",
        price: (formData.get("price") as string) || "",
        brandName: (formData.get("brandName") as string) || "",
        tone: (formData.get("tone") as string) || "Friendly",
        primaryLanguage: (formData.get("primaryLanguage") as string) || "English",
        translationLanguages,
      };
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported Content-Type",
          details: "Expected application/json or multipart/form-data",
        },
        { status: 415 }
      );
    }

    // 1. Validate input schema with Zod
    const validatedInput = ListingInputSchema.parse(body);

    // 2. Select AI Provider (Ollama or Hosted)
    const provider = getModelProvider();

    // 3. Execute vision model inference
    const result = await provider.generateListing(validatedInput);

    return NextResponse.json({
      success: true,
      data: result.listing,
      meta: {
        provider: result.provider,
        model: result.model,
        durationMs: result.durationMs,
      },
    });
  } catch (error: any) {
    const elapsed = Date.now() - startTime;
    console.error("[LocalListing AI API Error]", error);

    // Zod validation failure
    if (error instanceof ZodError) {
      const formattedErrors = error.issues
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((e: any) => `${e.path.map(String).join(".")}: ${e.message}`)
        .join("; ");
      return NextResponse.json(
        {
          success: false,
          error: "Invalid input parameters",
          details: formattedErrors,
        },
        { status: 400 }
      );
    }

    // Connection or Model availability errors
    const isServiceUnavailable =
      error.message?.includes("Ollama service unreachable") ||
      error.message?.includes("Could not connect to Ollama") ||
      error.message?.includes("not installed in your Ollama") ||
      error.message?.includes("HOSTED_AI_API_KEY is not configured");

    return NextResponse.json(
      {
        success: false,
        error: error.message || "An unexpected error occurred during listing generation",
        details: error.stack ? error.stack.split("\n").slice(0, 3).join("\n") : undefined,
        meta: {
          durationMs: elapsed,
        },
      },
      { status: isServiceUnavailable ? 503 : 500 }
    );
  }
}
