import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Services from "@/components/Services";
import Technologies from "@/components/Technologies";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="JadrDev - Senior Frontend Developer"
        description="Portfolio of JadrDev, a Senior Frontend Developer specializing in React, TypeScript, and modern web technologies."
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Blog />
        <Services />
        <Technologies />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;