# brightlabsvaughan.com

Marketing site for **Bright Labs Vaughan** — a student-led tutoring and
education organization making science exciting, accessible and inspiring for
young learners, through tutoring, workshops and unique experiments.

Static. No build step, no framework: one page, one stylesheet, a handful of
images. That is the whole thing, deliberately — it loads instantly, it can be
edited by anyone who can read HTML, and there is no toolchain to rot between
the times someone needs to change a sentence.

```
public/          what ships
  index.html
  styles.css
  assets/        the mark, cut out of its original white background
brand/           the logo as supplied, untouched
```

## Deploy

Cloudflare **Workers** (Static Assets), not Pages:

```bash
npx wrangler deploy
```

That is the whole deploy. `public/` is uploaded and served directly; there is no
`main`, because an assets-only Worker needs no script.

### Why Workers and not Pages

DNS, not preference. Pages custom domains attached over the API do **not** create
their own DNS record — they sit at `status: pending` until something writes the
CNAME, and the wrangler OAuth token here carries `zone:read` with no DNS write
scope at all. `wrangler login` cannot fix that: DNS write is not among the scopes
wrangler asks for, and wrangler 4.x has no `pages domain` command either.

A **Workers** custom domain is provisioned by the Workers service itself under
`workers_routes:write`, which the token does have. So `routes` with
`custom_domain: true` creates the DNS record and orders the certificate on its
own, with nothing to do in the dashboard. Both hostnames came up that way.

### If the domain looks dead from this Mac

Check with `--resolve` before believing it:

```bash
curl -sI --resolve brightlabsvaughan.com:443:172.64.80.1 https://brightlabsvaughan.com
```

macOS caches the NXDOMAIN from every lookup made before the record existed, so
the site can be serving 200 worldwide while `curl` on this machine still says
"Could not resolve host". `sudo dscacheutil -flushcache; sudo killall -HUP
mDNSResponder` clears it.

## The style

The logo is hand-drawn — marker-weight bulb, sketchy rays, marker lettering —
so the site is too. Three rules hold it together:

1. **Boxes are drawn, not rendered.** Every panel's four corners disagree with
   each other the way a pen's would (`border-radius` with four different pairs),
   and each sits on a hard offset shadow rather than a blur. That offset is the
   second pass of a sketch, not a light source.
2. **Nothing sits square.** Cards, notes and the mark are each a degree or two
   off true, alternating direction, so a row reads as pinned up rather than laid
   out on a grid.
3. **The page is a lab notebook.** Cream stock, faint graph rule, and the bulb's
   own rays scattered behind the content at low contrast.

Type is Permanent Marker for anything that wants to look written, Caveat for
margin notes, and Nunito for everything that has to be read.

## Copy

The positioning paragraph in the hero is the client's own wording and should not
be rewritten without asking. Section copy elsewhere is house wording built from
it. **No prices, ages, schedules, addresses or phone numbers appear anywhere on
the site, because none were supplied** — do not invent them to fill a gap.

`hello@brightlabsvaughan.com` needs a Cloudflare Email Routing rule pointing at
a real inbox before it will actually receive anything.
