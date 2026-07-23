import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { WishlistButton } from "@/features/customer/components/WishlistButton";
import type { Prisma } from "@/lib/generated/prisma/client";

type ProductWithRelations = Prisma.ProductGetPayload<{
  include: { images: true; inventory: true; category: true };
}>;

interface ProductCardProps {
  product: ProductWithRelations;
}

export function ProductCard({ product }: ProductCardProps) {
  const images = product.images?.map((img) => img.url) || [];
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

  const isLowStock =
    product.inventory &&
    product.inventory.quantity <= 5 &&
    product.inventory.quantity > 0;
  const isOutOfStock = product.inventory && product.inventory.quantity === 0;

  return (
    <div className="group relative p-2 bg-white/[0.02] border border-border/50 rounded-[2rem] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-primary/30 hover:shadow-glow hover:-translate-y-2">
      <div className="flex flex-col h-full bg-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] rounded-[calc(2rem-0.5rem)] overflow-hidden relative">
        {/* Image */}
        <Link
          href={`/products/${product.slug}`}
          className="block relative aspect-square bg-muted/30 overflow-hidden"
        >
          <Image
            src={defaultImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
            {product.discount && (
              <Badge className="bg-primary/90 text-primary-foreground text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 shadow-glow-sm border border-primary/20">
                -{product.discount}%
              </Badge>
            )}
            {isLowStock && !isOutOfStock && (
              <Badge className="bg-orange-500/10 text-orange-400 text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 border border-orange-500/20">
                LOW STOCK
              </Badge>
            )}
            {isOutOfStock && (
              <Badge className="bg-destructive/10 text-destructive text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 border border-destructive/20">
                OUT OF STOCK
              </Badge>
            )}
          </div>

          {/* Wishlist */}
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] translate-y-2 group-hover:translate-y-0">
            <WishlistButton
              productId={product.id}
              className="h-9 w-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-primary hover:text-primary-foreground hover:border-primary/50 hover:shadow-glow transition-all duration-300"
            />
          </div>
        </Link>

        {/* Info */}
        <div className="flex flex-col flex-1 p-5 pb-6 gap-3">
          <Link href={`/products/${product.slug}`} className="flex-1">
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1.5">
              {product.category?.name || product.brand}
            </p>
            <h3 className="font-display font-medium text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {product.name}
            </h3>
          </Link>

          {/* Price + Add to cart */}
          <div className="flex items-end justify-between pt-4 border-t border-border/30">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                Price
              </p>
              <p className="font-display font-bold text-lg tabular-nums text-foreground">
                {formattedPrice}
              </p>
            </div>
            <div className="relative z-20">
              <AddToCartButton
                product={product}
                size="icon"
                showText={false}
                className="w-10 h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
