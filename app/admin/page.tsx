import { SeoHead } from "@/components/SeoHead";
import { prisma } from "@/lib/prisma";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-400",
  PROCESSING: "bg-blue-500/10 text-blue-400",
  SHIPPED: "bg-violet-500/10 text-violet-400",
  DELIVERED: "bg-primary/10 text-primary",
  CANCELLED: "bg-destructive/10 text-destructive",
};

export default async function AdminDashboardPage() {
  const [
    productCount,
    orderCount,
    userCount,
    totalRevenueResult,
    recentOrders,
    lowStockProducts,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { not: "CANCELED" } },
    }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        customerName: true,
        total: true,
        status: true,
        createdAt: true,
      },
    }),
    prisma.product.findMany({
      where: { inventory: { quantity: { lt: 5 } } },
      take: 5,
      select: {
        id: true,
        name: true,
        price: true,
        inventory: { select: { quantity: true } },
      },
    }),
  ]);

  const totalRevenue = totalRevenueResult._sum.total || 0;

  const stats = [
    {
      label: "Total Revenue",
      value: `${totalRevenue.toLocaleString()} DA`,
      icon: DollarSign,
      href: "/admin/analytics",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Total Orders",
      value: orderCount.toLocaleString(),
      icon: ShoppingCart,
      href: "/admin/orders",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Products",
      value: productCount.toLocaleString(),
      icon: Package,
      href: "/admin/products",
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      label: "Customers",
      value: userCount.toLocaleString(),
      icon: Users,
      href: "/admin/analytics",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <>
      <SeoHead
        title="Admin Dashboard"
        description="Overview of store performance."
      />

      <div className="flex flex-col gap-8">
        {/* Page Header */}
        <div>
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
            Overview
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Your store at a glance.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, href, color, bg }) => (
            <Link
              key={label}
              href={href}
              className="group relative overflow-hidden bg-card border border-border/50 hover:border-primary/30 rounded-xl p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-glow-sm"
            >
              <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

              <div className="relative z-10 flex items-start justify-between">
                <div
                  className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center border border-white/5 shadow-inner`}
                >
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div className="bg-white/5 p-1.5 rounded-full">
                  <TrendingUp className="h-3.5 w-3.5 text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all" />
                </div>
              </div>
              <div className="relative z-10 mt-2">
                <p className="text-xs text-muted-foreground mb-1.5 tracking-wide uppercase">
                  {label}
                </p>
                <p className="font-display text-3xl font-bold tracking-tight text-foreground">
                  {value}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Orders + Low Stock */}
        <div className="grid grid-cols-1 xl:grid-cols-7 gap-6">
          {/* Recent Orders */}
          <div className="xl:col-span-4 relative overflow-hidden bg-card border border-border/50 rounded-xl">
            <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-border/50">
              <h2 className="font-display text-base font-bold text-foreground">
                Recent Orders
              </h2>
              <Link
                href="/admin/orders"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="relative z-10 divide-y divide-border/30">
              {recentOrders.length === 0 ? (
                <div className="px-6 py-16 text-center flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                    <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    No Orders Yet
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-[250px] mt-2">
                    When customers place orders, they will appear here in
                    real-time.
                  </p>
                </div>
              ) : (
                recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors group"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {order.customerName}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {format(new Date(order.createdAt), "MMM d, yyyy")}
                      </p>
                    </div>
                    <div className="flex items-center gap-6 ml-4 shrink-0">
                      <span
                        className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status] || "bg-muted text-muted-foreground"}`}
                      >
                        {order.status}
                      </span>
                      <span className="text-sm font-display font-bold tabular-nums text-foreground">
                        {order.total.toLocaleString()} DA
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Low Stock */}
          <div className="xl:col-span-3 relative overflow-hidden bg-card border border-border/50 rounded-xl">
            <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-border/50">
              <div className="flex items-center gap-2.5">
                <h2 className="font-display text-base font-bold text-foreground">
                  Low Stock
                </h2>
                {lowStockProducts.length > 0 && (
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-full">
                    <AlertTriangle className="h-3 w-3" />
                    {lowStockProducts.length} Action
                    {lowStockProducts.length !== 1 ? "s" : ""}
                  </div>
                )}
              </div>
              <Link
                href="/admin/products"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Manage <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="relative z-10 divide-y divide-border/30">
              {lowStockProducts.length === 0 ? (
                <div className="px-6 py-16 text-center flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 border border-primary/20 shadow-glow-sm">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Inventory Healthy
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-[250px] mt-2">
                    All your products are sufficiently stocked. No action
                    needed.
                  </p>
                </div>
              ) : (
                lowStockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {product.price.toLocaleString()} DA
                      </p>
                    </div>
                    <div className="ml-4">
                      <span
                        className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${
                          (product.inventory?.quantity || 0) === 0
                            ? "bg-destructive/10 text-destructive border border-destructive/20"
                            : "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                        }`}
                      >
                        {(product.inventory?.quantity || 0) === 0
                          ? "OUT OF STOCK"
                          : `${product.inventory?.quantity} LEFT`}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
