'use client';

import Link from "next/link";
import { Container } from "./Container";
import { Search, Menu, X } from "lucide-react";
import { CartButton } from "@/components/cart/CartButton";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Laptops", href: "/products?category=laptops" },
  { label: "Audio", href: "/products?category=audio" },
  { label: "Accessories", href: "/products?category=accessories" },
];

interface HeaderClientProps {
  userNav: React.ReactNode;
  isLoggedIn: boolean;
}

export function HeaderClient({ userNav, isLoggedIn }: HeaderClientProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-elevation"
            : "bg-transparent"
        }`}
      >
        <Container>
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
            >
              <span className="text-xl font-display font-bold tracking-tight transition-colors group-hover:text-primary">
                Nova<span className="text-primary">Tech</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Link
                href="/products"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-white/5"
                aria-label="Search products"
              >
                <Search className="h-5 w-5" />
              </Link>

              {userNav}

              <CartButton />

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Nav Drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 w-72 h-full bg-card border-l border-border transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 pt-20 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md transition-all"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-border">
              {isLoggedIn ? (
                <Link href="/orders" className="px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md transition-all block">
                  My Orders
                </Link>
              ) : (
                <Link href="/login" className="block w-full text-center px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold text-sm">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
}
