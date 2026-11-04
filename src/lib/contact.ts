export const WHATSAPP_NUMBER = "34611831797";
export const WHATSAPP_DISPLAY = "+34 611 83 17 97";

export const whatsappUrl = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const WHATSAPP_URL = whatsappUrl(
  "Hola, he visto tu web y me gustaría pedir presupuesto para un proyecto."
);

/** Options of the "¿Qué necesitas?" select in the contact form */
export const PROJECT_TYPES = [
  "App móvil (iOS y Android)",
  "App de fidelización para comercios",
  "Web o panel de gestión",
  "Mejorar o migrar una app existente",
  "Otro",
] as const;

/**
 * What a visitor wants to do. Each call to action carries one, so the contact form
 * opens with the right project type selected and analytics can tell them apart.
 */
export type ContactIntent = "app-nueva" | "mejorar-app" | "digitalizar-comercio" | "web";

interface IntentInfo {
  /** Button text */
  label: string;
  /** Value preselected in the contact form */
  projectType: (typeof PROJECT_TYPES)[number];
  /** Placeholder of the message field, to guide what to tell */
  placeholder: string;
  /** WhatsApp message prefilled for this intent */
  whatsappText: string;
}

export const CONTACT_INTENTS: Record<ContactIntent, IntentInfo> = {
  "app-nueva": {
    label: "Quiero una app nueva",
    projectType: "App móvil (iOS y Android)",
    placeholder: "Cuéntame tu idea: qué debe hacer la app, para quién es y si tienes alguna fecha en mente...",
    whatsappText: "Hola, he visto tu web y me gustaría pedir presupuesto para desarrollar una app nueva.",
  },
  "mejorar-app": {
    label: "Mejorar mi app actual",
    projectType: "Mejorar o migrar una app existente",
    placeholder: "Cuéntame qué app tienes, con qué tecnología está hecha y qué te gustaría mejorar o actualizar...",
    whatsappText: "Hola, he visto tu web y me gustaría que revisaras mi app actual para mejorarla o actualizarla.",
  },
  "digitalizar-comercio": {
    label: "Digitalizar mi comercio",
    projectType: "App de fidelización para comercios",
    placeholder: "Cuéntame sobre tu comercio o asociación: cuántos negocios sois y qué os gustaría ofrecer a vuestros clientes...",
    whatsappText: "Hola, he visto tu web y me gustaría digitalizar mi comercio o asociación con una app de fidelización.",
  },
  web: {
    label: "Quiero una web o panel",
    projectType: "Web o panel de gestión",
    placeholder: "Cuéntame qué web o panel necesitas, si ya tienes una y qué te gustaría conseguir con ella...",
    whatsappText: "Hola, he visto tu web y me gustaría pedir presupuesto para una web o un panel de gestión.",
  },
};

export const isContactIntent = (value: string | null): value is ContactIntent =>
  !!value && value in CONTACT_INTENTS;

/** Home page link that opens the contact form with this intent preselected */
export const contactHref = (intent: ContactIntent) => `/?tipo=${intent}#contact`;
