import nodemailer from "nodemailer";
import { promises as fsp, existsSync } from "fs";
import path from "path";
import type { Lead } from "./leads";
import { businessTypeLabel } from "./autocalls";

const DEMO_AUDIO_PATH = path.join(process.cwd(), "public", "audio", "elevio-demo.mp3");

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export function hasDemoAudio(): boolean {
  return existsSync(DEMO_AUDIO_PATH);
}

export async function sendLeadNotification(lead: Lead): Promise<{ ok: boolean; error?: string }> {
  const transporter = getTransporter();
  const to = process.env.GMAIL_USER;
  if (!transporter || !to) {
    return { ok: false, error: "Email neconfigurat (GMAIL_USER / GMAIL_APP_PASSWORD lipsă)." };
  }

  try {
    await transporter.sendMail({
      from: `"Elevio — Site" <${process.env.GMAIL_USER}>`,
      to,
      replyTo: lead.email,
      subject: `Lead nou: ${lead.name} — ${businessTypeLabel(lead.businessType)}`,
      text: [
        `Nume: ${lead.name}`,
        `Telefon: ${lead.phone}`,
        `Email: ${lead.email}`,
        `Tip afacere: ${businessTypeLabel(lead.businessType)}`,
        `Trimis la: ${lead.createdAt}`,
        ...(lead.businessDescription ? ["", "Despre afacere:", lead.businessDescription] : []),
      ].join("\n"),
      html: `
        <h2>Lead nou de pe site-ul Elevio</h2>
        <table cellpadding="6" style="border-collapse:collapse">
          <tr><td><strong>Nume</strong></td><td>${escapeHtml(lead.name)}</td></tr>
          <tr><td><strong>Telefon</strong></td><td>${escapeHtml(lead.phone)}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(lead.email)}</td></tr>
          <tr><td><strong>Tip afacere</strong></td><td>${businessTypeLabel(lead.businessType)}</td></tr>
          <tr><td><strong>Trimis la</strong></td><td>${lead.createdAt}</td></tr>
        </table>
        ${
          lead.businessDescription
            ? `<h3>Despre afacere</h3><p>${escapeHtml(lead.businessDescription).replace(/\n/g, "<br>")}</p>`
            : ""
        }
      `,
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Eroare necunoscută la trimiterea emailului." };
  }
}

export async function sendDemoAudioEmail(lead: Lead): Promise<{ ok: boolean; error?: string }> {
  const transporter = getTransporter();
  if (!transporter || !process.env.GMAIL_USER) {
    return { ok: false, error: "Email neconfigurat (GMAIL_USER / GMAIL_APP_PASSWORD lipsă)." };
  }

  const audioAvailable = hasDemoAudio();

  try {
    await transporter.sendMail({
      from: `"Elevio" <${process.env.GMAIL_USER}>`,
      to: lead.email,
      subject: "Mostra ta audio Elevio — recepționerul vocal AI",
      text: audioAvailable
        ? `Bună, ${lead.name}!\n\nMulțumim că ai cerut un demo Elevio. Ai atașat un fișier audio cu o mostră a modului în care Elevio răspunde la telefon pentru ${businessTypeLabel(lead.businessType)}.\n\nUn coleg din echipa Elevio te contactează în curând cu detalii pentru afacerea ta.\n\nEchipa Elevio`
        : `Bună, ${lead.name}!\n\nMulțumim că ai cerut un demo Elevio. Un coleg din echipa Elevio te contactează în curând, cu o mostră audio și toate detaliile pentru ${businessTypeLabel(lead.businessType)}.\n\nEchipa Elevio`,
      html: `
        <p>Bună, ${lead.name}!</p>
        <p>Mulțumim că ai cerut un demo <strong>Elevio</strong>, recepționerul vocal AI în română.</p>
        ${
          audioAvailable
            ? `<p>Ai atașat mai jos o mostră audio a modului în care Elevio ar răspunde la telefon pentru <strong>${businessTypeLabel(lead.businessType)}</strong>.</p>`
            : `<p>Un coleg din echipa noastră îți trimite în curând o mostră audio și toate detaliile pentru <strong>${businessTypeLabel(lead.businessType)}</strong>.</p>`
        }
        <p>Fără obligații — o asculți, apoi decizi.</p>
        <p>Echipa Elevio</p>
      `,
      attachments: audioAvailable
        ? [{ filename: "elevio-demo.mp3", content: await fsp.readFile(DEMO_AUDIO_PATH) }]
        : [],
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Eroare necunoscută la trimiterea emailului." };
  }
}
