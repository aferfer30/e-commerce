import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ShoppingCart, ShieldCheck, Truck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { WishlistButton } from "@/features/customer/components/WishlistButton";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  // Guard against missing slug
  if (!slug) {
    notFound();
    return;
  }

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { order: "asc" } },
      specifications: true,
      inventory: true,
    },
  });

  if (!product) {
    notFound();
  }

  const images = product.images.map((img) => img.url);
  if (images.length === 0)
    images.push(
      "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=800",
    );

  const specs: Record<string, string> = {};
  product.specifications.forEach((spec) => {
    specs[spec.name] = spec.value;
  });

  const defaultImage =
    images.length > 0
      ? images[0]
      : "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=800";
  const formattedPrice = new Intl.NumberFormat("fr-DZ", {
    style: "currency",
    currency: "DZD",
    minimumFractionDigits: 0,
  })
    .format(product.price)
    .replace("DZD", "DA");

  const oldPrice = product.discount
    ? new Intl.NumberFormat("fr-DZ", {
        style: "currency",
        currency: "DZD",
        minimumFractionDigits: 0,
      })
        .format(product.price / (1 - product.discount / 100))
        .replace("DZD", "DA")
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <Link
        href="/products"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Image Gallery */}
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-6">
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-muted/10 p-2 border border-border/50">
              <div className="relative h-full w-full rounded-[calc(2rem-8px)] overflow-hidden bg-background">
                <Image
                  src={defaultImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              {product.discount && (
                <Badge className="absolute top-6 left-6 text-sm px-3 py-1 bg-primary text-primary-foreground shadow-xl">
                  -{product.discount}% OFF
                </Badge>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.slice(1).map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-2xl p-1 bg-gradient-to-br from-border/50 to-transparent cursor-pointer group"
                  >
                    <div className="relative h-full w-full rounded-[calc(1rem-4px)] overflow-hidden bg-background">
                      <Image
                        src={img}
                        alt={`Gallery ${i}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </FadeIn>

        {/* Product Info */}
        <div className="flex flex-col">
          <FadeIn delay={0.2}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-6">
              <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">
                {product.category.name}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-4 leading-[1.1]">
              {product.name}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 font-light tracking-wide uppercase">
              {product.brand}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex items-end gap-4 mb-8">
              <p className="text-4xl font-bold text-foreground">
                {formattedPrice}
              </p>
              {oldPrice && (
                <p className="text-xl text-muted-foreground line-through mb-1">
                  {oldPrice}
                </p>
              )}
            </div>

            <p className="text-lg leading-relaxed text-muted-foreground mb-10 font-light">
              {product.fullDescription}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col gap-4 mb-12">
              <div className="pt-8 border-t border-border/50">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <AddToCartButton
                      product={product}
                      size="lg"
                      className="w-full"
                    />
                  </div>
                  <WishlistButton
                    productId={product.id}
                    className="h-14 w-14 rounded-full"
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center sm:text-left mt-2">
                {(product.inventory?.quantity || 0) > 0 ? (
                  <span className="inline-flex items-center gap-2 text-primary font-medium">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    {product.inventory?.quantity} in stock, ready to ship
                  </span>
                ) : (
                  <span className="text-destructive font-medium">
                    Out of stock
                  </span>
                )}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-border/50 pt-8">
              {product.warranty && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Warranty</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {product.warranty}
                    </p>
                  </div>
                </div>
              )}
              {product.delivery && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Delivery</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {product.delivery}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Specifications */}
      {Object.keys(specs).length > 0 && (
        <div className="mt-16 md:mt-24 pt-12 border-t border-border/20">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground mb-8">
            Technical Specs
          </h2>
          <div className="max-w-4xl">
            <table className="w-full text-left border-collapse">
              <tbody>
                {Object.entries(specs).map(([key, value]) => (
                  <tr
                    key={key}
                    className="border-b border-border/10 last:border-0"
                  >
                    <th className="py-4 pr-6 font-medium text-sm text-muted-foreground w-1/3 align-top">
                      {key}
                    </th>
                    <td className="py-4 text-base text-foreground w-2/3">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
