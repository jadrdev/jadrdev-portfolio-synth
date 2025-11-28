import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import logoHorizontal from "@/assets/logo-final.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Inicio" },
    { href: "#about", label: "Sobre mí" },
    { href: "#projects", label: "Proyectos" },
    { href: "#blog", label: "Blog" },
    { href: "#services", label: "Servicios" },
    { href: "#technologies", label: "Tecnologías" },
    { href: "#contact", label: "Contacto" },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
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
            <img
              src={logoHorizontal}
              alt="JadrDev Logo"
              className="h-14 w-auto sm:h-16 md:h-20"
            />
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
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
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
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;