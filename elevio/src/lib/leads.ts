import { promises as fs } from "fs";
import path from "path";

export type BusinessType = "restaurant" | "magazin" | "service_auto" | "altul";

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  businessType: BusinessType;
  createdAt: string;
  notifiedTeam: boolean;
  audioEmailSent: boolean;
};

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

async function readLeads(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(LEADS_FILE, "utf-8");
    return JSON.parse(raw) as Lead[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

export async function saveLead(lead: Lead): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const leads = await readLeads();
  leads.push(lead);
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}
