"use client";

import { useCallback, useEffect, useState } from "react";
import { useIncarca } from "./hooks";
import { supabaseBrowser } from "./supabase-browser";

const EVENIMENT = "echipa-progres-ghid";

// Secțiunile citite din ghid. Toate componentele care îl folosesc rămân sincronizate.
export function useProgresGhid(userId: string) {
  const [citite, setCitite] = useState<string[] | null>(null);

  const incarca = useCallback(async () => {
    const { data } = await supabaseBrowser().from("progres_ghid").select("sectiune_id").eq("user_id", userId);
    setCitite((data ?? []).map((r) => r.sectiune_id));
  }, [userId]);

  useIncarca(incarca);

  useEffect(() => {
    const laSchimbare = () => void incarca();
    window.addEventListener(EVENIMENT, laSchimbare);
    return () => window.removeEventListener(EVENIMENT, laSchimbare);
  }, [incarca]);

  const marcheaza = useCallback(
    async (sectiune: string, citit: boolean) => {
      const supabase = supabaseBrowser();
      if (citit) await supabase.from("progres_ghid").upsert({ user_id: userId, sectiune_id: sectiune });
      else await supabase.from("progres_ghid").delete().eq("user_id", userId).eq("sectiune_id", sectiune);
      window.dispatchEvent(new Event(EVENIMENT));
    },
    [userId],
  );

  return { citite, marcheaza };
}
