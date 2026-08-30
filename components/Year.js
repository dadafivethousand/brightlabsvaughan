"use client";

import { useEffect, useState } from "react";

/* THE ONE PIECE OF THE PAGE THAT CANNOT BE BAKED.
 *
 * The static site set the copyright year from an inline script on every load.
 * An exported build has no server, so the obvious `new Date().getFullYear()`
 * in a server component freezes the year at BUILD time — and this site can
 * easily go a year without a deploy, which is exactly when a stale copyright
 * date is visible.
 *
 * So: render the build-time year in the HTML, then correct it on mount. That
 * order matters. Reading the clock during render would produce different
 * output on the server and the client on Jan 1 and hydration would mismatch;
 * doing it in an effect means the markup always agrees with itself and the
 * fix lands a frame later. Worst case a visitor sees last year's number for
 * one paint, which is what the old inline script did too.
 */
const BUILT = new Date().getFullYear();

export default function Year() {
  const [year, setYear] = useState(BUILT);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <span id="year">{year}</span>;
}
