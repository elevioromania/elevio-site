#!/usr/bin/env node
// Pregătește o clinică nouă pentru agenda agentului vocal (vezi AGENDA-ISTOMA.md).
//
//   node scripts/agenda-clinica-noua.mjs "Clinica Zâmbet" receptie@clinica.ro
//
// Afișează:
//   - cheia secretă a clinicii: o pui DOAR în antetul x-agenda-cheie al celor două
//     tool-uri din Autocalls; în baza de date ajunge doar amprenta ei (sha256);
//   - SQL-ul de rulat în Supabase (SQL Editor) ca să creezi clinica și medicii.
// Cheia nu se mai poate afla ulterior: dacă o pierzi, rulezi scriptul din nou
// și înlocuiești cheie_hash în agenda_clinici.

import { createHash, randomBytes } from "node:crypto";

const [nume, email] = process.argv.slice(2);
if (!nume || !email || !email.includes("@")) {
  console.error('Folosire: node scripts/agenda-clinica-noua.mjs "Numele clinicii" email-receptie@clinica.ro');
  process.exit(1);
}

const cheie = `ag_${randomBytes(24).toString("base64url")}`;
const hash = createHash("sha256").update(cheie, "utf8").digest("hex");
const sql = (text) => `'${text.replace(/'/g, "''")}'`;

console.log(`
Cheia clinicii (o pui în Autocalls, antetul x-agenda-cheie, la ambele tool-uri):

  ${cheie}

SQL de rulat în Supabase > SQL Editor (completezi medicii înainte):

with clinica as (
  insert into agenda_clinici (nume, cheie_hash, email_receptie)
  values (${sql(nume)}, '${hash}', ${sql(email)})
  returning id)
insert into agenda_medici (clinica_id, nume, specialitate, calendar_ics, program, ordine)
select clinica.id, m.nume, m.specialitate, m.calendar_ics, m.program::jsonb, m.ordine
from clinica, (values
  -- (nume, specialitate, adresa secretă iCal din Google Calendar, program, ordine)
  ('Dr. Nume Prenume', 'Ortodonție', 'https://calendar.google.com/calendar/ical/.../private-.../basic.ics',
   '{"1":[["09:00","17:00"]],"2":[["09:00","17:00"]],"3":[["09:00","17:00"]],"4":[["09:00","17:00"]],"5":[["09:00","14:00"]]}', 1),
  ('Dr. Alt Medic', 'Chirurgie orală', 'https://calendar.google.com/calendar/ical/.../private-.../basic.ics',
   '{"para":{"2":[["14:00","20:00"]]},"impara":{"1":[["09:00","14:00"]]}}', 2)
) as m(nume, specialitate, calendar_ics, program, ordine);
`);
