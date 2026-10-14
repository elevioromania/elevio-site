// Efect scurt de confetti, fără biblioteci externe. Respectă „reduce motion”.
export function lanseazaConfetti() {
  if (typeof window === "undefined") return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:100";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas.remove();

  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);

  const culori = ["#38bdf8", "#ecf5fa", "#22c55e", "#7dd3fc", "#facc15"];
  const w = window.innerWidth;
  const h = window.innerHeight;
  const bucati = Array.from({ length: 140 }, (_, i) => {
    const stanga = i % 2 === 0;
    return {
      x: stanga ? 0 : w,
      y: h * 0.7,
      vx: (stanga ? 1 : -1) * (4 + Math.random() * 7),
      vy: -(9 + Math.random() * 9),
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      l: 6 + Math.random() * 6,
      c: culori[i % culori.length],
    };
  });

  const start = performance.now();
  function cadru(t: number) {
    const trecut = t - start;
    ctx!.clearRect(0, 0, w, h);
    for (const b of bucati) {
      b.vy += 0.35;
      b.vx *= 0.99;
      b.x += b.vx;
      b.y += b.vy;
      b.r += b.vr;
      ctx!.save();
      ctx!.globalAlpha = Math.max(0, 1 - trecut / 2200);
      ctx!.translate(b.x, b.y);
      ctx!.rotate(b.r);
      ctx!.fillStyle = b.c;
      ctx!.fillRect(-b.l / 2, -b.l / 4, b.l, b.l / 2);
      ctx!.restore();
    }
    if (trecut < 2200) requestAnimationFrame(cadru);
    else canvas.remove();
  }
  requestAnimationFrame(cadru);
}
