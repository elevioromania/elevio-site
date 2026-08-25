import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { saveMarketingLead, type MarketingService } from "@/lib/marketingLeads";
import { toE164Romania } from "@/lib/autocalls";
import { sendMarketingLeadNotification } from "@/lib/mailer";

const VALID_SERVICES: MarketingService[] = [
  "google_maps_reviews",
  "google_maps_profile",
  "website",
  "social_media",
  "ads",
  "altceva",
];

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corp de cerere invalid." }, { status: 400 });
  }

  const { name, phone, email, services, businessDescription } = (body ?? {}) as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ error: "Numele este obligatoriu." }, { status: 400 });
  }
  if (typeof phone !== "string" || phone.trim().length < 8) {
    return NextResponse.json({ error: "Numărul de telefon este obligatoriu." }, { status: 400 });
  }
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Adresa de email nu este validă." }, { status: 400 });
  }
  if (
    !Array.isArray(services) ||
    services.length === 0 ||
    !services.every((s) => typeof s === "string" && VALID_SERVICES.includes(s as MarketingService))
  ) {
    return NextResponse.json({ error: "Alege cel puțin un serviciu." }, { status: 400 });
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
    services: services as MarketingService[],
    businessDescription:
      typeof businessDescription === "string" ? businessDescription.trim().slice(0, 2000) : "",
    createdAt: new Date().toISOString(),
    notifiedTeam: false,
  };

  const teamResult = await sendMarketingLeadNotification(lead);
  lead.notifiedTeam = teamResult.ok;

  try {
    await saveMarketingLead(lead);
  } catch {
    // Best-effort only: serverless hosts (e.g. Netlify Functions) have a
    // read-only filesystem, so local persistence can fail. The email above
    // already went out, which is the part that must not fail silently.
  }

  return NextResponse.json({
    ok: true,
    message: "Cererea a fost trimisă. Un coleg din echipa Elevio Marketing te contactează în curând.",
  });
}
