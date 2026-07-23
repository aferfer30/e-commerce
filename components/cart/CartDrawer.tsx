"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItem } from "./CartItem";
import { useEffect, useState } from "react";

export function CartDrawer() {
  const { items, isOpen, closeDrawer, getCartTotal, getItemCount } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  // Avoid hydration mismatch for persisted Zustand store
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const total = getCartTotal();
  const itemCount = getItemCount();

  const formattedTotal = new Intl.NumberFormat('fr-DZ', { 
    style: 'currency', 
    currency: 'DZD',
    minimumFractionDigits: 0
  }).format(total).replace('DZD', 'DA');

  if (!isMounted) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Cart ({itemCount})
          </SheetTitle>
        </SheetHeader>
        
        <Separator className="mt-4" />
        
        {items.length > 0 ? (
          <>
            <ScrollArea className="flex-1 px-4 sm:px-6">
              <div className="flex flex-col gap-1">
                {items.map((item) => (
                  <div key={item.id}>
                    <CartItem item={item} />
                    <Separator />
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="px-4 sm:px-6 pt-4 pb-6 space-y-4">
              <div className="flex items-center justify-between text-base font-medium">
                <p>Subtotal</p>
                <p>{formattedTotal}</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <SheetFooter className="mt-4 flex-col sm:flex-col gap-2">
                <Link href="/checkout" onClick={closeDrawer} className={buttonVariants({ size: "lg", className: "w-full" })}>
                  Checkout
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg"
                  onClick={closeDrawer}
                >
                  Continue Shopping
                </Button>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center space-y-5 pr-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Button onClick={closeDrawer}>Explore Products</Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
