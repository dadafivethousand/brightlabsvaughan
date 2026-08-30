export default function About() {
  return (
    <section id="about" className="section about">
      <div className="about-art" aria-hidden="true">
        <img src="/assets/bulb.png" alt="" />
      </div>
      <div className="about-copy">
        <h2 className="section-title section-title--left">About Bright Labs</h2>
        <p>
          We are a student-led tutoring and education organization based in
          Vaughan, Ontario, working with young learners who are somewhere on the
          scale between &quot;science is fine&quot; and &quot;science is the best
          part of the week&quot; — and moving them up it.
        </p>
        <p>
          Every session comes back to the same thing: a topic worth being
          curious about, explained by someone close enough to it to make it
          land, and then actually tried out rather than only described.
        </p>
      </div>
    </section>
  );
}
