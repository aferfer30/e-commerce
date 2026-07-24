export const dynamic = 'force-dynamic';

import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductCard } from "@/components/product/ProductCard";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Truck, Star, Lock, Mouse, ChevronDown } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { HeroBackground } from "@/components/ui/hero-background";

const categories = [
  {
    label: "Laptops",
    description:
      "Pro-grade performance machines for elite developers and creators.",
    href: "/products?category=laptops",
    accent: "from-primary/10 to-transparent",
    span: "md:col-span-8 md:row-span-2",
  },
  {
    label: "Audio",
    description: "Studio-quality sound.",
    href: "/products?category=audio",
    accent: "from-white/5 to-transparent",
    span: "md:col-span-4 md:row-span-1",
  },
  {
    label: "Accessories",
    description: "Elevate your setup.",
    href: "/products?category=accessories",
    accent: "from-primary/5 to-transparent",
    span: "md:col-span-4 md:row-span-1",
  },
];

const trustSignals = [
  { icon: Truck, label: "Free Shipping", desc: "On orders over 5,000 DA" },
  { icon: Shield, label: "Secure Payments", desc: "SSL encrypted checkout" },
  { icon: Star, label: "Premium Quality", desc: "Curated & tested gear" },
  { icon: Zap, label: "Fast Delivery", desc: "2–5 business days" },
];

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
    include: { images: true, inventory: true, category: true },
  });

  return (
    <div className="flex flex-col">
      {/* ═══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[calc(100dvh-5rem)] w-full overflow-hidden bg-black flex items-center">
        {/* Background Image filling the screen, positioned to bottom so we never crop the mouse/rocks */}
        <HeroBackground />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-0 flex flex-col justify-center h-full pointer-events-none">
          
          {/* Left Column - Text Content */}
          <div className="w-full max-w-2xl py-8 lg:py-16 shrink-0 pointer-events-auto">
            <FadeIn delay={0}>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-black/40 backdrop-blur-md mb-6">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[10px] font-bold text-white/80 tracking-[0.15em] uppercase">
                  Premium Tech — Algeria's Finest
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0}>
              {/* Headline */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.05] mb-4 text-white">
                Next-Gen Tech,
                <br />
                <span className="text-primary whitespace-nowrap">Delivered Today.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.15}>
              {/* Subline */}
              <p className="text-base sm:text-lg text-white/80 max-w-xl mb-8 leading-relaxed font-light">
                Premium laptops, audio, and accessories carefully selected for professionals who expect speed, reliability, and exceptional design.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Link
                  href="/products"
                  className="group relative inline-flex items-center justify-between gap-4 pl-6 pr-2 py-2 bg-primary text-black font-semibold rounded-full active:scale-[0.98] transition-all duration-300 hover:brightness-110"
                >
                  <span className="uppercase tracking-widest text-xs font-bold">
                    Shop Catalog
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </div>
                </Link>

                <Link
                  href="/products?category=laptops"
                  className="group relative inline-flex items-center justify-between gap-4 pl-6 pr-2 py-2 bg-black/40 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full active:scale-[0.98] transition-all duration-300 hover:bg-white/10 hover:border-white/30"
                >
                  <span className="uppercase tracking-widest text-xs font-bold text-white/80 group-hover:text-white transition-colors">
                    View Laptops
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight
                      className="w-4 h-4 text-white/80 group-hover:text-white transition-colors"
                      strokeWidth={2}
                    />
                  </div>
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.45}>
              {/* Trust signals inline */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-primary" strokeWidth={1.5} />
                    <span className="text-[13px] font-medium text-white">Free Shipping</span>
                  </div>
                  <span className="text-[11px] text-white/60">On orders over 5,000 DA</span>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" strokeWidth={1.5} />
                    <span className="text-[13px] font-medium text-white">Official Warranty</span>
                  </div>
                  <span className="text-[11px] text-white/60">2-year coverage</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" strokeWidth={1.5} />
                    <span className="text-[13px] font-medium text-white">Secure Payments</span>
                  </div>
                  <span className="text-[11px] text-white/60">100% protected</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" strokeWidth={1.5} />
                    <span className="text-[13px] font-medium text-white">Fast Delivery</span>
                  </div>
                  <span className="text-[11px] text-white/60">Across Algeria</span>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.6}>
              {/* Customer Rating Box */}
              <div className="mt-8 inline-flex items-center gap-6 p-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md">
                <div className="flex -space-x-3">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#111111] overflow-hidden relative bg-[#1a1a1a]">
                       <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt={`Customer ${i}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-1 pr-4">
                  <span className="text-[13px] font-medium text-white">Trusted by 2,000+ customers</span>
                  <div className="flex items-center gap-2">
                    <div className="flex text-primary">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />)}
                    </div>
                    <span className="text-[13px] font-bold text-white">4.9 <span className="text-white/60 font-normal">Average Rating</span></span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
        
        {/* Scroll down indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 z-20 hover:opacity-100 transition-opacity cursor-pointer">
           <Mouse className="w-5 h-5 text-white/70" strokeWidth={1.5} />
           <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-white/70 mt-1">Scroll to explore</span>
           <ChevronDown className="w-4 h-4 text-primary animate-bounce mt-1" strokeWidth={2} />
        </div>
      </section>

      {/* ═══ CATEGORIES (ASYMMETRICAL BENTO) ═════════════════════════════════ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <FadeIn>
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
              <span className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase">
                Collections
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tighter mb-4">
              Shop by Category
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-6 md:h-[500px]">
          {categories.map((cat, i) => (
            <FadeIn
              key={cat.label}
              delay={i * 0.1}
              className={`${cat.span} h-full`}
            >
              <Link
                href={cat.href}
                className={`block h-full w-full group relative p-2 bg-white/[0.02] border border-border/50 rounded-[2rem] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-primary/30 hover:shadow-glow hover:-translate-y-2`}
              >
                <div
                  className={`flex flex-col justify-end h-full bg-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] rounded-[calc(2rem-0.5rem)] overflow-hidden relative p-8 bg-gradient-to-br ${cat.accent}`}
                >
                  <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none mix-blend-overlay" />
                  <div className="relative z-10">
                    <h3 className="font-display text-3xl sm:text-4xl font-bold mb-3 group-hover:text-primary transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                      {cat.label}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-8 max-w-sm font-light leading-relaxed">
                      {cat.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-foreground group-hover:text-primary transition-colors">
                      Browse{" "}
                      <ArrowRight
                        className="h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-2"
                        strokeWidth={2}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══ FEATURED PRODUCTS ══════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-border/30">
        <FadeIn>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
                <span className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase">
                  Featured
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tighter mb-2">
                Handpicked Gear
              </h2>
            </div>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-primary transition-colors"
            >
              View Vault{" "}
              <ArrowRight
                className="h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
                strokeWidth={2}
              />
            </Link>
          </div>
        </FadeIn>

        {featuredProducts.length === 0 ? (
          <FadeIn delay={0.2}>
            <div className="relative overflow-hidden flex flex-col items-center justify-center py-40 rounded-[2rem] bg-card border border-border/50 group">
              <div className="absolute inset-0 bg-noise opacity-[0.02]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none opacity-50" />
              <div className="text-center relative z-10">
                <h3 className="font-display text-3xl font-bold mb-4">
                  Curating Excellence
                </h3>
                <p className="text-muted-foreground">
                  The vault will open soon.
                </p>
              </div>
            </div>
          </FadeIn>
        ) : (
          <ProductGrid>
            {featuredProducts.map((product, i) => (
              <FadeIn key={product.id} delay={i * 0.1}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </ProductGrid>
        )}
      </section>

      {/* ═══ TRUST SIGNALS ══════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {trustSignals.map(({ icon: Icon, label, desc }, i) => (
              <FadeIn key={label} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center gap-5 group">
                  <div className="w-20 h-20 rounded-[1.5rem] bg-white/[0.02] border border-white/10 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:shadow-glow-sm group-hover:-translate-y-2">
                    <Icon
                      className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors duration-500"
                      strokeWidth={1}
                    />
                  </div>
                  <div>
                    <p className="text-base font-bold font-display tracking-wide">
                      {label}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-widest">
                      {desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
