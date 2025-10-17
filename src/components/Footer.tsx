import { Linkedin, Github, Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm opacity-90">
              © {currentYear} Easy Audit | SolidPro Engineering Support Pvt. Ltd.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            <a 
              href="#home" 
              className="text-sm opacity-90 hover:opacity-100 hover:text-accent transition-smooth"
            >
              Home
            </a>
            <a 
              href="#about" 
              className="text-sm opacity-90 hover:opacity-100 hover:text-accent transition-smooth"
            >
              About
            </a>
            <a 
              href="#contact" 
              className="text-sm opacity-90 hover:opacity-100 hover:text-accent transition-smooth"
            >
              Contact
            </a>
            <a 
              href="#privacy" 
              className="text-sm opacity-90 hover:opacity-100 hover:text-accent transition-smooth"
            >
              Privacy Policy
            </a>
          </nav>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent transition-smooth"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent transition-smooth"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:contact@easyaudit.com"
              className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent transition-smooth"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
