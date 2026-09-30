import type { MetadataRoute } from "next";
import { site, otaChannels, nav } from "@/lib/site";
import { getAllPosts, getCategories, categorySlug } from "@/lib/blog";

const COMPARE = ["hostaway", "guesty", "lodgify"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticPaths = [
    "",
    "/services",
    "/pricing",
    "/about",
    "/contact",
    "/integrations",
    "/solutions",
    "/demo",
    "/security",
    "/roi-calculator",
    "/compare",
    "/blog",
    "/privacy",
    "/grievance",
    "/terms",
  ];

  const dynamicPaths = [
    ...nav.services.map((s) => new URL(s.href, base).pathname),
    ...nav.solutions.map((s) => new URL(s.href, base).pathname),
    ...otaChannels.map((c) => `/integrations/${c.slug}`),
    ...COMPARE.map((c) => `/compare/${c}`),
    ...getAllPosts().map((p) => `/blog/${p.slug}`),
    ...getCategories().map((c) => `/blog/category/${categorySlug(c)}`),
  ];

  return [...staticPaths, ...dynamicPaths].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path.startsWith("/blog/") ? "monthly" : "weekly",
    priority: path === "" ? 1 : path.startsWith("/blog") ? 0.6 : 0.8,
  }));
}
