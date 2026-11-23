import { useEffect } from "react";
import { Analytics, track } from "@vercel/analytics/react";

// Vercel Web Analytics plus the clicks we care about: contact (WhatsApp, email)
// and app store links. A single delegated listener covers every such link on the
// site, wherever it is rendered.
const Tracking = () => {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a");
      const href = link?.getAttribute("href") ?? "";
      const page = window.location.pathname;

      // Store links carry the project in data-project (set by ProjectCard).
      const project = link?.getAttribute("data-project") ?? "";

      if (href.startsWith("https://wa.me/")) track("WhatsApp", { page });
      else if (href.startsWith("mailto:")) track("Email", { page });
      else if (href.startsWith("https://apps.apple.com/")) track("App Store", { page, project });
      else if (href.startsWith("https://play.google.com/")) track("Google Play", { page, project });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <Analytics />;
};

export default Tracking;
