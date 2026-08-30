import Doodles from "@/components/Doodles";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import Experiment from "@/components/Experiment";
import StudentLed from "@/components/StudentLed";
import About from "@/components/About";
import Contact from "@/components/Contact";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Doodles />
      <SiteHeader />
      <main id="top">
        <Hero />
        <WhatWeDo />
        <Experiment />
        <StudentLed />
        <About />
        <Contact />
      </main>
      <SiteFooter />
      <Reveal />
    </>
  );
}
