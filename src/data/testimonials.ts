export interface Testimonial {
  /** The client's own words, approved by them before publishing */
  quote: string;
  /** Person's name, or omit to show only the company */
  name?: string;
  company: string;
  /** Project title from projects.ts, shown as context */
  project?: string;
}

// Only real, client-approved quotes go here. The section stays hidden while it is empty.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Necesitábamos una web sencilla que mostrara la barbería y facilitara que los clientes nos encontraran. JadrDev entendió lo que queríamos desde el principio y el resultado es justo lo que buscábamos.",
    name: "Eduardo",
    company: "Fabrik Barber",
    project: "Web de la barbería",
  },
  {
    quote: "Nos desarrolló la web y también una app. Rápido, resolutivo y siempre pendiente de los detalles.",
    company: "Gesfinc Canarias",
    project: "Web y app",
  },
];
