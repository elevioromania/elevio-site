"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/", label: "Acasă" },
  { href: "/preturi", label: "Prețuri" },
  { href: "/despre", label: "Despre" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-elevio-dark/95 backdrop-blur">
      <div className="container-elevio flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-elevio-accent ${
                  active ? "text-elevio-accent" : "text-white/75"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/demo"
            className="rounded-full bg-elevio-accent px-5 py-2.5 text-sm font-semibold text-elevio-dark shadow-sm transition-colors hover:bg-white"
          >
            Cere un demo
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Închide meniul" : "Deschide meniul"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-white md:hidden"
        >
          <span className="sr-only">Meniu</span>
          <div className="flex h-4 w-6 flex-col justify-between">
            <span
              className={`block h-0.5 w-full bg-current transition-transform duration-200 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-current transition-transform duration-200 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden ${open ? "block" : "hidden"} border-t border-white/10 bg-elevio-dark`}
      >
        <nav className="container-elevio flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-3 text-base font-medium ${
                  active
                    ? "bg-white/10 text-elevio-accent"
                    : "text-white/80 hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/demo"
            className="mt-2 rounded-full bg-elevio-accent px-5 py-3 text-center text-base font-semibold text-elevio-dark shadow-sm"
          >
            Cere un demo
          </Link>
        </nav>
      </div>
    </header>
  );
}
