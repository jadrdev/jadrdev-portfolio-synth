import { Code, Smartphone, RefreshCw, Store, type LucideIcon } from "lucide-react";

export interface Service {
  slug: string;
  icon: LucideIcon;
  /** Short title used on the home page cards */
  title: string;
  /** Card copy on the home page */
  summary: string;
  seoTitle: string;
  seoDescription: string;
  heading: string;
  intro: string[];
  includes: { title: string; description: string }[];
  audience: string[];
  faqs: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    slug: "desarrollo-apps-moviles",
    icon: Smartphone,
    title: "Apps móviles para iOS y Android",
    summary:
      "Desarrollo tu app multiplataforma con Ionic, Capacitor o Flutter: un solo código para iOS, Android y Web, lista para publicar en las tiendas.",
    seoTitle: "Desarrollo de apps móviles para iOS y Android en Canarias",
    seoDescription:
      "Desarrollo de apps móviles multiplataforma para iOS, Android y Web con Ionic, Capacitor y Flutter. Del diseño a la publicación en App Store y Google Play. Pide presupuesto.",
    heading: "Desarrollo de apps móviles para iOS y Android",
    intro: [
      "Convierto tu idea en una app real, publicada en App Store y Google Play. Trabajo con tecnologías multiplataforma como Ionic, Capacitor y Flutter, que permiten tener la app en iOS, Android y Web a partir de una única base de código.",
      "Eso significa menos coste de desarrollo, un mantenimiento más sencillo y la misma experiencia para todos tus usuarios, tengan el móvil que tengan.",
    ],
    includes: [
      {
        title: "Diseño de la experiencia",
        description: "Pantallas claras y fáciles de usar, pensadas para que tus usuarios encuentren lo que buscan sin esfuerzo.",
      },
      {
        title: "Desarrollo multiplataforma",
        description: "Una sola base de código para iOS, Android y Web con Ionic, Capacitor o Flutter.",
      },
      {
        title: "Funcionalidades nativas",
        description: "Notificaciones push, geolocalización, cámara, lector de códigos QR o almacenamiento local cuando el proyecto lo necesita.",
      },
      {
        title: "Conexión con tu sistema",
        description: "Integración con APIs, bases de datos y paneles de gestión para que la app trabaje con tus datos reales.",
      },
      {
        title: "Publicación en las tiendas",
        description: "Preparo y publico la app en App Store y Google Play y te acompaño en el proceso de revisión.",
      },
      {
        title: "Evolución y mantenimiento",
        description: "Actualizaciones, nuevas funcionalidades y adaptación a las nuevas versiones de iOS y Android.",
      },
    ],
    audience: [
      "Empresas que quieren ofrecer sus servicios desde el móvil.",
      "Comercios y asociaciones que buscan fidelizar a sus clientes.",
      "Emprendedores con una idea que quieren validar con una app real.",
    ],
    faqs: [
      {
        question: "¿Es mejor una app nativa o una multiplataforma?",
        answer:
          "Para la mayoría de proyectos una app multiplataforma es la opción más rentable: un solo código para iOS y Android con un rendimiento excelente. Si tu proyecto necesita algo muy específico de una plataforma, te lo diré en la propuesta.",
      },
      {
        question: "¿La app funcionará también en la web?",
        answer:
          "Con Ionic y Capacitor la misma app puede publicarse también como aplicación web (PWA), sin desarrollar una versión aparte.",
      },
    ],
  },
  {
    slug: "apps-fidelizacion-comercios",
    icon: Store,
    title: "Apps de fidelización para comercios",
    summary:
      "Tarjetas de puntos, ofertas y campañas para asociaciones de comerciantes y negocios locales, con app para clientes y panel de gestión.",
    seoTitle: "Apps de fidelización para comercios y asociaciones de comerciantes",
    seoDescription:
      "App de fidelización con tarjeta de puntos, ofertas y campañas para asociaciones de comerciantes y negocios locales en Canarias. Experiencia en apps como Jable, iHerro, Talega y PROSA.",
    heading: "Apps de fidelización para comercios y asociaciones",
    intro: [
      "He participado en el desarrollo de varias apps de fidelización para asociaciones de comerciantes de Canarias, como Jable en Lanzarote, iHerro en El Hierro, Talega o PROSA en Puerto del Rosario.",
      "Una app de fidelización ayuda a que los clientes vuelvan al comercio local: acumulan puntos con sus compras, reciben ofertas y descubren los negocios de su zona. Y la asociación tiene datos reales para medir sus campañas.",
    ],
    includes: [
      {
        title: "Tarjeta de puntos digital",
        description: "Los clientes acumulan y canjean puntos en los comercios adheridos desde su móvil.",
      },
      {
        title: "Ofertas y campañas",
        description: "Promociones, sorteos y campañas especiales que la asociación o cada comercio puede lanzar fácilmente.",
      },
      {
        title: "Directorio de comercios",
        description: "Un escaparate de los negocios adheridos para que los clientes descubran el comercio de su zona.",
      },
      {
        title: "Panel de gestión",
        description: "Un panel web para la asociación y los comercios: clientes, puntos, ofertas y estadísticas.",
      },
      {
        title: "Notificaciones",
        description: "Avisos a los clientes sobre nuevas ofertas, campañas y novedades.",
      },
      {
        title: "Apps en iOS, Android y Web",
        description: "Disponible en App Store, Google Play y como aplicación web para llegar a todos los clientes.",
      },
    ],
    audience: [
      "Asociaciones de comerciantes y zonas comerciales abiertas.",
      "Ayuntamientos y entidades que quieren dinamizar el comercio local.",
      "Cadenas y negocios con clientes recurrentes.",
    ],
    faqs: [
      {
        question: "¿Los comercios necesitan algún equipo especial?",
        answer:
          "Normalmente basta con un móvil o una tablet para registrar las compras o leer el código del cliente. Lo concretamos según cómo trabaje cada comercio.",
      },
      {
        question: "¿Se puede adaptar a la imagen de mi asociación?",
        answer:
          "Sí. Cada app lleva el nombre, los colores y la identidad de la asociación o del comercio, y se publica en las tiendas con su propia marca.",
      },
    ],
  },
  {
    slug: "desarrollo-web-paneles",
    icon: Code,
    title: "Webs y paneles de gestión",
    summary:
      "Webs a medida y paneles de administración rápidos y responsivos con Angular y TypeScript, conectados a tu app o a tus sistemas.",
    seoTitle: "Desarrollo web a medida y paneles de gestión con Angular",
    seoDescription:
      "Desarrollo de webs a medida y paneles de administración con Angular y TypeScript: rápidos, responsivos y conectados a tu app o a tus sistemas. Pide presupuesto.",
    heading: "Webs a medida y paneles de gestión",
    intro: [
      "Detrás de una buena app casi siempre hay un panel de gestión: el lugar desde donde tu equipo controla usuarios, contenidos, pedidos o estadísticas. Desarrollo esos paneles y también webs a medida para tu negocio.",
      "Trabajo con Angular y TypeScript para crear interfaces rápidas, fiables y fáciles de mantener, que se adaptan a cualquier pantalla.",
    ],
    includes: [
      {
        title: "Paneles de administración",
        description: "Gestión de usuarios, contenidos, pedidos, puntos o reservas desde el navegador.",
      },
      {
        title: "Webs a medida",
        description: "Webs rápidas y adaptadas al móvil, pensadas para que tus visitantes se conviertan en clientes.",
      },
      {
        title: "Conexión con tu app",
        description: "El panel y la app comparten datos para que todo esté siempre sincronizado.",
      },
      {
        title: "Informes y estadísticas",
        description: "Gráficas y datos para tomar decisiones con información real.",
      },
      {
        title: "SEO técnico",
        description: "Estructura, velocidad y datos estructurados para que Google entienda y posicione tu web.",
      },
      {
        title: "Rendimiento",
        description: "Interfaces optimizadas que cargan rápido y funcionan bien en cualquier dispositivo.",
      },
    ],
    audience: [
      "Empresas que necesitan gestionar su app desde un panel web.",
      "Negocios que quieren una web profesional hecha a medida.",
      "Equipos que necesitan una herramienta interna adaptada a su forma de trabajar.",
    ],
    faqs: [
      {
        question: "¿Puedo gestionar yo mismo los contenidos?",
        answer:
          "Sí. El panel se diseña para que tu equipo pueda gestionar el día a día sin conocimientos técnicos.",
      },
      {
        question: "¿Puedes trabajar sobre una web o un panel que ya tengo?",
        answer:
          "Sí. Reviso el proyecto actual y te propongo si conviene mejorarlo o rehacerlo, con los pros y contras de cada opción.",
      },
    ],
  },
  {
    slug: "migracion-mantenimiento-apps",
    icon: RefreshCw,
    title: "Migración, mantenimiento y consultoría",
    summary:
      "Modernizo apps existentes (de Ionic a Flutter, PixiJS legacy a PixiJS 8…) y te asesoro sobre arquitectura y la tecnología más adecuada.",
    seoTitle: "Migración y mantenimiento de apps: Ionic, Flutter y más",
    seoDescription:
      "Migración, actualización y mantenimiento de apps móviles: de Ionic a Flutter, actualización de Angular y Capacitor, y consultoría técnica sobre arquitectura y tecnología.",
    heading: "Migración, mantenimiento y consultoría de apps",
    intro: [
      "Las apps envejecen: las librerías se quedan obsoletas, las tiendas exigen nuevas versiones de iOS y Android y el código se vuelve difícil de mantener. Te ayudo a modernizar tu app sin empezar de cero cuando no hace falta.",
      "He trabajado en migraciones como el paso de juegos en Ionic + PixiJS a Godot 4 o la actualización de proyectos PixiJS legacy a PixiJS 8, y en la actualización de apps Ionic, Angular y Capacitor.",
    ],
    includes: [
      {
        title: "Auditoría del proyecto",
        description: "Reviso el estado de tu app y te explico qué conviene actualizar, mejorar o rehacer.",
      },
      {
        title: "Migración de tecnología",
        description: "De Ionic a Flutter, de PixiJS legacy a PixiJS 8 o a Godot, según lo que necesite tu proyecto.",
      },
      {
        title: "Actualización de versiones",
        description: "Angular, Ionic, Capacitor y dependencias al día para cumplir los requisitos de las tiendas.",
      },
      {
        title: "Mantenimiento continuo",
        description: "Corrección de errores, pequeñas mejoras y publicación de nuevas versiones.",
      },
      {
        title: "Rendimiento",
        description: "Optimización de la carga, la fluidez y el consumo de la app.",
      },
      {
        title: "Consultoría técnica",
        description: "Asesoramiento sobre arquitectura, elección de tecnologías y buenas prácticas para tu equipo.",
      },
    ],
    audience: [
      "Empresas con una app que se ha quedado anticuada.",
      "Proyectos cuyo desarrollador anterior ya no está disponible.",
      "Equipos que necesitan una segunda opinión técnica antes de decidir.",
    ],
    faqs: [
      {
        question: "¿Hay que rehacer la app desde cero?",
        answer:
          "No siempre. Muchas veces se puede actualizar por partes y conservar lo que funciona. Después de revisar el proyecto te propongo la opción con mejor relación entre coste y resultado.",
      },
      {
        question: "Mi app la hizo otra persona, ¿puedes encargarte?",
        answer:
          "Sí. Reviso el código existente, documento lo necesario y me encargo de su mantenimiento y evolución.",
      },
    ],
  },
];

export const getService = (slug: string) => services.find((service) => service.slug === slug);
