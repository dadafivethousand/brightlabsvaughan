export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow"><span className="pin"></span> Vaughan, Ontario</p>
        <h1>
          Science, made{" "}
          <span className="hl">
            exciting
            <svg className="scribble" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M4 16c48-9 96-12 146-9 46 3 92 9 146 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>
        {/* THE CLIENT'S OWN WORDING. Not house copy — see the README. Do not
            rewrite this paragraph without asking. */}
        <p className="lede">
          Bright Labs is a <strong>student-led tutoring and education organization</strong>{" "}
          dedicated to making science exciting, accessible and inspiring for young
          learners. We introduce students to intriguing scientific topics, spark
          curiosity, and foster a love for STEM through tutoring, workshops and
          unique experiments.
        </p>
        <div className="cta-row">
          <a className="btn" href="#contact">Get in touch</a>
          <a className="btn btn--ghost" href="#what">See what we do</a>
        </div>
      </div>

      <div className="hero-art">
        <div className="glow" aria-hidden="true"></div>
        <img src="/assets/brightlabs-logo.png" alt="Bright Labs" />
      </div>
    </section>
  );
}
