// FAQ vizibil integral (întrebare + răspuns în HTML), în stilul componentei FAQ.
// Aceleași întrebări alimentează schema FAQPage de pe pagină.
export default function FaqIndustrie({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-elevio-border rounded-2xl border border-elevio-border bg-white shadow-sm">
      {items.map((item) => (
        <div key={item.q} className="px-6 py-5">
          <h3 className="text-sm font-semibold text-elevio-dark">{item.q}</h3>
          <p className="mt-2 text-sm leading-relaxed text-elevio-dark/70">
            {item.a}
          </p>
        </div>
      ))}
    </div>
  );
}
