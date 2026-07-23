"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import type { Prisma } from "@/lib/generated/prisma/client";

type ProductWithRelations = Prisma.ProductGetPayload<{
  include: { images: true; inventory: true };
}>;

interface AddToCartButtonProps {
  product: ProductWithRelations;
  variant?: "default" | "secondary" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showText?: boolean;
}

export function AddToCartButton({
  product,
  variant = "default",
  size = "default",
  className = "w-full gap-2 transition-transform active:scale-[0.98]",
  showText = true,
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const images = product.images?.map((img) => img.url) || [];

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      brand: product.brand,
      slug: product.slug,
      image:
        images.length > 0
          ? images[0]
          : "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=800",
    });

    toast.success("Added to cart", {
      description: `${product.name} was added to your cart.`,
    });
  };

  // Handle icon size
  if (size === "icon" || !showText) {
    return (
      <button
        className={`group relative inline-flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-full transition-all duration-300 active:scale-95 hover:shadow-glow ${className}`}
        onClick={handleAddToCart}
        aria-label="Add to cart"
      >
        <ShoppingCart className="h-4 w-4" strokeWidth={2} />
      </button>
    );
  }

  const isLg = size === "lg";

  return (
    <button
      className={`group relative inline-flex items-center justify-center gap-4 ${isLg ? "px-8 py-2 h-14 text-base" : "px-6 py-1.5 h-11 text-sm"} bg-primary text-primary-foreground font-semibold rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] glow-primary hover:shadow-[0_0_30px_rgba(232,255,71,0.4)] ${className}`}
      onClick={handleAddToCart}
    >
      <span>{showText ? (isLg ? "Add to Cart" : "Add") : ""}</span>
      <div
        className={`${isLg ? "w-10 h-10" : "w-8 h-8"} rounded-full bg-black/10 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105`}
      >
        <ShoppingCart
          className={isLg ? "h-5 w-5" : "h-4 w-4"}
          strokeWidth={1.5}
        />
      </div>
    </button>
  );
}
