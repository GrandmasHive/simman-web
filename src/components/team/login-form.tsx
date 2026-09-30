"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Only allow same-site paths under /team as a post-login destination — never
// follow an absolute/external URL from the "next" query param (open-redirect).
function resolveNextPath(next: string | undefined): string {
  if (next && next.startsWith("/team/")) return next;
  return "/team/proposal";
}

export function LoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    try {
      const res = await fetch("/api/team/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const json = (await res.json().catch(() => null)) as
        | { ok: boolean; error?: string }
        | null;

      if (!res.ok || !json?.ok) {
        setError(json?.error || "Wrong username or password");
        setPending(false);
        return;
      }

      router.push(resolveNextPath(next));
    } catch {
      setError("Something went wrong. Try again.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <label className="tm-label" htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          autoCapitalize="none"
          autoFocus
          className="tm-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label className="tm-label" htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="tm-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p className="tm-err" role="alert" style={{ margin: 0 }}>{error}</p>}

      <button type="submit" className="tm-btn primary lg" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
