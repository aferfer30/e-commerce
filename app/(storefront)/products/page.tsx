import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductCard } from "@/components/product/ProductCard";
import { prisma } from "@/lib/prisma";
import { SeoHead } from "@/components/SeoHead";
import { FadeIn } from "@/components/ui/fade-in";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: true, inventory: true },
  });

  return (
    <>
      <SeoHead
        title="All Products"
        description="Browse our complete catalog of premium tech."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
        {/* Page header */}
        <FadeIn delay={0.1}>
          <div className="mb-12 pb-6 border-b border-border/20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">
                Complete Collection
              </span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="max-w-3xl">
                <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tighter leading-[0.9] text-foreground">
                  All Products
                </h1>
                <p className="text-muted-foreground mt-6 text-xl leading-relaxed font-light">
                  Browse our complete collection of premium tech.
                </p>
              </div>
              {products.length > 0 && (
                <span className="text-sm font-mono text-muted-foreground shrink-0 border border-border/50 px-4 py-2 rounded-full">
                  {products.length}{" "}
                  {products.length === 1 ? "PRODUCT" : "PRODUCTS"}
                </span>
              )}
            </div>
          </div>
        </FadeIn>

        {/* Product Grid */}
        {products.length === 0 ? (
          <FadeIn delay={0.2}>
            <div className="relative overflow-hidden flex flex-col items-center justify-center py-40 rounded-2xl bg-card border border-border group">
              {/* Ambient Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-50" />

              <div className="relative z-10 w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center shadow-2xl mb-8 transform group-hover:scale-105 transition-transform duration-500 border border-border/50">
                <div className="w-6 h-6 rounded-sm border-[1.5px] border-primary/80" />
                <div className="absolute inset-0 bg-primary/10 rounded-2xl animate-pulse" />
              </div>

              <div className="text-center relative z-10 max-w-md px-4">
                <h2 className="font-display text-2xl font-bold mb-3 tracking-tight">
                  Curating Excellence
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Our experts are currently assembling a collection of premium
                  technology. The vault will open soon.
                </p>
              </div>
            </div>
          </FadeIn>
        ) : (
          <ProductGrid>
            {products.map((product, index) => (
              <FadeIn key={product.id} delay={(index % 4) * 0.1}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </ProductGrid>
        )}
      </div>
    </>
  );
}
