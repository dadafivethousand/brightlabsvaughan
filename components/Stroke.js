// A hand-drawn annotation stroke that draws itself on when its section lands.
//
// Same idea as the underline under "exciting" in the hero, generalised: one
// `<path>`, dashed to its own length and unrolled by animating the offset, so
// the mark is DRAWN rather than faded in. A stroke that fades up looks printed;
// this one looks written, which is the only reason it belongs on this site.
//
// `pathLength="1"` is the trick that makes it reusable. Without it every shape
// needs its real length measured and hard-coded into `stroke-dasharray` — get
// it wrong and the stroke either finishes early or never closes. Declaring the
// length as 1 lets one CSS rule drive an underline and a ring alike.
//
// `preserveAspectRatio="none"` so the shape stretches to whatever it wraps. It
// distorts the stroke weight slightly, which is what a real pen does when you
// draw fast, and is part of why these read as drawn rather than plotted.
export default function Stroke({ shape = "under" }) {
  if (shape === "ring") {
    return (
      <svg
        className="stroke stroke--ring"
        viewBox="0 0 300 96"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Round once and overshoot, the way anyone circles a word in a margin.
            The tail running back past the start is the whole difference between
            this and an ellipse. */}
        <path
          pathLength="1"
          d="M256 30C240 15 196 8 148 9 92 10 44 19 26 37 8 55 28 76 78 84c50 8 128 4 166-13 30-13 32-33 5-45-11-5-26-8-41-10"
        />
      </svg>
    );
  }

  return (
    <svg
      className="stroke stroke--under"
      viewBox="0 0 300 18"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path pathLength="1" d="M5 12c46-6 92-9 145-7 45 2 90 6 147 3" />
    </svg>
  );
}
