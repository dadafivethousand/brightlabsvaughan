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

## Social card

`public/assets/og.png` is a designed 1200x630 card, not the app icon. Scrapers
letterbox a square mark into a 1.91:1 slot, which is a logo floating in grey.
Regenerate it whenever the wordmark, the tagline or the phone number changes:

```bash
mkdir -p /tmp/rec && cd /tmp/rec && npm i puppeteer
NODE_PATH=/tmp/rec/node_modules node scripts/og.js
```

Puppeteer is deliberately **not** a dependency — it pulls its own Chromium, and
none of that belongs in the install a deploy has to do. `scripts/og.html` is a
copy of the hero rather than a screenshot of it: a 1200x630 crop of a page built
for tall reading always cuts the headline's legs off.

`app/sitemap.js` and `app/robots.js` export `/sitemap.xml` and `/robots.txt`.
The JSON-LD block in `app/layout.js` is an `EducationalOrganization` carrying
only facts the client supplied — name, area, email, phone. **No opening hours,
no price range, no rating**: a fabricated `aggregateRating` is how sites get
their rich results pulled.

## Keyboard and small screens

- A skip link is the first thing a Tab press finds.
- `:focus-visible` rings everywhere — the site previously had no focus styles at
  all, so it could not be navigated from a keyboard.
- Under 780px the nav collapses into a real disclosure (`components/SiteHeader.js`)
  that closes on Escape, on a link, and on a tap outside. It used to be
  `display: none` with nothing in its place, which left three of the five
  sections unreachable from a phone except by scrolling past them. The CTA
  collapses with it: bar + wordmark + menu button is three things in a row that
  only fits two, and at 390px the button sat on top of the word "Labs".

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

## The pen

The boxes are not rounded rectangles pretending to be drawn — the outline is
actually displaced. `components/InkFilters.js` defines two SVG filters:
`feTurbulence` at a **low** base frequency (a long, slow wander, the way a hand
drifts along a straight edge) feeding a `feDisplacementMap`. Crank the frequency
and the same filter reads as fuzz or damage instead of a drawn line, which is
why those numbers are what they are.

**The filter is on a pseudo-element, never on the box.** Displacing an element
displaces its text with it, and wobbly body copy is not charming, it is broken.
So the outline and its offset shadow live on `::before` — a layer with nothing
in it but the drawn edge — and everything readable sits above it, untouched. Two
seeds alternate down the page, because a box wobbled identically to the one
beside it reads as a repeating texture rather than two separate drawings.

Shadow size is a `--lift` custom property per element, so one rule draws every
box and each box says how far off the page it sits.

## Three properties, three jobs

Every box carries up to three independent movements, and written as `transform`
each would silently wipe out the last one set. They are split across the three
individual transform properties instead:

| property     | job                       |
|--------------|---------------------------|
| `rotate:`    | the decorative tilt       |
| `translate:` | the scroll reveal         |
| `transform:` | the hover / press lift    |

That is why the tilts are `rotate: -1.1deg` and not `transform: rotate(...)`.
Anything added later that moves a box should pick the free property, not
overwrite one of these.

## Reveal on scroll

`components/Reveal.js` is one `IntersectionObserver` for the whole page: it
mounts once, finds every `[data-reveal]` element and adds `is-in` as each
crosses into view, then stops observing it. Doing it centrally is what keeps
every section a **server** component — this is the only JavaScript the effect
ships.

Three things about it are load-bearing:

- **The hidden state is scoped to `.js`**, a class an inline script in
  `app/layout.js` sets while the body is still parsing. Unscoped, a visitor with
  JavaScript off gets a page of permanently invisible content — the standard way
  this effect fails. Scoped, the worst case is the static page it was before.
- **`translate`, not `transform`.** Half the boxes here are already a degree or
  two off true by their own `transform: rotate()`. A reveal written as
  `transform: translateY(...)` replaces that rotation, so the cards would
  straighten themselves out as they arrived — the one thing the pinned-up style
  exists to avoid. The individual `translate` property composes instead.
- **`threshold: 0` with a negative bottom `rootMargin`**, not a fractional
  threshold. Asking for 15% of an element to be visible behaves differently for
  a small card and for a panel taller than the window; "fire when the top edge
  crosses 88% of the viewport" behaves the same for both.

Stagger is a `--d` custom property per element, read by the transition's delay.
Reduced-motion viewers get everything visible with no transition, in CSS and
again in the observer.

## Buttons do not wrap

Every button is a pen outline with a hard offset shadow behind it, and the
outline is sized by its text — so a label that breaks across two lines grows the
box a second row of height while keeping the width of the longest word, and the
result is a tall box with a hole in the corner. `.btn` is therefore
`white-space: nowrap`. The email is the one label that cannot be shortened, so
`.btn--lg` scales its font and padding with the viewport instead; it used to
carry `word-break: break-word`, which split the address as
`brightlabsvaughan@g / mail.com`.
