// The address is a real gmail inbox on purpose — it works with no mail
// configuration on the domain at all. Moving it to @brightlabsvaughan.com
// needs a Cloudflare Email Routing rule forwarding to a real mailbox FIRST,
// or the site is advertising a mailbox nobody reads. See the README.
const EMAIL = "brightlabsvaughan@gmail.com";

// Written for a human, dialled by a machine. `tel:` wants the full E.164
// number or a phone that is roaming guesses the country; the label is the
// spaced form nobody has to decode.
const PHONE = "647-339-5448";
const PHONE_TEL = "+16473395448";

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="contact-box" data-reveal>
        <h2>Let&apos;s talk</h2>
        <p>
          Questions about tutoring, workshops, or bringing Bright Labs to your
          classroom or group? Send us a note or give us a call.
        </p>
        <div className="contact-actions">
          <a className="btn btn--lg" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a className="btn btn--lg btn--ghost" href={`tel:${PHONE_TEL}`}>{PHONE}</a>
        </div>
        <p className="contact-where">Serving Vaughan &amp; the surrounding area</p>
      </div>

      {/* Pinned the other way, and quieter than the card above it — asking for
          money is not the point of the page and should not be the loudest
          thing on it. */}
      <div className="support-box" data-reveal style={{ "--d": "110ms" }}>
        <h3>Support Bright Labs</h3>
        <p>
          Bright Labs is student-run. If you would like to support the work,
          donations can be sent by Interac e-Transfer.
        </p>
        {/* NOT A LINK. An e-Transfer is sent from a banking app, not from a
            mail client — a mailto: here would open the wrong thing and look
            like the donation had been started. `user-select: all` makes one
            click select the whole address to copy. */}
        <span className="etransfer">{EMAIL}</span>
      </div>
    </section>
  );
}
