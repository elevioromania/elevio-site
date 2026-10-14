import type { Nisa, Status } from "../config";

export type Rol = "admin" | "vanzator" | "trainer";

export type Profil = {
  id: string;
  nume: string;
  telefon: string | null;
  email: string;
  rol: Rol;
  titlu: string;
  activ: boolean;
  comision_instalare: number;
  nivel: number;
  onboarding: Record<string, boolean>;
  bun_venit_vazut: boolean;
  creat_la: string;
};

export type Lead = {
  id: string;
  vanzator_id: string | null;
  afacere: string;
  nisa: Nisa;
  oras: string | null;
  adresa: string | null;
  telefon_afacere: string | null;
  site: string | null;
  google_maps: string | null;
  decident_nume: string | null;
  decident_functie: string | null;
  decident_telefon: string | null;
  decident_email: string | null;
  status: Status;
  urmatorul_pas_data: string | null;
  urmatorul_pas_text: string | null;
  notite: string | null;
  obiectii: string[];
  obiectii_text: string | null;
  a_sunat_demo: boolean;
  sursa: "alocat" | "adaugat_de_vanzator";
  calitate: number;
  creat_la: string;
  actualizat_la: string;
  ultimul_contact: string | null;
};

export type Activitate = {
  id: string;
  lead_id: string;
  autor_id: string | null;
  tip: "status" | "notita" | "apel" | "realocare";
  de_la: string | null;
  la: string | null;
  text: string | null;
  creat_la: string;
};

export type Predare = {
  id: string;
  lead_id: string;
  vanzator_id: string | null;
  data_intalnire: string;
  format: "online" | "locatie";
  adresa: string | null;
  decident_nume: string;
  decident_functie: string;
  decident_telefon: string;
  decident_email: string;
  a_sunat_demo: boolean;
  reactie_demo: string;
  problema: string;
  participanti: string;
  notite: string | null;
  rezultat: "noua" | "confirmata" | "neprezentat" | "reprogramata" | "inchis" | "neinchis";
  pachet: string | null;
  pret_lunar: number | null;
  inchis_la: string | null;
  creat_la: string;
};

export const COLOANE_PROFIL =
  "id, nume, telefon, email, rol, titlu, activ, comision_instalare, nivel, onboarding, bun_venit_vazut, creat_la";
