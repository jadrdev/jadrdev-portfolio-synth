import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet-async";

const faqs = [
  {
    question: "¿Cuánto cuesta desarrollar una app?",
    answer:
      "Depende de las funcionalidades, las integraciones y el diseño que necesites. Tras una primera conversación te preparo un presupuesto detallado y sin compromiso, dividido por fases para que sepas exactamente qué incluye cada una.",
  },
  {
    question: "¿Cuánto tiempo se tarda en tener la app publicada?",
    answer:
      "Varía según el alcance del proyecto. En la propuesta incluyo un calendario por fases y, durante el desarrollo, recibes entregas periódicas para ver los avances.",
  },
  {
    question: "¿Desarrollas para iOS y Android a la vez?",
    answer:
      "Sí. Trabajo con tecnologías multiplataforma como Ionic, Capacitor y Flutter, que permiten tener la app en iOS, Android y Web con una sola base de código, reduciendo coste y mantenimiento.",
  },
  {
    question: "¿Te encargas de publicar la app en App Store y Google Play?",
    answer:
      "Sí. Me ocupo de preparar y publicar la app en las tiendas y de acompañarte en el proceso de revisión de Apple y Google.",
  },
  {
    question: "¿Trabajas solo con clientes de Canarias?",
    answer:
      "Estoy en Canarias y he trabajado en apps para comercios y asociaciones de Lanzarote, Fuerteventura y El Hierro, pero trabajo en remoto con clientes de toda España.",
  },
  {
    question: "¿Puedes mejorar, mantener o migrar una app que ya tengo?",
    answer:
      "Sí. Reviso el estado actual del proyecto y te propongo cómo mejorarlo o modernizarlo, por ejemplo migrando de Ionic a Flutter o actualizando librerías y dependencias antiguas.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const FAQ = () => {
  return (
    <section id="faq" className="py-20 sm:py-32 bg-muted/30">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Preguntas <span className="gradient-text">frecuentes</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Lo que suelen preguntarme antes de empezar un proyecto
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group bg-card border border-border rounded-xl px-6 open:border-primary/40"
            >
              <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none text-left font-semibold text-lg [&::-webkit-details-marker]:hidden">
                <h3>{faq.question}</h3>
                <ChevronDown className="w-5 h-5 text-primary shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="pb-5 text-muted-foreground leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
