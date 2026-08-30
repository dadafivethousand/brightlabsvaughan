/* Three ways into the same idea. The tilt classes alternate direction on
 * purpose — a row of cards all leaning the same way reads as a mistake, and
 * alternating is what makes it read as pinned up. */
const CARDS = [
  {
    key: "tutoring",
    tilt: "card--tilt-l",
    title: "Tutoring",
    copy:
      "Guidance that meets young learners where they already are, and builds real confidence in the science they are studying right now.",
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 14h30M18 22h18" />
        <path d="M10 34h44a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V38a4 4 0 0 1 4-4Z" />
        <path d="M16 44h14M16 50h22" />
      </g>
    ),
  },
  {
    key: "workshops",
    tilt: "card--tilt-r",
    title: "Workshops",
    copy:
      "Sessions built around one intriguing topic, designed to leave students with better questions than the ones they walked in with.",
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="32" r="7" />
        <ellipse cx="32" cy="32" rx="27" ry="11" />
        <ellipse cx="32" cy="32" rx="27" ry="11" transform="rotate(60 32 32)" />
        <ellipse cx="32" cy="32" rx="27" ry="11" transform="rotate(120 32 32)" />
      </g>
    ),
  },
  {
    key: "experiments",
    tilt: "card--tilt-l",
    title: "Unique experiments",
    copy:
      "Hands-on experiments that make an idea click at the exact moment a student sees it happen in front of them.",
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M25 7h14M28 7v18L14 50a6 6 0 0 0 5 9h26a6 6 0 0 0 5-9L36 25V7" />
        <path d="M20 40h24" />
        <circle cx="28" cy="47" r="2.5" />
        <circle cx="37" cy="51" r="2" />
      </g>
    ),
  },
];

export default function WhatWeDo() {
  return (
    <section id="what" className="section">
      <h2 className="section-title" data-reveal="up">What we do</h2>
      <p className="section-sub" data-reveal="up" style={{ "--d": "80ms" }}>
        Three ways into the same idea — that science is a thing you get to <em>do</em>.
      </p>

      <div className="cards">
        {/* The stagger is per card, so the row lands left to right rather than
            as one block. --d is what the reveal transition reads for its delay. */}
        {CARDS.map((c, i) => (
          <article
            className={`card ${c.tilt}`}
            key={c.key}
            data-reveal={c.tilt === "card--tilt-r" ? "pin-r" : "pin"}
            style={{ "--d": `${110 + i * 95}ms` }}
          >
            <div className="card-icon">
              <svg viewBox="0 0 64 64">{c.icon}</svg>
            </div>
            <h3>{c.title}</h3>
            <p>{c.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
