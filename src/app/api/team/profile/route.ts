import { NextResponse } from "next/server";
import { getTeamUser } from "@/lib/team-auth";
import { getProfile, resetProfile, saveProfile } from "@/lib/team-profile";

// A rep's own contact details. The username always comes from the signed session
// cookie, never from the request, so a rep can only read or change their own.
// The proxy already guards /api/team; checked again here (defence in depth).

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const unauthorized = () => NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

export async function GET() {
  const user = await getTeamUser();
  if (!user) return unauthorized();
  return NextResponse.json({ ok: true, ...(await getProfile(user)) });
}

export async function PUT(request: Request) {
  const user = await getTeamUser();
  if (!user) return unauthorized();
  // Only JSON from our own page: blocks plain HTML form posts from other sites.
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Send JSON." }, { status: 415 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "That didn't look right. Try again." }, { status: 400 });
  }
  const result = await saveProfile(user, body);
  if (!result.ok) return NextResponse.json({ ok: false, error: result.error }, { status: result.status });
  return NextResponse.json({ ok: true, ...result.profile });
}

export async function DELETE() {
  const user = await getTeamUser();
  if (!user) return unauthorized();
  const result = await resetProfile(user);
  if (!result.ok) return NextResponse.json({ ok: false, error: result.error }, { status: result.status });
  return NextResponse.json({ ok: true, ...result.profile });
}
