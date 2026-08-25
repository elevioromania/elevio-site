import { promises as fs } from "fs";
import path from "path";

export type MarketingService =
  | "google_maps_reviews"
  | "google_maps_profile"
  | "website"
  | "social_media"
  | "ads"
  | "altceva";

export const MARKETING_SERVICE_LABELS: Record<MarketingService, string> = {
  google_maps_reviews: "Recenzii Google Maps",
  google_maps_profile: "Optimizare profil Google Maps",
  website: "Website",
  social_media: "Profile social media (Instagram, Facebook, TikTok)",
  ads: "Reclame organice și plătite",
  altceva: "Altceva / nu știu exact",
};

export type MarketingLead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  services: MarketingService[];
  businessDescription: string;
  createdAt: string;
  notifiedTeam: boolean;
};

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "marketing-leads.json");

async function readLeads(): Promise<MarketingLead[]> {
  try {
    const raw = await fs.readFile(LEADS_FILE, "utf-8");
    return JSON.parse(raw) as MarketingLead[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

export async function saveMarketingLead(lead: MarketingLead): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const leads = await readLeads();
  leads.push(lead);
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}
