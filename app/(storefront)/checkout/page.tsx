"use client";

import { useCart } from "@/hooks/use-cart";
import { CheckoutForm } from "@/features/checkout/components/CheckoutForm";
import { Container } from "@/components/layout/Container";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";

export default function CheckoutPage() {
  const { items, getCartTotal } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const total = getCartTotal();
  const formattedTotal = new Intl.NumberFormat("fr-DZ", {
    style: "currency",
    currency: "DZD",
    minimumFractionDigits: 0,
  })
    .format(total)
    .replace("DZD", "DA");

  if (items.length === 0) {
    return (
      <Container className="py-20 max-w-3xl text-center">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Your cart is empty
          </h1>
          <p className="text-muted-foreground max-w-md">
            You need to add at least one item to your cart before you can
            proceed to checkout.
          </p>
          <Link
            href="/products"
            className={buttonVariants({ size: "lg", className: "mt-4" })}
          >
            Browse Products
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div className="bg-muted/30 min-h-screen py-12">
      <Container className="max-w-6xl">
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Cart
          </Link>
          <h1 className="text-3xl font-bold tracking-tight mt-4">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Section */}
          <div className="lg:col-span-7 xl:col-span-8 bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8">
            <CheckoutForm />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4 bg-card rounded-2xl border border-border/50 shadow-sm p-6 sm:p-8 sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative aspect-square h-16 w-16 min-w-16 overflow-hidden rounded-md border bg-muted">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <h4 className="font-medium text-sm line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center justify-end">
                    <p className="font-semibold text-sm">
                      {new Intl.NumberFormat("fr-DZ", {
                        style: "currency",
                        currency: "DZD",
                        minimumFractionDigits: 0,
                      })
                        .format(item.price * item.quantity)
                        .replace("DZD", "DA")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formattedTotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-green-500">Free</span>
              </div>
            </div>

            <div className="border-t border-border mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold text-primary">
                  {formattedTotal}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
