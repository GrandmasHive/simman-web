import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/sections/cta-section";
import { getCategories, categorySlug, getPostsByCategorySlug } from "@/lib/blog";

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: categorySlug(c) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const name = getCategories().find((c) => categorySlug(c) === category);
  if (!name) return {};
  return {
    title: `${name} Articles`,
    description: `Guides and playbooks on ${name.toLowerCase()} for property operators.`,
    alternates: { canonical: `/blog/category/${category}` },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const name = getCategories().find((c) => categorySlug(c) === category);
  if (!name) notFound();
  const list = getPostsByCategorySlug(category);

  return (
    <>
      <PageHeader eyebrow="Blog" title={name} lede={`Articles on ${name.toLowerCase()}.`} />
      <section className="section-pad">
        <div className="container-page">
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
            ← All posts
          </Link>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {post.category}
                </span>
                <h2 className="mt-3 font-display text-lg font-bold leading-snug">{post.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-body">{post.description}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatDate(post.date)} · {post.readingMinutes} min read</span>
                  <ArrowRight className="size-4 text-primary" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
