import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { TEAM_COOKIE } from "@/lib/team-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(TEAM_COOKIE);
  return NextResponse.json({ ok: true });
}
