import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Elevio — Niciun apel ratat. Niciun client pierdut.",
  description:
    "Recepționer vocal AI în limba română, disponibil 24/7. Elevio preia apelurile afacerii tale, răspunde clienților și nu improvizează niciodată.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ro" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-elevio-bg text-elevio-dark">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
