import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/sections/cta-section";
import { getAllPosts, getCategories, categorySlug } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides and playbooks on channel management, OTA distribution, calendar sync, and running multi-property operations in India.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogIndex() {
  const allPosts = getAllPosts();
  const categories = getCategories();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Playbooks for modern property operators"
        lede="Practical guides on channel management, OTA distribution, and running 10 to 500+ properties without the spreadsheet chaos."
      />

      <section className="section-pad">
        <div className="container-page">
          <div className="mb-8 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
              All
            </span>
            {categories.map((c) => (
              <Link
                key={c}
                href={`/blog/category/${categorySlug(c)}`}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-body hover:text-foreground"
              >
                {c}
              </Link>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post) => (
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
                  <span>
                    {formatDate(post.date)} · {post.readingMinutes} min read
                  </span>
                  <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5" />
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
