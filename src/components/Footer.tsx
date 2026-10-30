import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { services } from "@/data/services";
import { WHATSAPP_URL, WHATSAPP_DISPLAY } from "@/lib/contact";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <Logo tagline className="text-4xl" />
            </Link>
            <p className="text-sm text-muted-foreground">
              Desarrollo de apps móviles y webs a medida para empresas, comercios y asociaciones de Canarias y toda España.
            </p>
          </div>

          <nav aria-label="Servicios">
            <h2 className="font-semibold mb-4">Servicios</h2>
            <ul className="space-y-2 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link to={`/servicios/${service.slug}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-semibold mb-4">Contacto</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@jadrdev.com" className="text-muted-foreground hover:text-primary transition-colors">
                  info@jadrdev.com
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  WhatsApp: {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-sm text-muted-foreground text-center mt-10 pt-6 border-t border-border">
          © {new Date().getFullYear()} JadrDev. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
