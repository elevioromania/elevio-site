/** Pașii numerotați, în stilul HowItWorks. */
export default function StepsGrid({
  steps,
}: {
  steps: { title: string; text: string }[];
}) {
  return (
    <ol className="grid gap-8 md:grid-cols-3">
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="group rounded-2xl border border-elevio-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-elevio-accent/10"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-elevio-primary text-sm font-bold text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-elevio-accent group-hover:text-elevio-dark">
            {i + 1}
          </div>
          <h3 className="mt-4 text-lg font-semibold text-elevio-dark">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-elevio-dark/70">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
