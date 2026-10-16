import { ListingInput, ListingOutput } from "../types/listing";

// High-fidelity self-contained SVG Data URI for an Artisan Brass Diya
const BRASS_DIYA_IMAGE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="%23FFF8F0"/>
      <stop offset="100%" stop-color="%23EDE3D5"/>
    </radialGradient>
    <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23F3D079"/>
      <stop offset="25%" stop-color="%23D8A33A"/>
      <stop offset="50%" stop-color="%23FFEBB3"/>
      <stop offset="75%" stop-color="%23B27B1E"/>
      <stop offset="100%" stop-color="%2385550C"/>
    </linearGradient>
    <radialGradient id="flameGrad" cx="50%" cy="80%" r="60%">
      <stop offset="0%" stop-color="%23FFF7C2"/>
      <stop offset="40%" stop-color="%23FF9900"/>
      <stop offset="100%" stop-color="%23FF3300" stop-opacity="0"/>
    </radialGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="16" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="800" height="800" rx="32" fill="url(%23bgGrad)"/>
  
  <!-- Subtle circular pedestal shadow -->
  <ellipse cx="400" cy="620" rx="220" ry="40" fill="%23C7B9A5" opacity="0.4" filter="blur(8px)"/>
  
  <!-- Diya Base Stand -->
  <path d="M 280 580 Q 400 630 520 580 L 490 610 Q 400 645 310 610 Z" fill="url(%23brassGrad)"/>
  <ellipse cx="400" cy="570" rx="140" ry="24" fill="%23A16F1A"/>
  
  <!-- Central Stem -->
  <path d="M 370 565 C 365 490 380 440 375 390 L 425 390 C 420 440 435 490 430 565 Z" fill="url(%23brassGrad)"/>
  <ellipse cx="400" cy="470" rx="40" ry="12" fill="%23F0C76B"/>

  <!-- Upper Diya Bowl -->
  <path d="M 230 380 Q 400 460 570 380 Q 590 350 560 340 Q 400 370 240 340 Q 210 350 230 380 Z" fill="url(%23brassGrad)"/>
  <ellipse cx="400" cy="350" rx="170" ry="32" fill="%237A4B0A"/>
  <ellipse cx="400" cy="354" rx="150" ry="24" fill="%23D1972E"/>
  
  <!-- Engraved Petal Details -->
  <path d="M 320 375 Q 400 410 480 375" stroke="%23FFE8A3" stroke-width="4" fill="none" opacity="0.8"/>
  <path d="M 340 395 Q 400 425 460 395" stroke="%237A4B0A" stroke-width="3" fill="none" opacity="0.6"/>

  <!-- Flame Glow & Flame -->
  <circle cx="400" cy="270" r="90" fill="url(%23flameGrad)" filter="url(%23glow)" opacity="0.85"/>
  <path d="M 400 170 Q 440 260 415 310 Q 400 325 385 310 Q 360 260 400 170 Z" fill="%23FFB733"/>
  <path d="M 400 210 Q 420 270 408 300 Q 400 308 392 300 Q 380 270 400 210 Z" fill="%23FFFFFF"/>

  <!-- Brand badge -->
  <rect x="290" y="700" width="220" height="42" rx="21" fill="%231C1917" opacity="0.85"/>
  <text x="400" y="726" font-family="sans-serif" font-size="14" font-weight="600" fill="%23FFFFFF" text-anchor="middle" letter-spacing="2">AUTHENTIC BRASSWORK</text>
</svg>`;

export interface SampleProductItem {
  id: string;
  name: string;
  badge: string;
  input: ListingInput;
  output: ListingOutput;
}

export const SAMPLE_PRODUCTS: SampleProductItem[] = [
  {
    id: "brass-diya",
    name: "Handcrafted Antique Brass Diya (Floral Engraved)",
    badge: "Sample: Handcrafted Home & Decor",
    input: {
      imageDataUrl: BRASS_DIYA_IMAGE_SVG,
      productName: "Traditional Floral Carved Brass Diya",
      category: "Home and Kitchen",
      knownFeatures: "Solid cast brass with antique golden finish. Intricate hand-carved floral motifs on base and stem. Steady broad pedestal base.",
      targetAudience: "Festive pooja decor, Diwali gifting, housewarming celebrations, spiritual home shrines.",
      price: "₹1,249",
      brandName: "KalaKriti Brassworks",
      tone: "Premium",
      primaryLanguage: "English",
      translationLanguages: ["Hindi"],
    },
    output: {
      title: "Handcrafted Antique Brass Diya with Intricate Floral Engraving (Pooja & Festive Decor)",
      description: "Elevate your sacred rituals and festive home aesthetics with this exquisitely carved antique brass diya from KalaKriti Brassworks.\n\nFeaturing an ornate central stem, handcrafted floral etchings, and a broad, balanced pedestal base, this timeless lamp emits a warm, serene glow across living spaces, prayer altars, and festive entryways. Ideal as a meaningful housewarming gift or centerpiece for Diwali celebrations.",
      keywords: [
        "brass diya for pooja",
        "antique brass oil lamp",
        "handcrafted diwali decor",
        "traditional brass lamp",
        "housewarming pooja gift",
        "temple altar brassware",
        "festive home lighting india",
        "kalakriti brassworks"
      ],
      socialCaption: "✨ Bring home the warmth of timeless tradition. \n\nOur Handcrafted Antique Brass Diya is meticulously sculpted with floral motifs to bring serenity and elegance to your daily rituals and festive corners.\n\n🕯️ Solid cast brass with antique patina\n🪔 Balanced pedestal for steady, safe lighting\n🎁 Thoughtful housewarming & festive gift\n\n💰 Special Price: ₹1,249\n👉 Tap link in bio or DM us with 'DIYA' to place your order today! Limited artisan batches available.\n\n#BrassDiya #PoojaDecor #IndianHandicrafts #DiwaliDecor #HomeShrine #TraditionalCrafts #ArtisanBrass",
      whatsappMessage: "Namaste! 🙏 Welcome to *KalaKriti Brassworks*.\n\nHere are the details for our *Handcrafted Antique Brass Diya*:\n\n✨ *Product Highlights*:\n• Premium cast brass with durable antique gold luster\n• Intricately carved floral detailing on stem & bowl\n• Broad, sturdy base designed for safe daily lighting\n• Perfect for Diwali, pooja rooms, and spiritual gifting\n\n💵 *Price*: ₹1,249 (Free festive gift packaging included)\n📦 *Shipping*: Dispatches within 24–48 hours across India.\n\nWould you like us to reserve a piece for your home or send payment details? Simply reply with *YES*! 😊",
      translations: {
        Hindi: {
          language: "Hindi",
          title: "पारंपरिक नक्काशीदार पीतल का दीया (पूजा एवं उत्सव गृह सज्जा)",
          description: "कलाकृति ब्रासवर्क्स के इस नक्काशीदार प्राचीन पीतल के दीये के साथ अपने पूजा स्थल और घर को पावन प्रकाश से आलोकित करें।\n\nमजबूत पीतल से ढला और बारीक फूलों की नक्काशी से सजा यह दीया आपके दैनिक पूजन, दिवाली और गृहप्रवेश के पावन अवसरों के लिए अत्यंत शुभ और भव्य है। इसका चौड़ा आधार स्थिरता और सुरक्षा प्रदान करता है।",
          socialCaption: "✨ परंपरा और श्रद्धा का दिव्य प्रकाश!\n\nकलाकृति ब्रासवर्क्स का हस्तनिर्मित एंटीक पीतल का दीया आपके घर के मंदिर और उत्सवों को अलौकिक शोभा प्रदान करता है।\n\n🪔 टिकाऊ प्राचीन स्वर्णिम चमक\n🪔 सुरक्षित एवं संतुलित आधार\n🎁 गृहप्रवेश और उपहार हेतु उत्तम\n\nमूल्य: मात्र ₹1,249\nऑर्डर करने के लिए अभी DM करें या बायो में दिए लिंक पर क्लिक करें!\n\n#पीतलकादीया #पूजासज्जा #दिवालीउपहार #भारतीयशिल्प",
          whatsappMessage: "नमस्ते! 🙏 *कलाकृति ब्रासवर्क्स* में आपका स्वागत है।\n\nहमारे *पारंपरिक नक्काशीदार पीतल के दीये* का विवरण:\n\n✨ *मुख्य विशेषताएं*:\n• शुद्ध एवं टिकाऊ पीतल से निर्मित प्राचीन फिनिश\n• हस्तनिर्मित फूलों की सुंदर नक्काशी\n• पूजा, मंदिर और दिवाली उत्सव के लिए सर्वोत्तम\n\n💵 *मूल्य*: ₹1,249\n📦 *डिलीवरी*: पूरे भारत में सुरक्षित पैकेजिंग के साथ उपलब्ध।\n\nक्या आप अपना ऑर्डर बुक करना चाहते हैं? कृपया *हाँ* लिखकर उत्तर दें! 😊"
        }
      },
      missingDetails: [
        "Exact height and diameter (in inches or cm) — please measure and add to dimensions before publishing.",
        "Total net weight in grams — important for courier shipping calculation.",
        "Care instructions — clarify whether to use pitambari powder, lemon/salt, or a dry soft microfiber cloth."
      ],
      detectedVisualFeatures: [
        "Warm lustrous golden-tone brass alloy with satin antique finish",
        "Fluted bowl with raised petal relief accents",
        "Multi-tiered stepped pedestal base for stability",
        "Single elevated wick burner spout"
      ]
    }
  }
];
