import Link from "next/link";
import { Container } from "./Container";

const footerLinks = {
  Products: [
    { label: "Laptops", href: "/products?category=laptops" },
    { label: "Audio", href: "/products?category=audio" },
    { label: "Accessories", href: "/products?category=accessories" },
    { label: "New Arrivals", href: "/products" },
  ],
  Support: [
    { label: "Contact Us", href: "#" },
    { label: "FAQs", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Warranty", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-background overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      <Container>
        <div className="relative py-16">
          {/* Top section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <Link href="/" className="inline-block">
                <span className="text-2xl font-display font-bold tracking-tight">
                  Nova<span className="text-primary">Tech</span>
                </span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Premium technology and electronics for the modern professional.
                Quality, design, and performance in every product.
              </p>
              {/* Trust signals */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Free shipping on orders over 5,000 DA
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Secure payments — SSL encrypted
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  2-year warranty on all products
                </div>
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
                  {section}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} NovaTech. All rights reserved.
            </p>
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Made with</span>
              <span className="text-xs text-primary mx-1">♥</span>
              <span className="text-xs text-muted-foreground">for tech enthusiasts</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
