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
        <a className="btn btn--sm" href="#contact">Get in touch</a>
      </nav>
    </header>
  );
}
