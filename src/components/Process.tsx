import { motion } from "framer-motion";
import { MessageSquare, FileText, Code2, Rocket } from "lucide-react";

const Process = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "Hablamos",
      description: "Me cuentas tu idea o el problema que quieres resolver. Sin compromiso y sin tecnicismos.",
    },
    {
      icon: FileText,
      title: "Propuesta",
      description: "Te envío una propuesta con el alcance, las fases, los plazos y un presupuesto detallado.",
    },
    {
      icon: Code2,
      title: "Diseño y desarrollo",
      description: "Trabajo por entregas para que veas avances reales y puedas opinar durante todo el proceso.",
    },
    {
      icon: Rocket,
      title: "Publicación y soporte",
      description: "Publico la app en App Store y Google Play y te acompaño después del lanzamiento.",
    },
  ];

  return (
    <section id="process" className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Cómo <span className="gradient-text">trabajo</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Un proceso claro para que sepas en todo momento en qué punto está tu proyecto
          </p>
        </motion.div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-card border border-border rounded-xl p-6"
            >
              <span className="absolute top-4 right-5 text-4xl font-bold text-primary/20">
                {index + 1}
              </span>
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
