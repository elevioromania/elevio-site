// Date structurate (schema.org) într-un <script type="application/ld+json">.
// Componentă de server: JSON-ul ajunge direct în HTML-ul randat.
//
// `<` e înlocuit cu <, ca un text din date să nu poată închide tagul
// <script> (recomandarea din ghidul JSON-LD al Next.js).
export type JsonLdObject = Record<string, unknown>;

export function serializeJsonLd(data: JsonLdObject): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(item) }}
        />
      ))}
    </>
  );
}
