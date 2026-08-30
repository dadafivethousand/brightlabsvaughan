import Social from "./Social";

export default function SiteHeader() {
  return (
    <header className="site-head">
      <a className="brand" href="#top">
        <img src="/assets/bulb.png" alt="" />
        <span>Bright Labs</span>
      </a>

      {/* The socials ARE the right-hand side now. The "Get in touch" button
          that used to sit here is gone at the user's call — which also settles
          the phone problem for good: mark plus two glyphs is about 300px of
          content, so there is nothing left to crowd or push off the edge, and
          no stacking rule needed to keep it that way.

          Glyph-only, because these marks are recognisable without labels; the
          accessible name still says which is which. */}
      <nav className="nav">
        <a href="#what">What we do</a>
        <a href="#student-led">Student-led</a>
        <a href="#about">About</a>
        <Social size="icon" />
      </nav>
    </header>
  );
}
