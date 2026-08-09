const TURNS = [
  {
    who: "client",
    text: "Bună ziua! Aș vrea o masă pentru 4 persoane, diseară pe la 8.",
  },
  {
    who: "elevio",
    text: "Bună seara! Verific imediat locurile disponibile… La 20:00 mai avem o masă liberă pentru 4 persoane. Vă rezerv?",
  },
  { who: "client", text: "Da, perfect, vă rog." },
  {
    who: "elevio",
    text: "Gata — rezervare confirmată, diseară la 20:00, 4 persoane. Primiți acum un SMS de confirmare.",
  },
];

export default function CallDemoCard() {
  return (
    <div className="w-full max-w-sm rounded-3xl border border-elevio-border bg-white p-5 shadow-xl shadow-elevio-accent/20">
      <div className="flex items-center justify-between border-b border-elevio-border pb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-elevio-dark/60">
            Apel live · DonCafe
          </span>
        </div>
        <span className="text-xs font-medium text-elevio-dark/40">21:47</span>
      </div>

      <div className="mt-4 space-y-3">
        {TURNS.map((turn, i) => (
          <div
            key={i}
            className={`flex ${turn.who === "elevio" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-snug ${
                turn.who === "elevio"
                  ? "bg-[linear-gradient(135deg,var(--color-elevio-accent),#0ea5e9)] text-white"
                  : "bg-elevio-secondary/40 text-elevio-dark"
              }`}
            >
              {turn.text}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-elevio-border bg-elevio-secondary/50 px-3 py-2 text-xs font-medium text-elevio-dark/80">
        <span className="text-emerald-600">●</span>
        Rezervare salvată automat, fără intervenție umană
      </div>
    </div>
  );
}
