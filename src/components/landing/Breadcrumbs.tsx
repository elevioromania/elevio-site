import Link from "next/link";
import type { Crumb } from "./types";

/** Breadcrumbs vizibile. Același array se dă și la breadcrumbSchema(). */
export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-elevio-dark/50">
      <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="font-medium text-elevio-dark/70">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.path} className="hover:text-elevio-primary">
                    {c.name}
                  </Link>
                  <span aria-hidden="true">›</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
