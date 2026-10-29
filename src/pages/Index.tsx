import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Services from "@/components/Services";
import Technologies from "@/components/Technologies";
import Contact from "@/components/Contact";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import { SEO, SITE_URL } from "@/components/SEO";

const sameAs = [
  "https://www.instagram.com/jadrdevcm",
  "https://www.tiktok.com/@jadrdevcm",
  "https://www.youtube.com/@jadrdevcm",
  "https://twitter.com/jadrdevcm",
  "https://github.com/jadrdev",
  "https://linkedin.com/in/jadrdev",
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "JadrDev",
    url: SITE_URL,
    image: `${SITE_URL}/og-image-final.png`,
    jobTitle: "Desarrollador Frontend y de Apps Móviles",
    email: "mailto:info@jadrdev.com",
    knowsAbout: ["Angular", "Ionic", "Flutter", "Capacitor", "TypeScript", "Desarrollo de apps móviles"],
    sameAs,
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: "JadrDev - Desarrollo de apps móviles y webs",
    url: SITE_URL,
    image: `${SITE_URL}/og-image-final.png`,
    email: "info@jadrdev.com",
    telephone: "+34611831797",
    founder: { "@id": `${SITE_URL}/#person` },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Canarias" },
      { "@type": "Country", name: "España" },
    ],
    serviceType: [
      "Desarrollo de apps móviles iOS y Android",
      "Desarrollo frontend",
      "Apps de fidelización para comercios",
      "Migraciones tecnológicas",
      "Consultoría técnica",
    ],
    sameAs,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Desarrollador de Apps Móviles en Canarias | Ionic, Angular y Flutter – JadrDev"
        description="Creo apps móviles para iOS y Android y webs a medida para comercios, asociaciones y empresas en Canarias. 6 apps publicadas en App Store y Google Play. Pide presupuesto sin compromiso."
        url={`${SITE_URL}/`}
        jsonLd={jsonLd}
      />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Process />
        <About />
        <Technologies />
        <Blog />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;