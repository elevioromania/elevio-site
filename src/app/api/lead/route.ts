import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { saveLead, type BusinessType } from "@/lib/leads";
import { toE164Romania } from "@/lib/autocalls";
import { sendLeadNotification, sendDemoAudioEmail } from "@/lib/mailer";

const VALID_BUSINESS_TYPES: BusinessType[] = [
  "restaurant",
  "magazin",
  "service_auto",
  "altul",
];

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corp de cerere invalid." }, { status: 400 });
  }

  const { name, phone, email, businessType } = (body ?? {}) as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ error: "Numele este obligatoriu." }, { status: 400 });
  }
  if (typeof phone !== "string" || phone.trim().length < 8) {
    return NextResponse.json({ error: "Numărul de telefon este obligatoriu." }, { status: 400 });
  }
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Adresa de email nu este validă." }, { status: 400 });
  }
  if (typeof businessType !== "string" || !VALID_BUSINESS_TYPES.includes(businessType as BusinessType)) {
    return NextResponse.json({ error: "Tipul afacerii este obligatoriu." }, { status: 400 });
  }

  const e164Phone = toE164Romania(phone);
  if (!e164Phone) {
    return NextResponse.json(
      { error: "Numărul de telefon trebuie să fie un număr românesc valid (ex: 07xx xxx xxx)." },
      { status: 400 },
    );
  }

  const lead = {
    id: randomUUID(),
    name: name.trim(),
    phone: e164Phone,
    email: email.trim(),
    businessType: businessType as BusinessType,
    createdAt: new Date().toISOString(),
    notifiedTeam: false,
    audioEmailSent: false,
  };

  const [teamResult, audioResult] = await Promise.all([
    sendLeadNotification(lead),
    sendDemoAudioEmail(lead),
  ]);

  lead.notifiedTeam = teamResult.ok;
  lead.audioEmailSent = audioResult.ok;

  try {
    await saveLead(lead);
  } catch {
    // Best-effort only: serverless hosts (e.g. Netlify Functions) have a
    // read-only filesystem, so local persistence can fail. The emails above
    // already went out, which is the part that must not fail silently.
  }

  return NextResponse.json({
    ok: true,
    audioEmailSent: lead.audioEmailSent,
    message: lead.audioEmailSent
      ? "Lead salvat. Ți-am trimis un email cu mostra audio Elevio."
      : "Lead salvat. Un coleg din echipa Elevio te contactează în curând.",
  });
}
