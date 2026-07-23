"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { createOrder } from "../actions";
import { checkoutSchema, type CheckoutFormData } from "../schema";
import { useCart } from "@/hooks/use-cart";
import { ALGERIAN_WILAYAS } from "@/utils/algeria";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form-component";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CheckoutForm() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      wilaya: "",
      address: "",
      paymentMethod: "COD",
    },
  });

  async function onSubmit(data: CheckoutFormData) {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderItems = items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const result = await createOrder({
        customer: data,
        items: orderItems,
      });

      if (result.success && result.orderId) {
        toast.success("Order placed successfully!");
        clearCart();
        router.push(`/checkout/success/${result.orderId}`);
      } else {
        toast.error(result.error || "Failed to place order.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Shipping Information</h2>
          
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customerPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="0555000000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wilaya"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wilaya</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Wilaya" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ALGERIAN_WILAYAS.map((wilaya) => (
                      <SelectItem key={wilaya} value={wilaya}>
                        {wilaya}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detailed Address</FormLabel>
                <FormControl>
                  <Input placeholder="Street, Building, Apartment..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-border">
          <h2 className="text-xl font-semibold">Payment Method</h2>
          
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <Select disabled onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Payment Method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="COD">Cash on Delivery (COD)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-2">
                  Currently, we only support Cash on Delivery. You will pay when you receive your order.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          size="lg" 
          className="w-full h-12 text-base font-semibold mt-8"
          disabled={isSubmitting || items.length === 0}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing Order...
            </>
          ) : (
            "Complete Order"
          )}
        </Button>
      </form>
    </Form>
  );
}
