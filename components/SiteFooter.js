import Social from "./Social";
import Year from "./Year";

export default function SiteFooter() {
  return (
    <footer className="site-foot">
      <img src="/assets/bulb.png" alt="" />
      <Social />
      <p>&copy; <Year /> Bright Labs Vaughan</p>
      <p className="foot-tag">Student-led science, in Vaughan.</p>
    </footer>
  );
}
