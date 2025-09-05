import AuthModal from "../overlays/auth_modal";
import About from "./_components/about";
import Blog from "./_components/blog";
import Contact from "./_components/contact";
import Hero from "./_components/hero";
import Portfolio from "./_components/portfolio";
import Services from "./_components/service";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Hero />
      <Services />
      <Portfolio />
      <Blog />
      <About />
      <Contact />
      <AuthModal />
    </div>
  );
}
