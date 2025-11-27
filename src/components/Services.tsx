import { motion } from "framer-motion";
import { Code, Smartphone, RefreshCw, Lightbulb } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Code,
      title: "Desarrollo Frontend",
      description: "Creación de interfaces web modernas y responsivas utilizando las últimas tecnologías como Angular y TypeScript.",
    },
    {
      icon: Smartphone,
      title: "Desarrollo de Apps Móviles",
      description: "Aplicaciones nativas y multiplataforma con Ionic, Flutter y Capacitor, optimizadas para iOS y Android.",
    },
    {
      icon: RefreshCw,
      title: "Migraciones Tecnológicas",
      description: "Actualización y modernización de proyectos: Ionic a Flutter, PixiJS legacy a PixiJS 8, y más.",
    },
    {
      icon: Lightbulb,
      title: "Consultoría Técnica",
      description: "Asesoramiento en arquitectura de software, selección de tecnologías y mejores prácticas de desarrollo.",
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Lo que <span className="gradient-text">hago</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Servicios especializados en desarrollo web y móvil
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-8 hover-lift group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;