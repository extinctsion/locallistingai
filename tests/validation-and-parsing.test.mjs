import test from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

// Test schemas directly to verify validation logic
const CATEGORIES = [
  "Clothing",
  "Food",
  "Jewellery",
  "Home and Kitchen",
  "Beauty",
  "Electronics Accessories",
  "Other",
];

const TONES = [
  "Friendly",
  "Premium",
  "Minimal",
  "Playful",
  "Professional",
];

const SUPPORTED_IMAGE_MIMES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

const ListingInputSchema = z.object({
  imageDataUrl: z
    .string()
    .refine((val) => {
      if (!val.startsWith("data:")) return false;
      const mime = val.substring(5, val.indexOf(";"));
      return SUPPORTED_IMAGE_MIMES.includes(mime);
    }, "Image must be a valid JPEG, PNG, WebP, or AVIF format.")
    .refine((val) => {
      const base64Str = val.split(",")[1] || "";
      const byteSize = (base64Str.length * 3) / 4;
      return byteSize <= MAX_IMAGE_SIZE_BYTES;
    }, "Image file exceeds the 5MB size limit."),
  productName: z.string().trim().max(120).optional().default(""),
  category: z.enum(CATEGORIES),
  knownFeatures: z.string().trim().max(1000).optional().default(""),
  targetAudience: z.string().trim().max(200).optional().default(""),
  price: z.string().trim().max(50).optional().default(""),
  brandName: z.string().trim().max(100).optional().default(""),
  tone: z.enum(TONES).default("Friendly"),
  primaryLanguage: z.string().trim().min(2).default("English"),
  translationLanguages: z.array(z.string().trim()).default(["Hindi"]),
});

const TranslationItemSchema = z.object({
  language: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
  socialCaption: z.string().min(1),
  whatsappMessage: z.string().optional(),
});

const ListingOutputSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  keywords: z.array(z.string()).min(1),
  socialCaption: z.string().min(5),
  whatsappMessage: z.string().min(5),
  translations: z.record(z.string(), TranslationItemSchema).default({}),
  missingDetails: z.array(z.string()).default([]),
  detectedVisualFeatures: z.array(z.string()).optional().default([]),
});

function extractJsonFromResponse(raw) {
  if (!raw || typeof raw !== "string") {
    throw new Error("Model returned empty or non-string response.");
  }
  let cleaned = raw.trim();
  const codeBlockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (codeBlockMatch && codeBlockMatch[1]) {
    cleaned = codeBlockMatch[1].trim();
  }
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("Could not find valid JSON object in model output.");
  }
  const jsonSubstring = cleaned.substring(firstBrace, lastBrace + 1);
  try {
    return JSON.parse(jsonSubstring);
  } catch (initialErr) {
    const sanitized = jsonSubstring
      .replace(/,\s*([}\]])/g, "$1")
      .replace(/[\u201C\u201D]/g, '"');
    return JSON.parse(sanitized);
  }
}

test("Input Validation: Valid input passes schema validation", () => {
  const sampleInput = {
    imageDataUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRg==",
    productName: "Handmade Ceramic Mug",
    category: "Home and Kitchen",
    knownFeatures: "Stoneware clay, speckled glaze, 350ml",
    tone: "Friendly",
    primaryLanguage: "English",
    translationLanguages: ["Hindi"],
  };

  const result = ListingInputSchema.safeParse(sampleInput);
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.category, "Home and Kitchen");
    assert.equal(result.data.tone, "Friendly");
  }
});

test("Input Validation: Unsupported image MIME type is rejected", () => {
  const invalidInput = {
    imageDataUrl: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    category: "Clothing",
  };

  const result = ListingInputSchema.safeParse(invalidInput);
  assert.equal(result.success, false);
});

test("Input Validation: Invalid category is rejected", () => {
  const invalidCategoryInput = {
    imageDataUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
    category: "Automobiles",
  };

  const result = ListingInputSchema.safeParse(invalidCategoryInput);
  assert.equal(result.success, false);
});

test("Output Validation: Valid AI response structure parses accurately", () => {
  const validOutput = {
    title: "Pure Brass Temple Diya with Lotus Engravings",
    description: "An authentic, handcrafted brass oil lamp sculpted by traditional artisans. Perfect for festive ceremonies and daily pooja.",
    keywords: ["brass diya", "pooja oil lamp", "festive decor"],
    socialCaption: "Illuminate your sanctuary with our handcrafted Brass Diya. DM to order! #BrassDiya",
    whatsappMessage: "Namaste! Order our *Pure Brass Diya* for ₹1,249. Fast shipping across India.",
    translations: {
      Hindi: {
        language: "Hindi",
        title: "कमल नक्काशीदार पीतल का दीया",
        description: "पूजा और उत्सवों के लिए शुद्ध पीतल का पारंपरिक दीया।",
        socialCaption: "अपने घर को दिव्य प्रकाश से सजाएं। ऑर्डर करने के लिए संपर्क करें!",
      },
    },
    missingDetails: ["Exact height and diameter", "Care instructions"],
    detectedVisualFeatures: ["Golden brass metal", "Lotus base petals"],
  };

  const result = ListingOutputSchema.safeParse(validOutput);
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.missingDetails.length, 2);
    assert.equal(result.data.translations.Hindi.title, "कमल नक्काशीदार पीतल का दीया");
  }
});

test("Output Validation: Incomplete AI output fails validation", () => {
  const incompleteOutput = {
    title: "Diya",
    // Missing description, keywords, socialCaption, whatsappMessage
  };

  const result = ListingOutputSchema.safeParse(incompleteOutput);
  assert.equal(result.success, false);
});

test("JSON Extraction: Successfully cleans markdown fenced blocks", () => {
  const llmResponse = `Here is the generated listing JSON:\n\`\`\`json\n{\n  "title": "Kashmiri Pashmina Shawl",\n  "description": "Exquisite fine wool wrap.",\n  "keywords": ["pashmina", "shawl"],\n  "socialCaption": "Stay warm in style. DM now!",\n  "whatsappMessage": "Hello! Our *Pashmina Shawl* is ₹4,500.",\n  "translations": {},\n  "missingDetails": ["Dry clean only confirmation"]\n}\n\`\`\`\nHope this helps your store!`;

  const parsed = extractJsonFromResponse(llmResponse);
  assert.equal(parsed.title, "Kashmiri Pashmina Shawl");
  assert.equal(parsed.keywords.length, 2);
});

test("JSON Extraction: Recovers from trailing commas in LLM JSON", () => {
  const rawWithTrailingComma = `{\n  "title": "Ceramic Tea Pot",\n  "description": "Earthy handmade teapot.",\n  "keywords": ["tea", "pot",],\n  "socialCaption": "Chai time! #chai",\n  "whatsappMessage": "Chai lovers unite!",\n  "translations": {},\n  "missingDetails": [],\n}`;

  const parsed = extractJsonFromResponse(rawWithTrailingComma);
  assert.equal(parsed.title, "Ceramic Tea Pot");
  assert.equal(parsed.keywords.length, 2);
});
