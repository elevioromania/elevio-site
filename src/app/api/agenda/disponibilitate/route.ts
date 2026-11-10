import { dateAgenda } from "@/lib/agenda/baza";
import { ocupare, propuneOre, semnaleazaCalendare } from "@/lib/agenda/agenda";
import { NEAUTORIZAT, cheieDin, citesteCorp, raspuns, valoare } from "@/lib/agenda/http";
import { gasesteMedici, normalizeaza, type PartiZi } from "@/lib/agenda/ore-libere";
import { cheieZi, interpreteazaZi } from "@/lib/agenda/timp";

// Tool-ul „verifica_disponibilitate” al agentului vocal: 2-3 ore libere de propus pacientului.
//
// Corp (JSON): medic?, data? (AAAA-LL-ZZ sau „joi”, „mâine”, „12 noiembrie”), interval? (dimineata | dupa-amiaza | oricand), call_id
// Antet: x-agenda-cheie: <cheia clinicii>

const ORICE_MEDIC = /^(oricare|orice|oricine|nu conteaza|indiferent|primul liber|primul disponibil|nu stiu)$/;

function parteaZilei(text: string): PartiZi {
  const t = normalizeaza(text);
  if (t.startsWith("dimin")) return "dimineata";
  if (t.startsWith("dupa") || t.startsWith("seara") || t.startsWith("pranz")) return "dupa-amiaza";
  return "oricand";
}

export async function POST(request: Request) {
  const cheie = cheieDin(request);
  if (!cheie) return NEAUTORIZAT();
  const corp = await citesteCorp(request);

  const date = await dateAgenda(cheie).catch(() => null);
  if (!date) return NEAUTORIZAT();

  const acum = Date.now();
  const callId = valoare(corp.call_id);
  const textMedic = valoare(corp.medic);

  let medici = date.medici;
  if (textMedic && !ORICE_MEDIC.test(normalizeaza(textMedic))) {
    const gasiti = gasesteMedici(date.medici, textMedic);
    if (gasiti.length === 0) {
      return raspuns({
        ok: false,
        variante: [],
        mesaj:
          `La clinică nu lucrează un medic „${textMedic}”. Medicii clinicii sunt: ` +
          `${date.medici.map((m) => m.nume + (m.specialitate ? ` (${m.specialitate})` : "")).join(", ")}. ` +
          "Spune-i pacientului și întreabă-l la care dintre ei vrea, sau caută fără medic.",
      });
    }
    medici = gasiti;
  }

  const ocup = await ocupare({ ...date, medici }, acum, callId);
  await semnaleazaCalendare(cheie, date, ocup);

  if (ocup.faraCalendar.length === medici.length) {
    return raspuns({
      ok: false,
      variante: [],
      mesaj:
        "Agenda nu se poate vedea acum. Spune-i pacientului că recepția îl sună pentru programare, " +
        "întreabă-l ce zile și ore îi convin și trimite cererea fără dată și oră, cu preferințele lui la observații.",
    });
  }

  const ziua = interpreteazaZi(valoare(corp.data), acum, date.clinica.fus_orar);
  const { variante, nota } = await propuneOre(cheie, date, medici, ocup, acum, callId, {
    ziPreferata: ziua ? cheieZi(ziua.an, ziua.luna, ziua.zi) : null,
    parte: parteaZilei(valoare(corp.interval)),
  });

  if (variante.length === 0) {
    return raspuns({
      ok: true,
      variante: [],
      mesaj:
        `Nu sunt ore libere în următoarele ${date.clinica.zile_inainte} zile` +
        (medici.length < date.medici.length ? ` la ${medici.map((m) => m.nume).join(", ")}` : "") +
        ". Spune-i pacientului că recepția îl sună pentru programare și trimite cererea fără dată și oră.",
    });
  }

  return raspuns({
    ok: true,
    variante,
    mesaj:
      (nota ? nota + " " : "") +
      "Propune-i pacientului variantele, pe rând, și întreabă-l care îi convine. " +
      "Când alege, trimite cererea cu medicul, data și ora exact ca în varianta aleasă.",
  });
}
