import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import Logo from "@/components/Logo";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle scroll to section on mount or hash change if on home page
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Add a small delay to ensure content is rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location.pathname, location.hash]);

  const navLinks = [
    { href: "#services", label: "Servicios" },
    { href: "#projects", label: "Proyectos" },
    { href: "#process", label: "Cómo trabajo" },
    { href: "#about", label: "Sobre mí" },
    { href: "#blog", label: "Blog" },
    { href: "#faq", label: "FAQ" },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (location.pathname === "/") {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
      // Update URL hash without scrolling (since we did it manually)
      window.history.pushState(null, "", href);
    } else {
      navigate(`/${href}`);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center transition-transform hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={(e) => handleClick(e, "#home")}
          >
            <Logo className="text-2xl sm:text-3xl" />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted/50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={(e) => handleClick(e, link.href)}
              >
                {link.label}
              </motion.a>
            ))}
            <Button
              asChild
              size="sm"
              className="ml-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              <a href="#contact" onClick={(e) => handleClick(e, "#contact")}>
                Pide presupuesto
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
        >
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
                onClick={(e) => handleClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              <a href="#contact" onClick={(e) => handleClick(e, "#contact")}>
                Pide presupuesto
              </a>
            </Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;