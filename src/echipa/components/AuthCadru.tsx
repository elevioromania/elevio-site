import { Logo } from "./ui";
import { SUPABASE_CONFIGURAT } from "../lib/supabase-env";

export default function AuthCadru({
  titlu,
  subtitlu,
  children,
}: {
  titlu: string;
  subtitlu?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Logo />
        </div>
        <div className="rounded-3xl border border-echipa-line/70 bg-echipa-card p-6 shadow-[0_0_60px_-20px_rgba(56,189,248,0.35)] sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight">{titlu}</h1>
          {subtitlu && <p className="mt-1.5 text-sm text-echipa-muted">{subtitlu}</p>}
          <div className="mt-6">
            {SUPABASE_CONFIGURAT ? (
              children
            ) : (
              <p className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                Platforma nu e configurată încă. Lipsesc variabilele Supabase (vezi PLATFORMA-README.md).
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
