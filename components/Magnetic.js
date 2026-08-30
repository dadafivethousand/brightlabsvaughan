"use client";

import { useEffect } from "react";

/* Buttons that lean toward the cursor before you reach them.
 *
 * ── WHY `translate` AND NOT `transform` ──
 *
 * Every drawn control on this page already spends its `transform`: the buttons
 * press into their own shadow on hover, and the social glyphs carry a resting
 * tilt. Writing the magnet offset into `transform` from JS would wipe both out,
 * and re-composing them in script means this file has to know every rule in the
 * stylesheet.
 *
 * The individual `translate` property composes with `transform` instead of
 * replacing it, and it is free here — the scroll reveal claims `translate`, but
 * only on the CONTAINERS it is attached to, never on a button itself. So the
 * magnet writes one property, the stylesheet keeps the rest, and neither has to
 * know about the other.
 *
 * ── WHERE IT DOES NOT RUN ──
 *
 * Not on touch, where there is no cursor to lean toward and every control would
 * simply sit offset by however far the last tap landed. Not under reduced
 * motion. Both are checked once, and the listener is never attached rather than
 * attached and ignored.
 */
const RADIUS = 78;    // how far out it starts to notice the cursor
const PULL = 0.3;     // fraction of the distance it leans
const MAX = 7;        // ...and the hard cap, in px

export default function Magnetic() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const els = Array.from(document.querySelectorAll(".btn, .social"));
    if (!els.length) return;

    let frame = null;
    let last = null;

    const clamp = (n) => Math.max(-MAX, Math.min(MAX, n));

    function apply() {
      frame = null;
      if (!last) return;
      const { clientX: mx, clientY: my } = last;

      for (const el of els) {
        // Read fresh each frame rather than caching: these rects move on every
        // scroll, and there are eight of them. Cheaper than being wrong.
        const r = el.getBoundingClientRect();
        const dx = mx - (r.left + r.width / 2);
        const dy = my - (r.top + r.height / 2);
        const reach = RADIUS + Math.max(r.width, r.height) / 2;
        const d = Math.hypot(dx, dy);

        if (d < reach) {
          // Falls off with distance, so the lean grows as you approach instead
          // of snapping on at the edge of the radius.
          const k = 1 - d / reach;
          el.style.translate = `${clamp(dx * PULL * k)}px ${clamp(dy * PULL * k)}px`;
        } else if (el.style.translate) {
          el.style.translate = "";
        }
      }
    }

    const onMove = (e) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    // Leaving the window entirely never produces a far-away pointermove, so
    // without this the last-leaned button stays leaning.
    const release = () => {
      last = null;
      for (const el of els) el.style.translate = "";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", release);
    window.addEventListener("blur", release);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", release);
      window.removeEventListener("blur", release);
      if (frame) cancelAnimationFrame(frame);
      release();
    };
  }, []);

  return null;
}
