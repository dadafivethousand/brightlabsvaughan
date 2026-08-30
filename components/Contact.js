// The address is a real gmail inbox on purpose — it works with no mail
// configuration on the domain at all. Moving it to @brightlabsvaughan.com
// needs a Cloudflare Email Routing rule forwarding to a real mailbox FIRST,
// or the site is advertising a mailbox nobody reads. See the README.
const EMAIL = "brightlabsvaughan@gmail.com";

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="contact-box">
        <h2>Let&apos;s talk</h2>
        <p>
          Questions about tutoring, workshops, or bringing Bright Labs to your
          classroom or group? Send us a note and we will get back to you.
        </p>
        <a className="btn btn--lg" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <p className="contact-where">Serving Vaughan &amp; the surrounding area</p>
      </div>
    </section>
  );
}
