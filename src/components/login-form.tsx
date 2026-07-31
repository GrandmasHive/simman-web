"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

export function LoginForm() {
  const [pending, setPending] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    // INTERIM: real authentication lives in the product app. Until the dev team
    // wires this form to the app's auth API, hand the user off to the existing
    // app login. Replace this with a real auth call (POST credentials) later.
    window.location.href = site.loginUrl;
  }

  return (
    <div className="w-full max-w-sm">
      <Link href="/" className="inline-flex items-center" aria-label="Simplified Management home">
        <Logo />
      </Link>

      <h1 className="mt-10 font-display text-2xl font-bold">Welcome back</h1>
      <p className="mt-2 text-sm text-body">Sign in to your operations dashboard.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div className="grid gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="you@company.in" autoComplete="email" />
        </div>
        <div className="grid gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href={site.loginUrl} className="text-xs text-primary hover:underline">
              Forgot password?
            </a>
          </div>
          <Input id="password" name="password" type="password" required placeholder="••••••••" autoComplete="current-password" />
        </div>
        <Button type="submit" className="w-full" size="lg" disabled={pending}>
          {pending ? "Signing in..." : "Sign in"}
          {!pending && <ArrowRight className="size-4" />}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-body">
        New to Simplified Management?{" "}
        <Link href="/demo" className="font-semibold text-primary hover:underline">
          Request a demo
        </Link>
      </p>
    </div>
  );
}
