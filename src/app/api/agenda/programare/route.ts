import { dateAgenda, noteazaEmail, salveazaCerere } from "@/lib/agenda/baza";
import { ocupare, propuneOre, semnaleazaCalendare } from "@/lib/agenda/agenda";
import { trimiteCerere } from "@/lib/agenda/email";
import { NEAUTORIZAT, cheieDin, citesteCorp, raspuns, valoare } from "@/lib/agenda/http";
import { gasesteMedici, oreLibere } from "@/lib/agenda/ore-libere";
import { cheieZi, citesteOra, dinOraLocala, interpreteazaZi, textOra } from "@/lib/agenda/timp";

// Tool-ul „trimite_cerere_programare” al agentului vocal: verifică încă o dată ora aleasă,
// o ține pe numele pacientului și trimite mail recepției, care o trece de mână în iStoma.
//
// Corp (JSON): nume, telefon?, telefon_apelant, motiv, medic?, data?, ora?, observatii?, call_id
// Fără medic / dată / oră, cererea ajunge la recepție ca „pacient de sunat pentru programare”.

export async function POST(request: Request) {
  const cheie = cheieDin(request);
  if (!cheie) return NEAUTORIZAT();
  const corp = await citesteCorp(request);

  const date = await dateAgenda(cheie).catch(() => null);
  if (!date) return NEAUTORIZAT();
  const fus = date.clinica.fus_orar;

  const nume = valoare(corp.nume);
  const telefon = valoare(corp.telefon) || valoare(corp.telefon_apelant);
  const motiv = valoare(corp.motiv);
  const observatii = valoare(corp.observatii);
  const callId = valoare(corp.call_id);

  if (nume.length < 2) {
    return raspuns({ ok: false, mesaj: "Lipsește numele pacientului. Întreabă-l cum îl cheamă, apoi trimite din nou." });
  }
  if (telefon.replace(/\D/g, "").length < 9) {
    return raspuns({ ok: false, mesaj: "Lipsește numărul de telefon. Întreabă-l pe pacient la ce număr îl poate suna recepția." });
  }

  const textMedic = valoare(corp.medic);
  const ziua = interpreteazaZi(valoare(corp.data), Date.now(), fus);
  const minut = citesteOra(valoare(corp.ora));
  const cuOra = Boolean(textMedic && ziua && minut !== null);

  let medic = null as (typeof date.medici)[number] | null;
  let inceput: number | null = null;
  let sfarsit: number | null = null;
  let verificata = false;

  if (cuOra && ziua && minut !== null) {
    const gasiti = gasesteMedici(date.medici, textMedic);
    if (gasiti.length !== 1) {
      return raspuns({
        ok: false,
        mesaj:
          `Nu știu sigur la ce medic: „${textMedic}”. Medicii clinicii sunt: ${date.medici.map((m) => m.nume).join(", ")}. ` +
          "Trimite din nou cu numele medicului exact ca în varianta aleasă.",
      });
    }
    const ales = gasiti[0];
    medic = ales;
    inceput = dinOraLocala(ziua.an, ziua.luna, ziua.zi, Math.floor(minut / 60), minut % 60, fus).getTime();
    sfarsit = inceput + date.clinica.durata_minute * 60_000;

    const acum = Date.now();
    const ocup = await ocupare({ ...date, medici: [ales] }, acum, callId);
    await semnaleazaCalendare(cheie, date, ocup);

    // Fără calendar putem verifica măcar programul medicului; ora rămâne de confirmat de recepție.
    const cuCalendar = ocup.ocupate.has(ales.id);
    const ocupate = cuCalendar ? ocup.ocupate : new Map([[ales.id, ocup.sarbatori]]);
    const libera = oreLibere(date.clinica, [ales], ocupate, acum).some((o) => o.inceput === inceput);
    if (!libera) {
      const { variante } = await propuneOre(cheie, date, [ales], ocup, acum, callId, {
        ziPreferata: cheieZi(ziua.an, ziua.luna, ziua.zi),
        parte: "oricand",
      });
      return raspuns({
        ok: false,
        ocupat: true,
        variante,
        mesaj:
          "Ora aleasă nu mai e liberă (sau nu e în programul medicului). " +
          (variante.length > 0
            ? "Spune-i pacientului și propune-i variantele de aici."
            : "Spune-i pacientului, întreabă-l ce alte zile și ore îi convin și trimite cererea fără dată și oră, cu preferințele la observații."),
      });
    }
    verificata = cuCalendar;
  }

  const salvata = await salveazaCerere(cheie, {
    callId,
    medicId: medic?.id ?? null,
    inceput: inceput !== null ? new Date(inceput).toISOString() : null,
    sfarsit: sfarsit !== null ? new Date(sfarsit).toISOString() : null,
    nume,
    telefon,
    motiv,
    observatii,
  }).catch((e: unknown) => ({ ok: false as const, motiv: "eroare" as const, eroare: e }));

  if (!salvata.ok && salvata.motiv === "ocupat") {
    return raspuns({
      ok: false,
      ocupat: true,
      variante: [],
      mesaj: "Altcineva tocmai a cerut aceeași oră. Cere din nou orele libere și propune-i pacientului altă variantă.",
    });
  }

  const oraFormatata = inceput !== null ? textOra(new Date(inceput), fus) : null;
  const email = await trimiteCerere({
    clinica: date.clinica.nume,
    emailReceptie: date.clinica.email_receptie,
    nume,
    telefon,
    motiv,
    observatii,
    medic: medic?.nume ?? (textMedic || null),
    oraText: oraFormatata,
    verificata,
    callId,
  });
  if (salvata.ok) await noteazaEmail(cheie, salvata.id, email.ok ? null : (email.error ?? "eroare necunoscută")).catch(() => undefined);
  if (!email.ok) console.error("[agenda] mailul către recepție nu a plecat:", email.error);

  if (!salvata.ok && !email.ok) {
    return raspuns({
      ok: false,
      mesaj:
        "Cererea nu a putut fi trimisă. Cere-i scuze pacientului și spune-i că e mai sigur să sune la recepție în programul clinicii.",
    });
  }

  return raspuns({
    ok: true,
    mesaj: oraFormatata
      ? `Cererea e trimisă recepției. Spune-i pacientului: am notat programarea pentru ${oraFormatata}, la ${medic?.nume}; ` +
        "colega de la recepție vă confirmă în cel mai scurt timp. Nu spune că programarea e deja confirmată."
      : "Cererea e trimisă recepției. Spune-i pacientului că o colegă de la recepție îl sună pentru programare în cel mai scurt timp.",
  });
}
