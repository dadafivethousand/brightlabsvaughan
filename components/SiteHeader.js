import Social from "./Social";

export default function SiteHeader() {
  return (
    <header className="site-head">
      <a className="brand" href="#top">
        <img src="/assets/bulb.png" alt="" />
        <span>Bright Labs</span>
      </a>
      <nav className="nav">
        <a href="#what">What we do</a>
        <a href="#student-led">Student-led</a>
        <a href="#about">About</a>
        {/* Glyph-only up here. Two more words in a nav bar is two more words
            competing with the one link that matters, and these marks are
            recognisable without a label — the accessible name still says which
            is which. */}
        <Social size="icon" />
        <a className="btn btn--sm" href="#contact">Get in touch</a>
      </nav>
    </header>
  );
}
