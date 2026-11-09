import Link from "next/link";

export default function Breadcrumbs({
  items,
}: {
  items: { nume: string; cale?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-elevio-dark/50">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.nume} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">›</span>}
            {item.cale ? (
              <Link
                href={item.cale}
                className="font-medium hover:text-elevio-dark"
              >
                {item.nume}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-elevio-dark/80">
                {item.nume}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
