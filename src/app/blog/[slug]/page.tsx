import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PostBody } from "@/components/post-body";
import { CtaSection } from "@/components/sections/cta-section";
import { getPost, getAllPosts, getRelatedPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.description },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = getRelatedPosts(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    articleSection: post.category,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="section-pad">
        <div className="container-page max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> All posts
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-primary">
            {post.category}
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            {formatDate(post.date)} · {post.readingMinutes} min read
          </p>
          <div className="mt-10">
            <PostBody content={post.content} />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border section-pad">
          <div className="container-page max-w-3xl">
            <h2 className="font-display text-xl font-bold">Keep reading</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {r.category}
                  </span>
                  <p className="mt-2 font-display font-semibold leading-snug">{r.title}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary">
                    Read <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection />
    </>
  );
}
