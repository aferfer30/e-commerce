import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Button, buttonVariants } from "@/components/ui/button";
import { CheckCircle2, Package, MapPin, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface SuccessPageProps {
  params: Promise<{ id: string }>;
}

export default async function SuccessPage({ params }: SuccessPageProps) {
  const { id } = await params;
  // Guard against missing id
  if (!id) {
    notFound();
    return;
  }
  
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: {
            include: { images: true }
          }
        }
      }
    }
  });

  if (!order) {
    notFound();
  }

  const formattedTotal = new Intl.NumberFormat('fr-DZ', { 
    style: 'currency', 
    currency: 'DZD',
    minimumFractionDigits: 0
  }).format(order.total).replace('DZD', 'DA');

  return (
    <div className="bg-muted/30 min-h-screen py-12">
      <Container className="max-w-4xl">
        <div className="bg-card rounded-3xl border border-border/50 shadow-sm overflow-hidden">
          
          {/* Header */}
          <div className="bg-primary/10 px-8 py-12 text-center border-b border-border/50">
            <div className="mx-auto w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground text-lg">
              Thank you for your purchase, {order.customerName}.
            </p>
            <p className="text-sm font-mono mt-4 bg-background/50 inline-block px-4 py-2 rounded-full border border-border/50">
              Order #{order.id}
            </p>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* Order Details */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <Package className="h-5 w-5 text-muted-foreground" /> 
                    Order Summary
                  </h3>
                  <div className="space-y-4">
                    {order.items.map((item) => {
                      const image = item.product.images?.[0]?.url || "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=800";

                      return (
                        <div key={item.id} className="flex gap-4">
                          <div className="relative h-16 w-16 rounded-md border bg-muted overflow-hidden">
                            <Image src={image} alt={item.product.name} fill className="object-cover" sizes="64px" />
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                            <p className="font-medium text-sm line-clamp-1">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-border flex justify-between items-center">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="text-2xl font-bold text-primary">{formattedTotal}</span>
                  </div>
                </div>
              </div>

              {/* Shipping & Payment */}
              <div className="space-y-8 bg-muted/30 p-6 rounded-2xl border border-border/50">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-muted-foreground" /> 
                    Shipping Address
                  </h3>
                  <address className="not-italic text-muted-foreground space-y-1">
                    <p className="font-medium text-foreground">{order.customerName}</p>
                    <p>{order.fullAddress}</p>
                    <p>{order.wilaya}, Algeria</p>
                    <p className="pt-2">{order.customerPhone}</p>
                  </address>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <Truck className="h-5 w-5 text-muted-foreground" /> 
                    Payment Method
                  </h3>
                  <p className="text-muted-foreground">
                    {order.paymentMethod === "COD" ? "Cash on Delivery" : order.paymentMethod}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    You will pay when the order is delivered to your address.
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/products" className={buttonVariants({ size: "lg", className: "w-full sm:w-auto h-12 px-8" })}>
                Continue Shopping
              </Link>
            </div>
          </div>
          
        </div>
      </Container>
    </div>
  );
}
