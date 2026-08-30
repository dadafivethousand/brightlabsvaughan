"use client";

import { useEffect, useRef, useState } from "react";

const LINKS = [
  ["#what", "What we do"],
  ["#student-led", "Student-led"],
  ["#about", "About"],
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const outer = useRef(null);

  /* Three ways out of an open menu, because a disclosure with only a toggle is
   * a trap on a phone: the key, a tap on anything else, and following a link.
   * The listeners only exist while it is open — a document-level keydown left
   * bound for the life of the page is a leak and a surprise. */
  useEffect(() => {
    if (!open) return undefined;

    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    const onDown = (e) => {
      if (outer.current && !outer.current.contains(e.target)) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div className="site-head-outer" ref={outer}>
      <header className="site-head">
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <img src="/assets/bulb.png" alt="" />
          <span>Bright Labs</span>
        </a>

        <nav className="nav" aria-label="Main">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
          <a className="btn btn--sm" href="#contact">Get in touch</a>

          {/* Three strokes that become a cross. The paths are numbered rather
              than classed because the stylesheet animates them by position. */}
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 30 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
              <path d="M2.5 4.2c7-.8 18-.5 25 .2" />
              <path d="M2.5 12c8-.7 17-.6 25 .1" />
              <path d="M2.5 19.8c6.5-.9 18-.4 25 .2" />
            </svg>
          </button>
        </nav>
      </header>

      <div className="menu-panel" id="site-menu" data-open={open}>
        <div className="menu-inner">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          {/* The same call to action as the bar, which is hidden at this width
              — see the note in the stylesheet. */}
          <a className="btn" href="#contact" onClick={() => setOpen(false)}>
            Get in touch
          </a>
        </div>
      </div>
    </div>
  );
}
