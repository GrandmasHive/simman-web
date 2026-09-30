import type { Metadata } from "next";
import "@/components/team/team.css";
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
    <div className="tm">
      <div className="tm-login">
        <div className="tm-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="tm-logo" style={{ height: 26 }} src="/brand/simman-wordmark.svg" alt="Simplified Management" />
          <h1>Sales team login</h1>
          <p className="tm-hint" style={{ margin: 0 }}>Sign in with the username and password you were given.</p>
          <LoginForm next={next} />
        </div>
      </div>
    </div>
  );
}
