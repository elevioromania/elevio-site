// Cheile publice Supabase (sunt publice prin design; securitatea vine din RLS).
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const SUPABASE_CONFIGURAT = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
