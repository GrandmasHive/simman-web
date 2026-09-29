import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionToken, verifyPassword, TEAM_COOKIE } from "@/lib/team-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days
const FAILURE_DELAY_MS = 400;

type LoginBody = { username?: string; password?: string };

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: Request) {
  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    await delay(FAILURE_DELAY_MS);
    return NextResponse.json(
      { ok: false, error: "Wrong username or password" },
      { status: 401 }
    );
  }

  const username = typeof body.username === "string" ? body.username : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!username || !password || !verifyPassword(username, password)) {
    await delay(FAILURE_DELAY_MS);
    return NextResponse.json(
      { ok: false, error: "Wrong username or password" },
      { status: 401 }
    );
  }

  let token: string;
  try {
    token = createSessionToken(username);
  } catch {
    // TEAM_SESSION_SECRET missing/invalid — fail closed the same as a bad password.
    await delay(FAILURE_DELAY_MS);
    return NextResponse.json(
      { ok: false, error: "Wrong username or password" },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(TEAM_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return NextResponse.json({ ok: true });
}
