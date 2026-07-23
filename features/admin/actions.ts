"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function isAdmin() {
  const session = await auth();
  return (session?.user as any)?.role === "ADMIN";
}

import { OrderStatus } from '@/lib/generated/prisma/enums';

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  
  await prisma.order.update({
    where: { id: orderId },
    data: { status }
  });
  
  revalidatePath("/admin/orders");
}

export async function deleteProduct(productId: string) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  
  await prisma.product.delete({
    where: { id: productId }
  });
  
  revalidatePath("/admin/products");
}

export async function saveProduct(formData: FormData) {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  
  const id = formData.get("id") as string | null;
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const brand = formData.get("brand") as string;
  const categoryId = formData.get("categoryId") as string;
  const price = parseFloat(formData.get("price") as string);
  const discount = formData.get("discount") ? parseFloat(formData.get("discount") as string) : null;
  const stock = parseInt(formData.get("stock") as string);
  const images = formData.get("images") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const fullDescription = formData.get("fullDescription") as string;
  const specifications = formData.get("specifications") as string;

  try {
    const imageArray = images ? (JSON.parse(images) as string[]) : [];
    const specObject = specifications ? (JSON.parse(specifications) as Record<string, string>) : {};

    const baseData = {
      name, slug, brand, categoryId, price, discount: discount || null, 
      shortDescription, fullDescription
    };

    if (id) {
      await prisma.product.update({ 
        where: { id }, 
        data: {
          ...baseData,
          inventory: {
            upsert: {
              create: { quantity: stock, status: stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK" },
              update: { quantity: stock, status: stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK" }
            }
          },
          images: {
            deleteMany: {},
            create: imageArray.map((url, index) => ({ url, isPrimary: index === 0, order: index }))
          },
          specifications: {
            deleteMany: {},
            create: Object.entries(specObject).map(([name, value]) => ({ name, value: String(value) }))
          }
        } 
      });
    } else {
      await prisma.product.create({ 
        data: {
          ...baseData,
          inventory: {
            create: { quantity: stock, status: stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK" }
          },
          images: {
            create: imageArray.map((url, index) => ({ url, isPrimary: index === 0, order: index }))
          },
          specifications: {
            create: Object.entries(specObject).map(([name, value]) => ({ name, value: String(value) }))
          }
        } 
      });
    }
    
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    return { error: "Failed to save product. Ensure slug is unique." };
  }
}
