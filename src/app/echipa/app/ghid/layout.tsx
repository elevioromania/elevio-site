import CautareGhid from "@/echipa/components/CautareGhid";
import CuprinsGhid from "@/echipa/components/CuprinsGhid";
import { cuprins, indexCautare } from "@/echipa/lib/ghid-date";

export default function GhidLayout({ children }: { children: React.ReactNode }) {
  const parti = cuprins();
  return (
    <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-10">
      <aside className="hidden lg:block">
        <div className="sticky top-8 max-h-[calc(100vh-4rem)] space-y-5 overflow-y-auto pb-8">
          <CautareGhid intrari={indexCautare()} />
          <CuprinsGhid parti={parti} />
        </div>
      </aside>
      <div className="min-w-0">
        <div className="mb-5 space-y-3 lg:hidden">
          <CautareGhid intrari={indexCautare()} />
          <details className="rounded-2xl border border-echipa-line bg-echipa-card">
            <summary className="cursor-pointer select-none px-4 py-3 text-sm font-semibold">Cuprins</summary>
            <div className="border-t border-echipa-line px-2 py-3">
              <CuprinsGhid parti={parti} />
            </div>
          </details>
        </div>
        {children}
      </div>
    </div>
  );
}
