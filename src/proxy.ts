import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Rulează doar pe /echipa/*: reîmprospătează sesiunea Supabase și trimite la login
// pe cine intră în /echipa/app fără sesiune. Site-ul public nu trece pe aici.
export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return NextResponse.next();

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const logat = Boolean(data?.claims?.sub);

  if (!logat && request.nextUrl.pathname.startsWith("/echipa/app")) {
    const login = request.nextUrl.clone();
    login.pathname = "/echipa/login";
    login.search = "";
    const redirect = NextResponse.redirect(login);
    response.cookies.getAll().forEach((c) => redirect.cookies.set(c));
    return redirect;
  }

  return response;
}

export const config = {
  matcher: ["/echipa/:path*"],
};
