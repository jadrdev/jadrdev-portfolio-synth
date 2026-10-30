import { useEffect } from "react";
import { Analytics, track } from "@vercel/analytics/react";

// Vercel Web Analytics plus the contact clicks we care about. A single delegated
// listener covers every WhatsApp and email link on the site, wherever it is rendered.
const Tracking = () => {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a");
      const href = link?.getAttribute("href") ?? "";
      const page = window.location.pathname;

      if (href.startsWith("https://wa.me/")) track("WhatsApp", { page });
      else if (href.startsWith("mailto:")) track("Email", { page });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <Analytics />;
};

export default Tracking;
