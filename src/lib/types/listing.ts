export type ProductCategory =
  | "Clothing"
  | "Food"
  | "Jewellery"
  | "Home and Kitchen"
  | "Beauty"
  | "Electronics Accessories"
  | "Other";

export type WritingTone =
  | "Friendly"
  | "Premium"
  | "Minimal"
  | "Playful"
  | "Professional";

export interface TranslationItem {
  language: string;
  title: string;
  description: string;
  socialCaption: string;
  whatsappMessage?: string;
}

export interface ListingOutput {
  title: string;
  description: string;
  keywords: string[];
  socialCaption: string;
  whatsappMessage: string;
  translations: Record<string, TranslationItem>;
  missingDetails: string[];
  category?: string;
  detectedVisualFeatures?: string[];
}

export interface ListingInput {
  imageDataUrl: string; // data:image/...;base64,...
  productName?: string;
  category: ProductCategory;
  knownFeatures?: string;
  targetAudience?: string;
  price?: string;
  brandName?: string;
  tone: WritingTone;
  primaryLanguage: string; // 'English' | 'Hindi'
  translationLanguages: string[]; // ['Hindi'] or ['English']
}

export interface GenerationResponse {
  success: boolean;
  data?: ListingOutput;
  error?: string;
  details?: string;
  meta?: {
    provider: string;
    model: string;
    durationMs: number;
    isSample?: boolean;
  };
}
