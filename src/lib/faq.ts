export type FaqItem = { q: string; a: string };

// Sursa unică pentru întrebările frecvente: componenta FAQ le afișează, iar
// schema FAQPage (JSON-LD) se generează din același array, deci textul din
// schema e mereu identic cu cel de pe pagină.
export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Trebuie să îmi schimb numărul de telefon?",
    a: "Nu. Elevio preia apelurile pe numărul tău existent — clienții tăi sună exact ca până acum, nu observă nicio schimbare în afară de faptul că cineva răspunde mereu.",
  },
  {
    q: "Cât de natural sună vocea?",
    a: "Foarte natural — vorbește română fluentă, cu intonație firească, ton cald și profesionist. Cei mai mulți clienți nu își dau seama din prima că vorbesc cu un asistent AI.",
  },
  {
    q: "Ce se întâmplă dacă Elevio nu poate răspunde la o întrebare?",
    a: "Nu improvizează niciodată. Dacă nu are un răspuns sigur, transferă apelul direct pe telefonul tău, în câteva secunde — sau, dacă nu răspunzi, spune politicos că cineva va reveni cu un răspuns.",
  },
  {
    q: "Se integrează cu calendarul meu?",
    a: "Da — Elevio poate verifica disponibilitatea în timp real și crea rezervări direct în calendarul tău (Cal.com, Calendly).",
  },
  {
    q: "Cât durează implementarea?",
    a: "În general, de la primul apel de configurare la lansare durează câteva zile — adaptăm Elevio pe serviciile, programul și regulile afacerii tale.",
  },
  {
    q: "Pot renunța oricând?",
    a: "Da. Nu există obligații pe termen lung — poți renunța oricând, fără penalizări.",
  },
];
