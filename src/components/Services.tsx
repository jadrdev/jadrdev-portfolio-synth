import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "@/data/services";
import ContactCTA from "./ContactCTA";

const Services = () => {
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
              key={service.slug}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* The whole card opens the service page (stretched link); the CTA sits above it */}
              <div className="relative h-full bg-card border border-border rounded-xl p-8 hover-lift group hover:border-primary/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      <Link to={`/servicios/${service.slug}`} className="after:absolute after:inset-0 after:rounded-xl">
                        {service.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground mb-6">{service.summary}</p>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                      <ContactCTA
                        intent={service.cta.intent}
                        source="servicios"
                        className="relative z-10 inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
                      >
                        {service.cta.label}
                      </ContactCTA>
                      <span className="inline-flex items-center text-sm font-medium text-primary">
                        Más información
                        <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
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
