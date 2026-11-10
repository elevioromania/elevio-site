// Constructori pentru datele structurate schema.org (JSON-LD) ale site-ului.
// Se randează cu componenta `@/components/JsonLd`.
import type { JsonLdObject } from "@/components/JsonLd";
import type { FaqItem } from "@/lib/faq";
import type { PricingTier } from "@/lib/pricing";
import { BRAND_NAME, DEFAULT_DESCRIPTION } from "./metadata";
import { SITE_URL, absoluteUrl } from "./routes";

const CONTEXT = "https://schema.org";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
const CONTACT_EMAIL = "elevioromania@gmail.com";

export function organizationJsonLd(): JsonLdObject {
  return {
    "@context": CONTEXT,
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: BRAND_NAME,
    alternateName: ["Elevio", "Elevio Agency"],
    url: SITE_URL,
    // Nu avem încă un fișier de logo în public/; folosim imaginea Open Graph
    // generată de src/app/opengraph-image.tsx.
    logo: absoluteUrl("/opengraph-image"),
    image: absoluteUrl("/opengraph-image"),
    description: DEFAULT_DESCRIPTION,
    disambiguatingDescription:
      "Elevio AI (elevio-agency.ro) este un recepționer vocal AI pentru firme din România. Nu are legătură cu platforma școlară Elevio (elevio.ro), cu Elevio (elev.io), cu elevio-ai.com sau cu Levio Health.",
    email: CONTACT_EMAIL,
    areaServed: { "@type": "Country", name: "România", identifier: "RO" },
    knowsLanguage: ["ro", "en"],
    // Profilurile oficiale; adaugă aici YouTube / Facebook când există.
    sameAs: [
      "https://www.linkedin.com/company/144838334",
      "https://www.crunchbase.com/organization/elevio-ai",
    ],
    founder: {
      "@type": "Person",
      name: "David Morega",
      jobTitle: "Fondator",
      sameAs: ["https://www.linkedin.com/in/david-morega/"],
    },
  };
}

export function websiteJsonLd(): JsonLdObject {
  return {
    "@context": CONTEXT,
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: BRAND_NAME,
    alternateName: "elevio-agency.ro",
    url: SITE_URL,
    inLanguage: "ro",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/** Prețul numeric dintr-un șir ca "150€" sau "1.200€". */
function priceNumber(price: string): number {
  return Number(price.replace(/[^\d]/g, ""));
}

/** Serviciul cu ofertele construite din planurile reale (`PRICING_TIERS`). */
export function receptionistServiceJsonLd(tiers: PricingTier[]): JsonLdObject {
  return {
    "@context": CONTEXT,
    "@type": "Service",
    "@id": `${SITE_URL}/preturi#service`,
    name: "Elevio AI, recepționer vocal AI în limba română",
    serviceType: "Recepționer vocal AI",
    description: DEFAULT_DESCRIPTION,
    url: absoluteUrl("/preturi"),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "Country", name: "România", identifier: "RO" },
    availableLanguage: "ro",
    offers: tiers.map((tier) => {
      const price = priceNumber(tier.price);
      return {
        "@type": "Offer",
        name: tier.name,
        description: `${tier.tagline}. ${tier.calls}. Preț de la ${price} EUR/lună + TVA, plus taxă de implementare.`,
        url: absoluteUrl("/preturi"),
        price,
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price,
          priceCurrency: "EUR",
          unitText: "lună",
          referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
          valueAddedTaxIncluded: false,
        },
        seller: { "@id": ORGANIZATION_ID },
      };
    }),
  };
}

/** FAQPage din același array pe care îl afișează componenta FAQ. */
export function faqPageJsonLd(items: FaqItem[]): JsonLdObject {
  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export type Crumb = { name: string; path: string };

/**
 * BreadcrumbList pentru o subpagină. „Acasă” e adăugat automat primul:
 * breadcrumbJsonLd([{ name: "Prețuri", path: "/preturi" }]).
 */
export function breadcrumbJsonLd(crumbs: Crumb[]): JsonLdObject {
  const all: Crumb[] = [{ name: "Acasă", path: "/" }, ...crumbs];
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: all.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
