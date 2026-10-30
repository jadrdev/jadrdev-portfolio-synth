import jableIcon from "@/assets/projects/jable.webp";
import iherroIcon from "@/assets/projects/iherro.webp";
import talegaIcon from "@/assets/projects/talega.webp";
import prosaIcon from "@/assets/projects/prosa.webp";
import krondocIcon from "@/assets/projects/krondoc.webp";
import tejineandoIcon from "@/assets/projects/tejineando.webp";
import gasolinerasIcon from "@/assets/projects/gasolineras-canarias.webp";
import pautaIcon from "@/assets/projects/pauta.webp";

export interface Project {
  title: string;
  icon: string;
  role: string;
  description: string;
  tags: string[];
  /** Slugs of the service pages this project illustrates */
  services: string[];
  link?: string;
  iosLink?: string;
  androidLink?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    title: "Jable Card - ACEA Lanzarote",
    services: ["desarrollo-apps-moviles", "apps-fidelizacion-comercios"],
    icon: jableIcon,
    role: "Senior Frontend en Servicios Avanzados de Opinión",
    description: "App móvil de fidelización para asociación de comerciantes de Lanzarote. Sistema de puntos, ofertas y gestión de comercios.",
    tags: ["Ionic", "Angular", "TypeScript", "Capacitor"],
    link: "https://acealanzarote.com/jable-card/",
    iosLink: "https://apps.apple.com/es/app/jable/id6744336880",
    androidLink: "https://play.google.com/store/apps/details?id=es.jable.user.app&pli=1",
  },
  {
    title: "iHerro - Fidelización",
    services: ["desarrollo-apps-moviles", "apps-fidelizacion-comercios", "desarrollo-web-paneles"],
    icon: iherroIcon,
    role: "Senior Frontend en Servicios Avanzados de Opinión",
    description: "Plataforma de fidelización completa con app móvil y panel de administración para asociaciones comerciales.",
    tags: ["Ionic", "Angular", "TypeScript", "Capacitor"],
    link: "https://iherro.com/",
    iosLink: "https://apps.apple.com/es/app/iherro/id6743393970?l=en-GB",
    androidLink: "https://play.google.com/store/apps/details?id=es.iherro.user.app&pli=1",
  },
  {
    title: "AppTalega",
    services: ["desarrollo-apps-moviles", "apps-fidelizacion-comercios", "desarrollo-web-paneles"],
    icon: talegaIcon,
    role: "Senior Frontend en Servicios Avanzados de Opinión",
    description: "Sistema de fidelización y gestión de comercios con aplicación móvil multiplataforma y dashboard de administración.",
    tags: ["Ionic", "Angular", "TypeScript", "Capacitor"],
    link: "https://apptalega.com/",
    iosLink: "https://apps.apple.com/us/app/talega/id6743695641?platform=iphone",
    androidLink: "https://play.google.com/store/apps/details?id=es.talega.user.app",
  },
  {
    title: "PROSA Puerto del Rosario",
    services: ["desarrollo-apps-moviles", "apps-fidelizacion-comercios"],
    icon: prosaIcon,
    role: "Senior Frontend en Servicios Avanzados de Opinión",
    description: "App de fidelización para la asociación de comerciantes de Puerto del Rosario, con gestión de ofertas y beneficios.",
    tags: ["Ionic", "Angular", "TypeScript", "Capacitor"],
    link: "https://prosapuertodelrosario.com/",
    iosLink: "https://apps.apple.com/us/app/prosa/id6743711087",
    androidLink: "https://play.google.com/store/apps/details?id=es.prosa.user.app&hl=es_419",
  },
  {
    title: "Krondoc",
    services: ["desarrollo-apps-moviles"],
    icon: krondocIcon,
    role: "Senior Frontend en Servicios Avanzados de Opinión",
    description: "Aplicación de control de fichaje para gestionar el control horario y reportes.",
    tags: ["Ionic", "Angular", "TypeScript", "Capacitor"],
    link: "https://krondoc.com/",
    iosLink: "https://apps.apple.com/es/app/krondoc/id6741791280",
    androidLink: "https://play.google.com/store/apps/details?id=com.krondoc.app&hl=es_419",
  },
  {
    title: "Juego - Tejineando",
    services: ["desarrollo-apps-moviles", "migracion-mantenimiento-apps"],
    icon: tejineandoIcon,
    role: "Senior Frontend en Servicios Avanzados de Opinión",
    description: "Juego móvil para iOS y Android desarrollado en Godot 4 —migrado desde Ionic + PixiJS—, con sistemas de combate, coplas, preguntas y progresión, y funcionalidades nativas como la geolocalización.",
    tags: [
      "Godot 4",
      "GDScript",
      "Game Development",
      "Geolocalización"
    ],
    link: "https://tejineando.com/",
    iosLink: "https://apps.apple.com/es/app/tejineando/id6748699961?platform=iphone",
    androidLink: "https://play.google.com/store/apps/details?id=com.v1.tejineando.app&hl=es"
  },
  {
    title: "Gasolineras de Canarias",
    services: ["desarrollo-apps-moviles"],
    icon: gasolinerasIcon,
    role: "Proyecto Propio",
    description: "Aplicación móvil para localizar gasolineras en Canarias con precios actualizados y rutas optimizadas.",
    tags: ["Flutter", "Dart", "Google Maps API"],
    link: "https://jadrdev.github.io/gasolineras_can/",
    github: "https://github.com/jadrdev/gasolineras_can",
  },
  {
    title: "Pauta",
    services: ["desarrollo-apps-moviles"],
    icon: pautaIcon,
    role: "Proyecto Propio",
    description: "Gestor de tareas nativo en SwiftUI para macOS, con app de iOS, widgets y Apple Watch. Sin cuentas ni suscripciones: tus datos se sincronizan en tu propia carpeta de iCloud.",
    tags: ["Swift", "SwiftUI", "macOS", "iOS", "iCloud"],
    github: "https://github.com/jadrdev/pauta",
  },
];
