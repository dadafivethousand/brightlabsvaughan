// The doodles that live behind everything: the bulb's own rays, borrowed and
// scattered. aria-hidden and pointer-events:none — they are wallpaper.
export default function Doodles() {
  return (
    <div className="doodles" aria-hidden="true">
      <svg className="doodle doodle--a" viewBox="0 0 120 120">
        <g fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round">
          <path d="M60 8v22M22 22l14 17M98 22 84 39M8 60h22M112 60H90" />
        </g>
      </svg>
      <svg className="doodle doodle--b" viewBox="0 0 120 120">
        <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
          <circle cx="60" cy="60" r="14" />
          <ellipse cx="60" cy="60" rx="52" ry="21" />
          <ellipse cx="60" cy="60" rx="52" ry="21" transform="rotate(60 60 60)" />
          <ellipse cx="60" cy="60" rx="52" ry="21" transform="rotate(120 60 60)" />
        </g>
      </svg>
      <svg className="doodle doodle--c" viewBox="0 0 120 120">
        <g fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M46 12h28M52 12v34L28 96a10 10 0 0 0 9 15h46a10 10 0 0 0 9-15L68 46V12" />
          <path d="M38 76h44" />
        </g>
      </svg>
      <svg className="doodle doodle--d" viewBox="0 0 120 120">
        <g fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round">
          <path d="M60 8v22M22 22l14 17M98 22 84 39M8 60h22M112 60H90" />
        </g>
      </svg>
    </div>
  );
}
