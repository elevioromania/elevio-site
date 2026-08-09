import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Contact — Elevio",
  description: "Scrie-ne sau cere un apel demo de la Elevio.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Hai să vorbim"
        text="Completează formularul pentru un apel demo, sau scrie-ne direct pe email."
      />

      <section className="py-16">
        <div className="container-elevio grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-2xl font-bold text-elevio-dark">
              Date de contact
            </h2>
            <div className="mt-6 space-y-4 text-sm text-elevio-dark/75">
              <p>
                <span className="block font-semibold text-elevio-dark">
                  Email
                </span>
                <a
                  href="mailto:elevioromania@gmail.com"
                  className="text-elevio-primary hover:text-elevio-dark"
                >
                  elevioromania@gmail.com
                </a>
              </p>
              <p>
                Răspundem în aceeași zi lucrătoare. Pentru cel mai rapid mod
                de a auzi cum sună Elevio, folosește formularul — te sunăm
                imediat.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-elevio-border bg-white p-6 shadow-xl shadow-elevio-primary/10 sm:p-8">
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
