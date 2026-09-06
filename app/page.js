import Doodles from "@/components/Doodles";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import StudentLed from "@/components/StudentLed";
import About from "@/components/About";
import Contact from "@/components/Contact";
import SiteFooter from "@/components/SiteFooter";
import StudioCredit from "@/components/StudioCredit";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Doodles />
      <SiteHeader />
      <main id="top">
        <Hero />
        <WhatWeDo />
        <StudentLed />
        <About />
        <Contact />
      </main>
      <SiteFooter />
      {/* Last thing on the page, below the footer rather than inside it — the
          footer is Bright Labs signing off, and this is a separate hand. */}
      <StudioCredit />
      <Reveal />
    </>
  );
}
