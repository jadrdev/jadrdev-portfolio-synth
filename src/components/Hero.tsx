import { motion } from "framer-motion";
import { ArrowDown, MapPin, Smartphone, Layers, Rocket } from "lucide-react";
import { Button } from "./ui/button";
import heroImage from "@/assets/hero-image.jpg";

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const Hero = () => {
  const highlights = [
    { icon: Smartphone, text: "6 apps publicadas en App Store y Google Play" },
    { icon: Layers, text: "iOS, Android y Web con un solo código" },
    { icon: Rocket, text: "De la idea a la publicación en las tiendas" },
  ];

  const apps = ["Jable", "iHerro", "Talega", "PROSA", "Krondoc", "Tejineando"];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-hero">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6 max-w-5xl mx-auto">
          <motion.p
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm sm:text-base text-foreground"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span>
              Hola, soy <span className="font-semibold text-primary">JadrDev</span> · Desarrollador en Canarias
            </span>
          </motion.p>

          {/* Rendered without entry animation so it paints immediately (LCP) */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            Apps móviles y webs que tus clientes{" "}
            <span className="gradient-text">usan de verdad</span>
          </h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Diseño y desarrollo apps para iOS y Android y webs a medida para comercios,
            asociaciones y empresas de Canarias y toda España.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground glow-primary font-semibold text-lg px-8 py-6"
              onClick={() => scrollTo("contact")}
            >
              Pide presupuesto
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10 font-semibold text-lg px-8 py-6"
              onClick={() => scrollTo("projects")}
            >
              Ver proyectos
            </Button>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            className="pt-10 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <ul className="flex flex-col md:flex-row justify-center gap-3 md:gap-8 text-sm sm:text-base text-foreground/90">
              {highlights.map((item) => (
                <li key={item.text} className="flex items-center justify-center gap-2">
                  <item.icon className="w-5 h-5 text-primary shrink-0" />
                  {item.text}
                </li>
              ))}
            </ul>

            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                Apps en las que he trabajado
              </p>
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-lg font-semibold text-foreground/60">
                {apps.map((app) => (
                  <li key={app}>{app}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          onClick={() => scrollTo("services")}
          aria-label="Ver servicios"
        >
          <ArrowDown className="w-6 h-6 text-primary" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
