import { motion } from "framer-motion";
import { Code, Smartphone, RefreshCw, Store } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Smartphone,
      title: "Apps móviles para iOS y Android",
      description: "Desarrollo tu app multiplataforma con Ionic, Capacitor o Flutter: un solo código para iOS, Android y Web, lista para publicar en las tiendas.",
    },
    {
      icon: Store,
      title: "Apps de fidelización para comercios",
      description: "Tarjetas de puntos, ofertas y campañas para asociaciones de comerciantes y negocios locales, con app para clientes y panel de gestión.",
    },
    {
      icon: Code,
      title: "Webs y paneles de gestión",
      description: "Webs a medida y paneles de administración rápidos y responsivos con Angular y TypeScript, conectados a tu app o a tus sistemas.",
    },
    {
      icon: RefreshCw,
      title: "Migración, mantenimiento y consultoría",
      description: "Modernizo apps existentes (de Ionic a Flutter, PixiJS legacy a PixiJS 8…) y te asesoro sobre arquitectura y la tecnología más adecuada.",
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
            ¿En qué te puedo <span className="gradient-text">ayudar</span>?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Servicios de desarrollo de apps móviles y webs para empresas, comercios y asociaciones
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