import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";

const Projects = () => {
  const projects = [
    {
      title: "Jable Card - ACEA Lanzarote",
      description: "App móvil de fidelización para asociación de comerciantes de Lanzarote. Sistema de puntos, ofertas y gestión de comercios.",
      tags: ["Ionic", "Angular", "TypeScript", "Capacitor"],
      link: "https://acealanzarote.com/jable-card/",
      github: "#",
    },
    {
      title: "iHerro - Fidelización",
      description: "Plataforma de fidelización completa con app móvil y panel de administración para asociaciones comerciales.",
      tags: ["Ionic", "Angular", "TypeScript", "Capacitor"],
      link: "https://iherro.com/",
      github: "#",
    },
    {
      title: "AppTalega",
      description: "Sistema de fidelización y gestión de comercios con aplicación móvil multiplataforma y dashboard de administración.",
      tags: ["Ionic", "Angular", "TypeScript", "Capacitor"],
      link: "https://apptalega.com/",
      github: "#",
    },
    {
      title: "PROSA Puerto del Rosario",
      description: "App de fidelización para la asociación de comerciantes de Puerto del Rosario, con gestión de ofertas y beneficios.",
      tags: ["Ionic", "Angular", "TypeScript", "Capacitor"],
      link: "https://prosapuertodelrosario.com/",
      github: "#",
    },
    {
      title: "Krondoc",
      description: "Aplicación de control de fichaje para gestionar el control horario y reportes.",
      tags: ["Ionic", "Angular", "TypeScript", "Capacitor"],
      link: "https://krondoc.com/",
      github: "#",
    },
    {
      title: "Gasolineras de Canarias",
      description: "Aplicación móvil para localizar gasolineras en Canarias con precios actualizados y rutas optimizadas.",
      tags: ["Flutter", "Dart", "Google Maps API"],
      link: "https://jadrdev.github.io/gasolineras_can/",
      github: "https://github.com/jadrdev/gasolineras_can",
    },
  ];

  return (
    <section id="projects" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Proyectos <span className="gradient-text">destacados</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Una selección de mis trabajos más recientes en desarrollo web y móvil
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-6 hover-lift group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:text-primary"
                      asChild
                    >
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:text-primary"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;