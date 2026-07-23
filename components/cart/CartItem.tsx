import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart, CartItem as CartItemType } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  // Format as Algerian Dinar (DA)
  const formattedPrice = new Intl.NumberFormat('fr-DZ', { 
    style: 'currency', 
    currency: 'DZD',
    minimumFractionDigits: 0
  }).format(item.price * item.quantity).replace('DZD', 'DA');

  return (
    <div className="flex gap-4 py-4">
      <div className="relative aspect-square h-20 w-20 min-w-20 overflow-hidden rounded-md border bg-muted">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between gap-2">
          <div>
            <p className="text-xs text-muted-foreground mb-1">{item.brand}</p>
            <h4 className="font-medium text-sm line-clamp-2 leading-tight">{item.name}</h4>
          </div>
          <p className="font-semibold text-sm whitespace-nowrap">{formattedPrice}</p>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center rounded-md border h-8">
            <Button
              variant="ghost"
              size="icon"
              className="h-full w-8 rounded-none rounded-l-md"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <span className="w-8 text-center text-xs font-medium">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-full w-8 rounded-none rounded-r-md"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove item</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
