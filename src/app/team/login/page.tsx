import type { Metadata } from "next";
import { LoginForm } from "@/components/team/login-form";

export const metadata: Metadata = {
  title: "Sales team login",
  robots: { index: false, follow: false },
};

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function TeamLoginPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const nextParam = params.next;
  const next = typeof nextParam === "string" ? nextParam : undefined;

  return (
    <div className="flex min-h-dvh items-center justify-center bg-white px-6 py-16">
      <div className="w-full max-w-sm rounded-xl border border-border bg-white p-8 shadow-sm">
        <img src="/brand/simman-wordmark.svg" alt="Simplified Management" className="h-7 w-auto" />

        <h1 className="mt-8 font-[family-name:var(--font-jakarta)] text-2xl font-bold text-foreground">
          Sales team login
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in with your sales team credentials.
        </p>

        <LoginForm next={next} />
      </div>
    </div>
  );
}
