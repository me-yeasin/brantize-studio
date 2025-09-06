import About from "./_components/about";
import Blog from "./_components/blog";
import Contact from "./_components/contact";
import Hero from "./_components/hero";
import Portfolio from "./_components/portfolio";
import ScrollHandler from "./_components/scroll_handler";
import Services from "./_components/service";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <ScrollHandler />
      <section id="home">
        <Hero />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="portfolio">
        <Portfolio />
      </section>
      <section id="blog">
        <Blog />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}
