import RichText from "./RichText";

/** Grilă de carduri titlu + text, în stilul Features. */
export default function CardGrid({
  items,
  columns = 3,
}: {
  items: { title: string; text: string }[];
  columns?: 2 | 3;
}) {
  return (
    <div
      className={`grid gap-6 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}
    >
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-elevio-border bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <h3 className="text-base font-semibold text-elevio-dark">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-elevio-dark/70">
            <RichText text={item.text} />
          </p>
        </div>
      ))}
    </div>
  );
}
