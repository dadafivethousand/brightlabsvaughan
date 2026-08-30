"use client";

import { useEffect } from "react";

/* One observer for the whole page.
 *
 * Mounted once and rendering nothing, it finds every `[data-reveal]` element
 * and adds `is-in` as each comes into view. Doing it centrally is what keeps
 * every section of the site a server component: the markup is still generated
 * at build time and this is the only JavaScript the effect ships.
 *
 * ── WHY AN OBSERVER ALONE IS NOT ENOUGH ──
 *
 * IntersectionObserver reports CROSSINGS. Move the viewport past an element
 * fast enough that no sample ever catches it intersecting — drag the scrollbar
 * to the bottom, press End, follow a link straight to #contact, or reload a
 * page the browser restores halfway down — and the observer never fires for it.
 * The element is left at opacity 0 permanently, which is a blank hole in the
 * page rather than a missed animation.
 *
 * So the observer is the primary path and there are two safety nets:
 *
 *   1. Anything already ABOVE the viewport on the first run is shown at once,
 *      without animating. That is the deep-link and restored-scroll case, and
 *      animating it would be wrong anyway — the visitor did not scroll to it.
 *   2. A scroll listener sweeps whatever the observer has not reached yet. It
 *      is rAF-throttled, passive, only runs while something is still pending,
 *      and removes itself the moment the last element lands. That bounds the
 *      cost at "a handful of frames during one scroll" and is the difference
 *      between an effect that works and one that works if you scroll politely.
 */
export default function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!els.length) return undefined;

    // No observer, or a viewer who has asked for less motion: show everything
    // at once and never observe anything.
    const still =
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (still) {
      els.forEach((el) => el.classList.add("is-in"));
      return undefined;
    }

    const pending = new Set(els);
    let frame = 0;

    const show = (el) => {
      el.classList.add("is-in");
      pending.delete(el);
      io.unobserve(el);
      if (!pending.size) teardown();
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Once in, stay in. Re-animating on the way back up turns a page into
          // a slideshow and makes the whole site feel unfinished.
          if (entry.isIntersecting) show(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    );

    // The sweep. Same trigger line as the observer's rootMargin, so an element
    // caught here lands at the point it would have anyway.
    const sweep = () => {
      frame = 0;
      const line = window.innerHeight * 0.88;
      for (const el of Array.from(pending)) {
        if (el.getBoundingClientRect().top < line) show(el);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sweep);
    };

    function teardown() {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    }

    for (const el of els) {
      // Already scrolled past before the script ran: show it, do not animate it.
      if (el.getBoundingClientRect().bottom < 0) {
        el.classList.add("is-in");
        pending.delete(el);
        continue;
      }
      io.observe(el);
    }

    if (!pending.size) return undefined;
    window.addEventListener("scroll", onScroll, { passive: true });
    return teardown;
  }, []);

  return null;
}
