"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

export function CartButton() {
  const { getItemCount, openDrawer } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const itemCount = getItemCount();

  return (
    <Button variant="ghost" size="icon" className="relative" onClick={openDrawer}>
      <ShoppingBag className="h-5 w-5" />
      <span className="sr-only">Cart</span>
      {isMounted && itemCount > 0 && (
        <Badge 
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground border-2 border-background"
        >
          {itemCount}
        </Badge>
      )}
    </Button>
  );
}
