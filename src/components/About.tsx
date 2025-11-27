import { motion } from "framer-motion";
import { Code2, Smartphone, Music } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Code2,
      title: "Frontend Development",
      description: "Experiencia en Angular, TypeScript y desarrollo web moderno",
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Especializado en Ionic, Flutter y Capacitor para apps nativas",
    },
    {
      icon: Music,
      title: "Creative Side",
      description: "Un toque creativo inspirado en la música y el arte digital",
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Sobre <span className="gradient-text">mí</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Soy un desarrollador frontend apasionado por crear aplicaciones móviles y web que combinan 
            funcionalidad con diseño elegante. Me especializo en transformar ideas en experiencias 
            digitales fluidas usando tecnologías como <span className="text-primary font-semibold">Ionic</span>, 
            <span className="text-primary font-semibold"> Angular</span> y <span className="text-primary font-semibold">Flutter</span>.
          </p>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mt-4">
            Cuando no estoy escribiendo código, exploro mi lado creativo a través de la música, 
            lo que aporta una perspectiva única a mis proyectos técnicos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-6 hover-lift"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;