// Helper local pentru JSON-LD. Va fi unificat cu helperul comun al site-ului.
// Escapăm „<” ca < (recomandarea din ghidul Next.js), ca un text din date
// să nu poată închide tag-ul <script>.

export type JsonLdData = Record<string, unknown> | Record<string, unknown>[];

export function serializeJsonLd(data: JsonLdData): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
