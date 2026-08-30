// The two social accounts, in one place so the contact card and the footer can
// never disagree about a URL.
//
// Both glyphs are drawn as OUTLINES at the same stroke weight as every other
// icon on this site, rather than dropped in as the platforms' filled brand
// marks. Two reasons: the filled marks arrive with their own colours and would
// be the only things on the page not drawn in the site's pen, and a solid glyph
// next to an outlined one reads as a mismatched pair even when both are black.
export const SOCIALS = [
  {
    name: "Instagram",
    handle: "@brightlabsvaughan",
    href: "https://www.instagram.com/brightlabsvaughan/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5.2" />
        <circle cx="12" cy="12" r="4.1" />
        <circle cx="17.2" cy="6.8" r="1.15" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    handle: "Bright Labs Vaughan",
    href: "https://www.facebook.com/p/Bright-Labs-Vaughan-61594081250337/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15.4 4.6h-2.2a3.4 3.4 0 0 0-3.4 3.4v11.4" />
        <path d="M7.9 11.2h6.8" />
      </svg>
    ),
  },
];

/* `size="lg"` for the contact card, where these are a call to action; the
 * default for the footer, where they are a courtesy. */
export default function Social({ size = "sm" }) {
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
            {s.icon}
            <span>{s.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
