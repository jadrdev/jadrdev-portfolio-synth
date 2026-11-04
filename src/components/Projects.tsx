import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

const groups = [
  {
    kind: "cliente",
    title: "Para clientes y en equipo",
    description: "Proyectos reales en producción. En los que hice en equipo indico cuál fue mi aportación.",
  },
  {
    kind: "propio",
    title: "Proyectos propios",
    description: "Apps que he diseñado y desarrollado por mi cuenta, de principio a fin.",
  },
] as const;

const Projects = () => {
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

        <div className="space-y-16">
          {groups.map((group) => (
            <div key={group.kind}>
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">{group.title}</h3>
                <p className="text-muted-foreground">{group.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects
                  .filter((project) => project.kind === group.kind)
                  .map((project, index) => (
                    <ProjectCard key={project.title} project={project} index={index % 3} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;