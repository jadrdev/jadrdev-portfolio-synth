import { motion } from "framer-motion";
import { Mail, Twitter, Github, Linkedin, Send, Instagram, Youtube, MessageCircle } from "lucide-react";
import { WHATSAPP_URL, WHATSAPP_DISPLAY } from "@/lib/contact";
import { Tiktok } from "./icons/Tiktok";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const projectTypes = [
  "App móvil (iOS y Android)",
  "App de fidelización para comercios",
  "Web o panel de gestión",
  "Mejorar o migrar una app existente",
  "Otro",
];

const budgets = [
  "Aún no lo sé",
  "Menos de 3.000 €",
  "3.000 € – 10.000 €",
  "Más de 10.000 €",
];

const selectClassName =
  "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:border-primary";

const initialFormData = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
};

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const serviceId = "service_81c64r8";
      const templateId = "template_e44jqfr";
      const publicKey = "YnY8LBtLLyDw3tVSx";

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        project_type: formData.projectType,
        budget: formData.budget,
        // Also folded into the message so the existing EmailJS template shows it
        message: `Tipo de proyecto: ${formData.projectType || "-"}\nPresupuesto: ${formData.budget || "-"}\n\n${formData.message}`,
        to_name: "Jadrdev", // Tu nombre
      };

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      toast({
        title: "¡Mensaje enviado!",
        description: "Te responderé lo antes posible.",
      });

      // Reset form
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/jadrdevcm", label: "Instagram" },
    { icon: Tiktok, href: "https://www.tiktok.com/@jadrdevcm", label: "Tiktok" },
    { icon: Youtube, href: "https://www.youtube.com/@jadrdevcm", label: "Youtube" },
    { icon: Twitter, href: "https://twitter.com/jadrdevcm", label: "Twitter" },
    { icon: Github, href: "https://github.com/jadrdev", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/jadrdev", label: "LinkedIn" },
    { icon: MessageCircle, href: WHATSAPP_URL, label: "WhatsApp" },
    { icon: Mail, href: "mailto:info@jadrdev.com", label: "Email" },
  ];

  return (
    <section id="contact" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Hablemos de tu <span className="gradient-text">proyecto</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Cuéntame tu idea y te preparo una propuesta con presupuesto, sin compromiso
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-xl p-8 space-y-6"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nombre
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background border-border focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background border-border focus:border-primary"
                />
              </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                    ¿Qué necesitas?
                  </label>
                  <select
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className={selectClassName}
                  >
                    <option value="">Selecciona una opción</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium mb-2">
                    Presupuesto orientativo
                  </label>
                  <select
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className={selectClassName}
                  >
                    <option value="">Selecciona una opción</option>
                    {budgets.map((budget) => (
                      <option key={budget} value={budget}>{budget}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  placeholder="Cuéntame sobre tu proyecto..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-background border-border focus:border-primary resize-none"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-primary font-semibold"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? "Enviando..." : "Pedir presupuesto"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              ¿Prefieres hablar directamente? Escríbeme por{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                WhatsApp ({WHATSAPP_DISPLAY})
              </a>{" "}
              o a{" "}
              <a href="mailto:info@jadrdev.com" className="text-primary hover:underline">
                info@jadrdev.com
              </a>
            </p>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-12"
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card border border-border rounded-lg hover:border-primary hover:text-primary transition-all hover-lift"
                aria-label={link.label}
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;