/* The pen, defined once for the whole document.
 *
 * `feTurbulence` at a LOW base frequency is a long, slow wander — the way a
 * hand drifts along a straight edge — and `feDisplacementMap` pushes the
 * outline around by it. Crank the frequency and the identical filter reads as
 * fuzz or damage instead of as a drawn line, which is why these numbers are
 * what they are and not rounder ones.
 *
 * Two seeds, because a box wobbled identically to the box beside it reads as a
 * repeating texture rather than as two separate drawings. The stylesheet
 * alternates them down the page.
 *
 * The <svg> itself is zero-sized and out of flow: it renders nothing, it only
 * holds the filters that CSS refers to by id.
 */
export default function InkFilters() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        <filter id="ink" x="-14%" y="-14%" width="128%" height="128%">
          <feTurbulence type="fractalNoise" baseFrequency="0.013 0.017" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3.4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="ink-b" x="-14%" y="-14%" width="128%" height="128%">
          <feTurbulence type="fractalNoise" baseFrequency="0.016 0.012" numOctaves="2" seed="23" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3.1" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
