import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { ScrollEffects } from "./components/motion/ScrollEffects";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { Hero } from "./components/sections/Hero";
import { Process } from "./components/sections/Process";
import { Quote } from "./components/sections/Quote";
import { Services } from "./components/sections/Services";

export default function Home() {
  return (
    <div className="page">
      <Header />
      <main>
        <Hero />
        <About />
        <Quote />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
      <ScrollEffects />
    </div>
  );
}
