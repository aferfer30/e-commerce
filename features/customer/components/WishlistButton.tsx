"use client";

import { useState, useTransition, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleWishlistItem, checkIsWishlisted } from "@/features/customer/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  isInitialAdded?: boolean;
  className?: string;
}

export function WishlistButton({ productId, isInitialAdded = false, className }: WishlistButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [isAdded, setIsAdded] = useState(isInitialAdded);
  const router = useRouter();

  useEffect(() => {
    checkIsWishlisted(productId).then(setIsAdded);
  }, [productId]);

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    // Optimistic update
    setIsAdded(!isAdded);
    
    startTransition(async () => {
      const result = await toggleWishlistItem(productId);
      if (result.error) {
        if (result.error === "Unauthorized") {
          toast.error("Please sign in to use the wishlist");
          router.push("/login");
        } else {
          toast.error(result.error);
        }
        // Revert optimistic update
        setIsAdded(isAdded);
      } else {
        setIsAdded(!!result.isAdded);
        if (result.isAdded) {
          toast.success("Added to wishlist");
        } else {
          toast.success("Removed from wishlist");
        }
      }
    });
  }

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={onClick}
      disabled={isPending}
      className={cn("shrink-0", className, isAdded && "text-red-500 border-red-200 hover:text-red-600 hover:bg-red-50")}
    >
      <Heart className={cn("h-5 w-5", isAdded && "fill-current")} />
      <span className="sr-only">{isAdded ? "Remove from wishlist" : "Add to wishlist"}</span>
    </Button>
  );
}
