// Exported as /robots.txt. Everything is public and everything should be
// indexed; the value here is the sitemap line, which is how a crawler finds
// the sitemap without being told about it.
export const dynamic = "force-static";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://brightlabsvaughan.com/sitemap.xml",
  };
}
