import { SeoHead } from '@/components/SeoHead';
import Link from "next/link";
import { Plus, Pencil, Trash2, MoreHorizontal, Package } from "lucide-react";
import { prisma } from '@/lib/prisma';
import { buttonVariants } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: { category: true, inventory: true }
  });

  return (
    <>
      <SeoHead title="Admin Products" description="Manage your store's inventory." />
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Inventory</p>
            <h1 className="font-display text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground mt-1 text-sm">{products.length} {products.length === 1 ? "product" : "products"} in catalog</p>
          </div>
          <Link
            href="/admin/products/new"
            className={buttonVariants({ variant: "default", size: "sm", className: "gap-2 shrink-0" })}
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </div>

        {/* Table */}
        <div className="relative overflow-hidden bg-card border border-border/50 rounded-xl">
          <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
          <div className="relative z-10">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2 border border-primary/20 shadow-glow">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">Catalog Empty</h3>
              <p className="text-muted-foreground text-sm max-w-[300px] text-center">Add your first product to start curating your inventory.</p>
              <Link href="/admin/products/new" className={buttonVariants({ variant: "default", size: "sm", className: "mt-4" })}>
                Add your first product
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border/30 hover:bg-transparent">
                  <TableHead className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold py-4">Product</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold py-4">Category</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold py-4">Price</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold py-4">Stock</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold py-4">Status</TableHead>
                  <TableHead className="w-12 py-4" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => {
                  const qty = product.inventory?.quantity ?? 0;
                  const stockStatus =
                    qty === 0 ? { label: "OUT OF STOCK", cls: "bg-destructive/10 text-destructive border border-destructive/20" }
                    : qty < 5 ? { label: "LOW STOCK", cls: "bg-orange-500/10 text-orange-400 border border-orange-500/20" }
                    : { label: "IN STOCK", cls: "bg-primary/10 text-primary border border-primary/20" };

                  return (
                    <TableRow key={product.id} className="border-border/30 hover:bg-white/[0.02] transition-colors group">
                      <TableCell className="py-4">
                        <div>
                          <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">{product.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{product.brand}</p>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground bg-muted/30 px-2 py-1 rounded border border-border/50">
                          {product.category?.name || "—"}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="font-display font-bold text-sm tabular-nums text-foreground">
                          {product.price.toLocaleString()} DA
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="text-sm font-bold tabular-nums text-foreground">{qty}</span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${stockStatus.cls}`}>
                          {stockStatus.label}
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
                          <DropdownMenuContent align="end" className="bg-card border-border/50 shadow-glow-sm backdrop-blur-xl">
                            <DropdownMenuLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-border/30" />
                            <DropdownMenuItem className="focus:bg-white/5">
                              <Link href={`/admin/products/${product.id}`} className="flex items-center gap-2 cursor-pointer text-sm w-full">
                                <Pencil className="h-3.5 w-3.5" /> Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive flex items-center gap-2 text-sm cursor-pointer mt-1">
                              <Trash2 className="h-3.5 w-3.5" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
          </div>
        </div>
      </div>
    </>
  );
}
