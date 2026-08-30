// The two social accounts, in one place so the header, the contact card and the
// footer can never disagree about a URL.
//
// The glyphs are Font Awesome Free's brand marks, inlined as paths rather than
// pulled from the CDN — one <svg> costs nothing, where the CDN would add a
// render-blocking stylesheet and a font file to a site whose whole point is
// that it loads instantly. Font Awesome Free, CC BY 4.0,
// https://fontawesome.com/license/free
//
// These are FILLED, unlike every other icon here, and that is on purpose: a
// brand mark is recognised by its silhouette, and the outlined Facebook "f" the
// first pass drew was a stroke that happened to be f-shaped rather than the
// thing anyone recognises.
export const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/brightlabsvaughan/",
    // fa-brands fa-instagram
    box: "0 0 448 512",
    d: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/p/Bright-Labs-Vaughan-61594081250337/",
    // fa-brands fa-facebook-f
    box: "0 0 320 512",
    d: "M80 299.3V512H196V299.3h86.5l18-97.8H196v-33.3c0-51.6 20.9-71.4 73.1-71.4c16.2 0 29.3 .4 36.9 1.2V7.9C291.7 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z",
  },
];

/**
 * `size`:
 *   "lg"   the contact card — a call to action, labelled
 *   "sm"   the footer — a courtesy, labelled
 *   "icon" the header — glyph only, because a nav bar has no room for two more
 *          words and the marks are recognisable without them
 */
export default function Social({ size = "sm" }) {
  const iconOnly = size === "icon";

  return (
    <ul className={`socials socials--${size}`}>
      {SOCIALS.map((s) => (
        <li key={s.name}>
          <a
            className="social"
            href={s.href}
            target="_blank"
            /* noreferrer as well as noopener: without it the destination is
               told which page sent the visitor, and there is no reason to hand
               that over just to open a profile. */
            rel="noopener noreferrer"
            aria-label={`Bright Labs on ${s.name} — opens in a new tab`}
          >
            <svg viewBox={s.box} aria-hidden="true">
              <path d={s.d} />
            </svg>
            {!iconOnly && <span>{s.name}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
