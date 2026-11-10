import { escapeHtml, getTransporter } from "@/lib/mailer";

// Mailul către recepție cu cererea prinsă de agent, și alerta către Elevio
// când un calendar nu se mai poate citi.

export type CerereEmail = {
  clinica: string;
  emailReceptie: string;
  nume: string;
  telefon: string;
  motiv: string;
  observatii: string;
  medic: string | null;
  oraText: string | null; // „joi, 12 noiembrie, ora 14:30”; null = pacientul vrea să fie sunat
  verificata: boolean; // ora a fost verificată liberă în calendar chiar înainte de mail
  callId: string;
};

export async function trimiteCerere(c: CerereEmail): Promise<{ ok: boolean; error?: string }> {
  const transporter = getTransporter();
  if (!transporter || !process.env.GMAIL_USER) {
    return { ok: false, error: "Email neconfigurat (GMAIL_USER / GMAIL_APP_PASSWORD lipsă)." };
  }

  const subiect = c.oraText
    ? `Programare de confirmat: ${c.nume}, ${c.oraText}`
    : `Pacient de sunat pentru programare: ${c.nume}`;

  const pas = c.oraText
    ? `Treceți programarea în iStoma${c.medic ? ` la ${c.medic}` : ""}, ${c.oraText}, apoi sunați sau trimiteți SMS pacientului cu confirmarea.`
    : "Pacientul nu a ales o oră. Sunați-l pentru programare.";

  const randuri: [string, string][] = [
    ["Pacient", c.nume],
    ["Telefon", c.telefon],
    ...(c.oraText ? ([["Ora aleasă", c.oraText]] as [string, string][]) : []),
    ...(c.medic ? ([["Medic", c.medic]] as [string, string][]) : []),
    ["Motivul", c.motiv || "-"],
    ...(c.observatii ? ([["Observații", c.observatii]] as [string, string][]) : []),
  ];

  const avertisment =
    c.oraText && !c.verificata
      ? "Atenție: calendarul nu a putut fi verificat chiar în momentul cererii. Uitați-vă în agendă dacă ora e încă liberă."
      : "";

  try {
    await transporter.sendMail({
      from: `"Agent vocal ${c.clinica}" <${process.env.GMAIL_USER}>`,
      to: c.emailReceptie,
      subject: subiect,
      text: [
        pas,
        "",
        ...randuri.map(([k, v]) => `${k}: ${v}`),
        ...(avertisment ? ["", avertisment] : []),
        "",
        "Pacientului i s-a spus că recepția îi confirmă programarea.",
        `Cod apel: ${c.callId || "-"}`,
      ].join("\n"),
      html: `
        <p style="font-size:16px"><strong>${escapeHtml(pas)}</strong></p>
        <table cellpadding="6" style="border-collapse:collapse;font-size:15px">
          ${randuri
            .map(([k, v]) => `<tr><td style="color:#555">${escapeHtml(k)}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`)
            .join("")}
        </table>
        ${avertisment ? `<p style="color:#b45309">${escapeHtml(avertisment)}</p>` : ""}
        <p style="color:#555">Pacientului i s-a spus că recepția îi confirmă programarea.</p>
        <p style="color:#999;font-size:12px">Cod apel: ${escapeHtml(c.callId || "-")}</p>
      `,
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Eroare necunoscută la trimiterea emailului." };
  }
}

export async function trimiteAlerta(clinica: string, probleme: string[]): Promise<void> {
  const transporter = getTransporter();
  const catre = process.env.AGENDA_EMAIL_ALERTE || process.env.GMAIL_USER;
  if (!transporter || !catre) return;
  try {
    await transporter.sendMail({
      from: `"Elevio Agenda" <${process.env.GMAIL_USER}>`,
      to: catre,
      subject: `Agenda ${clinica}: calendarul nu se poate citi`,
      text: [
        `Agentul vocal de la ${clinica} nu poate citi calendarul pentru:`,
        "",
        ...probleme,
        "",
        "Pentru medicii aceștia agentul nu propune ore, ci ia cererea și o trimite recepției fără oră.",
        "Verifică în iStoma (Setări > Utilizatori > medic > Calendarul google) că sincronizarea e pornită",
        "și că adresa secretă iCal din tabelul agenda_medici e cea actuală.",
      ].join("\n"),
    });
  } catch {
    // alerta e doar informativă; apelul pacientului merge mai departe
  }
}
