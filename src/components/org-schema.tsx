import { site } from "@/lib/site";

export function OrgSchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: site.name,
        url: site.url,
        email: site.email,
        telephone: site.phones.map((p) => p.label),
        address: {
          "@type": "PostalAddress",
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          addressCountry: "IN",
        },
        areaServed: { "@type": "Country", name: "India" },
        sameAs: [site.socials.instagram, site.socials.facebook, site.socials.linkedin],
      },
      {
        "@type": "WebSite",
        name: site.name,
        url: site.url,
        publisher: { "@type": "Organization", name: site.name },
      },
      {
        "@type": "SoftwareApplication",
        name: site.name,
        url: site.url,
        description: site.description,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Property management software",
        operatingSystem: "Web",
        areaServed: { "@type": "Country", name: "India" },
        publisher: { "@type": "Organization", name: site.name },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
