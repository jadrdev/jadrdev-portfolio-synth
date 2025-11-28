import { Music2 } from "lucide-react";
import logoIcon from "@/assets/logo-final.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <img
            src={logoIcon}
            alt="JadrDev"
            className="h-12 w-auto opacity-80"
          />
          <div className="flex items-center gap-2">
            <Music2 className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              Made with code and creativity
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} JadrDev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;