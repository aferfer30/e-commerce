import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SeoHead } from "@/components/SeoHead";
import { AccountLayout } from "@/components/customer/AccountLayout";
import { AnimatedPage, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export default async function WishlistPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true },
  });

  if (!user) redirect("/login");

  const wishlistItems = await prisma.wishlistItem.findMany({
    where: { wishlist: { userId: session.user.id } },
    include: { product: { include: { images: true, inventory: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <SeoHead title="My Wishlist" description="Your saved NovaTech products." />
      <AccountLayout user={{ name: user.name, email: user.email }} title="My Wishlist">
        <AnimatedPage>
          {wishlistItems.length === 0 ? (
            <div className="relative overflow-hidden flex flex-col items-center justify-center py-32 rounded-2xl bg-card/20 backdrop-blur-md border border-white/5 shadow-inner group">
              {/* Ambient Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 w-24 h-24 rounded-full bg-secondary/50 flex items-center justify-center mb-8 border border-border shadow-2xl overflow-hidden">
                <Heart className="h-10 w-10 text-primary/80 group-hover:scale-110 group-hover:fill-primary/20 transition-all duration-500 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="relative z-10 flex flex-col items-center text-center px-4">
                <h2 className="font-display text-3xl font-bold mb-4 tracking-tight">Your vault is empty</h2>
                <p className="text-muted-foreground text-base max-w-sm mb-8 leading-relaxed font-light">
                  Save the pieces that inspire you. Build your curated collection of premium tech to revisit anytime.
                </p>
                <Link href="/products" className={buttonVariants({ variant: "default", size: "lg", className: "gap-2 rounded-full px-8 shadow-glow-sm hover:shadow-glow transition-all" })}>
                  Explore Collection <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <StaggerItem key={item.id}>
                  <ProductCard product={item.product} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </AnimatedPage>
      </AccountLayout>
    </>
  );
}
