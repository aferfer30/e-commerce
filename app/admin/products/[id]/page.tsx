import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/features/admin/components/ProductForm";
import { notFound } from "next/navigation";
import { SeoHead } from '@/components/SeoHead';

export default async function AdminProductEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  
  // Guard against missing or malformed id
  if (!id) {
    notFound();
    return;
  }

  let product = null;
  if (!isNew) {
    product = await prisma.product.findUnique({
      where: { id: id }
    });
    if (!product) notFound();
  }

  const categories = await prisma.category.findMany();

  return (
    <>
    <SeoHead title={isNew ? "Create Product" : "Edit Product"} description={isNew ? "Add a new product to your store." : "Update product details."} />
      <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {isNew ? "Create Product" : "Edit Product"}
        </h2>
        <p className="text-muted-foreground mt-1">
          {isNew ? "Add a new product to your store." : "Update product details."}
        </p>
      </div>

      <div className="relative overflow-hidden bg-card border border-border/50 rounded-xl p-8 shadow-sm">
        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
        <div className="relative z-10">
          <ProductForm initialData={product} categories={categories} />
        </div>
      </div>
    </div>
    </>
  );
}
