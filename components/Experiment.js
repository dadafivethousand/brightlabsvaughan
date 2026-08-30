"use client";

import { useState } from "react";

/* A working experiment, not a picture of one.
 *
 * Red cabbage juice is a genuine pH indicator and the colours below are the
 * real ones — acid takes it to pink and red, base to blue, teal and green. That
 * matters more than it looks: this is a science tutoring site, and an
 * interaction that fakes the science is worse than no interaction at all. It is
 * also an experiment they can actually run, with a cabbage and a lemon.
 *
 * Everything is drawn — one SVG flask in the same charcoal stroke as the rest
 * of the page. No photographs, nothing blurred, nothing that softens while it
 * moves: the colour crossfades and the bubbles rise, and both are over quickly.
 *
 * The controls are real <button>s, so the whole thing works from a keyboard,
 * and the readout is a live region — otherwise the one piece of information the
 * experiment produces is available only to people who can see the colour.
 */

// pH → what red cabbage actually does. Keys are the reachable stops.
const SCALE = [
  { ph: 1, fill: "#c9184a", name: "strongly acidic" },
  { ph: 3, fill: "#d9527f", name: "acidic" },
  { ph: 5, fill: "#a85bb0", name: "slightly acidic" },
  { ph: 7, fill: "#6f4fa8", name: "neutral" },
  { ph: 9, fill: "#3f6fc4", name: "slightly basic" },
  { ph: 11, fill: "#2a9d8f", name: "basic" },
  { ph: 13, fill: "#7fb03f", name: "strongly basic" },
];

const FLASK =
  "M80 16 V74 L26 186 c-6 13 3 28 17 28 h114 c14 0 23-15 17-28 L120 74 V16";

export default function Experiment() {
  const [i, setI] = useState(3); // start at pH 7
  // Bumped on every pour. Used as a React key so the drop and the bubbles are
  // fresh elements each time — restarting a CSS animation by toggling a class
  // needs a forced reflow to work twice; remounting does not.
  const [pour, setPour] = useState(0);

  const step = SCALE[i];

  function add(dir) {
    setI((n) => Math.max(0, Math.min(SCALE.length - 1, n + dir)));
    setPour((n) => n + 1);
  }

  function rinse() {
    setI(3);
    setPour((n) => n + 1);
  }

  return (
    <section id="try" className="section experiment">
      <h2 className="section-title" data-reveal="up">Try one</h2>
      <p className="section-sub" data-reveal="up" style={{ "--d": "80ms" }}>
        Red cabbage juice is a pH indicator — acids turn it pink, bases turn it
        green.
      </p>

      <div className="xp" data-reveal="pop" style={{ "--d": "150ms" }}>
        <div className="xp-glass">
          <svg viewBox="0 0 200 230" aria-hidden="true">
            <defs>
              <clipPath id="xp-inside">
                <path d={FLASK} />
              </clipPath>
            </defs>

            {/* the liquid, clipped to the flask */}
            <g clipPath="url(#xp-inside)">
              <rect
                className="xp-liquid"
                x="0"
                y="112"
                width="200"
                height="130"
                fill={step.fill}
              />
              {pour > 0 && (
                <g key={pour} className="xp-fizz">
                  {[18, 62, 96, 130, 168].map((cx, n) => (
                    <circle
                      key={cx}
                      cx={62 + n * 19}
                      cy="200"
                      r={3 + (n % 3)}
                      style={{ "--n": n }}
                    />
                  ))}
                </g>
              )}
            </g>

            {/* the drop going in */}
            {pour > 0 && <circle key={`d${pour}`} className="xp-drop" cx="100" cy="0" r="7" />}

            {/* the glass itself, over the liquid so the stroke reads as glass */}
            <path className="xp-outline" d={FLASK} />
            <path className="xp-outline" d="M72 16 h56" />
            {/* graduation marks, because a flask has them */}
            <path className="xp-tick" d="M52 150 h16 M44 172 h16 M38 194 h16" />
          </svg>
        </div>

        <div className="xp-panel">
          <p className="xp-readout" aria-live="polite">
            <b>pH {step.ph}</b>
            <span>{step.name}</span>
          </p>

          <div className="xp-controls">
            <button className="btn" onClick={() => add(-1)} disabled={i === 0}>
              Add acid
            </button>
            <button className="btn" onClick={() => add(1)} disabled={i === SCALE.length - 1}>
              Add base
            </button>
          </div>

          <button className="btn btn--ghost btn--sm" onClick={rinse} disabled={i === 3 && pour === 0}>
            Rinse
          </button>

          <p className="xp-note">
            Lemon juice is about pH 2. Baking soda is about 9.
          </p>
        </div>
      </div>
    </section>
  );
}
