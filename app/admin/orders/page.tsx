import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { MoreHorizontal, ShoppingCart } from "lucide-react";
import { SeoHead } from "@/components/SeoHead";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-400",
  CONFIRMED: "bg-blue-500/10 text-blue-400",
  SHIPPED: "bg-violet-500/10 text-violet-400",
  COMPLETED: "bg-primary/10 text-primary",
  CANCELED: "bg-destructive/10 text-destructive",
};

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: { include: { product: { select: { name: true } } } },
      user: { select: { name: true, email: true } },
    },
  });

  return (
    <>
      <SeoHead
        title="Admin Orders"
        description="Manage and update orders in the admin panel."
      />
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
            Management
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Orders
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {orders.length} {orders.length === 1 ? "order" : "orders"} total
          </p>
        </div>

        {/* Table */}
        <div className="relative overflow-hidden bg-card border border-border/50 rounded-xl">
          <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
          <div className="relative z-10">
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-2 border border-white/10 shadow-glow-sm">
                  <ShoppingCart className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  No Orders Yet
                </h3>
                <p className="text-muted-foreground text-sm max-w-[300px] text-center">
                  Your order history will appear here once customers make
                  purchases.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-border/30 hover:bg-transparent">
                    <TableHead className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold py-4">
                      Order
                    </TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold py-4">
                      Customer
                    </TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold py-4">
                      Items
                    </TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold py-4">
                      Date
                    </TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold py-4">
                      Total
                    </TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold py-4">
                      Status
                    </TableHead>
                    <TableHead className="w-12 py-4" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow
                      key={order.id}
                      className="border-border/30 hover:bg-white/[0.02] transition-colors group"
                    >
                      <TableCell className="py-4">
                        <span className="font-mono text-[10px] tracking-wider text-muted-foreground bg-muted/30 px-2 py-1 rounded border border-border/50 group-hover:border-primary/30 group-hover:text-primary transition-colors">
                          {order.id.slice(0, 8)}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <div>
                          <p className="font-medium text-sm text-foreground">
                            {order.customerName}
                          </p>
                          {order.user?.email && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {order.user.email}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="text-sm font-medium text-foreground">
                          {order.items.length} item
                          {order.items.length !== 1 ? "s" : ""}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(order.createdAt), "MMM d, yyyy")}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="font-display font-bold text-sm tabular-nums text-foreground">
                          {order.total.toLocaleString()} DA
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span
                          className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status] || "bg-muted text-muted-foreground"}`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <button className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors" />
                            }
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-card border-border/50 shadow-glow-sm backdrop-blur-xl"
                          >
                            <DropdownMenuLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                              Update Status
                            </DropdownMenuLabel>
                            {["PENDING", "CONFIRMED", "SHIPPED", "COMPLETED", "CANCELED"].map((status) => (
                              <DropdownMenuItem
                                key={status}
                                className="text-sm cursor-pointer focus:bg-white/5"
                              >
                                {status}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
