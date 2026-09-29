// Gate /team and /api/team behind the sales-team session cookie.
//
// This is an OPTIMISTIC check only (cookie signature + expiry + that the user
// still exists in TEAM_USERS) — it deliberately avoids any async/database
// work here per the Next.js authentication guide. Every page and route
// handler under /team and /api/team ALSO calls getTeamUser()/readSession()
// itself (defense in depth): Proxy matchers can be refactored or a route can
// move outside the matcher without anyone noticing, so nothing may rely on
// Proxy as its only line of defense.
//
// Runs on the Node.js runtime (Proxy default in this Next.js version), so
// node:crypto (used by ./lib/team-auth) is available here.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { readSession, TEAM_COOKIE } from "@/lib/team-auth";

const PUBLIC_PATHS = new Set(["/team/login", "/api/team/login"]);

function isApiPath(pathname: string): boolean {
  return pathname === "/api/team" || pathname.startsWith("/api/team/");
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const response = PUBLIC_PATHS.has(pathname)
    ? NextResponse.next()
    : authorize(request, pathname);

  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

function authorize(request: NextRequest, pathname: string): NextResponse {
  const token = request.cookies.get(TEAM_COOKIE)?.value;
  const session = readSession(token);

  if (session) return NextResponse.next();

  if (isApiPath(pathname)) {
    return NextResponse.json(
      { ok: false, error: "unauthorized" },
      { status: 401 }
    );
  }

  const loginUrl = new URL("/team/login", request.url);
  loginUrl.searchParams.set("next", pathname + request.nextUrl.search);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/team/:path*", "/api/team/:path*"],
};
