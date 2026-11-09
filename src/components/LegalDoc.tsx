import PageIntro from "./PageIntro";
import JsonLd from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/schema";

export const LEGAL_CONTACT_EMAIL = "elevioromania@gmail.com";

export function LegalDoc({
  title,
  path,
  updated,
  children,
}: {
  title: string;
  /** Calea paginii ("/termeni"), pentru BreadcrumbList. */
  path: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: title, path }])} />
      <PageIntro eyebrow="Informații legale" title={title} text={`Ultima actualizare: ${updated}`} />
      <section className="py-16">
        <div className="container-elevio">
          <div className="mx-auto max-w-3xl space-y-4 leading-relaxed text-elevio-dark/75 [&_a]:font-medium [&_a]:text-elevio-primary [&_a]:underline [&_a]:underline-offset-2 [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-elevio-dark [&_ul]:space-y-2">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}

export function LegalHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="pt-6 text-xl font-bold text-elevio-dark">{children}</h2>;
}
