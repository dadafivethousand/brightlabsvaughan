import Social from "./Social";

export default function SiteHeader() {
  return (
    <header className="site-head">
      {/* The socials belong to the BRAND cluster, not the nav.
          Sat among the nav items they were part of a row that, at 360px, ran
          the "Get in touch" button clean off the right edge — the header simply
          had more in it than the phone was wide. Grouped here they wrap under
          the wordmark instead of pushing anything sideways, and the one link
          that has to survive keeps its place. */}
      <div className="head-brand">
        <a className="brand" href="#top">
          <img src="/assets/bulb.png" alt="" />
          <span>Bright Labs</span>
        </a>
        {/* Glyph-only up here. Two more words in a header is two more words
            competing with the one link that matters, and these marks are
            recognisable without a label — the accessible name still says which
            is which. */}
        <Social size="icon" />
      </div>

      <nav className="nav">
        <a href="#what">What we do</a>
        <a href="#student-led">Student-led</a>
        <a href="#about">About</a>
        <a className="btn btn--sm" href="#contact">Get in touch</a>
      </nav>
    </header>
  );
}
