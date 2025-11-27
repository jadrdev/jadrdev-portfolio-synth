import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";

const Projects = () => {
  const projects = [
    {
      title: "App Móvil E-commerce",
      description: "Aplicación de comercio electrónico desarrollada con Ionic y Angular, con integración de pagos y gestión de inventario.",
      tags: ["Ionic", "Angular", "TypeScript", "Capacitor"],
      link: "#",
      github: "#",
    },
    {
      title: "Dashboard Analytics",
      description: "Dashboard interactivo para visualización de datos con gráficos en tiempo real y reportes personalizados.",
      tags: ["Angular", "TypeScript", "Chart.js", "RxJS"],
      link: "#",
      github: "#",
    },
    {
      title: "Fitness Tracker App",
      description: "App de seguimiento de ejercicios desarrollada con Flutter, con integración de sensores y sincronización en la nube.",
      tags: ["Flutter", "Dart", "Firebase", "Material Design"],
      link: "#",
      github: "#",
    },
    {
      title: "Game Engine UI",
      description: "Interfaz de usuario para motor de juegos utilizando PixiJS 8, con animaciones complejas y optimización de rendimiento.",
      tags: ["PixiJS", "TypeScript", "WebGL", "Canvas"],
      link: "#",
      github: "#",
    },
    {
      title: "Music Player Progressive App",
      description: "Reproductor de música PWA con diseño minimalista y funcionalidades offline, inspirado en mi pasión por la música.",
      tags: ["PWA", "TypeScript", "Web Audio API", "Service Workers"],
      link: "#",
      github: "#",
    },
    {
      title: "Portfolio CMS",
      description: "Sistema de gestión de contenido para portfolios creativos con editor WYSIWYG y preview en tiempo real.",
      tags: ["Laravel", "Vue.js", "MySQL", "TailwindCSS"],
      link: "#",
      github: "#",
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