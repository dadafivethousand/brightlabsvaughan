// Exported as /sitemap.xml at build time. One page, so this is a formality —
// but a formality Search Console asks for, and one that costs nothing to keep
// correct as soon as there is a second URL.
export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: "https://brightlabsvaughan.com/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
