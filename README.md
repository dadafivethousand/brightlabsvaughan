# brightlabsvaughan.com

Marketing site for **Bright Labs Vaughan** — a student-led tutoring and
education organization making science exciting, accessible and inspiring for
young learners, through tutoring, workshops and unique experiments.

**Next.js 15, App Router, JavaScript** — exported to static HTML. One page, one
stylesheet, a handful of images; it is still a static site at the far end, and
still loads with no server work in it. What Next buys here is the pieces that
were hand-rolled before: the fonts are self-hosted instead of fetched from
Google on every visit, the metadata and Open Graph tags are declared once in
`app/layout.js`, and the page is components rather than 182 lines of markup in
one file.

```
app/
  layout.js      the document shell: metadata, the three faces, globals.css
  page.js        composes the sections, in order
  not-found.js   exported as out/404.html
  globals.css    the whole style, unchanged from the static site
components/      one file per section of the page
public/
  assets/        the mark, cut out of its original white background
brand/           the logo as supplied, untouched
out/             what ships — generated, git-ignored
```

### Why `output: "export"` and not @opennextjs/cloudflare

There is no server work on this site: nothing is fetched, nothing is posted,
no route differs between two requests. `output: "export"` turns `next build`
into a directory of finished HTML, which the existing Worker uploads exactly
the way it uploaded `public/` — same assets-only Worker, same `custom_domain`
routes, so the DNS reasoning below survives the move untouched. The other two
Next sites on this machine use @opennextjs/cloudflare because they have server
routes; bringing that runtime here would add a Worker script to render a page
that is identical every time.

If this site ever grows an API route, a server action or ISR: install
`@opennextjs/cloudflare`, drop the `output` line from `next.config.mjs`, and
point the deploy script at it.

## Deploy

Cloudflare **Workers** (Static Assets), not Pages:

```bash
npm install        # once, on a new machine
npm run dev        # Next dev server at localhost:3000
npm run build      # writes out/
npm run preview    # build, then serve out/ through wrangler at 127.0.0.1:8787
npm run deploy     # build, then upload
```

You will be asked to `wrangler login` once per machine.

`out/` is uploaded and served directly; there is no `main`, because an
assets-only Worker needs no script. `not_found_handling` is `404-page` rather
than `single-page-application`: the export emits a real `out/404.html`, and SPA
handling would serve `index.html` for every miss instead — a wrong URL would
quietly render the home page with a 200.

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
margin notes, and Nunito for everything that has to be read. All three are
loaded by `next/font/google` in `app/layout.js` and handed to CSS as
`--font-marker` / `--font-hand` / `--font-body`; `app/globals.css` routes every
rule through its own `--marker` / `--hand` / `--body`, which is why moving to
Next changed three lines of the stylesheet and nothing else.

## Copy

The positioning paragraph in the hero is the client's own wording and should not
be rewritten without asking. Section copy elsewhere is house wording built from
it. **No prices, ages, schedules or street address appear anywhere on the site,
because none were supplied** — do not invent them to fill a gap.

The phone number is `647-339-5448`, supplied by the client. It is written
`+16473395448` in the `tel:` href — a bare ten-digit number is dialled against
whatever country the handset thinks it is in.

The contact address is `brightlabsvaughan@gmail.com` — a real inbox, so it works
with no mail configuration on the domain at all. It appears twice: once as a
`mailto:` button, and once in the support card as the **Interac e-Transfer**
destination. That second one is deliberately **not a link** — an e-Transfer is
sent from a banking app, not a mail client, so a `mailto:` there would open the
wrong thing and look like the donation had been started. It is a tag with
`user-select: all`, so one click selects the whole address to copy. If it is ever moved to
`something@brightlabsvaughan.com`, that address needs a Cloudflare Email Routing
rule forwarding to a real mailbox first, or the site will be advertising a
mailbox nobody reads — **and it has to be changed in both places**, or donations
go to an inbox nobody is watching.

## Buttons do not wrap

Every button is a pen outline with a hard offset shadow behind it, and the
outline is sized by its text — so a label that breaks across two lines grows the
box a second row of height while keeping the width of the longest word, and the
result is a tall box with a hole in the corner. `.btn` is therefore
`white-space: nowrap`. The email is the one label that cannot be shortened, so
`.btn--lg` scales its font and padding with the viewport instead; it used to
carry `word-break: break-word`, which split the address as
`brightlabsvaughan@g / mail.com`.
