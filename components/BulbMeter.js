"use client";

import { useEffect, useRef } from "react";

/* The header mark, doubling as how far down the page you are.
 *
 * A progress bar that is also the logo. It earns its place by being useful
 * rather than decorative, which is the only reason a header ornament should
 * exist at all.
 *
 * ── IT ONLY EVER GETS BRIGHTER ──
 *
 * The obvious build is to start the bulb dim or grey and light it as you
 * descend. That was tried on this site's hero and rejected, and rightly: the
 * mark spends most of its life looking worse than it is, and a logo that is
 * dimmed by default is a logo you have made worse to make a point.
 *
 * So the base layer is the bulb exactly as it always looks, and a BRIGHTER copy
 * is clipped over it, rising from the base as you scroll. At the top of the page
 * the mark is untouched; at the bottom it is fully lit. There is no state in
 * which it looks dimmer than the logo does everywhere else.
 *
 * The clip runs bottom-up so it reads as a filament heating through the glass
 * rather than a bar filling a container.
 */
export default function BulbMeter() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = null;

    const update = () => {
      frame = null;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      // A page shorter than the viewport has no progress to report. Guard, or
      // it divides by zero and the mark sits permanently at NaN — which CSS
      // reads as 0, so it would silently never light at all.
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.setProperty("--p", p.toFixed(3));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    // The page grows as fonts land and images decode, so the denominator moves
    // for a second or two after load. Without this the meter is calibrated
    // against a height the page no longer has.
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span className="bulb-meter" ref={ref}>
      <img src="/assets/bulb.png" alt="" />
      <img className="bulb-meter-lit" src="/assets/bulb.png" alt="" aria-hidden="true" />
    </span>
  );
}
