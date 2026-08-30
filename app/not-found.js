// Exported as out/404.html, which is what the Worker serves on a miss.
export const metadata = { title: "Not found — Bright Labs Vaughan" };

export default function NotFound() {
  return (
    <main id="top">
      <section className="section contact">
        <div className="contact-box">
          <h2>Nothing here</h2>
          <p>
            That page does not exist — but the rest of the site does, and it is
            one click away.
          </p>
          <a className="btn btn--lg" href="/">Back to Bright Labs</a>
        </div>
      </section>
    </main>
  );
}
