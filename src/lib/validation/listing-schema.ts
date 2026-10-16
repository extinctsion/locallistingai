import { z } from "zod";

export const CATEGORIES = [
  "Clothing",
  "Food",
  "Jewellery",
  "Home and Kitchen",
  "Beauty",
  "Electronics Accessories",
  "Other",
] as const;

export const TONES = [
  "Friendly",
  "Premium",
  "Minimal",
  "Playful",
  "Professional",
] as const;

export const SUPPORTED_IMAGE_MIMES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
] as const;

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export const ListingInputSchema = z.object({
  imageDataUrl: z
    .string()
    .refine((val) => {
      if (!val.startsWith("data:")) return false;
      const mime = val.substring(5, val.indexOf(";"));
      return SUPPORTED_IMAGE_MIMES.includes(mime as any);
    }, "Image must be a valid JPEG, PNG, WebP, or AVIF format.")
    .refine((val) => {
      // rough base64 byte length estimate
      const base64Str = val.split(",")[1] || "";
      const byteSize = (base64Str.length * 3) / 4;
      return byteSize <= MAX_IMAGE_SIZE_BYTES;
    }, "Image file exceeds the 5MB size limit."),
  productName: z.string().trim().max(120).optional().default(""),
  category: z.enum(CATEGORIES, { error: "Please select a valid product category" }),
  knownFeatures: z.string().trim().max(1000).optional().default(""),
  targetAudience: z.string().trim().max(200).optional().default(""),
  price: z.string().trim().max(50).optional().default(""),
  brandName: z.string().trim().max(100).optional().default(""),
  tone: z.enum(TONES).default("Friendly"),
  primaryLanguage: z.string().trim().min(2).default("English"),
  translationLanguages: z.array(z.string().trim()).default(["Hindi"]),
});

export type ValidatedListingInput = z.infer<typeof ListingInputSchema>;

export const TranslationItemSchema = z.object({
  language: z.string(),
  title: z.string().min(1, "Translation title cannot be empty"),
  description: z.string().min(1, "Translation description cannot be empty"),
  socialCaption: z.string().min(1, "Translation caption cannot be empty"),
  whatsappMessage: z.string().optional(),
});

export const ListingOutputSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  keywords: z.array(z.string()).min(1, "At least one keyword is required"),
  socialCaption: z.string().min(5, "Social caption must be at least 5 characters"),
  whatsappMessage: z.string().min(5, "WhatsApp message must be at least 5 characters"),
  translations: z.record(z.string(), TranslationItemSchema).default({}),
  missingDetails: z.array(z.string()).default([]),
  detectedVisualFeatures: z.array(z.string()).optional().default([]),
});

export type ValidatedListingOutput = z.infer<typeof ListingOutputSchema>;
