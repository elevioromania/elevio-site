-- Platforma internă de vânzări Elevio: date inițiale.
-- Sumele bonusurilor sunt orientative; le schimbi din panoul de admin (Clienți și comisioane).

insert into public.bonusuri_config (prag, suma, descriere) values
  (1, 50, 'Bonus pentru primul client'),
  (5, 450, 'Bonus mare pentru 5 clienți')
on conflict (prag) do nothing;
