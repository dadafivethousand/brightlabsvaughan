const VALUES = [
  ["Exciting", "Science that earns attention instead of demanding it."],
  ["Accessible", "No prior spark required — we bring that part."],
  ["Inspiring", "The goal is a student who keeps going after the session ends."],
];

export default function StudentLed() {
  return (
    <section id="student-led" className="section band">
      <div className="band-inner">
        <div className="band-copy" data-reveal="left">
          <h2>Student-led,<br />on purpose.</h2>
          <p>
            Bright Labs is run by students. That is not a footnote — it is the
            whole idea. The people leading our sessions learned this material
            recently enough to remember exactly which part was confusing, and
            they explain it the way they wish someone had explained it to them.
          </p>
          <p className="note">Curiosity first. The marks follow.</p>
        </div>

        <ul className="values">
          {VALUES.map(([term, line], i) => (
            <li
              key={term}
              data-reveal={i % 2 ? "pin-r" : "pin"}
              style={{ "--d": `${110 + i * 95}ms` }}
            >
              <span>{term}</span> {line}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
