import { ImageResponse } from "next/og";

// Imaginea Open Graph a site-ului (1200×630), generată la build.
// Culorile vin din src/app/globals.css (--color-elevio-*). Fontul implicit al
// ImageResponse (Geist) are diacriticele românești (ă, â, î, ș, ț).
export const alt = "Elevio AI, recepționer vocal AI în limba română, 24/7";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COLORS = {
  dark: "#05070c",
  accent: "#38bdf8",
  secondary: "#e0f2fe",
  border: "#bae6fd",
};

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `radial-gradient(circle at 15% 0%, rgba(56, 189, 248, 0.35), ${COLORS.dark} 55%)`,
          backgroundColor: COLORS.dark,
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="66" height="56" viewBox="0 0 100 84">
            <polygon points="16,58 50,44 84,58 50,72" fill="#33363b" />
            <polygon points="16,42 50,28 84,42 50,56" fill="#63676d" />
            <polygon points="16,26 50,12 84,26 50,40" fill="#9aa0a6" />
          </svg>
          <div
            style={{
              display: "flex",
              padding: "10px 24px",
              borderRadius: 999,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: COLORS.accent,
              fontSize: 24,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Recepționer vocal AI · România
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              lineHeight: 1,
              letterSpacing: -4,
              color: "white",
            }}
          >
            Elevio <span style={{ color: COLORS.accent, marginLeft: 28 }}>AI</span>
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 46,
              lineHeight: 1.2,
              color: COLORS.secondary,
            }}
          >
            Recepționer vocal AI în limba română · 24/7
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `2px solid rgba(186, 230, 253, 0.25)`,
            paddingTop: 28,
            fontSize: 30,
            color: COLORS.border,
          }}
        >
          <span>elevio-agency.ro</span>
          <span style={{ color: COLORS.accent }}>Niciun apel ratat.</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
