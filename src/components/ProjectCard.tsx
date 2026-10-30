import { motion } from "framer-motion";
import { ExternalLink, Github, Smartphone } from "lucide-react";
import { Button } from "./ui/button";
import type { Project } from "@/data/projects";

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

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const links = [
    { href: project.link, title: "Ver web", icon: ExternalLink },
    { href: project.iosLink, title: "App Store", icon: AppleIcon },
    { href: project.androidLink, title: "Google Play", icon: Smartphone },
    { href: project.github, title: "Código fuente", icon: Github },
  ].filter((link) => link.href);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-card border border-border rounded-xl p-6 hover-lift group"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <img
            src={project.icon}
            alt={`Icono de la app ${project.title}`}
            width={64}
            height={64}
            loading="lazy"
            className="h-16 w-16 rounded-2xl shadow-md ring-1 ring-border object-cover"
          />
          <div className="flex gap-1">
            {links.map((link) => (
              <Button
                key={link.title}
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:text-primary"
                asChild
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.title}
                  aria-label={`${link.title}: ${project.title}`}
                >
                  <link.icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {project.title}
          </h3>
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
  );
};

export default ProjectCard;
