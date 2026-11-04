import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { track } from "@vercel/analytics/react";
import { CONTACT_INTENTS, contactHref, type ContactIntent } from "@/lib/contact";

interface ContactCTAProps {
  intent: ContactIntent;
  /** Where the button is, for analytics: "hero", "servicios", "pagina-servicio"... */
  source: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Link to the contact form with the project type of `intent` preselected.
 * Records which call to action was used so we can compare them in Vercel Analytics.
 */
const ContactCTA = ({ intent, source, className, children }: ContactCTAProps) => {
  const { pathname } = useLocation();

  const handleClick = () => {
    track("CTA", { tipo: intent, origen: source, page: pathname });

    // On the home page the hash may not change (#contact → #contact), so the
    // navbar's hash effect wouldn't fire: scroll ourselves.
    if (pathname === "/") {
      setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 0);
    }
  };

  return (
    <Link to={contactHref(intent)} onClick={handleClick} className={className} preventScrollReset>
      {children ?? CONTACT_INTENTS[intent].label}
    </Link>
  );
};

export default ContactCTA;
