export default function About() {
  return (
    <section id="about" className="section about">
      {/* This slot used to hold the bulb again. It holds a photograph now, and
          swapping rather than adding is the point: a photorealistic bulb a few
          hundred pixels from the drawn one makes the MARK look like a cartoon
          of the photo. There is exactly one bulb in this half of the page and
          it is the mark. */}
      <figure className="about-photo" data-reveal="left">
        <img
          src="/assets/books.jpg"
          alt="A lit bulb resting on a stack of books"
          width="1100"
          height="978"
          loading="lazy"
        />
      </figure>
      <div className="about-copy" data-reveal="right" style={{ "--d": "110ms" }}>
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
