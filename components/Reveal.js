"use client";

import { useEffect } from "react";

/* One observer for the whole page.
 *
 * Mounted once and rendering nothing, it finds every `[data-reveal]` element
 * and adds `is-in` as each crosses into view. Doing it this way — rather than
 * making each section a client component with its own hook — keeps every
 * section of the site a server component: the markup is still generated at
 * build time and this is the only JavaScript that ships for the effect.
 *
 * `threshold: 0` with a negative bottom `rootMargin`, NOT a fractional
 * threshold. A threshold of 0.15 asks for 15% of the element to be visible,
 * which an element taller than the viewport can satisfy late or — for the
 * yellow band on a short window — never quite satisfy at the moment you want
 * it to. Zero plus a margin means "fire when the top edge crosses 88% of the
 * window", which behaves the same for a small card and a tall panel.
 *
 * Elements already on screen at load are intersecting the moment they are
 * observed, so the observer fires for them immediately and the top of the page
 * animates in on arrival rather than sitting blank.
 */
export default function Reveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return undefined;

    // No observer, or a viewer who has asked for less motion: show everything
    // at once and do not observe anything.
    const still =
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (still) {
      els.forEach((el) => el.classList.add("is-in"));
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          // Once in, stay in. Re-animating on the way back up turns a page
          // into a slideshow and makes the whole site feel unfinished.
          io.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
