import { motion } from "framer-motion";
import { ExternalLink, Github, Smartphone } from "lucide-react";
import { Button } from "./ui/button";

// Custom Apple icon component since it might not be in the current lucide-react version or to ensure consistency
const AppleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
    <path d="M10 2c1 .5 2 2 2 5" />
  </svg>
);

const Projects = () => {
  const projects = [
    {
      title: "Jable Card - ACEA Lanzarote",
      role: "Senior Frontend en Servicios Avanzados de Opinión",
      description: "App móvil de fidelización para asociación de comerciantes de Lanzarote. Sistema de puntos, ofertas y gestión de comercios.",
      tags: ["Ionic", "Angular", "TypeScript", "Capacitor"],
      link: "https://acealanzarote.com/jable-card/",
      iosLink: "https://apps.apple.com/es/app/jable/id6744336880",
      androidLink: "https://play.google.com/store/apps/details?id=es.jable.user.app&pli=1",
    },
    {
      title: "iHerro - Fidelización",
      role: "Senior Frontend en Servicios Avanzados de Opinión",
      description: "Plataforma de fidelización completa con app móvil y panel de administración para asociaciones comerciales.",
      tags: ["Ionic", "Angular", "TypeScript", "Capacitor"],
      link: "https://iherro.com/",
      iosLink: "https://apps.apple.com/es/app/iherro/id6743393970?l=en-GB",
      androidLink: "https://play.google.com/store/apps/details?id=es.iherro.user.app&pli=1",
    },
    {
      title: 'Juntos Por el Cole- iHerro',
      role: 'Senior Frontend en Servicios Avanzados de Opinión',
      description: 'Iniciativa que conecta el comercio local con la comunidad educativa de la isla de El Hierro, para recaudar fondos a través de las ventas y hacer posible el viaje de fin de curso',
      tags: ['Ionic', 'Angular', 'TypeScript', 'Capacitor'],
      link: 'https://juntosporcole.com/',
    },
    {
      title: "AppTalega",
      role: "Senior Frontend en Servicios Avanzados de Opinión",
      description: "Sistema de fidelización y gestión de comercios con aplicación móvil multiplataforma y dashboard de administración.",
      tags: ["Ionic", "Angular", "TypeScript", "Capacitor"],
      link: "https://apptalega.com/",
      iosLink: "https://apps.apple.com/us/app/talega/id6743695641?platform=iphone",
      androidLink: "https://play.google.com/store/apps/details?id=es.talega.user.app",
    },
    {
      title: "PROSA Puerto del Rosario",
      role: "Senior Frontend en Servicios Avanzados de Opinión",
      description: "App de fidelización para la asociación de comerciantes de Puerto del Rosario, con gestión de ofertas y beneficios.",
      tags: ["Ionic", "Angular", "TypeScript", "Capacitor"],
      link: "https://prosapuertodelrosario.com/",
      iosLink: "https://apps.apple.com/us/app/prosa/id6743711087",
      androidLink: "https://play.google.com/store/apps/details?id=es.prosa.user.app&hl=es_419",
    },
    {
      title: "Krondoc",
      role: "Senior Frontend en Servicios Avanzados de Opinión",
      description: "Aplicación de control de fichaje para gestionar el control horario y reportes.",
      tags: ["Ionic", "Angular", "TypeScript", "Capacitor"],
      link: "https://krondoc.com/",
      iosLink: "https://apps.apple.com/es/app/krondoc/id6741791280",
      androidLink: "https://play.google.com/store/apps/details?id=com.krondoc.app&hl=es_419",
    },
    {
      "title": "Juego - Tejinenado",
      "role": "Senior Frontend en Servicios Avanzados de Opinión",
      "description": "Juego desarrollado con Pixi.js 8 integrado en Ionic/Capacitor, con sistemas de combate, coplas, preguntas y progresión. Incluye gestión de escenas, optimización gráfica y uso de funcionalidades nativas como geolocalización y almacenamiento local para iOS, Android y Web.",
      "tags": [
        "PixiJS 8",
        "Ionic",
        "Capacitor",
        "TypeScript",
        "Game Development",
        "Geolocalización"
      ],
      "link": "https://tejineando.com/",
      "iosLink": "https://apps.apple.com/es/app/tejineando/id6748699961?platform=iphone",
      "androidLink": "https://play.google.com/store/apps/details?id=com.v1.tejineando.app&hl=es"
    },
    {
      title: "Gasolineras de Canarias",
      role: "Proyecto Propio",
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
                <div className="flex flex-col gap-1">
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
                        <a href={project.link} target="_blank" rel="noopener noreferrer" title="Ver web">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>

                      {project.iosLink && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:text-primary"
                          asChild
                        >
                          <a href={project.iosLink} target="_blank" rel="noopener noreferrer" title="App Store">
                            <AppleIcon className="h-4 w-4" />
                          </a>
                        </Button>
                      )}

                      {project.androidLink && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:text-primary"
                          asChild
                        >
                          <a href={project.androidLink} target="_blank" rel="noopener noreferrer" title="Google Play">
                            <Smartphone className="h-4 w-4" />
                          </a>
                        </Button>
                      )}

                      {project.github && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:text-primary"
                          asChild
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer" title="Código fuente">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-primary">
                    {project.role}
                  </p>
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