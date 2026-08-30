/**
 * STATIC EXPORT, ON PURPOSE.
 *
 * This is one page with no server work in it: no forms posted anywhere, no
 * data fetched, no auth, nothing that needs a request to be alive. `output:
 * "export"` turns `next build` into a directory of finished HTML in `out/`,
 * which the existing Worker serves exactly the way it served `public/` before
 * — same assets-only Worker, same `custom_domain` routes, so the whole reason
 * this site is on Workers rather than Pages (see the README) keeps working
 * with a one-line change to wrangler.jsonc.
 *
 * The other two Next sites on this machine run through @opennextjs/cloudflare
 * because they have server routes. Bringing that runtime here would add a
 * build step and a Worker script to render a page that is identical on every
 * request. If this site ever grows an API route, a server action or ISR, the
 * swap is: install @opennextjs/cloudflare, drop this `output` line, and point
 * the deploy script at it.
 *
 * `images.unoptimized` is not a preference either — the default loader needs a
 * server to resize on demand, and an exported site has none.
 */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
