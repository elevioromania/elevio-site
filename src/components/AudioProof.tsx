import AudioPlayer from "./AudioPlayer";

export default function AudioProof() {
  return (
    <section className="py-16">
      <div className="container-elevio">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-3xl border border-elevio-border bg-white p-8 text-center shadow-sm sm:p-10">
          <span className="inline-flex items-center rounded-full bg-elevio-secondary/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-elevio-primary">
            Apel real
          </span>
          <h2 className="text-balance text-2xl font-extrabold tracking-tight text-elevio-dark sm:text-3xl">
            Cât de repede răspunde agentul AI?
          </h2>
          <p className="max-w-xl text-elevio-dark/70">
            Fragment din conversația cu unul dintre agenții noștri AI pentru
            restaurante.
          </p>

          <div className="w-full max-w-md">
            <AudioPlayer src="/audio/agent-call-sample.m4a" />
          </div>
        </div>
      </div>
    </section>
  );
}
