import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { Package, ExternalLink, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SeoHead } from "@/components/SeoHead";
import { AccountLayout } from "@/components/customer/AccountLayout";
import { AnimatedPage, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.2)]",
  PROCESSING: "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.2)]",
  SHIPPED: "bg-violet-500/10 text-violet-400 border-violet-500/20 shadow-[0_0_10px_rgba(139,92,246,0.2)]",
  DELIVERED: "bg-primary/10 text-primary border-primary/20 shadow-[0_0_10px_rgba(232,255,71,0.2)]",
  CANCELLED: "bg-destructive/10 text-destructive border-destructive/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]",
};

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true },
  });

  if (!user) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: { product: { select: { name: true } } },
      },
    },
  });

  return (
    <>
      <SeoHead title="My Orders" description="View your NovaTech order history." />
      <AccountLayout user={{ name: user.name, email: user.email }} title="Order History">
        <AnimatedPage>
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 border border-white/5 bg-card/20 backdrop-blur-md rounded-2xl gap-6 text-center shadow-inner relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center shadow-xl border border-border">
                <Package className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors duration-500" />
              </div>
              <div className="relative z-10">
                <h2 className="font-display text-2xl font-bold mb-3 tracking-tight">No orders yet</h2>
                <p className="text-muted-foreground text-sm max-w-xs mb-8 leading-relaxed">You haven&apos;t placed any orders yet. Start shopping our premium catalog.</p>
                <Link href="/products" className={buttonVariants({ variant: "default", size: "lg", className: "gap-2 rounded-full px-8 shadow-glow-sm hover:shadow-glow transition-all" })}>
                  Browse Products <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            <StaggerContainer className="flex flex-col gap-6">
              {orders.map((order) => (
                <StaggerItem key={order.id}>
                  <div className="bg-card/40 backdrop-blur-xl border border-white/5 hover:border-primary/30 hover:bg-card/60 hover:shadow-glow-sm rounded-2xl overflow-hidden transition-all duration-300 group">
                    {/* Order Header */}
                    <div className="px-6 py-5 border-b border-border/20 flex flex-col sm:flex-row justify-between gap-4 sm:items-center bg-white/[0.02]">
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Order ID</p>
                          <p className="font-mono text-xs text-foreground/80 font-medium group-hover:text-primary transition-colors">{order.id.slice(0, 16)}…</p>
                        </div>
                        <div className="hidden sm:block w-px h-8 bg-border/50" />
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Placed</p>
                          <p className="text-sm font-medium">{format(new Date(order.createdAt), "MMM d, yyyy")}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Total</p>
                          <p className="font-display font-bold text-lg tabular-nums">{order.total.toLocaleString()} DA</p>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold border ${STATUS_STYLES[order.status] || "bg-muted text-muted-foreground border-border"}`}>
                          {order.status === "DELIVERED" && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse mr-2" />}
                          {order.status}
                        </span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="px-6 py-5">
                      <div className="flex flex-col gap-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4">
                              <span className="text-[10px] font-mono w-6 h-6 flex items-center justify-center text-primary bg-primary/10 border border-primary/20 rounded-full">{item.quantity}×</span>
                              <span className="font-medium text-foreground/90">{item.product.name}</span>
                            </div>
                            <span className="text-muted-foreground tabular-nums font-mono text-xs">{(item.price * item.quantity).toLocaleString()} DA</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-4 border-t border-border/10 flex justify-end">
                        <Link
                          href={`/checkout/success/${order.id}`}
                          className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                          View Full Receipt <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </AnimatedPage>
      </AccountLayout>
    </>
  );
}
