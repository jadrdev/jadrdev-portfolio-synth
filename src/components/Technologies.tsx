import { motion } from "framer-motion";

const Technologies = () => {
  const techs = [
    { name: "Angular", color: "text-red-500" },
    { name: "Ionic", color: "text-blue-500" },
    { name: "Flutter", color: "text-cyan-400" },
    { name: "Capacitor", color: "text-blue-400" },
    { name: "PixiJS", color: "text-pink-500" },
    { name: "Laravel", color: "text-red-600" },
    { name: "TypeScript", color: "text-blue-600" },
    { name: "Dart", color: "text-teal-500" },
  ];

  return (
    <section id="technologies" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Tecnologías y herramientas que domino
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {techs.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
              className="group"
            >
              <div className="px-6 py-4 bg-card border border-border rounded-xl hover:border-primary transition-all">
                <span className={`text-lg font-semibold ${tech.color} group-hover:text-primary transition-colors`}>
                  {tech.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;