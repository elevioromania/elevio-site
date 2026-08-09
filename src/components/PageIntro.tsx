export default function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <section className="border-b border-elevio-border/70 bg-white/50">
      <div className="container-elevio py-16 text-center">
        <span className="text-xs font-bold uppercase tracking-wide text-elevio-primary">
          {eyebrow}
        </span>
        <h1 className="mx-auto mt-3 max-w-2xl text-balance text-4xl font-extrabold tracking-tight text-elevio-dark sm:text-5xl">
          {title}
        </h1>
        {text && (
          <p className="mx-auto mt-4 max-w-xl text-elevio-dark/70">{text}</p>
        )}
      </div>
    </section>
  );
}
