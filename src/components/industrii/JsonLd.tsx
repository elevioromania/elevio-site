// Date structurate (JSON-LD), randate pe server.
// „<” e escapat ca să nu poată închide tag-ul <script> din conținut.

type JsonLdObject = Record<string, unknown>;

export const SITE_URL = "https://elevio-agency.ro";

export default function JsonLd({
  data,
}: {
  data: JsonLdObject | JsonLdObject[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** BreadcrumbList din perechi nume → cale relativă („/industrii”). */
export function breadcrumbLd(items: { nume: string; cale: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.nume,
      item: `${SITE_URL}${item.cale === "/" ? "" : item.cale}`,
    })),
  };
}
