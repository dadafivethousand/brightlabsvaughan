/**
 * "Built by 5K Digital Studios" — the studio credit, once, after the footer.
 *
 * Ported from the same credit on the Maple Jiu-Jitsu site. The MARK is
 * deliberately unchanged: the four squares keep 5K's own colours rather than
 * taking this site's yellow, because the credit should read as one studio's
 * mark wherever it appears, not as a piece of whichever palette it happens to
 * be sitting in. Everything around it — the paper, the drawn border, the
 * offset shadow — is this site's language, so the credit belongs to the page
 * without the logo belonging to it.
 *
 * The mark is built from four elements rather than shipped as an image: it
 * stays crisp at any size and costs no request.
 *
 * `rel` is noopener but deliberately NOT noreferrer — the referrer is how 5K
 * sees this link sending traffic.
 */
export default function StudioCredit() {
  return (
    <div className="studio-credit-row">
      <a
        className="studio-credit"
        href="https://5kdigitalstudios.com"
        target="_blank"
        rel="noopener"
      >
        <span className="studio-credit__by">Built by</span>
        <span className="studio-credit__mark" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="studio-credit__name">
          5K<span>Digital Studios</span>
        </span>
      </a>
    </div>
  );
}
