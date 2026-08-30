import Doodles from "@/components/Doodles";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import StudentLed from "@/components/StudentLed";
import About from "@/components/About";
import Contact from "@/components/Contact";
import SiteFooter from "@/components/SiteFooter";

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
    </>
  );
}
